import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import React from 'react';

import { Entities } from '../../types/enums';
import { AuthorProps, BookProps } from '../../types/inerfaces';
import { TableToolbar } from './Toolbar/TableToolbar';

interface Props {
  entity: Entities;
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
  entity,
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
            entity,
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
