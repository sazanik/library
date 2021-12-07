import React from "react";
import "./App.scss";
import { Routes, Route, Link } from "react-router-dom";
import AuthorsPage from "../pages/AuthorsPage";
import BooksTable from "../pages/BooksPage";

const App = function () {
  return (
    <div className="App">
      <Link to="/">Authors</Link>
      <Link to="/books">Books</Link>
      <h1>Welcome to Library App</h1>
      <Routes>
        <Route path="/" element={<AuthorsPage />} />
        <Route path="/books" element={<BooksTable />} />
      </Routes>
    </div>
  );
};

export default App;
