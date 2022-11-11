import Safe from './Safe';
import '../../styles/Safe.css';
import Spinner from '../../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getTournamentInfo, getTournamentSafes } from '../../features/tournament/tournamentSlice';
import { useEffect, useState } from 'react';

const HomeTournament = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { tournamentInfo, tournamentSafes, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.tournament
	);
	const [safes, setSafes] = useState([]);
	const [tournamentEnable, setTournamentEnable] = useState(false);
	useEffect(() => {
		dispatch(getTournamentInfo(user));
		dispatch(getTournamentSafes(user));
	}, [dispatch]);
	useEffect(() => {
		if (tournamentInfo.deadline !== undefined || tournamentInfo.deadline < Date.now()) {
			setTournamentEnable(true);
		}
	}, [tournamentInfo]);
	useEffect(() => {
		setSafes(tournamentSafes);
	}, [tournamentSafes]);
	if (isLoading) {
		return (
			<div>
				<Spinner />
			</div>
		);
	}

	if (safes.length !== 0 && tournamentEnable)
		return (
			<div className='safe_container'>
				{
					// arry of arrays
					safes.map((safe) => (
						<Safe key={safe._id} safe={safe} type='tournament'></Safe>
					))
				}
			</div>
		);
	else if (tournamentEnable) {
		return (
			<div className='empty_container'>
				<img src={import('../../assets/Images/safes_not_found.png')} className='page__not__found__img' />
				Safes list is empty
			</div>
		);
	} else {
		return (
			<div>
				<div className='empty_container'>
					Tournament is not open at this moment, please contect your teacher.
				</div>
			</div>
		);
	}
};

export default HomeTournament;
