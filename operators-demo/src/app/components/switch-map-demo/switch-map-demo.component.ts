import { Component, inject } from '@angular/core';
import { tap } from 'rxjs';
import { ImagesLibraryService } from 'src/app/services/images-library.service';

@Component({
  selector: 'app-switch-map-demo',
  templateUrl: './switch-map-demo.component.html',
  styleUrls: ['./switch-map-demo.component.scss']
})
export class SwitchMapDemoComponent {

  private imagesLibraryService = inject(ImagesLibraryService);

  constructor() {
    this.imagesLibraryService.list().pipe(
      tap(console.log),
    ).subscribe();

  }

}
