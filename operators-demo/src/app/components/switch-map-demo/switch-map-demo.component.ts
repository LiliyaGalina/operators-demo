import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { catchError, debounceTime, map, of, shareReplay, startWith, switchMap, tap } from 'rxjs';
import { IImagesItem } from 'src/app/models/images-envelope.interface';
import { ImagesLibraryService } from 'src/app/services/images-library.service';

@Component({
  selector: 'app-switch-map-demo',
  templateUrl: './switch-map-demo.component.html',
  styleUrls: ['./switch-map-demo.component.scss']
})
export class SwitchMapDemoComponent {

  private imagesLibraryService = inject(ImagesLibraryService);
  private fb = inject(FormBuilder);

  public form = this.fb.group({
    searchText: this.fb.control<string>(''),
    debounceTimeInMs: this.fb.nonNullable.control<number>(50),
  });

  public imagesSource$ = this.form.controls['debounceTimeInMs'].valueChanges.pipe(
    // starts its work immediately, does not wait until the control updated
    startWith(this.form.getRawValue().debounceTimeInMs), // try to remove
    switchMap(debounceTimeInMs => {
      return this.form.controls['searchText'].valueChanges.pipe(
        //startWith?
        debounceTime(debounceTimeInMs), // try to remove
        // filter?
        switchMap(searchText => {
          // loading
          return this.imagesLibraryService.search(searchText || '').pipe(
            map(collection => collection.collection.items.filter(i => !!i.links?.length)),
            catchError(err => {
              console.error(err);
              return of([]);
            })
          )
        })
      )
    }),
    // shares this subscription between consumers
    shareReplay(1) // try to remove
  );

  public elementInDrawer: IImagesItem | null = null;

}
