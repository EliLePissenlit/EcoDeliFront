import merge from 'lodash/merge';
// date fns
import { fr as frFRAdapter, enUS as enUSAdapter } from 'date-fns/locale';

// core (MUI)
import { enUS as enUSCore, frFR as frFRCore } from '@mui/material/locale';
// data grid (MUI)
import { enUS as enUSDataGrid, frFR as frFRDataGrid } from '@mui/x-data-grid';
// date pickers (MUI)
import { enUS as enUSDate, frFR as frFRDate } from '@mui/x-date-pickers/locales';

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    systemValue: merge(enUSDate, enUSDataGrid, enUSCore),
    adapterLocale: enUSAdapter,
    icon: 'flagpack:gb-nir',
    numberFormat: {
      code: 'en-US',
      currency: 'USD',
    },
  },
  {
    label: 'French',
    value: 'fr',
    systemValue: merge(frFRDate, frFRDataGrid, frFRCore),
    adapterLocale: frFRAdapter,
    icon: 'flagpack:fr',
    numberFormat: {
      code: 'fr-Fr',
      currency: 'EUR',
    },
  },
];

export const defaultLang = allLangs[1];

// GET MORE COUNTRY FLAGS
// https://icon-sets.iconify.design/flagpack/
// https://www.dropbox.com/sh/nec1vwswr9lqbh9/AAB9ufC8iccxvtWi3rzZvndLa?dl=0
