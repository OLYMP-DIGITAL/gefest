import * as yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { signIn } from 'core/features/users/users.api';
import { Input } from 'core/components/input';
import RoundedButton from 'core/components/rounded-button';
import { useToast } from 'react-native-toast-notifications';

interface SignInUser {
  email: string;
  password: string;
}

function SignInScreen() {
  const toast = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    toast.show('Test', { type: 'success' });
  }, []);

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
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

  const onSubmit = useCallback((values: SignInUser) => {
    signIn({
      password: values.password,
      identifier: values.email,
    })
      .then((response) => {
        if (response.error) {
          throw new Error(response.error.message);
        }
      })
      .catch((e) => {
        toast.show(`${e.message}`, { type: 'danger' });
      });
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Formik
        initialValues={{
          email: 'mail@mail.ru',
          password: '123456',
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View style={{ width: '70%' }}>
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

SignInScreen.route = 'SignIn';

export default SignInScreen;
