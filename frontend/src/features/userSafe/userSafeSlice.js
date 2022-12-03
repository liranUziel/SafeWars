import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import userSafeServices from './userSafeServices';

// Get user from localStorage
// const user = JSON.parse(localStorage.getItem('user'));

// Helper function
// Register user
export const getSafe = createAsyncThunk('safe/getSafe', async (user, thunkAPI) => {
	try {
		return await userSafeServices.getSafe(user);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// The initial state
const initialState = {
	safeInfo: {},
	file: '',
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};
export const safeSlice = createSlice({
	name: 'safe',
	initialState,
	reducers: {
		removeSafe: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getSafe.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getSafe.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.safeInfo = action.payload[0];
			})
			.addCase(getSafe.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.safeInfo = {};
			});
	},
});

export const { removeSafe } = safeSlice.actions;
export default safeSlice.reducer;
