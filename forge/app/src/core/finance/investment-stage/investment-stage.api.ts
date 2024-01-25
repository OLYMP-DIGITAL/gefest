/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import api from 'core/services/api';
import { GetInvestmentStageResponse } from './investment-sage.types';
import { LangsEnum } from 'core/features/language/language.types';

export enum InvestmentStageRoutes {
  get = 'investment-stages?locale=:lang',
}

export const getInvestmentStages = (
  lang?: string
): Promise<GetInvestmentStageResponse> => {
  return api.get<GetInvestmentStageResponse>(
    InvestmentStageRoutes.get.replace(/:lang/g, `${lang || LangsEnum.en}`)
  );
};
