/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { Formik } from 'formik';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import { Input } from 'core/components/input';
import { Loader } from 'core/components/loader';
import RoundedButton from 'core/components/rounded-button';
import { BodyXlRegular } from 'core/components/text/body-xl-regular.text';
import { H1Text } from 'core/components/text/h1.text';
import { UrlButton } from 'core/components/url-button';
import {
  getYmTransaction,
  makeYmTransaction,
} from 'core/features/ym-transaction/ym-transaction.api';
import { Transaction } from 'core/features/ym-transaction/ym-transactions.types';
import { useInterval } from 'usehooks-ts';
import * as yup from 'yup';
import { TransactionTable } from './components/transaction-table';

interface PaymentForm {
  deposit: number | null;
}

export const PaymentScreen = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [transaction, setTransaction] = useState<Transaction>();

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        deposit: yup
          .number()
          .min(0)
          .required(`${t('payment.deposit')} ${t('messages.isRequired')}`),
      }),
    []
  );

  const onSubmit = useCallback(({ deposit }: PaymentForm) => {
    if (deposit) {
      setLoading(true);

      makeYmTransaction(deposit)
        .then((result) => {
          setTransaction(result);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  useInterval(() => {
    if (
      transaction &&
      (transaction.status === 'pending' ||
        transaction.status === 'waiting_for_capture')
    ) {
      getYmTransaction(transaction.payment).then((currentVersion) => {
        if (transaction.status !== currentVersion.status) {
          setTransaction(currentVersion);
        }
      });
    }
  }, 30000);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <H1Text text={t('payment.replenish')} />

      <BodyXlRegular text={t('payment.payloaderInfo')} />

      {(loading && <Loader />) ||
        (transaction && (
          <View style={{ width: 450 }}>
            <TransactionTable transaction={transaction} />

            <UrlButton url={transaction.confirmation_url}>
              {t('payment.goToPay')}
            </UrlButton>
          </View>
        )) || (
          <Formik
            initialValues={{
              deposit: null,
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View style={{ width: 450 }}>
                <View style={{ marginVertical: 10, marginTop: 20 }}>
                  <Input
                    placeholder={t('payment.deposit')}
                    onChangeText={handleChange('deposit')}
                    onBlur={handleBlur('deposit')}
                    value={values.deposit || ''}
                  />
                  {errors.deposit && (
                    <Text style={{ color: 'red' }}>{errors.deposit}</Text>
                  )}
                </View>

                <View style={{ marginVertical: 20, minWidth: 100 }}>
                  <RoundedButton
                    title={t('buttons.submit')}
                    onPress={handleSubmit as () => void}
                    disabled={Object.keys(errors).length > 0}
                  />
                </View>
              </View>
            )}
          </Formik>
        )}
    </View>
  );
};
