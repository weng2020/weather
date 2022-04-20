import { Component, Input, OnInit } from '@angular/core';
import { Weather } from '../models/weather.model';

@Component({
  selector: 'weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.scss']
})
export class WeatherItemComponent implements OnInit {

  @Input() data: Weather;

  constructor() { }

  ngOnInit(): void {
  }

}
