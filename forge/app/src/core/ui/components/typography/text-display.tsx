import { NativeStyles, useStyles } from 'core/hooks/use-styles.hook';
import { Text } from 'react-native';

interface Props {
  children: React.ReactNode;
}

export const TextDisplay = ({ children }: Props) => {
  const styles = useStyles((theme) => ({
    text: {
      color: theme.fontDisplay,
      fontSize: 40,
      lineHeight: '4rem',
      letterSpacing: 0,
      fontWeight: '300',
    } as NativeStyles,
  }));

  return <Text style={styles.text}>{children}</Text>;
};
