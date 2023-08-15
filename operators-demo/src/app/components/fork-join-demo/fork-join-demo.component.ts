import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs';
import { AsteroidsService } from 'src/app/services/asteroids.service';

@Component({
  selector: 'app-fork-join-demo',
  templateUrl: './fork-join-demo.component.html',
  styleUrls: ['./fork-join-demo.component.scss']
})
export class ForkJoinDemoComponent {
  private asteroidsService = inject(AsteroidsService);
  private snackBar = inject(MatSnackBar);

  constructor() {
    this.asteroidsService.findClosestToToday().pipe(
      tap(console.log)
    ).subscribe();
  }

}
