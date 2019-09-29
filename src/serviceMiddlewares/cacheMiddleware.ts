import { Service, WeatherReply } from '../service/service';
import { Dispatch } from 'redux';
import {
    setToAsyncStorage,
    getFromAsyncStorage,
} from '../asyncStorage/asyncStorage';
import { newError } from '../redux/errorActions';
import moment from 'moment';

class CacheMiddleware implements Service {
    public next: Service;
    public dispatch: Dispatch;

    constructor(next: Service, dispatch: Dispatch) {
        this.next = next;
        this.dispatch = dispatch;
    }

    public async getWeather(
        city: string,
        country?: string
    ): Promise<WeatherReply> {
        try {
            const weather = await this.next.getWeather(city, country);
            const currentTime = moment();
            const timeStampedWeather = {
                weather: weather,
                time: currentTime,
            };

            setToAsyncStorage(timeStampedWeather, '@cache/weather/' + city);
            return timeStampedWeather.weather;
        } catch (e) {
            try {
                const weatherReply = await getFromAsyncStorage(
                    '@cache/weather/' + city
                );
                if (weatherReply) {
                    return WeatherReply.fromJSON(weatherReply.data);
                } else {
                    throw new Error('no data');
                }
            } catch (e) {
                this.dispatch(newError(e));
                throw e;
            }
        }
    }
}
export default CacheMiddleware;
