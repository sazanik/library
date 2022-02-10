import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { WithAuthRequirement } from '../components/HOC/WithAuthRequirement';
import { LayoutMain } from '../components/Layout/Main/LayoutMain';
import { Auth } from './Auth/Auth';
import { AuthorCard } from './AuthorCard/AuthorCard';
import { AuthorsList } from './AuthorsList/AuthorsList';
import { BookCard } from './BookCard/BookCard';
import { BooksList } from './BooksList/BookList';
import { NotFound } from './NotFound/NotFound';

export const Root = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<LayoutMain />}>
        <Route index element={<Auth />} />
        <Route
          path='authors'
          element={
            <WithAuthRequirement>
              <AuthorsList />
            </WithAuthRequirement>
          }
        />
        <Route
          path='authors/:id'
          element={
            <WithAuthRequirement>
              <AuthorCard />
            </WithAuthRequirement>
          }
        />
        <Route
          path='books'
          element={
            <WithAuthRequirement>
              <BooksList />
            </WithAuthRequirement>
          }
        />
        <Route
          path='books/:id'
          element={
            <WithAuthRequirement>
              <BookCard />
            </WithAuthRequirement>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
};
