import React, { ReactElement } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Languages from '../dropdowns/Languages/Languages';
import { Typography } from '@mui/material';
import styles from './NavBar.styles';

export default function NavBar(): ReactElement {
  const { t } = useTranslation('default');
  return (
    <Box sx={styles.box}>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <Typography variant='h6' noWrap component='div' sx={styles.text}>
            {t('library')}
          </Typography>
          <Languages />
          <nav>
            <NavLink to='/'>{t('authors')}</NavLink>
            <NavLink to='/books'>{t('books')}</NavLink>
            <NavLink to='/books/id'>{t('id')}</NavLink>
          </nav>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
