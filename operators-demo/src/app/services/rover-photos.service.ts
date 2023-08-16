import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Constants } from '../classes/constants.class';

@Injectable({
  providedIn: 'root'
})
export class RoverPhotosService {
  private http = inject(HttpClient);

  public requestPhotosFromRover(name: string, earthDate: string | null): Observable<any> {
    if (!earthDate) {
      earthDate = new Date().toISOString().split('T')[0];
    }
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${name}/photos?earth_date=${earthDate}&api_key=${Constants.NASA_API_KEY}`;
    return this.http.get<any>(url).pipe(map(arr => arr.photos.map((x: { img_src: any; }) => x.img_src)));
  }
}
