import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import enLocale from 'date-fns/locale/en-US';
import ruLocale from 'date-fns/locale/ru';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  label: string;
  value: string;
  onChange: (date: Date | null) => void;
}

interface LocaleMapProps {
  [key: string]: Locale;
}

interface MaskMapProps {
  [key: string]: string;
}

const localeMap: LocaleMapProps = {
  en: enLocale,
  ru: ruLocale,
};

const maskMap: MaskMapProps = {
  en: '__/__/____',
  ru: '__.__.____',
};

export const DateSelect = ({ label, value, onChange }: Props): JSX.Element => {
  const { i18n } = useTranslation();

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      locale={localeMap[i18n.language]}
    >
      <DatePicker
        mask={maskMap[i18n.language]}
        label={label}
        value={value}
        onChange={onChange}
        renderInput={(params) => {
          return <TextField {...params} value={value} />;
        }}
      />
    </LocalizationProvider>
  );
};
