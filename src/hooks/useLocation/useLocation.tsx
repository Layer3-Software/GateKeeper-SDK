import { useEffect, useState } from 'react';
import { GEO_API_KEY } from '../../utils/constants';
import { DEFAULT_COUNTRY } from '../../utils/countrys';

interface GeoProps {
  country_code: string;
  IPv4: string;
}

function useLocation(externalCountries?: string[]) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const detector = async () => {
      try {
        if (location.hostname === 'localhost') {
          setAllowed(true);
        } else {
          const response = await fetch(
            `https://geolocation-db.com/json/${GEO_API_KEY}`,
            {
              mode: 'cors',
              headers: {
                'Content-Type':
                  'application/x-www-form-urlencoded; charset=UTF-8',
              },
            }
          );
          if (response.ok) {
            const data: GeoProps = await response.json();
            const countries =
              externalCountries && externalCountries.length
                ? externalCountries
                : DEFAULT_COUNTRY;
            if (countries.includes(data.country_code)) setAllowed(true);
          } else {
            setAllowed(false);
          }
        }
      } catch (error) {
        setAllowed(false);
      }
    };
    detector();
  }, []);

  return allowed;
}

export default useLocation;
