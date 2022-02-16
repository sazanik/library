import { Autocomplete, TextField } from '@mui/material';
import React, { forwardRef } from 'react';

import { COUNTRIES } from '../../../constants';

interface Props {
  label: string;
  sx: { mb: number };
  defaultValue?: string;
}

//todo: there is one bug
export const CountrySelect = forwardRef((props: Props, ref): JSX.Element => {
  const removeDefaultValue = ({ defaultValue, ...othersProps }: Props): Props => othersProps;
  const formatProps = removeDefaultValue(props);

  return (
    <Autocomplete
      ref={ref}
      defaultValue={props.defaultValue}
      freeSolo
      disablePortal
      options={COUNTRIES.map((country) => country.label)}
      renderInput={(params) => <TextField {...params} {...formatProps} />}
    />
  );
});

CountrySelect.displayName = 'CountrySelect';
