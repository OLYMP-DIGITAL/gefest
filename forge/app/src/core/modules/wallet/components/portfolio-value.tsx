import { getUserTransactions } from 'core/features/life-pay/life-pay.api';
import { LifePayTransaction } from 'core/features/life-pay/life-pay.types';
import { useShareAmount } from 'core/features/share-amount/user-share-amount.hook';
import { useTheme } from 'core/providers/theme.provider';
import { Card, CardTitle } from 'core/ui/components/card';
import { CardContent } from 'core/ui/components/card/card-content';
import { TextHeadline } from 'core/ui/components/typography/text-headline';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const PortfolioValue = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const shareAmount = useShareAmount();
  const [portfolioIncreasePercentage, setPortfolioIncreasePercentage] = useState<number>(0);
  const [portfolioIncreaseUsd, setPortfolioIncreaseUsd] = useState<number>(0);
  const [transactions, setTransactions] = useState<LifePayTransaction[]>([]);
  const [portfolioValue, setPortfolioValue] = useState<number>(0);

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

      setPortfolioIncreasePercentage(
        +(((currentPortfolioValue - totalAmount) / totalAmount) * 100).toFixed(
          2
        )
      );
      setPortfolioIncreaseUsd(
        +((currentPortfolioValue - totalAmount) / 100).toFixed(
          2
        )
      );
      setPortfolioValue(currentPortfolioValue);
    }
  }, [transactions, shareAmount]);

  return (
    <Card>
      <CardTitle title={t('lifePay.portfolioValue')} />
      <CardContent>
        <TextHeadline color={theme.primary}>{`${portfolioValue / 100}$ (${
          portfolioIncreasePercentage > 0 ? `+${portfolioIncreaseUsd}$ +${portfolioIncreasePercentage}` : `+${portfolioIncreaseUsd}$ +${portfolioIncreasePercentage}`
        }%)`}</TextHeadline>
      </CardContent>
    </Card>
  );
};
