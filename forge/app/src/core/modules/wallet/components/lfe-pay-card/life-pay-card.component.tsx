import { Input } from 'core/components/input';
import { useTheme } from 'core/providers/theme.provider';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export const LifePayCard = () => {
  const styles = useStyles();
  const { t } = useTranslation();

  const onPress = useCallback(() => {
    // ...
  }, []);

  return (
    <View
      style={[
        styles.wrapper,
        Platform.OS === 'android'
          ? { elevation: 5 }
          : {
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 1,
              shadowRadius: 5,
            },
      ]}
    >
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{t('lifePay.card.title')}</Text>
      </View>

      <View style={styles.contentWrapper}>
        <Text>{t('lifePay.card.desc')}</Text>

        <View style={styles.inputWrapper}>
          <Input placeholder={t('lifePay.card.amount')} />
        </View>
      </View>

      <View style={styles.actionsWrapper}>
        <TouchableOpacity
          style={styles.materialButton}
          onPress={onPress || undefined}
        >
          <Text style={styles.materialButtonText}>{t('lifePay.card.pay')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const useStyles = () => {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          backgroundColor: '#fff',
        },

        titleWrapper: {
          padding: 16,
          paddingTop: 24,
        },

        title: {
          fontSize: 24,
        },

        contentWrapper: {
          padding: 16,
          paddingTop: 0,
          fontSize: 14,
          color: '#000000de',
        },

        actionsWrapper: {
          padding: 8,
          paddingHorizontal: 16,
          minHeight: 52,
        },

        materialButton: {
          // ...
        },

        materialButtonText: {
          color: '#000000de',
          fontSize: 14,
          fontWeight: '600',
          textTransform: 'uppercase',
        },

        inputWrapper: {
          marginVertical: 13,
        },
      }),
    [theme]
  );

  return styles;
};
