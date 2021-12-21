import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Languages } from '../dropdowns/Languages/Languages';
import { Button, Typography } from '@mui/material';
import { mainBarStyles } from './MainBar.styles';
import { useAuth } from '../../hooks';
import { Navigation } from '../Navigation/Navigation';

export const MainBar = (): JSX.Element => {
  const { t } = useTranslation('default');
  const navigate = useNavigate();
  const { logOut } = useAuth();

  const handleClick = (): void => {
    logOut(() => navigate('/'));
  };
  return (
    <Box sx={mainBarStyles.box}>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={mainBarStyles.text}
          >
            {t('library')}
          </Typography>
          <Languages />
          <Navigation />
          <Button
            onClick={handleClick}
            sx={mainBarStyles.button}
            variant='contained'
          >
            {t('buttons.logOut')}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
