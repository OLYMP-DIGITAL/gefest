import { H3Text } from '@core/components/text/h3.text';
import { BodyXlRegular } from '@core/components/text/body-xl-regular.text';
import { useTranslation } from 'react-i18next';
import { Button, Text, View } from 'react-native';

import { Formik } from 'formik';
import * as yup from 'yup'; // Библиотека для валидации
import { Input } from '@core/components/input';
import { t } from 'i18next';
import RoundedButton from '@core/components/rounded-button';

const validationSchema = yup.object().shape({
  name: yup.string().required(`${t('user.name')} ${t('messages.isRequired')}`),
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
});

export function SignUpScreen() {
  const { t } = useTranslation();

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
        initialValues={{ name: '', sername: '', patronymic: '', email: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // Отправка данных формы
          console.log('done!');
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View style={{ width: '80%' }}>
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
    </View>
  );
}

SignUpScreen.route = 'SignUp';

export default SignUpScreen;
