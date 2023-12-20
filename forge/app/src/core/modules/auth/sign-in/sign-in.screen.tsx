import { Input } from 'core/components/input';
import RoundedButton from 'core/components/rounded-button';
import { fetchSupportEmail, signIn } from 'core/features/users/users.api';
import { tokenAtom, userAtom } from 'core/features/users/users.atoms';
import { useTheme } from 'core/providers/theme.provider';
import { ResponseErrorName } from 'core/types/requests';
import { Formik } from 'formik';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Linking, StyleSheet, Text, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import Icon from 'react-native-vector-icons/Feather';
import { useSetRecoilState } from 'recoil';
import * as yup from 'yup';
import { ConfirmButton } from './components/confirm-button';
import { Link } from 'core/components/link';

interface SignInUser {
  email: string;
  password: string;
}

// const showResendEmailAtom = atom({
//   key: 'ShowResendEmail',
//   default: false,
// });

function SignInScreen() {
  const toast = useToast();
  const { t } = useTranslation();
  const { theme } = useTheme();

  const [showResendEmail, setShowResendEmail] = useState<boolean>(false);
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const setUser = useSetRecoilState(userAtom);
  const setToken = useSetRecoilState(tokenAtom);

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        email: yup
          .string()
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
      // trim to fix #11
      identifier: values.email.trim(),
    })
      .then((response) => {
        if (response.error) {
          /**
           * Самое вероятное выполнения условий
           * - пользователь не подтвердил почту
           *
           * Если попадает в блок по другим причинам, то нужно искать другой
           * вариант отлова "пользователь не подтвердил почту"
           */
          if (
            response.error.status === 400 &&
            response.error.name === ResponseErrorName.application
          ) {
            setShowResendEmail(true);
          }

          throw new Error(response.error.message);
        }

        /**
         * Сохранение токена и пользователя в глобальном стейте
         */
        if (response.jwt && response.user) {
          setToken(response.jwt);
          setUser(response.user);
        }
      })
      .catch((e) => {
        toast.show(`${e.message}`, { type: 'danger' });
      });
  }, []);
  
  const [supportEmail, setSupportEmail] = useState<string>('mailto:');

  const fetchSupport = async () => {
    try {
      const response = await fetchSupportEmail();

      if (response && response.data) {
        let cleanedData = response.data.attributes.email;
        setSupportEmail(supportEmail + cleanedData);
      } else {
        console.error('No support email data', response);
      }
    } catch (e) {
      console.error('Error fetching support email', e);
    }
  };

  useEffect(() => {
    fetchSupport();
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

  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(supportEmail);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(supportEmail);
    } else {
      Alert.alert(`Don't know how to open this URL: ${supportEmail}`);
    }
  }, [supportEmail]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Formik
        initialValues={{
          // email: 'paveltretyakov.ru@gmail.com',
          // password: '123456',
          email: '',
          password: '',
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View style={{ width: '70%' }}>
            <View style={{ marginVertical: 10 }}>
              <Input
                placeholder={t('user.emailOrLogin')}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
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
                  style={styles.passwordInput}
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

            <View style={{ marginVertical: 20 }}>
              <RoundedButton
                title={t('buttons.continue')}
                onPress={handleSubmit as () => void}
                disabled={Object.keys(errors).length > 0}
              />
            </View>

            {showResendEmail && <ConfirmButton email={values.email} />}
          </View>
        )}
      </Formik>
      <Link
        title={t('welcome.support')}
        onPress={handlePress}
      />
    </View>
  );
}

SignInScreen.route = 'SignIn';

export default SignInScreen;
