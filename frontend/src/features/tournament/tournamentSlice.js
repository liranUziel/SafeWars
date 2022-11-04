import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';

import tournamentService from './tournamentServices';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

// Helper function
// Register user 
export const getTournamentInfo = createAsyncThunk('tournament/getTournamentInfo',async (user,thunkAPI) =>{
    try {
        return await tournamentService.getTournamentInfo(user);
    } catch (error) {
        const message = ((error.response && error.response.data && error.response.data.message) || error.message || error.toString() );
        return thunkAPI.rejectWithValue(message) ;
        
    }
}); 


export const getTournamentSafes = createAsyncThunk('tournament/getTournamentSafes',async (user,thunkAPI) =>{
    try {
        return await tournamentService.getTournamentSafe(user);
    } catch (error) {
        const message = ((error.response && error.response.data && error.response.data.message) || error.message || error.toString() );
        return thunkAPI.rejectWithValue(message) ;
        
    }
}); 


export const createTournamentSafes = createAsyncThunk('tournament/createTournamentSafes',async ({user,classId,showScore,deadLine},thunkAPI) =>{
    try {
        console.log(`tournamentSlice.js: creating tournament for class ${classId}`);
        return await tournamentService.createTournamentSafe(user,classId,showScore,deadLine);
    } catch (error) {
        const message = ((error.response && error.response.data && error.response.data.message) || error.message || error.toString() );
        return thunkAPI.rejectWithValue(message) ;
        
    }
}); 


// The initial state
const initialState = {
    tournamentInfo:[],
    tournamentSafes:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}
export const classSlice = createSlice({
    name:'tournament',
    initialState,
    reducers:{
        clearTournament: (state) => initialState,
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getTournamentInfo.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getTournamentInfo.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.tournamentInfo = action.payload;
        })
        .addCase(getTournamentInfo.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.tournamentInfo = [];
        })
        .addCase(getTournamentSafes.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getTournamentSafes.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.tournamentSafes = action.payload;
        })
        .addCase(getTournamentSafes.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.tournamentSafes = [];
        })
        .addCase(createTournamentSafes.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(createTournamentSafes.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.tournamentInfo = action.payload;
        })
        .addCase(createTournamentSafes.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.tournamentInfo = [];
        })
        
    }
})


export const {clearClass} = classSlice.actions;
export default classSlice.reducer