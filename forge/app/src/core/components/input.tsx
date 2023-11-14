import { useTheme } from 'core/providers/theme.provider';
import { useMemo } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps } from 'react-native';

interface Props extends TextInputProps {}

export const Input = ({ ...rest }: Props) => {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        body: {
          width: '100%',
          color: theme.greyscale900,
          fontSize: 14,
          fontStyle: 'normal',
          fontFamily: 'Urbanist',
          fontWeight: '400',
          borderWidth: 0,
          borderRadius: 12,
          letterSpacing: 0.20000000298023224,
          backgroundColor: theme.greyscale50,
          paddingVertical: 20,
          paddingHorizontal: 18,
        },
      }),
    []
  );

  return (
    <TextInput
      {...rest}
      style={{ ...styles.body }}
      // onChangeText={handleInputChange}
      // value={text}
    />
  );
};
