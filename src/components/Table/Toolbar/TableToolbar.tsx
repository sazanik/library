import { Entities } from '../../../types/enums';
import { GridToolbarContainer } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
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
