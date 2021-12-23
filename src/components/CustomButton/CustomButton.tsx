import React from 'react';
// import { Button } from '@mui/material';
import { Button } from '@material-ui/core/';

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  disabled?: boolean;
  /**
   * Children this is name button
   */
  label: string;
  /**
   * Variant
   */
  variant?: 'outlined' | 'contained' | 'text';
  /**
   * Size
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Color
   */
  color?: 'primary' | 'secondary';
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */

export const CustomButton = ({
  label = 'text',
  ...props
}: ButtonProps): JSX.Element => <Button {...props}>{label}</Button>;
