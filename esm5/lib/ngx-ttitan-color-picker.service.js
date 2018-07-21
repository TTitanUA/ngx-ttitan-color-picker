/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { fromEvent } from "rxjs/index";
/**
 * @record
 */
export function HSVA() { }
function HSVA_tsickle_Closure_declarations() {
    /** @type {?} */
    HSVA.prototype.hue;
    /** @type {?} */
    HSVA.prototype.saturation;
    /** @type {?} */
    HSVA.prototype.value;
    /** @type {?} */
    HSVA.prototype.alpha;
}
/**
 * @record
 */
export function Palette() { }
function Palette_tsickle_Closure_declarations() {
    /** @type {?} */
    Palette.prototype.name;
    /** @type {?} */
    Palette.prototype.id;
    /** @type {?} */
    Palette.prototype.colors;
}
var NgxTTitanColorPickerService = /** @class */ (function () {
    // public mouseMoveObservable: EventEmitter<MouseEvent> = new EventEmitter();
    // public mouseUpObservable: EventEmitter<MouseEvent> = new EventEmitter();
    function NgxTTitanColorPickerService() {
        this.debug = false;
        this.pickerList = [];
        this.pallets = [];
        this.mouseMoveObservable = /** @type {?} */ (fromEvent(document, 'mousemove'));
        this.mouseUpObservable = /** @type {?} */ (fromEvent(document, 'mouseup'));
        this.fillBasePallets();
        //
        // document.addEventListener('mousemove', ($event) => {
        //   this.mouseMoveObservable.emit(<MouseEvent>$event);
        // });
        // document.addEventListener('mouseup', ($event) => {
        //   this.mouseUpObservable.emit(<MouseEvent>$event);
        // });
    }
    /**
     * @param {?} percent
     * @param {?} pickerComponent
     * @return {?}
     */
    NgxTTitanColorPickerService.prototype.saturationChange = /**
     * @param {?} percent
     * @param {?} pickerComponent
     * @return {?}
     */
    function (percent, pickerComponent) {
        pickerComponent.hsva.saturation = percent.x;
        pickerComponent.hsva.value = (100 - percent.y);
        this.dataToColor(pickerComponent);
    };
    /**
     * @param {?} percent
     * @param {?} pickerComponent
     * @return {?}
     */
    NgxTTitanColorPickerService.prototype.hueChange = /**
     * @param {?} percent
     * @param {?} pickerComponent
     * @return {?}
     */
    function (percent, pickerComponent) {
        pickerComponent.hsva.hue = Math.round(360 * percent.y / 100);
        this.dataToColor(pickerComponent);
    };
    /**
     * @param {?} percent
     * @param {?} pickerComponent
     * @return {?}
     */
    NgxTTitanColorPickerService.prototype.alphaChange = /**
     * @param {?} percent
     * @param {?} pickerComponent
     * @return {?}
     */
    function (percent, pickerComponent) {
        pickerComponent.hsva.alpha = (100 - percent.y) / 100;
        this.dataToColor(pickerComponent);
    };
    /**
     * @param {?} pickerComponent
     * @return {?}
     */
    NgxTTitanColorPickerService.prototype.dataToColor = /**
     * @param {?} pickerComponent
     * @return {?}
     */
    function (pickerComponent) {
        var /** @type {?} */ rgbaArr = this.hsvaToRgba(pickerComponent.hsva.hue, pickerComponent.hsva.saturation, pickerComponent.hsva.value, pickerComponent.hsva.alpha);
        var /** @type {?} */ rgbaMaxArr = this.hsvaToRgba(pickerComponent.hsva.hue, 100, 100, pickerComponent.hsva.alpha);
        pickerComponent.currentColor = 'rgb(' + rgbaArr[0] + ',' + rgbaArr[1] + ',' + rgbaArr[2] + ')';
        pickerComponent.currentColorMax = 'rgba(' + rgbaMaxArr[0] + ',' + rgbaMaxArr[1] + ',' + rgbaMaxArr[2] + ',' + rgbaMaxArr[3] + ')';
        pickerComponent.currentColorAlpha = 'rgba(' + rgbaArr[0] + ',' + rgbaArr[1] + ',' + rgbaArr[2] + ',' + rgbaArr[3] + ')';
        pickerComponent.currentColorAlphaZero = 'rgba(' + rgbaArr[0] + ',' + rgbaArr[1] + ',' + rgbaArr[2] + ',0)';
        pickerComponent.setInputValue();
        pickerComponent.updateReturnColor();
    };
    /**
     * @param {?} color
     * @param {?} pickerComponent
     * @return {?}
     */
    NgxTTitanColorPickerService.prototype.colorToData = /**
     * @param {?} color
     * @param {?} pickerComponent
     * @return {?}
     */
    function (color, pickerComponent) {
        switch (this.detectColorType(color)) {
            case "rgba":
                this.parseRgbaColor(color, pickerComponent);
                break;
            case "rgb":
                this.parseRgbColor(color, pickerComponent);
                break;
            case "hsla":
                this.parseHslaColor(color, pickerComponent);
                break;
            case "hsl":
                this.parseHslColor(color, pickerComponent);
                break;
            case "hex6":
                this.parseHexColor(color, pickerComponent);
                break;
            case "hex8":
                this.parseHexColor(color, pickerComponent);
                break;
        }
        this.dataToColor(pickerComponent);
    };
    /**
     * @return {?}
     */
    NgxTTitanColorPickerService.prototype.getPickerUuid = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ pickerId = '';
        for (var /** @type {?} */ i = 0; i < 1000; i++) {
            pickerId = 'picker-' + this.pickerList.length + '-' + i;
            if (this.pickerList.indexOf(pickerId) === -1) {
                this.pickerList.push(pickerId);
                return pickerId;
            }
        }
    };
    /**
     * @param {?} color
     * @return {?}
     */
    NgxTTitanColorPickerService.prototype.detectColorType = /**
     * @param {?} color
     * @return {?}
     */
    function (color) {
        if (color.indexOf('rgba') !== -1) {
            return 'rgba';
        }
        else if (color.indexOf('rgb') !== -1) {
            return 'rgb';
        }
        else if (color.indexOf('hsla') !== -1) {
            return 'hsla';
        }
        else if (color.indexOf('hsl') !== -1) {
            return 'hsl';
        }
        else if (color.indexOf('#') !== -1 && (color.length == 4 || color.length == 7)) {
            return 'hex6';
        }
        else if (color.indexOf('#') !== -1 && color.length == 9) {
            return 'hex8';
        }
        else {
            return 'undefined';
        }
    };
    /**
     * @param {?} hsvaArr
     * @param {?} pickerComponent
     * @return {?}
     */
    NgxTTitanColorPickerService.prototype.fillValuesFromHsvaArr = /**
     * @param {?} hsvaArr
     * @param {?} pickerComponent
     * @return {?}
     */
    function (hsvaArr, pickerComponent) {
        pickerComponent.hsva.hue = hsvaArr[0];
        pickerComponent.hsva.saturation = hsvaArr[1];
        pickerComponent.hsva.value = hsvaArr[2];
        pickerComponent.hsva.alpha = hsvaArr[3];
    };
    /**
     * @param {?} color
     * @param {?} pickerComponent
     * @return {?}
     */
    NgxTTitanColorPickerService.prototype.parseRgbaColor = /**
     * @param {?} color
     * @param {?} pickerComponent
     * @return {?}
     */
    function (color, pickerComponent) {
        var /** @type {?} */ aus = color.replace('rgba(', '').replace(')', '');
        var /** @type {?} */ aus2 = aus.split(',');
        if (aus2.length == 4) {
            this.fillValuesFromHsvaArr(this.rgbaToHsva(parseInt(aus2[0]), parseInt(aus2[1]), parseInt(aus2[2]), parseInt(aus2[3])), pickerComponent);
        }
    };
    /**
     * @param {?} color
     * @param {?} pickerComponent
     * @return {?}
     */
    NgxTTitanColorPickerService.prototype.parseRgbColor = /**
     * @param {?} color
     * @param {?} pickerComponent
     * @return {?}
     */
    function (color, pickerComponent) {
        var /** @type {?} */ aus = color.replace('rgb(', '').replace(')', '');
        var /** @type {?} */ aus2 = aus.split(',');
        if (aus2.length == 3) {
            this.fillValuesFromHsvaArr(this.rgbaToHsva(parseInt(aus2[0]), parseInt(aus2[1]), parseInt(aus2[2]), 1), pickerComponent);
        }
    };
    /**
     * @param {?} color
     * @param {?} pickerComponent
     * @return {?}
     */
    NgxTTitanColorPickerService.prototype.parseHslaColor = /**
     * @param {?} color
     * @param {?} pickerComponent
     * @return {?}
     */
    function (color, pickerComponent) {
        var /** @type {?} */ aus = color.replace('hsla(', '').replace(')', '').replace('%', '');
        var /** @type {?} */ aus2 = aus.split(',');
        if (aus2.length == 4) {
            this.fillValuesFromHsvaArr(this.hslaToHsva(parseInt(aus2[0]), parseInt(aus2[1]), parseInt(aus2[2]), parseInt(aus2[3])), pickerComponent);
        }
    };
    /**
     * @param {?} color
     * @param {?} pickerComponent
     * @return {?}
     */
    NgxTTitanColorPickerService.prototype.parseHslColor = /**
     * @param {?} color
     * @param {?} pickerComponent
     * @return {?}
     */
    function (color, pickerComponent) {
        var /** @type {?} */ aus = color.replace('hsl(', '').replace(')', '').replace('%', '');
        var /** @type {?} */ aus2 = aus.split(',');
        if (aus2.length == 3) {
            this.fillValuesFromHsvaArr(this.hslaToHsva(parseInt(aus2[0]), parseInt(aus2[1]), parseInt(aus2[2]), 1), pickerComponent);
        }
    };
    /**
     * @param {?} color
     * @param {?} pickerComponent
     * @return {?}
     */
    NgxTTitanColorPickerService.prototype.parseHexColor = /**
     * @param {?} color
     * @param {?} pickerComponent
     * @return {?}
     */
    function (color, pickerComponent) {
        var /** @type {?} */ aus = color.replace('#', '');
        this.fillValuesFromHsvaArr(this.hexToHsva(aus), pickerComponent);
    };
    /**
     * @param {?} H
     * @param {?} S
     * @param {?} V
     * @param {?} A
     * @return {?}
     */
    NgxTTitanColorPickerService.prototype.hsvaToRgba = /**
     * @param {?} H
     * @param {?} S
     * @param {?} V
     * @param {?} A
     * @return {?}
     */
    function (H, S, V, A) {
        var /** @type {?} */ f, /** @type {?} */ p, /** @type {?} */ q, /** @type {?} */ t, /** @type {?} */ lH, /** @type {?} */ R, /** @type {?} */ G, /** @type {?} */ B;
        H = (H < 360) ? H : 359;
        S = S / 100;
        V = V / 100;
        lH = Math.floor(H / 60);
        f = H / 60 - lH;
        p = V * (1 - S);
        q = V * (1 - S * f);
        t = V * (1 - (1 - f) * S);
        switch (lH) {
            case 0:
                R = V;
                G = t;
                B = p;
                break;
            case 1:
                R = q;
                G = V;
                B = p;
                break;
            case 2:
                R = p;
                G = V;
                B = t;
                break;
            case 3:
                R = p;
                G = q;
                B = V;
                break;
            case 4:
                R = t;
                G = p;
                B = V;
                break;
            case 5:
                R = V;
                G = p;
                B = q;
                break;
        }
        return [Math.round(R * 255), Math.round(G * 255), Math.round(B * 255), A];
    };
    /**
     * @param {?} H
     * @param {?} S
     * @param {?} V
     * @param {?} A
     * @param {?=} showAlpha
     * @return {?}
     */
    NgxTTitanColorPickerService.prototype.hsvaToRgbaString = /**
     * @param {?} H
     * @param {?} S
     * @param {?} V
     * @param {?} A
     * @param {?=} showAlpha
     * @return {?}
     */
    function (H, S, V, A, showAlpha) {
        if (showAlpha === void 0) { showAlpha = false; }
        var /** @type {?} */ colorArr = this.hsvaToRgba(H, S, V, A);
        if (showAlpha) {
            return 'rgba(' + colorArr.join(',') + ')';
        }
        colorArr.pop();
        return 'rgb(' + colorArr.join(',') + ')';
    };
    /**
     * @param {?} r
     * @param {?} g
     * @param {?} b
     * @param {?} a
     * @return {?}
     */
    NgxTTitanColorPickerService.prototype.rgbaToHsva = /**
     * @param {?} r
     * @param {?} g
     * @param {?} b
     * @param {?} a
     * @return {?}
     */
    function (r, g, b, a) {
        r /= 255;
        g /= 255;
        b /= 255;
        var /** @type {?} */ max = Math.max(r, g, b), /** @type {?} */ min = Math.min(r, g, b);
        var /** @type {?} */ h, /** @type {?} */ s, /** @type {?} */ v = max;
        var /** @type {?} */ d = max - min;
        s = max == 0 ? 0 : d / max;
        if (max == min) {
            h = 0;
        }
        else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return [
            h * 360,
            s * 100,
            v * 100,
            a
        ];
    };
    /**
     * @param {?} h
     * @param {?} s
     * @param {?} v
     * @param {?} a
     * @return {?}
     */
    NgxTTitanColorPickerService.prototype.hsvaToHsla = /**
     * @param {?} h
     * @param {?} s
     * @param {?} v
     * @param {?} a
     * @return {?}
     */
    function (h, s, v, a) {
        s /= 100;
        v /= 100;
        return [
            Math.round(h),
            Math.round((s * v / ((h = (2 - s) * v) < 1 ? h : 2 - h)) * 100),
            Math.round((h / 2) * 100),
            a
        ];
    };
    /**
     * @param {?} h
     * @param {?} s
     * @param {?} l
     * @param {?} a
     * @return {?}
     */
    NgxTTitanColorPickerService.prototype.hslaToHsva = /**
     * @param {?} h
     * @param {?} s
     * @param {?} l
     * @param {?} a
     * @return {?}
     */
    function (h, s, l, a) {
        s /= 100;
        l /= 100;
        s *= l < .5 ? l : 1 - l;
        return [
            h,
            Math.round((2 * s / (l + s)) * 100),
            Math.round((l + s) * 100),
            a
        ];
    };
    /**
     * @param {?} hex
     * @return {?}
     */
    NgxTTitanColorPickerService.prototype.hexToHsva = /**
     * @param {?} hex
     * @return {?}
     */
    function (hex) {
        var /** @type {?} */ rgba = [0, 0, 0, 1];
        if (hex.length == 6) {
            rgba = [
                parseInt(hex.substring(0, 2), 16),
                parseInt(hex.substring(2, 4), 16),
                parseInt(hex.substring(4, 6), 16),
                1
            ];
        }
        else if (hex.length == 3) {
            rgba = [
                parseInt(hex.substring(0, 1) + hex.substring(0, 1), 16),
                parseInt(hex.substring(1, 2) + hex.substring(1, 2), 16),
                parseInt(hex.substring(2, 3) + hex.substring(2, 3), 16),
                1
            ];
        }
        else if (hex.length == 8) {
            rgba = [
                parseInt(hex.substring(0, 2), 16),
                parseInt(hex.substring(2, 4), 16),
                parseInt(hex.substring(4, 6), 16),
                parseFloat((parseInt(hex.substring(6, 8), 16) / 255).toFixed(2))
            ];
        }
        return this.rgbaToHsva(rgba[0], rgba[1], rgba[2], rgba[3]);
    };
    /**
     * @param {?} H
     * @param {?} S
     * @param {?} V
     * @param {?} A
     * @param {?=} showAlpha
     * @return {?}
     */
    NgxTTitanColorPickerService.prototype.hsvaToHex = /**
     * @param {?} H
     * @param {?} S
     * @param {?} V
     * @param {?} A
     * @param {?=} showAlpha
     * @return {?}
     */
    function (H, S, V, A, showAlpha) {
        if (showAlpha === void 0) { showAlpha = true; }
        var /** @type {?} */ rgba = this.hsvaToRgba(H, S, V, A);
        var /** @type {?} */ hA = ((showAlpha) ? (rgba[3] * 255).toString(16).substring(0, 2) : '');
        if (showAlpha) {
            hA = (hA.length == 1) ? hA + hA : hA;
        }
        return '#' +
            ((rgba[2] | rgba[1] << 8 | rgba[0] << 16) | 1 << 24).toString(16).slice(1) +
            hA;
    };
    /**
     * @param {?} value
     * @param {?} format
     * @return {?}
     */
    NgxTTitanColorPickerService.prototype.validateColorFormat = /**
     * @param {?} value
     * @param {?} format
     * @return {?}
     */
    function (value, format) {
        switch (format) {
            case "hex6": return this.validateHexFormat(value);
            case "hex8": return this.validateHexFormat(value, true);
            case "rgb": return this.validateRgbaFormat(value);
            case "rgba": return this.validateRgbaFormat(value, true);
        }
        return 'notValid';
    };
    /**
     * @param {?} value
     * @param {?=} alpha
     * @return {?}
     */
    NgxTTitanColorPickerService.prototype.validateHexFormat = /**
     * @param {?} value
     * @param {?=} alpha
     * @return {?}
     */
    function (value, alpha) {
        if (alpha === void 0) { alpha = false; }
        var /** @type {?} */ result = 'notValid';
        value = value.replace('#', '');
        if (!alpha) {
            if (value.length === 6) {
                if (!isNaN(parseInt(value, 16))) {
                    return '#' + value;
                }
            }
        }
        else {
            if (value.length === 8) {
                if (!isNaN(parseInt(value, 16))) {
                    return '#' + value;
                }
            }
        }
        return result;
    };
    /**
     * @param {?} value
     * @param {?=} alpha
     * @return {?}
     */
    NgxTTitanColorPickerService.prototype.validateRgbaFormat = /**
     * @param {?} value
     * @param {?=} alpha
     * @return {?}
     */
    function (value, alpha) {
        if (alpha === void 0) { alpha = false; }
        var /** @type {?} */ result = 'notValid';
        value = value.replace(/[^0-9\,]+/g, "");
        var /** @type {?} */ ausArr = value.split(',');
        var /** @type {?} */ alphaVal = '';
        if (!alpha) {
            if (ausArr.length == 3) {
                ausArr = ausArr.map(function (val) { return parseInt(val); });
                if (Math.max.apply(null, ausArr) <= 255 &&
                    Math.min.apply(null, ausArr) >= 0) {
                    return 'rgb(' + ausArr.join(',') + ')';
                }
            }
        }
        else {
            if (ausArr.length == 4) {
                alphaVal = parseFloat(/** @type {?} */ (ausArr.pop()));
                ausArr = ausArr.map(function (val) { return parseInt(val); });
                if (Math.max.apply(null, ausArr) <= 255 &&
                    Math.min.apply(null, ausArr) >= 0 &&
                    alphaVal >= 0 && alphaVal <= 1) {
                    ausArr.push(alphaVal);
                    return 'rgba(' + ausArr.join(',') + ')';
                }
            }
        }
        return result;
    };
    /**
     * @param {?} hsva
     * @param {?} format
     * @return {?}
     */
    NgxTTitanColorPickerService.prototype.prepareReturnColor = /**
     * @param {?} hsva
     * @param {?} format
     * @return {?}
     */
    function (hsva, format) {
        switch (format) {
            case "hex6": return this.hsvaToHex(hsva.hue, hsva.saturation, hsva.value, 1, false);
            case "hex8": return this.hsvaToHex(hsva.hue, hsva.saturation, hsva.value, hsva.alpha, true);
            case "rgb": return this.hsvaToRgbaString(hsva.hue, hsva.saturation, hsva.value, 1);
            case "rgba": return this.hsvaToRgbaString(hsva.hue, hsva.saturation, hsva.value, hsva.alpha, true);
        }
        return this.hsvaToHex(hsva.hue, hsva.saturation, hsva.value, 1, false);
    };
    /**
     * @param {?=} availPallets
     * @param {?=} customPallets
     * @param {?=} pickerComponent
     * @return {?}
     */
    NgxTTitanColorPickerService.prototype.preparePickerPallets = /**
     * @param {?=} availPallets
     * @param {?=} customPallets
     * @param {?=} pickerComponent
     * @return {?}
     */
    function (availPallets, customPallets, pickerComponent) {
        if (availPallets === void 0) { availPallets = []; }
        if (customPallets === void 0) { customPallets = []; }
        this.pallets.forEach(function (palette) {
            if (availPallets.indexOf(palette.id) !== -1) {
                pickerComponent.pickerPallets.push(palette);
            }
        });
        customPallets.forEach(function (palette) {
            pickerComponent.pickerPallets.push(palette);
        });
    };
    /**
     * @return {?}
     */
    NgxTTitanColorPickerService.prototype.fillBasePallets = /**
     * @return {?}
     */
    function () {
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
    };
    NgxTTitanColorPickerService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NgxTTitanColorPickerService.ctorParameters = function () { return []; };
    return NgxTTitanColorPickerService;
}());
export { NgxTTitanColorPickerService };
function NgxTTitanColorPickerService_tsickle_Closure_declarations() {
    /** @type {?} */
    NgxTTitanColorPickerService.prototype.debug;
    /** @type {?} */
    NgxTTitanColorPickerService.prototype.pickerList;
    /** @type {?} */
    NgxTTitanColorPickerService.prototype.pallets;
    /** @type {?} */
    NgxTTitanColorPickerService.prototype.mouseMoveObservable;
    /** @type {?} */
    NgxTTitanColorPickerService.prototype.mouseUpObservable;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXR0aXRhbi1jb2xvci1waWNrZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC10dGl0YW4tY29sb3ItcGlja2VyLyIsInNvdXJjZXMiOlsibGliL25neC10dGl0YW4tY29sb3ItcGlja2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBZSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFHdkQsT0FBTyxFQUFDLFNBQVMsRUFBYSxNQUFNLFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXlCL0MsNkVBQTZFO0lBQzdFLDJFQUEyRTtJQUUzRTtxQkFUd0IsS0FBSzswQkFDTSxFQUFFO3VCQUNKLEVBQUU7cURBRTBDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDO21EQUNsQyxTQUFTLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQztRQUt2RyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7Ozs7Ozs7O0tBU3hCOzs7Ozs7SUFFRCxzREFBZ0I7Ozs7O0lBQWhCLFVBQWlCLE9BQXNCLEVBQUUsZUFBOEM7UUFDckYsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUM1QyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQztLQUNuQzs7Ozs7O0lBRUQsK0NBQVM7Ozs7O0lBQVQsVUFBVSxPQUFzQixFQUFFLGVBQThDO1FBQzlFLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQztLQUNuQzs7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QUMsR0FBRyxDQUFDLEdBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUUsQ0FBQyxDQUFDLENBQUM7UUFFdEIsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUEsQ0FBQztZQUNWLEtBQUssQ0FBQztnQkFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFBQyxLQUFLLENBQUM7WUFDbkMsS0FBSyxDQUFDO2dCQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQztZQUNuQyxLQUFLLENBQUM7Z0JBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDO1lBQ25DLEtBQUssQ0FBQztnQkFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFBQyxLQUFLLENBQUM7WUFDbkMsS0FBSyxDQUFDO2dCQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQztZQUNuQyxLQUFLLENBQUM7Z0JBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDO1NBQ3BDO1FBRUQsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxD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QUFFLENBQUM7Z0JBQ2pDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ2pDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ2pDLENBQUM7YUFDRixDQUFDO1NBQ0g7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksR0FBRztnQkFDTCxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUN2RCxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUN2RCxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUN2RCxDQUFDO2FBQ0YsQ0FBQTtTQUNGO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLEdBQUc7Z0JBQ0wsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDakMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDakMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxT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Q0FBQyxJQUFJLENBQUM7WUFDaEIsRUFBRSxFQUFFLFVBQVU7WUFDZCxJQUFJLEVBQUUsVUFBVTtZQUNoQixNQUFNLEVBQUU7Z0JBQ04sU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO2dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUztnQkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO2dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUztnQkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO2dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUztnQkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO2dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUztnQkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO2dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUztnQkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQzVHLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQzVHLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7YUFDN0c7U0FDRixDQUFDLENBQUM7S0FDSjs7Z0JBNWNGLFVBQVU7Ozs7c0NBbkJYOztTQW9CYSwyQkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0N1c3RvbVBlcmNlbnR9IGZyb20gXCIuL25neC10dGl0YW4tY29sb3ItcGlja2VyLXNlbGVjdG9yLmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHtOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudH0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuY29tcG9uZW50XCI7XG5pbXBvcnQge2Zyb21FdmVudCwgT2JzZXJ2YWJsZX0gZnJvbSBcInJ4anMvaW5kZXhcIjtcbmltcG9ydCB7d2luZG93fSBmcm9tIFwicnhqcy9pbnRlcm5hbC9vcGVyYXRvcnNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBIU1ZBIHtcbiAgaHVlOiBudW1iZXIsXG4gIHNhdHVyYXRpb246IG51bWJlcixcbiAgdmFsdWU6IG51bWJlcixcbiAgYWxwaGE6IG51bWJlcixcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYWxldHRlIHtcbiAgbmFtZTogc3RyaW5nLFxuICBpZDogc3RyaW5nLFxuICBjb2xvcnM6IEFycmF5PHN0cmluZz5cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5neFRUaXRhbkNvbG9yUGlja2VyU2VydmljZSB7XG5cbiAgcHVibGljIGRlYnVnOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBwaWNrZXJMaXN0OiBBcnJheTxzdHJpbmc+ID0gW107XG4gIHB1YmxpYyBwYWxsZXRzOiBBcnJheTxQYWxldHRlPiA9IFtdO1xuXG4gIHB1YmxpYyBtb3VzZU1vdmVPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPE1vdXNlRXZlbnQ+ID0gPE9ic2VydmFibGU8TW91c2VFdmVudD4+ZnJvbUV2ZW50KGRvY3VtZW50LCAnbW91c2Vtb3ZlJyk7XG4gIHB1YmxpYyBtb3VzZVVwT2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxNb3VzZUV2ZW50PiA9IDxPYnNlcnZhYmxlPE1vdXNlRXZlbnQ+PmZyb21FdmVudChkb2N1bWVudCwgJ21vdXNldXAnKTtcbiAgLy8gcHVibGljIG1vdXNlTW92ZU9ic2VydmFibGU6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLy8gcHVibGljIG1vdXNlVXBPYnNlcnZhYmxlOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5maWxsQmFzZVBhbGxldHMoKTtcbiAgICAvL1xuICAgIC8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsICgkZXZlbnQpID0+IHtcbiAgICAvLyAgIHRoaXMubW91c2VNb3ZlT2JzZXJ2YWJsZS5lbWl0KDxNb3VzZUV2ZW50PiRldmVudCk7XG4gICAgLy8gfSk7XG4gICAgLy8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgkZXZlbnQpID0+IHtcbiAgICAvLyAgIHRoaXMubW91c2VVcE9ic2VydmFibGUuZW1pdCg8TW91c2VFdmVudD4kZXZlbnQpO1xuICAgIC8vIH0pO1xuXG4gIH1cblxuICBzYXR1cmF0aW9uQ2hhbmdlKHBlcmNlbnQ6IEN1c3RvbVBlcmNlbnQsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQgKSB7XG4gICAgcGlja2VyQ29tcG9uZW50LmhzdmEuc2F0dXJhdGlvbiA9IHBlcmNlbnQueDtcbiAgICBwaWNrZXJDb21wb25lbnQuaHN2YS52YWx1ZSA9ICgxMDAgLSBwZXJjZW50LnkpO1xuICAgIHRoaXMuZGF0YVRvQ29sb3IocGlja2VyQ29tcG9uZW50KTtcbiAgfVxuXG4gIGh1ZUNoYW5nZShwZXJjZW50OiBDdXN0b21QZXJjZW50LCBwaWNrZXJDb21wb25lbnQ6IE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50KSB7XG4gICAgcGlja2VyQ29tcG9uZW50LmhzdmEuaHVlID0gTWF0aC5yb3VuZCgzNjAgKiBwZXJjZW50LnkgLyAxMDApO1xuICAgIHRoaXMuZGF0YVRvQ29sb3IocGlja2VyQ29tcG9uZW50KTtcbiAgfVxuXG4gIGFscGhhQ2hhbmdlKHBlcmNlbnQ6IEN1c3RvbVBlcmNlbnQsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBwaWNrZXJDb21wb25lbnQuaHN2YS5hbHBoYSA9ICgxMDAgLSBwZXJjZW50LnkpIC8gMTAwO1xuICAgIHRoaXMuZGF0YVRvQ29sb3IocGlja2VyQ29tcG9uZW50KTtcbiAgfVxuXG4gIGRhdGFUb0NvbG9yKHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBsZXQgcmdiYUFycjogQXJyYXk8bnVtYmVyPiA9IHRoaXMuaHN2YVRvUmdiYShcbiAgICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLmh1ZSxcbiAgICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLnNhdHVyYXRpb24sXG4gICAgICBwaWNrZXJDb21wb25lbnQuaHN2YS52YWx1ZSxcbiAgICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLmFscGhhXG4gICAgKTtcbiAgICBsZXQgcmdiYU1heEFycjogQXJyYXk8bnVtYmVyPiA9IHRoaXMuaHN2YVRvUmdiYShcbiAgICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLmh1ZSxcbiAgICAgIDEwMCxcbiAgICAgIDEwMCxcbiAgICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLmFscGhhXG4gICAgKTtcblxuICAgIHBpY2tlckNvbXBvbmVudC5jdXJyZW50Q29sb3IgPSAncmdiKCcgKyByZ2JhQXJyWzBdICsgJywnICsgcmdiYUFyclsxXSArICcsJyArIHJnYmFBcnJbMl0gKyAnKSc7XG4gICAgcGlja2VyQ29tcG9uZW50LmN1cnJlbnRDb2xvck1heCA9ICdyZ2JhKCcgKyByZ2JhTWF4QXJyWzBdICsgJywnICsgcmdiYU1heEFyclsxXSArICcsJyArIHJnYmFNYXhBcnJbMl0gKyAnLCcgKyByZ2JhTWF4QXJyWzNdICsgJyknO1xuICAgIHBpY2tlckNvbXBvbmVudC5jdXJyZW50Q29sb3JBbHBoYSA9ICdyZ2JhKCcgKyByZ2JhQXJyWzBdICsgJywnICsgcmdiYUFyclsxXSArICcsJyArIHJnYmFBcnJbMl0gKyAnLCcgKyByZ2JhQXJyWzNdICsgJyknO1xuICAgIHBpY2tlckNvbXBvbmVudC5jdXJyZW50Q29sb3JBbHBoYVplcm8gPSAncmdiYSgnICsgcmdiYUFyclswXSArICcsJyArIHJnYmFBcnJbMV0gKyAnLCcgKyByZ2JhQXJyWzJdICsgJywwKSc7XG5cbiAgICBwaWNrZXJDb21wb25lbnQuc2V0SW5wdXRWYWx1ZSgpO1xuICAgIHBpY2tlckNvbXBvbmVudC51cGRhdGVSZXR1cm5Db2xvcigpO1xuXG5cbiAgfVxuXG4gIGNvbG9yVG9EYXRhKGNvbG9yOiBzdHJpbmcsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBzd2l0Y2ggKHRoaXMuZGV0ZWN0Q29sb3JUeXBlKGNvbG9yKSkge1xuICAgICAgY2FzZSBcInJnYmFcIjogdGhpcy5wYXJzZVJnYmFDb2xvcihjb2xvciwgcGlja2VyQ29tcG9uZW50KTsgYnJlYWs7XG4gICAgICBjYXNlIFwicmdiXCI6IHRoaXMucGFyc2VSZ2JDb2xvcihjb2xvciwgcGlja2VyQ29tcG9uZW50KTsgYnJlYWs7XG4gICAgICBjYXNlIFwiaHNsYVwiOiB0aGlzLnBhcnNlSHNsYUNvbG9yKGNvbG9yLCBwaWNrZXJDb21wb25lbnQpOyBicmVhaztcbiAgICAgIGNhc2UgXCJoc2xcIjogdGhpcy5wYXJzZUhzbENvbG9yKGNvbG9yLCBwaWNrZXJDb21wb25lbnQpOyBicmVhaztcbiAgICAgIGNhc2UgXCJoZXg2XCI6IHRoaXMucGFyc2VIZXhDb2xvcihjb2xvciwgcGlja2VyQ29tcG9uZW50KTsgYnJlYWs7XG4gICAgICBjYXNlIFwiaGV4OFwiOiB0aGlzLnBhcnNlSGV4Q29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudCk7IGJyZWFrO1xuICAgIH1cbiAgICB0aGlzLmRhdGFUb0NvbG9yKHBpY2tlckNvbXBvbmVudCk7XG4gIH1cblxuICBnZXRQaWNrZXJVdWlkKCkge1xuICAgIGxldCBwaWNrZXJJZCA9ICcnO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCAxMDAwOyBpKyspIHtcbiAgICAgIHBpY2tlcklkID0gJ3BpY2tlci0nICsgdGhpcy5waWNrZXJMaXN0Lmxlbmd0aCArICctJyArIGk7XG4gICAgICBpZih0aGlzLnBpY2tlckxpc3QuaW5kZXhPZihwaWNrZXJJZCkgPT09IC0xICkge1xuICAgICAgICB0aGlzLnBpY2tlckxpc3QucHVzaChwaWNrZXJJZCk7XG4gICAgICAgIHJldHVybiBwaWNrZXJJZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG5cbiAgZGV0ZWN0Q29sb3JUeXBlKGNvbG9yOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmKGNvbG9yLmluZGV4T2YoJ3JnYmEnKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiAncmdiYSc7XG4gICAgfSBlbHNlIGlmKGNvbG9yLmluZGV4T2YoJ3JnYicpICE9PSAtMSkge1xuICAgICAgcmV0dXJuICdyZ2InO1xuICAgIH0gZWxzZSBpZihjb2xvci5pbmRleE9mKCdoc2xhJykgIT09IC0xKSB7XG4gICAgICByZXR1cm4gJ2hzbGEnO1xuICAgIH0gZWxzZSBpZihjb2xvci5pbmRleE9mKCdoc2wnKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiAnaHNsJztcbiAgICB9IGVsc2UgaWYgKGNvbG9yLmluZGV4T2YoJyMnKSAhPT0gLTEgJiYgKGNvbG9yLmxlbmd0aCA9PSA0IHx8IGNvbG9yLmxlbmd0aCA9PSA3KSl7XG4gICAgICByZXR1cm4gJ2hleDYnO1xuICAgIH0gZWxzZSBpZiAoY29sb3IuaW5kZXhPZignIycpICE9PSAtMSAmJiBjb2xvci5sZW5ndGggPT0gOSl7XG4gICAgICByZXR1cm4gJ2hleDgnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJ3VuZGVmaW5lZCc7XG4gICAgfVxuICB9XG5cblxuICBmaWxsVmFsdWVzRnJvbUhzdmFBcnIoaHN2YUFycjogQXJyYXk8bnVtYmVyPiwgcGlja2VyQ29tcG9uZW50OiBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCkge1xuICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLmh1ZSA9IGhzdmFBcnJbMF07XG4gICAgcGlja2VyQ29tcG9uZW50LmhzdmEuc2F0dXJhdGlvbiA9IGhzdmFBcnJbMV07XG4gICAgcGlja2VyQ29tcG9uZW50LmhzdmEudmFsdWUgPSBoc3ZhQXJyWzJdO1xuICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLmFscGhhID0gaHN2YUFyclszXTtcbiAgfVxuXG5cbiAgcGFyc2VSZ2JhQ29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBsZXQgYXVzID0gY29sb3IucmVwbGFjZSgncmdiYSgnLCAnJykucmVwbGFjZSgnKScsICcnKTtcbiAgICBsZXQgYXVzMiA9IGF1cy5zcGxpdCgnLCcpO1xuICAgIGlmKGF1czIubGVuZ3RoID09IDQpIHtcbiAgICAgIHRoaXMuZmlsbFZhbHVlc0Zyb21Ic3ZhQXJyKFxuICAgICAgICB0aGlzLnJnYmFUb0hzdmEoXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlswXSksXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlsxXSksXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlsyXSksXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlszXSksXG4gICAgICAgICksXG4gICAgICAgIHBpY2tlckNvbXBvbmVudFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwYXJzZVJnYkNvbG9yKGNvbG9yLCBwaWNrZXJDb21wb25lbnQ6IE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50KSB7XG4gICAgbGV0IGF1cyA9IGNvbG9yLnJlcGxhY2UoJ3JnYignLCAnJykucmVwbGFjZSgnKScsICcnKTtcbiAgICBsZXQgYXVzMiA9IGF1cy5zcGxpdCgnLCcpO1xuICAgIGlmKGF1czIubGVuZ3RoID09IDMpIHtcbiAgICAgIHRoaXMuZmlsbFZhbHVlc0Zyb21Ic3ZhQXJyKFxuICAgICAgICB0aGlzLnJnYmFUb0hzdmEoXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlswXSksXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlsxXSksXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlsyXSksXG4gICAgICAgICAgMVxuICAgICAgICApLFxuICAgICAgICBwaWNrZXJDb21wb25lbnRcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcGFyc2VIc2xhQ29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBsZXQgYXVzID0gY29sb3IucmVwbGFjZSgnaHNsYSgnLCAnJykucmVwbGFjZSgnKScsICcnKS5yZXBsYWNlKCclJywgJycpO1xuICAgIGxldCBhdXMyID0gYXVzLnNwbGl0KCcsJyk7XG4gICAgaWYoYXVzMi5sZW5ndGggPT0gNCkge1xuICAgICAgdGhpcy5maWxsVmFsdWVzRnJvbUhzdmFBcnIoXG4gICAgICAgIHRoaXMuaHNsYVRvSHN2YShcbiAgICAgICAgICBwYXJzZUludChhdXMyWzBdKSxcbiAgICAgICAgICBwYXJzZUludChhdXMyWzFdKSxcbiAgICAgICAgICBwYXJzZUludChhdXMyWzJdKSxcbiAgICAgICAgICBwYXJzZUludChhdXMyWzNdKSxcbiAgICAgICAgKSxcbiAgICAgICAgcGlja2VyQ29tcG9uZW50XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHBhcnNlSHNsQ29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBsZXQgYXVzID0gY29sb3IucmVwbGFjZSgnaHNsKCcsICcnKS5yZXBsYWNlKCcpJywgJycpLnJlcGxhY2UoJyUnLCAnJyk7XG4gICAgbGV0IGF1czIgPSBhdXMuc3BsaXQoJywnKTtcbiAgICBpZihhdXMyLmxlbmd0aCA9PSAzKSB7XG4gICAgICB0aGlzLmZpbGxWYWx1ZXNGcm9tSHN2YUFycihcbiAgICAgICAgdGhpcy5oc2xhVG9Ic3ZhKFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbMF0pLFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbMV0pLFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbMl0pLFxuICAgICAgICAgIDFcbiAgICAgICAgKSxcbiAgICAgICAgcGlja2VyQ29tcG9uZW50XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHBhcnNlSGV4Q29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBsZXQgYXVzID0gY29sb3IucmVwbGFjZSgnIycsICcnKTtcbiAgICB0aGlzLmZpbGxWYWx1ZXNGcm9tSHN2YUFycihcbiAgICAgIHRoaXMuaGV4VG9Ic3ZhKGF1cyksXG4gICAgICBwaWNrZXJDb21wb25lbnRcbiAgICApO1xuICB9XG5cblxuXG4gIGhzdmFUb1JnYmEoSCwgUywgViwgQSk6IEFycmF5PG51bWJlcj4ge1xuICAgIGxldCBmICwgcCwgcSAsIHQsIGxILCBSLCBHLCBCO1xuXG4gICAgSCA9IChIIDwgMzYwKSA/IEggOiAzNTk7XG4gICAgUyA9IFMgLyAxMDA7XG4gICAgViA9IFYgLyAxMDA7XG5cbiAgICBsSCA9IE1hdGguZmxvb3IoSCAvIDYwKTtcblxuICAgIGYgPSBILzYwIC0gbEg7XG5cbiAgICBwID0gViAqICgxIC0gUyk7XG5cbiAgICBxID0gViAqKDEgLSBTKmYpO1xuXG4gICAgdCA9IFYqICgxIC0gKDEtZikqIFMpO1xuXG4gICAgc3dpdGNoIChsSCl7XG4gICAgICBjYXNlIDA6IFIgPSBWOyBHID0gdDsgQiA9IHA7IGJyZWFrO1xuICAgICAgY2FzZSAxOiBSID0gcTsgRyA9IFY7IEIgPSBwOyBicmVhaztcbiAgICAgIGNhc2UgMjogUiA9IHA7IEcgPSBWOyBCID0gdDsgYnJlYWs7XG4gICAgICBjYXNlIDM6IFIgPSBwOyBHID0gcTsgQiA9IFY7IGJyZWFrO1xuICAgICAgY2FzZSA0OiBSID0gdDsgRyA9IHA7IEIgPSBWOyBicmVhaztcbiAgICAgIGNhc2UgNTogUiA9IFY7IEcgPSBwOyBCID0gcTsgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtNYXRoLnJvdW5kKFIqMjU1KSwgTWF0aC5yb3VuZChHKjI1NSksIE1hdGgucm91bmQoQioyNTUpLCBBXTtcbiAgfVxuXG4gIGhzdmFUb1JnYmFTdHJpbmcoSCwgUywgViwgQSwgc2hvd0FscGhhOiBib29sZWFuID0gZmFsc2UpOiBzdHJpbmcge1xuICAgIGxldCBjb2xvckFycjogQXJyYXk8bnVtYmVyPiA9IHRoaXMuaHN2YVRvUmdiYShILCBTLCBWLCBBKTtcblxuICAgIGlmKHNob3dBbHBoYSkge1xuICAgICAgcmV0dXJuICdyZ2JhKCcgKyBjb2xvckFyci5qb2luKCcsJykgKyAnKSc7XG4gICAgfVxuXG4gICAgY29sb3JBcnIucG9wKCk7XG4gICAgcmV0dXJuICdyZ2IoJyArIGNvbG9yQXJyLmpvaW4oJywnKSArICcpJztcblxuICB9XG5cbiAgcmdiYVRvSHN2YShyLCBnLCBiLCBhKTogQXJyYXk8bnVtYmVyPiB7XG4gICAgciAvPSAyNTU7XG4gICAgZyAvPSAyNTU7XG4gICAgYiAvPSAyNTU7XG5cbiAgICBsZXQgbWF4ID0gTWF0aC5tYXgociwgZywgYiksIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xuICAgIGxldCBoLCBzLCB2ID0gbWF4O1xuICAgIGxldCBkID0gbWF4IC0gbWluO1xuICAgIHMgPSBtYXggPT0gMCA/IDAgOiBkIC8gbWF4O1xuXG4gICAgaWYgKG1heCA9PSBtaW4pIHtcbiAgICAgIGggPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2ggKG1heCkge1xuICAgICAgICBjYXNlIHI6IGggPSAoZyAtIGIpIC8gZCArIChnIDwgYiA/IDYgOiAwKTsgYnJlYWs7XG4gICAgICAgIGNhc2UgZzogaCA9IChiIC0gcikgLyBkICsgMjsgYnJlYWs7XG4gICAgICAgIGNhc2UgYjogaCA9IChyIC0gZykgLyBkICsgNDsgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGggLz0gNjtcbiAgICB9XG5cblxuICAgIHJldHVybiBbXG4gICAgICBoICogMzYwLFxuICAgICAgcyAqIDEwMCxcbiAgICAgIHYgKiAxMDAsXG4gICAgICBhXG4gICAgXTtcbiAgfVxuXG4gIGhzdmFUb0hzbGEoaCwgcywgdiwgYSk6IEFycmF5PG51bWJlcj57XG4gICAgcyAvPSAxMDA7XG4gICAgdiAvPSAxMDA7XG4gICAgcmV0dXJuW1xuICAgICAgTWF0aC5yb3VuZChoKSxcbiAgICAgIE1hdGgucm91bmQoKHMqdi8oKGg9KDItcykqdik8MT9oOjItaCkpICogMTAwKSxcbiAgICAgIE1hdGgucm91bmQoKGgvMikgKiAxMDApLFxuICAgICAgYVxuICAgIF1cbiAgfVxuXG4gIGhzbGFUb0hzdmEgKGgsIHMsIGwsIGEpOiBBcnJheTxudW1iZXI+e1xuICAgIHMgLz0gMTAwO1xuICAgIGwgLz0gMTAwO1xuICAgIHMqPWw8LjU/bDoxLWw7XG4gICAgcmV0dXJuW1xuICAgICAgaCxcbiAgICAgIE1hdGgucm91bmQoKDIqcy8obCtzKSkgKiAxMDApLFxuICAgICAgTWF0aC5yb3VuZCgobCtzKSAqIDEwMCksXG4gICAgICBhXG4gICAgXVxuICB9XG5cbiAgaGV4VG9Ic3ZhKGhleDogc3RyaW5nKTogQXJyYXk8bnVtYmVyPiB7XG5cbiAgICBsZXQgcmdiYSA9IFswLDAsMCwxXTtcbiAgICBpZiAoaGV4Lmxlbmd0aCA9PSA2KSB7XG4gICAgICByZ2JhID0gW1xuICAgICAgICBwYXJzZUludChoZXguc3Vic3RyaW5nKDAsIDIpLCAxNiksXG4gICAgICAgIHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMiwgNCksIDE2KSxcbiAgICAgICAgcGFyc2VJbnQoaGV4LnN1YnN0cmluZyg0LCA2KSwgMTYpLFxuICAgICAgICAxXG4gICAgICBdO1xuICAgIH0gZWxzZSBpZiAoaGV4Lmxlbmd0aCA9PSAzKSB7XG4gICAgICByZ2JhID0gW1xuICAgICAgICBwYXJzZUludChoZXguc3Vic3RyaW5nKDAsIDEpICsgaGV4LnN1YnN0cmluZygwLCAxKSwgMTYpLFxuICAgICAgICBwYXJzZUludChoZXguc3Vic3RyaW5nKDEsIDIpICsgaGV4LnN1YnN0cmluZygxLCAyKSwgMTYpLFxuICAgICAgICBwYXJzZUludChoZXguc3Vic3RyaW5nKDIsIDMpICsgaGV4LnN1YnN0cmluZygyLCAzKSwgMTYpLFxuICAgICAgICAxXG4gICAgICBdXG4gICAgfSBlbHNlIGlmIChoZXgubGVuZ3RoID09IDgpIHtcbiAgICAgIHJnYmEgPSBbXG4gICAgICAgIHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMCwgMiksIDE2KSxcbiAgICAgICAgcGFyc2VJbnQoaGV4LnN1YnN0cmluZygyLCA0KSwgMTYpLFxuICAgICAgICBwYXJzZUludChoZXguc3Vic3RyaW5nKDQsIDYpLCAxNiksXG4gICAgICAgIHBhcnNlRmxvYXQoKHBhcnNlSW50KGhleC5zdWJzdHJpbmcoNiwgOCksIDE2KSAvIDI1NSkudG9GaXhlZCgyKSlcbiAgICAgIF1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmdiYVRvSHN2YShyZ2JhWzBdLCByZ2JhWzFdLCByZ2JhWzJdLCByZ2JhWzNdKTtcblxuICB9XG5cbiAgaHN2YVRvSGV4KEgsIFMsIFYsIEEsIHNob3dBbHBoYTogYm9vbGVhbiA9IHRydWUpOiBzdHJpbmcge1xuICAgIGxldCByZ2JhOiBBcnJheTxudW1iZXI+ID0gdGhpcy5oc3ZhVG9SZ2JhKEgsIFMsIFYsIEEpO1xuXG4gICAgbGV0IGhBOiBzdHJpbmcgPSAoKHNob3dBbHBoYSkgPyAocmdiYVszXSAqIDI1NSkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygwLDIpIDogJycpO1xuXG4gICAgaWYoc2hvd0FscGhhKSB7XG4gICAgICBoQSA9IChoQS5sZW5ndGggPT0gMSkgPyBoQSArIGhBIDogaEE7XG4gICAgfVxuICAgIHJldHVybiAnIycgK1xuICAgICAgKChyZ2JhWzJdIHwgcmdiYVsxXSA8PCA4IHwgcmdiYVswXSA8PCAxNikgfCAxIDw8IDI0KS50b1N0cmluZygxNikuc2xpY2UoMSkgK1xuICAgICAgaEE7XG4gIH1cblxuXG4gIHZhbGlkYXRlQ29sb3JGb3JtYXQodmFsdWU6IHN0cmluZywgZm9ybWF0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHN3aXRjaCAoZm9ybWF0KSB7XG4gICAgICBjYXNlIFwiaGV4NlwiOiByZXR1cm4gdGhpcy52YWxpZGF0ZUhleEZvcm1hdCh2YWx1ZSk7XG4gICAgICBjYXNlIFwiaGV4OFwiOiByZXR1cm4gdGhpcy52YWxpZGF0ZUhleEZvcm1hdCh2YWx1ZSwgdHJ1ZSk7XG4gICAgICBjYXNlIFwicmdiXCI6IHJldHVybiB0aGlzLnZhbGlkYXRlUmdiYUZvcm1hdCh2YWx1ZSk7XG4gICAgICBjYXNlIFwicmdiYVwiOiByZXR1cm4gdGhpcy52YWxpZGF0ZVJnYmFGb3JtYXQodmFsdWUsIHRydWUpO1xuICAgICAgLy8gY2FzZSBcImhzbFwiOiByZXR1cm4gdGhpcy52YWxpZGF0ZUhleEZvcm1hdCh2YWx1ZSk7XG4gICAgICAvLyBjYXNlIFwiaHNsYVwiOiByZXR1cm4gdGhpcy52YWxpZGF0ZUhleEZvcm1hdCh2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiAnbm90VmFsaWQnO1xuICB9XG5cbiAgdmFsaWRhdGVIZXhGb3JtYXQodmFsdWU6IHN0cmluZywgYWxwaGE6IGJvb2xlYW4gPSBmYWxzZSk6IHN0cmluZyB7XG4gICAgbGV0IHJlc3VsdCA9ICdub3RWYWxpZCc7XG4gICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKCcjJywgJycpO1xuICAgIGlmKCFhbHBoYSkge1xuICAgICAgaWYodmFsdWUubGVuZ3RoID09PSA2KSB7XG4gICAgICAgIGlmKCFpc05hTihwYXJzZUludCh2YWx1ZSwgMTYpKSkge1xuICAgICAgICAgIHJldHVybiAnIycgKyB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZih2YWx1ZS5sZW5ndGggPT09IDgpIHtcbiAgICAgICAgaWYoIWlzTmFOKHBhcnNlSW50KHZhbHVlLCAxNikpKSB7XG4gICAgICAgICAgcmV0dXJuICcjJyArIHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHZhbGlkYXRlUmdiYUZvcm1hdCh2YWx1ZTogc3RyaW5nLCBhbHBoYTogYm9vbGVhbiA9IGZhbHNlKTogc3RyaW5nIHtcbiAgICBsZXQgcmVzdWx0ID0gJ25vdFZhbGlkJztcbiAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1teMC05XFwsXSsvZywgXCJcIik7XG4gICAgbGV0IGF1c0FycjogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPiA9IHZhbHVlLnNwbGl0KCcsJyk7XG4gICAgbGV0IGFscGhhVmFsOiBzdHJpbmcgfCBudW1iZXIgPSAnJztcblxuICAgIGlmKCFhbHBoYSkge1xuICAgICAgaWYoYXVzQXJyLmxlbmd0aCA9PSAzKSB7XG4gICAgICAgIGF1c0FyciA9IGF1c0Fyci5tYXAoZnVuY3Rpb24odmFsOiBzdHJpbmcpe3JldHVybiBwYXJzZUludCh2YWwpfSk7XG4gICAgICAgIGlmKFxuICAgICAgICAgIE1hdGgubWF4LmFwcGx5KG51bGwsIGF1c0FycikgPD0gMjU1ICYmXG4gICAgICAgICAgTWF0aC5taW4uYXBwbHkobnVsbCwgYXVzQXJyKSA+PSAwXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiAncmdiKCcgKyBhdXNBcnIuam9pbignLCcpICsgJyknO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKGF1c0Fyci5sZW5ndGggPT0gNCkge1xuICAgICAgICBhbHBoYVZhbCA9IHBhcnNlRmxvYXQoPHN0cmluZz5hdXNBcnIucG9wKCkpO1xuICAgICAgICBhdXNBcnIgPSBhdXNBcnIubWFwKGZ1bmN0aW9uKHZhbDogc3RyaW5nKXtyZXR1cm4gcGFyc2VJbnQodmFsKX0pO1xuICAgICAgICBpZihcbiAgICAgICAgICBNYXRoLm1heC5hcHBseShudWxsLCBhdXNBcnIpIDw9IDI1NSAmJlxuICAgICAgICAgIE1hdGgubWluLmFwcGx5KG51bGwsIGF1c0FycikgPj0gMCAmJlxuICAgICAgICAgIGFscGhhVmFsID49IDAgJiYgYWxwaGFWYWwgPD0gMVxuICAgICAgICApIHtcbiAgICAgICAgICBhdXNBcnIucHVzaChhbHBoYVZhbCk7XG4gICAgICAgICAgcmV0dXJuICdyZ2JhKCcgKyBhdXNBcnIuam9pbignLCcpICsgJyknO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByZXBhcmVSZXR1cm5Db2xvcihoc3ZhOiBIU1ZBLCBmb3JtYXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgc3dpdGNoIChmb3JtYXQpIHtcbiAgICAgIGNhc2UgXCJoZXg2XCI6IHJldHVybiB0aGlzLmhzdmFUb0hleChoc3ZhLmh1ZSwgaHN2YS5zYXR1cmF0aW9uLCBoc3ZhLnZhbHVlLCAxLCBmYWxzZSk7XG4gICAgICBjYXNlIFwiaGV4OFwiOiByZXR1cm4gdGhpcy5oc3ZhVG9IZXgoaHN2YS5odWUsIGhzdmEuc2F0dXJhdGlvbiwgaHN2YS52YWx1ZSwgaHN2YS5hbHBoYSwgdHJ1ZSk7XG4gICAgICBjYXNlIFwicmdiXCI6IHJldHVybiB0aGlzLmhzdmFUb1JnYmFTdHJpbmcoaHN2YS5odWUsIGhzdmEuc2F0dXJhdGlvbiwgaHN2YS52YWx1ZSwgMSk7XG4gICAgICBjYXNlIFwicmdiYVwiOiByZXR1cm4gdGhpcy5oc3ZhVG9SZ2JhU3RyaW5nKGhzdmEuaHVlLCBoc3ZhLnNhdHVyYXRpb24sIGhzdmEudmFsdWUsIGhzdmEuYWxwaGEsIHRydWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5oc3ZhVG9IZXgoaHN2YS5odWUsIGhzdmEuc2F0dXJhdGlvbiwgaHN2YS52YWx1ZSwgMSwgZmFsc2UpO1xuICB9XG5cbiAgcHJlcGFyZVBpY2tlclBhbGxldHMoYXZhaWxQYWxsZXRzOiBBcnJheTxzdHJpbmc+ID0gW10sIGN1c3RvbVBhbGxldHM6IEFycmF5PFBhbGV0dGU+ID0gW10sIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICB0aGlzLnBhbGxldHMuZm9yRWFjaCgocGFsZXR0ZSkgPT4ge1xuICAgICAgaWYoYXZhaWxQYWxsZXRzLmluZGV4T2YocGFsZXR0ZS5pZCkgIT09IC0xKSB7XG4gICAgICAgIHBpY2tlckNvbXBvbmVudC5waWNrZXJQYWxsZXRzLnB1c2gocGFsZXR0ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY3VzdG9tUGFsbGV0cy5mb3JFYWNoKChwYWxldHRlKSA9PiB7XG4gICAgICBwaWNrZXJDb21wb25lbnQucGlja2VyUGFsbGV0cy5wdXNoKHBhbGV0dGUpO1xuICAgIH0pXG5cbiAgfVxuXG4gIGZpbGxCYXNlUGFsbGV0cygpIHtcbiAgICB0aGlzLnBhbGxldHMucHVzaCh7XG4gICAgICBpZDogJ3BvbGFyaXMnLFxuICAgICAgbmFtZTogJ1BvbGFyaXMnLFxuICAgICAgY29sb3JzOiBbXG4gICAgICAgICcjRjlGQUZCJywgJyNGNEY2RjgnLCAnI0RGRTNFOCcsICcjQzRDREQ1JyxcbiAgICAgICAgJyM5MTlFQUInLCAnIzYzNzM4MScsICcjNDU0RjVCJywgJyMyMTJCMzYnLFxuICAgICAgICAnI0IzQjVDQicsICcjNDM0NjdGJywgJyMxQzIyNjAnLCAnIzAwMDQ0QycsXG4gICAgICAgICcjRjZGMEZEJywgJyNFM0QwRkYnLCAnIzlDNkFERScsICcjNTAyNDhGJywgJyMyMzAwNTEnLFxuICAgICAgICAnI0Y0RjVGQScsICcjQjNCQ0Y1JywgJyM1QzZBQzQnLCAnIzIwMkU3OCcsICcjMDAwNjM5JyxcbiAgICAgICAgJyNFQkY1RkEnLCAnI0I0RTFGQScsICcjMDA3QUNFJywgJyMwODRFOEEnLCAnIzAwMTQyOScsXG4gICAgICAgICcjRTBGNUY1JywgJyNCN0VDRUMnLCAnIzQ3QzFCRicsICcjMDA4NDhFJywgJyMwMDMxMzUnLFxuICAgICAgICAnI0UzRjFERicsICcjQkJFNUIzJywgJyM1MEI4M0MnLCAnIzEwODA0MycsICcjMTczNjMwJyxcbiAgICAgICAgJyNGQ0YxQ0QnLCAnI0ZGRUE4QScsICcjRUVDMjAwJywgJyM5QzZGMTknLCAnIzU3M0IwMCcsXG4gICAgICAgICcjRkNFQkRCJywgJyNGRkM1OEInLCAnI0Y0OTM0MicsICcjQzA1NzE3JywgJyM0QTE1MDQnLFxuICAgICAgICAnI0ZCRUFFNScsICcjRkVBRDlBJywgJyNERTM2MTgnLCAnI0JGMDcxMScsICcjMzMwMTAxJyxcbiAgICAgIF1cbiAgICB9KTtcbiAgICB0aGlzLnBhbGxldHMucHVzaCh7XG4gICAgICBpZDogJ21hdGVyaWFsJyxcbiAgICAgIG5hbWU6ICdNYXRlcmlhbCcsXG4gICAgICBjb2xvcnM6IFtcbiAgICAgICAgJyNmZmViZWUnLCAnI2ZmY2RkMicsICcjZWY5YTlhJywgJyNlNTczNzMnLCAnI2VmNTM1MCcsICcjZjQ0MzM2JywgJyNlNTM5MzUnLCAnI2QzMmYyZicsICcjYzYyODI4JywgJyNiNzFjMWMnLCAnI2ZmOGE4MCcsICcjZmY1MjUyJywgJyNmZjE3NDQnLCAnI2Q1MDAwMCcsXG4gICAgICAgICcjZmNlNGVjJywgJyNmOGJiZDAnLCAnI2Y0OGZiMScsICcjZjA2MjkyJywgJyNlYzQwN2EnLCAnI2U5MWU2MycsICcjZDgxYjYwJywgJyNjMjE4NWInLCAnI2FkMTQ1NycsICcjODgwZTRmJywgJyNmZjgwYWInLCAnI2ZmNDA4MScsICcjZjUwMDU3JywgJyNjNTExNjInLFxuICAgICAgICAnI2YzZTVmNScsICcjZTFiZWU3JywgJyNjZTkzZDgnLCAnI2JhNjhjOCcsICcjYWI0N2JjJywgJyM5YzI3YjAnLCAnIzhlMjRhYScsICcjN2IxZmEyJywgJyM2YTFiOWEnLCAnIzRhMTQ4YycsICcjZWE4MGZjJywgJyNlMDQwZmInLCAnI2Q1MDBmOScsICcjYWEwMGZmJyxcbiAgICAgICAgJyNlZGU3ZjYnLCAnI2QxYzRlOScsICcjYjM5ZGRiJywgJyM5NTc1Y2QnLCAnIzdlNTdjMicsICcjNjczYWI3JywgJyM1ZTM1YjEnLCAnIzUxMmRhOCcsICcjNDUyN2EwJywgJyMzMTFiOTInLCAnI2IzODhmZicsICcjN2M0ZGZmJywgJyM2NTFmZmYnLCAnIzYyMDBlYScsXG4gICAgICAgICcjZThlYWY2JywgJyNjNWNhZTknLCAnIzlmYThkYScsICcjNzk4NmNiJywgJyM1YzZiYzAnLCAnIzNmNTFiNScsICcjMzk0OWFiJywgJyMzMDNmOWYnLCAnIzI4MzU5MycsICcjMWEyMzdlJywgJyM4YzllZmYnLCAnIzUzNmRmZScsICcjM2Q1YWZlJywgJyMzMDRmZmUnLFxuICAgICAgICAnI2UzZjJmZCcsICcjYmJkZWZiJywgJyM5MGNhZjknLCAnIzY0YjVmNicsICcjNDJhNWY1JywgJyMyMTk2ZjMnLCAnIzFlODhlNScsICcjMTk3NmQyJywgJyMxNTY1YzAnLCAnIzBkNDdhMScsICcjODJiMWZmJywgJyM0NDhhZmYnLCAnIzI5NzlmZicsICcjMjk2MmZmJyxcbiAgICAgICAgJyNlMWY1ZmUnLCAnI2IzZTVmYycsICcjODFkNGZhJywgJyM0ZmMzZjcnLCAnIzI5YjZmNicsICcjMDNhOWY0JywgJyMwMzliZTUnLCAnIzAyODhkMScsICcjMDI3N2JkJywgJyMwMTU3OWInLCAnIzgwZDhmZicsICcjNDBjNGZmJywgJyMwMGIwZmYnLCAnIzAwOTFlYScsXG4gICAgICAgICcjZTBmN2ZhJywgJyNiMmViZjInLCAnIzgwZGVlYScsICcjNGRkMGUxJywgJyMyNmM2ZGEnLCAnIzAwYmNkNCcsICcjMDBhY2MxJywgJyMwMDk3YTcnLCAnIzAwODM4ZicsICcjMDA2MDY0JywgJyM4NGZmZmYnLCAnIzE4ZmZmZicsICcjMDBlNWZmJywgJyMwMGI4ZDQnLFxuICAgICAgICAnI2UwZjJmMScsICcjYjJkZmRiJywgJyM4MGNiYzQnLCAnIzRkYjZhYycsICcjMjZhNjlhJywgJyMwMDk2ODgnLCAnIzAwODk3YicsICcjMDA3OTZiJywgJyMwMDY5NWMnLCAnIzAwNGQ0MCcsICcjYTdmZmViJywgJyM2NGZmZGEnLCAnIzFkZTliNicsICcjMDBiZmE1JyxcbiAgICAgICAgJyNlOGY1ZTknLCAnI2M4ZTZjOScsICcjYTVkNmE3JywgJyM4MWM3ODQnLCAnIzY2YmI2YScsICcjNGNhZjUwJywgJyM0M2EwNDcnLCAnIzM4OGUzYycsICcjMmU3ZDMyJywgJyMxYjVlMjAnLCAnI2I5ZjZjYScsICcjNjlmMGFlJywgJyMwMGU2NzYnLCAnIzAwYzg1MycsXG4gICAgICAgICcjZjFmOGU5JywgJyNkY2VkYzgnLCAnI2M1ZTFhNScsICcjYWVkNTgxJywgJyM5Y2NjNjUnLCAnIzhiYzM0YScsICcjN2NiMzQyJywgJyM2ODlmMzgnLCAnIzU1OGIyZicsICcjMzM2OTFlJywgJyNjY2ZmOTAnLCAnI2IyZmY1OScsICcjNzZmZjAzJywgJyM2NGRkMTcnLFxuICAgICAgICAnI2Y5ZmJlNycsICcjZjBmNGMzJywgJyNlNmVlOWMnLCAnI2RjZTc3NScsICcjZDRlMTU3JywgJyNjZGRjMzknLCAnI2MwY2EzMycsICcjYWZiNDJiJywgJyM5ZTlkMjQnLCAnIzgyNzcxNycsICcjZjRmZjgxJywgJyNlZWZmNDEnLCAnI2M2ZmYwMCcsICcjYWVlYTAwJyxcbiAgICAgICAgJyNmZmZkZTcnLCAnI2ZmZjljNCcsICcjZmZmNTlkJywgJyNmZmYxNzYnLCAnI2ZmZWU1OCcsICcjZmZlYjNiJywgJyNmZGQ4MzUnLCAnI2ZiYzAyZCcsICcjZjlhODI1JywgJyNmNTdmMTcnLCAnI2ZmZmY4ZCcsICcjZmZmZjAwJywgJyNmZmVhMDAnLCAnI2ZmZDYwMCcsXG4gICAgICAgICcjZmZmOGUxJywgJyNmZmVjYjMnLCAnI2ZmZTA4MicsICcjZmZkNTRmJywgJyNmZmNhMjgnLCAnI2ZmYzEwNycsICcjZmZiMzAwJywgJyNmZmEwMDAnLCAnI2ZmOGYwMCcsICcjZmY2ZjAwJywgJyNmZmU1N2YnLCAnI2ZmZDc0MCcsICcjZmZjNDAwJywgJyNmZmFiMDAnLFxuICAgICAgICAnI2ZmZjNlMCcsICcjZmZlMGIyJywgJyNmZmNjODAnLCAnI2ZmYjc0ZCcsICcjZmZhNzI2JywgJyNmZjk4MDAnLCAnI2ZiOGMwMCcsICcjZjU3YzAwJywgJyNlZjZjMDAnLCAnI2U2NTEwMCcsICcjZmZkMTgwJywgJyNmZmFiNDAnLCAnI2ZmOTEwMCcsICcjZmY2ZDAwJyxcbiAgICAgICAgJyNmYmU5ZTcnLCAnI2ZmY2NiYycsICcjZmZhYjkxJywgJyNmZjhhNjUnLCAnI2ZmNzA0MycsICcjZmY1NzIyJywgJyNmNDUxMWUnLCAnI2U2NGExOScsICcjZDg0MzE1JywgJyNiZjM2MGMnLCAnI2ZmOWU4MCcsICcjZmY2ZTQwJywgJyNmZjNkMDAnLCAnI2RkMmMwMCcsXG4gICAgICAgICcjZWZlYmU5JywgJyNkN2NjYzgnLCAnI2JjYWFhNCcsICcjYTE4ODdmJywgJyM4ZDZlNjMnLCAnIzc5NTU0OCcsICcjNmQ0YzQxJywgJyM1ZDQwMzcnLCAnIzRlMzQyZScsICcjM2UyNzIzJyxcbiAgICAgICAgJyNmYWZhZmEnLCAnI2Y1ZjVmNScsICcjZWVlZWVlJywgJyNlMGUwZTAnLCAnI2JkYmRiZCcsICcjOWU5ZTllJywgJyM3NTc1NzUnLCAnIzYxNjE2MScsICcjNDI0MjQyJywgJyMyMTIxMjEnLFxuICAgICAgICAnI2VjZWZmMScsICcjY2ZkOGRjJywgJyNiMGJlYzUnLCAnIzkwYTRhZScsICcjNzg5MDljJywgJyM2MDdkOGInLCAnIzU0NmU3YScsICcjNDU1YTY0JywgJyMzNzQ3NGYnLCAnIzI2MzIzOCcsXG4gICAgICBdXG4gICAgfSk7XG4gIH1cblxuXG5cblxuXG59XG4iXX0=