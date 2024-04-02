import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { HighlightService } from '../services/highlight.service';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective implements OnInit {
  @Input() appHighlight: string = '';
  firstEl!: Element | null;

  constructor(
    private el: ElementRef,
    private highlightService: HighlightService
  ) {}

  ngOnInit(): void {
    this.firstEl = document.querySelector('.project__item:first-child');

    if (this.firstEl === this.el.nativeElement) {
      this.firstEl?.classList.add('highlight');
    }
  }

  @HostListener('click') onClick() {
    if (this.appHighlight === 'project') {
      this.firstEl?.classList.remove('highlight');
      this.highlightService.setProjectSelection(this.el.nativeElement);
    }

    if (this.appHighlight === 'task') {
      this.highlightService.setTaskSelection(this.el.nativeElement);
    }
  }
}
