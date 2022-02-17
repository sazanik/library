import { AxiosPromise } from 'axios';

import makeRequest from '../../makeRequest';

interface SignInProps {
  user: {
    email: string;
    password: string;
  };
}

export const signIn = (data: SignInProps): AxiosPromise => {
  return makeRequest({
    url: 'users/login',
    method: 'POST',
    data,
  });
};
