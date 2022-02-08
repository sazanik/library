import { TFunction } from 'react-i18next';
import * as yup from 'yup';
import { AnyObjectSchema } from 'yup';

import {
  MASKS,
  MAX_LENGTH,
  MIN_LENGTH,
  MIN_VALUE,
} from '../../../constants/constants';

export const getAuthorSchema = (t: TFunction): AnyObjectSchema =>
  yup.object().shape({
    firstName: yup
      .string()
      .required(t('errors:required'))
      .matches(MASKS.TEXT, t('errors:invalidData'))
      .min(MIN_LENGTH.NAME, t('errors:minLength') + MIN_LENGTH.NAME)
      .max(MAX_LENGTH.NAME, t('errors:maxLength') + MAX_LENGTH.NAME),
    lastName: yup
      .string()
      .required(t('errors:required'))
      .matches(MASKS.TEXT, t('errors:invalidData'))
      .min(MIN_LENGTH.NAME, t('errors:minLength') + MIN_LENGTH.NAME)
      .max(MAX_LENGTH.NAME, t('errors:maxLength') + MAX_LENGTH.NAME),
    birthDate: yup
      .date()
      .required(t('errors:required'))
      .typeError(t('errors:invalidData'))
      .nullable()
      .min(new Date(MIN_VALUE.BIRTH_DAY), t('errors:date'))
      .max(new Date(), t('errors:date')),
    country: yup.string().required(t('errors:required')),
  });
