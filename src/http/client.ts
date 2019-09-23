import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import config from '../config';

export interface HTTPClient {
    request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
}

export const requestTimeout = config.TIMEOUT * 1000;

export default axios.create({ timeout: requestTimeout });
