import { useNavigation } from '@react-navigation/native';
import RoundedButton from 'core/components/rounded-button';
import { H3Text } from 'core/components/text/h3.text';
import { Transaction } from 'core/features/transactions/transactions.types';
import { useTheme } from 'core/providers/theme.provider';
import { StackNavigation } from 'core/types/navigation';
import { Card, CardTitle } from 'core/ui/components/card';
import { CardContent } from 'core/ui/components/card/card-content';
import { TextBody } from 'core/ui/components/typography/text-body';
import { TextTitle } from 'core/ui/components/typography/text-title';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, View } from 'react-native';

export const StepText = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          minHeight: 130,
          display: 'flex',
          border: `2px solid ${theme.cardBorder}`,
          borderRadius: 32,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 22,
          paddingHorizontal: 25,
          backgroundColor: theme.white,
        },

        titles: {
          display: 'flex',
        },
      }),
    [theme]
  );

  return (
    <>
      <TextTitle>{t('wallet.step')}</TextTitle>
      <TextBody>{t('wallet.desc')}</TextBody>
    </>
  );

  return (
    <Card>
      <CardTitle title={t('wallet.step')} />
      <CardContent text={t('wallet.desc')} />
    </Card>
  );
  // <H3Text text={t('wallet.stepLabel')} />
};
