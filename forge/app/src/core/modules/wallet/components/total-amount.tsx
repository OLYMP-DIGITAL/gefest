import { LifePayInvoiceStatus } from 'core/features/life-pay/life-pay.api';
import { lifePayTransactionsAtom } from 'core/features/life-pay/life-pay.atom';
import { useTheme } from 'core/providers/theme.provider';
import { Card, CardTitle } from 'core/ui/components/card';
import { CardContent } from 'core/ui/components/card/card-content';
import { TextHeadline } from 'core/ui/components/typography/text-headline';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

export const TotalAmount = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [value, setValue] = useState<number>(0);
  const transactions = useRecoilValue(lifePayTransactionsAtom);

  useEffect(() => {
    let value = 0;

    for (let i = 0; i < transactions.length; i++) {
      const transaction = transactions[i];

      if (transaction.status === LifePayInvoiceStatus.success) {
        value += Number(transaction.amount);
      }
    }

    setValue(value);
  }, [transactions]);

  return (
    <Card>
      <CardTitle title={t('lifePay.totalAmount')} />

      <CardContent>
        <TextHeadline color={theme.primary}>{`${value / 100}$`}</TextHeadline>
      </CardContent>
    </Card>
  );
};
