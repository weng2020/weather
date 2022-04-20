import { ModuleWithProviders, NgModule } from "@angular/core";
import { WeatherConfig } from "./models/weather.model";
import { OpenWeatherMapService } from "./services/openweathermap.service";
import { WeatherService } from "./services/weather.service";
import { WEATHER_CONFIG, WEATHER_SERVICE } from "./weather.component";
import { WeatherModule } from "./weather.module";

@NgModule()
export class WeatherConfigModule{

    static forRoot(config: WeatherConfig): ModuleWithProviders<WeatherModule>{
        return {
            ngModule: WeatherModule,
            providers: [
                {
                    provide: WEATHER_CONFIG,
                    useValue: config
                },
                {
                    // We use OpenWeatherMapService by default
                    provide: WEATHER_SERVICE,
                    useClass: OpenWeatherMapService
                },
                WeatherService
            ]
        }
    }
}