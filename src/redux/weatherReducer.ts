import { AnyAction } from 'redux';
import WeatherType from '../service/WeatherType';
import { ADD_WEATHER_ITEM, REMOVE_WEATHER_ITEM } from './weatherActions';
import { ARRANGE_WEATHER_ITEMS } from './SettingsScreenActions';
import { Moment } from 'moment';

export interface WeatherWithTimestamp {
    city: WeatherType;
    timestamp: Moment;
}

export interface State {
    citiesArray: WeatherWithTimestamp[];
}

const initState: State = {
    citiesArray: [],
};

const WeatherReducer = (state: State = initState, action: AnyAction): State => {
    switch (action.type) {
        case ADD_WEATHER_ITEM:
            return {
                ...state,
                citiesArray: [...state.citiesArray, action.value],
            };

        case REMOVE_WEATHER_ITEM:
            const newArray = state.citiesArray.filter(item => {
                if (item.city.name == action.value) {
                    return false;
                } else {
                    return true;
                }
            });
            return {
                ...state,
                citiesArray: newArray,
            };

        // Todo - drag and drop arrange settings screen items

        case ARRANGE_WEATHER_ITEMS:
            const arrangedArray = action.value;
            return {
                ...state,
                citiesArray: arrangedArray,
            };

        default:
            return state;
    }
};

export default WeatherReducer;
