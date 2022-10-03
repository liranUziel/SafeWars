import '../../styles/SafeZone.css';
import {RiSafe2Fill} from 'react-icons/ri'
import {useEffect, useState} from 'react'
import { useSelector ,useDispatch} from 'react-redux';
import {removeSafe,getSafe} from '../../features/userSafe/userSafeSlice';
import safesService from '../../utils/userSafe'


const HomeSafeZone = () => {
  const dispatch = useDispatch();
  const [popupActive,setPopupActive] = useState(false);
  const {user} = useSelector((state)=> state.auth);
  const {safeName,isLoading,isError,isSuccess,message} = useSelector((state)=> state.safe);

  const [file, setFile] = useState()
  
  const [userSafename,setUserSafename] = useState("");
  
  const closeOverlay = (e) =>{

      setPopupActive(false);
  }
  
  const openPopup = (e) =>{
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
    }
  
    thumbnailElement.dataset.label = file.name;

  }

  

  useEffect(() =>{
      dispatch(getSafe(user));
      if(safeName !== "") return
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
              console.log(e)
              updateThumbnail(dropZoneElement,fileElement);
          }else if(e.dataTransfer.files.length > 1){
              console.error('too many files')
          }
          dropZoneElement.classList.remove("upload_container__hover"); 
      });

      inputElement.addEventListener("change", (e) => {
          if (inputElement.files.length) {
            setFile(inputElement.files[0])
            console.log(`second: ${file}`)
            updateThumbnail(dropZoneElement, inputElement.files[0]);
          }
      });

  },[dispatch]); 

  useEffect(() =>{
    setUserSafename(safeName);
    
  },[safeName]);

  const handleFileChanged = (e)=>{
    setFile(e.target.files[0])
    console.log(file)
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    const response = await safesService.postSafe(user, file)
    dispatch(getSafe(user))
    setPopupActive(false);
  }

  return (
    <>
    {safeName===""?<div>
      <button onClick={openPopup}>upload safe</button>
      <div className={popupActive?"safe_popup active":"safe_popup"} id="safe_popup">
        <div className="safe_popup__header">
          <button data-close-button className="close-button" onClick={closeOverlay}>&times;</button>
        </div>
        <div className="safe_popup__body">
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
        </div>
      </div>
      <div id="overlay" className={popupActive?"active":""}></div>
    </div>
    :<>
    display safe
      <div>
        <h1>safe name: {safeName}</h1>
        {/* <span>id: {safeInfo._id}</span> */}
      </div>
    </>}
    </>
    

  )

}

export default HomeSafeZone