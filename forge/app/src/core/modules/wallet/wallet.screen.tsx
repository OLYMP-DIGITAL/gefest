import { H1Text } from 'core/components/text/h1.text';
import { fetchUserTransactions } from 'core/features/transactions/transactions.api';
import { Transaction } from 'core/features/transactions/transactions.types';
import { useTheme } from 'core/providers/theme.provider';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useInterval } from 'usehooks-ts';
import { LifePayCard } from './components/lfe-pay-card/life-pay-card.component';
import { StepText } from './components/step-text';
import { UserActionsTable } from './components/user-actions-table/user-actions-table';
import { Card, CardTitle } from 'core/ui/components/card';
import { CardContent } from 'core/ui/components/card/card-content';
import { TotalAmount } from './components/total-amount';
import { useLifePayTransactions } from 'core/features/life-pay/use-life-pay-transactions.hook';
import { ShareCOunt } from './components/share-count';
import { PortfolioValue } from './components/portfolio-value';

const WalletScreen = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  // const { fetchTransactions } = useLifePayTransactions();

  // useEffect(() => {
  //   fetchTransactions();
  // }, []);

  // useInterval(() => {
  //   fetchTransactions();
  // }, 60000);

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <H1Text text={t('wallet.title')} />

        <View style={{ display: 'flex', flexDirection: 'column' }}>
          <View style={styles.cards}>
            <LifePayCard />

            <View style={styles.infoCards}>
              <TotalAmount />

              <View style={styles.mt}>
                <ShareCOunt />
              </View>

              <View style={styles.mt}>
                <PortfolioValue />
              </View>
            </View>
          </View>

          <StepText />

          <UserActionsTable />
        </View>
      </View>
    </ScrollView>
  );
};

const useStyles = () => {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 30,
        },

        mt: {
          marginTop: 13,
        },

        cards: {
          display: 'flex',
          marginVertical: 30,
          flexDirection: 'row',
        },

        infoCards: {
          width: 200,
          marginLeft: 45,
        },
      }),
    [theme]
  );

  return styles;
};

export default WalletScreen;
