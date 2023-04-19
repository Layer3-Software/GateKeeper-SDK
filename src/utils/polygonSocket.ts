import { io } from 'socket.io-client';
import { PolygonSocket } from '../types';
import { PRODUCTION_BACKEND_URL, STAGING_BACKEND_URL } from './constants';

export const openPolygonSocket = ({
  id,
  callback,
  isStaging,
}: PolygonSocket) => {
  const url = isStaging ? STAGING_BACKEND_URL : PRODUCTION_BACKEND_URL;
  const socket = io(`${url}/polygon`, {
    transports: ['websocket'],
    path: '/socket',
    query: { id },
  });

  socket.on('callback', message => {
    callback(message);
  });

  return socket;
};
