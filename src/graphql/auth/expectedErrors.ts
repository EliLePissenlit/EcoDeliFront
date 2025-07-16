import i18n from 'src/locales/i18n';

const expectedErrors = {
  ACCOUNT_SUSPENDED: {
    code: 'ACCOUNT_SUSPENDED',
    message: i18n.t('expectedErrors.auth.account_suspended'),
  },
  INVALID_CREDENTIALS: {
    code: 'INVALID_CREDENTIALS',
    message: i18n.t('expectedErrors.auth.invalid_credentials'),
  },
  USER_ALREADY_EXISTS: {
    code: 'USER_ALREADY_EXISTS',
    message: i18n.t('expectedErrors.auth.user_already_exists'),
  },
  EMAIL_NOT_VERIFIED: {
    code: 'EMAIL_NOT_VERIFIED',
    message: i18n.t('expectedErrors.auth.email_not_verified'),
  },
};

export default expectedErrors;
