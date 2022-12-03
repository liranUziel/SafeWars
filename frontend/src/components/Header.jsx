import { useEffect, useState } from 'react';

import { ReactComponent as DarkLogo } from '../assets/Images/dark_logo.svg';
import { ReactComponent as LightLogo } from '../assets/Images/light_logo.svg';

import { FaUser, FaChalkboardTeacher, FaChessKing } from 'react-icons/fa';
import { BsSafeFill, BsFillBarChartFill } from 'react-icons/bs';
import { Avatar } from '@chakra-ui/react';
import { RiAdminFill } from 'react-icons/ri';

import { useNavigate, Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { logout, reset } from '../features/auth/authSlice';
import { removeSafe, getSafe } from '../features/userSafe/userSafeSlice';

import { clearClass, getClassInfo, getClassSafes } from '../features/class/classSlice';

import { Navbar, Dropdown } from 'flowbite-react';

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

	useEffect(() => {
		dispatch(getClassInfo(user));
		// dispatch(getSafe(user));
	}, []);
	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		dispatch(clearClass());
		dispatch(removeSafe());
		navigate('/');
	};

	const routes = [
		{
			path: '/home/safezone',
			display: (
				<>
					<BsSafeFill /> My Safe
				</>
			),
		},
		{
			path: '/home/class',
			display: (
				<>
					<FaChalkboardTeacher />
					{className}
				</>
			),
		},

		{
			path: '/home/tournament',
			display: (
				<>
					<FaChessKing /> Tournament
				</>
			),
		},
		{
			path: '/home/scoreboard',
			display: (
				<>
					<BsFillBarChartFill /> Score Board
				</>
			),
		},
		{
			path: '/home/dashboard',
			display: (
				<>
					<RiAdminFill /> Managment
				</>
			),
			isAuthorized: true,
		},
	];

	return (
		<header className='w-full dark:bg-dark-accenet-900 bg-light-accent-900 p-2'>
			<Navbar fluid={true} className='!bg-inherit'>
				{/* This is for the Logo */}
				<Link to='/home'>
					<LightLogo className='h-12 sm:h-13 w-fit block dark:hidden' />
					<DarkLogo className='h-12 sm:h-13 w-fit hidden dark:block' />
				</Link>

				{/* This div is for the avatar */}
				<div className='flex md:order-2 px-6'>
					<Dropdown
						arrowIcon={false}
						inline={true}
						label={<Avatar alt='User settings' name={user.realName} rounded='full' />}
					>
						<Dropdown.Header>
							<span className='block text-sm'>{user.realName}</span>
							<span className='block truncate text-sm font-medium'>{user.email}</span>
						</Dropdown.Header>
						<Dropdown.Divider />
						<Dropdown.Item onClick={onLogout}>Sign out</Dropdown.Item>
					</Dropdown>
					<Navbar.Toggle />
				</div>
				{/* Here I Create all the links */}
				<Navbar.Collapse>
					{routes.map((curr, index) => {
						return curr?.isAuthorized === undefined ||
							(curr.isAuthorized && user.userType !== 'student') ? (
							<Link to={curr.path} key={index}>
								<span className='text-black dark:text-white'>{curr.display}</span>
							</Link>
						) : null;
					})}
				</Navbar.Collapse>
			</Navbar>
		</header>
	);
};

export default Header;
