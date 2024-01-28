/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { useBrand } from 'core/features/brand/use-brand';
import { LifePayInvoiceStatus } from 'core/features/life-pay/life-pay.api';
import { lifePayTransactionsAtom } from 'core/features/life-pay/life-pay.atom';
import { useShareAmount } from 'core/features/share-amount/user-share-amount.hook';
import { useTheme } from 'core/providers/theme.provider';
import { Card, CardTitle } from 'core/ui/components/card';
import { CardContent } from 'core/ui/components/card/card-content';
import { Col } from 'core/ui/components/screen-layout/col';
import { Row } from 'core/ui/components/screen-layout/row';
import { TextBody } from 'core/ui/components/typography/text-body';
import { TextHeadline } from 'core/ui/components/typography/text-headline';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useRecoilValue } from 'recoil';

export const PortfolioValue = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const brand = useBrand();
  const shareAmount = useShareAmount();
  const [portfolioIncreasePercentage, setPortfolioIncreasePercentage] =
    useState<number>(0);
  const [portfolioIncreaseUsd, setPortfolioIncreaseUsd] = useState<number>(0);
  const [portfolioValue, setPortfolioValue] = useState<number>(0);
  const transactions = useRecoilValue(lifePayTransactionsAtom);

  useEffect(() => {
    if (shareAmount) {
      let shareCount = 0;
      let totalAmount = 0;

      for (let i = 0; i < transactions.length; i++) {
        const transaction = transactions[i];

        if (transaction.status === LifePayInvoiceStatus.success) {
          shareCount += Number(transaction.shareCount);
          totalAmount += Number(transaction.amount);
        }
      }

      const currentPortfolioValue = shareCount * shareAmount;

      setPortfolioIncreasePercentage(
        +(((currentPortfolioValue - totalAmount) / totalAmount) * 100).toFixed(
          2
        ) || 0
      );
      setPortfolioIncreaseUsd(
        +((currentPortfolioValue - totalAmount) / 100).toFixed(2)
      );
      setPortfolioValue(currentPortfolioValue);
    }
  }, [transactions, shareAmount]);

  return (
    <Card>
      <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 20,
            borderColor: brand.primaryColor,
            borderBottomWidth: 2,
          }}
        >
          <TextBody
            style={{
              fontWeight: '600',
              color: brand.primaryColor,
              alignItems: 'center',
              display: 'flex',
            }}
          >
            {t('lifePay.portfolioValue')}
          </TextBody>

          <TextBody
            style={{
              fontSize: 26,
              fontWeight: '600',
              color: brand.primaryColor,
              justifyContent: 'center',
            }}
          >
            {portfolioValue / 100}$
          </TextBody>
        </View>

        {/* Прирост стоимости */}
        <View
          style={{
            display: 'flex',
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <TextBody
            style={{
              fontWeight: '600',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            {t('wallet.increaseValue')}
          </TextBody>

          <TextBody
            style={{
              fontSize: 20,
              fontWeight: '600',
              justifyContent: 'center',
              color: brand.primaryColor,
            }}
          >
            {portfolioIncreasePercentage > 0
              ? `+${portfolioIncreaseUsd}$`
              : `${portfolioIncreaseUsd}$`}
          </TextBody>
        </View>

        {/* Прирост прибыли в % */}
        <View
          style={{
            display: 'flex',
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <TextBody
            style={{
              fontWeight: '600',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            {t('wallet.profitIncrease')}
          </TextBody>

          <TextBody
            style={{
              fontSize: 20,
              fontWeight: '600',
              justifyContent: 'center',
              color: brand.primaryColor,
            }}
          >
            {portfolioIncreasePercentage > 0
              ? `+${portfolioIncreasePercentage}%`
              : `-${portfolioIncreasePercentage}%`}
          </TextBody>
        </View>
      </View>
    </Card>
  );
};
