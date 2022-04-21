import { Component, Inject, InjectionToken, OnInit, Optional } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { data } from '../services/weather.mock-data';
import { IWeatherService } from './models/weather-service.model';
import { Weather, WeatherConfig } from './models/weather.model';
import { WeatherService } from './services/weather.service';

export const WEATHER_CONFIG = new InjectionToken('weatherConfig');
export const WEATHER_SERVICE = new InjectionToken<IWeatherService<Weather>>('weatherService');

@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  weathers$: Observable<Weather[]>;
  selected$: Observable<Weather>;
  loading$: Observable<boolean>;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weathers$ =this.weatherService.weathers$;
    this.selected$ = this.weatherService.selected$;
    this.loading$ = this.weatherService.loading$;

    this.weatherService.errorMessage$.subscribe(res => console.log(res))

    setTimeout(() => {
      this.weatherService.setValue({
        "Philippines": {
          lat: '12.880',
          long: '122'
        }
      })
    }, 5000);
    // If service is available
    // if( this.service ){
    //   const keys = Object.keys(this.config.data);
     
    //   if( keys.length > 0 ){
    //     const weatherParams = keys.map(key => ({ name: key, ...this.config.data[key] }));
    
    //     this.weathers$ = forkJoin(weatherParams.map(loc => this.service.getWeather(loc.name, loc.lat, loc.long)))
    //       .pipe(
    //         tap(w => {
    //           this.selectedCity = w[0];
    //         console.log(w)
    //       }));
    //   }
    // }

    // Sometimes the request limit is maxed out so we use mock data
    // this.weathers$ = of(data);
    // this.weathers$.subscribe(res => {
    //   console.log(res)
    //   this.selectedCity = res[0];
    // });
    
  }

  setSelected(weather: Weather): void{
    this.weatherService.setSelected(weather);
  }

}
