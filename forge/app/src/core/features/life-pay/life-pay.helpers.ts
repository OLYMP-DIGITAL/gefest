/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { InvestmentStage } from 'core/finance/investment-stage/investment-sage.types';
import { LifePayTransaction } from './life-pay.types';

export const calcLimitOfTransactionValue = (
  userTransactions: LifePayTransaction[],
  stageLimit: number
): number => {
  let summOfUserTransactions = 0;

  for (let index = 0; index < userTransactions.length; index++) {
    const transaction = userTransactions[index];

    // if (transaction.status === LifePayInvoiceStatus.success) {
    // }
    summOfUserTransactions += Number(transaction.amount);
  }

  return stageLimit - summOfUserTransactions;
};

/**
 * Функция подсчитывает минимальное количество долей для переданного этапа
 * @param stage investment stage
 * @param shareValue стоимость одной доли
 * @returns наименьше колличество долей
 */
export const calcMinLimitOfSharePackageCount = (
  stage: InvestmentStage,
  shareValue: number
): number => {
  const minValue = stage.min;
  const oneValue = shareValue;

  return Math.floor(minValue / oneValue);
};
