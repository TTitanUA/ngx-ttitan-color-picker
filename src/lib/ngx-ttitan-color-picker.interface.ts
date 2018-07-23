import {Observable} from "rxjs/index";

export interface CustomRect {
  height: number,
  left: number,
  top: number,
  width: number
}

export interface CustomPercent {
  x: number,
  y: number,
}

export interface HSVA {
  hue: number,
  saturation: number,
  value: number,
  alpha: number,
}

export interface Palette {
  name: string,
  id: string,
  colors: Array<string>
}

export interface PickerConfig {
  alpha: boolean,
  pickerShow: boolean,
  noHide: boolean,
  debug: boolean,
  outFormat: string,
  inputFormat: string,
  availPallets: Array<string>,
  customPallets:  Array<Palette>,
}

export interface PickerOptions {
  pickerShow?: boolean,
  noHide?: boolean,
  debug?: boolean,
  outFormat?: string,
  inputFormat?: string,
  availPallets?: Array<string>,
  customPallets?:  Array<Palette>,
}

export interface ColorPickerService {
  pickerList: Array<string>,
  pallets: Array<Palette>,
  mouseMoveObservable: Observable<MouseEvent>,
  mouseUpObservable: Observable<MouseEvent>,
  saturationChange(percent: CustomPercent, pickerComponent: ColorPickerComponent ),
  hueChange(percent: CustomPercent, pickerComponent: ColorPickerComponent),
  alphaChange(percent: CustomPercent, pickerComponent: ColorPickerComponent),
  dataToColor(pickerComponent: ColorPickerComponent),
  colorToData(color: string, pickerComponent: ColorPickerComponent),
  detectColorType(color: string),
  fillValuesFromHsvaArr(hsvaArr: Array<number>, pickerComponent: ColorPickerComponent),
  parseRgbaColor(color, pickerComponent: ColorPickerComponent),
  parseRgbColor(color, pickerComponent: ColorPickerComponent),
  parseHslaColor(color, pickerComponent: ColorPickerComponent),
  parseHslColor(color, pickerComponent: ColorPickerComponent),
  parseHexColor(color, pickerComponent: ColorPickerComponent),
  hsvaToRgba(H, S, V, A): Array<number>,
  hsvaToRgbaString(H, S, V, A, showAlpha: boolean): string,
  rgbaToHsva(r, g, b, a): Array<number>,
  hsvaToHsla(h, s, v, a): Array<number>,
  hslaToHsva (h, s, l, a): Array<number>,
  hexToHsva(hex: string): Array<number>,
  hsvaToHex(H, S, V, A, showAlpha: boolean): string,
  validateColorFormat(value: string, format: string): string,
  validateHexFormat(value: string, alpha: boolean): string,
  validateRgbaFormat(value: string, alpha: boolean): string,
  prepareReturnColor(hsva: HSVA, format: string): string,
  preparePickerPallets(availPallets: Array<string>, customPallets: Array<Palette>, pickerComponent: ColorPickerComponent),
  fillBasePallets()
}

export interface ColorPickerComponent {
  _pickerConfig: PickerConfig,
  colorInit: boolean,
  pickerOpen: boolean,
  pickerPallets: Array<Palette>,
  hsva: HSVA,
  currentColor: string,
  currentColorMax: string,
  currentColorAlpha: string,
  currentColorAlphaZero: string,
  uuid: string,
  allowedFormats: Array<string>,
  colorPickerService: ColorPickerService,
  openPicker(): void,
  closePicker(): void,
  validateInputParams(): void,
  inputColorChange(color: string): void,
  updateReturnColor(): void,
  setInputValue(): void,
  setDraggersToCurrentColor(): void,

}