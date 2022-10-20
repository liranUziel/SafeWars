import { RiSafe2Fill, RiFileUploadLine } from 'react-icons/ri';
import { BsSafe } from 'react-icons/bs';
import {useState} from 'react';
import { useSelector } from 'react-redux';
import safesService from '../../utils/userSafe';

const PopUpStage = ({stage,setProgress,safeId,setSafeId}) => {
    
    const [file, setFile] = useState({});
    const [stageName,setSatgeName] = useState('idel');
    const { user } = useSelector((state) => state.auth);
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
    const handelSafeSubmit = async (e) => {
        e.preventDefault();
        setSatgeName('safe');
        console.log(`progress [${stage+1}\\3]: safe upload file ${file.name}`);
        setSatgeName('uploading');
        const response = await safesService.postSafe(user, file);
        setSafeId(response.safeId);
        restoreInput();
        setProgress(stage+1);
        setSatgeName('key');
    };
    const handelKeySubmit = async (e) => {
        e.preventDefault();
        console.log(`progress [${stage+1}\\3]: key upload file ${file.name}`);
        setSatgeName('uploading');
        const response = await safesService.postKey(user, safeId, file);
        console.log(response);
        setProgress(stage+1);
        setSatgeName('test');
    };
    const handelTestSubmit = (e) => {
        e.preventDefault();
        console.log(`progress [${stage+1}\\3]: testing safe`);
        // setProgress(stage+1);
    };

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

    return (
        <div>
            <form action='' method='post' className='upload_form_container' onSubmit={stage===0?handelSafeSubmit:handelKeySubmit}>
                {/* need to change by the type */}
                {stage < 2?
                <>  
                    {stageName === 'uploading'?
                    <>
                        <div className='box_uploading_container'>
                            <div className='box_uploading_container__box'>
                                <BsSafe />
                            </div>
                            Uploading<span>...</span>
                        </div>
                    </>:
                    <>
                        <div id="upload_container" className='upload_container' onDragOver={dragHaverOn} onDragLeave={dragHaverOff} onDragEnd={dragHaverOff} onDrop={drop}>
                            <div className='upload_container__prompt__container'>
                                <RiFileUploadLine className='upload_container__upload_icon' />
                                <div className='upload_container__prompt'>
                                    Drag and Drop {stage===0?'safe':'key'} file or click on upload
                                </div>
                            </div>
                        </div>
                        <div className='upload_form_container__input'>
                            <input id='fileInput' type='file' className='upload_container__input' name='safe' onChange={handleFileChanged}/>
                            <button type='submit' className='upload_form_container__button'>
                                Upload
                            </button>
                        </div>
                    </>
                    }
                </>:
                <>
                    <div>
                        Testing
                    </div>
                </>}
                
            </form>
        </div>
    )
}

export default PopUpStage

{/*  */}