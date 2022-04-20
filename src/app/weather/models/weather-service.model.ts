import { Observable } from "rxjs";

export interface IWeatherService<T>{
    getWeather(city: string, longitude: string, latitude: string): Observable<T>;
}
