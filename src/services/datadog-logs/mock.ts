const DATADOG_LOGS_LOGGER_MOCK = {
  debug: () => {},
  info: () => {},
  warn: () => {},
  error: () => {},
  log: () => {},
  setLevel: () => {},
  setHandler: () => {},
};

const DATADOG_LOGS_MOCK = {
  addLoggerGlobalContext: () => {},
  createLogger: () => {},
  getLogger: () => DATADOG_LOGS_LOGGER_MOCK,
  getLoggerGlobalContext: () => ({}),
  init: () => {},
  logger: DATADOG_LOGS_LOGGER_MOCK,
  setLoggerGlobalContext: () => {},
};

export default DATADOG_LOGS_MOCK;
