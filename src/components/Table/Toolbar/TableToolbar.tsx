import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { GridToolbarContainer } from '@mui/x-data-grid';
import React from 'react';

import { Entities } from '../../../types/enums';
import { styles } from './TableToolbar.styles';

interface Props {
  entity: Entities;
  setEdit: (params: boolean) => void;
  setOpenModal: (params: boolean) => void;
}

export const TableToolbar = ({
  entity,
  setEdit,
  setOpenModal,
}: Props): JSX.Element => {
  const title = entity === Entities.Author ? Entities.Author : Entities.Book;

  const handleClick = (): void => {
    setEdit(false);
    setOpenModal(true);
  };

  return (
    <GridToolbarContainer>
      <Button
        sx={styles.button}
        onClick={handleClick}
        variant='outlined'
        endIcon={<AddIcon />}
      >
        {title}
      </Button>
    </GridToolbarContainer>
  );
};
