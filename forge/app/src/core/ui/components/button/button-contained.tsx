/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { useStyles } from 'core/hooks/use-styles.hook';
import React, { useRef, useState } from 'react';
import { Animated, Text, TouchableOpacity } from 'react-native';

interface Props {
  onPress?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export const ButtonContained = ({ onPress, disabled, children }: Props) => {
  const styles = useButtonStyles();
  const [isPressed, setIsPressed] = useState(false);
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const rippleOpacity = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    setIsPressed(true);
    Animated.timing(overlayOpacity, {
      toValue: 0.08,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(rippleOpacity, {
      toValue: 0.32,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Animated.timing(overlayOpacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(rippleOpacity, {
      toValue: 0,
      duration: 0, // Instant scale down
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, isPressed && styles.buttonActive]}
    >
      <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]} />
      <Animated.View
        style={[
          styles.ripple,
          { opacity: rippleOpacity, transform: [{ scale: rippleOpacity }] },
        ]}
      />
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

const useButtonStyles = () => {
  return useStyles((theme) => ({
    button: {
      position: 'relative',
      paddingHorizontal: 16,
      minWidth: 64,
      height: 36,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.primary, // Замените на ваш основной цвет
      borderRadius: 4,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 5, // Android-specific для тени
      color: '#fff',
      fontFamily: 'Roboto', // Или другой системный шрифт
      fontSize: 14,
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    buttonActive: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 15, // Android-specific для тени
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#fff',
      opacity: 0,
    },
    ripple: {
      position: 'absolute',
      left: 50,
      top: 50,
      borderRadius: 18,
      backgroundColor: '#fff',
      opacity: 0,
      transform: [{ scale: 1 }],
    },
    text: {
      color: '#fff',
    },
  }));
};
