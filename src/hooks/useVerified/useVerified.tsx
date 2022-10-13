import { useEffect, useState } from 'react';

interface statusProps {
  verified: boolean;
}

function useVerified(address: string) {
  const [isVerified, setIsVerified] = useState(true);

  useEffect(() => {
    const detector = async () => {
      const URL = 'https://kyc-backend-api.azurewebsites.net/v1/verify';
      const domain = window.location.host;
      const PARAMS = new URLSearchParams({ address, domain }).toString();

      try {
        const response = await fetch(`${URL}?${PARAMS}`, {
          mode: 'cors',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'GET',
        });

        if (response.ok) {
          const status: statusProps = await response.json();

          setIsVerified(status.verified);
        }
      } catch (error) {
        setIsVerified(true);
      }
    };
    detector();
  }, [address]);

  return isVerified;
}

export default useVerified;
