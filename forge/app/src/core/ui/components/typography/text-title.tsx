/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { NativeStyles, useStyles } from 'core/hooks/use-styles.hook';
import { Text } from 'react-native';

interface Props {
  children: React.ReactNode;
}

export const TextTitle = ({ children }: Props) => {
  const styles = useStyles((theme) => ({
    text: {
      color: theme.fontTitle,
      fontSize: 23,
      fontWeight: '400',
    } as NativeStyles,
  }));

  return <Text style={styles.text}>{children}</Text>;
};
