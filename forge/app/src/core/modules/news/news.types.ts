import { LangsEnum } from 'core/features/language/language.types';

export interface NewsData {
  lang: LangsEnum;
  title: string;
  description?: string;
  text: string;
  date: string;
  imageUrl?: string;
}
