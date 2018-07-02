import { CustomPercent } from "./ngx-ttitan-color-picker-selector.directive";
import { NgxTTitanColorPickerComponent } from "./ngx-ttitan-color-picker.component";
import { Observable } from "rxjs/index";
export interface HSVA {
    hue: number;
    saturation: number;
    value: number;
    alpha: number;
}
export interface Palette {
    name: string;
    id: string;
    colors: Array<string>;
}
export declare class NgxTTitanColorPickerService {
    pickerList: Array<string>;
    pallets: Array<Palette>;
    mouseMoveObservable: Observable<MouseEvent>;
    mouseUpObservable: Observable<MouseEvent>;
    constructor();
    saturationChange(percent: CustomPercent, pickerComponent: NgxTTitanColorPickerComponent): void;
    hueChange(percent: CustomPercent, pickerComponent: NgxTTitanColorPickerComponent): void;
    alphaChange(percent: CustomPercent, pickerComponent: NgxTTitanColorPickerComponent): void;
    dataToColor(pickerComponent: NgxTTitanColorPickerComponent): void;
    colorToData(color: string, pickerComponent: NgxTTitanColorPickerComponent): void;
    getPickerUuid(): string;
    detectColorType(color: string): string;
    fillValuesFromHsvaArr(hsvaArr: Array<number>, pickerComponent: NgxTTitanColorPickerComponent): void;
    parseRgbaColor(color: any, pickerComponent: NgxTTitanColorPickerComponent): void;
    parseRgbColor(color: any, pickerComponent: NgxTTitanColorPickerComponent): void;
    parseHslaColor(color: any, pickerComponent: NgxTTitanColorPickerComponent): void;
    parseHslColor(color: any, pickerComponent: NgxTTitanColorPickerComponent): void;
    parseHexColor(color: any, pickerComponent: NgxTTitanColorPickerComponent): void;
    hsvaToRgba(H: any, S: any, V: any, A: any): Array<number>;
    hsvaToRgbaString(H: any, S: any, V: any, A: any, showAlpha?: boolean): string;
    rgbaToHsva(r: any, g: any, b: any, a: any): Array<number>;
    hsvaToHsla(h: any, s: any, v: any, a: any): Array<number>;
    hslaToHsva(h: any, s: any, l: any, a: any): Array<number>;
    hexToHsva(hex: string): Array<number>;
    hsvaToHex(H: any, S: any, V: any, A: any, showAlpha?: boolean): string;
    validateColorFormat(value: string, format: string): string;
    validateHexFormat(value: string, alpha?: boolean): string;
    validateRgbaFormat(value: string, alpha?: boolean): string;
    prepareReturnColor(hsva: HSVA, format: string): string;
    preparePickerPallets(availPallets: Array<string>, customPallets: Array<Palette>, pickerComponent: NgxTTitanColorPickerComponent): void;
    fillBasePallets(): void;
}
