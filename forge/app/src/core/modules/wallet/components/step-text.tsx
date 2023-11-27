import { useNavigation } from '@react-navigation/native';
import RoundedButton from 'core/components/rounded-button';
import { H3Text } from 'core/components/text/h3.text';
import { Transaction } from 'core/features/transactions/transactions.types';
import { useTheme } from 'core/providers/theme.provider';
import { StackNavigation } from 'core/types/navigation';
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
    <View style={styles.wrapper}>
      <View style={styles.titles}>
        <H3Text text={t('wallet.step')} />
        <H3Text text={t('wallet.stepLabel')} />
      </View>
      <Text>{t('wallet.desc')}</Text>
    </View>
  );
};
