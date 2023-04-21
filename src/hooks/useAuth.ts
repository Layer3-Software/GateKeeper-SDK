import { useContext, useState } from 'react';
import { GateKeeperContext } from '../context/GatekeeperContext';
import { getNonce, login, register } from '../utils/backendCalls';
import { SIGN_MESSAGE } from '../utils/constants';
import useAppId from './useAppId';

const useAuth = () => {
  const { isStaging, setIsLoggedIn, signer, address } = useContext(
    GateKeeperContext
  );
  const [loginStatus, setLoginStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { appId } = useAppId();
  const doLogin = async (): Promise<void> => {
    setLoginStatus('');
    setIsLoading(false);
    try {
      if (signer && address) {
        setIsLoading(true);
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

        const res = await login(address, signature, isStaging, true);

        setIsLoading(false);
        if (res.error) return setLoginStatus(res.error);

        if (res) {
          return setIsLoggedIn(true);
        }
      }
      return setLoginStatus('Missing required connections fields');
    } catch (err) {
      console.error(`Error at login:${err}`);
      return setLoginStatus('Error at login');
    }
  };

  return { doLogin, isLoading, loginStatus };
};

export default useAuth;
