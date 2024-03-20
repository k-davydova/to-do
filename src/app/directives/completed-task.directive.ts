import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appCompletedTask]',
  standalone: true,
})
export class CompletedTaskDirective implements OnInit {
  @Input('appCompletedTask') isChecked!: boolean;
  // @HostBinding('class.disabled') isDisabled = false;

  private paragraphEl!: HTMLElement;

  constructor(private elRef: ElementRef) {
    // this.taskTitle = el
  }

  ngOnInit(): void {
    this.toggleDisabledClass()
  }

  private toggleDisabledClass() {
    this.paragraphEl = this.elRef.nativeElement.querySelector('.task__title');

    if (this.paragraphEl && this.isChecked) {
      this.paragraphEl.classList.add('disabled');
    }
  }
}
