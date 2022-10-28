import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import classRecuder from './features/class/classSlice';
import usersafeRecuder from './features/userSafe/userSafeSlice';
import tournamentReducer from './features/tournament/tournamentSlice';
// Create a store (hold the global state)
const store = configureStore({
	reducer: {
		auth: authReducer,
		class: classRecuder,
		safe: usersafeRecuder,
		tournament: tournamentReducer,
	},
});

export default store;
