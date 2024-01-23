/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { getCurrentStage } from '../../stages/get-current-stage';
import { Transaction } from '../../transactions/transaction.types';
import { User } from '../users.types';

export async function getUserLimit(user: User): Promise<number> {
  const userTransactions = await strapi.entityService.findMany(
    'api::life-pay-transaction.life-pay-transaction',
    {
      filters: {
        $and: [
          {
            $or: [
              { status: 'success' },
              { status: 'open' },
              { status: 'pending' },
            ],
          },
          {
            user: {
              id: user.id,
            },
          },
        ],
      },
    }
  );

  const stages = await strapi.entityService.findMany(
    'api::investment-stage.investment-stage'
  );

  const currentStage = getCurrentStage(stages as any);

  let limit = 0;
  if (userTransactions) {
    limit = calcLimitOfTransactionValue(
      userTransactions as any,
      currentStage.max
    );
  }

  function calcLimitOfTransactionValue(
    userTransactions: Transaction[],
    stageLimit: number
  ): number {
    let summOfUserTransactions = 0;

    for (let index = 0; index < userTransactions.length; index++) {
      const transaction = userTransactions[index];

      summOfUserTransactions += Number(transaction.amount);
    }

    return stageLimit - summOfUserTransactions;
  }

  return limit;
}
