import { atom } from 'recoil';
import { NewsData } from 'core/modules/news/news.types';

export const ArticleAtomKey = 'ArticleAtomKey';

export const articleAtom = atom<NewsData | null>({
  key: ArticleAtomKey,
  default: null,
});
