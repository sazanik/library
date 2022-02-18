import { Box, Button, Link } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks';
import { LanguageSelect } from '../Language/Select/LanguageSelect';
import { Navigation } from '../Navigation/Navigation';
import { styles } from './MainBar.styles';

export const MainBar = (): JSX.Element => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { handlerSignOut } = useAuth();

  return (
    <Box>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <Link sx={styles.logo} onClick={() => navigate('/authors')} underline='none'>
            {t('glossary:library')}
          </Link>

          <LanguageSelect />
          <Navigation />
          {location.pathname !== '/' && (
            <Button sx={styles.button} variant='contained' onClick={handlerSignOut}>
              {t('buttons:logOut')}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
