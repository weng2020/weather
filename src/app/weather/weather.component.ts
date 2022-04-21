import { Component, InjectionToken, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ErrorDialogComponent } from './dialog/error-dialog/error-dialog.component';
import { IWeatherService } from './models/weather-service.model';
import { Weather } from './models/weather.model';
import { WeatherService } from './services/weather.service';

export const WEATHER_CONFIG = new InjectionToken('weatherConfig');
export const WEATHER_SERVICE = new InjectionToken<IWeatherService<Weather>>('weatherService');

@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {

  weathers$: Observable<Weather[]>;
  selected$: Observable<Weather>;
  loading$: Observable<boolean>;
  subscription: Subscription;

  /**
   * constructor
   * @param {WeatherService} weatherService 
   * @param {MatDialog} dialog 
   */
  constructor(private weatherService: WeatherService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.weathers$ =this.weatherService.weathers$;
    this.selected$ = this.weatherService.selected$;
    this.loading$ = this.weatherService.loading$;

    this.subscription = this.weatherService.errorMessage$.pipe(
      switchMap(errorMsg => this.dialog.open(ErrorDialogComponent, 
        { width: '400px', data: errorMsg, panelClass: 'weather-error-dialog' })
        .afterClosed())
    ).subscribe();
    
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  setSelected(weather: Weather): void{
    this.weatherService.setSelected(weather);
  }

}
