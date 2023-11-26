import { useNavigation } from '@react-navigation/native';
import RoundedButton from 'core/components/rounded-button';
import { balanceAtom } from 'core/features/balance/balance.state';
import { useTheme } from 'core/providers/theme.provider';
import { StackNavigation } from 'core/types/navigation';
import { useMemo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useRecoilValue } from 'recoil';

export const BalanceCard = () => {
  const { theme } = useTheme();
  const { value } = useRecoilValue(balanceAtom);
  const navigation = useNavigation<StackNavigation>();

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

        <Text>Общий баланс</Text>

        <Text>₽{value}</Text>
      </View>

      <View style={styles.actions}>
        <RoundedButton
          small
          title="Пополнить"
          onPress={() => navigation.navigate('Payment')}
        />
      </View>
    </View>
  );
};
