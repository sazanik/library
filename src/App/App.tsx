import React from 'react';
import './App.scss';
import AuthorsTable from '../screens/AuthorsTable/AuthorsTable';
import AddAuthor from '../components/Forms/AddAuthor/AddAuthor';


function App() {
  return (
    <div className="App">
      <AuthorsTable />
      {/*<AddAuthor />*/}
    </div>
  );
}

export default App;
