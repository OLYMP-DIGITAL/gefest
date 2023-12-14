import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BalanceCard } from './components/balance-card/balance-card';
import { TransactionsTable } from './components/transactions-table/transactions-table';
import { Transaction } from 'core/features/transactions/transactions.types';
import { fetchUserTransactions } from 'core/features/transactions/transactions.api';
import { useInterval } from 'usehooks-ts';
import { StepText } from './components/step-text';
import { H1Text } from 'core/components/text/h1.text';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import { LifePayCard } from './components/lfe-pay-card/life-pay-card.component';
import { useTheme } from 'core/providers/theme.provider';

const WalletScreen = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = useCallback(() => {
    fetchUserTransactions().then((trs) => {
      console.log('Goted transactions', trs);

      if (Array.isArray(trs)) {
        setTransactions(trs);
      }
    });
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, []);

  useInterval(() => {
    fetchTransactions();
  }, 60000);

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <H1Text text={t('wallet.title')} />

        <View style={{ display: 'flex', flexDirection: 'column' }}>
          {/* <BalanceCard transactions={transactions} /> */}
          <View style={styles.lifePayWrapper}>
            <LifePayCard />
          </View>

          <StepText />

          <TransactionsTable transactions={transactions} />
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

        lifePayWrapper: {
          // width: '',
          marginVertical: 30,
        },
      }),
    [theme]
  );

  return styles;
};

export default WalletScreen;
