/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import i18next from 'i18next';
import { SystemLanguage } from 'i18';
import { useEffect, useState } from 'react';

export const useLanguage = () => {
  const [language, setLanguage] = useState<string>(i18next.language);

  useEffect(() => {
    i18next.on('languageChanged', (language: SystemLanguage) => {
      setLanguage(language);
    });
  }, []);

  return {
    language,
    setLanguage,
  };
};
