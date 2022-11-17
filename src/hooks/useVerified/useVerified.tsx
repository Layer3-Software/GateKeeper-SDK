import { useEffect, useState } from 'react';

interface statusProps {
  verified: boolean;
  KYC: boolean;
}

function useVerified(address: string, ids: string) {
  const [isVerified, setIsVerified] = useState(true);

  useEffect(() => {
    const detector = async () => {
      const URL = 'https://kyc-backend-api.azurewebsites.net/v1/check';
      const PARAMS = new URLSearchParams({
        address,
        ids,
      }).toString();

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

          if (status.KYC) {
            setIsVerified(status.KYC);
          }
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
