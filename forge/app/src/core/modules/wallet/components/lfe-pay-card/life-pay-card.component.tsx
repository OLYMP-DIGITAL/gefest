/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { useNavigation } from '@react-navigation/native';
import { Input } from 'core/components/input';
import { useCurrentStage } from 'core/features/investment-stage/use-current-stage';
import {
  MakeTransactionResponse,
  makeTransaction,
} from 'core/features/life-pay/life-pay.api';
import { lifePayTransactionsAtom } from 'core/features/life-pay/life-pay.atom';
import { calcLimitOfTransactionValue } from 'core/features/life-pay/life-pay.helpers';
import { useShareAmount } from 'core/features/share-amount/user-share-amount.hook';
import { userAtom } from 'core/features/users/users.atoms';
import { useTheme } from 'core/providers/theme.provider';
import { NavigatorScreensEnum, StackNavigation } from 'core/types/navigation';
import { Button } from 'core/ui/components/button/button.component';
import { Formik } from 'formik';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { useRecoilValue } from 'recoil';

import * as yup from 'yup';

const MIN_AMOUNT = 1;

interface PayForm {
  sharesCount: number;
}

interface Props {
  fetchTransactions: () => void;
}

export const LifePayCard = ({ fetchTransactions }: Props) => {
  const { t } = useTranslation();

  const user = useRecoilValue(userAtom);
  const toast = useToast();
  const styles = useStyles();
  const shareAmount = useShareAmount();
  const navigation = useNavigation<StackNavigation>();

  const { stage } = useCurrentStage();
  const transactions = useRecoilValue(lifePayTransactionsAtom);
  const [limit, setLimit] = useState<number>(0);
  const [isCrypto, setIsCrypto] = useState<boolean>(false);

  useEffect(() => {
    if (stage && transactions) {
      setLimit(calcLimitOfTransactionValue(transactions, stage.max));
    }
  }, [stage, transactions]);

  const onSubmit = useCallback(
    (values: PayForm) => {
      makeTransaction(
        {
          count: Number(values.sharesCount),
        },
        isCrypto
      )
        .then((response: MakeTransactionResponse) => {
          if (response.error) {
            throw response.error;
          }

          const url = response.link;

          // Перезапрос транзакций для перерасчёта лимитов
          fetchTransactions();

          if (url) {
            Linking.openURL(url)
              .then(() => console.log('Transaction link opened'))
              .catch((error) =>
                console.error('Error opening document:', error)
              );
          }
        })
        .catch((error) => {
          console.error('Ошибка при создании транзакции', error);

          if (error.message) {
            toast.show(error.message, {
              type: 'warning',
            });
          } else {
            toast.show(t('lifePay.createInvoiceError'), {
              type: 'warning',
            });
          }
        });
    },
    [isCrypto]
  );

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        sharesCount: yup
          .number()
          .min(MIN_AMOUNT, `${t('messages.minValue')} ${MIN_AMOUNT}`)
          .max(
            Math.floor(limit / Number(shareAmount)),
            `${t('messages.maxValue')} ${Math.floor(
              limit / Number(shareAmount)
            )}`
          )
          .required(`${t('messages.isRequired')}`)
          .nullable(),
      }),
    [limit, shareAmount]
  );

  const calcAmountOfShares = (count: number): number => {
    return count && shareAmount
      ? ((Number((shareAmount * Number(count)) / 100).toFixed(2) ||
          0) as number)
      : 0;
  };

  const useDataExists = useMemo(
    () =>
      user?.name &&
      user?.lastname &&
      user?.middlename &&
      user?.passportFace &&
      user?.passportNumber &&
      user?.faceWithPassport &&
      user?.registeredAddress &&
      user?.passportRegistration,
    [user]
  );

  return (
    <Formik
      initialValues={{
        sharesCount: 0,
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
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

              <Text style={styles.marginTop10}>
                {t('lifePay.card.currentAmount')}: $
                <Text style={styles.strong}>
                  {(shareAmount && Number(shareAmount / 100).toFixed(2)) || '0'}
                </Text>
              </Text>

              <Text style={styles.marginTop10}>
                {t('lifePay.card.transactionLimit')}: $
                <Text style={styles.strong}>
                  {Number(limit / 100).toFixed(0)}
                </Text>
              </Text>

              <Text>
                {t('lifePay.card.amountOfSharedCounts')}: $
                <Text style={styles.strong}>
                  {calcAmountOfShares(values.sharesCount)}
                </Text>
              </Text>

              <View style={styles.inputWrapper}>
                <Input
                  placeholder={t('lifePay.card.amount')}
                  onChangeText={(e) => {
                    const currentInput = e.valueOf();
                    if (
                      currentInput != null &&
                      currentInput !== '' &&
                      !isNaN(Number(currentInput.toString()))
                    ) {
                      handleChange('sharesCount')(e);
                    }
                    if (currentInput == '') {
                      handleChange('sharesCount')(e);
                    }
                  }}
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

              {(user?.passportConfirmed && (
                <Text>{t('lifePay.card.warmMessage')}</Text>
              )) || (
                <Text style={styles.warmMessage}>
                  {t('lifePay.card.needConfirm')}
                </Text>
              )}
            </View>

            {(useDataExists && (
              <View style={styles.actionsWrapper}>
                <TouchableOpacity
                  style={[
                    styles.materialButton,
                    Object.keys(errors).length > 0 &&
                      styles.disabledMaterialButton,
                  ]}
                  onPress={() => {
                    setIsCrypto(false);
                    handleSubmit();
                  }}
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
                <TouchableOpacity
                  style={[
                    styles.materialButton,
                    Object.keys(errors).length > 0 &&
                      styles.disabledMaterialButton,
                  ]}
                  onPress={() => {
                    setIsCrypto(true);
                    handleSubmit();
                  }}
                  disabled={Object.keys(errors).length > 0}
                >
                  <Text
                    style={[
                      styles.materialButtonText,
                      Object.keys(errors).length > 0 &&
                        styles.disabledMaterialButtonText,
                    ]}
                  >
                    {t('lifePay.card.cryptoPay')}
                  </Text>
                </TouchableOpacity>
              </View>
            )) || (
              <Button
                onPress={() => {
                  navigation.navigate(NavigatorScreensEnum.cabinet as any);
                }}
                primary
              >
                {t('lifePay.card.toCabinet')}
              </Button>
            )}
          </View>
        );
      }}
    </Formik>
  );
};

const useStyles = () => {
  const { theme } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        strong: {
          fontWeight: '600',
        },

        marginTop10: {
          marginTop: 10,
        },

        wrapper: {
          maxWidth: 350,
          backgroundColor: '#fff',
        },

        infoLine: {
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
          marginTop: 'auto',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        },

        materialButton: {
          // ...
        },

        disabledMaterialButton: {
          // ...
        },

        materialButtonText: {
          color: '#D43238',
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

        warmMessage: {
          color: theme.fontCaption,
        },
      }),
    [theme]
  );

  return styles;
};
