// import Safe from './utilsComponents/Safe';
import Spinner from '../../../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getTournamentInfo, getTournamentSafes } from '../../../features/tournament/tournamentSlice';
import { useEffect, useState } from 'react';

import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';

const HomeTournament = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { tournamentInfo, tournamentSafes, isLoading, isInfoError, isSafesError, isSuccess, message } = useSelector(
		(state) => state.tournament
	);

	const [safes, setSafes] = useState([]);
	const [tournamentEnable, setTournamentEnable] = useState(false);

	useEffect(() => {
		dispatch(getTournamentInfo(user));
	}, []);

	useEffect(() => {
		if (tournamentInfo) {
			if (tournamentInfo.deadline !== undefined || tournamentInfo.deadline < Date.now()) {
				setTournamentEnable(true);
				dispatch(getTournamentSafes({ user, tournamentId: tournamentInfo.tournaments[0]._id }));
			}
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

	if (isInfoError) {
		return (
			<Alert status='error'>
				<AlertIcon />
				<AlertDescription>{message}</AlertDescription>
			</Alert>
		);
	}

	if (!tournamentEnable) {
		return (
			<div className='flex flex-col items-center m-4 p-4'>
				<div className='text-lg font-bold'>
					Tournament is not open at this moment, please contact your teacher.
				</div>
			</div>
		);
	}

	if (isSafesError) {
		return (
			<Alert status='error'>
				<AlertIcon />
				<AlertDescription>{message}</AlertDescription>
			</Alert>
		);
	}

	if (safes.length === 0) {
		return (
			<div className='flex flex-col items-center m-4 p-4'>
				<img src={require('../../../assets/Images/safes_not_found.png')} className='h-40' />
				<div className='text-lg font-bold'>No safes were found!</div>
			</div>
		);
	}

	return (
		<div className='flex flex-wrap m-4 gap-4'>
			{safes.map((safe) => {
				safe = { ...safe, solved: user.safesSolved.includes(safe._id) };
				return <Safe key={safe._id} safe={safe} type='tournament'></Safe>;
			})}
		</div>
	);
};
export default HomeTournament;

const Safe = ({ safe }) => {
	return <div className='h-52 w-52 border bg-accent-color rounded-md'>{safe.safeName}</div>;
};
