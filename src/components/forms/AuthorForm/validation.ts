import { TFunction } from 'react-i18next';
import { AnyObjectSchema } from 'yup';
import { MASKS, MAX_LENGTH, MIN_LENGTH } from '../../../constants/constants';
import * as yup from 'yup';

export const getAuthorSchema = (t: TFunction): AnyObjectSchema =>
  yup.object().shape({
    firstName: yup
      .string()
      .required(t('errors.required'))
      .matches(MASKS.TEXT, t('errors.invalidData'))
      .min(MIN_LENGTH.NAME, t('errors.minLength') + MIN_LENGTH.NAME)
      .max(MAX_LENGTH.NAME, t('errors.maxLength') + MAX_LENGTH.NAME),
    lastName: yup
      .string()
      .required(t('errors.required'))
      .matches(MASKS.TEXT, t('errors.invalidData'))
      .min(MIN_LENGTH.NAME, t('errors.minLength') + MIN_LENGTH.NAME)
      .max(MAX_LENGTH.NAME, t('errors.maxLength') + MAX_LENGTH.NAME),
    birthDate: yup
      .string()
      .required(t('errors.required'))
      .matches(MASKS.DATE, t('errors.invalidData')),
    country: yup.string().required(t('errors.required')),
  });
