import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { GridToolbarContainer } from '@mui/x-data-grid';
import React from 'react';

import { styles } from './TableToolbar.styles';

interface Props {
  buttonTitle: string;
  setIsEdit: (params: boolean) => void;
  setIsOpenModal: (params: boolean) => void;
}

export const TableToolbar = ({ buttonTitle, setIsEdit, setIsOpenModal }: Props): JSX.Element => {
  const handleClick = (): void => {
    setIsEdit(false);
    setIsOpenModal(true);
  };

  return (
    <GridToolbarContainer>
      <Button sx={styles.button} onClick={handleClick} variant='outlined' endIcon={<AddIcon />}>
        {buttonTitle}
      </Button>
    </GridToolbarContainer>
  );
};
