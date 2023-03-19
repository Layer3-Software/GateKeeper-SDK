import { io } from 'socket.io-client';
import { PolygonSocket } from '../types';
import { BACKEND_URL } from './constants';

export const openPolygonSocket = ({ id, callback }: PolygonSocket) => {
  const socket = io(`${BACKEND_URL}/polygon`, {
    transports: ['websocket'],
    path: '/socket',
    query: { id },
  });

  socket.on('callback', message => {
    callback(message);
  });

  return socket;
};
