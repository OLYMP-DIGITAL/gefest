import api from 'core/services/api';
import { NewsInfo } from './news.types';

export enum NewsRoutes {
  all = 'articles?populate=image',
}

export const fetchNews = (): Promise<NewsInfo[]> => {
  return api.get<NewsInfo[]>(NewsRoutes.all);
};
