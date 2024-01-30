/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */

import { appLoadingAtom } from 'core/atoms/app-loading.atom';
import { useLanguage } from 'core/hooks/use-language';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { fetchDocuments } from './documents.api';
import { documentsAtom } from './documents.atom';
import { Document } from './documents.types';

export const useDocuments = () => {
  const { language } = useLanguage();
  const setLoading = useSetRecoilState(appLoadingAtom);
  const [currentLanguage, setCurrentLanguage] = useState<string>(language);
  const [documents, setDocuments] = useRecoilState(documentsAtom);

  const fetchDocumentList = async () => {
    try {
      setLoading(true);

      const response = await fetchDocuments(language);

      if (response && response.data && response.data.length !== 0) {
        let cleanedData: Document[] = response.data.map((value) => ({
          id: value.id,
          title: value.attributes.title,
          link: value.attributes.document.data.attributes.url,
          name: value.attributes.document.data.attributes.name,
          agreement: value.attributes.agreement,
        }));

        setDocuments(cleanedData);
      } else {
        console.error('No documents data', response);
      }
    } catch (e) {
      console.error('Error fetching documents', e);
    } finally {
      setLoading(false);
      setCurrentLanguage(language);
    }
  };

  useEffect(() => {
    if (!documents || language !== currentLanguage) {
      fetchDocumentList();
    }
  }, [language]);

  return documents;
};
