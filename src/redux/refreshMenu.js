import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setCookies } from '../hooks/useCookies';
import { SERVER_URL } from './apiConstants';

const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Origin': '*',
};
const refresh = 'refresh-menu';
export const refreshMenu = createAsyncThunk('api/refreshMenu', async (data) => {
  const body = {
    role: data,
  };
  return axios
    .post(`${SERVER_URL}/${refresh}`, body, { headers })
    .then((response) => {
      if (response.status === 200) {
        // setCookies('USERMENU', response.data.data.userMenu.userMenu);
        setCookies('USERPERMISSION', response.data.data.userMenu.permission);
      }
      return response.data;
    })
    .catch((e) => e);
});

const refreshMenuSlice = createSlice({
  name: 'api',
  initialState: {
    loading: false,
    refreshMenuData: {},
    error: '',
  },
  extraReducers: {
    [refreshMenu.pending]: (state) => {
      /* eslint-disable no-param-reassign */
      state.loading = true;
    },
    [refreshMenu.fulfilled]: (state, action) => {
      state.loading = false;
      state.refreshMenuData = action.payload;
      toast.success('Refresh Menu Completed');
    },
    [refreshMenu.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error('Error');
    },
  },
});

export default refreshMenuSlice.reducer;
