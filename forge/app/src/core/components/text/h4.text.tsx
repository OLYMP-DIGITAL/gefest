import { useTheme } from 'core/providers/theme.provider';
import { useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';

interface Props {
  text: string;
}

export const H4Text = ({ text }: Props) => {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        body: {
          fontSize: 24,
          fontWeight: '700',
          fontStyle: 'normal',
          letterSpacing: 0.20000000298023224,
          color: theme.greyscale900,
        },
      }),
    []
  );

  return <Text style={styles.body}>{text}</Text>;
};
