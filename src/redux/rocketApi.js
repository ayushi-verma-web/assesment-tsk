import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  rocketData: [],
};

export const getSpacexdata = createAsyncThunk(
  'api.spacexdata.com/v3/launches',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.get('https://api.spacexdata.com/v3/launches');
      console.log('assss', res);
      return {
        resultData: res,
      };
    } catch (err) {
      return rejectWithValue({
        msg: err,
        code: err,
      });
    }
  },
);

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getSpacexdata.fulfilled, (state, { payload }) => {
      const { resultData } = payload || {};
      console.log('resultData', { resultData });
      state.rocketData = resultData?.data;
    });
  },
});

export default adminSlice.reducer;
