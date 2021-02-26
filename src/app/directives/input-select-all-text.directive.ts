import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputSelectAllText]'
})
export class InputSelectAllTextDirective {

  constructor(private el: ElementRef) { }

  @HostListener('click', ['$event'])
  clickEvent(event: MouseEvent) {
    this.el.nativeElement.setSelectionRange(0, this.el.nativeElement.value.length);
  }
}
