import { useState } from 'react';
import { getNonce, login, register } from '../utils/backendCalls';
import { SIGN_MESSAGE } from '../utils/constants';
import metamaskConnection, {
  MetamaskConnection,
} from '../utils/metamaskConnection';
import useAppId from './useAppId';

const useAuth = (isStaging: boolean) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginStatus, setLoginStatus] = useState('');

  const { appId } = useAppId(isStaging);

  const doLogin = async (): Promise<void> => {
    try {
      const connection = await metamaskConnection();

      if (connection.error) {
        return setLoginStatus(connection.error);
      }

      if (connection) {
        const { address, signer } = connection as MetamaskConnection;
        const { nonce } = await getNonce(address, isStaging);

        // If nonce is undefined, the address is not registered
        if (nonce === undefined || nonce === null) {
          const signature = await signer.signMessage(SIGN_MESSAGE);
          const session = await register(address, signature, appId, isStaging);

          if (session.error) return setLoginStatus(session.error);

          if (session.token) {
            setIsLoggedIn(true);
            return setLoginStatus('User registered');
          }
        }

        const signature = await signer.signMessage(
          `${SIGN_MESSAGE} Nonce: ${nonce}`
        );

        const res = await login(address, signature, false);

        if (res.error) return setLoginStatus(res.error);

        if (res.isUser) {
          return setIsLoggedIn(true);
        }
      }
      return setLoginStatus('Missing required connections fields');
    } catch (err) {
      console.error(`Error at login:${err}`);
      return setLoginStatus('Error at login');
    }
  };

  return { doLogin, isLoggedIn, loginStatus };
};

export default useAuth;
