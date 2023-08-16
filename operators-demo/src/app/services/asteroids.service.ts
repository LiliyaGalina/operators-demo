import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../classes/constants.class';
import { IAsteroidsEnvelope, INearEarthObjectWithOrbitalData } from '../models/asteroids-envelope.interface';

@Injectable({
  providedIn: 'root',
})
export class AsteroidsService {
  private http = inject(HttpClient);

  public findClosestToToday(days?: number): Observable<IAsteroidsEnvelope> {
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
    return this.http.get<IAsteroidsEnvelope>(url);
  }

  public findSmallBodyByNeoId(neo_id: string): Observable<INearEarthObjectWithOrbitalData> {
    const url = `https://api.nasa.gov/neo/rest/v1/neo/${neo_id}?api_key=${Constants.NASA_API_KEY}`;
    return this.http.get<INearEarthObjectWithOrbitalData>(url);
  }
}
