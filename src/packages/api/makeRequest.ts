import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

import { baseUrl } from '../../config/baseUrl';
import { config } from './config';

axios.defaults.baseURL = baseUrl;
axios.defaults.timeout = 1000;

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
