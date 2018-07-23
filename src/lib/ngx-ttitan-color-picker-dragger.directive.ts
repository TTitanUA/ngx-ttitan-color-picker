import {Directive, ElementRef, HostBinding, Input} from '@angular/core';
import {ColorPickerComponent} from "./ngx-ttitan-color-picker.interface";

@Directive({
  selector: '[libNgxTTitanColorPickerDragger]'
})
export class NgxTTitanColorPickerDraggerDirective {

  @Input('pickerPad') public pickerPad: number = 0;
  @Input('context') public _context: ColorPickerComponent;

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
