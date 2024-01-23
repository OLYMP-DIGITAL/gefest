/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */

import { atom } from 'recoil';

export const WALLET_MESSAGE_ATOM_KEY = 'WALLET_MESSAGE_ATOM_KEY';
export const WALLET_SHOW_MESSAGE_ATOM_KEY = 'WALLET_SHOW_MESSAGE_ATOM_KEY';
export const WALLET_MESSAGE_LINK = 'WALLET_MESSAGE_LINK';

export const walletMessageLinkAtom = atom<string>({
  key: WALLET_MESSAGE_LINK,
  default: '',
});

export const walletMessageAtom = atom<string>({
  key: WALLET_MESSAGE_ATOM_KEY,
  default: '',
});

export const walletShowMessageAtom = atom<boolean>({
  key: WALLET_SHOW_MESSAGE_ATOM_KEY,
  default: false,
});
