import api from 'core/services/api';
import { faqResponse } from './faq.types';
import { LangsEnum } from 'core/features/language/language.types';

export enum FaqRoutes {
  faqs = 'faqs?locale=:lang',
}

export const fetchFaqs = (lang: LangsEnum): Promise<faqResponse> => {
  const route = FaqRoutes.faqs.replace(/:lang/g, `${lang || LangsEnum.en}`);

  return api.get<faqResponse>(route);
};
