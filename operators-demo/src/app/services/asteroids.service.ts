import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../classes/constants.class';

@Injectable({
  providedIn: 'root',
})
export class AsteroidsService {
  private http = inject(HttpClient);

  public findClosestToToday(days?: number): Observable<any> {
    const start_date = new Date().toISOString().split('T')[0];
    let end_date = start_date;
    if (days) {
      const endDate = new Date(new Date().setDate(new Date().getDate() + days));
      end_date = endDate.toISOString().split('T')[0];
    }

    const url =
      `https://api.nasa.gov/neo/rest/v1/feed` +
      `?start_date=${start_date}&end_date=${start_date}&api_key=${
        Constants.NASA_API_KEY
      }`;
    return this.http.get<any>(url);
  }
}
