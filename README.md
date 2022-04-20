# Weather App Exercise

This app is for demo only 

## The Task

Using https://openweathermap.org/api  build a singular page web app which shows the current weather in the following cities: London, Paris, New York, Los Angeles, and Tokyo.

Each city should display:
- Temperature
- Humidity
- Chance of Rain

## Requirements

Create an online source control (Github, Bitbucket, etc.) project where this code will be hosted.
Create an Angular app using the Angular CLI.
Focus on code design - think in terms of adaptability and extensibility.
Handle errors appropriately.

## Usage
import the module with config

 ``` WeatherConfigModule.forRoot({
    apiKey: {{ YOUR APPID in the openweathermap }},
    url: 'https://api.openweathermap.org/data/2.5',
    data: {
        'London': {  
            long: '-0.1257',
            lat: '51.5085'
        },
        'Paris': {  
            lat: '48.8566',
            long: '2.3522'
        },
        'New York': {
            lat: '40.7306',
            long: '-73.9352'
        },
        'Los Angeles': {
            lat: '34.0522',
            long: '-118.2437'
        },
        'Tokyo': {
            lat: '35.6762',
            long: '139.6503'
        }
    }
 })
 ```


## TODOS - Not yet done, partial commit
 1. Make responsive
 2. Add animations
 3. Add loading screen
 4. Use NgRx alternative(extra)
 5. Clean code/Refactor
