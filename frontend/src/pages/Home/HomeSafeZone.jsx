import '../../styles/SafeZone.css';
import {RiSafe2Fill} from 'react-icons/ri';
import {BsSafe} from 'react-icons/bs';
import {useEffect, useState} from 'react'
import { useSelector ,useDispatch} from 'react-redux';
import {removeSafe,getSafe} from '../../features/userSafe/userSafeSlice';
import safesService from '../../utils/userSafe'
import Safe from './Safe';


const HomeSafeZone = () => {
  const dispatch = useDispatch();
  const [popupActive,setPopupActive] = useState(false);
  const {user} = useSelector((state)=> state.auth);
  const {safeInfo,isLoading,isError,isSuccess,message} = useSelector((state)=> state.safe);
  const [file, setFile] = useState();
  const [progress,setProgress] = useState(null);
  const [uploadingStatus,setUploadingStatus] = useState({status:'idel'});
  const [safe,setSafe] = useState({});
  
  const closeOverlay = (e) =>{
    setProgress(null);
    setPopupActive(false);
  }
  
  const openPopup = (e) =>{
    setProgress(0);
    setPopupActive(true);
  }

  function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".upload_container__thumb");
    // First time - remove the prompt
    if (dropZoneElement.querySelector(".upload_container__prompt__container")) {
        dropZoneElement.querySelector(".upload_container__prompt__container").remove();
    }
  
    // First time - there is no thumbnail element, so lets create it
    if (!thumbnailElement) {
        thumbnailElement = document.createElement("div");
        thumbnailElement.classList.add("upload_container__thumb");
        dropZoneElement.appendChild(thumbnailElement);
        const thumbnailIconElement = document.createElement("i");
        thumbnailIconElement.classList.add("fa-solid");
        thumbnailIconElement.classList.add("fa-vault");
        thumbnailIconElement.classList.add("upload_container__thumb__icon");
        thumbnailElement.appendChild(thumbnailIconElement);
        {/* <img src={asmLogo} alt="asm Logo" className="page__not__found__img"/> */}
    }
  
    thumbnailElement.dataset.label = file.name;

  }

  

  useEffect(() =>{
      dispatch(getSafe(user));
      if(safeInfo.safeName !== "") return
      const inputElement = document.getElementsByClassName("upload_container__input")[0];
      const dropZoneElement = document.getElementsByClassName("upload_container")[0];

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
              updateThumbnail(dropZoneElement,fileElement);
          }else if(e.dataTransfer.files.length > 1){
              console.error('too many files')
          }
          dropZoneElement.classList.remove("upload_container__hover"); 
      });

      inputElement.addEventListener("change", (e) => {
          if (inputElement.files.length) {
            setFile(inputElement.files[0])
            updateThumbnail(dropZoneElement, inputElement.files[0]);
          }
      });

  },[dispatch]); 

  useEffect(() =>{
    setSafe({...safeInfo,solved:false});
    console.log(safeInfo.safeName );
  },[safeInfo]);

  const handleFileChanged = (e)=>{
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setUploadingStatus({status:'uploading'});
    const response = await safesService.postSafe(user, file)
    setUploadingStatus({status:'done'});
    setProgress(1);
    dispatch(getSafe(user));
    setUploadingStatus({status:'idel'});
    //setPopupActive(false);
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
        </div>
        <div className="safe_popup__body">
        <div className="safe_popup__body__progress_bar">
          <div className={`safe_popup__body__progress_bar_item ${progress > 0 ? "done":""} ${progress === 0 ? "current":""}`}>0</div>
          <div className={`safe_popup__body__progress_bar_item ${progress > 1 ? "done":""} ${progress === 1 ? "current":""}`}>1</div>
          <div className={`safe_popup__body__progress_bar_item ${progress > 2 ? "done":""} ${progress === 2 ? "current":""}`}>2</div>
        </div>
        {uploadingStatus.status === 'idel'?
        <>
          <form action="" method="post" className="upload_form_container" onSubmit={handleSubmit}>
            <div className="upload_container">
                <div className="upload_container__prompt__container">
                    <i className="fa-solid fa-cloud-arrow-up upload_container__upload_icon"></i>
                    <div className="upload_container__prompt">Drag and Drop safe file or click on upload</div>
                    <input type="file" className="upload_container__input" name="safe" onChange={handleFileChanged}/>
                </div>
            </div>
            <button type="submit" className="upload_form_container__button">Upload</button>
            
          </form>
          {/* <form action="" method="post" className="upload_form_container" onSubmit={handleSubmit}>
            <div className="upload_container">
                <div className="upload_container__prompt__container">
                    <i className="fa-solid fa-cloud-arrow-up upload_container__upload_icon"></i>
                    <div className="upload_container__prompt">Drag and Drop safe file or click on upload</div>
                    <input type="file" className="upload_container__input" name="safe" onChange={handleFileChanged}/>
                </div>
            </div>
            <button type="submit" className="upload_form_container__button">Upload</button>
            
          </form> */}
        </> :
        <>
          <div class="box_uploading_container__box">
            <BsSafe/>
            Uploading<span>...</span>
          </div>
          
        </>}  
        </div>
      </div>
      <div id="overlay" className={popupActive?"active":""}></div>
    </div>
    :<>
      <div className="user_safe_container">
        <Safe safe={safe} type={"private"}/> 
      </div>
    </>}
    </>
    

  )

}

export default HomeSafeZone