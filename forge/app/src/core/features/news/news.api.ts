import api from 'core/services/api';
import { NewsInfo } from './news.types';
import { LangsEnum } from '../language/language.types';

export enum NewsRoutes {
  all = 'articles?locale=:lang&populate=image',
}

export const fetchNews = (lang: LangsEnum): Promise<NewsInfo[]> => {
  const route = NewsRoutes.all.replace(/:lang/g, `${lang || LangsEnum.ru}`);
  return api.get<NewsInfo[]>(route);
};
