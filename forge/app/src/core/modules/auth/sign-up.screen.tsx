import * as yup from 'yup'; // Библиотека для валидации
import { Formik } from 'formik';
import { H3Text } from 'core/components/text/h3.text';
import { StyleSheet, Text, View } from 'react-native';
import { BodyXlRegular } from 'core/components/text/body-xl-regular.text';
import { useTranslation } from 'react-i18next';

import { Input } from 'core/components/input';
import RoundedButton from 'core/components/rounded-button';
import { useCallback, useEffect, useMemo } from 'react';
import api from 'core/services/api';
import { NavigationProp } from '@react-navigation/native';
import { NavigationStack } from 'core/types/navigation';
import { saveToken } from 'core/services/token';
import { User } from 'core/features/users/users.types';
import { useToast } from 'react-native-toast-notifications';
import { ErrorResponse } from 'core/types/requests';
import { TextInput } from 'react-native-gesture-handler';

interface SignUpUser {
  email: string;
  referal: string;
  username: string;
  password: string;
}

type RegistrationResponse = RegistrationSuccessResponse & ErrorResponse;

interface RegistrationSuccessResponse {
  jwt: string;
  user: User;
}

export function SignUpScreen({
  navigation,
}: {
  navigation: NavigationProp<NavigationStack, 'SignUp'>;
}) {
  const toast = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    saveToken('');
  }, []);

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        referal: yup.string(),
        username: yup.string(),
        email: yup
          .string()
          .email('Invalid email')
          .required(`${t('user.email')} ${t('messages.isRequired')}`),
        password: yup
          .string()
          .required(`${t('user.password')} ${t('messages.isRequired')}`),
      }),
    []
  );

  const onSubmit = useCallback((values: SignUpUser) => {
    api
      .post<RegistrationResponse>('auth/local/register', values)
      .then((response) => {
        // Handle success.
        console.log('[SignUpScreen] signup.response:', response);

        if (response.error) {
          return toast.show(response.error.message, {
            type: 'danger',
          });
        }

        navigation.navigate('Finished');

        // Если не понадобиться подтверждение почты
        // if (response.jwt) {
        //   saveToken(response.jwt);
        //   navigation.navigate('Finished');
        // }
      })
      .catch((error) => {
        // Handle error.
        console.log('An error occurred:', error);
        toast.show(t('messages.requestFailed'));
      });
  }, []);

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <H3Text text={t('signUp.title')} />

      {/* <View style={styles.message}>
        <BodyXlRegular
          styles={{ textAlign: 'center' }}
          text={t('signUp.setNameMessage')}
        />
      </View> */}

      <Formik
        initialValues={{
          email: '',
          referal: '',
          username: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View style={{ width: '70%' }}>
            <View style={{ marginVertical: 10 }}>
              <Input
                placeholder={t('user.email')}
                onChangeText={(text) => {
                  handleChange('email')(text);
                  handleChange('username')(text);
                }}
                onBlur={(text) => {
                  handleBlur('email')(text);
                  handleBlur('username')(text);
                }}
                value={values.email}
              />
              {errors.email && (
                <Text style={{ color: 'red' }}>{errors.email}</Text>
              )}
            </View>

            <View style={{ marginVertical: 10 }}>
              <Input
                secureTextEntry
                placeholder={t('user.password')}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {errors.password && (
                <Text style={{ color: 'red' }}>{errors.password}</Text>
              )}
            </View>

            <View style={{ marginVertical: 10 }}>
              <Input
                placeholder={t('referalLink')}
                onChangeText={handleChange('referal')}
                onBlur={handleBlur('referal')}
                value={values.referal}
              />
              {errors.referal && (
                <Text style={{ color: 'red' }}>{errors.referal}</Text>
              )}
            </View>

            <View style={{ marginVertical: 20 }}>
              <RoundedButton
                title={t('buttons.submit')}
                onPress={handleSubmit as () => void}
                disabled={Object.keys(errors).length > 0}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

SignUpScreen.route = 'SignUp';

const styles = StyleSheet.create({
  message: {
    width: 300,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SignUpScreen;
