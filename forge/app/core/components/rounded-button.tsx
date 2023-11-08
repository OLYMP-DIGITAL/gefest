import { useTheme } from '@core/providers/theme.provider';
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

export const RoundedButton = ({ title, onPress }: Props) => {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        button: {
          paddingHorizontal: 32,
          paddingVertical: 18,
          borderRadius: 100,
          backgroundColor: theme.primary,
        },
        buttonText: {
          textAlign: 'center',
          fontFamily: 'Urbanist',
          fontSize: 16,
          fontStyle: 'normal',
          fontWeight: '600',
          lineHeight: 22,
          letterSpacing: 0.2,
          color: theme.white,
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

export default RoundedButton;
