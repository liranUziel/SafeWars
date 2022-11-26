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
  const [safe, setSafe] = useState({});
  const [safeId, setSafeId] = useState("");
  const [name, setName] = useState("");
  const [popupActive, setPopupActive] = useState(false);
  const breakSafe = (e) => {
    console.log(e.target.id);
    setSafeId(e.target.id);
    setPopupActive(true);
  };
  const closeOverlay = (e) => {
    setPopupActive(false);
    // restoreform();
  };
  useEffect(() => {
    setSafe(_safe);
    setName(safe.safeName);
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
        {safe.solved ? (
          ""
        ) : (
          <BsFillArrowDownCircleFill
            onClick={downloadSafe}
            className={`hover:text-green-600`}
          />
        )}
        {type === "private" ? (
          <BsFillArrowUpCircleFill className={`hover:text-green-600`} />
        ) : (
          <></>
        )}
      </div>
      <div className={`flex justify-center my-5 items-center`} id="main">
        {safe.solved ? (
          <RiSafe2Fill className={`text-7xl z-0`} />
        ) : (
          <BsSafe className={`text-7xl z-0`} />
        )}
        <button
          className="z-10 text-xl font-semibold p-2 bg-green-500 rounded w-fit h-9"
          id={safe._id}
          onClick={breakSafe}
        >
          BREAK
        </button>
      </div>
      <div id="footer">
        <h3 className="">
          file name: <span className="">{name}</span>
        </h3>
        <span className="">date: 15/8/2022 17:11 pm</span>
      </div>
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
