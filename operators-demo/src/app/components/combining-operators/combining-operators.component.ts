import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  combineLatest,
  interval,
  map,
  merge,
  scan,
  shareReplay,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { RoverPhotosService } from 'src/app/services/rover-photos.service';

@Component({
  selector: 'app-combining-operators',
  templateUrl: './combining-operators.component.html',
  styleUrls: ['./combining-operators.component.scss'],
})
export class CombiningOperatorsComponent {
  private roverPhotosService = inject(RoverPhotosService);
  private snackBar = inject(MatSnackBar);
  private changeDetectorRef = inject(ChangeDetectorRef);
  private now = new Date();

  private curiosity = this.buildRoverChannel('curiosity', 3345, '2016-6-3', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0dBkV46uJkDLYJPMxedDV_Zlm9bsIZlIHQvdd8Adyzk7AgcPeLY5ZLlFqRFlmOp3J5JI&usqp=CAU');
  private opportunity = this.buildRoverChannel('opportunity', 5234, '2016-6-3', 'https://ychef.files.bbci.co.uk/976x549/p0dh43zd.jpg');
  private spirit = this.buildRoverChannel('spirit', 2256, '2006-6-3', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/KSC-03PD-0786.jpg/260px-KSC-03PD-0786.jpg');

  public rovers = [this.curiosity, this.opportunity, this.spirit];

  public merge$ = merge(
    this.curiosity.stream$.pipe(map((data, i) => ({ roverIndex: 0, data }))),
    this.opportunity.stream$.pipe(map((data, i) => ({ roverIndex: 1, data }))),
    this.spirit.stream$.pipe(map((data, i) => ({ roverIndex: 2, data }))),
  ).pipe(
    map((value: any) => ({...value, timeElapsed: new Date().getTime() - this.now.getTime()})),
    scan((arr, n: any) => [...arr, n], [] as any[]),
    shareReplay(1)
  );

  public combineLatest$ = combineLatest(
    this.curiosity.stream$.pipe(map((data, i) => ({ roverIndex: 0, data}))),
    this.opportunity.stream$.pipe(map((data, i) => ({ roverIndex: 1, data}))),
    this.spirit.stream$.pipe(map((data, i) => ({ roverIndex: 2, data}))),
  ).pipe(
    map((value: [any, any, any]) => value.map(v => ({...v, timeElapsed: new Date().getTime() - this.now.getTime()}))),
    scan((arr, n) => [...arr, ...n], [] as any[]),
    tap( _ => {
      this.changeDetectorRef.markForCheck();
    }),
    shareReplay(1)
  );

  private buildRoverChannel(name: string, intervalMs: number, dateOfObservation: string | null, coverImg: string) {
    const stream$ = this.roverPhotosService
    .requestPhotosFromRover(name, dateOfObservation)
    .pipe(
      switchMap((photos) =>
        interval(intervalMs).pipe(
          take(photos.length),
          map((val, i) => {
            return { photo: photos[i], timeMs: val * intervalMs };
          })
        )
      ),
      shareReplay(1)
    );
    const photoStream$ = stream$.pipe(
      scan((arr, n) => [...arr, n], [] as any[]),
      shareReplay(1)
    )
    return { name, stream$, photoStream$, coverImg }
  }

}
