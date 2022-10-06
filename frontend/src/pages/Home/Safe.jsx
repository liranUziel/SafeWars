import { useEffect, useState } from 'react'
import {BsFillArrowDownCircleFill,BsFillArrowUpCircleFill,BsFillXCircleFill,BsSafe} from 'react-icons/bs'
import {RiSafe2Fill} from 'react-icons/ri'
import '../../styles/Safe.css'

import {getSafe} from '../../utils/safes'
import fileDownload  from 'js-file-download' 
import {useSelector} from 'react-redux';


const Safe = ({safe:_safe,type}) => {
    const {user} = useSelector((state)=> state.auth);
    const [safe, setSafe] = useState({});
    const breakSafe = (e) =>{
        console.log(e.target.id);
    } 
    useEffect(()=>{
        setSafe(_safe);
    },[_safe]) 
    const downloadSafe = async (e) => {
        const response = await getSafe(user, safe._id);
        fileDownload(response.data, safe.safeName);
    }
    const uploadSafe = (e) =>{
        e.preventDefault();
        /* setUploadingStatus({status:'uploading'});
        const response = await safesService.postSafe(user, file)
        setUploadingStatus({status:'done'});
        dispatch(getSafe(user));
        setUploadingStatus({status:'idel'});
        setPopupActive(false);*/
    }
    return (
        <div className={safe.solved ? "safe solved ":"safe"} id={safe._id}>
            <div className={safe.solved ? "safe__frame solved ":"safe__frame"}>
                <div className="btn-array">
                    <BsFillArrowDownCircleFill onClick={downloadSafe} className={safe.solved ? "btn-array__btn":"btn-array__btn solved"}/>
                    {type==='private'?<BsFillArrowUpCircleFill onClick={uploadSafe} className={safe.solved ? "btn-array__btn":"btn-array__btn solved"}/>:<></> }
                </div>
                <div className="icon">
                    {safe.solved ? 
                    <RiSafe2Fill className="vaultIcon solved"/> :
                    <BsSafe className="vaultIcon"/>}
                    {safe.solved || type==='private'? 
                    <></>:
                    <div className="btnCA">
                        <button className="breakBtn" id={"s"+safe._id} onClick={breakSafe}>BREAK</button>
                    </div>
                    } 
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