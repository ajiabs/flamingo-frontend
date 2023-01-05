import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setCookies } from '../hooks/useCookies';
import { SERVER_URL } from './apiConstants';

const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Origin': '*',
};
const profileedit = 'profile-edit';
export const ProfileEdits = createAsyncThunk('api/profileedit', async (data) => {
  const body = {
    token: data.token,
    userid: data.userid,
    email: data.email,
    Phone: data.phone,
    name: data.name,
  };
  return axios
    .post(`${SERVER_URL}/${profileedit}`, body, { headers })
    .then((response) => {
      if (response.status === 200) {
        setCookies('USERNAME', data.name);
      }
      return response.data;
    })
    .catch((e) => e);
});

const profileEditSlice = createSlice({
  name: 'api',
  initialState: {
    loading: false,
    ProfileEditData: {},
    error: '',
  },
  extraReducers: {
    [ProfileEdits.pending]: (state) => {
      /* eslint-disable no-param-reassign */
      state.loading = true;
    },
    [ProfileEdits.fulfilled]: (state, action) => {
      state.loading = false;
      state.ProfileEditData = action.payload;
      toast.success('Profile Updated Successfully');
    },
    [ProfileEdits.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error('Error');
    },
  },
});

export default profileEditSlice.reducer;
