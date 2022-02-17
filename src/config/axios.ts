import axios from 'axios';

import { baseApiUrl } from './baseApiUrl';

axios.defaults.baseURL = baseApiUrl;
axios.defaults.timeout = 1000;
