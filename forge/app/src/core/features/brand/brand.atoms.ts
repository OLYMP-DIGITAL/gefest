/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { atom } from 'recoil';
import { Brand } from './brand.types';

export const BRAND_ATOM_KEY = 'BRAND_ATOM_KEY';

export const brandAtom = atom<Brand>({
  key: BRAND_ATOM_KEY,
  default: {
    headImage: '',
  },
});
