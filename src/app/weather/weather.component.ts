import { Component, Inject, InjectionToken, OnInit, Optional } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { data } from '../services/weather.mock-data';
import { IWeatherService } from './models/weather-service.model';
import { Weather, WeatherConfig } from './models/weather.model';

export const WEATHER_CONFIG = new InjectionToken('weatherConfig');
export const WEATHER_SERVICE = new InjectionToken<IWeatherService<Weather>>('weatherService');

@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  weathers$: Observable<Weather[]>;
  selectedCity: Weather;

  constructor(@Inject(WEATHER_CONFIG) private config: WeatherConfig,
              @Optional() @Inject(WEATHER_SERVICE) private service: IWeatherService<Weather>) { }

  ngOnInit(): void {

    if( !this.service ){
      console.error('No service');
      return;
    }

    const weatherParams = Object.keys(this.config.data).map(key => ({ name: key, ...this.config.data[key] }));
    
    this.weathers$ = forkJoin(weatherParams.map(loc => this.service.getWeather(loc.name, loc.lat, loc.long)))
      .pipe(tap(w => {
        this.selectedCity = w[0];
        console.log(w)
      }));

    // Sometimes the request limit is maxed so we use mock data
    // this.weathers$ = of(data);
    // this.weathers$.subscribe(res => {
    //   console.log(res)
    //   this.selectedCity = res[0];
    // });
    
  }

  setSelected(weather: Weather): void{
    this.selectedCity = weather;
  }

}
