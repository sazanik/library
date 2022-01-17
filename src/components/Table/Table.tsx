import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { AuthorProps, BookProps } from '../../types/inerfaces';

type EntitiesProps = AuthorProps[] | BookProps[];

interface Props {
  rows: EntitiesProps;
  columns: GridColDef[];
  onCellClick: (params: GridCellParams) => void;
}

export const Table = ({ rows, columns, onCellClick }: Props): JSX.Element => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={13}
      rowsPerPageOptions={[13]}
      disableSelectionOnClick
      onCellClick={onCellClick}
    />
  );
};
