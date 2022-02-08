import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import React from 'react';

import { ROWS_COUNT } from '../../constants/constants';
import { AuthorProps, BookProps } from '../../types/inerfaces';
import { TableToolbar } from './Toolbar/TableToolbar';

interface Props {
  buttonTitle: string;
  rows: AuthorProps[] | BookProps[];
  columns: GridColDef[];
  onCellClick: (params: GridCellParams) => void;
  setIsEdit: (params: boolean) => void;
  setIsOpenModal: (params: boolean) => void;
}

export const Table = ({
  rows,
  columns,
  onCellClick,
  buttonTitle,
  setIsEdit,
  setIsOpenModal,
}: Props): JSX.Element => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      disableColumnMenu
      pageSize={ROWS_COUNT}
      components={{
        Toolbar: () =>
          TableToolbar({
            buttonTitle,
            setIsEdit,
            setIsOpenModal,
          }),
      }}
      rowsPerPageOptions={[ROWS_COUNT]}
      disableSelectionOnClick
      onCellClick={onCellClick}
    />
  );
};
