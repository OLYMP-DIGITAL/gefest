import { NativeStyles, useStyles } from 'core/hooks/use-styles.hook';
import { Text } from 'react-native';

interface Props {
  children: React.ReactNode;
}

export const TextBody = ({ children }: Props) => {
  const styles = useStyles((theme) => ({
    text: {
      color: theme.fontBody,
      fontSize: 15,
      lineHeight: '2rem',
      letterSpacing: '0.01rem',
      fontWeight: '300',
    } as NativeStyles,
  }));

  return <Text style={styles.text}>{children}</Text>;
};
