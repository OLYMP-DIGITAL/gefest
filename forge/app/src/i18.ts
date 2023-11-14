import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import env from 'core/services/env';

const resources = {
  en: {
    translation: {
      user: {
        email: 'Email',
        sername: 'Sername',
        username: 'Name',
        password: 'Password',
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
      finished: {
        title: 'Registration is completed',
        toHome: 'To home',
      },
    },
  },

  ru: {
    translation: {
      user: {
        email: 'Email',
        sername: 'Фамилия',
        username: 'Имя',
        password: 'Пароль',
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
        title: 'Добро пожаловать в Scandinavian Financial Capital',
        signIn: 'Войти',
        signUp: 'Зарегестрироваться',
        registered: 'Уже есть аккаунт?',
        emailContinue: 'Продолжить с email',
      },
      signUp: {
        title: 'Регистрация',
        setNameMessage: 'Укажите ФИО именно так, как написанно в паспорте',
      },
      finished: {
        title: 'Регистрация завершена',
        toHome: 'На главную',
        subscribe: 'Подпишись на наши соцсети',
        beFirst: 'Будешь первый в курсе всех событий',
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
