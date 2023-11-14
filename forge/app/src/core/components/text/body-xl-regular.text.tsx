import { useTheme } from 'core/providers/theme.provider';
import { useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';

interface Props {
  text: string;
}

export const BodyXlRegular = ({ text }: Props) => {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        body: {
          fontFamily: 'Urbanist',
          fontSize: 18,
          fontWeight: '400',
          fontStyle: 'normal',
          letterSpacing: 0.20000000298023224,
          color: theme.greyscale900,
        },
      }),
    []
  );

  return <Text style={styles.body}>{text}</Text>;
};
