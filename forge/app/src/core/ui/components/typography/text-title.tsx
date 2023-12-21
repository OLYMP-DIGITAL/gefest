import { NativeStyles, useStyles } from 'core/hooks/use-styles.hook';
import { Text } from 'react-native';

interface Props {
  children: React.ReactNode;
}

export const TextTitle = ({ children }: Props) => {
  const styles = useStyles((theme) => ({
    text: {
      color: theme.fontTitle,
      fontSize: 24,
      // fontSize: '2rem',
      // lineHeight: '2.8rem',
      letterSpacing: '0.005rem',
      fontWeight: '400',
    } as NativeStyles,
  }));

  return <Text style={styles.text}>{children}</Text>;
};
