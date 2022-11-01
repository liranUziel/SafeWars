import axios from 'axios'

const API_URL_TOURNAMENT = 'http://localhost:8080/tournament'
const API_URL_TOURNAMENT_SAFES = 'http://localhost:8080/tournament/safes'


const getTournamentInfo = async (userData) =>{
    const response = await axios.get(API_URL_TOURNAMENT,{headers:{Authorization:`Bearer ${userData.token}`}});
    return response.data;
}

const getTournamentSafe = async (userData) =>{
    const response = await axios.get(API_URL_TOURNAMENT_SAFES,{headers:{Authorization:`Bearer ${userData.token}`}});
    return response.data;
}

const createTournamentSafe = async (userData,classId,showScore,deadLine) =>{
    console.log(`tournamentService.js: creating tournament for class ${classId}`);
    const response = await axios.post(API_URL_TOURNAMENT_SAFES,{headers:{Authorization:`Bearer ${userData.token}`}},classId,showScore,deadLine);
    return response.data;
}


const tournamentService = {
    getTournamentInfo,
    getTournamentSafe,
    createTournamentSafe,
};


export default tournamentService;