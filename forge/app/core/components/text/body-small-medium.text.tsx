import { useTheme } from '@core/providers/theme.provider';
import { useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';

interface Props {
  text: string;
}

export const BodySmallMediumText = ({ text }: Props) => {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        body: {
          fontFamily: 'Urbanist',
          fontSize: 12,
          fontWeight: '500',
          fontStyle: 'normal',
          lineHeight: 12,
          letterSpacing: 0.20000000298023224,
          color: theme.greyscale900,
        },
      }),
    []
  );

  return <Text style={styles.body}>{text}</Text>;
};
