/* eslint-disable no-sequences */
/* eslint-disable no-plusplus */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getCookies } from '../hooks/useCookies';
import { SERVER_BASE_URL } from './apiConstants';

function toFormData(o, formData) {
  // eslint-disable-next-line no-sequences
  return Object.entries(o).reduce((d, e) => (d.append(...e), d), formData);
}

export const Entry = createAsyncThunk('api/create', async (data) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${getCookies('Token')}`,
  };
  const formData = new FormData();
  const { actionUrl } = data;
  const { actionMethod } = data;
  delete data.actionUrl;
  delete data.actionMethod;
  const filesToAppend = Object.keys(data).length && data.apiData.File ? data.apiData.File : [];
  if (filesToAppend.length) {
    for (let i = 0; i < filesToAppend.length; i++) {
      formData.append('File', filesToAppend[i]);
    }
    delete data.apiData.File;
    headers['Content-Type'] = 'multipart/form-data';
  }
  switch (actionMethod) {
    case 'post':
      return axios
        .post(
          `${SERVER_BASE_URL}/${actionUrl}`,
          filesToAppend.length ? toFormData(data.apiData, formData) : data.apiData,
          { headers },
          {
            headers,
          }
        )
        .then((response) => response.data)
        .catch((e) => e.response.data);
    case 'patch':
      console.log(data.apiData);
      return axios
        .patch(
          `${SERVER_BASE_URL}/${actionUrl}`,
          filesToAppend.length ? toFormData(data.apiData, formData) : data.apiData,
          {
            headers,
          }
        )
        .then((response) => response.data)
        .catch((e) => e.response.data);

    case 'delete':
      return axios
        .delete(`${SERVER_BASE_URL}/${actionUrl}`, { headers })
        .then((response) => response.data)
        .catch((e) => e.response.data);
    default:
      return axios
        .get(`${SERVER_BASE_URL}/${actionUrl}`, { headers })
        .then((response) => response.data)
        .catch((e) => e.response.data);
  }
});

const EntrySlice = createSlice({
  name: 'api',
  initialState: {
    loading: false,
    Data: {},
    error: '',
  },
  extraReducers: {
    [Entry.pending]: (state) => {
      /* eslint-disable no-param-reassign */
      state.loading = true;
    },
    [Entry.fulfilled]: (state, action) => {
      state.loading = false;
      state.Data = action.payload;
    },
    [Entry.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default EntrySlice.reducer;
