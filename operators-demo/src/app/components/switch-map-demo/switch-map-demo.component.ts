import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime, map, startWith, switchMap, tap } from 'rxjs';
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
    debounceTimeInMs: this.fb.nonNullable.control<number>(200),
  });

  public imagesSource$ = this.form.controls['debounceTimeInMs'].valueChanges.pipe(
    // starts its work immediately, does not wait until the control updated
    startWith(this.form.getRawValue().debounceTimeInMs),
    switchMap(debounceTimeInMs => {
      return this.form.controls['searchText'].valueChanges.pipe(
        //startWith?
        debounceTime(debounceTimeInMs),
        // filter?
        switchMap(searchText => {
          // loading
          return this.imagesLibraryService.search(searchText || '').pipe(
            map(collection => collection.collection.items),
            // catcherror
          )
        })
      )
    }),
    tap(console.log)
  );

}
