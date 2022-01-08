import React from 'react';
import { NavLink } from 'react-router-dom';
import { styles } from './Navigation.styles';
import { useTranslation } from 'react-i18next';
import { Box, styled } from '@mui/material';

const CustomLink = styled(NavLink)(styles.link);

export const Navigation = (): JSX.Element => {
  const { t } = useTranslation('default');

  return (
    <Box sx={styles.box}>
      <CustomLink
        style={({ isActive }) => ({ color: isActive ? 'white' : 'lightgrey' })}
        to='/authors'
      >
        {t('authors')}
      </CustomLink>
      <CustomLink
        style={({ isActive }) => ({ color: isActive ? 'white' : 'lightgrey' })}
        to='/books'
      >
        {t('books')}
      </CustomLink>
    </Box>
  );
};
