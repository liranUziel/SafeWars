import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import classRecuder from '../features/class/classSlice';
import usersafeRecuder from '../features/userSafe/userSafeSlice';

// Create a store (hold the global state)
export const store = configureStore({
  reducer: {
    auth:authReducer,
    class:classRecuder,
    safe:usersafeRecuder,
  },
});
