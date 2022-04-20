export class WeatherUtil{

    static getIcon(code: number, dt: any){
        if( code >= 200 && code < 233 ){
            return 'storm';
        }else if( ( code  >= 300 && code  < 322 ) ||  (code >= 500 && code < 532 )){
            return 'rain';
        }else if( code >= 600 && code < 623 ){
            return 'snow';
        }else if( code > 700 && code < 782 ){
            return 'wind';
        }else if( code > 800 && code < 805 ){
            return 'cloud';
        }else if( code === 800 ){
            const hours = new Date(dt * 1000).getHours();
            if( hours >= 6 && hours < 18 ){
                return 'clear_day';
            }else{
                return 'clear_night';
            }
        }

        return '';
    }
}