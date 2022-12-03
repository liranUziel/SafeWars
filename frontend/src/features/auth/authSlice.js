import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import authService from './authService';

//Slice is combination of initial state, reducer, action

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

// The initial state
const initialState = {
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

// Helper function
// Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
	try {
		return await authService.register(user);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// Helper function
// Register user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
	try {
		return await authService.login(user);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// logout user
export const logout = createAsyncThunk('auth/logout', async () => {
	await authService.logout();
});

export const authSlice = createSlice({
	//name of the slice
	name: 'auth',
	// The initial state
	initialState,
	//list of reducers
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.isError = false;
			state.isSuccess = false;
			state.message = '';
		},
	},
	//extra Recucer
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			});
	},
});
//export The action to use in other js files
export const { reset } = authSlice.actions;
// export the reducer to add it to the store
export default authSlice.reducer;
