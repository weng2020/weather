import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'temperature'
})
export class TemperaturePipe implements PipeTransform{
    
    transform(value: any): string {
        return `${Math.ceil(value)}°`;
    }
} 