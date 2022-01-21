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
  entity: 'author' | 'book';
}

export const DialogBox = ({
  isOpenDialog,
  setIsOpenDialog,
  handleClickDelete,
  entity,
}: Props): JSX.Element => {
  const { t } = useTranslation();

  const dialogsTranslation = {
    author: {
      title: t('dialogs:titles.author'),
      description: t('dialogs:descriptions.author'),
    },
    book: {
      title: t('dialogs:titles.book'),
      description: t('dialogs:descriptions.book'),
    },
  };

  return (
    <Dialog
      open={isOpenDialog}
      onClose={() => setIsOpenDialog(false)}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {dialogsTranslation[entity].title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {dialogsTranslation[entity].description}
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
