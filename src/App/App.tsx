import React from 'react';
import './App.scss';
import { Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthorsPage from '../pages/AuthorsPage';
import BooksTable from '../pages/BooksPage';

export default function App(): JSX.Element {
  const { t } = useTranslation('translations');
  return (
    <div className='App'>
      <Link to='/'>{t('authors')}</Link>
      <Link to='/books'>{t('books')}</Link>
      <h1>{t('greeting')}</h1>
      <Routes>
        <Route path='/' element={<AuthorsPage />} />
        <Route path='/books' element={<BooksTable />} />
      </Routes>
    </div>
  );
}
