import axios from 'axios';

const API_URL_SAFE = 'http://localhost:8080/users/safe';
//const URL ='http://localhost:8080/safe/d=asdaklsjdmkla'

const getSafe = async (userData) => {
	const response = await axios.get(API_URL_SAFE, { headers: { Authorization: `Bearer ${userData.token}` } });
	return response.data;
};

const deleteSafe = async (userData, safeId) => {
	const response = await axios.delete(
		API_URL_SAFE,
		{ safeId },
		{ headers: { Authorization: `Bearer ${userData.token}` } }
	);
	return response.data;
};

const userSafeService = {
	getSafe,
	deleteSafe,
};

export default userSafeService;
