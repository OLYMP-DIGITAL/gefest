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
