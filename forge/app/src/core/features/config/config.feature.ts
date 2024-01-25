/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import api from 'core/services/api';
import { atom } from 'recoil';

export interface Config {
  companyValue: number;
  payloadRedirect: string;
  referalCommission: number;
}

export interface ConfigResponse {
  data: {
    id: number;
    attributes: Config;
  };
}

export enum ConfigRoute {
  get = 'config',
}

export const configAtomKey = 'configAtomKey';

export const configAtom = atom<Config | null>({
  key: configAtomKey,
  default: null,
});

export const fetchConfig = async (): Promise<ConfigResponse> => {
  return await api.get<ConfigResponse>(ConfigRoute.get);
};
