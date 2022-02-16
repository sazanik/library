import { TFunction } from 'react-i18next';
import * as yup from 'yup';
import { AnyObjectSchema } from 'yup';

import { MASKS, MAX_LENGTH, MIN_LENGTH } from '../../../constants';

export const getBookSchema = (t: TFunction): AnyObjectSchema =>
  yup.object().shape({
    title: yup
      .string()
      .required(t('errors:required'))
      .min(MIN_LENGTH.TITLE, t('errors:minLength') + MIN_LENGTH.TITLE)
      .max(MAX_LENGTH.TITLE, t('errors:maxLength') + MAX_LENGTH.TITLE),
    description: yup
      .string()
      .required(t('errors:required'))
      .matches(MASKS.TEXT, t('errors:invalidData'))
      .min(MIN_LENGTH.DESCRIPTION, t('errors:minLength') + MIN_LENGTH.DESCRIPTION)
      .max(MAX_LENGTH.DESCRIPTION, t('errors:maxLength') + MAX_LENGTH.DESCRIPTION),
    code: yup
      .string()
      .required(t('errors:required'))
      .matches(MASKS.NUMBER, t('errors:invalidData'))
      .min(MIN_LENGTH.CODE, t('errors:minLength') + MIN_LENGTH.CODE)
      .max(MAX_LENGTH.CODE, t('errors:maxLength') + MAX_LENGTH.CODE),
    pagesCount: yup
      .string()
      .required(t('errors:required'))
      .matches(MASKS.NUMBER, t('errors:invalidData'))
      .min(MIN_LENGTH.PAGES_COUNT, t('errors:minLength') + MIN_LENGTH.PAGES_COUNT)
      .max(MAX_LENGTH.PAGES_COUNT, t('errors:maxLength') + MAX_LENGTH.PAGES_COUNT),
    publishingYear: yup
      .string()
      .required(t('errors:required'))
      .matches(MASKS.PUBLISHING_YEAR, t('errors:invalidData'))
      .min(MIN_LENGTH.PUBLISHING_YEAR, t('errors:minLength') + MIN_LENGTH.PUBLISHING_YEAR)
      .max(MAX_LENGTH.PUBLISHING_YEAR, t('errors:maxLength') + MAX_LENGTH.PUBLISHING_YEAR),
  });
