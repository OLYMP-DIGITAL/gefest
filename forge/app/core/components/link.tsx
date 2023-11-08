import { useTheme } from '@core/providers/theme.provider';
import { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props {
  title: string;
  onPress?: () => void;
}

export const Link = ({ title, onPress }: Props) => {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        button: {
          backgroundColor: 'transparent', // Прозрачный фон кнопки
          padding: 10,
        },
        buttonText: {
          color: theme.link, // Синий цвет текста кнопки
          textAlign: 'center',
        },
      }),
    []
  );

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};
