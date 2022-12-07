import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';

import Safe from './utilsComponents/Safe';
import Spinner from '../../../components/Spinner';
import tournamentService from '../../../features/tournament/tournamentServices';
import { getSolvedSafes } from '../../../features/userSafe/userSafeSlice';

const HomeTournament = () => {
	const { user } = useSelector((state) => state.auth);
	const { solvedSafes } = useSelector((state) => state.safe);
	const dispatch = useDispatch();
	const [availableTournaments, setAvailableTournaments] = useState([]);
	const [tournamentSafes, setTournamentSafes] = useState([]);
	const [selectedTournament, setSelectedTournament] = useState(undefined);

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		dispatch(getSolvedSafes(user));
		tournamentService
			.getTournamentInfo(user)
			.then(({ tournaments }) => {
				setAvailableTournaments(tournaments);
			})
			.catch((err) => console.log(err));
		setIsLoading(false);
	}, [dispatch]);

	useEffect(() => {
		if (availableTournaments.length <= 0) return;
		setSelectedTournament(availableTournaments[0]);
	}, [availableTournaments]);

	useEffect(() => {
		if (selectedTournament) {
			setIsLoading(true);
			tournamentService
				.getTournamentSafe(user, selectedTournament._id)
				.then(({ safes }) => {
					setTournamentSafes(safes);
				})
				.catch((err) => console.log(err));
			setIsLoading(false);
		}
	}, [selectedTournament]);

	// Always false, why?
	// if (isLoading) {
	// 	return (
	// 		<div>
	// 			<Spinner />
	// 		</div>
	// 	);
	// }

	// if (isInfoError) {
	// 	return (
	// 		<Alert status='error'>
	// 			<AlertIcon />
	// 			<AlertDescription>{message}</AlertDescription>
	// 		</Alert>
	// 	);
	// }

	if (!selectedTournament || (selectedTournament.deadline && selectedTournament.deadline < Date.now())) {
		return (
			<div className='flex flex-col items-center m-4 p-4'>
				<div className='text-lg font-bold text-black dark:text-white'>
					Tournament is not open at this moment, please contact your teacher.
				</div>
			</div>
		);
	}

	// if (isSafesError) {
	// 	return (
	// 		<Alert status='error'>
	// 			<AlertIcon />
	// 			<AlertDescription>{message}</AlertDescription>
	// 		</Alert>
	// 	);
	// }

	if (tournamentSafes.length === 0) {
		return (
			<div className='flex flex-col items-center m-4 p-4'>
				<img src={require('../../../assets/Images/safes_not_found.png')} className='h-40' />
				<div className='text-lg font-bold'>No safes were found!</div>
			</div>
		);
	}

	return (
		<div className='flex flex-wrap m-4 gap-4'>
			{tournamentSafes.map((safe) => {
				safe = { ...safe, solved: solvedSafes.includes(safe._id) };
				return <Safe key={safe._id} safe={safe} type='tournament'></Safe>;
			})}
		</div>
	);
};
export default HomeTournament;
