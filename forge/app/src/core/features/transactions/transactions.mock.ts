export const afterPending = {
  id: '2cf46bec-000f-5000-a000-13f6d4cf701f',
  status: 'waiting_for_capture',
  amount: { value: '200.00', currency: 'RUB' },
  recipient: { account_id: '284512', gateway_id: '2155007' },
  payment_method: {
    type: 'bank_card',
    id: '2cf46bec-000f-5000-a000-13f6d4cf701f',
    saved: false,
    title: 'Bank card *0004',
    card: {
      first6: '220000',
      last4: '0004',
      expiry_year: '2024',
      expiry_month: '10',
      card_type: 'Mir',
    },
  },
  created_at: '2023-11-25T20:25:16.318Z',
  expires_at: '2023-12-02T20:34:01.452Z',
  test: true,
  paid: true,
  refundable: false,
  metadata: {},
  authorization_details: {
    rrn: '443712191006130',
    auth_code: '528034',
    three_d_secure: {
      applied: true,
      protocol: 'v1',
      method_completed: false,
      challenge_completed: true,
    },
  },
};

export const pending = {
  id: '2cf46bec-000f-5000-a000-13f6d4cf701f',
  status: 'pending',
  amount: { value: '200.00', currency: 'RUB' },
  recipient: { account_id: '284512', gateway_id: '2155007' },
  payment_method: {
    type: 'bank_card',
    id: '2cf46bec-000f-5000-a000-13f6d4cf701f',
    saved: false,
  },
  created_at: '2023-11-25T20:25:16.318Z',
  confirmation: {
    type: 'redirect',
    return_url: 'https://www.google.com/search?q=hello+world',
    confirmation_url:
      'https://yoomoney.ru/checkout/payments/v2/contract?orderId=2cf46bec-000f-5000-a000-13f6d4cf701f',
  },
  test: true,
  paid: false,
  refundable: false,
  metadata: {},
};

export const cunceledPayment = {
  id: '2cf46bec-000f-5000-a000-13f6d4cf701f',
  status: 'canceled',
  amount: {
    value: '200.00',
    currency: 'RUB',
  },
  recipient: {
    account_id: '284512',
    gateway_id: '2155007',
  },
  payment_method: {
    type: 'bank_card',
    id: '2cf46bec-000f-5000-a000-13f6d4cf701f',
    saved: false,
    title: 'Bank card *0004',
    card: {
      first6: '220000',
      last4: '0004',
      expiry_year: '2024',
      expiry_month: '10',
      card_type: 'Mir',
    },
  },
  created_at: '2023-11-25T20:25:16.318Z',
  test: true,
  paid: false,
  refundable: false,
  metadata: {},
  cancellation_details: {
    party: 'merchant',
    reason: 'canceled_by_merchant',
  },
  authorization_details: {
    rrn: '443712191006130',
    auth_code: '528034',
    three_d_secure: {
      applied: true,
      protocol: 'v1',
      method_completed: false,
      challenge_completed: true,
    },
  },
};
