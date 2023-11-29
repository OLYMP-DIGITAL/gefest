import { useTheme } from 'core/providers/theme.provider';
import { useMemo } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';

interface Props {
  title?: string;
  onPress?: (event: GestureResponderEvent) => void;
}

export const Button = ({ title, onPress }: Props) => {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        button: {
          paddingHorizontal: 32,
          paddingVertical: 18,
          borderRadius: 8,
          backgroundColor: theme.white,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: theme.greyscale200,
        },
        buttonText: {
          fontSize: 16,
          fontStyle: 'normal',
          fontWeight: '600',
          lineHeight: 22,
          letterSpacing: 0.2,
        },
      }),
    [theme]
  );

  return (
    <TouchableOpacity style={styles.button} onPress={onPress || undefined}>
      <Text style={styles.buttonText}>{title ?? 'Button'}</Text>
    </TouchableOpacity>
  );
};

export default Button;
