import { Box, styled } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { styles } from './Navigation.styles';

const CustomLink = styled(NavLink)(styles.link);

export const Navigation = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Box sx={styles.box}>
      <CustomLink
        style={({ isActive }) => ({ color: isActive ? 'white' : 'lightgrey' })}
        to='/authors'
      >
        {t('glossary:authors')}
      </CustomLink>
      <CustomLink
        style={({ isActive }) => ({ color: isActive ? 'white' : 'lightgrey' })}
        to='/books'
      >
        {t('glossary:books')}
      </CustomLink>
    </Box>
  );
};
