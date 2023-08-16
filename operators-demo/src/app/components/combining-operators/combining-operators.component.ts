import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  combineLatest,
  interval,
  map,
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

  private curiosity = this.buildRoverChannel('curiosity', 7345, '2016-6-3', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0dBkV46uJkDLYJPMxedDV_Zlm9bsIZlIHQvdd8Adyzk7AgcPeLY5ZLlFqRFlmOp3J5JI&usqp=CAU');
  private opportunity = this.buildRoverChannel('opportunity', 5234, '2016-6-3', 'https://ychef.files.bbci.co.uk/976x549/p0dh43zd.jpg');
  private spirit = this.buildRoverChannel('spirit', 1256, '2006-6-3', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/KSC-03PD-0786.jpg/260px-KSC-03PD-0786.jpg');

  public rovers = [this.curiosity, this.opportunity, this.spirit];

  private buildRoverChannel(name: string, intervalMs: number, dateOfObservation: string, coverImg: string) {
    const stream$ = this.roverPhotosService
    .requestPhotosFromRover(name, dateOfObservation)
    .pipe(
      switchMap((photos) =>
        interval(intervalMs).pipe(
          take(photos.length),
          map((v, i) => photos[i])
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
