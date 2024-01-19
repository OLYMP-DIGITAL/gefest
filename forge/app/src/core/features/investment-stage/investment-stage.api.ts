import api from 'core/services/api';
import { InvestmentStage } from './investement-sage.types';
import { LangsEnum } from '../language/language.types';

export enum InvestmentStageRoutes {
  get = 'investment-stages?locale=:lang',
}

export interface GetInvestmentStageReponse {
  data: [
    {
      id: 1;
      attributes: InvestmentStage;
    }
  ];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export const getInvestmentStages = (
  lang?: string
): Promise<GetInvestmentStageReponse> => {
  return api.get<GetInvestmentStageReponse>(
    InvestmentStageRoutes.get.replace(/:lang/g, `${lang || LangsEnum.en}`)
  );
};
