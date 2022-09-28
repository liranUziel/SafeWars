import {BsSafeFill} from 'react-icons/bs'
import '../../styles/Safe.css'
const Safe = ({safeID,safeName}) => {
  return (
    <div className="card">
        <div className="frame">
            <div className="btn-array">
                <i className="fa-solid fa-circle-arrow-down"></i>
                <i className="fa-solid fa-circle-arrow-up"></i>
                <i className="fa-solid fa-xmark remove" id={safeID}></i>
            </div>
            <div className="icon">
                <BsSafeFill className="vaultIcon"/>
                {/* <span class="vaultIcon"></span> */}
                <div className="btnCA">
                    <button className="breakBtn" id="sf1128b">BREAK</button>
                    {/* <!-- <button className="editBtn">...</button> --> */}
                </div>
            </div>
        </div>
        <div className="info">
            <h3 className="safeName">file name: <span className="fileName">{safeName}</span></h3>
            <span className="safeUploadDate">date: 15/8/2022 17:11 pm</span>
        </div>
    </div>
  )
}

export default Safe