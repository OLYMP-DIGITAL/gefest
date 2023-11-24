import { useTheme } from 'core/providers/theme.provider';
import { useMemo } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';

interface Props extends TouchableOpacityProps {
  title?: string;
  secondary?: boolean;
}

export const RoundedButton = ({
  title,
  disabled,
  secondary,
  ...rest
}: Props) => {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        button: {
          paddingHorizontal: 32,
          paddingVertical: 18,
          borderRadius: 100,
          backgroundColor: (() => {
            if (disabled) {
              return theme.greyscale200;
            }

            if (secondary) {
              return theme.white;
            }

            return theme.primary;
          })(),
        },
        buttonText: {
          textAlign: 'center',
          fontFamily: 'Urbanist',
          fontSize: 16,
          fontStyle: 'normal',
          fontWeight: '600',
          lineHeight: 22,
          letterSpacing: 0.2,
          color: (() => {
            if (disabled) {
              return theme.greyscale500;
            }

            if (secondary) {
              return theme.primary;
            }

            return theme.white;
          })(),
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
