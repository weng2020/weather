import { ModuleWithProviders, NgModule } from "@angular/core";
import { WeatherConfig } from "./models/weather.model";
import { WEATHER_CONFIG } from "./weather.component";
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
                }
            ]
        }
    }
}