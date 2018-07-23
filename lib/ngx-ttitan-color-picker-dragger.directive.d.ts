import { ElementRef } from '@angular/core';
import { ColorPickerComponent } from "./ngx-ttitan-color-picker.interface";
export declare class NgxTTitanColorPickerDraggerDirective {
    elRef: ElementRef;
    pickerPad: number;
    _context: ColorPickerComponent;
    constructor(elRef: ElementRef);
    setPosition(x: number, y: number, direction: string): void;
}
