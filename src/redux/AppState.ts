import { State as LoadingState } from './loadingReducer';
import { State as WeatherState } from './weatherReducer';

export interface AppState {
    readonly loading: LoadingState;
    readonly weather: WeatherState;
}
