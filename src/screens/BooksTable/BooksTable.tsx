import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { authors } from '../AuthorsTable/authorsData';

const columns: GridColDef[] = [
  {field: 'id', headerName: 'ID', width: 90},
  {
    field: 'firstName',
    headerName: 'First name',
    width: 200,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 200,
  },
  {
    field: 'birthDate',
    headerName: 'Birth date',
    width: 200,
  },
  {
    field: 'countryOfBirth',
    headerName: 'Country of birth',
    description: 'This column has a value getter and is not sortable.',
    width: 200,
    editable: true,
  },
  {
    field: 'books',
    headerName: 'Books',
    width: 200,
    editable: true,
  },
];


export default function BooksTable() {
  return (
    <div style={{height: '100vh', width: '100%'}}>
      <DataGrid
        componentsProps={{
          cell: {
            onClick: () => console.log('CLICK')
          }
        }}
        rows={authors}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[15]}
        disableSelectionOnClick
      />
    </div>
  );
}
