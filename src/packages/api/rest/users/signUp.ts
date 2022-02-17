import { AxiosPromise } from 'axios';

import { SignUpProps } from '../../../../types/inerfaces';
import makeRequest from '../../makeRequest';

export const signUp = (data: SignUpProps): AxiosPromise => {
  return makeRequest({
    url: 'users',
    method: 'POST',
    data,
  });
};
