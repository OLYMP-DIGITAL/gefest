import api from 'core/services/api';
import { faqs } from './faq.types';

export enum FaqRoutes {
  faqs = 'faqs',
}

export const fetchFaqs = (): Promise<faqs> => {
  return api.get<faqs>(FaqRoutes.faqs);
};

