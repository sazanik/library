import { TFunction } from 'react-i18next';
import * as yup from 'yup';
import { AnyObjectSchema } from 'yup';
import { MAX_LENGTH, MIN_LENGTH } from '../../../constants';

export const getAuthSchema = (
  t: TFunction,
  isRegistered: boolean
): AnyObjectSchema =>
  yup.object().shape({
    email: yup
      .string()
      .email()
      .required(t('validation:required'))
      .min(MIN_LENGTH.EMAIL, t('validation:minLength') + MIN_LENGTH.EMAIL)
      .max(MAX_LENGTH.EMAIL, t('validation:maxLength') + MAX_LENGTH.EMAIL),
    password: yup
      .string()
      .required(t('errors.required'))
      .min(MIN_LENGTH.PASSWORD, t('validation:minLength') + MIN_LENGTH.PASSWORD)
      .max(
        MAX_LENGTH.PASSWORD,
        t('validation:maxLength') + MAX_LENGTH.PASSWORD
      ),
    ...(!isRegistered && {
      confirmPassword: yup
        .string()
        .required(t('validation:passwordMismatch'))
        .oneOf([yup.ref('password'), null], t('validation:passwordMismatch')),
    }),
  });
