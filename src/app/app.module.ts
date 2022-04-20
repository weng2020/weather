import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { weatherConfig } from './config';
import { FHttpInterceptor } from './http-interceptor';
import { WeatherService } from './services/weather.service';
import { WeatherConfigModule } from './weather/weather-config.module';
import { WEATHER_SERVICE } from './weather/weather.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    WeatherConfigModule.forRoot(weatherConfig)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
