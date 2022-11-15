import axios from 'axios';

const API_URL_TOURNAMENT = 'http://localhost:8080/tournaments';
const API_URL_TOURNAMENT_SAFES = 'http://localhost:8080/tournaments/safes';

const getTournamentInfo = async (userData) => {
	const response = await axios.get(API_URL_TOURNAMENT, { headers: { Authorization: `Bearer ${userData.token}` } });
	console.log(response.data);
	return response.data;
};

const getTournamentSafe = async (userData, tournamentId) => {
	const response = await axios.get(API_URL_TOURNAMENT_SAFES, {
		headers: { Authorization: `Bearer ${userData.token}` },
		params: tournamentId,
	});
	return response.data;
};

const createTournamentSafe = async (userData, classId, showScore, deadLine) => {
	const response = await axios.post(
		API_URL_TOURNAMENT,
		{ classId, showScore, deadLine },
		{
			headers: { Authorization: `Bearer ${userData.token}` },
		}
	);
	return response.data;
};

const tournamentService = {
	getTournamentInfo,
	getTournamentSafe,
	createTournamentSafe,
};

export default tournamentService;
