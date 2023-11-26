import React from 'react';
import { View } from 'react-native';
import { BalanceCard } from './components/balance-card/balance-card';

const WalletScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <BalanceCard />
      </View>
    </View>
  );
};

export default WalletScreen;
