import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  BehaviorSubject,
  catchError,
  defaultIfEmpty,
  finalize,
  forkJoin,
  interval,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  tap,
  throwError,
  timer,
} from 'rxjs';
import { INearEarthObjectWithOrbitalData } from 'src/app/models/asteroids-envelope.interface';
import { AsteroidsService } from 'src/app/services/asteroids.service';

@Component({
  selector: 'app-fork-join-demo',
  templateUrl: './fork-join-demo.component.html',
  styleUrls: ['./fork-join-demo.component.scss'],
})
export class ForkJoinDemoComponent {
  private asteroidsService = inject(AsteroidsService);
  private snackBar = inject(MatSnackBar);

  public isLoading$ = new BehaviorSubject<boolean>(true);

  public asteroidsSource$: Observable<INearEarthObjectWithOrbitalData[]> = this.asteroidsService.findClosestToToday().pipe(
    map((data) => Object.values(data.near_earth_objects).flat()),
    catchError((err) => {
      this.snackBar.open(err);
      return of([]);
    }),
    switchMap((nearEarthObjects) => {
      const neoRequests = nearEarthObjects.map(n => this.asteroidsService.findSmallBodyByNeoId(n.neo_reference_id));
      const emptyRequests = [] as Observable<INearEarthObjectWithOrbitalData>[];
      const fakeRequest = interval(500).pipe(map(_ => ({} as unknown as INearEarthObjectWithOrbitalData)));

      const forkJoinTarget = [...neoRequests.slice(0, 2)];
      return forkJoin(forkJoinTarget).pipe(
        defaultIfEmpty(nearEarthObjects), // if collection was empty fork join completes immediately
        catchError((err) => {
          this.snackBar.open(err);
          return of(nearEarthObjects);
        }),
        finalize(() => {
          this.isLoading$.next(false);
        })
      );
    }),
    shareReplay(1),
    tap(data => {
      console.log('%c Data log: ', 'background: yellow;');
      console.log(data);
    })
  );
}
