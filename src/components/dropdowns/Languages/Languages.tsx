import React, { ReactElement, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styles from './styles';
import { useTranslation } from 'react-i18next';

export default function Languages(): ReactElement {
  const { t, i18n } = useTranslation('default');
  const [language, setLanguage] = useState('');

  const handleChange = (event: SelectChangeEvent): void => {
    const newLanguages = event.target.value as string;
    setLanguage(newLanguages);
    i18n.changeLanguage(newLanguages).then();
  };

  return (
    <Box style={styles.box}>
      <FormControl variant='filled' sx={styles.formControl}>
        <InputLabel style={styles.inputLabel} id='demo-simple-select-label'>
          {t('changeLanguage')}
        </InputLabel>
        <Select
          style={styles.select}
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
