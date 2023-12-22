import { NativeStyles, useStyles } from 'core/hooks/use-styles.hook';
import { Text } from 'react-native';

interface Props {
  color?: string;
  children: React.ReactNode;
}

export const TextHeadline = ({ children, color }: Props) => {
  const styles = useStyles((theme) => ({
    text: {
      color: color || theme.fontTitle,
      fontSize: 28,
      letterSpacing: '0.005rem',
      fontWeight: '400',
    } as NativeStyles,
  }));

  return <Text style={styles.text}>{children}</Text>;
};
