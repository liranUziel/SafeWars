// import '../styles/Header.css'

import { ReactComponent as Logo } from '../assets/Images/light_logo.svg';

import { FaUser, FaChalkboardTeacher, FaChessKing } from 'react-icons/fa';
import { BsSafeFill, BsFillBarChartFill } from 'react-icons/bs';
import { Avatar } from '@chakra-ui/react';
import { RiAdminFill } from 'react-icons/ri';

import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { logout, reset } from '../features/auth/authSlice';
import { removeSafe, getSafe } from '../features/userSafe/userSafeSlice';

import { clearClass, getClassInfo, getClassSafes } from '../features/class/classSlice';

const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { classInfo, isLoading, isError, isSuccess, message } = useSelector((state) => state.class);
	const [className, setClassName] = useState('');
	const [realName, setUsername] = useState('');
	const [userImg, setUserImg] = useState('');
	const [score, setScore] = useState(0);

	useEffect(() => {
		setUsername(user.realName);
		setUserImg('');
		setScore(user.score);
	}, [user]);

	useEffect(() => {
		if (classInfo.length === 1) {
			const { className, classNumber } = classInfo[0]['classInfo'];
			setClassName(`${className} ${classNumber}`);
		} else {
			setClassName('');
		}
	}, [classInfo]);

    useEffect(() =>{
        dispatch(getClassInfo(user));
        // dispatch(getSafe(user));
    },[]); 
    const onLogout = () =>{
        dispatch(logout());
        dispatch(reset());
        dispatch(clearClass());
        dispatch(removeSafe()); 
        navigate('/')
    }
    const GotoClass = () =>{
        // dispatch(getClassSafes(user));
        navigate('/home/class');
    }
    const GotoSafe = () =>{
        //dispatch(getSafe(user));
        navigate('/home/safezone');
    }
    const GotoTournament = () => {
        navigate('/home/tournament');
    }
    const GotoScoreBoard = () => {
        navigate('/home/scoreboard');
    }
    const GotoDashboard = () => {
        navigate('/home/dashboard');
    }
    const user_type = "teacher";
    return (
        
        <nav class="bg-white px-2 sm:px-4 py-1 dark:bg-gray-900">
            <div class="container flex  justify-between items-center">
                <a href="/home" class="flex items-center">
                    <Logo/>
                </a>
                <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                </button>
                <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li id="" className="bg">
                            <button className="text-white hover:text-green-400" onClick={GotoSafe}>
                                <BsSafeFill/>
                                My safe
                            </button>
                        </li>
                        <li id="" className="header__list__item">
                            <button className="text-white hover:text-green-400" onClick={GotoClass}>
                                <FaChalkboardTeacher/>
                                Class <span className="class_name">{className}</span>
                            </button>
                        </li>
                        <li id="" className="text-white hover:text-green-400">
                            <Link to='/home'></Link>
                                <button className="text-white hover:text-green-400" onClick={GotoTournament}>
                                    <FaChessKing/>
                                    Tournament
                                </button>
                            </li>
                            <li id="" className="text-white hover:text-green-400">
                                <button className="header__list__item_btn" onClick={GotoScoreBoard}>
                                    <BsFillBarChartFill/>
                                    Score Borad
                                    <span class="inline-flex justify-center items-center ml-2 w-4 h-4 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                                        {score}
                                    </span>
                                </button>
                            </li>
                            {user.userType === "student" ? (
                            <>
                            </>):(
                                <li id="" className="text-white hover:text-green-400">
                                    <button className="header__list__item_btn" onClick={GotoDashboard}>
                                        <RiAdminFill/>
                                        Mangement
                                    </button>
                                </li>
                            )
                            
                            }
                    </ul>
                </div>
                <div className="user">
                    <Avatar name={realName} src={userImg} />
                    <span className="text-white">
                        {user.realName}
                    </span>
                </div>
                <div className="logout">
                    <button className="text-white hover:text-green-400" onClick={onLogout}>
                        Logout
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </button>
                </div>
            </div>
        </nav>

export default Header;
