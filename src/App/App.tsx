import React from 'react';
import './App.scss';
import { Routes, Route, Link } from 'react-router-dom';
import AuthorsPage from '../pages/AuthorsPage';
import BooksTable from '../pages/BooksPage';

export default function App(): JSX.Element {
  return (
    <div className='App'>
      <Link to='/'>Authors</Link>
      <Link to='/books'>Books</Link>
      <h1>Welcome to Library App</h1>
      <Routes>
        <Route path='/' element={<AuthorsPage />} />
        <Route path='/books' element={<BooksTable />} />
      </Routes>
    </div>
  );
}
