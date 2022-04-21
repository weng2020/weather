import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule  } from "@angular/core";
import { NextBtnDirective } from "./directives/next-btn.directive";
import { PrevButtonDirective } from "./directives/prev-btn.directive";
import { TemperaturePipe } from "./pipes/temperature.pipe";
import { WeatherHttpInterceptpor } from "./utils/http-interceptor";
import { WeatherIconComponent } from "./weather-icon/weather-icon.component";
import { WeatherItemComponent } from "./weather-item/weather-item.component";
import { WeatherComponent } from "./weather.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ErrorDialogComponent } from "./dialog/error-dialog/error-dialog.component";

@NgModule({
    declarations: [
        WeatherComponent,
        WeatherItemComponent,
        WeatherIconComponent,
        PrevButtonDirective,
        NextBtnDirective,
        TemperaturePipe,
        ErrorDialogComponent
    ],
    exports: [
        WeatherComponent,
        WeatherItemComponent,
        WeatherIconComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        MatDialogModule,
        MatProgressSpinnerModule
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