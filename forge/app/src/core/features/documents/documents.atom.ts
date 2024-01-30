/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { Document } from './documents.types';
import { atom } from 'recoil';

export const DocumentsAtomKey = 'DocumentsAtomKey';

export const documentsAtom = atom<Document[] | null>({
  key: DocumentsAtomKey,
  default: null,
});
