import { useEffect, useState } from "react";
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
  BsFillXCircleFill,
  BsSafe,
} from "react-icons/bs";
import { RiSafe2Fill } from "react-icons/ri";
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
import { Button } from "@chakra-ui/react";
// import '../../styles/Safe.css'

import { getSafe } from "../../../../utils/safes";
import fileDownload from "js-file-download";
import { useSelector } from "react-redux";
import SafeBreakPopUp from "./SafeBreakPopUp";

const Safe = ({ safe: _safe, type }) => {
  //{safe:_safe,type,action}
  const { user } = useSelector((state) => state.auth);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [safe, setSafe] = useState({});
  const [safeId, setSafeId] = useState("");
  const [name, setName] = useState("");
  const [popupActive, setPopupActive] = useState(false);
  const breakSafe = (e) => {
    console.log(safeId);
    // setSafeId(e.target.id);
  };
  const closeOverlay = (e) => {
    setPopupActive(false);
    // restoreform();
  };
  useEffect(() => {
    setSafe(_safe);
    setName(safe.safeName);
    setSafeId(safe._id);
  }, [_safe]);
  const downloadSafe = async (e) => {
    // const response = await getSafe(user, safe._id);
    // fileDownload(response.data, safe.safeName);
    console.log(`donwload safe`);
  };
  //! reuplaoding
  const uploadSafe = (e) => {
    e.preventDefault();
    /* setUploadingStatus({status:'uploading'});
        const response = await safesService.postSafe(user, file)
        setUploadingStatus({status:'done'});
        dispatch(getSafe(user));
        setUploadingStatus({status:'idel'});
        setPopupActive(false);*/
  };

  return (
    <div
      className={`flex flex-col dark:text-white bg-gray-700 p-5 w-fit boder rounded ${
        safe.solved ? "border-green-600" : "border-gray-500"
      }`}
      id="safe"
    >
      <div className={`flex justify-end gap-2`} id="header">
        <BsFillArrowDownCircleFill
          onClick={downloadSafe}
          className={` ${
            safe.solved
              ? "text-gray-600"
              : "hover:text-green-600 cursor-pointer"
          }`}
        />
        {type === "private" ? (
          <BsFillArrowUpCircleFill className={`hover:text-green-600`} />
        ) : (
          <></>
        )}
      </div>
      <div
        className={`flex justify-center my-5 items-center relative group`}
        id="main"
      >
        {safe.solved ? (
          <RiSafe2Fill className={`text-7xl text-green-600`} />
        ) : (
          <BsSafe className={`text-7xl`} />
        )}
        {safe.solved ? (
          <></>
        ) : (
          <button
            className="z-10 text-xl font-semibold p-2 bg-green-500 rounded w-fit h-9 absolute hidden group-hover:block"
            id={safe._id}
            onClick={onOpen}
          >
            BREAK
          </button>
        )}
      </div>
      <div id="footer">
        <h3 className="">
          file name: <span className="">{name}</span>
        </h3>
        <span className="">date: 15/8/2022 17:11 pm</span>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        motionPreset="scale"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div class="flex items-center justify-center w-full">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
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
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">ASM</p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" />
              </label>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" variant="outline" onClick={breakSafe}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/*             
            <div className={safe.solved ? "safe__frame solved ":"safe__frame"}>
                <div className="btn-array">
                    
                    
                </div>
                <div className="icon">
                    {safe.solved ? 
                    <RiSafe2Fill className="vaultIcon solved"/> :
                    <BsSafe className="vaultIcon"/>}
                    {safe.solved || type==='private'? 
                    <></>:
                    <div className="btnCA">
                        
                    </div>
                    } 
                </div>
            </div>
            <div className="info">
                
            </div>
            <SafeBreakPopUp popupActive={popupActive} closeOverlay={closeOverlay} safeId={safeId} user={user}/> */}
    </div>
  );
};

export default Safe;
