import { Typography } from '@mui/material';
import React from 'react';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import { UseFormRegister } from 'react-hook-form/dist/types/form';
import { useTranslation } from 'react-i18next';

import { AuthFormProps } from '../../../../types/inerfaces';
import { Input } from '../../../Input/Input';
import { styles } from './AuthFormSignIn.styles';

interface Props {
  errors: FieldErrors<AuthFormProps>;
  register: UseFormRegister<AuthFormProps>;
}

export const AuthFormSignIn = ({ errors, register }: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <Input
        sx={styles.textField}
        type='text'
        {...register('email')}
        label={t('placeholders:email')}
        variant='standard'
      />
      {errors?.email && (
        <Typography align='center' sx={styles.error}>
          {errors.email.message}
        </Typography>
      )}

      <Input
        sx={styles.textField}
        type='password'
        {...register('password')}
        label={t('placeholders:password')}
        variant='standard'
      />
      {errors?.password && (
        <Typography align='center' sx={styles.error}>
          {errors.password.message}
        </Typography>
      )}
    </>
  );
};
