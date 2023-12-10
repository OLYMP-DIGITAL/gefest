import { atom } from 'recoil';
import { LangsEnum, LanguageAtomKey } from './language.types';

export const languageAtom = atom<LangsEnum>({
  key: LanguageAtomKey,
  default: LangsEnum.en,
});
