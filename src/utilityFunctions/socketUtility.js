/* eslint-disable no-unused-vars */
import { useState, useContext } from 'react';
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setCookies } from '../hooks/useCookies';
import envValues from '../enviornment';
import { TableContext } from '../contexts/tableContext';

// eslint-disable-next-line import/prefer-default-export
export const joinSocketRoom = (room) => {
  const { setNotificationUnreadCount } = useContext(TableContext);
  const socket = io(envValues.REACT_APP_API_FRONT_END, { transports: ['websocket'] });
  socket.emit('room', room);

  socket.on('newNotificationUpdate', (message, unreadCount) => {
    setCookies('UNREADNOTIFICATIONCOUNT', unreadCount);
    setNotificationUnreadCount(unreadCount);
    // dispatch(updateNotificationCount(unreadCount));
    toast.success(message);
  });

  socket.on('notificationClearUpdate', (message, unreadCount) => {
    setCookies('UNREADNOTIFICATIONCOUNT', unreadCount);
  });

  socket.on('Data', (data) => {
    console.log('demo *** ', data);
  });
};
