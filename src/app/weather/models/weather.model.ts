export interface WParams {
    [key: string]: { lat: string, long: string };
  }

export interface WeatherConfig{
    apiKey?: string;
    url?: string;
    data?: WParams; 
    // endpoints needed to check in the httpinterceptor to determine
    //  if the httprequest is requesting from a weather api
    allowedEndpoints?: string[];  
}

export class Weather{
    city: string;
    temperature: number;
    humidity: number;
    pop: number; // percent chance of rain
    rawData: any; // raw data from the api
    dt: any; // date time
    weather: {
        desc: string;
        icon: 'clear_day' | 'clear_night' | 'cloud' | 'rain' | 'snow' | 'storm' | 'wind';
    }
    daily: Weather[];

    constructor(o?: any){
        o = o || {};
        this.temperature = o.temperature;
        this.humidity = o.humidity;
        this.pop = o.pop;
        this.rawData = o.rawData;
        this.city = o.city;
        this.dt = new Date(o.dt);
        this.weather = { desc: o.weather.desc, icon: o.weather.icon };
        this.daily = o.daily;
    }
}
