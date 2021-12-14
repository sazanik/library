import React, { ReactElement, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';
import { useAllBooks } from '../../../App/hooks';
import { IAuthor } from '../../../features/authors/authorsSlice';
import { IBook } from '../../../features/books/booksSlice';
import { useNavigate } from 'react-router-dom';

interface IProps {
  author: IAuthor;
}

export default function AuthorBooks({ author }: IProps): ReactElement {
  const navigate = useNavigate();
  const { t } = useTranslation('default');
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

  const getBooks = (): IBook[] =>
    books.filter((book) => book.authorId === author.id);

  return (
    <div>
      <Button
        id='basic-button'
        aria-controls='basic-menu'
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {t('showList')}
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
          getBooks().map((book) => (
            <MenuItem
              onClick={() => selectBook(book.id)}
              key={Math.random().toString()}
            >
              {book?.title}
            </MenuItem>
          ))
        ) : (
          <MenuItem>{t('empty')}</MenuItem>
        )}
      </Menu>
    </div>
  );
}
