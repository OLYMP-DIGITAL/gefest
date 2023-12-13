import { DocumentsAtomKey, document } from './documents.types';
import { atom } from 'recoil';

export const documentsAtom = atom<document[] | null>({
  key: DocumentsAtomKey,
  default: null,
});
