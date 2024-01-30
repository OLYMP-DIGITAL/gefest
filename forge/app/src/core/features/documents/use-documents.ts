/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */

import { useRecoilState, useSetRecoilState } from 'recoil';
import { documentsAtom } from './documents.atom';
import { useEffect } from 'react';
import { appLoadingAtom } from 'core/atoms/app-loading.atom';
import { fetchDocuments } from './documents.api';
import { useLanguage } from 'core/hooks/use-language';
import { Document } from './documents.types';

export const useDocuments = () => {
  const { language } = useLanguage();
  const setLoading = useSetRecoilState(appLoadingAtom);
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
        }));

        setDocuments(cleanedData);
      } else {
        console.error('No documents data', response);
      }
    } catch (e) {
      console.error('Error fetching documents', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!documents) {
      fetchDocumentList();
    }
  }, []);

  return documents;
};
