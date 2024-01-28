/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { atom } from 'recoil';
import { InvestmentStage } from './investment-sage.types';

export const CURRENT_INVESTMENT_STAGE_ATOM_KEY =
  'CURRENT_INVESTMENT_STAGE_ATOM_KEY';
export const INVESTMENT_STAGES_ATOM_KEY = 'INVESTMENT_STAGES_ATOM_KEY';

export const investmentStagesAtom = atom<InvestmentStage[]>({
  key: INVESTMENT_STAGES_ATOM_KEY,
  default: [],
});

export const currentInvestmentStageAtom = atom<InvestmentStage | null>({
  key: CURRENT_INVESTMENT_STAGE_ATOM_KEY,
  default: null,
});
