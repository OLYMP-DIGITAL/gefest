import api from 'core/services/api';
import { faqResponse } from './faq.types';

export enum FaqRoutes {
  faqs = 'faqs',
}

export const fetchFaqs = (): Promise<faqResponse> => {
  return api.get<faqResponse>(FaqRoutes.faqs);
};

