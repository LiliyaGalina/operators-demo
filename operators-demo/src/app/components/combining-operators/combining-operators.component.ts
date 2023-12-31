import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  catchError,
  combineLatest,
  defaultIfEmpty,
  EMPTY,
  endWith,
  ignoreElements,
  interval,
  map,
  merge,
  Observable,
  of,
  scan,
  shareReplay,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { RoverPhotosService } from 'src/app/services/rover-photos.service';

type RoverPhoto = {
  roverIndex: number;
  photo: string;
}

type RoverPhotoInTimeScale = {
  data: RoverPhoto | RoverPhoto[];
  timeElapsed: number;
}

@Component({
  selector: 'app-combining-operators',
  templateUrl: './combining-operators.component.html',
  styleUrls: ['./combining-operators.component.scss'],
})
export class CombiningOperatorsComponent {

  @ViewChild('combineLatestMonitor') combineLatestMonitor!: ElementRef;
  @ViewChild('mergeMonitor') mergeMonitor!: ElementRef;

  private roverPhotosService = inject(RoverPhotosService);
  private snackBar = inject(MatSnackBar);
  private now = new Date();

  private curiosity = this.buildRoverChannel('curiosity', 3345, '2016-6-3', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0dBkV46uJkDLYJPMxedDV_Zlm9bsIZlIHQvdd8Adyzk7AgcPeLY5ZLlFqRFlmOp3J5JI&usqp=CAU');
  private opportunity = this.buildRoverChannel('opportunity', 5234, '2016-6-3', 'https://ychef.files.bbci.co.uk/976x549/p0dh43zd.jpg');
  private spirit = this.buildRoverChannel('spirit', 2256, '2006-6-3', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/KSC-03PD-0786.jpg/260px-KSC-03PD-0786.jpg');

  public rovers = [this.curiosity, this.opportunity, this.spirit];
  private roverStreams: Observable<RoverPhoto>[] = this.rovers.map((rover, roverIndex) => rover.stream$
    .pipe(map(photo => ({ roverIndex, photo: photo.img_src }))));

  public merge$ = merge(...this.roverStreams).pipe(
    map(data => ({data, timeElapsed: new Date().getTime() - this.now.getTime()})),
    scan((arr, n) => [...arr, n], new Array<RoverPhotoInTimeScale>()),
    catchError(err => {
      const message = 'Merge monitor observed error: ' + err;
      this.snackBar.open(message);
      return throwError(message)
    }),
    shareReplay(1)
  );

  public combineLatest$ = combineLatest(this.roverStreams).pipe(
    defaultIfEmpty(new Array<RoverPhoto>()),
    map(data => ({data, timeElapsed: new Date().getTime() - this.now.getTime()} as RoverPhotoInTimeScale)),
    scan((arr, n) => [...arr, n], new Array<RoverPhotoInTimeScale>()),
    catchError(err => {
      const message = 'CombineLatest monitor observed error: ' + err;
      this.snackBar.open(message);
      return throwError(message)
    }),
    shareReplay(1)
  );

  public combineLatestErrors$ = this.combineLatest$.pipe(
    ignoreElements(),
    catchError(err => of(true))
  );

  public combineLatestFinalize$ = this.combineLatest$.pipe(
    ignoreElements(),
    catchError(err => EMPTY),
    endWith(true)
  );

  public mergeErrors$ = this.merge$.pipe(
    ignoreElements(),
    catchError(err => of(true))
  );

  public mergeFinalize$ = this.merge$.pipe(
    ignoreElements(),
    catchError(err => EMPTY),
    endWith(true)
  );

  private buildRoverChannel(name: string, intervalMs: number, dateOfObservation: string | null, coverImg: string) {
    const stream$ = this.roverPhotosService
    .requestPhotosFromRover(name, dateOfObservation)
    .pipe(
      switchMap((photos) =>
        interval(intervalMs).pipe(
          take(photos.length),
          map((val, i) => photos[i])
        )
      ),
      shareReplay(1)
    );
    const photoStream$ = stream$.pipe(
      scan((arr, n) => [...arr, n.img_src], [] as string[]),
      shareReplay(1)
    )
    return { name, stream$, photoStream$, coverImg }
  }
}
