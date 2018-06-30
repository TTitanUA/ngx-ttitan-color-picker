import { ElementRef } from '@angular/core';
export declare class NgxTTitanColorPickerDraggerDirective {
    elRef: ElementRef;
    pickerPad: number;
    constructor(elRef: ElementRef);
    setPosition(x: number, y: number, direction: string): void;
}
