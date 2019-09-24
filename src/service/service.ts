import { WeatherType } from './weatherType';
import config from '../config';
import client from '../http/client';
import REST, { URL } from '../api/rest';
import store from '../store';
import CacheMiddleware from '../serviceMiddlewares/cacheMiddleware';
import ErrorMiddleware from '../serviceMiddlewares/errorMiddleware';
import LoadingMiddleware from '../serviceMiddlewares/loadingMiddleware';

export interface Service {
    getWeather(city: string): Promise<WeatherReply>;
}

export class WeatherReply {
    public static fromJSON(maybe: any): WeatherReply {
        // if (!Array.isArray(maybe)) {
        //     throw new Error('WeatherReply should be an array');
        // }
        const weatherArray: WeatherType[] = [];
        for (const maybeWeather of maybe) {
            weatherArray.push(WeatherType.fromJSON(maybeWeather));
        }
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
