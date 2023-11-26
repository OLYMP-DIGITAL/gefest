import { useTheme } from 'core/providers/theme.provider';
import { useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';

interface Props {
  text: string;
}

export const H1Text = ({ text }: Props) => {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        body: {
          fontFamily: 'Urbanist',
          fontSize: 48,
          fontWeight: '700',
          fontStyle: 'normal',
          color: theme.greyscale900,
        },
      }),
    []
  );

  return <Text style={styles.body}>{text}</Text>;
};
