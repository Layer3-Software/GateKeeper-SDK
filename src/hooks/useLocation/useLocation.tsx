import { useEffect, useState } from 'react';
import { DEFAULT_COUNTRY } from '../../utils/countrys';

interface GeoProps {
  country_code: string;
  IPv4: string;
}

function useLocation(externalCountries?: string[]) {
  const [allowed, setAllowed] = useState(false);

  const geoApiKey = '8dd79c70-0801-11ec-a29f-e381a788c2c0';

  useEffect(() => {
    const detector = async () => {
      try {
        const response = await fetch(
          `https://geolocation-db.com/json/${geoApiKey}`,
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
      } catch (error) {
        setAllowed(false);
      }
    };
    detector();
  }, []);

  return allowed;
}

export default useLocation;
