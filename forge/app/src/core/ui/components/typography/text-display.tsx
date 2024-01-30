/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { NativeStyles, useStyles } from 'core/hooks/use-styles.hook';
import { Text, TextProps } from 'react-native';

interface Props extends TextProps {
  children: React.ReactNode;
}

export const TextDisplay = ({ children, ...rest }: Props) => {
  const styles = useStyles((theme) => ({
    text: {
      color: theme.fontDisplay,
      fontSize: 40,
      letterSpacing: 0,
      fontWeight: '300',
    } as NativeStyles,
  }));

  return (
    <Text {...rest} style={[styles.text, rest.style]}>
      {children}
    </Text>
  );
};
