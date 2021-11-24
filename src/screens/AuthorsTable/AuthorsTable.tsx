import React, { ReactEventHandler } from 'react';
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRenderCellParams,
  GridValueFormatterParams, MuiEvent,
} from '@mui/x-data-grid';
import { authors } from './authorsData';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton } from '@mui/material';

const dateFormatter = (param: GridValueFormatterParams) => param.value;

const cellClickHandler = (params: GridCellParams, event: any) => {
  if (params.field !== 'edit') return;
  console.log('id', params.id);
};

const iconClickHandler = (event: any) => {
  const action = event.currentTarget.ariaLabel;
  switch (action) {
    case 'add' :
      console.log('nav Add');
      break

    case 'edit' :
      console.log('nav Edit');
      break

    case 'delete' :
      console.log('Delete');
      break
  }
};

const editingCell = (params: GridRenderCellParams) => {
  return (
    <>
      <IconButton onClick={iconClickHandler} aria-label="add">
        <AddIcon fontSize="small" color="success" />
      </IconButton>
      <IconButton onClick={iconClickHandler} aria-label="edit">
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton onClick={iconClickHandler} aria-label="delete">
        <DeleteIcon fontSize="small" color="error" />
      </IconButton>
    </>
  );
};

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 20,
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
    renderCell: (params: GridRenderCellParams) => (<Button
        variant="contained"
        color="primary"
        size="small"
      >
        {params.value}
      </Button>
    ),
  },
  {
    field: 'edit',
    headerName: 'Edit',
    width: 120,
    renderCell: editingCell,
  },
];

const styles = {
  container: {
    height: '100%',
    width: '100%',
    alignSelf: 'flex-start',
  },
};

export default function AuthorsTable() {
  return (
    <div style={styles.container}>
      <DataGrid
        rows={authors}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[15]}
        disableSelectionOnClick
        componentsProps={{}}
        onCellClick={cellClickHandler}
      />
    </div>
  );
}

