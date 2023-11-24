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

      units: {
        s: 'sec.',
      },

      buttons: {
        submit: 'Submit',
      },

      messages: {
        isRequired: 'is required field',
        invalidEmail: 'invalid email',
        requestFailed: 'Request is failed. Please, try later',
        requestSuccess: 'Request completed successfully',
      },

      welcome: {
        title: 'Your welcome to the Scandinavian financial capital',
        signIn: 'Sign in',
        signUp: 'Sign up',
        registered: 'Already have an account?',
        emailContinue: 'Continue with email',
      },
      signIn: {
        text: '',
        timerText: 'You can resend the code via',
        resendEmail: 'Send confirmation by email',
        checkEmail:
          "Check your email, you should receive instructions to confirm your email address. If you didn't have any massage, you can try to resend message",
      },
      signUp: {
        title: 'Registration',
        setNameMessage:
          'Enter your full name exactly as it is written in your passport',
      },
      finished: {
        title: 'Registration is completed',
        toHome: 'To home',
        continue: 'A confirmation email has been sent to your email.',
        toSignIn: 'Sign in',
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

      units: {
        s: 'сек.',
      },

      buttons: {
        submit: 'Отправить',
      },

      messages: {
        isRequired: 'обязательное поле',
        invalidEmail: 'неправильный email',
        requestFailed:
          'Произошла ошбка во время запроса. Пожалйста, повторите позже',
        requestSuccess: 'Запрос выполнен успешно',
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
      signIn: {
        timerText: 'Отправить код повторно можно будет через',
        resendEmail: 'Отправить подтверждение на почту',
        checkEmail:
          'Проверьте почту, на неё должна прийти инструкция для подтверждения адреса электронной почты',
      },
      finished: {
        title: 'Регистрация завершена',
        toHome: 'На главную',
        continue: 'На Вашу почту отправлено письмо с подтверждением',
        toSignIn: 'Войти',
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
