import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

import { config } from './config';

export default ({
  url = '/',
  method = 'get',
  params = {},
  data = {},
  headers = {},
}: AxiosRequestConfig): AxiosPromise => {
  if (headers?.authorization && config.token) {
    headers.authorization = config.token;
  }

  return axios({
    url,
    method,
    headers,
    params,
    data,
  });
};
