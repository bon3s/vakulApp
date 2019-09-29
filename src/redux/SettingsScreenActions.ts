import WeatherType from '../service/WeatherType';

export const ARRANGE_WEATHER_ITEMS = 'ADD_WEATHER_ITEMS';

export const arrangeWeatherItems = (value: WeatherType[]) => ({
    type: ARRANGE_WEATHER_ITEMS,
    value,
});
