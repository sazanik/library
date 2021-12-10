import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Languages from '../dropdowns/Languages';
import { Typography } from '@mui/material';
import styles from '../../styles/navBar';

export default function NavBar(): JSX.Element {
  const { t } = useTranslation('translation');
  return (
    <Box sx={styles.box}>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{
              minWidth: 100,
              mr: 2,
              display: {
                xs: 'none',
                md: 'flex',
              },
            }}
          >
            LIBRARY
          </Typography>
          <Languages />
          <nav>
            <NavLink to='/'>{t('authors')}</NavLink>
            <NavLink to='/books'>{t('books')}</NavLink>
          </nav>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
