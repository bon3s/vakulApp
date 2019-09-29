import { WeatherWithTimestamp } from './weatherReducer';

export const ADD_WEATHER_ITEM = 'ADD_WEATHER_ITEM';
export const REMOVE_WEATHER_ITEM = 'REMOVE_WEATHER_ITEM';

export const setWeatherItem = (value: WeatherWithTimestamp) => ({
    type: ADD_WEATHER_ITEM,
    value,
});

export const removeWeatherItem = (value: string) => ({
    type: REMOVE_WEATHER_ITEM,
    value,
});
