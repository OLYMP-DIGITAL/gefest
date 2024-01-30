/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { useNavigation } from '@react-navigation/native';
import { Input } from 'core/components/input';
import {
  MakeTransactionResponse,
  makeTransaction,
} from 'core/features/life-pay/life-pay.api';
import { lifePayTransactionsAtom } from 'core/features/life-pay/life-pay.atom';
import { calcLimitOfTransactionValue } from 'core/features/life-pay/life-pay.helpers';
import { useShareAmount } from 'core/features/share-amount/user-share-amount.hook';
import { userAtom } from 'core/features/users/users.atoms';
import { TransactionType } from 'core/finance/transaction/transaction.types';
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
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { useCurrentStage } from 'core/finance/investment-stage/use-current-stage';
import { TextCaption } from 'core/ui/components/typography/text-caption';
import * as yup from 'yup';
import {
  walletMessageAtom,
  walletMessageLinkAtom,
  walletShowMessageAtom,
} from '../../wallet.atoms';
import { appLoadingAtom } from 'core/atoms/app-loading.atom';
import { useBrand } from 'core/features/brand/use-brand';
import { ButtonContained } from 'core/ui/components/button/button-contained';
import { useStyles } from 'core/hooks/use-styles.hook';

const MIN_AMOUNT = 1;

interface PayForm {
  sharesCount: number;
}

interface Props {
  fetchUser: () => void;
  fetchTransactions: () => void;
}

export const LifePayCard = ({ fetchTransactions, fetchUser }: Props) => {
  const { t } = useTranslation();

  const user = useRecoilValue(userAtom);
  const brand = useBrand();
  const toast = useToast();
  const styles = useComponentStyles();
  const navigation = useNavigation<StackNavigation>();
  const shareAmount = useShareAmount();

  const setLoading = useSetRecoilState(appLoadingAtom);
  const currentStage = useCurrentStage();
  const transactions = useRecoilValue(lifePayTransactionsAtom);
  const [limit, setLimit] = useState<number>(0);
  const [transactionType, setTransactionType] = useState<TransactionType>();

  // Alert
  const setShowAlert = useSetRecoilState(walletShowMessageAtom);
  const setMessageLink = useSetRecoilState(walletMessageLinkAtom);
  const [alertMessage, setAlertMessage] = useRecoilState(walletMessageAtom);

  useEffect(() => {
    if (currentStage && transactions) {
      setLimit(calcLimitOfTransactionValue(transactions, currentStage.max));
    }
  }, [currentStage, transactions]);

  const onSubmit = useCallback(
    (values: PayForm) => {
      if (transactionType && user && shareAmount) {
        if (transactionType === TransactionType.points) {
          const count = values.sharesCount;
          const points = user.points;

          if (count * shareAmount > points) {
            setAlertMessage(t('finance.noPoints'));
            setShowAlert(true);

            return;
          }
        }

        setLoading(true);

        makeTransaction(
          {
            count: Number(values.sharesCount),
          },
          transactionType
        )
          .then((response: MakeTransactionResponse) => {
            if (response.error) {
              throw response.error;
            }
            const url = response.link;

            // Перезапрос транзакций и пользователя для перерасчёта лимитов
            fetchTransactions();
            fetchUser();

            if (url) {
              setShowAlert(true);
              setMessageLink(url);
              setAlertMessage(t('lifePay.linkTransactionSuccess'));

              Linking.openURL(url).catch((error) =>
                console.error('Error opening document:', error)
              );
            } else {
              setAlertMessage(t('lifePay.transactionSuccess'));
              setShowAlert(true);
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
          })
          .finally(() => {
            setLoading(false);
            setTransactionType(undefined);
          });
      } else {
        toast.show(t('lifePay.card.transactionTypeError'), {
          type: 'danger',
        });
      }
    },
    [transactionType, shareAmount, alertMessage]
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
    <>
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
                  style={{}}
                />
                {errors.sharesCount && (
                  <Text
                    style={{
                      color: brand.primaryColor,
                      fontSize: 14,
                      marginVertical: 5,
                    }}
                  >
                    {errors.sharesCount}
                  </Text>
                )}
              </View>

              <View style={styles.contentWrapper}>
                <Text style={styles.selectedCount}>
                  {t('lifePay.card.amountOfSharedCounts')}: $
                  <Text style={[styles.strong]}>
                    {calcAmountOfShares(values.sharesCount)}
                  </Text>
                </Text>

                <Text style={[styles.marginTop10, styles.grayText]}>
                  {t('lifePay.card.currentAmount')}: $
                  <Text style={styles.strong}>
                    {(shareAmount && Number(shareAmount / 100).toFixed(2)) ||
                      '0'}
                  </Text>
                </Text>

                <Text style={[styles.marginTop10, styles.grayText]}>
                  {t('lifePay.card.transactionLimit')}: $
                  <Text style={styles.strong}>
                    {Number(limit / 100).toFixed(0)}
                  </Text>
                </Text>
              </View>

              {(useDataExists && (
                <>
                  <View style={styles.actionsWrapper}>
                    {/* Make Lifepay transaction */}
                    {/* <TouchableOpacity
                    style={[
                      styles.materialButton,
                      Object.keys(errors).length > 0 &&
                        styles.disabledMaterialButton,
                    ]}
                    onPress={() => {
                      setTransactionType(TransactionType.lifePay);
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
                  </TouchableOpacity> */}

                    {/* Make crypto transaction */}
                    <ButtonContained
                      onPress={() => {
                        setTransactionType(TransactionType.crypto);
                        handleSubmit();
                      }}
                      disabled={Object.keys(errors).length > 0}
                    >
                      {t('lifePay.card.cryptoPay')}
                    </ButtonContained>

                    {/* <TouchableOpacity
                      style={[
                        styles.materialButton,
                        Object.keys(errors).length > 0 &&
                          styles.disabledMaterialButton,
                      ]}
                      onPress={() => {
                        setTransactionType(TransactionType.crypto);
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
                    </TouchableOpacity> */}

                    {/* Make points transaction */}
                    <ButtonContained
                      onPress={() => {
                        setTransactionType(TransactionType.points);
                        handleSubmit();
                      }}
                      disabled={Object.keys(errors).length > 0}
                    >
                      {t('lifePay.card.pointsPay')}
                    </ButtonContained>
                    {/* <TouchableOpacity
                      style={[
                        styles.materialButton,
                        Object.keys(errors).length > 0 &&
                          styles.disabledMaterialButton,
                      ]}
                      onPress={() => {
                        setTransactionType(TransactionType.points);
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
                        {t('lifePay.card.pointsPay')}
                      </Text>
                    </TouchableOpacity> */}
                  </View>
                </>
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
    </>
  );
};

const useComponentStyles = () => {
  const brand = useBrand();

  const styles = useStyles((theme) => ({
    grayText: {
      fontWeight: '600',
      color: theme.fontTitle,
    },

    selectedCount: {
      color: brand.primaryColor,
      fontWeight: '600',
    },

    strong: {
      fontWeight: '600',
    },

    marginTop10: {
      marginTop: 10,
    },

    wrapper: {
      width: '100%',
      backgroundColor: '#F1F2F6',
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
      marginHorizontal: 13,

      borderTopColor: brand.primaryColor,
      borderTopWidth: 2,

      borderBottomColor: brand.primaryColor,
      borderBottomWidth: 2,
    },

    warmMessage: {
      color: theme.fontCaption,
    },
  }));

  return styles;
};
