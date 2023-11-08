import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import env from '@core/services/env';

const resources = {
  en: {
    translation: {
      user: {
        name: 'Name',
        email: 'Email',
        sername: 'Sername',
        patronymic: 'Patronymic',
      },

      buttons: {
        submit: 'Submit',
      },

      messages: {
        isRequired: 'is required field',
        invalidEmail: 'invalid email',
      },

      welcome: {
        title: 'Your welcome to the Scandinavian financial capital',
        signIn: 'Sign in',
        signUp: 'Sign up',
        registered: 'Already have an account?',
        emailContinue: 'Continue with email',
      },
      signUp: {
        title: 'Registration',
        setNameMessage:
          'Enter your full name exactly as it is written in your passport',
      },
    },
  },

  ru: {
    translation: {
      user: {
        name: 'Имя',
        email: 'Email',
        sername: 'Фамилия',
        patronymic: 'Отчество',
      },

      buttons: {
        submit: 'Отправить',
      },

      messages: {
        isRequired: 'обязательное поле',
        invalidEmail: 'неправильный email',
      },

      welcome: {
        title: 'Добро пожаловать в Scandinavian Financial Capita',
        signIn: 'Войти',
        signUp: 'Зарегестрироваться',
        registered: 'Уже есть аккаунт?',
        emailContinue: 'Продолжить с email',
      },
      signUp: {
        title: 'Регистрация',
        setNameMessage: 'Укажите ФИО именно так, как написанно в паспорте',
      },
    },
  },

  // Добавьте другие языки здесь
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  fallbackLng: env.DEFAULT_LANGUAGE,
  resources,
});

export default i18n;
