// import '../../styles/SafeZone.css';
import Stepper from "./utilsComponents/Stepper";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeSafe, getSafe } from "../../../features/userSafe/userSafeSlice";
import safesService from "../../../utils/userSafe";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

import Safe from "./utilsComponents/Safe";
import React from "react";

const HomeSafeZone = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useSelector((state) => state.auth);
  const { safeInfo } = useSelector((state) => state.safe);
  const { classInfo } = useSelector((state) => state.class);
  const [progress, setProgress] = useState(0);
  const [safe, setSafe] = useState({});
  const [file, setFile] = useState(undefined);
  const [newSafes, setNewSafes] = useState([]);

  useEffect(() => {
    dispatch(getSafe(user));
  }, [dispatch, user]);

  useEffect(() => {
    //TODO:If fail handle
    console.log(safeInfo);
    setSafe({ ...safeInfo, solved: false });
  }, [safeInfo]);

  const sendFile = async () => {
    if (file) {
      switch (progress) {
        case 0: // Safe
          const classesId = classInfo.map((currClass) => currClass._id);
          const safesResponse = await safesService.postSafe(
            user,
            classesId,
            file
          );
          setNewSafes(safesResponse.newSafes);
          break;
        case 1: // Key
          //const isSucce
          const results = await Promise.all(
            await newSafes.map(async (currSafe) => {
              const { isSucceeded } = await safesService.postKey(
                user,
                currSafe._id,
                file
              );
              return isSucceeded;
            })
          );
          console.log(results);
          const isErrorAtKey = results.some((result) => !result);
          if (isErrorAtKey) {
            toast({
              title: "Invalid Key, please try again.",
              status: "error",
            });
          } else {
            toast({
              title: "Uploaded successufully.",
              status: "success",
            });
          }
          break;

        default:
          break;
      }
      setProgress(progress + 1);
      setFile(undefined);
    }
  };

  const reuploadSafe = (e) => {
    toast.warn("Warrning reuploading safe will remove the old one", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    e.preventDefault();
    setSafe({});
    dispatch(removeSafe());
    openPopup(e);
  };

  const closeModal = () => {
    setFile(undefined);
    setProgress(0);
    onClose();
  };
  return (
    <>
      {safeInfo?.safeName === undefined ? (
        <div className="flex flex-col items-center justify-center h-full m-10 p-2 gap-2">
          <div className="container text-center text-black dark:text-white">
            You don't have a safe, please click on upload safe to uplaod one.
            you can only have one safe at a time.
            <br />
            <button
              onClick={onOpen}
              className="border rounded-md m-5 p-2 text-white dark:bg-dark-accenet-800 bg-light-accent-800"
            >
              upload safe
            </button>
          </div>
          <Modal
            isOpen={isOpen}
            onClose={closeModal}
            closeOnOverlayClick={false}
            motionPreset="scale"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Stepper
                  steps={[{ label: "Upload Safe" }, { label: "Upload Key" }]}
                  currStep={progress}
                />
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <div className="dropZone">
                  <DropZone file={file} setFile={setFile} />
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="teal"
                  variant="outline"
                  onClick={sendFile}
                  disabled={!file}
                >
                  {progress == 0 ? "Next" : "Submit"}
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      ) : (
        <>
          <div className="user_safe_container text-black dark:text-white">
            <Safe safe={safe} action={reuploadSafe} type="private" />
          </div>
        </>
      )}
    </>
  );
};

const DropZone = ({ file, setFile }) => {
  const handleFileChanged = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center ">
          <svg
            aria-hidden="true"
            className="w-10 h-10 mb-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            {file ? (
              file["name"]
            ) : (
              <>
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </>
            )}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">ASM</p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          accept=".asm"
          hidden
          onChange={handleFileChanged}
        />
      </label>
    </div>
  );
};

export default HomeSafeZone;
