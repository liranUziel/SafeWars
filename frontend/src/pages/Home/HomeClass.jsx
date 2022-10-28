import Safe from './Safe';
import '../../styles/Safe.css';
import Spinner from '../../components/Spinner';
import PopUp from './PopUp';

import { useDispatch, useSelector } from 'react-redux';
import { clearClass, getClassInfo, getClassSafes } from '../../features/class/classSlice';
import { useEffect, useState } from 'react';

const HomeClass = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { classSafes, isLoading, isError, isSuccess, message } = useSelector((state) => state.class);
	const [safes, setSafes] = useState([]);
	const [popupActive, setPopupActive] = useState(false);
	useEffect(() => {
		dispatch(getClassSafes(user));
	}, [dispatch]);

	useEffect(() => {
		setSafes(classSafes);
	}, [classSafes]);
	const closeOverlay = (e) => {
		setPopupActive(false);
		// restoreform();
	};
	if (isLoading) {
		return (
			<div>
				<Spinner />
			</div>
		);
	}
	if (safes.length !== 0)
		return (
			<div className='safe_container'>
				{safes.map((safe) => {
					safe = { ...safe, solved: user.safesSolved.includes(safe._id) };
					return <Safe key={safe._id} safe={safe} type='public' setPopupActive={setPopupActive}></Safe>;
				})}
				{/* <PopUp popupActive={popupActive} closeOverlay={closeOverlay} type='public' /> */}
			</div>
		);
	else {
		return (
			<div>
				<div className='empty_container'>
					<img src={require('../../Images/safes_not_found.png')} className='page__not__found__img' />
					Safes list is empty
				</div>
			</div>
		);
	}
};

export default HomeClass;
