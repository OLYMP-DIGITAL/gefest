import * as yup from 'yup'; // Библиотека для валидации
// import { t } from 'i18next';
import { Formik } from 'formik';
import { H3Text } from '@core/components/text/h3.text';
import { Text, View } from 'react-native';
import { BodyXlRegular } from '@core/components/text/body-xl-regular.text';
import { useTranslation } from 'react-i18next';

import { Input } from '@core/components/input';
import RoundedButton from '@core/components/rounded-button';
import { useCallback, useEffect, useMemo } from 'react';
import api from '@core/services/api';
import { NavigationProp } from '@react-navigation/native';
import { NavigationStack } from '@core/types/navigation';
import { saveToken } from '@core/services/token';
// import { saveToken } from '@core/services/token';

interface SignUpUser {
  email: string;
  sername: string;
  username: string;
  password: string;
  patronymic: string;
}

interface RegistrationResponse {
  jwt: string;
  user: SignUpUser;
}

export function SignUpScreen({
  navigation,
}: {
  navigation: NavigationProp<NavigationStack, 'SignUp'>;
}) {
  const { t } = useTranslation();

  useEffect(() => {
    saveToken('');
  }, []);

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup
          .string()
          .required(`${t('user.username')} ${t('messages.isRequired')}`),
        sername: yup
          .string()
          .required(`${t('user.sername')} ${t('messages.isRequired')}`),
        patronymic: yup
          .string()
          .required(`${t('user.patronymic')} ${t('messages.isRequired')}`),
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
      .post<RegistrationResponse>('api/auth/local/register', values)
      .then((response) => {
        // Handle success.
        console.log('Well done!');
        console.log('User profile', response.user);
        console.log('User token', response.jwt);

        if (response.jwt) {
          saveToken(response.jwt);
          navigation.navigate('Finished');
        }
      })
      .catch((error) => {
        // Handle error.
        console.log('An error occurred:', error);
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
      <View style={{ marginVertical: 10 }}>
        <BodyXlRegular text={t('signUp.setNameMessage')} />
      </View>

      <Formik
        initialValues={{
          username: 'name',
          sername: 'sername',
          patronymic: 'patronymic',
          email: 'mail@mail.ru',
          password: '123456',
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View style={{ width: '70%' }}>
            <View style={{ marginVertical: 10, marginTop: 20 }}>
              <Input
                placeholder={t('user.username')}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
              />
              {errors.username && (
                <Text style={{ color: 'red' }}>{errors.username}</Text>
              )}
            </View>

            <View style={{ marginVertical: 10 }}>
              <Input
                placeholder={t('user.sername')}
                onChangeText={handleChange('sername')}
                onBlur={handleBlur('sername')}
                value={values.sername}
              />
              {errors.sername && (
                <Text style={{ color: 'red' }}>{errors.sername}</Text>
              )}
            </View>

            <View style={{ marginVertical: 10 }}>
              <Input
                placeholder={t('user.patronymic')}
                onChangeText={handleChange('patronymic')}
                onBlur={handleBlur('patronymic')}
                value={values.patronymic}
              />
              {errors.patronymic && (
                <Text style={{ color: 'red' }}>{errors.patronymic}</Text>
              )}
            </View>

            <View style={{ marginVertical: 10 }}>
              <Input
                placeholder={t('user.email')}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
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

export default SignUpScreen;
