import React, { useState } from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { SHOW_LIST, EMPTY } from "../../../constants/constants";
import { Book } from "../../../features/books/booksSlice";


export interface Props {
  books: Book[]
}


export default function AuthorBooks({books}: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {SHOW_LIST}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >{books.length
        ? books.map(book => <MenuItem onClick={handleClose} key={Math.random().toString()}>{book.title}</MenuItem>)
        : <MenuItem>{EMPTY}</MenuItem>}
      </Menu>
    </div>
  );
}
