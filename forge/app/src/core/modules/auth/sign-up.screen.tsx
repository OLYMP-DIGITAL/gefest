import { H3Text } from 'core/components/text/h3.text';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import * as yup from 'yup'; // Библиотека для валидации

import { NavigationProp } from '@react-navigation/native';
import { Input } from 'core/components/input';
import RoundedButton from 'core/components/rounded-button';
import { User } from 'core/features/users/users.types';
import { useTheme } from 'core/providers/theme.provider';
import api from 'core/services/api';
import { saveToken } from 'core/services/token';
import { AuthScreensEnum, NavigationStack } from 'core/types/navigation';
import { ErrorResponse } from 'core/types/requests';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useToast } from 'react-native-toast-notifications';
import Icon from 'react-native-vector-icons/Feather';

import { Checkbox } from 'core/ui/components/checkbox';
import { TextCaption } from 'core/ui/components/typography/text-caption';
import { useLanguage } from 'core/hooks/use-language';

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
  const { theme } = useTheme();
  const { language } = useLanguage();

  const [noReferal, setNoReferal] = useState<boolean>(true);
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  useEffect(() => {
    saveToken('');
  }, []);

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        referal: (() => {
          if (noReferal) {
            return yup.number().notRequired();
          }

          return yup
            .number()
            .integer(t('messages.isInteger'))
            .required(t('messages.isRequired'))
            .positive(t('messages.isPositive'));
        })(),
        username: yup.string(),
        email: yup
          .string()
          .email('Invalid email')
          .required(`${t('user.email')} ${t('messages.isRequired')}`),
        password: yup
          .string()
          .required(`${t('user.password')} ${t('messages.isRequired')}`),
      }),
    [noReferal, language]
  );

  const onSubmit = useCallback((values: SignUpUser) => {
    api
      .post<RegistrationResponse>('auth/local/register', values)
      .then((response) => {
        if (response.error) {
          return toast.show(response.error.message, {
            type: 'danger',
          });
        }

        navigation.navigate(AuthScreensEnum.finished as any);
      })
      .catch((error) => {
        console.log('An error occurred:', error);
        toast.show(t('messages.requestFailed'));
      });
  }, []);

  const onChangeNoReferal = useCallback((checked: boolean) => {
    setNoReferal(checked);
  }, []);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        passwordContainer: {
          flexDirection: 'row',
        },
        passwordInput: {
          flex: 1,
          paddingRight: 50,
        },
        icon: {
          position: 'absolute',
          right: 18,
          top: 20,
          backgroundColor: theme.greyscale50,
        },
      }),
    [theme]
  );

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
              <View style={styles.passwordContainer}>
                <Input
                  secureTextEntry={hidePassword}
                  placeholder={t('user.password')}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                <Icon
                  name={hidePassword ? 'eye-off' : 'eye'}
                  size={20}
                  style={styles.icon}
                  color={
                    !values.password ? theme.greyscale500 : theme.primaryText
                  }
                  onPress={() => setHidePassword(!hidePassword)}
                />
              </View>
              {errors.password && (
                <Text style={{ color: 'red' }}>{errors.password}</Text>
              )}
            </View>

            <View style={{ marginVertical: 10 }}>
              <Checkbox
                label={t('signUp.noReferal')}
                checked={true}
                onChange={onChangeNoReferal}
              />
            </View>

            <View style={{ marginVertical: 10 }}>
              <Input
                value={values.referal}
                onBlur={handleBlur('referal')}
                editable={!noReferal}
                placeholder={t('referalLink')}
                onChangeText={handleChange('referal')}
              />
              {errors.referal && (
                <Text style={{ color: 'red' }}>{errors.referal}</Text>
              )}
              <View style={{ marginTop: 3 }}>
                <TextCaption>{t('signUp.askReferal')}</TextCaption>
              </View>
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

export default SignUpScreen;
