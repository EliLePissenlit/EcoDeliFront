import i18n from 'src/locales/i18n';

const expectedErrors = {
  FAILED_TO_CANCEL_SUBSCRIPTION: {
    code: 'FAILED_TO_CANCEL_SUBSCRIPTION',
    message: i18n.t('expectedErrors.subscribe.failed_to_cancel_subscription'),
  },
  FAILED_TO_CREATE_SUBSCRIPTION: {
    code: 'FAILED_TO_CREATE_SUBSCRIPTION',
    message: i18n.t('expectedErrors.subscribe.failed_to_create_subscription'),
  },
  USER_ALREADY_HAS_SAME_SUBSCRIPTION: {
    code: 'USER_ALREADY_HAS_SAME_SUBSCRIPTION',
    message: i18n.t('expectedErrors.subscribe.user_already_has_same_subscription'),
  },
  INVALID_COUPON_CODE: {
    code: 'INVALID_COUPON_CODE',
    message: i18n.t('expectedErrors.payment.invalid_coupon'),
  },
  FAILED_TO_CREATE_PAYMENT_INTENT: {
    code: 'FAILED_TO_CREATE_PAYMENT_INTENT',
    message: i18n.t('expectedErrors.payment.failed_to_create_payment_intent'),
  },
};

export default expectedErrors;
