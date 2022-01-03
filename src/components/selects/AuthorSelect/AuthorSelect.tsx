import React, { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useAllAuthors } from '../../../hooks';

interface Props {
  sx: { mb: number };
  defaultValue: string;
}

export const AuthorSelect = forwardRef((props: Props, ref): JSX.Element => {
  const { t } = useTranslation('default');
  const authors = useAllAuthors();

  return (
    <FormControl>
      <InputLabel id='author-label'>Author</InputLabel>
      <Select
        {...props}
        ref={ref}
        id='author'
        label='author'
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
