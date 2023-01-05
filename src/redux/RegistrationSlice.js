import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SERVER_URL } from './apiConstants';

const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Origin': '*',
};
const signup = 'signup';
export const signUp = createAsyncThunk('api/signup', async (data) => {
  const body = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    password: data.password,
    role: data.role,
  };
  return axios
    .post(`${SERVER_URL}/${signup}`, body, { headers })
    .then((response) => response.data)
    .catch((e) => e);
});

const registrationSlice = createSlice({
  name: 'api',
  initialState: {
    loading: false,
    signupData: {},
    error: '',
  },
  extraReducers: {
    [signUp.pending]: (state) => {
      /* eslint-disable no-param-reassign */
      state.loading = true;
    },
    [signUp.fulfilled]: (state, action) => {
      state.loading = false;
      state.signupData = action.payload;
      if (action.payload && action.payload.data) {
        toast.success('User Registration successfull please check mail to verify');
      }
    },
    [signUp.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error('Error');
    },
  },
});

export default registrationSlice.reducer;
