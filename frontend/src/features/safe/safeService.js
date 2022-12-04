import axios from 'axios';

const API_URL_SAFES = 'http://localhost:8080/safes';

export const downloadSafe = async (userData, safeId) => {
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

const postKey = async (userData, safeId, file) => {
	const formData = new FormData();
	formData.append('key', file);
	const response = await axios.post(API_URL_SAFES + '/break', formData, {
		headers: {
			Authorization: `Bearer ${userData.token}`,
			'Content-Type': 'multipart/form-data',
		},
		params: {
			safeId,
		},
	});
	return response.data;
};

const safesService = {
	downloadSafe,
	postKey,
};

export default safesService;
