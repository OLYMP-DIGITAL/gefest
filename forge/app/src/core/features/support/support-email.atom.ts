/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { atom } from 'recoil';

export const SUPPORT_EMAIL_ATOM_KEY = 'SUPPORT_EMAIL_ATOM_KEY';

export const supportEmailAtom = atom<string>({
  key: SUPPORT_EMAIL_ATOM_KEY,
  default: '',
});
