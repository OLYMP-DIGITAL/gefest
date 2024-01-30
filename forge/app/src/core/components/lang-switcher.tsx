/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { useLanguage } from 'core/providers/language.provider';
import { StyleSheet, Text, View } from 'react-native';

export const LangSwitcher = () => {
  const { localize, setLang } = useLanguage();

  return (
    <View style={styles.wrapper}>
      <Text style={styles.langLabel} onPress={() => setLang(localize)}>
        {localize}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  langLabel: {
    paddingHorizontal: 5,
    color: '#bdbdbd',
    fontSize: 18,
    fontWeight: '400',
  },
});
