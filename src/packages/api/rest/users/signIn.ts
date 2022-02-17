import { AxiosPromise } from 'axios';

import makeRequest from '../../makeRequest';

interface LoginProps {
  email: string;
  password: string;
}

export const signIn = (data: LoginProps): AxiosPromise => {
  return makeRequest({
    url: 'users/login',
    method: 'POST',
    data,
  });
};
