import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { REACT_APP_API_POST_USER } from './apiConstants';

const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Origin': '*',
};
const tableDelete = 'delete';
export const tabledelete = createAsyncThunk('api/tabledelete', async (data) => {
  const body = {
    ids: data,
  };

  return axios
    .post(`${REACT_APP_API_POST_USER}/${tableDelete}`, body, { headers })
    .then((response) => {
      if (response.status === 200) {
        // console.log(response.data);
      }
      return response.data;
    })
    .catch((e) => e);
});

const tabledeleteSlice = createSlice({
  name: 'api',
  initialState: {
    loading: false,
    tableData: {},
    error: '',
  },
  extraReducers: {
    [tabledelete.pending]: (state) => {
      /* eslint-disable no-param-reassign */
      state.loading = true;
    },
    [tabledelete.fulfilled]: (state, action) => {
      state.loading = false;
      state.tableData = action.payload;
      toast.success('Deleted Successfully');
    },
    [tabledelete.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.error('Error');
    },
  },
});

export default tabledeleteSlice.reducer;
