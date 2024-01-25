/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { H3Text } from 'core/components/text/h3.text';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import * as yup from 'yup'; // Библиотека для валидации

import { NavigationProp } from '@react-navigation/native';
import { Input } from 'core/components/input';
import RoundedButton from 'core/components/rounded-button';
import { User } from 'core/features/users/users.types';
import { useStyles } from 'core/hooks/use-styles.hook';
import { useTheme } from 'core/providers/theme.provider';
import api from 'core/services/api';
import { AuthScreensEnum, NavigationStack } from 'core/types/navigation';
import { ErrorResponse } from 'core/types/requests';
import { Checkbox } from 'core/ui/components/checkbox';
import { TextCaption } from 'core/ui/components/typography/text-caption';
import { useFormik } from 'formik';
import { TFunction } from 'i18next';
import { useEffect, useState } from 'react';
import { useToast } from 'react-native-toast-notifications';
import Icon from 'react-native-vector-icons/Feather';
import { SupportEmailLink } from 'core/features/support/support-email-link.component';

interface FormValues {
  email: string;
  referal: string;
  username: string;
  password: string;
}

interface SignUpUser extends FormValues {
  username: string;
}

interface RegistrationSuccessResponse {
  jwt: string;
  user: User;
}

type RegistrationResponse = RegistrationSuccessResponse & ErrorResponse;

interface FormDetails {
  values: Partial<FormValues>;
  validation: {
    [key: string]: yup.ObjectSchema<any>;
  };
}

const getDefaultSchema = (t: TFunction) =>
  yup.object().shape({
    referal: yup
      .number()
      .integer(t('messages.isInteger'))
      .required(t('messages.isRequired'))
      .positive(t('messages.isPositive')),
    username: yup.string(),
    email: yup
      .string()
      .email('Invalid email')
      .required(`${t('user.email')} ${t('messages.isRequired')}`),
    password: yup
      .string()
      .required(`${t('user.password')} ${t('messages.isRequired')}`),
  });

const getNoReferalSchema = (t: TFunction) =>
  yup.object().shape({
    referal: yup.number().notRequired(),
    username: yup.string(),
    email: yup
      .string()
      .email('Invalid email')
      .required(`${t('user.email')} ${t('messages.isRequired')}`),
    password: yup
      .string()
      .required(`${t('user.password')} ${t('messages.isRequired')}`),
  });

const initialValues = {
  email: '',
  referal: '',
  username: '',
  password: '',
};

export const SignUpScreen = ({
  navigation,
}: {
  navigation: NavigationProp<NavigationStack, 'SignUp'>;
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const toast = useToast();
  const [noReferal, setNoReferal] = useState<boolean>(false);
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const [validationSchema, setValidationSchema] = useState(getDefaultSchema(t));

  const styles = useStyles((theme) => ({
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
  }));

  const onSubmit = (values: SignUpUser) => {
    api
      .post<RegistrationResponse>('auth/local/register', values)
      .then((response: RegistrationResponse) => {
        if (response.error) {
          return toast.show(response.error.message, {
            type: 'danger',
          });
        }

        navigation.navigate(AuthScreensEnum.finished as any);
      })
      .catch((error) => {
        toast.show(t('messages.requestFailed'));
      });
  };

  const formik = useFormik({
    onSubmit,
    initialValues,
    validationSchema,
  });

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    validateForm,
  } = formik;

  useEffect(() => {
    validateForm();
  }, [validationSchema, setValidationSchema]);

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
          {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
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
              color={!values.password ? theme.greyscale500 : theme.primaryText}
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
            checked={noReferal}
            onChange={(checked: boolean) => {
              setNoReferal(checked);
              formik.setFieldValue('referal', '');

              setValidationSchema(
                (checked && getNoReferalSchema(t)) ||
                  (getDefaultSchema(t) as any)
              );
            }}
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

        <SupportEmailLink />
      </View>
    </View>
  );
};

export default SignUpScreen;
