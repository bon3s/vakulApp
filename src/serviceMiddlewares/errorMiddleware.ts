import { Service, WeatherReply } from '../service/service';
import { Dispatch } from 'redux';
import { newError } from '../redux/errorActions';

class ErrorMiddleware implements Service {
    public next: Service;
    public dispatch: Dispatch;

    constructor(next: Service, dispatch: Dispatch) {
        this.next = next;
        this.dispatch = dispatch;
    }

    public async getWeather(city: string): Promise<WeatherReply> {
        try {
            return await this.next.getWeather(city);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}

export default ErrorMiddleware;
