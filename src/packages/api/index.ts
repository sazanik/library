import { setToken } from './config';
import { signIn } from './rest/users/signIn';
import { signUp } from './rest/users/signUp';

export default {
  signIn,
  signUp,
};

export { setToken };
