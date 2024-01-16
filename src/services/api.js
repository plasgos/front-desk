import axios from 'axios';
import config from '../config';
export const apiUrl = process.env.NODE_ENV === 'development' ? config.development.API_BASE_URL : config.production.API_BASE_URL;
export const Api = axios.create({baseURL: apiUrl});
