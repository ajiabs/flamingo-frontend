import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setCookies } from '../hooks/useCookies';
import { SERVER_URL } from './apiConstants';

const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Origin': '*',
};
const login = 'login';
export const logIn = createAsyncThunk('api/logIn', async (data) => {
  const body = { email: data.email, password: data.Password };
  return axios
    .post(`${SERVER_URL}/${login}`, body, { headers })
    .then((response) => {
      if (response.status === 200) {
        setCookies('Token', response.data.data.tokens.access.token);
        setCookies('refreshToken', response.data.data.tokens.refresh.token);
        setCookies('USERID', response.data.data.user.id);
        setCookies('PROFILE', response.data.data.user.image);
        setCookies('USERNAME', response.data.data.user.name);
        setCookies('USERROLE', response.data.data.user.role.name);
        setCookies('USERMENU', response.data.data.userMenu);
        setCookies('USERPERMISSION', response.data.data.user.role.permissions);
        setCookies('THEME', 'false');
        return response.data;
      }
      return response;
    })
    .catch((e) => e);
});

const loginSlice = createSlice({
  name: 'api',
  initialState: {
    loading: false,
    loginData: {},
    error: '',
  },
  extraReducers: {
    [logIn.pending]: (state) => {
      /* eslint-disable no-param-reassign */
      state.loading = true;
    },
    [logIn.fulfilled]: (state, action) => {
      state.loading = false;
      state.loginData = action.payload;
    },
    [logIn.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default loginSlice.reducer;
