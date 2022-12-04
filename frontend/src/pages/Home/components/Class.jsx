import Safe from './utilsComponents/Safe';
import Spinner from '../../../components/Spinner';

import { useDispatch, useSelector } from 'react-redux';
import { getClassSafes } from '../../../features/class/classSlice';
import { useEffect, useState } from 'react';

import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';
import { getUserData } from '../../../features/auth/authSlice';

const HomeClass = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { classSafes, isLoading, isError, isSuccess, message } = useSelector((state) => state.class);
	const [safes, setSafes] = useState([]);
	const [popupActive, setPopupActive] = useState(false);

	useEffect(() => {
		//dispatch(getUserData(user));
		dispatch(getClassSafes(user));
	}, []);

	useEffect(() => {
		setSafes(classSafes);
	}, [classSafes]);

	// While loading page load Spinner
	if (isLoading) {
		return (
			<div>
				<Spinner />
			</div>
		);
	}

	if (isError) {
		return (
			<Alert status='error'>
				<AlertIcon />
				<AlertDescription>{message}</AlertDescription>
			</Alert>
		);
	}

	// If no safes where found
	if (safes.length === 0) {
		return (
			<div className='flex flex-col items-center m-4 p-4'>
				<img src={require('../../../assets/Images/safes_not_found.png')} className='h-40' />
				<div className='text-lg font-bold'>No safes where found!</div>
			</div>
		);
	}

	return (
		<div className='flex flex-wrap m-4 gap-4'>
			{safes.map((safe) => {
				safe = { ...safe, solved: user.solvedSafes.includes(safe._id) };
				return <Safe key={safe._id} safe={safe} type='public' setPopupActive={setPopupActive}></Safe>;
			})}
		</div>
	);
};

export default HomeClass;
