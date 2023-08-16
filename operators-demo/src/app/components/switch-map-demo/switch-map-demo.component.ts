import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, debounceTime, EMPTY, finalize, map, Observable, of, shareReplay, startWith, Subject, switchMap, tap, throwError } from 'rxjs';
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
  private snackBar = inject(MatSnackBar);

  public isLoading$ = new Subject<boolean>();

  public form = this.fb.group({
    searchText: this.fb.control<string>(''),
    debounceTimeInMs: this.fb.nonNullable.control<number>(50),
  });

  public imagesSource$ = this.form.controls['debounceTimeInMs'].valueChanges.pipe(
    // starts its work immediately, does not wait until the control updated
    startWith(this.form.getRawValue().debounceTimeInMs), // try to remove
    switchMap(debounceTimeInMs => {
      return this.form.controls['searchText'].valueChanges.pipe(
        // debounce of search text input
        debounceTime(debounceTimeInMs), // try to remove
        switchMap(searchText => {

          this.isLoading$.next(true);
          return this.imagesLibraryService.search(searchText || '').pipe(
            map(collection => collection.collection.items.filter(i => !!i.links?.length)),
            catchError(err => {
              this.snackBar.open(err.error.reason);
              //return of([]);
              // explore alternatives
              //return throwError(err.error.reason);
              return EMPTY;
            }),
            finalize(() => this.isLoading$.next(false))
          )
        })
      )
    }),
    // shares this subscription between consumers
    shareReplay(1), // try to remove
    tap(data => {
      console.log('%c Data log: ', 'background: pink;');
      console.log(data);
    })
  );

  public elementInDrawer: IImagesItem | null = null;

}
