import { WeatherConfig } from "../models/weather.model";

// Default configuration
export const weatherAppConfig: WeatherConfig = 
{
    url: 'https://api.openweathermap.org',
    allowedEndpoints: [
        '/data/2.5/onecall' 
    ]
};