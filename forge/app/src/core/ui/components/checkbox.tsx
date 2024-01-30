/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { useStyles } from 'core/hooks/use-styles.hook';
import { useTheme } from 'core/providers/theme.provider';
import { useCallback, useEffect, useState } from 'react';
import { Platform, Text, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { CheckBox } from 'react-native-web';

interface Props {
  label?: string;
  error?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: any) => void;
}

export const Checkbox = ({
  label,
  error,
  onChange,
  checked: propsChecked,
  disabled,
}: Props) => {
  const { theme } = useTheme();
  const [checked, setChecked] = useState<boolean>(!!propsChecked);

  const onPress = useCallback(() => {
    setChecked(!checked);
  }, [checked]);

  // Watch changes of props value
  useEffect(() => {
    if (checked !== propsChecked) {
      setChecked(!!propsChecked);
    }
  }, [propsChecked]);

  // Watch changes of checked to call callback
  useEffect(() => {
    if (onChange) {
      onChange(checked);
    }
  }, [checked]);

  // ==================== Styles ===============================================
  const styles = useStyles(() => ({
    container: {
      flex: 1,
      flexDirection: 'row',
    },
    label: {
      marginLeft: 8,
    },
  }));

  //  ==================== Render ==============================================
  if (Platform.OS === 'web') {
    return (
      <View>
        <View style={styles.container}>
          <CheckBox
            disabled={disabled}
            color={theme.primary}
            value={checked}
            onChange={onPress}
            // onValueChange={}
          />
          {label && <Text style={styles.label}>{label}</Text>}
        </View>

        {error && <Text style={{ color: 'red' }}>{error}</Text>}
      </View>
    );
  }

  return (
    <BouncyCheckbox
      disabled={disabled}
      isChecked={checked}
      size={25}
      fillColor={theme.primary}
      unfillColor="#FFFFFF"
      text={label}
      // iconStyle={{ borderColor: theme.primary }}
      innerIconStyle={{ borderWidth: 2 }}
      onPress={onPress}
      textStyle={{
        textDecorationLine: 'none',
      }}
    />
  );
};
