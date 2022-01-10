import React, { useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { styles } from './LanguageSelect.styles';
import { useTranslation } from 'react-i18next';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export const LanguageSelect = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState('');

  const handleChange = (event: SelectChangeEvent): void => {
    const newLanguages = event.target.value as string;
    setLanguage(newLanguages);
    i18n.changeLanguage(newLanguages).then();
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
          <MenuItem value='en'>English</MenuItem>
          <MenuItem value='ru'>Русский</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
