import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useAllAuthors } from '../../../hooks';

interface Props {
  sx: { mb: number };
  defaultValue: string;
}

export const AuthorSelect = forwardRef((props: Props, ref): JSX.Element => {
  const { t } = useTranslation();
  const authors = useAllAuthors();

  return (
    <FormControl>
      <InputLabel id='author-label'>{t('placeholders:author')}</InputLabel>
      <Select
        {...props}
        label={t('placeholders:author')}
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
