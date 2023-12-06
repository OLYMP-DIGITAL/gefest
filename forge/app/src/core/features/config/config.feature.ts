import api from 'core/services/api';
import { atom } from 'recoil';

export interface Config {
  sharePrice: number;
  companyValue: number;
  payloadRedirect: string;
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
