import React, { forwardRef } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { COUNTRIES } from '../../../constants/constants';

interface Props {
  sx: { mb: number };
  defaultValue?: string;
}

export const CountrySelect = forwardRef(
  (props: Props, ref): JSX.Element => (
    <FormControl>
      <InputLabel id='country-label'>Country</InputLabel>
      <Select
        {...props}
        ref={ref}
        id='country'
        label='country'
        labelId='country-label'
      >
        {COUNTRIES.map((country) => (
          <MenuItem
            disableRipple
            key={country.code + country.label}
            value={country.label}
          >
            {country.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
);

CountrySelect.displayName = 'CountrySelect';
