import React from 'react';
import { Image } from 'react-native';

interface Props {
    nightMode: boolean;
    iconCode: string;
}

const handleIconDay = (iconCode: string) => {
    const clearSkyDay = require('../../assets/img/icons/30.png');
    const fewCloudsDay = require('../../assets/img/icons/41.png');
    const scatteredCloudsDay = require('../../assets/img/icons/42.png');
    const brokenCloudsDay = require('../../assets/img/icons/31.png');
    const showerRainDay = require('../../assets/img/icons/33.png');
    const rainDay = require('../../assets/img/icons/27.png');
    const thunderStormDay = require('../../assets/img/icons/20.png');
    const snowDay = require('../../assets/img/icons/21.png');
    const mistDay = require('../../assets/img/icons/29.png');
    const undefinedWeather = require('../../assets/img/icons/11.png');

    switch (iconCode) {
        case '01d':
            return clearSkyDay;
        case '02d':
            return fewCloudsDay;
        case '03d':
            return scatteredCloudsDay;
        case '04d':
            return brokenCloudsDay;
        case '09d':
            return showerRainDay;
        case '10d':
            return rainDay;
        case '11d':
            return thunderStormDay;
        case '13d':
            return snowDay;
        case '50d':
            return mistDay;
        default:
            return undefinedWeather;
    }
};

const handleIconNight = (iconCode: string) => {
    const clearSkyNight = require('../../assets/img/icons/36.png');
    const fewCloudsNight = require('../../assets/img/icons/39.png');
    const scatteredCloudsNight = require('../../assets/img/icons/42n.png');
    const brokenCloudsNight = require('../../assets/img/icons/25.png');
    const showerRainNight = require('../../assets/img/icons/33n.png');
    const rainNight = require('../../assets/img/icons/28.png');
    const thunderStormNight = require('../../assets/img/icons/20n.png');
    const snowNight = require('../../assets/img/icons/22.png');
    const mistNight = require('../../assets/img/icons/29n.png');
    const undefinedWeather = require('../../assets/img/icons/11n.png');

    switch (iconCode) {
        case '01n':
            return clearSkyNight;
        case '02n':
            return fewCloudsNight;
        case '03n':
            return scatteredCloudsNight;
        case '04n':
            return brokenCloudsNight;
        case '09n':
            return showerRainNight;
        case '10n':
            return rainNight;
        case '11n':
            return thunderStormNight;
        case '13n':
            return snowNight;
        case '50n':
            return mistNight;
        default:
            return undefinedWeather;
    }
};
export default function WeatherIcon(p: Props) {
    if (!p.nightMode) {
        return <Image source={handleIconDay(p.iconCode)}></Image>;
    } else {
        return <Image source={handleIconNight(p.iconCode)}></Image>;
    }
}
