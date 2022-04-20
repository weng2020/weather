import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { weatherConfig } from "./config";

@Injectable()
export class FHttpInterceptor implements HttpInterceptor{
    
    serviceUrl = environment.serviceUrl;

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        // If request is not for weather forecast use the environment serviceUrl, but since this is just an example
        // the environment serviceUrl is blank

        if( !this.isWeatherRequest(req) ){
            req = req.clone({
                url: this.serviceUrl + req.url
            });
        }

        return next.handle(req);
    }

    isWeatherRequest(req: HttpRequest<any>): boolean{
        return req.url.indexOf(weatherConfig.url) != -1;
    }

}