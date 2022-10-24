// import PopUpStage from "./PopUpStage";
import {useState} from "react";
import { RiFileUploadLine } from 'react-icons/ri';
import '../../styles/SafeBreak.css';
import safesService from '../../utils/userSafe';

const SafeBreakPopUp = ({popupActive,closeOverlay,safeId,user}) => {
    const [file, setFile] = useState();

    const dragHaverOn = (e) =>{
        e.preventDefault();
        const dropZone = document.getElementById('upload_container');
        dropZone.classList.add('upload_container__hover');
    }
    const dragHaverOff = (e) =>{
        e.preventDefault();
        const dropZone = document.getElementById('upload_container');
        dropZone.classList.remove('upload_container__hover');
    }
    const drop = (e) =>{
        e.preventDefault();
        const dropZone = document.getElementById('upload_container');
        const inputElement = document.getElementById('fileInput');
        if (e.dataTransfer.files.length === 1) {
            const fileElement = e.dataTransfer.files[0];        
            inputElement.files = e.dataTransfer.files;
            setFile(inputElement.files[0]);
            // updateThumbnail(popupBody, fileElement);
        } else if (e.dataTransfer.files.length > 1) {
            console.error('too many files');
        }
        dropZone.classList.remove('upload_container__hover');
    }
    const handleFileChanged = (e) => {
		setFile(e.target.files[0]);
	};
        const restoreInput = () =>{
        const inputContainer = document.getElementsByClassName('upload_form_container__input')[0];
        if(inputContainer){
            const inputContainer = document.getElementsByClassName('upload_form_container__input')[0];
            const uploadcContainer =  document.getElementsByClassName('upload_container__input')[0];
            if(uploadcContainer)
                inputContainer.removeChild(uploadcContainer);
            const inputElement = document.createElement('input');
            inputElement.type = 'file';
            inputElement.classList.add('upload_container__input');
            inputElement.addEventListener('change', handleFileChanged);
            inputElement.id ='fileInput';
            inputContainer.prepend(inputElement);
        }
    }
    
    const removeKey = (e) =>{
        e.preventDefault();
        if(file){
            setFile(undefined);
            restoreInput();
        }
    }
    const handelKeySubmit = async (e) => {
        e.preventDefault();
        console.log(`break admin safe of id ${safeId}`);
        const response = await safesService.postKey(user, safeId, file);
    };
    return (
        <>
            <form action='' method='post' className='upload_form_container' onSubmit={handelKeySubmit}>
                <div className={popupActive ? 'safe_popup active' : 'safe_popup'} id='safe_popup'>
                    {/* hold the close button X and the progress bar */}
                    <div className='safe_popup__header'>
                        <button type="button" data-close-button className='close-button' onClick={closeOverlay}>
                            &times;
                        </button>   
                        <div id="upload_container" className='upload_container' onDragOver={dragHaverOn} onDragLeave={dragHaverOff} onDragEnd={dragHaverOff} onDrop={drop}>
                            <div className='upload_container__prompt__container'>
                                <RiFileUploadLine className='upload_container__upload_icon' />
                                <div className='upload_container__prompt'>
                                    Drag and Drop key file or click on upload
                                </div>
                            </div>
                        </div>
                        <div className='upload_form_container__input'>
                            <input id='fileInput' type='file' className='upload_container__input' name='safe' onChange={handleFileChanged}/>
                            <button className={(!file)?`upload_form_container__button disable`:`upload_form_container__button`} onClick={removeKey} disabled={!file}>
                                Remove
                            </button>
                            <button type='submit' className={file?`upload_form_container__button`:`upload_form_container__button disable`} disabled={!file}>
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <div id='overlay' className={popupActive ? 'active' : ''}></div>
        </>
    )
}

export default SafeBreakPopUp