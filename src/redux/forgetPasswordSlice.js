import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SERVER_URL } from './apiConstants';

const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Origin': '*',
};
const forgetpassword = 'forgot-password';
export const forgetPassword = createAsyncThunk('api/forgetpassword', async (data) => {
  const body = {
    email: data.email,
  };
  return axios
    .post(`${SERVER_URL}/${forgetpassword}`, body, { headers })
    .then((response) => response.data)
    .catch((e) => e);
});

const forgetPasswordSlice = createSlice({
  name: 'api',
  initialState: {
    loading: false,
    forgetPasswordData: {},
    error: '',
  },
  extraReducers: {
    [forgetPassword.pending]: (state) => {
      /* eslint-disable no-param-reassign */
      state.loading = true;
    },
    [forgetPassword.fulfilled]: (state, action) => {
      state.loading = false;
      state.signupData = action.payload;
      if (action.payload && action.payload.data) {
        toast.success('Reset Password mail sent to your Email');
      }
    },
    [forgetPassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error('Error');
    },
  },
});

export default forgetPasswordSlice.reducer;
