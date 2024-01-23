/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { useEffect, useState } from 'react';
import { fetchSupportEmail } from '../users/users.api';
import { useRecoilState } from 'recoil';
import { supportEmailAtom } from './support-email.atom';

export const useSupportEmail = () => {
  const [email, setEmail] = useRecoilState(supportEmailAtom);

  const fetchSupport = async () => {
    try {
      const response = await fetchSupportEmail();

      if (response && response.data) {
        let cleanedData = response.data.attributes.email;
        setEmail(cleanedData);
      } else {
        console.error('No support email data', response);
      }
    } catch (e) {
      console.error('Error fetching support email', e);
    }
  };

  useEffect(() => {
    if (!email) {
      fetchSupport();
    }
  }, []);

  return email;
};
