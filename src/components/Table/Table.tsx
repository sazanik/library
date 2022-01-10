import React from 'react';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { AuthorProps, BookProps } from '../../types/inerfaces';
import { Entities } from '../../types/enums';
import { TableToolbar } from './Toolbar/TableToolbar';

interface Props {
  entity: Entities;
  rows: AuthorProps[] | BookProps[];
  columns: GridColDef[];
  onCellClick: (params: GridCellParams) => void;
  setEdit: (params: boolean) => void;
  setOpenModal: (params: boolean) => void;
}

export const Table = ({
  rows,
  columns,
  onCellClick,
  entity,
  setEdit,
  setOpenModal,
}: Props): JSX.Element => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={13}
      components={{
        Toolbar: () =>
          TableToolbar({
            entity,
            setEdit,
            setOpenModal,
          }),
      }}
      rowsPerPageOptions={[13]}
      disableSelectionOnClick
      onCellClick={onCellClick}
    />
  );
};
