/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { useTheme } from 'core/providers/theme.provider';
import { useMemo } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps } from 'react-native';

interface Props extends TextInputProps {}

export const Input = ({ style, ...rest }: Props) => {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        body: {
          width: '100%',
          color: theme.greyscale900,
          fontSize: 14,
          fontStyle: 'normal',
          fontWeight: '400',
          borderWidth: 0,
          borderRadius: 12,
          letterSpacing: 0.20000000298023224,
          backgroundColor: '#F1F2F6',
          paddingVertical: 20,
          paddingHorizontal: 18,
        },
      }),
    []
  );

  return (
    <TextInput
      {...rest}
      editable={rest.editable}
      style={[{ ...styles.body }, style]}
      placeholderTextColor={theme.greyscale500}
      // onChangeText={handleInputChange}
      // value={text}
    />
  );
};
