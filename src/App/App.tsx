import React from 'react';
import './App.scss';
import AuthorsTable from '../screens/AuthorsTable';
import BooksTable from "../screens/BooksTable";

function App() {
  return (
    <div className="App">
      <AuthorsTable />
      <BooksTable />
    </div>
  );
}

export default App;
