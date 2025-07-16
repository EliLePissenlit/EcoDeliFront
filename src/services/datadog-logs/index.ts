import { StatusType, datadogLogs, LogsInitConfiguration } from '@datadog/browser-logs';

import { getCookie, decodeCookie } from 'src/utils/cookies';

import { LOGGER_ENV, LOGGER_SITE, LOGGER_SERVICE, LOGGER_DATA_DOG_TOKEN } from 'src/config-global';

import DATADOG_LOGS_MOCK from './mock';

const clientToken: string = LOGGER_DATA_DOG_TOKEN;
const ddLogs = clientToken ? datadogLogs : DATADOG_LOGS_MOCK;
const { transportToConsole } = LOGGER_SERVICE;

let loggerIsKilled: boolean = false;

interface MessageContext {
  [key: string]: any;
}

type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'log' | StatusType;

const initLogger = (): void => {
  const config: LogsInitConfiguration = {
    clientToken: LOGGER_DATA_DOG_TOKEN,
    forwardErrorsToLogs: true,
    env: LOGGER_ENV,
    service: LOGGER_SERVICE,
    site: LOGGER_SITE,
  };

  ddLogs.init(config);
};

const getHttpCookie = (): string | null => {
  const cookie = getCookie('uid');
  if (!cookie) return null;
  const decodedCookie = decodeCookie(cookie);
  if (!decodedCookie) return null;
  return `uid=${decodedCookie}`;
};

const logToConsole = (status: LogLevel, message: string, messageContext?: MessageContext): void => {
  if (transportToConsole) console[status]('[logger]', message, messageContext);
};

const logger = {
  debug: (message: string, messageContext?: MessageContext): void => {
    if (loggerIsKilled) return;
    ddLogs.logger.debug(message, {
      ...messageContext,
      httpCookie: getHttpCookie(),
    });
    logToConsole('debug', message, messageContext);
  },
  info: (message: string, messageContext?: MessageContext): void => {
    if (loggerIsKilled) return;
    ddLogs.logger.info(message, {
      ...messageContext,
      httpCookie: getHttpCookie(),
    });
    logToConsole('info', message, messageContext);
  },
  warn: (message: string, messageContext?: MessageContext): void => {
    if (loggerIsKilled) return;
    ddLogs.logger.warn(message, {
      ...messageContext,
      httpCookie: getHttpCookie(),
    });
    logToConsole('warn', message, messageContext);
  },
  error: (message: string, messageContext?: MessageContext): void => {
    if (loggerIsKilled) return;
    ddLogs.logger.error(message, {
      ...messageContext,
      httpCookie: getHttpCookie(),
    });
    logToConsole('error', message, messageContext);
  },
  log: (message: string, messageContext: MessageContext, status: LogLevel): void => {
    if (loggerIsKilled) return;
    ddLogs.logger.log(
      message,
      { ...messageContext, httpCookie: getHttpCookie() },
      status as StatusType
    );
    logToConsole(status, message, messageContext);
  },
};

const killLogger = (): void => {
  loggerIsKilled = true;
};

export { logger, initLogger, killLogger };
