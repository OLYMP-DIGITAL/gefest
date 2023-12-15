import { FaqAtomKey, faq } from './faq.types';
import { atom } from 'recoil';

export const faqAtom = atom<faq[] | null>({
  key: FaqAtomKey,
  default: null,
});
