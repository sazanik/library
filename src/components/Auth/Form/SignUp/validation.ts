import { TFunction } from 'react-i18next';
import * as yup from 'yup';
import { AnyObjectSchema } from 'yup';

import { getSignInSchema } from '../SignIn/validation';

export const getSignUpSchema = (t: TFunction): AnyObjectSchema =>
  yup
    .object()
    .concat(getSignInSchema(t))
    .shape({
      confirmPassword: yup
        .string()
        .required(t('errors:passwordMismatch'))
        .oneOf([yup.ref('password'), null], t('errors: passwordMismatch')),
    });
