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
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

import Safe from "./utilsComponents/Safe";
import { toast } from "react-toastify";
// import asmLogo from '../../assets/Images/asm.svg';
import React from "react";
import { Button } from "@chakra-ui/react";
// import DropZone from "./utilsComponents/DropZone";

const HomeSafeZone = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  //   const [popupActive, setPopupActive] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { safeInfo } = useSelector((state) => state.safe);
  const [progress, setProgress] = useState(0);
  //   const [uploadingStatus, setUploadingStatus] = useState("idel");
  const [safe, setSafe] = useState({});
  const [file, setFile] = useState(undefined);
  const updateThumbnail = (e, file) => {
    const popupBodyElement =
      document.getElementsByClassName("safe_popup__body")[0];
    let thumbnailElement = popupBodyElement.querySelector(
      ".upload_container__thumb"
    );
    // First time - remove the prompt
    if (popupBodyElement.querySelector(".upload_container")) {
      popupBodyElement.querySelector(".upload_container").remove();
    }
    // First time - there is no thumbnail element, so lets create it
    if (!thumbnailElement) {
      thumbnailElement = document.createElement("div");
      thumbnailElement.classList.add("upload_container__thumb");
      popupBodyElement.prepend(thumbnailElement);
      const thumbnailImgElement = document.createElement("img");
      thumbnailImgElement.src = asmLogo;
      thumbnailImgElement.classList.add("upload_container__thumb__icon");
      thumbnailElement.appendChild(thumbnailImgElement);
      {
        /* <img src={asmLogo} alt="asm Logo" className="page__not__found__img"/> */
      }
    }

    thumbnailElement.dataset.label = file.name;
  };

  const restoreform = () => {
    const popupBodyElement =
      document.getElementsByClassName("safe_popup__body")[0];
    let thumbnailElement = popupBodyElement.querySelector(
      ".upload_container__thumb"
    );
    const formElement = document.getElementsByClassName(
      "upload_form_container"
    )[0];
    const inputContainer = document.getElementsByClassName(
      "upload_form_container__input"
    )[0];

    popupBodyElement.appendChild(formElement);
    if (thumbnailElement) {
      thumbnailElement.remove();
      const uploadContainer = document.createElement("div");
      uploadContainer.classList.add("upload_container");
      const promptContainer = document.createElement("div");
      promptContainer.classList.add("upload_container__prompt__container");
      const RiFileUploadLine = document.createElement("RiFileUploadLine");
      RiFileUploadLine.classList.add("upload_container__upload_icon");
      const uploadPrompt = document.createElement("div");
      uploadPrompt.classList.add("upload_container__prompt");
      uploadPrompt.innerHTML = "Drag and Drop key file or click on upload";
      promptContainer.appendChild(RiFileUploadLine);
      promptContainer.appendChild(uploadPrompt);
      uploadContainer.appendChild(promptContainer);
      formElement.prepend(uploadContainer);
      inputContainer.querySelector(".upload_container__input").remove();
      const inputElement = document.createElement("input");
      inputElement.type = "file";
      inputElement.classList.add("upload_container__input");
      inputContainer.prepend(inputElement);
    }
  };
  useEffect(() => {
    dispatch(getSafe(user));
  }, [dispatch, user]);

  useEffect(() => {
    setSafe({ ...safeInfo, solved: false });
  }, [safeInfo]);

  const sendFile = () => {
    if (file) {
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

  const getKey = async (e) => {
    setProgress(2);
    setPopupActive(false);
  };

  const closeModal = () => {
    setFile(undefined);

    setProgress(0);
    onClose();
  };
  return (
    <>
      {safeInfo.safeName === undefined ? (
        <div>
          <div className="empty_container text-black dark:text-white">
            You have not safe, please click on upload safe to uplaod one, you
            can only have one safe at any time.
            <br />
            <button
              onClick={onOpen}
              className="safe_upload_button text-black dark:text-white"
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
                <Stepper />
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
    <div class="flex items-center justify-center w-full">
      <label
        for="dropzone-file"
        class="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div class="flex flex-col items-center justify-center ">
          <svg
            aria-hidden="true"
            class="w-10 h-10 mb-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            {file ? (
              file["name"]
            ) : (
              <>
                <span class="font-semibold">Click to upload</span> or drag and
                drop
              </>
            )}
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400">ASM</p>
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
