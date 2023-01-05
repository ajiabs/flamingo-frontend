import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SERVER_URL } from './apiConstants';

const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Origin': '*',
};
const resetpassword = 'reset-password';
export const resetPassword = createAsyncThunk('api/resetpassword', async (data) => {
  const body = {
    password: data.Password,
    token: data.token,
  };

  // console.log(body);
  return axios
    .post(`${SERVER_URL}/${resetpassword}`, body, { headers })
    .then((response) => {
      if (response.status === 200) {
        // console.log(response.data);
      }
      return response.data;
    })
    .catch((e) => e);
});

const forgetPasswordSlice = createSlice({
  name: 'api',
  initialState: {
    loading: false,
    resetPasswordData: {},
    error: '',
  },
  extraReducers: {
    [resetPassword.pending]: (state) => {
      /* eslint-disable no-param-reassign */
      state.loading = true;
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.loading = false;
      state.resetPasswordData = action.payload;
      toast.success('Reset password Success');
    },
    [resetPassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error('Error');
    },
  },
});

export default forgetPasswordSlice.reducer;
