import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { weatherConfig } from "../config";
import { IWeatherService } from "../weather/models/weather-service.model";
import { Weather } from "../weather/models/weather.model";
import { map } from "rxjs/operators";

@Injectable()
export class WeatherService implements IWeatherService<Weather>{

    serviceUrl = weatherConfig.url;

    constructor(private http: HttpClient){

    }
    
    getWeather(city: string, lat: string, long: string): Observable<Weather> {
        return this.http.get<Weather>(`${this.serviceUrl}/onecall?lat=${lat}&lon=${long}&units=metric&exclude=minutely`)
            .pipe(
                map((weather: any) => new Weather({ city: city, temperature: weather.current.temp, humidity: weather.current.humidity, pop: weather.daily[0].pop, rawData: weather, dt: weather.current.dt }))
            );
    }
}