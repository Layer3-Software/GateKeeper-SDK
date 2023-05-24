import { useContext, useEffect, useState } from 'react';
import { GateKeeperContext } from '../context/GatekeeperContext';
import { authenticateDomain } from '../utils/backendCalls';

const ROOT_DOMAIN =
  document.location?.ancestorOrigins[0]
    ?.replace('https://', '')
    ?.replace('http://', '') ||
  document.location.hostname
    .split('.')
    .reverse()
    .splice(0, 2)
    .reverse()
    .join('.');

const useAppId = () => {
  const [appId, setAppId] = useState('');
  const { isStaging } = useContext(GateKeeperContext);

  useEffect(() => {
    const ancestorOrigins = document.location.ancestorOrigins[0];
    if (ancestorOrigins) {
      const checkDomainAuthentication = async () => {
        const { appId } = await authenticateDomain(ROOT_DOMAIN, isStaging);
        setAppId(appId);
      };

      if (ancestorOrigins !== window.self.location.hostname) {
        checkDomainAuthentication();
      }
    }
  }, []);

  return { appId };
};

export default useAppId;
