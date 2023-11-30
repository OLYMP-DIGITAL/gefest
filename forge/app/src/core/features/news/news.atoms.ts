import { atom } from "recoil";
import { News } from "./news.api";

export const ArticleAtomKey = 'ArticleAtomKey';

export const articleAtom = atom<News | null>({
    key: ArticleAtomKey,
    default: null,
});