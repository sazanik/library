import React from 'react';
import { NavLink } from 'react-router-dom';
import { styles } from './Navigation.styles';
import { useTranslation } from 'react-i18next';

export const Navigation = (): JSX.Element => {
  const { t } = useTranslation('default');

  return (
    <nav style={styles.nav}>
      <NavLink to='/authors'>{t('authors')}</NavLink>
      <NavLink to='/books'>{t('books')}</NavLink>
    </nav>
  );
};
