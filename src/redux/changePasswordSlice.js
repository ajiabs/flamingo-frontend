import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SERVER_URL } from './apiConstants';

const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Origin': '*',
};
const changepassword = 'change-password';
export const changePassword = createAsyncThunk('api/changepassword', async (data) => {
  const body = {
    password: data.Password,
    token: data.token,
    userid: data.userid,
  };
  return axios
    .post(`${SERVER_URL}/${changepassword}`, body, { headers })
    .then((response) => {
      if (response.status === 200) {
        // console.log(response.data);
      }
      return response.data;
    })
    .catch((e) => e);
});

const changePasswordSlice = createSlice({
  name: 'api',
  initialState: {
    loading: false,
    changePasswordData: {},
    error: '',
  },
  extraReducers: {
    [changePassword.pending]: (state) => {
      /* eslint-disable no-param-reassign */
      state.loading = true;
    },
    [changePassword.fulfilled]: (state, action) => {
      state.loading = false;
      state.changePasswordData = action.payload;
      toast.success('Change Password successfully Completed');
    },
    [changePassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error('Error');
    },
  },
});

export default changePasswordSlice.reducer;
