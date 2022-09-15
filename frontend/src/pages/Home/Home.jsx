import {useSelector,useDispatch} from 'react-redux';
import {Navigate, Outlet, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
// import {toast} from 'react-toastify'
import '../../styles/Home.css';

import Spinner from '../../companents/Spinner';
import Header from '../../companents/Header';

const Home = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user,isLoading,isError,isSuccess,message} = useSelector((state)=> state.auth);
    useEffect(()=>{

    },[user,isError,isSuccess,message,navigate,dispatch]);
    if(isLoading)    {
        return <Spinner/>
    }
    return (
        (user) ? 
        <>
            <Header/>
            <Outlet/>
        </> 
        :
        <Navigate to='/'/>
        // (user) ? <Outlet/> : <Navigate to='/log'/>
    )}

export default Home