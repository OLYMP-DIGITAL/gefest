/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { useInvestmentStages } from 'core/finance/investment-stage/use-investment-stages.hook';

export const useAuthInit = () => {
  // Загружаем инвестиционные этапы
  useInvestmentStages();
};
