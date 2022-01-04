import React from 'react';
import { NavLink } from 'react-router-dom';
import { styles } from './Navigation.styles';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';

type styleProps = typeof styles.link & { color: 'white' | 'lightgrey' };

export const Navigation = (): JSX.Element => {
  const { t } = useTranslation('default');

  const getStyles = ({ isActive }: { isActive: boolean }): styleProps => {
    const activeColor = isActive ? 'white' : 'lightgrey';
    return {
      ...styles.link,
      color: activeColor,
    };
  };

  return (
    <Box sx={styles.box}>
      <NavLink style={getStyles} to='/authors'>
        {t('authors')}
      </NavLink>
      <NavLink style={getStyles} to='/books'>
        {t('books')}
      </NavLink>
    </Box>
  );
};
