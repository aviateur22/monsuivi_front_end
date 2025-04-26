import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[swipeLeft]',
  standalone: true
})
export class SwipeLeftDirective {

  private isSwiped: boolean = false;
  private initialPosition = 0;

  constructor(private _el: ElementRef, private _renderer: Renderer2) { }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    // Réinitialise la position de l'élément
    this.initialPosition = event.touches[0].clientX;

    if (this.isSwiped) {
      this.resetPosition();
    }
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    const touchMove = event.touches[0];
    const currentX = touchMove.clientX;
    const deltaX = currentX - this.initialPosition;

    // Swipe vers la gauche
    if (deltaX < 0) {
      this.translateElement(deltaX);
    }
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    const touchEnd = event.changedTouches[0];
    const finalPosition = touchEnd.clientX;

    if (finalPosition < this.initialPosition - 100) {
      this.swipeLeft();
    } else {
      this.resetPosition();
    }
  }

  private translateElement(offset: number): void {
    this._renderer.setStyle(this._el.nativeElement, 'transition', 'none');
    this._renderer.setStyle(this._el.nativeElement, 'transform', `translateX(${offset}px)`);
  }

  private swipeLeft(): void {
    this._renderer.setStyle(this._el.nativeElement, 'transition', 'transform 0.5s ease-in-out');
    this._renderer.setStyle(this._el.nativeElement, 'transform', 'translateX(-100px)');
    this.isSwiped = true;

    // Hold for 5 seconds, then reset
    setTimeout(() => {
      this.resetPosition();
    }, 5000);
  }

  private resetPosition(): void {
    this._renderer.setStyle(this._el.nativeElement, 'transition', 'transform 0.5s ease-in-out');
    this._renderer.setStyle(this._el.nativeElement, 'transform', 'translateX(0)');
    this.isSwiped = false;
  }

}
