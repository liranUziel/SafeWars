import {useSelector,useDispatch} from 'react-redux';
import {Navigate, Outlet, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
// import {toast} from 'react-toastify'
import '../../styles/Home.css';

import Spinner from '../../companents/Spinner';
import Header from '../../companents/Header';
import Footer from '../../companents/Footer';

const Home = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user,isLoading,isError,isSuccess,message} = useSelector((state)=> state.auth);
    useEffect(()=>{

    },[user,isError,isSuccess,message,navigate,dispatch]);
    if(isLoading)    {
        return <div><Spinner/></div>
    }
    return (
        (user) ? 
        <>
            <div className="container__home">
                <Header/>
                <Outlet/>
                <Footer className="home_footer"/>
            </div>
        </> 
        :
        <Navigate to='/'/>
        // (user) ? <Outlet/> : <Navigate to='/log'/>
    )}

export default Home