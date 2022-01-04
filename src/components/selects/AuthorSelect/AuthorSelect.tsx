import React, { forwardRef } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useAllAuthors } from '../../../hooks';

interface Props {
  sx: { mb: number };
  defaultValue: string;
}

export const AuthorSelect = forwardRef((props: Props, ref): JSX.Element => {
  const authors = useAllAuthors();

  return (
    <FormControl>
      <InputLabel id='author-label'>Author</InputLabel>
      <Select
        {...props}
        label='author'
        ref={ref}
        id='author'
        labelId='author-label'
      >
        {authors.map((author) => (
          <MenuItem disableRipple key={author.id} value={author.id}>
            {`${author.firstName} ${author.lastName}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

AuthorSelect.displayName = 'AuthorSelect';
