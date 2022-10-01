import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';

import classSerivce from './classServices';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

// Helper function
// Register user 
export const getClassInfo = createAsyncThunk('class/getsafe',async (user,thunkAPI) =>{
    try {
        return await classSerivce.getClassInfo();
    } catch (error) {
        const message = ((error.response && error.response.data && error.response.data.message) || error.message || error.toString() );
        return thunkAPI.rejectWithValue(message) ;
        
    }
}); 

// The initial state
const initialState = {
    className:'',
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}
export const classSlice = createSlice({
    name:'class',
    initialState,
    reducers:{
        reset: (state) => initialState,
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getClassInfo.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getClassInfo.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.className = action.payload;
        })
        .addCase(getClassInfo.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.className = '';
        })
    }
})


export const {reset} = classSlice.actions;
export default classSlice.reducer