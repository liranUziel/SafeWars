import Safe from './Safe'
import '../../styles/Safe.css'
import Spinner from '../../companents/Spinner';

import { useDispatch,useSelector} from 'react-redux';
import {clearClass,getClassInfo,getClassSafes} from '../../features/class/classSlice';
import {useEffect,useState} from 'react';


const HomeClass = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((state)=> state.auth);
  const {classSafes,isLoading,isError,isSuccess,message} = useSelector((state)=> state.class);
  const safes = classSafes;

  useEffect(() =>{
    dispatch(getClassSafes(user));
  },[dispatch]); 

  if(isLoading)    {
    return <Spinner/>
  }
  if (safes.length != 0)
    return (
      <div className="safe_container">
        {
          safes.map(safe => <Safe key={safe._id} safe={safe}></Safe>)
        }
      </div>
    )
  else{
    return (
    <>
      Safes list is empty
    </>
    )
  }
}

export default HomeClass