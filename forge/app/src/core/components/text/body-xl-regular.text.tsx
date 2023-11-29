import { useTheme } from 'core/providers/theme.provider';
import { CSSProperties, useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';

interface Props {
  text: string;
  styles?: CSSProperties;
}

export const BodyXlRegular = ({ text, styles: propStyles }: Props) => {
  const { theme } = useTheme();

  const defaultBodyStyle = useMemo(
    () => ({
      fontSize: 18,
      fontWeight: '400',
      fontStyle: 'normal',
      letterSpacing: 0.20000000298023224,
      color: theme.greyscale900,
    }),
    [theme]
  );

  const styles = useMemo(
    () =>
      StyleSheet.create({
        body: propStyles
          ? {
              ...(propStyles as any),
              ...(defaultBodyStyle as any),
            }
          : {
              ...(defaultBodyStyle as any),
            },
      }),
    []
  );

  return <Text style={styles.body}>{text}</Text>;
};
