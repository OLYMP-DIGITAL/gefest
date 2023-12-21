import { getUserTransactions } from 'core/features/life-pay/life-pay.api';
import { LifePayTransaction } from 'core/features/life-pay/life-pay.types';
import { Card, CardTitle } from 'core/ui/components/card';
import { CardContent } from 'core/ui/components/card/card-content';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const TotalAmount = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState<number>(0);
  const [transactions, setTransactions] = useState<LifePayTransaction[]>([]);

  useEffect(() => {
    getUserTransactions().then((trans) => {
      setTransactions(trans);
    });
  }, []);

  useEffect(() => {
    if (transactions.length) {
      let value = 0;

      for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i];

        value += Number(transaction.amount);
      }

      setValue(value);
    }
  }, [transactions]);

  return (
    <Card>
      <CardTitle title={t('lifePay.totalAmount')} />
      <CardContent text={`${value / 100}$`} />
    </Card>
  );
};
