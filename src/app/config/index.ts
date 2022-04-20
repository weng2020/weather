import { WeatherConfig } from "../weather/models/weather.model";

export const weatherConfig: WeatherConfig = 
{
    apiKey: '620a330ce7d2c438100e9a3556009a10',
    url: 'https://api.openweathermap.org/data/2.5',
    data: {
        'London': {  
            long: '-0.1257',
            lat: '51.5085'
        },
        'Paris': {  
            lat: '48.8566',
            long: '2.3522'
        },
        'New York': {
            lat: '40.7306',
            long: '-73.9352'
        },
        'Los Angeles': {
            lat: '34.0522',
            long: '-118.2437'
        },
        'Tokyo': {
            lat: '35.6762',
            long: '139.6503'
        }
    }
};