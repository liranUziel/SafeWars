import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';

import userSafeSlice from './userSafeServices';

// Get user from localStorage
// const user = JSON.parse(localStorage.getItem('user'));

// Helper function
// Register user 
export const getSafe = createAsyncThunk('safe/getSafe',async (user,thunkAPI) =>{
    try {
        return await userSafeSlice.getSafe(user);
    } catch (error) {
        const message = ((error.response && error.response.data && error.response.data.message) || error.message || error.toString() );
        return thunkAPI.rejectWithValue(message) ;
        
    }
}); 


// export const getClassSafes = createAsyncThunk('class/getClassSafes',async (user,thunkAPI) =>{
//     try {
//         return await classSerivce.getClassSafes(user);
//     } catch (error) {
//         const message = ((error.response && error.response.data && error.response.data.message) || error.message || error.toString() );
//         return thunkAPI.rejectWithValue(message) ;
        
//     }
// }); 


// The initial state
const initialState = {
    safeName:"",
    file:"",
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}
export const safeSlice = createSlice({
    name:'safe',
    initialState,
    reducers:{
        removeSafe: (state) => initialState,
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getSafe.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getSafe.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.safeName = action.payload[0].safeName;        
        })
        .addCase(getSafe.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.safeName = "";
        })
    
    }
})


export const {removeSafe} = safeSlice.actions;
export default safeSlice.reducer