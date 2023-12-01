import { FaqAtomKey, faqResponse, faqs } from './faq.types';
import { atom } from 'recoil';

export const faqAtom = atom<faqs>({
  key: FaqAtomKey,
  default: [],
});
