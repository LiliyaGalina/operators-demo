import { Component, OnInit } from '@angular/core';
import { interval, scan, shareReplay } from 'rxjs';

@Component({
  selector: 'app-combining-operators',
  templateUrl: './combining-operators.component.html',
  styleUrls: ['./combining-operators.component.scss']
})
export class CombiningOperatorsComponent implements OnInit {

  private curiosity$ = interval(867).pipe(shareReplay(1));
  private opportunity$ = interval(3542).pipe(shareReplay(1));
  private spirit$ = interval(5443).pipe(shareReplay(1));

  public curiosityPhotoStream$ = this.curiosity$.pipe(scan((arr, n) => [...arr, n], [] as any[]));
  public opportunityPhotoStream$ = this.opportunity$.pipe(scan((arr, n) => [...arr, n], [] as any[]));
  public spiritPhotoStream$ = this.spirit$.pipe(scan((arr, n) => [...arr, n], [] as any[]));

  constructor() { }

  ngOnInit(): void {
  }

}
