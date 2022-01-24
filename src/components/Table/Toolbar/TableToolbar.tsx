import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { GridToolbarContainer } from '@mui/x-data-grid';
import React from 'react';

import { styles } from './TableToolbar.styles';

interface Props {
  buttonTitle: string;
  setEdit: (params: boolean) => void;
  setIsOpenModal: (params: boolean) => void;
}

export const TableToolbar = ({
  buttonTitle,
  setEdit,
  setIsOpenModal,
}: Props): JSX.Element => {
  const handleClick = (): void => {
    setEdit(false);
    setIsOpenModal(true);
  };

  return (
    <GridToolbarContainer>
      <Button
        sx={styles.button}
        onClick={handleClick}
        variant='outlined'
        endIcon={<AddIcon />}
      >
        {buttonTitle}
      </Button>
    </GridToolbarContainer>
  );
};
