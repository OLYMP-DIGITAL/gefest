/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { NativeStyles, useStyles } from 'core/hooks/use-styles.hook';
import { GestureResponderEvent, Text, TouchableOpacity } from 'react-native';

interface Props {
  children: React.ReactNode;
  primary?: boolean;
  disabled?: boolean;
  onPress?(event: GestureResponderEvent): void;
}

export const Button = ({ children, primary, disabled, onPress }: Props) => {
  const styles = useStyles((theme) => ({
    button: {
      display: 'flex',
      position: 'relative',
      cursor: 'pointer',
      height: 35,
      lineHeight: 35,
      padding: 0,
      paddingHorizontal: 24, // Приблизительный аналог padding: 0 1.5rem;
      borderWidth: 0,
      borderRadius: 2,
      transition: 'all 0.3s ease-out',
      shadowColor: 'rgba(0, 0, 0, 0.225)',
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
      shadowOpacity: 0.225,
      justifyContent: 'center',
      backgroundColor: (primary && theme.primary) || 'none',
    },

    text: {
      color: (primary && theme.white) || '#424242',
      fontSize: 15,
      fontWeight: '600',
      letterSpacing: 0.8,
      textAlign: 'center',
      textDecorationLine: 'none',
      textTransform: 'uppercase',
      verticalAlign: 'middle',
      whiteSpace: 'nowrap',
      outline: 'none',
    },
  }));

  return (
    <TouchableOpacity
      id="test-id"
      style={[styles.button]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text]}>{children}</Text>
    </TouchableOpacity>
  );
};
