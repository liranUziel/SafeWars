import PopUpStage from "./PopUpStage";
import {useState} from "react";
const PopUp = ({closeOverlay,handleSubmit,popupActive}) => {
    
    const [progress, setProgress] = useState(0);
    const [safeId,setSafeId] = useState("");
    return (
        <> 
            <div className={popupActive ? 'safe_popup active' : 'safe_popup'} id='safe_popup'>
                {/* hold the close button X and the progress bar */}
                <div className='safe_popup__header'>
                    <button data-close-button className='close-button' onClick={closeOverlay}>
                        &times;
                    </button>
                    <div className='safe_popup__body__progress_bar'>
                        <div
                            className={`safe_popup__body__progress_bar_item ${progress > 0 ? 'done' : ''} ${
                                progress === 0 ? 'current' : ''
                            }`}
                        >
                            {progress > 0 ? 'V' : '0'}
                        </div>
                        <div
                            className={`safe_popup__body__progress_bar_item ${progress > 1 ? 'done' : ''} ${
                                progress === 1 ? 'current' : ''
                            }`}
                        >
                            {progress > 1 ? 'V' : '1'}
                        </div>
                    </div>
                </div>
                <PopUpStage stage={progress} setProgress={setProgress} safeId={safeId} setSafeId={setSafeId}/>
            </div>
            <div id='overlay' className={popupActive ? 'active' : ''}></div>
        </>
    )
}

export default PopUp