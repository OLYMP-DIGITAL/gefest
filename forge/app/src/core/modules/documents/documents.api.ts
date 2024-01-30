/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import api from 'core/services/api';
import { docResponse } from './documents.types';
import { LangsEnum } from 'core/features/language/language.types';

export enum DocumentRoutes {
  documents = 'documents?populate=document&locale=:lang',
}

export const fetchDocuments = (lang?: string): Promise<docResponse> => {
  return api.get<docResponse>(
    DocumentRoutes.documents.replace(/:lang/g, `${lang || LangsEnum.en}`)
  );
};
