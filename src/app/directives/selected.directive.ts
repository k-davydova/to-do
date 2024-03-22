import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appSelected]',
  standalone: true,
})
export class SelectedDirective {
  private clicked: boolean = false;

  constructor(private elRef: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.setBackground('#eff3fe');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBackground('');
  }

  private setBackground(color: string) {
    this.elRef.nativeElement.style.backgroundColor = color;
  }
}
