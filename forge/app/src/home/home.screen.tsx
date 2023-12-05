import { useTranslation } from 'react-i18next';
import { NavigationStack } from 'core/types/navigation';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { Image, StyleSheet, Text, View } from 'react-native';
import RoundedButton from 'core/components/rounded-button';
import { Input } from 'core/components/input';
import { Formik } from 'formik';
import { useCallback, useMemo } from 'react';

import * as yup from 'yup';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'core/features/users/users.atoms';
import { update } from 'core/features/users/users.api';
import PhoneInput from 'react-native-phone-input';
import { UserPayload } from 'core/features/users/users.types';

// import Button from 'core/components/button';

export function HomeScreen({ navigation }: DrawerScreenProps<NavigationStack>) {
  const { t } = useTranslation();
  const user = useRecoilValue(userAtom);

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        name: yup
          .string()
          .required(`${t('user.name')} ${t('messages.isRequired')}`),
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
      }),
    []
  );

  const onSubmit = useCallback(
    (values: UserPayload) => {
      if (user) {
        update(values, user.id).then((response) => {
          console.log('Rsponse', response);
        });
      }
    },
    [user]
  );

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
      }}
    >
      <Formik
        initialValues={{
          name: user?.name || '',
          sername: user?.sername || '',
          patronymic: user?.patronymic || '',
          email: user?.email || '',
          // password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View style={{ width: '70%' }}>
            <PhoneInput />

            <View style={{ marginVertical: 10, marginTop: 20 }}>
              <Input
                placeholder={t('user.name')}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              {errors.name && (
                <Text style={{ color: 'red' }}>{errors.name}</Text>
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

      {/* <Text>{t('welcome')}</Text> */}
      {/* <Image
        style={{ width: '70%', height: '100%' }}
        source={{ uri: require('assets/cabinet.png') }}
      /> */}

      {/* <View style={styles.line}>
        <Button
          title="Go to parters"
          onPress={() => navigation.navigate('Partners')}
        />
      </View>

      <Button title="Open drawer" onPress={() => navigation.openDrawer()} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    marginBottom: 20,
  },
});

export default HomeScreen;
