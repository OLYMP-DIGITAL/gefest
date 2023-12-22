import * as yup from 'yup'; // Библиотека для валидации
import { Formik } from 'formik';
import { H3Text } from 'core/components/text/h3.text';
import { Alert, Linking, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Input } from 'core/components/input';
import RoundedButton from 'core/components/rounded-button';
import { useCallback, useEffect, useMemo, useState } from 'react';
import api from 'core/services/api';
import { NavigationProp } from '@react-navigation/native';
import { AuthScreensEnum, NavigationStack } from 'core/types/navigation';
import { saveToken } from 'core/services/token';
import { User } from 'core/features/users/users.types';
import { useToast } from 'react-native-toast-notifications';
import { ErrorResponse } from 'core/types/requests';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from 'core/providers/theme.provider';
import { Link } from 'core/components/link';
import { fetchSupportEmail } from 'core/features/users/users.api';

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

  const [hidePassword, setHidePassword] = useState<boolean>(true);
  
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

  useEffect(() => {
    fetchSupport();
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

  const styles = useMemo(() =>
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
        backgroundColor: theme.greyscale50
      }
    }), [theme]);

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
                <Icon name={hidePassword ? 'eye-off' : 'eye'}
                  size={20} style={styles.icon}
                  color={!values.password ? theme.greyscale500 : theme.primaryText}
                  onPress={() => setHidePassword(!hidePassword)} />
              </View>
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
      <Link
        title={t('welcome.support')}
        onPress={handlePress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    width: 300,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SignUpScreen;
