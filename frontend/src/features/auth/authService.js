import axios from 'axios';

const API_URL = `http://${import.meta.env.VITE_BACKEND_IP}:8080/users`;

// Register user
// Async function
// Algo:
//  Get userData (realName,userName,Email,Password)
//  Send Post request to server (using axios)
//  If we got response save the user info to local Storage
// Return:

const register = async (userData) => {
	const response = await axios.post(API_URL, userData);

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data));
	}

	return response.data;
};

const login = async (userData) => {
	const response = await axios.post(API_URL + '/login', userData);

	if (response.data) {
		let simplifyUserInfo = { name: response.data.name, token: response.data.token };
		localStorage.setItem('user', JSON.stringify(response.data));
	}

	return response.data;
};

const logout = async () => {
	localStorage.removeItem('user');
};

const getData = async (userData) => {
	const response = await axios.get(API_URL + '/user', {
		headers: { Authorization: `Bearer ${userData.token}` },
	});

	return response.data;
};

const authService = {
	register,
	logout,
	login,
	getData,
};

export default authService;
