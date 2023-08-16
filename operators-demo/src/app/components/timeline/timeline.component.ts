import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { interval, map, take, tap } from 'rxjs';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit, AfterViewInit {
  @ViewChild('timeline', { static: false, read: ElementRef }) canvas!:
    | ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private images = new Array<HTMLImageElement>();
  private timeStep = 10; // in pixels
  private channelWidth = 100;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.ctx = this.canvas!.nativeElement!.getContext('2d')!;

    const picture = this.drawImage(0, 0,'https://ychef.files.bbci.co.uk/976x549/p0dh43zd.jpg', this.channelWidth);
    this.images.push(picture);

    interval(500)
      .pipe(
        take(40),
        map((_, i) => i),
        tap((index) => {
          this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
          this.images.forEach(picture => {
            debugger;
            this.ctx.drawImage(picture, 100, this.timeStep * index, this.channelWidth, picture.height * (this.channelWidth / picture.width));
          });
        })
      )
      .subscribe();

    // const moveCanvas = (index: number) => () => {
    //   const ctx = this.canvas?.nativeElement.getContext('2d');
    //   if (!ctx) {
    //     return;
    //   }
    //   ctx.translate(0, index * 75);
    // };
    // interval(500)
    //   .pipe(
    //     take(20),
    //     map((_, i) => i),
    //     tap((index) => {
    //       window.requestAnimationFrame(moveCanvas(index));
    //     })
    //   )
    //   .subscribe();
    // window.requestAnimationFrame(() => {
    //   const ctx = this.canvas?.nativeElement.getContext('2d');
    //   if (!ctx) {
    //     return;
    //   }
    //   debugger;
    //   const earth = new Image(200, 200);
    //   earth.src = 'https://ychef.files.bbci.co.uk/976x549/p0dh43zd.jpg';
    //   ctx.drawImage(earth, 20, 20);
    // });
  }

  drawImage(x: number, y: number, src: string, width: number) {
    const picture = new Image();
    picture.src = src;
    const heightScaled = picture.height * (width / picture.width);
    this.ctx.drawImage(picture, x, y, width, heightScaled);
    return  picture;
  }
}
