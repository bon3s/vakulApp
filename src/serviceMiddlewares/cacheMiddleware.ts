import { Service, WeatherReply } from '../service/service';
import { Dispatch } from 'redux';
import {
    setToAsyncStorage,
    getFromAsyncStorage,
} from '../asyncStorage/asyncStorage';

class CacheMiddleware implements Service {
    public next: Service;
    public dispatch: Dispatch;

    constructor(next: Service, dispatch: Dispatch) {
        this.next = next;
        this.dispatch = dispatch;
    }

    public async getWeather(city: string): Promise<WeatherReply> {
        try {
            const weather = await this.next.getWeather(city);
            console.log('cache', weather);
            setToAsyncStorage(weather, '@cache/weather');
            return weather;
        } catch (e) {
            try {
                const weatherReply = await getFromAsyncStorage(
                    '@cache/weather'
                );
                if (weatherReply) {
                    return WeatherReply.fromJSON(weatherReply.data);
                } else {
                    throw new Error('no data');
                }
            } catch (e) {
                console.log(e);
                throw e;
            }
        }
    }
}
export default CacheMiddleware;
