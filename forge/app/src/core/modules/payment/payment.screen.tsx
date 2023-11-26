import { Text, View } from 'react-native';
import { makeTransaction } from 'core/features/transactions/transactions.api';
import React, { useCallback, useMemo, useState } from 'react';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';

import * as yup from 'yup';
import { Input } from 'core/components/input';
import RoundedButton from 'core/components/rounded-button';
import { H1Text } from 'core/components/text/h1.text';
import { Loader } from 'core/components/loader';
import { BodySmallMediumText } from 'core/components/text/body-small-medium.text';
import { BodyXlRegular } from 'core/components/text/body-xl-regular.text';

interface PaymentForm {
  deposit: number | null;
}

export const PaymentScreen = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        deposit: yup
          .number()
          .min(0, 'Minum 0')
          .required(`${t('payment.deposit')} ${t('messages.isRequired')}`),
      }),
    []
  );

  const onSubmit = useCallback(({ deposit }: PaymentForm) => {
    if (deposit) {
      setLoading(true);

      makeTransaction(deposit)
        .then((result) => {
          console.log('[makeTransaction] result:', result);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <H1Text text={t('payment.replenish')} />

      <BodyXlRegular text={t('payment.payloaderInfo')} />

      {(loading && <Loader />) || (
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
