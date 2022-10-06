import { useState } from 'react'
import {BsFillArrowDownCircleFill,BsFillArrowUpCircleFill,BsFillXCircleFill,BsSafe} from 'react-icons/bs'
import {RiSafe2Fill} from 'react-icons/ri'
import '../../styles/Safe.css'

import {getSafe} from '../../utils/safes'
import fileDownload  from 'js-file-download' 
import {useSelector} from 'react-redux';


const Safe = ({safe:_safe}) => {
    const {user} = useSelector((state)=> state.auth);
    const [safe, setSafe] = useState(_safe)

    const breakSafe = (e) =>{
        console.log(e.target.id);
    }   

    const downloadSafe = async (e) => {
        console.log("DONWLOADING")
        const response = await getSafe(user, safe._id)
        fileDownload(response.data, safe.safeName)
        console.log(response.data)
    }

    return (
        <div className={safe.solved ? "safe solved ":"safe"} id={safe._id}>
            <div className={safe.solved ? "safe__frame solved ":"safe__frame"}>
                <div className="btn-array">
                    <BsFillArrowDownCircleFill onClick={downloadSafe} className={safe.solved ? "btn-array__btn":"btn-array__btn solved"}/>
                    <BsFillArrowUpCircleFill className={safe.solved ? "btn-array__btn":"btn-array__btn solved"}/>
                    <BsFillXCircleFill className={safe.solved ? "btn-array__btn":"btn-array__btn solved"}/>
                </div>
                <div className="icon">
                    {safe.solved ? 
                    <RiSafe2Fill className="vaultIcon solved"/> :
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