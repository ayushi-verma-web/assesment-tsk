import { configureStore } from '@reduxjs/toolkit';
import rocketReducer from './rocketApi';

const store = configureStore({
  reducer: {
    rocket: rocketReducer,
  },
});
export default store;
