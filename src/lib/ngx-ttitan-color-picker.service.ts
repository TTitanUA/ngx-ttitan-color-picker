import {EventEmitter, Injectable} from '@angular/core';
import {NgxTTitanColorPickerComponent} from "./ngx-ttitan-color-picker.component";
import {fromEvent, Observable} from "rxjs/index";
import {window} from "rxjs/internal/operators";
import {CustomPercent, HSVA, Palette} from "./ngx-ttitan-color-picker.interface";


@Injectable()
export class NgxTTitanColorPickerService {

  public pickerList: Array<string> = [];
  public pallets: Array<Palette> = [];

  public mouseMoveObservable: Observable<MouseEvent> = <Observable<MouseEvent>>fromEvent(document, 'mousemove');
  public mouseUpObservable: Observable<MouseEvent> = <Observable<MouseEvent>>fromEvent(document, 'mouseup');
  // public mouseMoveObservable: EventEmitter<MouseEvent> = new EventEmitter();
  // public mouseUpObservable: EventEmitter<MouseEvent> = new EventEmitter();

  constructor() {
    this.fillBasePallets();
    //
    // document.addEventListener('mousemove', ($event) => {
    //   this.mouseMoveObservable.emit(<MouseEvent>$event);
    // });
    // document.addEventListener('mouseup', ($event) => {
    //   this.mouseUpObservable.emit(<MouseEvent>$event);
    // });

  }

  saturationChange(percent: CustomPercent, pickerComponent: NgxTTitanColorPickerComponent ) {
    pickerComponent.hsva.saturation = percent.x;
    pickerComponent.hsva.value = (100 - percent.y);
    this.dataToColor(pickerComponent);
  }

  hueChange(percent: CustomPercent, pickerComponent: NgxTTitanColorPickerComponent) {
    pickerComponent.hsva.hue = Math.round(360 * percent.y / 100);
    this.dataToColor(pickerComponent);
  }

  alphaChange(percent: CustomPercent, pickerComponent: NgxTTitanColorPickerComponent) {
    pickerComponent.hsva.alpha = (100 - percent.y) / 100;
    this.dataToColor(pickerComponent);
  }

  dataToColor(pickerComponent: NgxTTitanColorPickerComponent) {
    let rgbaArr: Array<number> = this.hsvaToRgba(
      pickerComponent.hsva.hue,
      pickerComponent.hsva.saturation,
      pickerComponent.hsva.value,
      pickerComponent.hsva.alpha
    );
    let rgbaMaxArr: Array<number> = this.hsvaToRgba(
      pickerComponent.hsva.hue,
      100,
      100,
      pickerComponent.hsva.alpha
    );

    pickerComponent.currentColor = 'rgb(' + rgbaArr[0] + ',' + rgbaArr[1] + ',' + rgbaArr[2] + ')';
    pickerComponent.currentColorMax = 'rgba(' + rgbaMaxArr[0] + ',' + rgbaMaxArr[1] + ',' + rgbaMaxArr[2] + ',' + rgbaMaxArr[3] + ')';
    pickerComponent.currentColorAlpha = 'rgba(' + rgbaArr[0] + ',' + rgbaArr[1] + ',' + rgbaArr[2] + ',' + rgbaArr[3] + ')';
    pickerComponent.currentColorAlphaZero = 'rgba(' + rgbaArr[0] + ',' + rgbaArr[1] + ',' + rgbaArr[2] + ',0)';

    pickerComponent.setInputValue();
    pickerComponent.updateReturnColor();


  }

  colorToData(color: string, pickerComponent: NgxTTitanColorPickerComponent) {
    switch (this.detectColorType(color)) {
      case "rgba": this.parseRgbaColor(color, pickerComponent); break;
      case "rgb": this.parseRgbColor(color, pickerComponent); break;
      case "hsla": this.parseHslaColor(color, pickerComponent); break;
      case "hsl": this.parseHslColor(color, pickerComponent); break;
      case "hex6": this.parseHexColor(color, pickerComponent); break;
      case "hex8": this.parseHexColor(color, pickerComponent); break;
    }
    this.dataToColor(pickerComponent);
  }

  getPickerUuid() {
    let pickerId = '';
    for(let i = 0; i < 1000; i++) {
      pickerId = 'picker-' + this.pickerList.length + '-' + i;
      if(this.pickerList.indexOf(pickerId) === -1 ) {
        this.pickerList.push(pickerId);
        return pickerId;
      }
    }

  }


  detectColorType(color: string): string {
    if(color.indexOf('rgba') !== -1) {
      return 'rgba';
    } else if(color.indexOf('rgb') !== -1) {
      return 'rgb';
    } else if(color.indexOf('hsla') !== -1) {
      return 'hsla';
    } else if(color.indexOf('hsl') !== -1) {
      return 'hsl';
    } else if (color.indexOf('#') !== -1 && (color.length == 4 || color.length == 7)){
      return 'hex6';
    } else if (color.indexOf('#') !== -1 && color.length == 9){
      return 'hex8';
    } else {
      return 'undefined';
    }
  }


  fillValuesFromHsvaArr(hsvaArr: Array<number>, pickerComponent: NgxTTitanColorPickerComponent) {
    pickerComponent.hsva.hue = hsvaArr[0];
    pickerComponent.hsva.saturation = hsvaArr[1];
    pickerComponent.hsva.value = hsvaArr[2];
    pickerComponent.hsva.alpha = hsvaArr[3];
  }


  parseRgbaColor(color, pickerComponent: NgxTTitanColorPickerComponent) {
    let aus = color.replace('rgba(', '').replace(')', '');
    let aus2 = aus.split(',');
    if(aus2.length == 4) {
      this.fillValuesFromHsvaArr(
        this.rgbaToHsva(
          parseInt(aus2[0]),
          parseInt(aus2[1]),
          parseInt(aus2[2]),
          parseInt(aus2[3]),
        ),
        pickerComponent
      );
    }
  }

  parseRgbColor(color, pickerComponent: NgxTTitanColorPickerComponent) {
    let aus = color.replace('rgb(', '').replace(')', '');
    let aus2 = aus.split(',');
    if(aus2.length == 3) {
      this.fillValuesFromHsvaArr(
        this.rgbaToHsva(
          parseInt(aus2[0]),
          parseInt(aus2[1]),
          parseInt(aus2[2]),
          1
        ),
        pickerComponent
      );
    }
  }

  parseHslaColor(color, pickerComponent: NgxTTitanColorPickerComponent) {
    let aus = color.replace('hsla(', '').replace(')', '').replace('%', '');
    let aus2 = aus.split(',');
    if(aus2.length == 4) {
      this.fillValuesFromHsvaArr(
        this.hslaToHsva(
          parseInt(aus2[0]),
          parseInt(aus2[1]),
          parseInt(aus2[2]),
          parseInt(aus2[3]),
        ),
        pickerComponent
      );
    }
  }

  parseHslColor(color, pickerComponent: NgxTTitanColorPickerComponent) {
    let aus = color.replace('hsl(', '').replace(')', '').replace('%', '');
    let aus2 = aus.split(',');
    if(aus2.length == 3) {
      this.fillValuesFromHsvaArr(
        this.hslaToHsva(
          parseInt(aus2[0]),
          parseInt(aus2[1]),
          parseInt(aus2[2]),
          1
        ),
        pickerComponent
      );
    }
  }

  parseHexColor(color, pickerComponent: NgxTTitanColorPickerComponent) {
    let aus = color.replace('#', '');
    this.fillValuesFromHsvaArr(
      this.hexToHsva(aus),
      pickerComponent
    );
  }



  hsvaToRgba(H, S, V, A): Array<number> {
    let f , p, q , t, lH, R, G, B;

    H = (H < 360) ? H : 359;
    S = S / 100;
    V = V / 100;

    lH = Math.floor(H / 60);

    f = H/60 - lH;

    p = V * (1 - S);

    q = V *(1 - S*f);

    t = V* (1 - (1-f)* S);

    switch (lH){
      case 0: R = V; G = t; B = p; break;
      case 1: R = q; G = V; B = p; break;
      case 2: R = p; G = V; B = t; break;
      case 3: R = p; G = q; B = V; break;
      case 4: R = t; G = p; B = V; break;
      case 5: R = V; G = p; B = q; break;
    }

    return [Math.round(R*255), Math.round(G*255), Math.round(B*255), A];
  }

  hsvaToRgbaString(H, S, V, A, showAlpha: boolean = false): string {
    let colorArr: Array<number> = this.hsvaToRgba(H, S, V, A);

    if(showAlpha) {
      return 'rgba(' + colorArr.join(',') + ')';
    }

    colorArr.pop();
    return 'rgb(' + colorArr.join(',') + ')';

  }

  rgbaToHsva(r, g, b, a): Array<number> {
    r /= 255;
    g /= 255;
    b /= 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;
    let d = max - min;
    s = max == 0 ? 0 : d / max;

    if (max == min) {
      h = 0;
    } else {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }

      h /= 6;
    }


    return [
      h * 360,
      s * 100,
      v * 100,
      a
    ];
  }

  hsvaToHsla(h, s, v, a): Array<number>{
    s /= 100;
    v /= 100;
    return[
      Math.round(h),
      Math.round((s*v/((h=(2-s)*v)<1?h:2-h)) * 100),
      Math.round((h/2) * 100),
      a
    ]
  }

  hslaToHsva (h, s, l, a): Array<number>{
    s /= 100;
    l /= 100;
    s*=l<.5?l:1-l;
    return[
      h,
      Math.round((2*s/(l+s)) * 100),
      Math.round((l+s) * 100),
      a
    ]
  }

  hexToHsva(hex: string): Array<number> {

    let rgba = [0,0,0,1];
    if (hex.length == 6) {
      rgba = [
        parseInt(hex.substring(0, 2), 16),
        parseInt(hex.substring(2, 4), 16),
        parseInt(hex.substring(4, 6), 16),
        1
      ];
    } else if (hex.length == 3) {
      rgba = [
        parseInt(hex.substring(0, 1) + hex.substring(0, 1), 16),
        parseInt(hex.substring(1, 2) + hex.substring(1, 2), 16),
        parseInt(hex.substring(2, 3) + hex.substring(2, 3), 16),
        1
      ]
    } else if (hex.length == 8) {
      rgba = [
        parseInt(hex.substring(0, 2), 16),
        parseInt(hex.substring(2, 4), 16),
        parseInt(hex.substring(4, 6), 16),
        parseFloat((parseInt(hex.substring(6, 8), 16) / 255).toFixed(2))
      ]
    }
    return this.rgbaToHsva(rgba[0], rgba[1], rgba[2], rgba[3]);

  }

  hsvaToHex(H, S, V, A, showAlpha: boolean = true): string {
    let rgba: Array<number> = this.hsvaToRgba(H, S, V, A);

    let hA: string = ((showAlpha) ? (rgba[3] * 255).toString(16).substring(0,2) : '');

    if(showAlpha) {
      hA = (hA.length == 1) ? hA + hA : hA;
    }
    return '#' +
      ((rgba[2] | rgba[1] << 8 | rgba[0] << 16) | 1 << 24).toString(16).slice(1) +
      hA;
  }


  validateColorFormat(value: string, format: string): string {
    switch (format) {
      case "hex6": return this.validateHexFormat(value);
      case "hex8": return this.validateHexFormat(value, true);
      case "rgb": return this.validateRgbaFormat(value);
      case "rgba": return this.validateRgbaFormat(value, true);
      // case "hsl": return this.validateHexFormat(value);
      // case "hsla": return this.validateHexFormat(value);
    }
    return 'notValid';
  }

  validateHexFormat(value: string, alpha: boolean = false): string {
    let result = 'notValid';
    value = value.replace('#', '');
    if(!alpha) {
      if(value.length === 6) {
        if(!isNaN(parseInt(value, 16))) {
          return '#' + value;
        }
      }
    } else {
      if(value.length === 8) {
        if(!isNaN(parseInt(value, 16))) {
          return '#' + value;
        }
      }
    }

    return result;
  }

  validateRgbaFormat(value: string, alpha: boolean = false): string {
    let result = 'notValid';
    value = value.replace(/[^0-9\,]+/g, "");
    let ausArr: Array<string | number> = value.split(',');
    let alphaVal: string | number = '';

    if(!alpha) {
      if(ausArr.length == 3) {
        ausArr = ausArr.map(function(val: string){return parseInt(val)});
        if(
          Math.max.apply(null, ausArr) <= 255 &&
          Math.min.apply(null, ausArr) >= 0
        ) {
          return 'rgb(' + ausArr.join(',') + ')';
        }
      }
    } else {
      if(ausArr.length == 4) {
        alphaVal = parseFloat(<string>ausArr.pop());
        ausArr = ausArr.map(function(val: string){return parseInt(val)});
        if(
          Math.max.apply(null, ausArr) <= 255 &&
          Math.min.apply(null, ausArr) >= 0 &&
          alphaVal >= 0 && alphaVal <= 1
        ) {
          ausArr.push(alphaVal);
          return 'rgba(' + ausArr.join(',') + ')';
        }
      }
    }

    return result;
  }

  prepareReturnColor(hsva: HSVA, format: string): string {
    switch (format) {
      case "hex6": return this.hsvaToHex(hsva.hue, hsva.saturation, hsva.value, 1, false);
      case "hex8": return this.hsvaToHex(hsva.hue, hsva.saturation, hsva.value, hsva.alpha, true);
      case "rgb": return this.hsvaToRgbaString(hsva.hue, hsva.saturation, hsva.value, 1);
      case "rgba": return this.hsvaToRgbaString(hsva.hue, hsva.saturation, hsva.value, hsva.alpha, true);
    }
    return this.hsvaToHex(hsva.hue, hsva.saturation, hsva.value, 1, false);
  }

  preparePickerPallets(availPallets: Array<string> = [], customPallets: Array<Palette> = [], pickerComponent: NgxTTitanColorPickerComponent) {
    pickerComponent.pickerPallets = [];
    this.pallets.forEach((palette) => {
      if(availPallets.indexOf(palette.id) !== -1) {
        pickerComponent.pickerPallets.push(palette);
      }
    });
    customPallets.forEach((palette) => {
      pickerComponent.pickerPallets.push(palette);
    })

  }

  fillBasePallets() {
    this.pallets.push({
      id: 'polaris',
      name: 'Polaris',
      colors: [
        '#F9FAFB', '#F4F6F8', '#DFE3E8', '#C4CDD5',
        '#919EAB', '#637381', '#454F5B', '#212B36',
        '#B3B5CB', '#43467F', '#1C2260', '#00044C',
        '#F6F0FD', '#E3D0FF', '#9C6ADE', '#50248F', '#230051',
        '#F4F5FA', '#B3BCF5', '#5C6AC4', '#202E78', '#000639',
        '#EBF5FA', '#B4E1FA', '#007ACE', '#084E8A', '#001429',
        '#E0F5F5', '#B7ECEC', '#47C1BF', '#00848E', '#003135',
        '#E3F1DF', '#BBE5B3', '#50B83C', '#108043', '#173630',
        '#FCF1CD', '#FFEA8A', '#EEC200', '#9C6F19', '#573B00',
        '#FCEBDB', '#FFC58B', '#F49342', '#C05717', '#4A1504',
        '#FBEAE5', '#FEAD9A', '#DE3618', '#BF0711', '#330101',
      ]
    });
    this.pallets.push({
      id: 'material',
      name: 'Material',
      colors: [
        '#ffebee', '#ffcdd2', '#ef9a9a', '#e57373', '#ef5350', '#f44336', '#e53935', '#d32f2f', '#c62828', '#b71c1c', '#ff8a80', '#ff5252', '#ff1744', '#d50000',
        '#fce4ec', '#f8bbd0', '#f48fb1', '#f06292', '#ec407a', '#e91e63', '#d81b60', '#c2185b', '#ad1457', '#880e4f', '#ff80ab', '#ff4081', '#f50057', '#c51162',
        '#f3e5f5', '#e1bee7', '#ce93d8', '#ba68c8', '#ab47bc', '#9c27b0', '#8e24aa', '#7b1fa2', '#6a1b9a', '#4a148c', '#ea80fc', '#e040fb', '#d500f9', '#aa00ff',
        '#ede7f6', '#d1c4e9', '#b39ddb', '#9575cd', '#7e57c2', '#673ab7', '#5e35b1', '#512da8', '#4527a0', '#311b92', '#b388ff', '#7c4dff', '#651fff', '#6200ea',
        '#e8eaf6', '#c5cae9', '#9fa8da', '#7986cb', '#5c6bc0', '#3f51b5', '#3949ab', '#303f9f', '#283593', '#1a237e', '#8c9eff', '#536dfe', '#3d5afe', '#304ffe',
        '#e3f2fd', '#bbdefb', '#90caf9', '#64b5f6', '#42a5f5', '#2196f3', '#1e88e5', '#1976d2', '#1565c0', '#0d47a1', '#82b1ff', '#448aff', '#2979ff', '#2962ff',
        '#e1f5fe', '#b3e5fc', '#81d4fa', '#4fc3f7', '#29b6f6', '#03a9f4', '#039be5', '#0288d1', '#0277bd', '#01579b', '#80d8ff', '#40c4ff', '#00b0ff', '#0091ea',
        '#e0f7fa', '#b2ebf2', '#80deea', '#4dd0e1', '#26c6da', '#00bcd4', '#00acc1', '#0097a7', '#00838f', '#006064', '#84ffff', '#18ffff', '#00e5ff', '#00b8d4',
        '#e0f2f1', '#b2dfdb', '#80cbc4', '#4db6ac', '#26a69a', '#009688', '#00897b', '#00796b', '#00695c', '#004d40', '#a7ffeb', '#64ffda', '#1de9b6', '#00bfa5',
        '#e8f5e9', '#c8e6c9', '#a5d6a7', '#81c784', '#66bb6a', '#4caf50', '#43a047', '#388e3c', '#2e7d32', '#1b5e20', '#b9f6ca', '#69f0ae', '#00e676', '#00c853',
        '#f1f8e9', '#dcedc8', '#c5e1a5', '#aed581', '#9ccc65', '#8bc34a', '#7cb342', '#689f38', '#558b2f', '#33691e', '#ccff90', '#b2ff59', '#76ff03', '#64dd17',
        '#f9fbe7', '#f0f4c3', '#e6ee9c', '#dce775', '#d4e157', '#cddc39', '#c0ca33', '#afb42b', '#9e9d24', '#827717', '#f4ff81', '#eeff41', '#c6ff00', '#aeea00',
        '#fffde7', '#fff9c4', '#fff59d', '#fff176', '#ffee58', '#ffeb3b', '#fdd835', '#fbc02d', '#f9a825', '#f57f17', '#ffff8d', '#ffff00', '#ffea00', '#ffd600',
        '#fff8e1', '#ffecb3', '#ffe082', '#ffd54f', '#ffca28', '#ffc107', '#ffb300', '#ffa000', '#ff8f00', '#ff6f00', '#ffe57f', '#ffd740', '#ffc400', '#ffab00',
        '#fff3e0', '#ffe0b2', '#ffcc80', '#ffb74d', '#ffa726', '#ff9800', '#fb8c00', '#f57c00', '#ef6c00', '#e65100', '#ffd180', '#ffab40', '#ff9100', '#ff6d00',
        '#fbe9e7', '#ffccbc', '#ffab91', '#ff8a65', '#ff7043', '#ff5722', '#f4511e', '#e64a19', '#d84315', '#bf360c', '#ff9e80', '#ff6e40', '#ff3d00', '#dd2c00',
        '#efebe9', '#d7ccc8', '#bcaaa4', '#a1887f', '#8d6e63', '#795548', '#6d4c41', '#5d4037', '#4e342e', '#3e2723',
        '#fafafa', '#f5f5f5', '#eeeeee', '#e0e0e0', '#bdbdbd', '#9e9e9e', '#757575', '#616161', '#424242', '#212121',
        '#eceff1', '#cfd8dc', '#b0bec5', '#90a4ae', '#78909c', '#607d8b', '#546e7a', '#455a64', '#37474f', '#263238',
      ]
    });
  }





}
