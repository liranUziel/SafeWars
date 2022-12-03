import axios from 'axios';

const API_URL = 'http://localhost:8080/users';

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

const authService = {
	register,
	logout,
	login,
};

export default authService;
