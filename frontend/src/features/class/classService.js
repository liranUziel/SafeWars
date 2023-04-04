import axios from 'axios';

const API_URL_CLASS = `http://${import.meta.env.VITE_BACKEND_IP}:8080/classes`;
const API_URL_CLASS_SAFES = `http://${import.meta.env.VITE_BACKEND_IP}:8080/classes/safes`;

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
	return response.data.safes;
};

const getClassStudents = async (userData, classId) => {
	const response = await axios.get(API_URL_CLASS + '/students', {
		headers: { Authorization: `Bearer ${userData.token}` },
		params: { classId },
	});
	return response.data;
};

const addStudentToClass = async (userData, classId, studentUserName) => {
	const response = await axios.post(
		API_URL_CLASS + '/students',
		{
			classId,
			studentUserName,
		},
		{
			headers: { Authorization: `Bearer ${userData.token}` },
		}
	);
	return response.data;
};

const classService = {
	getClassInfo,
	getClassSafes,
	getClassStudents,
	addStudentToClass,
};

export default classService;
