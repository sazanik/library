import { TFunction } from 'react-i18next';
import { AnyObjectSchema } from 'yup';
import * as yup from 'yup';
import { MAX_LENGTH, MIN_LENGTH } from '../../constants/constants';

export const getAuthSchema = (
  t: TFunction,
  isRegistered: boolean
): AnyObjectSchema =>
  yup.object().shape({
    login: yup
      .string()
      .required(t('errors.required'))
      .min(MIN_LENGTH.LOGIN, t('errors.minLength') + MIN_LENGTH.LOGIN)
      .max(MAX_LENGTH.LOGIN, t('errors.maxLength') + MAX_LENGTH.LOGIN),
    password: yup
      .string()
      .required(t('errors.required'))
      .min(MIN_LENGTH.PASSWORD, t('errors.minLength') + MIN_LENGTH.PASSWORD)
      .max(MAX_LENGTH.PASSWORD, t('errors.maxLength') + MAX_LENGTH.PASSWORD),
    ...(!isRegistered && {
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null])
        .required(t('errors.passwordMismatch')),
    }),
  });
