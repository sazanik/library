import { Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useAllBooks } from '../../../hooks';
import { AuthorProps, BookProps } from '../../../types/inerfaces';

export interface Props {
  author: AuthorProps;
}

export const BookSelect = ({ author }: Props): JSX.Element => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const books = useAllBooks();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const selectBook = (id: string): void => {
    navigate(`/books/${id}`);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const getBooks = (): BookProps[] => books.filter((book) => book.authorId === author?.id);

  return (
    <div>
      <Button
        id='basic-button'
        aria-controls='basic-menu'
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {t('buttons:showList')}
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {getBooks().length ? (
          getBooks().map((book, id) => (
            <MenuItem onClick={() => selectBook(book.id)} key={id}>
              {book?.title}
            </MenuItem>
          ))
        ) : (
          <MenuItem>{t('empty')}</MenuItem>
        )}
      </Menu>
    </div>
  );
};
