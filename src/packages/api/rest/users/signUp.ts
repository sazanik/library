import { AxiosPromise } from 'axios';

import makeRequest from '../../makeRequest';

interface SignUpProps {
  username: string;
  email: string;
  password: string;
}

export const signUp = (data: SignUpProps): AxiosPromise => {
  return makeRequest({
    url: 'users/login',
    method: 'POST',
    data,
  });
};
