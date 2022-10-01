import '../../styles/SafeZone.css';
import {RiSafe2Fill} from 'react-icons/ri'
import {useState} from 'react';
const HomeSafeZone = () => {
  const [popupActive,setPopupActive] = useState(false);
  const safe = "";
  const closeOverlay = (e) =>{
      setPopupActive(false);
  }
  const openPopup = (e) =>{
      setPopupActive(true);
  }
  const uploadSafe = (e) =>{
    e.preventDefault();
    setPopupActive(false);
  }
  
  return (
    <>
    {safe===""?<div>
      
      <button onClick={openPopup}>upload safe</button>
      <div className={popupActive?"safe_popup active":"safe_popup"} id="safe_popup">
        <div className="safe_popup__header">
          <button data-close-button className="close-button" onClick={closeOverlay}>&times;</button>
        </div>
        <div className="safe_popup__body">
          <form onSubmit={uploadSafe}>
            <RiSafe2Fill className="upload__safe__icon"/>
            Please select safe file
            <br/>
            <input type="file"></input>
            <button>upload</button>
          </form>
        </div>
      </div>
      <div id="overlay" className={popupActive?"active":""}></div>
    </div>
    :<>
    display safe
    </>}
    </>
    

  )

}

export default HomeSafeZone