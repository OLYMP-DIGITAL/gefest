module.exports = ({ env }) => ({
  email: {
    enabled: false,

    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'mail.olymp.digital'),
        port: env('SMTP_PORT', 587),
        // secure: false,
        debug: true,
        logger: true,
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
        // ... any custom nodemailer options
      },
      settings: {
        defaultFrom: env('MAIL_FROM'),
        defaultReplyTo: env('MAIL_TO'),
      },
    },
  },

  'users-permissions': {
    config: {
      register: {
        allowedFields: ['referal'],
      },
    },
  },
});
