import {FaSignInAlt,FaSignOutAlt,FaUser,FaChalkboardTeacher,FaChessKing} from 'react-icons/fa';
import {BsFillShieldFill,BsSafeFill,BsFillBarChartFill} from 'react-icons/bs';
import {RiAdminFill} from 'react-icons/ri';

import {useNavigate,Link} from 'react-router-dom';
import {useEffect,useState} from 'react';

import { useSelector ,useDispatch} from 'react-redux';
import { logout,reset } from '../features/auth/authSlice';
import {clearClass} from '../features/class/classSlice';

import '../styles/Header.css'
import {getClassInfo,getClassSafes} from '../features/class/classSlice';

import classUtil from '../utils/class'

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state)=> state.auth);
    const {classInfo,isLoading,isError,isSuccess,message} = useSelector((state)=> state.class);
    const [className,setClassName] = useState('');
    useEffect(() =>{
        if(classInfo.length === 1)
        {
            const {className,classNumber} = classInfo[0]["classInfo"];
            setClassName(`${className} ${classNumber}`);
        }
        else{
            setClassName('');
        }
    },[classInfo,dispatch]); 

    useEffect(() =>{
        dispatch(getClassInfo(user));
    },[]); 
    const onLogout = () =>{
        dispatch(logout());
        dispatch(reset());
        dispatch(clearClass());
        navigate('/')
    }
    const GotoClass = () =>{
        dispatch(getClassSafes(user));
        navigate('/home/class');
    }
    const GotoSafe = () =>{
        navigate('/home/safezone')
    }
    const user_type = "student";
    return (
        
        <header className='header'>
            <div className="logo">
                <Link to='/home'><BsFillShieldFill/>afe <span className="Z-letter">Z</span>one</Link>
            </div>
            <ul className="header_item_list">
                <li id="" className="header_item">
                    <button className="header_item_btn" onClick={GotoSafe}>
                        <BsSafeFill/>
                        My safe
                    </button>
                </li>
                <li id="" className="header_item">
                    <button className="header_item_btn" onClick={GotoClass}>
                        <FaChalkboardTeacher/>
                        Class <span className="class_name">{className}</span>
                    </button>
                </li>
                <li id="" className="header_item">
                <Link to='/home'></Link>
                    <button className="header_item_btn">
                        <FaChessKing/>
                        Tournament
                    </button>
                </li>
                <li id="" className="header_item">
                    <button className="header_item_btn">
                        <BsFillBarChartFill/>
                        Score Borad
                    </button>
                </li>
                {user_type === "student" ? (
                <>
                </>):(
                    <li id="" className="header_item">
                        <button className="header_item_btn">
                            <RiAdminFill/>
                            Mangement
                        </button>
                    </li>
                )
                
                }
            </ul>
            <div className="user">
                <FaUser/>
                <span className="user_name">
                    {user.name}
                </span>
            </div>
            <div className="logout">
                <button className="logout_btn" onClick={onLogout}>
                    Logout
                    <i className="fa-solid fa-right-from-bracket"></i>
                </button>
            </div>
        </header>
    )
}

export default Header