import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import userSafeServices from './userSafeServices';

// Get user from localStorage
// const user = JSON.parse(localStorage.getItem('user'));

// Helper function
// Register user
export const getSafe = createAsyncThunk('safe/getSafe', async (user, thunkAPI) => {
	try {
		const { safes } = await userSafeServices.getSafe(user);
		return safes;
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const deleteSafe = createAsyncThunk('safe/deleteSafe', async ({ user, safeId }, thunkAPI) => {
	try {
		const { safes } = await userSafeServices.deleteSafe(user, safeId);
		return safes;
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) || error.message || error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

// The initial state
const initialState = {
	safes: [],
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
				state.safes = action.payload;
			})
			.addCase(getSafe.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.safes = [];
			})
			.addCase(deleteSafe.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteSafe.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.safes = action.payload;
			})
			.addCase(deleteSafe.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.safes = [];
			});
	},
});

export const { removeSafe } = safeSlice.actions;
export default safeSlice.reducer;
