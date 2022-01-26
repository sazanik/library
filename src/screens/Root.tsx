import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { WithAuthRequirement } from '../components/HOC/WithAuthRequirement';
import { LayoutMain } from '../components/Layout/Main/LayoutMain';
import { Auth } from './Auth';
import { AuthorCard } from './AuthorCard';
import { AuthorsList } from './AuthorsList';
import { BookCard } from './BookCard';
import { BooksList } from './BooksList';
import { NotFound } from './NotFound';

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
