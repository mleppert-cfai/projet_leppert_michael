import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appInvalidInput]'
})
export class InvalidInputDirective {

  constructor(private el: ElementRef) { }

  @Input() input : string = "none";

  @HostListener('change') onChange() {
    console.log(this.input);
    console.log(this.validateInput(this.input, new RegExp("^[A-Za-zÀ-ÖØ-öø-ÿ\-]+$")) );
  }

  validateInput(input : string, regex : RegExp) : void {    
    if(! regex.test(input)) {
      this.el.nativeElement.hidden = false;
    }
    else {
      this.el.nativeElement.hidden = false;
    }
  }
}
