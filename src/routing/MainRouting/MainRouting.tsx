import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthRequirement } from '../../components/HOCs/AuthRequirement/AuthRequirement';
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
            <AuthRequirement>
              <Authors />
            </AuthRequirement>
          }
        />
        <Route
          path='authors/:id'
          element={
            <AuthRequirement>
              <Author />
            </AuthRequirement>
          }
        />
        <Route
          path='books'
          element={
            <AuthRequirement>
              <Books />
            </AuthRequirement>
          }
        />
        <Route
          path='books/:id'
          element={
            <AuthRequirement>
              <Book />
            </AuthRequirement>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
};