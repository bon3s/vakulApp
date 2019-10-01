import { State as LoadingState } from './loadingReducer';
import { State as WeatherState } from './weatherReducer';
import { State as ConnectivityState } from './connectivityReducer';

export interface AppState {
    readonly loading: LoadingState;
    readonly weather: WeatherState;
    readonly connectivity: ConnectivityState;
}
