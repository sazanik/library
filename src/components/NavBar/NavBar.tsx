import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Languages } from '../dropdowns/Languages/Languages';
import { Button, Typography } from '@mui/material';
import styles from './styles';
import { useAuth } from '../../hooks';

export const NavBar = (): JSX.Element => {
  const { t } = useTranslation('default');
  const navigate = useNavigate();
  const { logOut } = useAuth();

  const handleClick = (): void => {
    logOut(() => navigate('/'));
  };
  return (
    <Box sx={styles.box}>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <Typography variant='h6' noWrap component='div' sx={styles.text}>
            {t('library')}
          </Typography>
          <Languages />
          <nav style={styles.nav}>
            <NavLink to='/authors'>{t('authors')}</NavLink>
            <NavLink to='/books'>{t('books')}</NavLink>
          </nav>
          <Button
            onClick={handleClick}
            style={styles.button}
            variant='contained'
          >
            {t('buttons.logOut')}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
