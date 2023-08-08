import { createSlice } from '@reduxjs/toolkit';

export const SocketSlice = createSlice({
  name: 'notification',
  initialState: {
    notificationCount: 0,
  },
  reducers: {
    updateNotificationCount: (state, action) => {
      console.log('action : ', action.payload);
      state.notificationCount = action.payload;
    },
  },
});

export const { updateNotificationCount } = SocketSlice.actions;

export default SocketSlice.reducer;
