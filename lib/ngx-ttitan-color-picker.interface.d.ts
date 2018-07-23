import { Observable } from "rxjs/index";
export interface CustomRect {
    height: number;
    left: number;
    top: number;
    width: number;
}
export interface CustomPercent {
    x: number;
    y: number;
}
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
export interface PickerConfig {
    alpha: boolean;
    pickerShow: boolean;
    noHide: boolean;
    debug: boolean;
    outFormat: string;
    inputFormat: string;
    availPallets: Array<string>;
    customPallets: Array<Palette>;
}
export interface PickerOptions {
    pickerShow?: boolean;
    noHide?: boolean;
    debug?: boolean;
    outFormat?: string;
    inputFormat?: string;
    availPallets?: Array<string>;
    customPallets?: Array<Palette>;
}
export interface ColorPickerService {
    pickerList: Array<string>;
    pallets: Array<Palette>;
    mouseMoveObservable: Observable<MouseEvent>;
    mouseUpObservable: Observable<MouseEvent>;
    saturationChange(percent: CustomPercent, pickerComponent: ColorPickerComponent): any;
    hueChange(percent: CustomPercent, pickerComponent: ColorPickerComponent): any;
    alphaChange(percent: CustomPercent, pickerComponent: ColorPickerComponent): any;
    dataToColor(pickerComponent: ColorPickerComponent): any;
    colorToData(color: string, pickerComponent: ColorPickerComponent): any;
    detectColorType(color: string): any;
    fillValuesFromHsvaArr(hsvaArr: Array<number>, pickerComponent: ColorPickerComponent): any;
    parseRgbaColor(color: any, pickerComponent: ColorPickerComponent): any;
    parseRgbColor(color: any, pickerComponent: ColorPickerComponent): any;
    parseHslaColor(color: any, pickerComponent: ColorPickerComponent): any;
    parseHslColor(color: any, pickerComponent: ColorPickerComponent): any;
    parseHexColor(color: any, pickerComponent: ColorPickerComponent): any;
    hsvaToRgba(H: any, S: any, V: any, A: any): Array<number>;
    hsvaToRgbaString(H: any, S: any, V: any, A: any, showAlpha: boolean): string;
    rgbaToHsva(r: any, g: any, b: any, a: any): Array<number>;
    hsvaToHsla(h: any, s: any, v: any, a: any): Array<number>;
    hslaToHsva(h: any, s: any, l: any, a: any): Array<number>;
    hexToHsva(hex: string): Array<number>;
    hsvaToHex(H: any, S: any, V: any, A: any, showAlpha: boolean): string;
    validateColorFormat(value: string, format: string): string;
    validateHexFormat(value: string, alpha: boolean): string;
    validateRgbaFormat(value: string, alpha: boolean): string;
    prepareReturnColor(hsva: HSVA, format: string): string;
    preparePickerPallets(availPallets: Array<string>, customPallets: Array<Palette>, pickerComponent: ColorPickerComponent): any;
    fillBasePallets(): any;
}
export interface ColorPickerComponent {
    _pickerConfig: PickerConfig;
    colorInit: boolean;
    pickerOpen: boolean;
    pickerPallets: Array<Palette>;
    hsva: HSVA;
    currentColor: string;
    currentColorMax: string;
    currentColorAlpha: string;
    currentColorAlphaZero: string;
    uuid: string;
    allowedFormats: Array<string>;
    colorPickerService: ColorPickerService;
    openPicker(): void;
    closePicker(): void;
    validateInputParams(): void;
    inputColorChange(color: string): void;
    updateReturnColor(): void;
    setInputValue(): void;
    setDraggersToCurrentColor(): void;
}
