import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';

@Directive({
  selector: '[appAutoscroll]',
})
export class AutoscrollDirective implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;
  @Input('appAutoscroll') stream$: Observable<any> | undefined;
  @Input() isVertical = false;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.subscription = this.stream$?.pipe(
        tap(_ => {
          if (this.isVertical) {
            this.el.nativeElement.scrollTo({ top: (this.el.nativeElement.scrollHeight + 400), behavior: 'smooth' });
          } else {
            this.el.nativeElement.scrollTo({ left: (this.el.nativeElement.scrollLeft + 150), behavior: 'smooth' });
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
