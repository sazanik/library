import React from 'react';
import { NavLink } from 'react-router-dom';
import { t } from 'i18next';
import { styles } from './Navigation.styles';

export const Navigation = (): JSX.Element => (
  <nav style={styles.nav}>
    <NavLink to='/authors'>{t('authors')}</NavLink>
    <NavLink to='/books'>{t('books')}</NavLink>
  </nav>
);
