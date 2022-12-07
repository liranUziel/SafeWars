import axios from 'axios';

const API_URL_SAFES = 'http://localhost:8080/safes';

const downloadSafe = async (userData, safeId) => {
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

const postSafe = async (userData, classesToAdd, file) => {
	const formData = new FormData();
	formData.append('safe', file);
	const response = await axios.post(API_URL_SAFES, formData, {
		headers: {
			Authorization: `Bearer ${userData.token}`,
			'Content-Type': 'multipart/form-data',
		},
		params: {
			classesToAdd: JSON.stringify(classesToAdd),
		},
	});
	console.log(response);
	return response.data;
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
	postSafe,
	postKey,
	downloadSafe,
};

export default safesService;
