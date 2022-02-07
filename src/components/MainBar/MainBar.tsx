import { Box, Button, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { useAuth } from '../../hooks';
import { LanguageSelect } from '../Language/Select/LanguageSelect';
import { Navigation } from '../Navigation/Navigation';
import { styles } from './MainBar.styles';

export const MainBar = (): JSX.Element => {
  const { t } = useTranslation();
  const location = useLocation();
  const { logOut } = useAuth();

  const handleClick = (): void => {
    logOut();
  };
  return (
    <Box>
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
