import axios from 'axios';

const API_URL_CLASS = 'http://localhost:8080/classes';
const API_URL_CLASS_SAFES = 'http://localhost:8080/classes/safes';

const getClassInfo = async (userData) => {
	const response = await axios.get(API_URL_CLASS, {
		headers: { Authorization: `Bearer ${userData.token}` },
	});
	return response.data;
};

const getClassSafes = async (userData) => {
	const response = await axios.get(API_URL_CLASS_SAFES, {
		headers: { Authorization: `Bearer ${userData.token}` },
	});
	console.log(response.data.safes);
	return response.data.safes;
};

const getClassStudents = async (userData, classId) => {
	const response = await axios.get(API_URL_CLASS + '/students', {
		headers: { Authorization: `Bearer ${userData.token}` },
		params: { classId },
	});
	return response.data;
};

const classService = {
	getClassInfo,
	getClassSafes,
	getClassStudents,
};

export default classService;
