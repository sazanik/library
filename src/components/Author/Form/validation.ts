import { TFunction } from 'react-i18next';
import * as yup from 'yup';
import { AnyObjectSchema } from 'yup';
import { MASKS, MAX_LENGTH, MIN_LENGTH } from '../../../constants';

export const getAuthorSchema = (t: TFunction): AnyObjectSchema =>
  yup.object().shape({
    firstName: yup
      .string()
      .required(t('validation:required'))
      .matches(MASKS.TEXT, t('validation:invalidData'))
      .min(MIN_LENGTH.NAME, t('validation:minLength') + MIN_LENGTH.NAME)
      .max(MAX_LENGTH.NAME, t('validation:maxLength') + MAX_LENGTH.NAME),
    lastName: yup
      .string()
      .required(t('validation:required'))
      .matches(MASKS.TEXT, t('validation:invalidData'))
      .min(MIN_LENGTH.NAME, t('validation:minLength') + MIN_LENGTH.NAME)
      .max(MAX_LENGTH.NAME, t('validation:maxLength') + MAX_LENGTH.NAME),
    birthDate: yup
      .string()
      .required(t('validation:required'))
      .matches(MASKS.DATE, t('validation:invalidData')),
    country: yup.string().required(t('validation:required')),
  });
