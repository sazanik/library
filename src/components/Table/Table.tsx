import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import React from 'react';

import { AuthorProps, BookProps } from '../../types/inerfaces';
import { TableToolbar } from './Toolbar/TableToolbar';

interface Props {
  buttonTitle: string;
  rows: AuthorProps[] | BookProps[];
  columns: GridColDef[];
  onCellClick: (params: GridCellParams) => void;
  setEdit: (params: boolean) => void;
  setIsOpenModal: (params: boolean) => void;
}

export const Table = ({
  rows,
  columns,
  onCellClick,
  buttonTitle,
  setEdit,
  setIsOpenModal,
}: Props): JSX.Element => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={13}
      components={{
        Toolbar: () =>
          TableToolbar({
            buttonTitle,
            setEdit,
            setIsOpenModal,
          }),
      }}
      rowsPerPageOptions={[13]}
      disableSelectionOnClick
      onCellClick={onCellClick}
    />
  );
};
