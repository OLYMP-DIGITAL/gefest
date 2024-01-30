/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { FontAwesome } from '@expo/vector-icons';
import { useStyles } from 'core/hooks/use-styles.hook';
import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Animated,
  TextInputProps,
  Text,
} from 'react-native';

interface Props extends TextInputProps {
  error?: string;
  labelText?: string;
}

const Input = ({ labelText, error, ...rest }: Props) => {
  const styles = useInputStyles();
  const [isFocused, setIsFocused] = useState(false);
  const highlightAnim = new Animated.Value(0);
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(highlightAnim, {
      toValue: 300,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  const handleBlur = () => setIsFocused(false);

  // Animated.timing(highlightAnim, {
  //   toValue: isFocused ? 300 : 0,
  //   duration: 300,
  //   useNativeDriver: true,
  // }).start();

  return (
    <View style={styles.group} id="sign-up-group">
      <View style={styles.row} id="sign-up-row">
        <TextInput
          {...rest}
          secureTextEntry={rest.secureTextEntry && !hidePassword}
          style={[
            styles.input,
            rest.editable === false ? styles.disabledInput : {},
          ]}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {rest.secureTextEntry !== undefined &&
          ((hidePassword && (
            <FontAwesome
              name="eye-slash"
              onPress={() => setHidePassword(!hidePassword)}
              style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
              }}
              size={20}
              color="gray"
            />
          )) || (
            <FontAwesome
              onPress={() => setHidePassword(!hidePassword)}
              name="eye"
              style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
              }}
              size={20}
              color="gray"
            />
          ))}
      </View>

      <Animated.View
        style={[
          styles.highlight,
          {
            transform: [{ translateX: highlightAnim }],
            opacity: isFocused ? 0.5 : 0,
          },
        ]}
      />

      <View style={styles.bar}>
        {/* <View style={styles.barBefore} />
        <View style={styles.barAfter} /> */}
      </View>

      <Animated.Text
        style={[
          styles.label,
          {
            top: isFocused ? -20 : 10,
            fontSize: isFocused ? 14 : 18,
          },
        ]}
      >
        {labelText}
      </Animated.Text>

      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </View>
  );
};

const useInputStyles = () => {
  return useStyles((theme) => ({
    row: {
      display: 'flex',
      flexDirection: 'row',
    },
    group: {
      marginBottom: 20,
      width: '100%',
    },
    input: {
      fontSize: 18,
      padding: 10,
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: '#757575',
    },

    disabledInput: {
      color: theme.greyscale500,
    },
    label: {
      color: '#999',
      fontWeight: 'normal',
      left: 5,
      position: 'absolute',
    },
    bar: {},
    barBefore: {
      position: 'absolute',
      height: 2,
      width: '50%',
      bottom: 1,
      left: '50%',
      backgroundColor: 'gray',
    },
    barAfter: {
      position: 'absolute',
      height: 2,
      width: '50%',
      bottom: 1,
      right: '50%',
      backgroundColor: 'gray',
    },
    highlight: {
      position: 'absolute',
      top: '25%',
      left: 0,
      height: '60%',
    },
  }));
};

export default Input;
