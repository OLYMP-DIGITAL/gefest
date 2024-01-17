import { useStyles } from 'core/hooks/use-styles.hook';
import { useTheme } from 'core/providers/theme.provider';
import { useCallback, useEffect, useState } from 'react';
import { Platform, Text, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { CheckBox } from 'react-native-web';

interface Props {
  label?: string;
  checked?: boolean;
  onChange?: (e: any) => void;
}

export const Checkbox = ({ label, onChange, checked: propsChecked }: Props) => {
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
      <View style={styles.container}>
        <CheckBox color={theme.primary} value={checked} onChange={onPress} />
        {label && <Text style={styles.label}>{label}</Text>}
      </View>
    );
  }

  return (
    <BouncyCheckbox
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
