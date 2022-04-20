import { Inject, Injectable } from "@angular/core";
import { Weather, WeatherConfig } from "../models/weather.model";
import { WEATHER_CONFIG, WEATHER_SERVICE } from "../weather.component";
import * as _ from 'lodash';
import { weatherAppConfig } from "../config";
import { BehaviorSubject, forkJoin, Observable, Subject } from "rxjs";
import { IWeatherService } from "../models/weather-service.model";
import { catchError, delay, exhaustMap, finalize, tap } from "rxjs/operators";

@Injectable()
export class WeatherService{

    config: WeatherConfig;
    valueChange$: BehaviorSubject<any> = new BehaviorSubject([]);
    weathers$: Observable<any[]>;
    errorMessage$: Observable<string>;
    selected$: BehaviorSubject<Weather> = new BehaviorSubject(null);
    loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
   
    constructor(@Inject(WEATHER_CONFIG) private _config: WeatherConfig,
                @Inject(WEATHER_SERVICE) private service: IWeatherService<Weather>){
                this.setConfig(weatherAppConfig);
                this._init();
    }

    setConfig(config: WeatherConfig): void{
        this.config = _.merge({}, this._config, config);
        if( this.config.data ){
            this.setValue(this.config.data);
        }
    
    }

    setValue(val): void{
        const keys = Object.keys(val);
        const weatherParams = keys.map(key => ({ name: key, ...val[key] }));
        this.valueChange$.next(weatherParams);
    }

    setSelected(weather: Weather): void{
        this.selected$.next(weather);
    }

    private _init(): void{
        this.weathers$ = this.valueChange$.pipe(
            exhaustMap(data => {
                this.loading$.next(true);
                return forkJoin(data.map(loc => this.service.getWeather(loc.name, loc.lat, loc.long)))
                    .pipe(
                        delay(3000),
                        tap(weathers => this.selected$.next(weathers[0] as Weather)),
                        finalize(() => this.loading$.next(false))
                    );
        }));
    }
}
