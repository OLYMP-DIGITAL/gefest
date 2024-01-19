import { useEffect, useState } from 'react';
import { fetchSupportEmail } from '../users/users.api';

export const useSupportEmail = () => {
  const [email, setEmail] = useState<string>('mailto:');

  const fetchSupport = async () => {
    try {
      const response = await fetchSupportEmail();

      if (response && response.data) {
        let cleanedData = response.data.attributes.email;
        setEmail(email + cleanedData);
      } else {
        console.error('No support email data', response);
      }
    } catch (e) {
      console.error('Error fetching support email', e);
    }
  };

  useEffect(() => {
    fetchSupport();
  }, []);

  return email;
};
