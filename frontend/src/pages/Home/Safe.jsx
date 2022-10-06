import {BsFillArrowDownCircleFill,BsFillArrowUpCircleFill,BsFillXCircleFill,BsSafe} from 'react-icons/bs'
import {RiSafe2Fill} from 'react-icons/ri'
import '../../styles/Safe.css'
const Safe = ({safe}) => {

    const breakSafe = (e) =>{
        console.log(e.target.id);
    }   

    const downloadSafe = (e) => {
        console.log(e.target.id);
    }

    return (
        <div className={safe.solve ? "safe solve ":"safe"} id={safe._id}>
            <div className={safe.solve ? "safe__frame solve ":"safe__frame"}>
                <div className="btn-array">
                    <BsFillArrowDownCircleFill onClick={downloadSafe} className={safe.solve ? "btn-array__btn":"btn-array__btn solve"}/>
                    <BsFillArrowUpCircleFill className={safe.solve ? "btn-array__btn":"btn-array__btn solve"}/>
                    <BsFillXCircleFill className={safe.solve ? "btn-array__btn":"btn-array__btn solve"}/>
                </div>
                <div className="icon">
                    {safe.solve ? 
                    <RiSafe2Fill className="vaultIcon solve"/> :
                    <BsSafe className="vaultIcon"/>}
                    {/* <span class="vaultIcon"></span> */}
                    <div className="btnCA">
                        <button className="breakBtn" id={"s"+safe._id} onClick={breakSafe}>BREAK</button>
                        {/* <button className="editBtn">...</button> */}
                    </div>
                </div>
            </div>
            <div className="info">
                <h3 className="safeName">file name: <span className="fileName">{safe.safeName}</span></h3>
                <span className="safeUploadDate">date: 15/8/2022 17:11 pm</span>
            </div>
        </div>
    )
}

export default Safe