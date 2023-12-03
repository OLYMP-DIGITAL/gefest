import api from 'core/services/api';

export interface News {
  title: string;
  description: string;
  text: string;
  date: string;
  attributes?: any;
}

export enum NewsRoutes {
  all = 'articles?populate=image',
}

export const fetchNews = (): Promise<News[]> => {
  return api.get<News[]>(NewsRoutes.all);
};
