import { Component } from '@angular/core';
import { filter, finalize, interval, map, of, scan, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
})
export class SandboxComponent {
  public source$ = interval(500).pipe(
    map(index => index + 1),
    map(value => ({ value, color: this.generateRandomColor() })),
    scan((arr, n) => [...arr, n], new Array<{ value: any; color: string }>()),
  );

  private generateRandomColor(): string {
    var trans = '0.3'; // 30% transparency
    var color = 'rgba(';
    for (var i = 0; i < 3; i++) {
      color += Math.floor(Math.random() * 255) + ',';
    }
    color += trans + ')';
    return color;
  }

  private fromCharCode(num: number): string {
    return String.fromCharCode(33 + num);
  }
}
