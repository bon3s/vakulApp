import config from '../config';
import client from '../http/client';
import REST, { URL } from '../api/rest';
import store from '../store';
import CacheMiddleware from '../serviceMiddlewares/cacheMiddleware';
import ErrorMiddleware from '../serviceMiddlewares/errorMiddleware';
import LoadingMiddleware from '../serviceMiddlewares/loadingMiddleware';
import WeatherType from './weatherType';

export interface Service {
    getWeather(city: string, country?: string): Promise<WeatherReply>;
}

export class WeatherReply {
    public static fromJSON(maybe: any): WeatherReply {
        const weatherArray: WeatherType[] = [];
        weatherArray.push(WeatherType.fromJSON(maybe));
        return new WeatherReply(weatherArray);
    }
    public data: WeatherType[];
    constructor(weatherArray: WeatherType[]) {
        this.data = weatherArray;
    }
}

const url = new URL(config.BACKEND_SCHEME, config.BACKEND, config.API_KEY);

const rest: Service = new REST(client, url);
const cache: Service = new CacheMiddleware(rest, store.dispatch);
const error: Service = new ErrorMiddleware(cache, store.dispatch);
const service: Service = new LoadingMiddleware(error, store.dispatch);

export default service;
