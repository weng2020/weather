import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'weather-icon',
  templateUrl: './weather-icon.component.html',
  styleUrls: ['./weather-icon.component.scss']
})
export class WeatherIconComponent implements OnInit {

  @Input() height: number = 80;
  @Input() width: number = 80;
  @Input() icon: 'clear_day' | 'clear_night' | 'cloud' | 'rain' | 'snow' | 'storm' | 'wind';

  @HostBinding('style.height') get getHeight(){
    return `${this.height}px`;
  }
  @HostBinding('style.width') get getWidth(){
    return `${this.width}px`;
  }

  get imgUrl(){
    return `/assets/images/weather/${this.icon}.svg`
  }

  constructor() { }

  ngOnInit(): void {
  }

}
