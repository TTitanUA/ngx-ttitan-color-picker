import {
  Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnChanges, Output,
  SimpleChanges
} from '@angular/core';
import {NgxTTitanColorPickerService} from "./ngx-ttitan-color-picker.service";

@Directive({
  selector: '[libNgxTTitanColorPickerInput]',
  exportAs: 'libNgxTTitanColorPickerInput'
})
export class NgxTTitanColorPickerInputDirective {

  @Input('format') format: string = 'hex6';
  @Output('inputChange') public inputChange: EventEmitter<string> = new EventEmitter<string>();


  @HostListener('keyup') keyUp() {
    this.inputValidate();
  }
  @HostListener('change') change() {
    this.inputValidate();
  }


  constructor(
    public el: ElementRef,
    public colorPickerService: NgxTTitanColorPickerService
  ) { }


  setInputValue(value: string) {
    (<HTMLInputElement>this.el.nativeElement).value = value;
  }


  inputValidate() {
    let res = this.colorPickerService.validateColorFormat(
      this.el.nativeElement.value,
      this.format
    );

    if(res !== 'notValid') {
      (<HTMLInputElement>this.el.nativeElement).value = res;
      this.inputChange.emit(res);
    }

  }

}
