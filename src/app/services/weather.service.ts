import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IWeatherService } from "../weather/models/weather-service.model";
import { Weather } from "../weather/models/weather.model";
import { map } from "rxjs/operators";
import { WeatherUtil } from "../weather/utils/weather-util";

@Injectable()
export class WeatherService implements IWeatherService<Weather>{

    constructor(private http: HttpClient){

    }
    
    getWeather(city: string, lat: string, long: string): Observable<Weather> {
        return this.http.get<Weather>(`/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&exclude=minutely`)
            .pipe(
                map((weather: any) => 
                    new Weather({ 
                        city: city, 
                        temperature: weather.current.temp, 
                        humidity: weather.current.humidity, 
                        pop: weather.daily[0].pop, 
                        rawData: weather, 
                        dt: weather.current.dt * 1000, 
                        weather: {
                            desc: weather.current.weather[0].description,
                            icon: WeatherUtil.getIcon(weather.current.weather[0].id,  weather.current.dt)
                        },
                        daily: weather.daily.map(d => 
                            new Weather({
                                city: city,
                                temperature: d.temp.day,
                                humidity: d.humidity,
                                pop: d.pop,
                                rawData: d,
                                dt: d.dt * 1000,
                                weather: {
                                    desc: d.weather[0].description,
                                    icon: WeatherUtil.getIcon(d.weather[0].id, d.dt)
                                }
                        })) 
                    }))
            );
    }
}