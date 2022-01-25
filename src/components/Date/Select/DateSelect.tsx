import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import enLocale from 'date-fns/locale/en-US';
import ruLocale from 'date-fns/locale/ru';
import * as React from 'react';
import { UseFormRegister, UseFormWatch } from 'react-hook-form/dist/types/form';
import { useTranslation } from 'react-i18next';

import { AuthorFormProps } from '../../../types/inerfaces';

interface Props {
  register: UseFormRegister<AuthorFormProps>;
  watch: UseFormWatch<AuthorFormProps>;
  label: string;
  value?: string;
}

interface LocaleMapProps {
  [key: string]: Locale;
}

const localeMap: LocaleMapProps = {
  en: enLocale,
  ru: ruLocale,
};

export const DateSelect = ({
  register,
  watch,
  label,
  value,
}: Props): JSX.Element => {
  const { i18n } = useTranslation();
  const [currentValue, setCurrentValue] = React.useState<
    string | null | undefined
  >(value);

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      locale={localeMap[i18n.language]}
    >
      <DatePicker
        mask='__/__/____'
        label={label}
        value={currentValue}
        onChange={(newValue) => setCurrentValue(newValue)}
        renderInput={(params) => {
          return <TextField {...params} {...register('birthDate')} />;
        }}
      />
    </LocalizationProvider>
  );
};
