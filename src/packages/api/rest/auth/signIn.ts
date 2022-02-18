import { AxiosPromise } from 'axios';

import { SignInProps } from '../../../../types/inerfaces';
import makeRequest from '../../makeRequest';

export const signIn = (data: SignInProps): AxiosPromise => {
  return makeRequest({
    url: 'users/login',
    method: 'POST',
    data,
  });
};
