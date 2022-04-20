import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { WeatherService } from "../services/weather.service";

@Injectable()
export class WeatherHttpInterceptpor implements HttpInterceptor{

    /**
     * constructor
     * @param {WeatherService} weatherConfigService 
     */
    constructor(private weatherConfigService: WeatherService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if( this.isWeatherRequest(req) ){
            const config = this.weatherConfigService.config;

            // If the request is for weather forecast then add the parameter appid in the headers
            req = req.clone({
                url: config.url + req.url,
                params: req.params.set('appid', config.apiKey)
            });
        }
        return next.handle(req);
    }

    isWeatherRequest(req: HttpRequest<any>): boolean{
        return this.weatherConfigService.config.allowedEndpoints.some(u => req.url.indexOf(u) != -1);
    }

}