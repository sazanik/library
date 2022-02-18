import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

import { baseUrl } from '../../config/baseUrl';

axios.defaults.baseURL = baseUrl;
axios.defaults.timeout = 1000;

export default ({
  url = '/',
  method = 'get',
  params = {},
  data = {},
  headers = {},
}: AxiosRequestConfig): AxiosPromise => {
  return axios({
    url,
    method,
    headers,
    params,
    data,
  });
};
