import { Api } from './api';

export default {
  account: payload => Api.post('/v2/login', payload),
}
