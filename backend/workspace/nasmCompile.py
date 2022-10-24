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
    """If there are less than 2 arguments stop running."""
    if(len(sys.argv) < 3):  # 2 wanted + 1 generated
        sys.exit(
            "Missing arguments. Run like this: nasmCompile.py src_path, dst_path")


async def compile_file(src_path, dst_path):
    if not await nasm_compile(src_path, dst_path):
        err_msg = 'Unable to compile' + " " + sep_join('lib', 'empty_key.asm')
        sys.exit(err_msg)


def main():
    check_argv()
    _, src_path, dst_path = sys.argv
    # Create temp_run folder in the same folder, if exist ignore and do nothing
    os.makedirs(sep_join(SCRIPT_PATH, 'temp_run'), exist_ok=True)
    # IDK
    if platform.system() == "Windows":
        asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())
    # Break the safe
    asyncio.run(compile_file(src_path, dst_path))


if __name__ == '__main__':
    main()
