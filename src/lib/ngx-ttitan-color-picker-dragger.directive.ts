import {Directive, ElementRef, HostBinding, Input} from '@angular/core';

@Directive({
  selector: '[libNgxTTitanColorPickerDragger]'
})
export class NgxTTitanColorPickerDraggerDirective {

  @Input('pickerPad') public pickerPad: number = 0;

  constructor(public elRef: ElementRef) { }


  public setPosition(x: number, y: number, direction: string): void {

    let rect = this.elRef.nativeElement.getBoundingClientRect();

    if(direction == 'vertical' || direction == 'both') {
      this.elRef.nativeElement.style.top = Math.round((y - ((rect.height) / 2))) + 'px';
    }
    if(direction == 'horizontal' || direction == 'both') {
      this.elRef.nativeElement.style.left = Math.round((x - ((rect.width) / 2))) + 'px';
    }

  }

}
