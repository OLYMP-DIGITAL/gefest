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

      screens: {
        wallet: 'Wallet',
        cabinet: 'Personal Cabinet',
        grpahGrow: 'Growth Chart',
        partners: 'Partners',
        documents: 'Documents',
        news: 'News',
        faq: 'FAQ',
        payment: 'Payment',
        article: 'News',
      },

      authScreens: {
        finished: 'Registration',
        welcome: 'Welcome',
        signIn: 'Sign in',
        signUp: 'Sign up',
      },

      documents: {
        title: 'Documents',
        instructions: 'Intructions',
        agreement: 'User agreement',
        legalInfo: 'Legal information',
        legalRegulation: 'Legal regulation',
        conditions: 'Conditions',
        confidentiality: 'Confidentiality',
        trust: 'Confidence building',
        risk: 'Risk warning',
      },

      news: 'News',
      faq: 'FAQ',
      article: 'News',

      user: {
        email: 'Email',
        lastname: 'Lastname',
        name: 'Password',
        phone: 'Phone',
        username: 'Login',
        password: 'Password',
        middlename: 'Middlename',
        emailOrLogin: 'Email or login',
      },

      cabinetPage: {
        personal: 'Personal data',
        passport: 'Passport data',
        passportFacePage: 'Face page',
        faceWithPassport: 'Face photo with passport',
        passportRegistrationPage: 'Registration page',
        waitCheck: 'Wait check',
        passportConfirmed: 'Passport is confirmed',
      },

      units: {
        s: 'sec.',
      },

      buttons: {
        submit: 'Submit',
        save: 'Save',
        continue: 'Continue',
        close: 'Close',
      },

      payment: {
        title: 'Payment',
        deposit: 'Deposit amount',
        goToPay: 'Go to pay page',
        replenish: 'Replenish the balance',
        payloaderInfo: 'To transfer funds we use the yoomoney transfer system',
        goHome: 'Go home',
        topUp: 'Account top-up',
        totalBalance: 'Total balance',
        currentSharePrice: 'Current share price',
      },

      messages: {
        isRequired: 'is required field',
        invalidEmail: 'invalid email',
        requestFailed: 'Request is failed. Please, try later',
        requestSuccess: 'Thank you. Request completed successfully',
        referalCopied: 'Referal ID is copied',
        minValue: 'Min value is',
        maxValue: 'Max value is',
        isNumber: 'Value must be a number',
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
      month: {
        '01': 'january',
        '02': 'february',
        '03': 'march',
        '04': 'april',
        '05': 'may',
        '06': 'june',
        '07': 'july',
        '08': 'august',
        '09': 'september',
        '10': 'october',
        '11': 'november',
        '12': 'december',
      },
      info: {
        details: 'Details',
        back: 'Back',
      },

      lifePay: {
        card: {
          pay: 'Pay',
          title: 'Pay shares',
          amount: 'Amount',
          desc: "To purchase shares, enter the desired quantity and press the 'Pay' button.",
          currentAmount: 'Current share value',
          amountOfSharedCounts: 'Amount of selected shares',
          warmMessage:
            'Upon clicking, you will be redirected to the payment page. Ensure that pop-ups are not blocked for the website.',
        },

        table: {
          value: 'Value',
          date: 'Date',
          count: 'Shares count',
        },

        createInvoiceError:
          'Error creating transaction. Please try again later or contact customer support.',

        totalAmount: 'Total amount',
        portfolioValue: 'Portfolio value',
        totalSharesCount: 'Shares count',
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

      screens: {
        wallet: 'Мой кошелёк',
        cabinet: 'Личный кабинет',
        grpahGrow: 'График роста',
        partners: 'Партнёры',
        documents: 'Документы',
        news: 'Новости',
        faq: 'FAQ',
        payment: 'Оплата',
        article: 'Новость',
      },

      authScreens: {
        finished: 'Регистрация',
        welcome: 'Добро пожаловать',
        signIn: 'Вход',
        signUp: 'Регистрация',
      },

      documents: {
        title: 'Документы',
        instructions: 'Инструкции',
        agreement: 'Пользовательское соглашение',
        legalInfo: 'Юридическая информация о компании',
        legalRegulation: 'Правовое регулирование',
        conditions: 'Условия',
        confidentiality: 'Конфиденциальность',
        trust: 'Укрепление доверия',
        risk: 'Предупреждение о рисках',
      },

      news: 'Новости',
      faq: 'FAQ',
      article: 'Новость',

      user: {
        email: 'Email',
        lastname: 'Фамилия',
        name: 'Имя',
        phone: 'Телефон',
        username: 'Логин',
        password: 'Пароль',
        middlename: 'Отчество',
        emailOrLogin: 'Email или логин',
      },

      cabinetPage: {
        personal: 'Персональные данные',
        passport: 'Паспортные данные',
        passportFacePage: 'Главная страница',
        passportRegistrationPage: 'Страница с регистрацией',
        passportConfirmed:
          'Паспортные данные подтверждены. Если хотите обновить данные - обратитесь в службу поддержки',
        faceWithPassport: 'Фото с паспортом',
        waitCheck:
          'Изображение загружено и ожидает проверки. Если хотите изменить изображение, обратитесь в службу поддержки',
      },

      units: {
        s: 'сек.',
      },

      buttons: {
        save: 'Сохранить',
        submit: 'Отправить',
        continue: 'Продолжить',
        close: 'Закрыть',
      },

      payment: {
        title: 'Оплата',
        deposit: 'Сумма пополнения',
        goToPay: 'Перейти к форме оплаты',
        replenish: 'Пополнение баланса',
        payloaderInfo:
          'Для перевода денежных средств мы используем систему переводов Yoomoney',
        goHome: 'Вернуться домой',
        topUp: 'Пополнение счёта',
        totalBalance: 'Общий баланс',
        currentSharePrice: 'Текущая стоимость доли',
      },

      messages: {
        isRequired: 'обязательное поле',
        invalidEmail: 'неправильный email',
        requestFailed:
          'Произошла ошбка во время запроса. Пожалйста, повторите позже',
        requestSuccess: 'Спасибо. Запрос выполнен успешно',
        referalCopied: 'Реферальный идентификатор скопирован',
        minValue: 'Минимальное значение',
        maxValue: 'Максимальное значение',
        isNumber: 'Значение может быть только числом',
      },

      welcome: {
        title: 'Добро пожаловать в Scandinavian Financial Capital',
        signIn: 'Войти',
        signUp: 'Зарегистрироваться',
        registered: 'Уже есть аккаунт?',
        emailContinue: 'Продолжить с email',
      },
      signUp: {
        title: 'Регистрация',
        setNameMessage: 'Укажите ФИО именно так, как написано в паспорте',
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
      month: {
        '01': 'января',
        '02': 'февраля',
        '03': 'марта',
        '04': 'апреля',
        '05': 'мая',
        '06': 'июня',
        '07': 'июля',
        '08': 'августа',
        '09': 'сентября',
        '10': 'октября',
        '11': 'ноября',
        '12': 'декабря',
      },
      info: {
        details: 'Подробнее',
        back: 'Назад',
      },

      lifePay: {
        card: {
          pay: 'Купить',
          desc: 'Чтобы приобрести доли, введие желаемое количество и нажмите кнопку "купить"',
          title: 'Приобретение долей',
          amount: 'Количество',
          currentAmount: 'Текущая стоимость доли',
          amountOfSharedCounts: 'Выборано долей на сумму',
          warmMessage:
            'По клику вы будете переадресованы на страницу с оплатой. Убедитесь что у вас не блокируются вслывающие окна для сайта',
        },

        table: {
          value: 'Сумма',
          date: 'Дата',
          count: 'Количество долей',
        },

        createInvoiceError:
          'Ошибка создания транзакции. Пожалуйста, попробуйте позже или обратитесь в службу поддержки',

        totalAmount: 'Сумма всех пополнений',
        portfolioValue: 'Стоимость портфеля',
        totalSharesCount: 'Приобретено долей',
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
