import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styles from '../../styles/dropDowns';
import { useTranslation } from 'react-i18next';

export default function Languages(): JSX.Element {
  const { t, i18n } = useTranslation('translation');
  const [language, setLanguage] = useState('');

  const handleChange = (event: SelectChangeEvent): void => {
    const newLanguages = event.target.value as string;
    setLanguage(newLanguages);
    i18n.changeLanguage(newLanguages).then();
  };

  return (
    <Box style={styles.languages.box}>
      <FormControl variant='filled' sx={styles.languages.formControl}>
        <InputLabel
          style={styles.languages.inputLabel}
          id='demo-simple-select-label'
        >
          {t('changeLanguage')}
        </InputLabel>
        <Select
          style={styles.languages.select}
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={language}
          label='Age'
          onChange={handleChange}
        >
          <MenuItem value='en'>English</MenuItem>
          <MenuItem value='ru'>Русский</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
