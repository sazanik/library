import { TFunction } from 'react-i18next';
import * as yup from 'yup';
import { AnyObjectSchema } from 'yup';

import { MAX_LENGTH, MIN_LENGTH } from '../../../../constants';

export const getSignInSchema = (t: TFunction): AnyObjectSchema =>
  yup.object().shape({
    email: yup
      .string()
      .email()
      .required(t('errors:required'))
      .min(MIN_LENGTH.EMAIL, t('errors:minLength') + MIN_LENGTH.EMAIL)
      .max(MAX_LENGTH.EMAIL, t('errors:maxLength') + MAX_LENGTH.EMAIL),
    password: yup
      .string()
      .required(t('errors:required'))
      .min(MIN_LENGTH.PASSWORD, t('errors:minLength') + MIN_LENGTH.PASSWORD)
      .max(MAX_LENGTH.PASSWORD, t('errors:maxLength') + MAX_LENGTH.PASSWORD),
  });
