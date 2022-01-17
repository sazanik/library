import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridToolbarContainer,
} from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';

import React from 'react';
import { AuthorProps, BookProps } from '../../types/inerfaces';
import { Button } from '@mui/material';
import { Entities } from '../../types/enums';

type EntitiesProps = AuthorProps[] | BookProps[];

interface Props {
  entity: Entities;
  rows: EntitiesProps;
  columns: GridColDef[];
  onCellClick: (params: GridCellParams) => void;
}

const CustomToolbar = (params: Entities): JSX.Element => {
  const title = params === Entities.Author ? Entities.Author : Entities.Book;

  return (
    <GridToolbarContainer>
      <Button variant='outlined' endIcon={<AddIcon />}>
        {title}
      </Button>
    </GridToolbarContainer>
  );
};

export const Table = ({
  rows,
  columns,
  onCellClick,
  entity,
}: Props): JSX.Element => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={13}
      components={{
        Toolbar: () => CustomToolbar(entity),
      }}
      rowsPerPageOptions={[13]}
      disableSelectionOnClick
      onCellClick={onCellClick}
    />
  );
};
