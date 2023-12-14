import { H1Text } from 'core/components/text/h1.text';
import { fetchUserTransactions } from 'core/features/transactions/transactions.api';
import { Transaction } from 'core/features/transactions/transactions.types';
import { useTheme } from 'core/providers/theme.provider';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useInterval } from 'usehooks-ts';
import { LifePayCard } from './components/lfe-pay-card/life-pay-card.component';
import { StepText } from './components/step-text';
import { TransactionsTable } from './components/transactions-table/transactions-table';

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
