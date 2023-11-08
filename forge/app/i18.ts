import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import env from '@core/services/env';

const resources = {
  en: {
    translation: {
      welcome: {
        title: 'Your welcome to the Scandinavian financial capital',
        signIn: 'Sign in',
        signUp: 'Sign up',
        registered: 'Already have an account?',
        emailContinue: 'Continue with email',
      },
    },
  },

  ru: {
    translation: {
      welcome: {
        title: 'Добро пожаловать в Scandinavian Financial Capita',
        signIn: 'Войти',
        signUp: 'Зарегестрироваться',
        registered: 'Уже есть аккаунт?',
        emailContinue: 'Продолжить с email',
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
