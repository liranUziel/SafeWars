import axios from 'axios';

const API_URL_USERS = `http://${import.meta.env.VITE_BACKEND_IP}:8080/users`;
const API_URL_SAFES = `http://${import.meta.env.VITE_BACKEND_IP}:8080/safes`;

const getSafe = async (userData) => {
	const response = await axios.get(API_URL_USERS + '/safe', {
		headers: { Authorization: `Bearer ${userData.token}` },
	});
	return response.data;
};

const deleteSafe = async (userData, safeId) => {
	const response = await axios.delete(API_URL_SAFES, {
		headers: { Authorization: `Bearer ${userData.token}` },
		data: { safeId },
	});
	return response.data;
};

const getSolvedSafes = async (userData) => {
	const response = await axios.get(API_URL_USERS + '/user', {
		headers: { Authorization: `Bearer ${userData.token}` },
	});

	return response.data.solvedSafes;
};

const userSafeService = {
	getSafe,
	deleteSafe,
	getSolvedSafes,
};

export default userSafeService;
