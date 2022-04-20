interface WParams {
    [key: string]: { lat: string, long: string };
  }

export interface WeatherConfig{
    apiKey: string;
    url: string;
    data?: WParams;   
}

export class Weather{
    city: string;
    temperature: number;
    humidity: number;
    pop: number; // percent chance of rain
    rawData: any; // raw data from the api
    dt: any; // date time

    constructor(o?: any){
        o = o || {};
        this.temperature = o.temperature;
        this.humidity = o.humidity;
        this.pop = o.pop;
        this.rawData = o.rawData;
        this.city = o.city;
        this.dt = new Date(o.dt * 1000);

    }
}
