import axios from 'axios';

const API_URL_USERS = 'http://localhost:8080/users/safe';
const API_URL_SAFES = 'http://localhost:8080/safes';

const getSafe = async (userData) => {
	const response = await axios.get(API_URL_USERS, { headers: { Authorization: `Bearer ${userData.token}` } });
	return response.data;
};

const deleteSafe = async (userData, safeId) => {
	const response = await axios.delete(API_URL_SAFES, {
		headers: { Authorization: `Bearer ${userData.token}` },
		data: { safeId },
	});
	return response.data;
};

const userSafeService = {
	getSafe,
	deleteSafe,
};

export default userSafeService;
