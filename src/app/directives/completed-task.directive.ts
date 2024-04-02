import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCompleted]',
  standalone: true,
})
export class CompletedTaskDirective implements OnInit {
  @Input('appCompleted') isChecked!: boolean;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (this.isChecked) {
      this.renderer.addClass(
        this.elRef.nativeElement.querySelector('.task__title'),
        'disabled'
      );
    }
  }
}
