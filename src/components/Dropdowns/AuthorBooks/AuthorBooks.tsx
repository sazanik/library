import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { SHOW_LIST, EMPTY } from '../../../constants/constants';
import { useAllBooks } from '../../../App/store';
import { Author } from '../../../features/authors/authorsSlice';
import { Book } from '../../../features/books/booksSlice';

interface Props {
  author: Author;
}

export default function AuthorBooks({ author }: Props): JSX.Element {
  const books = useAllBooks();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const getBooks = (): Book[] =>
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
        {SHOW_LIST}
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
        {getBooks()?.length ? (
          getBooks()?.map((book) => (
            <MenuItem onClick={handleClose} key={Math.random().toString()}>
              {book?.title}
            </MenuItem>
          ))
        ) : (
          <MenuItem>{EMPTY}</MenuItem>
        )}
      </Menu>
    </div>
  );
}
