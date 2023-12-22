import { getUserTransactions } from 'core/features/life-pay/life-pay.api';
import { LifePayTransaction } from 'core/features/life-pay/life-pay.types';
import { useShareAmount } from 'core/features/share-amount/user-share-amount.hook';
import { Card, CardTitle } from 'core/ui/components/card';
import { CardContent } from 'core/ui/components/card/card-content';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const PortfolioValue = () => {
  const { t } = useTranslation();
  const shareAmount = useShareAmount();
  const [portfolioValue, setPortfolioValue] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [transactions, setTransactions] = useState<LifePayTransaction[]>([]);

  useEffect(() => {
    getUserTransactions().then((trans) => {
      setTransactions(trans);
    });
  }, []);

  useEffect(() => {
    if (transactions.length && shareAmount) {
      let shareCount = 0;
      let totalAmount = 0;

      for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i];

        shareCount += Number(transaction.shareCount);
        totalAmount += Number(transaction.amount);
      }

      const currentPortfolioValue = shareCount * shareAmount;

      setTotalAmount(
        ((currentPortfolioValue - totalAmount) / totalAmount) * 100
      );
      setPortfolioValue(currentPortfolioValue);
    }
  }, [transactions, shareAmount]);

  return (
    <Card>
      <CardTitle title={t('lifePay.portfolioValue')} />
      <CardContent
        text={`${portfolioValue / 100}$ (${
          totalAmount > 0 ? `+${totalAmount}` : `+${totalAmount}`
        }%)`}
      />
    </Card>
  );
};
