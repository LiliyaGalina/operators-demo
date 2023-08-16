import { Directive, ElementRef, Input } from '@angular/core';
import { delay, Observable, Subscription, tap } from 'rxjs';

@Directive({
  selector: '[appAutoscroll]',
})
export class AutoscrollDirective {
  private delayMS = 100;
  private subscription: Subscription | undefined;
  @Input('appAutoscroll') stream$: Observable<any> | undefined;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    // todo memory leak
    this.subscription = this.stream$?.pipe(
        delay(this.delayMS || 0),
        tap(_ => {
          this.el.nativeElement.scrollTo({ left: (this.el.nativeElement.scrollLeft + 150), behavior: 'smooth' });
        })
      )
      .subscribe();
  }
}
