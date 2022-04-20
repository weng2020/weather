import { Inject, Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { WEATHER_CONFIG } from "../weather.component";
import { WeatherConfig } from "../models/weather.model";

@Injectable()
export class WeatherHttpInterceptpor implements HttpInterceptor{

    constructor(@Inject(WEATHER_CONFIG) private config: WeatherConfig){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if( this.isOpenWeatherMapRequest(req) ){

            // If the request is for weather forecast then add the parameter appid in the headers
            req = req.clone({
                url: this.config.url + req.url,
                params: req.params.set('appid', this.config.apiKey)
            });
        }
        return next.handle(req);
    }

    isOpenWeatherMapRequest(req: HttpRequest<any>): boolean{
        return req.url.indexOf('/data/2.5') != -1;
    }

}