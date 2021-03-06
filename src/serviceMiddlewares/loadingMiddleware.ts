import { Service, WeatherReply } from '../service/service';
import { Dispatch } from 'redux';
import { startLoading, stopLoading } from '../redux/loadingActions';

class LoadingMiddleware implements Service {
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
        this.dispatch(startLoading('getWeather'));
        try {
            const result = await this.next.getWeather(city, country);
            this.dispatch(stopLoading('getWeather'));
            return result;
        } catch (e) {
            this.dispatch(stopLoading('getWeather'));
            console.log(e);
        }
    }
}
export default LoadingMiddleware;
