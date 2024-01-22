/*
 *   Copyright (c) 2024
 *   All rights reserved.
 *   The copyright notice above does not evidence any actual or
 *   intended publication of such source code. The code contains
 *   OLYMP.DIGITAL Confidential Proprietary Information.
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import env from 'core/services/env';

export type SystemLanguage = 'ru' | 'en';

const resources = {
  en: {
    translation: {
      referalLink: 'Copy referal ID',
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
        lastname: 'Last name',
        name: 'First name',
        phone: 'Phone',
        username: 'Login',
        password: 'Password',
        middlename: 'Middle name',
        emailOrLogin: 'Email or login',
        passportNumber: 'Passport series and number',
        registeredAddress: 'Registered address',
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
        phoneNumberValidation: 'Acceptable format is: +441234567890',
        invalidEmail: 'invalid email',
        requestFailed: 'Request is failed. Please, try later',
        requestSuccess: 'Thank you. Request completed successfully',
        fileTypeIsInvalid: 'Please chose an image to upload',
        referalCopied: 'Referal ID is copied',
        minValue: 'Min value is',
        maxValue: 'Maximum number of shares available for acquisition',
        isNumber: 'Value must be a number',
        isPositive: 'The value must be a positive number',
        isInteger: 'The value must be an integer',
        minString: 'Minimum length',
        maxString: 'Maximum length',
      },

      welcome: {
        title: 'Welcome To The Scandinavian Financial Capital',
        signIn: 'Sign in',
        signUp: 'Sign up',
        registered: 'Already have an account?',
        emailContinue: 'Continue with email',
        support: 'Contact technical support',
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
        noReferal: 'I do not have a referral number',
        askReferal: 'Ask the person who invited you for your referral number',
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
        stagesIsFinished: 'Stages is finished',
        stagesLoading: 'Stages loading...',
        stagesLimit:
          'At this stage of the project, the volume of individual investments is limited.',
        stagesDates: 'Stage period',
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
          cryptoPay: 'Crypto Pay',
          pointsPay: 'Buy with points',
          title: 'Pay shares',
          amount: 'Amount',
          desc: "To purchase shares, enter the desired quantity and press the 'Pay' button.",
          currentAmount: 'Current share value',
          amountOfSharedCounts: 'Amount of selected shares',
          transactionLimit: 'Remaining limit for stock purchase',
          toCabinet: 'To cabinet',

          needConfirm:
            'Once your information is confirmed, you\'ll be able to purchase shares in the company. To submit personal information for verification, click the link or use the "Personal Cabinet" section in the menu.',

          warmMessage:
            'Upon clicking, you will be redirected to the payment page. Ensure that pop-ups are not blocked for the website.',

          transactionTypeError:
            'An unexpected error occurred. Please try again later or contact customer support',
        },

        table: {
          value: 'Value',
          date: 'Date',
          count: 'Shares count',
          status: 'Status',
        },

        transactionStatus: {
          pending: 'Pending',
          success: 'Successfully paid',
        },

        createInvoiceError:
          'Error creating transaction. Please try again later or contact customer support.',

        totalAmount: 'Total amount',
        portfolioValue: 'Portfolio value',
        totalSharesCount: 'Shares count',
      },

      finance: {
        referralEarnings: {
          user: 'User',
          date: 'Date',
          value: 'Value',
          getError:
            'Referral credits could not be retrieved. Please try again later',
        },
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
        passportNumber: 'Серия и номер паспорта',
        registeredAddress: 'Адрес регистрации',
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
        phoneNumberValidation: 'Допустимый формат: +441234567890',
        invalidEmail: 'неправильный email',
        requestFailed:
          'Произошла ошбка во время запроса. Пожалйста, повторите позже',
        requestSuccess: 'Спасибо. Запрос выполнен успешно',
        fileTypeIsInvalid: 'Пожалуйста выберите картинку для загрузки',
        referalCopied: 'Реферальный идентификатор скопирован',
        minValue: 'Минимальное значение',
        maxValue: 'Максимальное количество долей доступных для приобретения',
        isNumber: 'Значение может быть только числом',
        isInteger: 'Значение должно быть целым числом',
        isPositive: 'Значение должно быть позитивным числом',
        minString: 'Минимальное количество символов',
        maxString: 'Максимальное количество символов',
      },

      welcome: {
        title: 'Добро пожаловать в Scandinavian Financial Capital',
        signIn: 'Войти',
        signUp: 'Зарегистрироваться',
        registered: 'Уже есть аккаунт?',
        emailContinue: 'Продолжить с email',
        support: 'Написать в техподдержку',
      },
      signUp: {
        title: 'Регистрация',
        noReferal: 'У меня нет реферального номера',
        askReferal:
          'Спросите реферальный номер у человека, который вас пригласил',
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
        stagesIsFinished: 'Все этапы закончены',
        stagesLoading: 'Загрузка этапов...',
        stagesLimit:
          'На данном этапе проекта объём индивидуальных инвестиций ограничен',
        stagesDates: 'Период этапа',
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
          cryptoPay: 'Оплатить криптой',
          pointsPay: 'Оплатить баллами',
          desc: 'Чтобы приобрести доли, введие желаемое количество и нажмите кнопку "купить"',
          title: 'Приобретение долей',
          amount: 'Количество',
          toCabinet: 'Перейти в личный кабинет',
          currentAmount: 'Текущая стоимость доли',
          amountOfSharedCounts: 'Выбрано долей на сумму',
          transactionLimit: 'Оставшийся лимит на покупку долей',

          needConfirm:
            'Как только ваши персональные данные будут подтверждены, вы сможете покупать доли в компании. Для отправки личных данных на проверку, перейдите по ссылке или воспользуйтесь разделом "Личный Кабинет" в меню',

          warmMessage:
            'По клику вы будете переадресованы на страницу с оплатой. Убедитесь что у вас не блокируются вслывающие окна для сайта',

          transactionTypeError:
            'Произошла непредвиденная ошибка. Пожалуйста, попробуйте позже или обратитесь в службу поддержки',
        },

        table: {
          value: 'Сумма',
          date: 'Дата',
          count: 'Количество долей',
          status: 'Статус',
        },

        transactionStatus: {
          pending: 'Ожидает оплаты',
          success: 'Оплачено',
        },

        createInvoiceError:
          'Ошибка создания транзакции. Пожалуйста, попробуйте позже или обратитесь в службу поддержки',

        totalAmount: 'Сумма всех пополнений',
        portfolioValue: 'Стоимость портфеля',
        totalSharesCount: 'Приобретено долей',
      },

      finance: {
        referralEarnings: {
          date: 'Дата',
          user: 'Пользователь',
          value: 'Сумма',
          getError:
            'Неу далось получить реферальные начисления. Пожалуйста, попробуйте позже',
        },
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
