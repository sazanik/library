import React from 'react';
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRenderCellParams,
  GridValueFormatterParams,
} from '@mui/x-data-grid';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton, Modal, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectAuthors } from '../../features/authors/authorsSlice';
import AddAuthor from '../../components/Forms/AddAuthor/AddAuthor';

const dateFormatter = (param: GridValueFormatterParams) => param.value;

const styles = {
  container: {
    height: '100%',
    width: '100%',
    alignSelf: 'flex-start',
  },
};

export default function AuthorsTable() {
  const authors = useSelector(selectAuthors);

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
      field: 'country',
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const cellClickHandler = (params: GridCellParams, event: any) => {
    if (params.field !== 'edit') return;
    console.log('id', params.id);
  };

  const iconClickHandler = (event: any) => {
    handleOpen();
    const action = event.currentTarget.ariaLabel;
    switch (action) {
      case 'add' :
        console.log('nav Add');
        break;

      case 'edit' :
        console.log('nav Edit');
        break;

      case 'delete' :
        console.log('Delete');
        break;
    }
  };

  function editingCell(params: GridRenderCellParams) {
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
  }

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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddAuthor />
        </Box>
      </Modal>
    </div>
  );
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

