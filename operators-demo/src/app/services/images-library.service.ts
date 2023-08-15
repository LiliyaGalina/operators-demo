import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../classes/constants.class';
import { IImagesEnvelope } from '../models/images-envelope.interface';

@Injectable({
  providedIn: 'root'
})
export class ImagesLibraryService {
  private http = inject(HttpClient);

  public search(q: string): Observable<IImagesEnvelope> {
    let url = `https://images-api.nasa.gov/search?q=${q}`;
    return this.http.get<IImagesEnvelope>(url, {
      headers: {
        Authorization: Constants.NASA_API_KEY
      }
    });
  }

}
