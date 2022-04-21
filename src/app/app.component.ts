import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather/services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'weather';

  constructor(private weatherService: WeatherService){

  }

  ngOnInit(): void {
      this.weatherService.weathers$.subscribe(res => console.log(res))
  }
}
