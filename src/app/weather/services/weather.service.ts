import { Inject, Injectable } from "@angular/core";
import { Weather, WeatherConfig, WParams } from "../models/weather.model";
import { WEATHER_CONFIG, WEATHER_SERVICE } from "../weather.component";
import * as _ from 'lodash';
import { weatherAppConfig } from "../config";
import { BehaviorSubject, forkJoin, Observable } from "rxjs";
import { IWeatherService } from "../models/weather-service.model";
import { exhaustMap, finalize, tap } from "rxjs/operators";
import { Subject } from "rxjs";

@Injectable()
export class WeatherService{

    config: WeatherConfig;
    valueChange$: BehaviorSubject<any> = new BehaviorSubject([]);
    weathers$: Observable<any[]>;
    errorMessage$: Subject<string> = new Subject();
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
            this.setData(this.config.data);
        }
    }

    setData(val: WParams): void{
        const keys = Object.keys(val);
        const weatherParams = keys.map(key => ({ name: key, ...val[key] }));
        this.updateValue(weatherParams);
    }

    addData(val: WParams): void{
        this.config = _.merge({}, this.config, { data: val });
        const weatherParams = Object.keys(this.config.data).map(key => ({ name: key, ...this.config.data[key] }));
        this.updateValue(weatherParams);
    }

    updateValue(val: { name: string, long: string, lat: string }[]): void{
        this.errorMessage$.next(null);
        this.valueChange$.next(val);
        this.loading$.next(true);
    }

    setSelected(weather: Weather): void{
        this.selected$.next(weather);
    }

    setErrorMessage(message: string): void{
        this.errorMessage$.next(message);
    }

    private _init(): void{
        this.weathers$ = this.valueChange$.asObservable().pipe(
            exhaustMap(data => {
                return forkJoin(data.map(loc => this.service.getWeather(loc.name, loc.lat, loc.long)))
                    .pipe(
                        tap(weathers => this.selected$.next(weathers[0] as Weather)),
                        finalize(() => this.loading$.next(false))
                    );
        }));
    }
}
