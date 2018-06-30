import { ElementRef, EventEmitter } from '@angular/core';
import { NgxTTitanColorPickerService } from "./ngx-ttitan-color-picker.service";
export declare class NgxTTitanColorPickerInputDirective {
    el: ElementRef;
    colorPickerService: NgxTTitanColorPickerService;
    format: string;
    inputChange: EventEmitter<string>;
    keyUp(): void;
    change(): void;
    constructor(el: ElementRef, colorPickerService: NgxTTitanColorPickerService);
    setInputValue(value: string): void;
    inputValidate(): void;
}
