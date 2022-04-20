import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule  } from "@angular/core";
import { NextBtnDirective } from "./directives/next-btn.directive";
import { PrevButtonDirective } from "./directives/prev-btn.directive";
import { TemperaturePipe } from "./pipes/temperature.pipe";
import { WeatherHttpInterceptpor } from "./utils/http-interceptor";
import { WeatherItemComponent } from "./weather-item/weather-item.component";
import { WeatherComponent } from "./weather.component";

@NgModule({
    declarations: [
        WeatherComponent,
        WeatherItemComponent,
        PrevButtonDirective,
        NextBtnDirective,
        TemperaturePipe
    ],
    exports: [
        WeatherComponent,
        WeatherItemComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: WeatherHttpInterceptpor,
            multi: true
        }
    ]
})
export class WeatherModule{}