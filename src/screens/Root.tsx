import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { WithAuthRequirement } from '../components/HOC/WithAuthRequirement';
import { LayoutMain } from '../components/Layout/Main/LayoutMain';
import { ScreensAuth } from './Auth/ScreensAuth';
import { ScreensAuthorsList } from './Authors/List/ScreensAuthorsList';
import { ScreensAuthorsCard } from './Authors/Card/ScreensAuthorsCard';
import { ScreensBooksList } from './Books/List/ScreensBooksList';
import { ScreensBooksCard } from './Books/Card/ScreensBooksCard';
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
              <ScreensAuthorsCard />
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
              <ScreensBooksCard />
            </WithAuthRequirement>
          }
        />
        <Route path='*' element={<ScreensNotFound />} />
      </Route>
    </Routes>
  );
};
