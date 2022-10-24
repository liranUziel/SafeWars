#!/usr/bin/env python

###################################################################################
# Copyright (c) 2019-2020 [Zamarin Arthur]                                        #
#                                                                                 #
# Permission is hereby granted, free of charge, to any person obtaining a copy    #
# of this software and associated documentation files (the "Software"), to deal   #
# in the Software without restriction, including without limitation the rights    #
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell       #
# copies of the Software, and to permit persons to whom the Software is           #
# furnished to do so, subject to the following conditions:                        #
#                                                                                 #
# The above copyright notice and this permission notice shall be included in      #
# all copies or substantial portions of the Software.                             #
###################################################################################

###################################################################################
# Copyright (c) 2022 [Gabriel Milshtein]                                          #
#                                                                                 #
# Permission is hereby granted, free of charge, to any person obtaining a copy    #
# of this software and associated documentation files (the "Software"), to deal   #
# in the Software without restriction, including without limitation the rights    #
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell       #
# copies of the Software, and to permit persons to whom the Software is           #
# furnished to do so, subject to the following conditions:                        #
#                                                                                 #
# The above copyright notice and this permission notice shall be included in      #
# all copies or substantial portions of the Software.                             #
###################################################################################

import platform
if tuple(map(int, platform.python_version_tuple())) < (3, 7):
    input("Needs minimum version 3.7")
    exit(1)

import os
import sys
import pathlib
import typing
import asyncio
from shutil import copyfile
from csv import reader as csv_reader, writer as csv_writer
import json

# The full path to the folder that contains the script (In this case 'workspace')
SCRIPT_PATH = str(pathlib.Path(__file__).parent.resolve())


def sep_join(*args) -> str:
    """
    This function combines the strings to literal path.
    ('.', 'lib', '7z.exe') => .\\lib\\7z.exe
    """
    return os.path.sep.join(args)


def strip_end(text, suffix):
    if not text.endswith(suffix):
        return text
    return text[:len(text)-len(suffix)]


if platform.system() == "Windows":
    EXE_7Z = sep_join(SCRIPT_PATH, 'lib', '7z.exe')
    EXE_NASM = sep_join(SCRIPT_PATH, 'lib', 'nasm.exe')
else:
    EXE_7Z = '7z'
    EXE_NASM = 'nasm'

JAR_EXEC = ('java', '-cp', f'{SCRIPT_PATH}/lib/corewars8086-4.0.2_Arthur.jar',
            'il.co.codeguru.corewars8086.CoreWarsEngine')

# Declare types
typing_key_safe = typing.List[str]
typing_codes = typing.Dict[str, typing_key_safe]


async def nasm_compile(src: str, dst: str) -> bool:
    # Compile the key/safe
    proc = await asyncio.create_subprocess_exec(
        EXE_NASM, '-o', dst, src,
        stdout=asyncio.subprocess.DEVNULL, stderr=asyncio.subprocess.DEVNULL)
    ret = await proc.wait()
    return ret == 0


def check_argv():
    """If there are less than 4 arguments stop running."""
    if(len(sys.argv) < 5):  # 4 wanted + 1 generated
        sys.exit(
            "Missing arguments. Run like this: breakSafeWithKey.py userId safe_name safe_path key_path")


async def compile_empty_key():
    if not await nasm_compile(sep_join(SCRIPT_PATH, 'lib', 'empty_key.asm'), sep_join(SCRIPT_PATH, 'temp_run', 'empty_key')):
        err_msg = 'Unable to compile' + " " + sep_join('lib', 'empty_key.asm')
        sys.exit(err_msg)

#################################################################################


def prepare_dirs(runs_dir: str):
    """Create needed dirs for run (Break)
    Created in .../workspace/temp_run/student_id/runs/
    """
    os.makedirs(runs_dir, exist_ok=True)
    os.makedirs(sep_join(runs_dir, 'survivors'), exist_ok=True)
    os.makedirs(sep_join(runs_dir, 'zombies'), exist_ok=True)


# run_name, same as safe name
async def java_run(student_id: str, run_name: str) -> typing.Tuple[str, str]:
    """Make the execution, break the safe"""
    runs_dir = sep_join(SCRIPT_PATH, 'temp_run', student_id, 'runs', run_name)
    # Make a run
    java_process = await asyncio.create_subprocess_exec(
        *JAR_EXEC, cwd=runs_dir,
        stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.STDOUT)
    stdout, _ = await java_process.communicate()
    # If error occured
    if 0 != java_process.returncode:
        print('=' * 50)
        print(f'{student_id}/{run_name}: JAVA run failed')
        print(stdout)
        print('=' * 50)
        return (None, None)
    # create scores file
    with open(sep_join(runs_dir, 'scores.csv'), newline='') as csvfile:
        all_raws = tuple(csv_reader(csvfile))
        return (all_raws[1][1], all_raws[2][1])
    return (None, None)

# run_name == safe_name


async def process_student_run(student_id: str, run_name: str, key_safe) -> typing.Tuple[str, str, str]:
    # Create his own temp run, run folder (safe run folder)
    runs_dir = sep_join(SCRIPT_PATH, 'temp_run', student_id, 'runs', run_name)
    prepare_dirs(runs_dir)

    # Compile key and safe
    nasm_tasks = []
    for typename, file_type in (('key', 0), ('safe', 1)):
        # Create key, than safe
        dst = sep_join(runs_dir, 'survivors', typename)
        if key_safe[file_type]:
            nasm_tasks.append(nasm_compile(key_safe[file_type], dst))
        else:
            print(
                f'{student_id}/{run_name}: missing {typename} for name "{run_name}"')
            return (run_name, None, None)
    # make sure all compiled
    if sum(await asyncio.gather(*nasm_tasks)) != len(nasm_tasks):
        print(f'{student_id}/{run_name}: Failed NASM compile')
        return (run_name, None, None)

    # Here I break safe
    java_tasks = [java_run(student_id, run_name)]
    if key_safe[1]:  # if we have a safe to check if OK
        temp_runs_dir = sep_join(
            SCRIPT_PATH, 'temp_run', student_id, 'runs', run_name + '_TEST_SAFE')
        prepare_dirs(temp_runs_dir)
        copyfile(sep_join(runs_dir, 'survivors', 'safe'),
                 sep_join(temp_runs_dir, 'survivors', 'safe'))
        copyfile(sep_join(SCRIPT_PATH, 'temp_run', 'empty_key'),
                 sep_join(temp_runs_dir, 'survivors', 'key'))
        java_tasks.append(java_run(student_id, run_name + '_TEST_SAFE'))

    res = await asyncio.gather(*java_tasks)
    # result = (safe_name, key_score, safe_score, empty_key_score/builtin)
    return (run_name, ) + res[0] + (res[1][1] if key_safe[1] else 'builtin', )
#######################################################################################


async def get_result(user_id, safe_name, safe_path, key_path):
    # Compile empty key
    await compile_empty_key()
    # Break the safe and return the result
    return await process_student_run(user_id, safe_name, [safe_path, key_path])


def main():
    check_argv()
    _, user_id, safe_name, safe_path, key_path = sys.argv
    # Create temp_run folder in the same folder, if exist ignore and do nothing
    os.makedirs(sep_join(SCRIPT_PATH, 'temp_run'), exist_ok=True)
    # IDK
    if platform.system() == "Windows":
        asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())
    # Break the safe
    # result = (safe_name, key_score, safe_score, empty_key_score/builtin)
    res = asyncio.run(get_result(user_id, safe_name, safe_path, key_path))
    results = {'safeName': safe_name, 'keyScore': res[1],
               'safeScore': res[2], 'test': res[3]}
    print(json.dumps(results))


if __name__ == '__main__':
    main()
    #input('Press Enter to close')
