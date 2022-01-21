import { Button as MaterialButton } from '@material-ui/core/';
import React from 'react';

export interface Props {
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

export const Button = ({ ...props }: Props): JSX.Element => (
  <MaterialButton {...props}>Button name</MaterialButton>
);
