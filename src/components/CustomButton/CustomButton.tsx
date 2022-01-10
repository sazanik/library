import React from 'react';
// import { CustomButton } from '@mui/material';
import { Button } from '@material-ui/core/';

export interface ButtonProps {
  /**
   * Disabled
   */
  disabled?: boolean;
  /**
   * Children this is name button
   */
  children?: string;
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

export const CustomButton = ({ ...props }: ButtonProps): JSX.Element => (
  <Button {...props}>Button name</Button>
);
