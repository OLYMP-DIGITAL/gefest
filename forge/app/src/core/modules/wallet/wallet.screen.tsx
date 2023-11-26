import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { BalanceCard } from './components/balance-card/balance-card';
import { TransactionsTable } from './components/transactions-table/transactions-table';
import { Transaction } from 'core/features/transactions/transactions.types';
import { fetchUserTransactions } from 'core/features/transactions/transactions.api';
import { useInterval } from 'usehooks-ts';
import { StepText } from './components/step-text';
import { H1Text } from 'core/components/text/h1.text';
import { useTranslation } from 'react-i18next';

const WalletScreen = () => {
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <H1Text text={t('wallet.title')} />

      <View style={{ display: 'flex', flexDirection: 'column' }}>
        <BalanceCard transactions={transactions} />

        <StepText />

        <TransactionsTable transactions={transactions} />
      </View>
    </View>
  );
};

export default WalletScreen;
