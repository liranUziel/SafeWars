import axios from 'axios'

const API_URL_CLASS = 'http://localhost:8080/class'
const API_URL_CLASS_SAFES = 'http://localhost:8080/class/safes'


const getSafeInfo = async () =>{
    const response = await axios.get(API_URL_CLASS);
    return response.data;
}


const classService = {
    getSafeInfo,
};


export default classService;