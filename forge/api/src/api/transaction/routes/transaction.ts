export default {
  routes: [
    {
      method: 'GET',
      path: '/transaction/user',
      handler: 'transaction.user',
    },

    {
      method: 'GET',
      path: '/transaction/:id',
      handler: 'transaction.get',
    },

    {
      method: 'POST',
      path: '/transaction/make',
      handler: 'transaction.make',
      config: {
        policies: [],
        middlewares: [],
      },
    },

    {
      method: 'POST',
      path: '/transaction/check',
      handler: 'transaction.check',
    },

    // {
    //  method: 'GET',
    //  path: '/transaction',
    //  handler: 'transaction.exampleAction',
    //  config: {
    //    policies: [],
    //    middlewares: [],
    //  },
    // },
  ],
};
