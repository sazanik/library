import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '../../../hooks';
import { setPaginationLocale } from '../../../store/app/appSlice';
import { Locales } from '../../../types/enums';
import { styles } from './LanguageSelect.styles';

export const LanguageSelect = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState('');

  const handleChange = (event: SelectChangeEvent): void => {
    const newLanguages = event.target.value as Locales;
    setLanguage(newLanguages);

    i18n.changeLanguage(newLanguages).then(() => {
      console.log('INPUT LOCALE');
      dispatch(setPaginationLocale(newLanguages));
    });
  };

  return (
    <Box sx={styles.box}>
      <FormControl fullWidth variant='filled'>
        <InputLabel sx={styles.inputLabel} id='language-label'>
          {t('placeholders:changeLanguage')}
        </InputLabel>
        <Select
          sx={styles.select}
          value={language}
          label='language'
          id='language'
          labelId='language-label'
          onChange={handleChange}
        >
          <MenuItem value={Locales.EN}>English</MenuItem>
          <MenuItem value={Locales.RU}>Русский</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
