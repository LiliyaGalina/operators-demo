import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Constants } from '../classes/constants.class';
import { IRoverPhoto, IRoverPhotosEnvelope } from '../models/rover-photos-envelope.interface';

@Injectable({
  providedIn: 'root'
})
export class RoverPhotosService {
  private http = inject(HttpClient);

  public requestPhotosFromRover(name: string, earthDate: string | null): Observable<IRoverPhoto[]> {
    if (!earthDate) {
      earthDate = new Date().toISOString().split('T')[0];
    }
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${name}/photos?earth_date=${earthDate}&api_key=${Constants.NASA_API_KEY}`;
    return this.http.get<IRoverPhotosEnvelope>(url).pipe(map(arr => arr.photos));
  }
}
