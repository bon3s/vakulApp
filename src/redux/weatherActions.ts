import WeatherType from '../service/weatherType';

export const ADD_WEATHER_ITEM = 'ADD_WEATHER_ITEM';
export const REMOVE_WEATHER_ITEM = 'REMOVE_WEATHER_ITEM';

export const setWeatherItem = (value: WeatherType) => ({
    type: ADD_WEATHER_ITEM,
    value,
});

export const removeWeatherItem = (value: string) => ({
    type: REMOVE_WEATHER_ITEM,
    value,
});
