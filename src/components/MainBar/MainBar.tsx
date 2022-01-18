import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSelect } from '../Language/Select/LanguageSelect';
import { Box, Button, Typography } from '@mui/material';
import { styles } from './MainBar.styles';
import { useAuth } from '../../hooks';
import { Navigation } from '../Navigation/Navigation';

export const MainBar = (): JSX.Element => {
  const { t } = useTranslation();
  const location = useLocation();
  const { logOut } = useAuth();

  const handleClick = (): void => {
    logOut();
  };
  return (
    <Box sx={styles.box}>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <Typography variant='h6' noWrap component='div' sx={styles.text}>
            {t('glossary:library')}
          </Typography>
          <LanguageSelect />
          <Navigation />
          {location.pathname !== '/' && (
            <Button
              sx={styles.button}
              variant='contained'
              onClick={handleClick}
            >
              {t('buttons:logOut')}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
