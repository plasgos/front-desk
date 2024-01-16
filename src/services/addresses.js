import { Api } from './api';

export default {
  subdistrict: payload => Api.get(`/subdistricts`),
}
