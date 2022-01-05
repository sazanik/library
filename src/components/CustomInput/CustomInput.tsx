import React, { forwardRef } from 'react';
import { TextField } from '@mui/material';

interface ComponentProps {
  sx: { mb: 1 };
  type: 'text' | 'number' | 'password' | 'date';
  label: string;
  defaultValue?: string;
  InputLabelProps?: { shrink: boolean };
  multiline?: boolean;
  maxRows?: number;
  variant?: 'standard';
}

export const CustomInput = forwardRef(
  (props: ComponentProps, ref): JSX.Element => (
    <TextField inputRef={ref} {...props} />
  )
);

CustomInput.displayName = 'CustomInput';
