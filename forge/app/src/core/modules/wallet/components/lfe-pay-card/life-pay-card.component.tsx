import { Input } from 'core/components/input';
import {
  MakeTransactionPayload,
  MakeTransactionResponse,
  makeTransaction,
} from 'core/features/life-pay/life-pay.api';
import { useShareAmount } from 'core/features/share-amount/user-share-amount.hook';
import { useTheme } from 'core/providers/theme.provider';
import { Formik } from 'formik';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import * as yup from 'yup';

const MIN_AMOUNT = 1;
const MAX_AMOUNT = 50;

interface PayForm {
  sharesCount: number;
}

export const LifePayCard = () => {
  // useLifePayAuth();

  const { t } = useTranslation();

  const styles = useStyles();
  const shareAmount = useShareAmount();

  const onSubmit = useCallback((values: PayForm) => {
    makeTransaction({
      count: Number(values.sharesCount),
    }).then((response: MakeTransactionResponse) => {
      console.log('Submit response', response);
    });
  }, []);

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        sharesCount: yup
          .number()
          .min(MIN_AMOUNT, `${t('messages.minValue')} ${MIN_AMOUNT}`)
          .max(MAX_AMOUNT, `${t('messages.maxValue')} ${MAX_AMOUNT}`)
          .required(`${t('messages.isRequired')}`)
          .nullable(),
      }),
    []
  );

  const calcAmountOfShares = (count: number): number => {
    return count && shareAmount
      ? ((Number((shareAmount * Number(count)) / 100).toFixed(2) ||
          0) as number)
      : 0;
  };

  return (
    <Formik
      initialValues={{
        sharesCount: 0,
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
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
            <Text style={styles.currentAmount}>
              {t('lifePay.card.currentAmount')}: $
              {(shareAmount && Number(shareAmount / 100).toFixed(2)) || '0'}
            </Text>

            <Text style={styles.currentAmount}>
              {t('lifePay.card.amountOfSharedCounts')}: $
              {calcAmountOfShares(values.sharesCount)}
            </Text>

            <View style={styles.inputWrapper}>
              <Input
                placeholder={t('lifePay.card.amount')}
                onChangeText={handleChange('sharesCount')}
                onBlur={handleBlur('sharesCount')}
                value={`${values.sharesCount || ''}`}
                keyboardType="numeric"
              />
              {errors.sharesCount && (
                <Text style={{ color: '#F75555', fontSize: 14 }}>
                  {errors.sharesCount}
                </Text>
              )}
            </View>
          </View>

          <View style={styles.actionsWrapper}>
            <TouchableOpacity
              style={[
                styles.materialButton,
                Object.keys(errors).length > 0 && styles.disabledMaterialButton,
              ]}
              onPress={handleSubmit as () => void}
              disabled={Object.keys(errors).length > 0}
            >
              <Text
                style={[
                  styles.materialButtonText,
                  Object.keys(errors).length > 0 &&
                    styles.disabledMaterialButtonText,
                ]}
              >
                {t('lifePay.card.pay')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

const useStyles = () => {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          maxWidth: 350,
          backgroundColor: '#fff',
        },

        currentAmount: {
          marginVertical: 15,
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

        disabledMaterialButton: {
          // ...
        },

        materialButtonText: {
          color: '#000000de',
          fontSize: 14,
          fontWeight: '600',
          textTransform: 'uppercase',
        },

        disabledMaterialButtonText: {
          color: '#00000042',
        },

        inputWrapper: {
          marginVertical: 13,
        },
      }),
    [theme]
  );

  return styles;
};
