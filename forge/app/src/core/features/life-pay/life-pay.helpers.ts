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
