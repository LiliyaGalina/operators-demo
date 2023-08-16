import { Component } from '@angular/core';
import { filter, interval, map, scan, tap } from 'rxjs';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
})
export class SandboxComponent {
  public source$ = interval(500).pipe(
    map((v, index) => index + 1),
    map((v) => ({ value: v, color: this.generateRandomColor() })),
    scan((arr, n) => [...arr, n], new Array<{ value: any; color: string }>())
  );

  private generateRandomColor(): string {
    var trans = '0.3'; // 50% transparency
    var color = 'rgba(';
    for (var i = 0; i < 3; i++) {
      color += Math.floor(Math.random() * 255) + ',';
    }
    color += trans + ')';
    debugger;
    return color;
  }

  private fromCharCode(num: number): string {
    return String.fromCharCode(33 + num);
  }
}
