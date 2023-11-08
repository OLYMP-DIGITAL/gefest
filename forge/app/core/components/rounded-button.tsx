import { useTheme } from '@core/providers/theme.provider';
import { useMemo } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';

interface Props extends TouchableOpacityProps {
  title?: string;
}

export const RoundedButton = ({ title, disabled, ...rest }: Props) => {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        button: {
          paddingHorizontal: 32,
          paddingVertical: 18,
          borderRadius: 100,
          backgroundColor: disabled ? theme.greyscale200 : theme.primary,
        },
        buttonText: {
          textAlign: 'center',
          fontFamily: 'Urbanist',
          fontSize: 16,
          fontStyle: 'normal',
          fontWeight: '600',
          lineHeight: 22,
          letterSpacing: 0.2,
          color: disabled ? theme.greyscale500 : theme.white,
        },
      }),
    [theme, disabled]
  );

  return (
    <TouchableOpacity style={styles.button} disabled={disabled} {...rest}>
      <Text style={styles.buttonText}>{title ?? 'Button'}</Text>
    </TouchableOpacity>
  );
};

export default RoundedButton;
