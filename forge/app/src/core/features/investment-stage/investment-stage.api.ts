import api from 'core/services/api';
import { InvestmentStage } from './investement-sage.types';

export enum InvestmentStageRoutes {
  get = 'investment-stages',
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

export const getInvestmentStages = (): Promise<GetInvestmentStageReponse> => {
  return api.get<GetInvestmentStageReponse>(InvestmentStageRoutes.get);
};
