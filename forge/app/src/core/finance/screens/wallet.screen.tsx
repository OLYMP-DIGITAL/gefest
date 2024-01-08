import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const WalletScreen = () => {
  return (
    <View style={styles.column}>
      <Text>Колонка 1</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    backgroundColor: 'lightblue',
    padding: 10,
    marginBottom: 10,
  },
  wideColumn: {
    backgroundColor: 'lightcoral',
    padding: 10,
    marginBottom: 10,
  },
});
