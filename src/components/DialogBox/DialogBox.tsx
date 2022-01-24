import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  isOpenDialog: boolean;
  setIsOpenDialog: (params: boolean) => void;
  handleClickDelete: () => void;
  content: {
    title: string;
    description: string;
  };
}

export const DialogBox = ({
  isOpenDialog,
  setIsOpenDialog,
  handleClickDelete,
  content,
}: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={isOpenDialog}
      onClose={() => setIsOpenDialog(false)}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{content.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {content.description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpenDialog(false)}>
          {t('buttons:cancel')}
        </Button>
        <Button onClick={handleClickDelete} autoFocus>
          {t('buttons:delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
