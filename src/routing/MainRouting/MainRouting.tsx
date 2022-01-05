import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { WithAuthRequirement } from '../../components/HOCs/WithAuthRequirement/WithAuthRequirement';
import { Auth, Author, Authors, Book, Books, NotFound } from '../../views';
import { AppLayout } from '../../components/layouts/AppLayout/AppLayout';

export const MainRouting = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<Auth />} />
        <Route
          path='authors'
          element={
            <WithAuthRequirement>
              <Authors />
            </WithAuthRequirement>
          }
        />
        <Route
          path='authors/:id'
          element={
            <WithAuthRequirement>
              <Author />
            </WithAuthRequirement>
          }
        />
        <Route
          path='books'
          element={
            <WithAuthRequirement>
              <Books />
            </WithAuthRequirement>
          }
        />
        <Route
          path='books/:id'
          element={
            <WithAuthRequirement>
              <Book />
            </WithAuthRequirement>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
};
