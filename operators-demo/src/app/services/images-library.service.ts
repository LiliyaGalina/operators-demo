import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IImagesEnvelope } from '../models/images-envelope.interface';

@Injectable({
  providedIn: 'root'
})
export class ImagesLibraryService {

  constructor(private http: HttpClient) { }

  public list(q?: string): Observable<IImagesEnvelope> {
    let url = 'https://images-api.nasa.go/search';
    if (q) {
      url += `?q=${q}`;
    }

    return this.http.get<IImagesEnvelope>(url);
  }

}
