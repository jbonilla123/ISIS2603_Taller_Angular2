import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { WeatherDetail } from '../models/weather.model';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private http = inject(HttpClient);
  private apiKey = environment.weatherApiKey;
  private baseUrl = 'https://api.weatherapi.com/v1';

  getWeather(cityName: string): Observable<WeatherDetail> {
    const url = `${this.baseUrl}/current.json?key=${this.apiKey}&q=${cityName}`;
    return this.http.get<any>(url).pipe(
      map(res => ({
        temp_c: res.current.temp_c,
        condition: res.current.condition.text,
        humidity: res.current.humidity
      }))
    );
  }
}