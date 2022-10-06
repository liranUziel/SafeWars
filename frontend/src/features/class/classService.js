
import axios from 'axios'

const API_URL_CLASS = 'http://localhost:8080/class'
const API_URL_CLASS_SAFES = 'http://localhost:8080/class/safes'


const getClassInfo = async (userData) =>{
    const response = await axios.get(API_URL_CLASS,{headers:{Authorization:`Bearer ${userData.token}`}});
    return response.data;
}

const getClassSafes = async (userData) =>{
    const response = await axios.get(API_URL_CLASS_SAFES,{headers:{Authorization:`Bearer ${userData.token}`}});
    return response.data;
}

const classService = {
    getClassInfo,
    getClassSafes,
};


export default classService;