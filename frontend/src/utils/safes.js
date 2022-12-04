import axios from 'axios';

const API_URL_SAFES = 'http://localhost:8080/safes';

export const getSafe = async (userData, safeId) => {
	const response = await axios.get(API_URL_SAFES, {
		headers: {
			Authorization: `Bearer ${userData.token}`,
		},
		responseType: 'blob',
		params: {
			safeId,
		},
	});
	return response;
};

const safesService = {
	getSafe,
};

export default safesService;
