import { Service, WeatherReply } from '../service/service';
import { Dispatch } from 'redux';

class ErrorMiddleware implements Service {
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
            return weather;
        } catch (e) {
            console.log(e);
        }
    }
}

export default ErrorMiddleware;
