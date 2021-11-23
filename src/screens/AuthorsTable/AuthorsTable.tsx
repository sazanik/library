import React from 'react';
import { DataGrid, GridColDef, GridRenderCellParams, GridValueFormatterParams } from '@mui/x-data-grid';
import { authors } from './authorsData';
import { Button } from '@mui/material';

const dateFormatter = (param: GridValueFormatterParams) => param.value;

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 50,
  },
  {
    field: 'firstName',
    headerName: 'First name',
    flex: 1,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    flex: 1,
  },
  {
    field: 'birthDate',
    headerName: 'Birth date',
    flex: 1,
    valueFormatter: dateFormatter,
  },
  {
    field: 'countryOfBirth',
    headerName: 'Country of birth',
    description: 'This column has a value getter and is not sortable.',
    editable: true,
    flex: 1,
  },
  {
    field: 'books',
    headerName: 'Books',
    width: 200,
    flex: 1,
    renderCell: (params: GridRenderCellParams) => (
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{marginLeft: 16}}
      >
        {params.value}
      </Button>
    ),
  },
];

function AuthorsTable() {
  return (
    <div style={{height: '100vh', width: '100%'}}>
      <DataGrid
        rows={authors}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[15]}
        // disableSelectionOnClick
        componentsProps={{
          cell: {
            // onMouseEnter: () => console.log('ENTER'),
            // onMouseLeave: () => console.log('LEAVE'),
          },
        }}
      />
    </div>
  );
}

export default AuthorsTable;
