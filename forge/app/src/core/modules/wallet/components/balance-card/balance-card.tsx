import { useNavigation } from '@react-navigation/native';
import RoundedButton from 'core/components/rounded-button';
import { configAtom } from 'core/features/config/config.feature';
import { Transaction } from 'core/features/transactions/transactions.types';
import { useTheme } from 'core/providers/theme.provider';
import { NavigatorScreensEnum, StackNavigation } from 'core/types/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useRecoilValue } from 'recoil';

interface Props {
  transactions: Transaction[];
}

export const BalanceCard = ({ transactions }: Props) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [balance, setBalance] = useState<number>(0);
  const navigation = useNavigation<StackNavigation>();
  const config = useRecoilValue(configAtom);

  useEffect(() => {
    if (transactions.length) {
      setBalance(
        transactions.reduce((prev, curr) => {
          if (curr.status === 'succeeded') {
            return prev + curr.value;
          }

          return prev;
        }, 0)
      );
    }
  }, [transactions]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          width: 328,
          minHeight: 130,
          border: `2px solid ${theme.cardBorder}`,
          display: 'flex',
          borderRadius: 32,
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingVertical: 22,
          paddingHorizontal: 25,
          backgroundColor: theme.white,
          marginVertical: 30,
        },

        info: {
          display: 'flex',
          fontSize: 24,
          flexDirection: 'row',
          justifyContent: 'space-between',
        },

        actions: {
          display: 'flex',
          marginTop: 20,
          flexDirection: 'row',
        },

        text: {
          display: 'flex',
        },

        sharePrice: {
          display: 'flex',
          marginTop: 15,
        },

        amount: {
          fontSize: 24,
        },
      }),
    [theme]
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.info}>
        <Image
          style={{ width: 68, height: 68 }}
          source={{ uri: require('./assets/wallet.png') }}
        />

        <View style={styles.text}>
          <Text>{t('payment.totalBalance')}</Text>
          <Text style={styles.amount}>₽{balance}</Text>
        </View>
      </View>

      <View style={styles.sharePrice}>
        <Text>{t('payment.currentSharePrice')}</Text>
        {config && (
          <Text style={styles.amount}>${config.sharePrice / 100}</Text>
        )}
      </View>

      <View style={styles.actions}>
        <RoundedButton
          small
          title={t('payment.topUp')}
          onPress={() =>
            navigation.navigate(NavigatorScreensEnum.payment as any)
          }
        />
      </View>
    </View>
  );
};
