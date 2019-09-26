import { AnyAction } from 'redux';
import WeatherType from '../service/weatherType';
import { ADD_WEATHER_ITEM, REMOVE_WEATHER_ITEM } from './weatherActions';

export interface State {
    citiesArray: WeatherType[];
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
                if (item.name == action.value) {
                    return false;
                } else {
                    return true;
                }
            });
            return {
                ...state,
                citiesArray: newArray,
            };

        default:
            return state;
    }
};

export default WeatherReducer;
