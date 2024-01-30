/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { useTranslation } from 'react-i18next';
import { Linking, View } from 'react-native';
import * as yup from 'yup'; // Библиотека для валидации

import { NavigationProp } from '@react-navigation/native';
import RoundedButton from 'core/components/rounded-button';
import { SupportEmailLink } from 'core/features/support/support-email-link.component';
import { User } from 'core/features/users/users.types';
import { useStyles } from 'core/hooks/use-styles.hook';
import { useTheme } from 'core/providers/theme.provider';
import api from 'core/services/api';
import { AuthScreensEnum, NavigationStack } from 'core/types/navigation';
import { ErrorResponse } from 'core/types/requests';
import { Card } from 'core/ui/components/card';
import { Checkbox } from 'core/ui/components/checkbox';
import Input from 'core/ui/components/input';
import { ScreenLayout } from 'core/ui/components/screen-layout/screen-layout';
import { TextCaption } from 'core/ui/components/typography/text-caption';
import { useFormik } from 'formik';
import { TFunction } from 'i18next';
import { useEffect, useState } from 'react';
import { useToast } from 'react-native-toast-notifications';
import { useDocuments } from 'core/features/documents/use-documents';
import { Button } from 'core/ui/components/button/button.component';
import env, { envKyes } from 'core/services/env';
import { Document } from 'core/features/documents/documents.types';
import { Link } from 'core/components/link';
import { ButtonContained } from 'core/ui/components/button/button-contained';

interface FormValues {
  email: string;
  referal: string;
  username: string;
  password: string;
}

interface SignUpUser extends FormValues {
  username: string;
  agreement: boolean;
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

    agreement: yup.bool().oneOf([true], `${t('messages.isRequired')}`),
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

    agreement: yup.bool().oneOf([true], `${t('messages.isRequired')}`),
  });

const initialValues = {
  email: '',
  referal: '',
  username: '',
  password: '',
  agreement: false,
};

export const SignUpScreen = ({
  navigation,
}: {
  navigation: NavigationProp<NavigationStack, 'SignUp'>;
}) => {
  const { t } = useTranslation();

  const toast = useToast();
  const documents = useDocuments();
  const [noReferal, setNoReferal] = useState<boolean>(false);
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const [validationSchema, setValidationSchema] = useState(getDefaultSchema(t));

  const styles = useStyles((theme) => ({
    passwordContainer: {
      flexDirection: 'row',
    },
    passwordInput: {
      flex: 1,
      // paddingRight: 50,
    },
    icon: {
      position: 'absolute',
      right: 18,
      top: 20,
      backgroundColor: theme.greyscale50,
    },
  }));

  useEffect(() => {
    console.log('Documents', documents);
  }, [documents]);

  const onSubmit = ({ agreement, ...values }: SignUpUser) => {
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

  const handleDownload = (document: Document) => {
    const url = `${env[envKyes.apiHost]}${document.link}`;

    if (url) {
      Linking.openURL(url).catch((error) =>
        console.error('Error opening document:', error)
      );
    }
  };

  return (
    <ScreenLayout title={t('signUp.title')}>
      <View
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '1%',
        }}
      >
        <View style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <Card style={{ padding: 30 }}>
            <View>
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
                error={errors.email}
              />
            </View>

            <View>
              <View style={styles.passwordContainer}>
                <Input
                  secureTextEntry={hidePassword}
                  placeholder={t('user.password')}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  error={errors.password}
                />
              </View>
            </View>

            <View style={{ marginTop: 5 }}>
              <Input
                value={values.referal}
                onBlur={handleBlur('referal')}
                editable={!noReferal}
                placeholder={t('referalLink')}
                onChangeText={handleChange('referal')}
                error={errors.referal}
              />
            </View>

            <View>
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

              <View>
                <TextCaption>{t('signUp.askReferal')}</TextCaption>
              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              <Checkbox
                error={errors.agreement}
                label={`${t('signUp.agreement')}:`}
                checked={values.agreement}
                onChange={(checked: boolean) => {
                  formik.setFieldValue('agreement', checked);
                }}
              />

              <View
                style={{
                  marginTop: 10,
                  display: 'flex',
                  alignItems: 'flex-start',
                }}
              >
                {documents
                  ?.filter((document) => document.agreement)
                  .map((document, index) => (
                    <Link
                      key={`document-${document.id}`}
                      title={`${index + 1}. ${document.title}`}
                      onPress={() => handleDownload(document)}
                    />
                  ))}
              </View>
            </View>

            <View style={{ marginVertical: 20 }}>
              <ButtonContained
                onPress={handleSubmit as () => void}
                disabled={Object.keys(errors).length > 0}
              >
                {t('buttons.submit')}
              </ButtonContained>
            </View>

            <SupportEmailLink />
          </Card>
        </View>
      </View>
    </ScreenLayout>
  );
};

export default SignUpScreen;
