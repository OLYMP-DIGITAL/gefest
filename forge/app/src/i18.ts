import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import env from 'core/services/env';

const resources = {
  en: {
    translation: {
      referalLink: 'Referal ID',
      companyCost: 'Company cost',

      cabinet: 'Personal Cabinet',
      grpahGrow: 'Growth Chart',
      partners: 'Partners',
      documents: 'Documents',
      news: 'News',
      faq: 'FAQ',

      user: {
        email: 'Email',
        sername: 'Sername',
        name: 'Password',
        username: 'Login',
        password: 'Password',
        patronymic: 'Patronymic',
        emailOrLogin: 'Email or login',
      },

      units: {
        s: 'sec.',
      },

      buttons: {
        submit: 'Submit',
      },

      payment: {
        deposit: 'Deposit amount',
        goToPay: 'Go to pay page',
        replenish: 'Replenish the balance',
        payloaderInfo: 'To transfer funds we use the yoomoney transfer system',
        goHome: 'Go home',
        topUp: 'Account top-up',
        totalBalance: 'Total balance',
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
      wallet: {
        title: 'Wallet',
        step: '1 Step of investment',
        stepLabel: 'Initial Investment Offering',
        desc: 'Unique conditions in connection with the beginning of the formation of the initial capital of a targeted investment project.',
      },
    },
  },

  ru: {
    translation: {
      referalLink: 'Реферальный ID',
      companyCost: 'Стоимость компании',

      cabinet: 'Личный кабинет',
      grpahGrow: 'График роста',
      partners: 'Партнёры',
      documents: 'Документы',
      news: 'Новости',
      faq: 'FAQ',

      user: {
        email: 'Email',
        sername: 'Фамилия',
        name: 'Имя',
        username: 'Логин',
        password: 'Пароль',
        patronymic: 'Отчество',
        emailOrLogin: 'Email или логин',
      },

      units: {
        s: 'сек.',
      },

      buttons: {
        submit: 'Отправить',
      },

      payment: {
        deposit: 'Сумма пополнения',
        goToPay: 'Перейти к форме оплаты',
        replenish: 'Пополнение баланса',
        payloaderInfo:
          'Для перевода денежных средств мы используем систему переводов Yoomoney',
        goHome: 'Вернуться домой',
        topUp: 'Пополнение счёта',
        totalBalance: 'Общий баланс',
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
          'Проверьте почту, на неё должна прийти инструкция для подтверждения адреса электронной почты. Пожалуйста, обратите внимание на то, что письмо может попасть в спам',
      },
      finished: {
        title: 'Регистрация завершена',
        toHome: 'На главную',
        continue:
          'На Вашу почту отправлено письмо с подтверждением. Пожалуйста, обратите внимание на то, что письмо может попасть в спам',
        toSignIn: 'Войти',
        subscribe: 'Подпишись на наши соцсети',
        beFirst: 'Будешь первый в курсе всех событий',
      },
      wallet: {
        title: 'Мой кошелёк',
        step: '1 этап инвестиций',
        stepLabel: 'Initial Investment Offering',
        desc: 'Уникальные условия в связи с началом формирования первоначального капитала адресного инвестиционного проекта.',
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
