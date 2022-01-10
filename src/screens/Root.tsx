import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { WithAuthRequirement } from '../components/HOC/WithAuthRequirement';
import { LayoutMain } from '../components/Layout/Main/LayoutMain';
import { ScreensAuth } from './Auth/ScreensAuth';
import { ScreensAuthorsList } from './AuthorsList/ScreensAuthorsList';
import { ScreensAuthorCard } from './AuthorCard/ScreensAuthorCard';
import { ScreensBooksList } from './BooksList/ScreensBooksList';
import { ScreensBookCard } from './BookCard/ScreensBookCard';
import { ScreensNotFound } from './NotFound/ScreensNotFound';

export const Root = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<LayoutMain />}>
        <Route index element={<ScreensAuth />} />
        <Route
          path='authors'
          element={
            <WithAuthRequirement>
              <ScreensAuthorsList />
            </WithAuthRequirement>
          }
        />
        <Route
          path='authors/:id'
          element={
            <WithAuthRequirement>
              <ScreensAuthorCard />
            </WithAuthRequirement>
          }
        />
        <Route
          path='books'
          element={
            <WithAuthRequirement>
              <ScreensBooksList />
            </WithAuthRequirement>
          }
        />
        <Route
          path='books/:id'
          element={
            <WithAuthRequirement>
              <ScreensBookCard />
            </WithAuthRequirement>
          }
        />
        <Route path='*' element={<ScreensNotFound />} />
      </Route>
    </Routes>
  );
};
