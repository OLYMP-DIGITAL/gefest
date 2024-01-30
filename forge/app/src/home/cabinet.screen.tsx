/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import { DrawerScreenProps } from '@react-navigation/drawer';
import { Input } from 'core/components/input';
import RoundedButton from 'core/components/rounded-button';
import { NavigationStack } from 'core/types/navigation';
import { Formik } from 'formik';
import { useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

import { fetchMe, update } from 'core/features/users/users.api';
import { userAtom } from 'core/features/users/users.atoms';
import { UserPayload } from 'core/features/users/users.types';
import { useLanguage } from 'core/hooks/use-language';
import { useTheme } from 'core/providers/theme.provider';
import api from 'core/services/api';
import { Card } from 'core/ui/components/card';
import { TextBody } from 'core/ui/components/typography/text-body';
import { TextDisplay } from 'core/ui/components/typography/text-display';
import { TextHeadline } from 'core/ui/components/typography/text-headline';
import { TextTitle } from 'core/ui/components/typography/text-title';
import { ScrollView } from 'react-native-gesture-handler';
import { useToast } from 'react-native-toast-notifications';
import { useRecoilState, useSetRecoilState } from 'recoil';
import * as yup from 'yup';
import { appLoadingAtom } from 'core/atoms/app-loading.atom';
import { ScreenLayout } from 'core/ui/components/screen-layout/screen-layout';
import { ButtonContained } from 'core/ui/components/button/button-contained';

// import Button from 'core/components/button';

const WaitCheck = () => {
  const { t } = useTranslation();

  return (
    <View style={{ marginVertical: 10 }}>
      <TextBody>{t('cabinetPage.waitCheck')}</TextBody>
    </View>
  );
};

const Confirmed = () => {
  const { t } = useTranslation();

  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontSize: 17, color: 'green' }}>
        {t('cabinetPage.passportConfirmed')}
      </Text>
    </View>
  );
};

export function CabinetScreen({
  navigation,
}: DrawerScreenProps<NavigationStack>) {
  const { t } = useTranslation();
  const toast = useToast();
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [user, setUser] = useRecoilState(userAtom);
  const setLoading = useSetRecoilState(appLoadingAtom);

  const refetchMe = async () => {
    try {
      const response = await fetchMe();

      if (response && response.id) {
        setUser(response);
      } else {
        console.error('There is no logged in data on response', response);
      }
    } catch (e) {
      console.error('Error on fetch logged in user', e);
    }
  };

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        name: yup
          .string()
          .required(`${t('user.name')} ${t('messages.isRequired')}`),
        lastname: yup
          .string()
          .required(`${t('user.lastname')} ${t('messages.isRequired')}`),
        middlename: yup
          .string()
          .required(`${t('user.middlename')} ${t('messages.isRequired')}`),
        passportNumber: yup
          .string()
          .required(`${t('user.passportNumber')} ${t('messages.isRequired')}`)
          .min(7, `${t('messages.minString')}: 7`)
          .max(16, `${t('messages.maxString')}: 16`),
        registeredAddress: (() => {
          return yup
            .string()
            .required(
              `${t('user.registeredAddress')}: ${t('messages.isRequired')}`
            );
        })(),
        email: yup
          .string()
          .email('Invalid email')
          .required(`${t('user.email')} ${t('messages.isRequired')}`),
        phone: yup
          .string()
          .matches(
            new RegExp('^\\+\\d{1,4}\\s?\\d{1,4}\\s?\\d{1,9}\\d{1,5}?$'),
            `${t('user.phone')} ${t('messages.phoneNumberValidation')}`
          ),
      }),
    [language]
  );

  const onSubmit = useCallback(
    (values: UserPayload) => {
      if (user) {
        setLoading(true);

        update(values, user.id)
          .then((response) => {
            if ((response as any).error) {
              toast.show((response as any).error.message, {
                type: 'danger',
              });
            } else {
              toast.show(t('messages.requestSuccess'), {
                type: 'success',
              });

              refetchMe();
            }
          })
          .catch(() =>
            toast.show(t('messages.requestFailed'), {
              type: 'success',
            })
          )
          .finally(() => setLoading(false));
      }
    },
    [user]
  );

  const passportFaceRef = useRef<HTMLInputElement | null>(null);
  const faceWithPassportRef = useRef<HTMLInputElement | null>(null);
  const passportRegistrationRef = useRef<HTMLInputElement | null>(null);
  const fileTypes = [
    'image/apng',
    'image/bmp',
    'image/gif',
    'image/jpeg',
    'image/pjpeg',
    'image/png',
    'image/svg+xml',
    'image/tiff',
    'image/webp',
    'image/x-icon',
  ];

  const uploadImage = useCallback(
    (ref: any, field: string) => {
      const file = (ref.current as any)?.files[0];

      if (!file) {
        console.error('Файл не выбран');
        return;
      }
      if (!fileTypes.includes(file.type)) {
        toast.show(t('messages.fileTypeIsInvalid'), {
          type: 'warning',
        });
        return;
      }

      var formdata = new FormData();
      formdata.append('ref', 'plugin::users-permissions.user');
      formdata.append('refId', `${user?.id}`);
      formdata.append('files', file);
      formdata.append('field', field);

      setLoading(true);

      toast.show(t('messages.fileUploadStarted'), {
        type: 'normal',
      });

      api
        .post('upload', formdata)
        .then((result) => {
          toast.show(t('messages.requestSuccess'), {
            type: 'success',
          });

          refetchMe();
        })
        .catch((error) => console.error('Upload image request error:', error))
        .finally(() => {
          setLoading(false);
        });
    },
    [user]
  );

  return (
    <ScreenLayout title={t('cabinet')}>
      <Formik
        initialValues={{
          name: user?.name || '',
          lastname: user?.lastname || '',
          middlename: user?.middlename || '',
          email: user?.email || '',
          phone: user?.phone || '',
          passportNumber: user?.passportNumber || '',
          registeredAddress: user?.registeredAddress || '',
          // password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View>
            <View style={{ marginVertical: 10 }}>
              <TextHeadline>{t('cabinetPage.personal')}</TextHeadline>
            </View>

            <Card style={{ padding: 20 }}>
              <View style={{ marginVertical: 10, marginTop: 20 }}>
                <Input
                  placeholder={t('user.name')}
                  editable={!user?.passportConfirmed}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
                {!user?.passportConfirmed && errors.name && (
                  <Text style={{ color: theme.error }}>{errors.name}</Text>
                )}
              </View>

              <View style={{ marginVertical: 10 }}>
                <Input
                  placeholder={t('user.lastname')}
                  editable={!user?.passportConfirmed}
                  onChangeText={handleChange('lastname')}
                  onBlur={handleBlur('lastname')}
                  value={values.lastname}
                />
                {!user?.passportConfirmed && errors.lastname && (
                  <Text style={{ color: theme.error }}>{errors.lastname}</Text>
                )}
              </View>

              <View style={{ marginVertical: 10 }}>
                <Input
                  placeholder={t('user.middlename')}
                  editable={!user?.passportConfirmed}
                  onChangeText={handleChange('middlename')}
                  onBlur={handleBlur('middlename')}
                  value={values.middlename}
                />
                {!user?.passportConfirmed && errors.middlename && (
                  <Text style={{ color: theme.error }}>
                    {errors.middlename}
                  </Text>
                )}
              </View>

              <View style={{ marginVertical: 10 }}>
                <Input
                  placeholder={t('user.email')}
                  editable={false}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {!user?.passportConfirmed && errors.email && (
                  <Text style={{ color: theme.error }}>{errors.email}</Text>
                )}
              </View>

              <View style={{ marginVertical: 10 }}>
                <Input
                  placeholder={t('user.passportNumber')}
                  editable={!user?.passportConfirmed}
                  onChangeText={handleChange('passportNumber')}
                  onBlur={handleBlur('passportNumber')}
                  value={values.passportNumber}
                />
                {!user?.passportConfirmed && errors.passportNumber && (
                  <Text style={{ color: theme.error }}>
                    {errors.passportNumber}
                  </Text>
                )}
              </View>

              <View style={{ marginVertical: 10 }}>
                <Input
                  placeholder={t('user.registeredAddress')}
                  editable={!user?.passportConfirmed}
                  onChangeText={handleChange('registeredAddress')}
                  onBlur={handleBlur('registeredAddress')}
                  value={values.registeredAddress}
                />
                {!user?.passportConfirmed && errors.registeredAddress && (
                  <Text style={{ color: theme.error }}>
                    {errors.registeredAddress}
                  </Text>
                )}
              </View>

              <View style={{ marginVertical: 10, marginTop: 20 }}>
                <Input
                  textContentType={'telephoneNumber'}
                  placeholder={t('user.phone')}
                  editable={!user?.passportConfirmed}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                />

                {!user?.passportConfirmed && errors.phone && (
                  <Text style={{ color: theme.error }}>{errors.phone}</Text>
                )}
              </View>

              {!user?.passportConfirmed && (
                <View style={{ marginVertical: 20, width: 200 }}>
                  <ButtonContained
                    onPress={handleSubmit as () => void}
                    disabled={Object.keys(errors).length > 0}
                  >
                    {t('buttons.save')}
                  </ButtonContained>
                </View>
              )}
            </Card>

            <View style={{ marginVertical: 10, marginTop: 20 }}>
              <TextHeadline>{t('cabinetPage.passport')}</TextHeadline>
              {/* <H3Text text={t('cabinetPage.passport')} /> */}
            </View>

            <Card style={{ padding: 20, marginBottom: 20 }}>
              {(user?.passportConfirmed && <Confirmed />) || (
                <>
                  <View style={{ marginVertical: 10, marginTop: 20 }}>
                    <TextTitle>{t('cabinetPage.passportFacePage')}</TextTitle>

                    {(!user?.passportConfirmed && !user?.passportFace && (
                      <input
                        style={{ overflow: 'hidden', width: '90px' }}
                        ref={passportFaceRef}
                        type="file"
                        accept="image/*"
                        onChange={() =>
                          uploadImage(passportFaceRef, 'passportFace')
                        }
                      />
                    )) || <WaitCheck />}
                  </View>
                  <View style={{ marginVertical: 10, marginTop: 20 }}>
                    <TextTitle>
                      {t('cabinetPage.passportRegistrationPage')}
                    </TextTitle>

                    {(!user?.passportConfirmed &&
                      !user?.passportRegistration && (
                        <input
                          style={{ overflow: 'hidden', width: '90px' }}
                          ref={passportRegistrationRef}
                          type="file"
                          accept="image/*"
                          onChange={() =>
                            uploadImage(
                              passportRegistrationRef,
                              'passportRegistration'
                            )
                          }
                        />
                      )) || <WaitCheck />}
                  </View>

                  <View style={{ marginVertical: 10, marginTop: 20 }}>
                    <TextTitle>{t('cabinetPage.faceWithPassport')}</TextTitle>

                    {(!user?.passportConfirmed && !user?.faceWithPassport && (
                      <input
                        style={{ overflow: 'hidden', width: '90px' }}
                        ref={faceWithPassportRef}
                        type="file"
                        accept="image/*"
                        onChange={() =>
                          uploadImage(faceWithPassportRef, 'faceWithPassport')
                        }
                      />
                    )) || <WaitCheck />}
                  </View>
                </>
              )}
            </Card>
          </View>
        )}
      </Formik>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  line: {
    marginBottom: 20,
  },
});

export default CabinetScreen;
