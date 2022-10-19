import '../../styles/SafeZone.css';
import {RiSafe2Fill,RiFileUploadLine} from 'react-icons/ri';
import {BsSafe} from 'react-icons/bs';
import {useEffect, useState} from 'react'
import { useSelector ,useDispatch} from 'react-redux';
import {removeSafe,getSafe} from '../../features/userSafe/userSafeSlice';
import safesService from '../../utils/userSafe'
import Safe from './Safe';
import {toast} from 'react-toastify';
import asmLogo from '../../Images/asm.svg';
import React from 'react';

const HomeSafeZone = () => {
  const dispatch = useDispatch();
  const [popupActive,setPopupActive] = useState(false);
  const {user} = useSelector((state)=> state.auth);
  const {safeInfo,isLoading,isError,isSuccess,message} = useSelector((state)=> state.safe);
  const [file, setFile] = useState();
  const [progress,setProgress] = useState(null);
  const [uploadingStatus,setUploadingStatus] = useState("idel");
  const [safe,setSafe] = useState({});
  

  const updateThumbnail = (e, file) => {
    const popupBodyElement = document.getElementsByClassName("safe_popup__body")[0];
    let thumbnailElement = popupBodyElement.querySelector(".upload_container__thumb");
    // First time - remove the prompt
    if (popupBodyElement.querySelector(".upload_container")) 
    {
      popupBodyElement.querySelector(".upload_container").remove();
    }
    // First time - there is no thumbnail element, so lets create it
    if (!thumbnailElement) {
        thumbnailElement = document.createElement("div");
        thumbnailElement.classList.add("upload_container__thumb");
        popupBodyElement.prepend(thumbnailElement);
        const thumbnailImgElement = document.createElement("img");
        thumbnailImgElement.src=asmLogo;
        thumbnailImgElement.classList.add("upload_container__thumb__icon");
        thumbnailElement.appendChild(thumbnailImgElement);
        {/* <img src={asmLogo} alt="asm Logo" className="page__not__found__img"/> */}
    }
  
    thumbnailElement.dataset.label = file.name;

  }

  const restoreform = () =>{
    const popupBodyElement = document.getElementsByClassName("safe_popup__body")[0];
    let thumbnailElement = popupBodyElement.querySelector(".upload_container__thumb");
    const formElement = document.getElementsByClassName("upload_form_container")[0];
    const inputContainer = document.getElementsByClassName("upload_form_container__input")[0];
    
    popupBodyElement.appendChild(formElement);
    if (thumbnailElement) {
      thumbnailElement.remove();
      const uploadContainer = document.createElement("div");
      uploadContainer.classList.add("upload_container");
      const promptContainer = document.createElement("div");
      promptContainer.classList.add("upload_container__prompt__container");
      const RiFileUploadLine =  document.createElement("RiFileUploadLine");
      RiFileUploadLine.classList.add("upload_container__upload_icon");
      const uploadPrompt = document.createElement("div");
      uploadPrompt.classList.add("upload_container__prompt");
      uploadPrompt.innerHTML = "Drag and Drop key file or click on upload";
      promptContainer.appendChild(RiFileUploadLine);
      promptContainer.appendChild(uploadPrompt);
      uploadContainer.appendChild(promptContainer);
      formElement.prepend(uploadContainer);
      inputContainer.querySelector('.upload_container__input').remove();
      const inputElement = document.createElement('input');
      inputElement.type = "file";
      inputElement.classList.add("upload_container__input");
      inputContainer.prepend(inputElement);
      updateEvent();
    }
  }
  useEffect(() =>{
      dispatch(getSafe(user));
      updateEvent();
  },[]); 

  const updateEvent = () =>{
    if(safeInfo === undefined) return;
    const inputElement = document.getElementsByClassName("upload_container__input")[0];
    const dropZoneElement = document.getElementsByClassName("upload_container")[0];
    const popupBody = document.getElementsByClassName("safe_popup__body")[0];
    if(dropZoneElement !== undefined){
    dropZoneElement.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZoneElement.classList.add("upload_container__hover");
    });

    ["dragleave", "dragend"].forEach((type) => {
        dropZoneElement.addEventListener(type, (e) => {
            dropZoneElement.classList.remove("upload_container__hover");
        });
    });

    dropZoneElement.addEventListener("drop", (e) => {
        e.preventDefault();
        if (e.dataTransfer.files.length === 1) {
            const fileElement = e.dataTransfer.files[0];
            inputElement.files = e.dataTransfer.files
            setFile(inputElement.files[0])
            updateThumbnail(popupBody,fileElement);
        }else if(e.dataTransfer.files.length > 1){
            console.error('too many files')
        }
        dropZoneElement.classList.remove("upload_container__hover"); 
    });

    inputElement.addEventListener("change", (e) => {
        if (inputElement.files.length) {
          setFile(inputElement.files[0])
          updateThumbnail(popupBody, inputElement.files[0]);
        }
    });
  }
  }
  useEffect(() =>{
    setSafe({...safeInfo,solved:false});
    console.log(safeInfo.safeName);
  },[safeInfo]);

  const handleFileChanged = (e)=>{
    setFile(e.target.files[0]);
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(uploadingStatus === "key"){
      setUploadingStatus("uploading");
      setUploadingStatus("testing");  
      setProgress(2);
      // setPopupActive(false);
    }else if (uploadingStatus === "idel"){
      setUploadingStatus("uploading");
      setProgress(1);
      restoreform();
      setUploadingStatus("key");
      console.log(`stage 2: status ${uploadingStatus}`);
    }else if (uploadingStatus === "testing"){
      setUploadingStatus("done");
      console.log(`stage 3: status ${uploadingStatus}`)
      setUploadingStatus("idel");
    }
  }

  const reuploadSafe = (e) =>{
    toast.warn('Warrning reuploading safe will remove the old one', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    console.log(`reupload safe`);
    e.preventDefault();
    setSafe({});
    dispatch(removeSafe());
    openPopup(e);
  }

  const closeOverlay = (e) =>{
    setProgress(null);
    setPopupActive(false);
    restoreform();
  }
  
  const openPopup = (e) =>{
    setProgress(0);
    setPopupActive(true);
    // setUploadingStatus("idel");
    // console.log(`stage 0: status ${uploadingStatus}`);
    // setUploadingStatus("idel");
    console.log(`stage 0: status ${uploadingStatus}`);
  }


  const getKey = async (e)=>{
    setProgress(2);
    setPopupActive(false);
  }
  
  return (
    <>
    {safeInfo.safeName===undefined ?
    <div>
      <div className="empty_container">
        You have not safe, please click on upload safe to uplaod one, you can only have one safe at any time.<br/>
        <button onClick={openPopup} className="safe_upload_button">upload safe</button>
      </div>
      <div className={popupActive?"safe_popup active":"safe_popup"} id="safe_popup">
        <div className="safe_popup__header">
          <button data-close-button className="close-button" onClick={closeOverlay}>&times;</button>
          <div className="safe_popup__body__progress_bar">
            <div className={`safe_popup__body__progress_bar_item ${progress > 0 ? "done":""} ${progress === 0 ? "current":""}`}>{progress > 0 ? "V":"0"}</div>
            <div className={`safe_popup__body__progress_bar_item ${progress > 1 ? "done":""} ${progress === 1 ? "current":""}`}>{progress > 1 ? "V":"1"}</div>
            <div className={`safe_popup__body__progress_bar_item ${progress > 2 ? "done":""} ${progress === 2 ? "current":""}`}>{progress > 2 ? "V":"2"}</div>
          </div>
        </div>
        <div className="safe_popup__body">
        
        {uploadingStatus === "idel" || uploadingStatus === "key" ?
          <form action="" method="post" className="upload_form_container" onSubmit={handleSubmit}>
            <div className="upload_container">
                <div className="upload_container__prompt__container">
                    <RiFileUploadLine className="upload_container__upload_icon"/>
                    <div className="upload_container__prompt">Drag and Drop safe file or click on upload</div>
                </div>
            </div>
            <div className="upload_form_container__input">
              <input type="file" className="upload_container__input" name="safe" onChange={handleFileChanged}/>
              <button type="submit" className="upload_form_container__button">Upload</button>
            </div> 
          </form>
          :<> 
            {uploadingStatus === "testing" ? 
            <>
              testing
              <button type="submit" className="upload_form_container__button">done</button>
            </>
            :<>
              <div className="box_uploading_container__box">
                <BsSafe/>
              </div>
              Uploading<span>...</span>
            </>}
          </>
        }  
        </div>
      </div>
      <div id="overlay" className={popupActive?"active":""}></div>
    </div>
    :<>
      <div className="user_safe_container">
        <Safe safe={safe} action={reuploadSafe} type={"private"}/> 
      </div>
    </>}
  </>
    

  )

}

export default HomeSafeZone