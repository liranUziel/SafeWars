import axios from 'axios'

const API_URL = 'http://localhost:8080/users'

// Register user
// Async function
// Algo:
//  Get userData (realName,userName,Email,Password)
//  Send Post request to server (using axios)
//  If we got response save the user info to local Storage
// Return:

const register = async (userDate) =>{
    const response = await axios.post(API_URL,userDate);

    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }

    return response.data;
}

const login = async (userDate) =>{
    const response = await axios.post(API_URL+'/login',userDate);

    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }

    return response.data;
}

const logout = async () =>{
    localStorage.removeItem('user');
}

const authService = {
    register,
    logout,
    login
};

export default authService;