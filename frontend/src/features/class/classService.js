import axios from "axios";

const API_URL_CLASS = "http://localhost:8080/class";
const API_URL_CLASS_SAFES = "http://localhost:8080/class/safes";

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
  return response.data;
};

const getClassStudents = async (userData, classId) => {
  console.log(classId);
  const response = await axios.get(API_URL_CLASS + "/students", {
    headers: { Authorization: `Bearer ${userData.token}` },
    params: { classId },
  });
  console.log(response.data);
  return response.data;
};

const classService = {
  getClassInfo,
  getClassSafes,
  getClassStudents,
};

export default classService;
