import { paths } from 'src/routes/paths';

// API
// ----------------------------------------------------------------------

export const HOST_API = import.meta.env.VITE_HOST_API;
export const HOST_API_WS = import.meta.env.VITE_HOST_API_WS;
export const ASSETS_API = import.meta.env.VITE_ASSETS_API;

// DATA DOG
// ----------------------------------------------------------------------

export const LOGGER_DATA_DOG_TOKEN = import.meta.env.VITE_LOGGER_DATA_DOG_TOKEN;
export const LOGGER_ENV = import.meta.env.VITE_LOGGER_ENV;
export const LOGGER_SERVICE = import.meta.env.VITE_LOGGER_SERVICE;
export const LOGGER_SITE = import.meta.env.VITE_LOGGER_SITE;
export const LOGGER_TRANSPORT_TO_CONSOLE = import.meta.env.VITE_LOGGER_TRANSPORT_TO_CONSOLE;

export const PATH_AFTER_LOGIN = paths.dashboard;
export const MAPBOX_API = import.meta.env.VITE_MAPBOX_API;
export const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

export const AXEPTIO_CLIENT_ID = import.meta.env.VITE_AXEPTIO_CLIENT_ID;
export const AXEPTIO_COOKIES_VERSION = import.meta.env.VITE_AXEPTIO_COOKIES_VERSION;

export const VIDEOASK_URL = import.meta.env.VITE_VIDEOASK_URL;
