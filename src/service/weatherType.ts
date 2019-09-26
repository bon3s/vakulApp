export default class WeatherType {
    public static fromJSON(maybe: any): WeatherType {
        if (!maybe) {
            throw new Error('weatherType should be of type object');
        }

        const lon = maybe.coord.lon;
        const lat = maybe.coord.lat;
        const main = maybe.weather[0].main;
        const id = maybe.weather[0].id;
        const description = maybe.weather[0].description;
        const icon = maybe.weather[0].icon;
        const temp = maybe.main.temp;
        const pressure = maybe.main.pressure;
        const humidity = maybe.main.humidity;
        const tempMin = maybe.main.temp_min;
        const tempMax = maybe.main.temp_max;
        const name = maybe.name;
        const windSpeed = maybe.wind.speed;

        if (typeof lon !== 'number') {
            throw new Error('weatherType longitude should be of type number');
        }
        if (typeof lat !== 'number') {
            throw new Error('weatherType latitude should be of type number');
        }
        if (typeof main !== 'string') {
            throw new Error('weatherType main should be of type string');
        }
        if (typeof id !== 'number') {
            throw new Error('weatherType id should be of type number');
        }
        if (typeof description !== 'string') {
            throw new Error('weatherType description should be of type string');
        }
        if (typeof icon !== 'string') {
            throw new Error('weatherType icon should be of type string');
        }
        if (typeof temp !== 'number') {
            throw new Error('weatherType temp should be of type number');
        }
        if (typeof pressure !== 'number') {
            throw new Error('weatherType pressure should be of type number');
        }
        if (typeof humidity !== 'number') {
            throw new Error('weatherType humidity should be of type number');
        }
        if (typeof tempMin !== 'number') {
            throw new Error('weatherType tempMin should be of type number');
        }
        if (typeof tempMax !== 'number') {
            throw new Error('weatherType tempMax should be of type number');
        }
        if (typeof name !== 'string') {
            throw new Error('weatherType name should be of type string');
        }
        if (typeof windSpeed !== 'number') {
            throw new Error('weatherType windSpeed should be of type number');
        }

        return new WeatherType(
            lon,
            lat,
            main,
            id,
            description,
            icon,
            temp,
            pressure,
            humidity,
            tempMin,
            tempMax,
            name,
            windSpeed
        );
    }

    public lon: number;
    public lat: number;
    public main: string;
    public id: number;
    public description: string;
    public icon: string;
    public temp: number;
    public pressure: number;
    public humidity: number;
    public tempMin: number;
    public tempMax: number;
    public name: string;
    public windSpeed: number;

    constructor(
        lon: number,
        lat: number,
        main: string,
        id: number,
        description: string,
        icon: string,
        temp: number,
        pressure: number,
        humidity: number,
        tempMin: number,
        tempMax: number,
        name: string,
        windSpeed: number
    ) {
        this.id = id;
        this.lon = lon;
        this.lat = lat;
        this.main = main;
        this.description = description;
        this.icon = icon;
        this.temp = temp;
        this.pressure = pressure;
        this.humidity = humidity;
        this.tempMin = tempMin;
        this.tempMax = tempMax;
        this.name = name;
        this.windSpeed = windSpeed;
    }
}
