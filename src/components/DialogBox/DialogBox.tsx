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
  openDialog: boolean;
  setOpenDialog: (b: boolean) => void;
  handleClickDelete: () => void;
  entity: 'author' | 'book';
}

export const DialogBox = ({
  openDialog,
  setOpenDialog,
  handleClickDelete,
  entity,
}: Props): JSX.Element => {
  const { t } = useTranslation();

  const translate = {
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
      open={openDialog}
      onClose={() => setOpenDialog(false)}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {translate[entity].title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {translate[entity].description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDialog(false)}>
          {t('buttons:cancel')}
        </Button>
        <Button onClick={handleClickDelete} autoFocus>
          {t('buttons:delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
