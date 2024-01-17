import { NativeStyles, useStyles } from 'core/hooks/use-styles.hook';
import { Text } from 'react-native';

interface Props {
  children: React.ReactNode;
}

export const TextCaption = ({ children }: Props) => {
  const styles = useStyles((theme) => ({
    text: {
      color: theme.fontCaption,
      fontSize: 13,
      letterSpacing: '0.01rem',
      fontWeight: '300',
    } as NativeStyles,
  }));

  return <Text style={styles.text}>{children}</Text>;
};
