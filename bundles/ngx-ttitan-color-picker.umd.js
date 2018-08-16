(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/index'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-ttitan-color-picker', ['exports', '@angular/core', 'rxjs/index', '@angular/common'], factory) :
    (factory((global['ngx-ttitan-color-picker'] = {}),global.ng.core,global.rxjs.index,global.ng.common));
}(this, (function (exports,core,index,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NgxTTitanColorPickerService = (function () {
        // public mouseMoveObservable: EventEmitter<MouseEvent> = new EventEmitter();
        // public mouseUpObservable: EventEmitter<MouseEvent> = new EventEmitter();
        function NgxTTitanColorPickerService() {
            this.pickerList = [];
            this.pallets = [];
            this.mouseMoveObservable = /** @type {?} */ (index.fromEvent(document, 'mousemove'));
            this.mouseUpObservable = /** @type {?} */ (index.fromEvent(document, 'mouseup'));
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
                    this.fillValuesFromHsvaArr(this.rgbaToHsva(parseInt(aus2[0]), parseInt(aus2[1]), parseInt(aus2[2]), parseFloat(aus2[3])), pickerComponent);
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
                    this.fillValuesFromHsvaArr(this.hslaToHsva(parseInt(aus2[0]), parseInt(aus2[1]), parseInt(aus2[2]), parseFloat(aus2[3])), pickerComponent);
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
                if (showAlpha === void 0) {
                    showAlpha = false;
                }
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
                if (showAlpha === void 0) {
                    showAlpha = true;
                }
                var /** @type {?} */ rgba = this.hsvaToRgba(H, S, V, A);
                var /** @type {?} */ hA = ((showAlpha) ? (rgba[3] * 255).toString(16).substring(0, 2) : '');
                if (hA.length > 0) {
                    if (hA.indexOf('.') !== -1) {
                        hA = '0' + hA.slice(0, 1);
                    }
                }
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
                if (alpha === void 0) {
                    alpha = false;
                }
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
                if (alpha === void 0) {
                    alpha = false;
                }
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
                if (availPallets === void 0) {
                    availPallets = [];
                }
                if (customPallets === void 0) {
                    customPallets = [];
                }
                pickerComponent.pickerPallets = [];
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
            { type: core.Injectable },
        ];
        /** @nocollapse */
        NgxTTitanColorPickerService.ctorParameters = function () { return []; };
        return NgxTTitanColorPickerService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NgxTTitanColorPickerPaletteListComponent = (function () {
        function NgxTTitanColorPickerPaletteListComponent() {
            this.pallets = [];
            this.change = new core.EventEmitter();
            this.activePalette = null;
        }
        /**
         * @return {?}
         */
        NgxTTitanColorPickerPaletteListComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        /**
         * @return {?}
         */
        NgxTTitanColorPickerPaletteListComponent.prototype.closePalette = /**
         * @return {?}
         */
            function () {
                this.activePalette = null;
            };
        /**
         * @param {?} palette
         * @return {?}
         */
        NgxTTitanColorPickerPaletteListComponent.prototype.selectPalette = /**
         * @param {?} palette
         * @return {?}
         */
            function (palette) {
                this._context.closePicker();
                if (this.activePalette == null) {
                    this.activePalette = palette;
                }
                else if (this.activePalette.id !== palette.id) {
                    this.activePalette = palette;
                }
            };
        /**
         * @param {?} color
         * @return {?}
         */
        NgxTTitanColorPickerPaletteListComponent.prototype.colorSelected = /**
         * @param {?} color
         * @return {?}
         */
            function (color) {
                this.change.emit(color);
            };
        NgxTTitanColorPickerPaletteListComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'lib-ngx-ttitan-color-picker-palette-list',
                        template: "<div class=\"picker-palette-wrapper\" *ngIf=\"pallets.length > 0\">\n  <div class=\"palette-links\">\n    <div\n      class=\"palette-link\"\n      *ngFor=\"let palette of pallets\"\n      [ngClass]=\"{'selected': (activePalette !== null && activePalette.id == palette.id)}\"\n      (click)=\"selectPalette(palette)\"\n    >\n      {{palette.name}}\n    </div>\n  </div>\n  <div class=\"palette-picker-holder\" *ngIf=\"activePalette !== null && activePalette.colors.length > 0\">\n    <div\n      class=\"palette-color\"\n      *ngFor=\"let color of activePalette.colors\"\n      [ngStyle]=\"{\n        backgroundColor: color\n      }\"\n      (click)=\"colorSelected(color)\"\n    >\n\n    </div>\n  </div>\n</div>\n",
                        styles: [":host .picker-palette-wrapper .palette-links{display:flex;flex-wrap:wrap;margin-bottom:5px}:host .picker-palette-wrapper .palette-links .palette-link{margin-right:5px;border-radius:3px;padding:2px 4px;border:1px solid #ddd;text-transform:uppercase;font-size:10px;font-family:-apple-system,BlinkMacSystemFont,San Francisco,Roboto,Segoe UI,Helvetica Neue,sans-serif;font-weight:600;background-color:#fff;cursor:pointer}:host .picker-palette-wrapper .palette-links .palette-link.selected{background-color:#5e6bc5;color:#fff}:host .picker-palette-wrapper .palette-picker-holder{height:165px;display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:flex-start;align-content:baseline;overflow-x:hidden;overflow-y:auto}:host .picker-palette-wrapper .palette-picker-holder .palette-color{cursor:pointer;width:20px;height:20px;border:1px solid #ececec;margin-top:1px;margin-right:1px;border-radius:3px}"]
                    },] },
        ];
        /** @nocollapse */
        NgxTTitanColorPickerPaletteListComponent.ctorParameters = function () { return []; };
        NgxTTitanColorPickerPaletteListComponent.propDecorators = {
            pallets: [{ type: core.Input, args: ['pallets',] }],
            _context: [{ type: core.Input, args: ['context',] }],
            change: [{ type: core.Output, args: ['change',] }]
        };
        return NgxTTitanColorPickerPaletteListComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NgxTTitanColorPickerComponent = (function () {
        function NgxTTitanColorPickerComponent(colorPickerService, cdr) {
            this.colorPickerService = colorPickerService;
            this.cdr = cdr;
            this.options = {};
            this.color = '#ffffff';
            this.title = '';
            this.colorChange = new core.EventEmitter();
            this._pickerConfig = {
                alpha: false,
                pickerShow: false,
                noHide: false,
                debug: false,
                outFormat: 'hex6',
                inputFormat: 'hex6',
                availPallets: ['polaris', 'material'],
                customPallets: [],
            };
            this.colorInit = false;
            this.pickerOpen = false;
            this.pickerPallets = [];
            this.hsva = {
                hue: 0,
                saturation: 100,
                value: 100,
                alpha: 1
            };
            this.currentColor = 'rgb(255,0,0)';
            this.currentColorMax = 'rgba(255,0,0,1)';
            this.currentColorAlpha = 'rgba(255,0,0,1)';
            this.currentColorAlphaZero = 'rgba(255,0,0,0)';
            this.uuid = 'picker-';
            this.allowedFormats = ['hex6', 'hex8', 'rgb', 'rgba'];
            this.alphaFormats = ['hex8', 'rgba'];
            this.oldColor = '';
            this.uuid = this.colorPickerService.getPickerUuid();
        }
        /**
         * @param {?} $event
         * @return {?}
         */
        NgxTTitanColorPickerComponent.prototype.componentClick = /**
         * @param {?} $event
         * @return {?}
         */
            function ($event) {
                if (!this.pickerOpen) {
                    return;
                }
                if (this._pickerConfig.noHide) {
                    return;
                }
                if (typeof $event.path !== "undefined") {
                    var /** @type {?} */ pickerFound_1 = false;
                    $event.path.every(function (item) {
                        if (typeof item.classList !== "undefined") {
                            if (item.classList.contains('picker-input-holder') ||
                                item.classList.contains('ngx-ttitan-color-picker')) {
                                pickerFound_1 = true;
                                return false;
                            }
                        }
                        return true;
                    });
                    if (!pickerFound_1) {
                        this.closePicker();
                    }
                }
            };
        /**
         * @return {?}
         */
        NgxTTitanColorPickerComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.validateInputParams();
            };
        /**
         * @param {?} changes
         * @return {?}
         */
        NgxTTitanColorPickerComponent.prototype.ngOnChanges = /**
         * @param {?} changes
         * @return {?}
         */
            function (changes) {
                var _this = this;
                if ('options' in changes) {
                    this.validateInputParams();
                }
                if ('color' in changes) {
                    if (changes["color"].currentValue !== changes["color"].previousValue) {
                        setTimeout(function () {
                            _this.colorPickerService.colorToData(_this.color, _this);
                            _this.setDraggersToCurrentColor();
                        }, 1);
                    }
                }
            };
        /**
         * @return {?}
         */
        NgxTTitanColorPickerComponent.prototype.openPicker = /**
         * @return {?}
         */
            function () {
                this.pickerOpen = true;
                if (typeof this.paletteList !== 'undefined') {
                    this.paletteList.closePalette();
                }
            };
        /**
         * @return {?}
         */
        NgxTTitanColorPickerComponent.prototype.closePicker = /**
         * @return {?}
         */
            function () {
                this.pickerOpen = false;
                this.cdr.detectChanges();
            };
        /**
         * @return {?}
         */
        NgxTTitanColorPickerComponent.prototype.validateInputParams = /**
         * @return {?}
         */
            function () {
                if ('inputFormat' in this.options) {
                    if (this.allowedFormats.indexOf(this.options.outFormat) === -1) {
                        this._pickerConfig.outFormat = 'hex6';
                        console.group("ngx-ttitan-color-picker");
                        console.warn('[outFormat] must be one of this (' + this.allowedFormats.join(',') + ')');
                        console.groupEnd();
                    }
                    else {
                        this._pickerConfig.outFormat = this.options.outFormat + '';
                    }
                }
                if ('inputFormat' in this.options) {
                    if (this.allowedFormats.indexOf(this.options.inputFormat) === -1) {
                        this._pickerConfig.inputFormat = this._pickerConfig.outFormat + '';
                        console.group("ngx-ttitan-color-picker");
                        console.warn('[inputFormat] must be one of this (' + this.allowedFormats.join(',') + ')');
                        console.groupEnd();
                    }
                    else {
                        this._pickerConfig.inputFormat = this.options.inputFormat + '';
                    }
                }
                if ('pickerShow' in this.options) {
                    if (this._pickerConfig.pickerShow !== this.options.pickerShow) {
                        this._pickerConfig.pickerShow = !this._pickerConfig.pickerShow;
                    }
                }
                if ('noHide' in this.options) {
                    if (this._pickerConfig.noHide !== this.options.noHide) {
                        this._pickerConfig.noHide = !this._pickerConfig.noHide;
                    }
                }
                if ('debug' in this.options) {
                    if (this._pickerConfig.debug !== this.options.debug) {
                        this._pickerConfig.debug = !this._pickerConfig.debug;
                    }
                }
                if ('availPallets' in this.options) {
                    this._pickerConfig.availPallets = this.options.availPallets.filter(function () { return true; });
                }
                if ('customPallets' in this.options) {
                    this._pickerConfig.customPallets = this.options.customPallets.filter(function () { return true; });
                }
                this.colorPickerService.preparePickerPallets(this._pickerConfig.availPallets, this._pickerConfig.customPallets, this);
                this._pickerConfig.alpha = this.alphaFormats.indexOf(this._pickerConfig.outFormat) !== -1;
                if (this._pickerConfig.pickerShow) {
                    this.openPicker();
                }
                this.cdr.detectChanges();
            };
        /**
         * @param {?} color
         * @return {?}
         */
        NgxTTitanColorPickerComponent.prototype.inputColorChange = /**
         * @param {?} color
         * @return {?}
         */
            function (color) {
                this.color = color;
                this.colorPickerService.colorToData(this.color, this);
                this.setDraggersToCurrentColor();
            };
        /**
         * @return {?}
         */
        NgxTTitanColorPickerComponent.prototype.updateReturnColor = /**
         * @return {?}
         */
            function () {
                this.color = this.colorPickerService.prepareReturnColor(this.hsva, this._pickerConfig.outFormat);
                if (this.colorInit) {
                    if (this.oldColor !== this.color) {
                        this.oldColor = this.color + '';
                        this.colorChange.emit(this.color + '');
                    }
                }
                this.colorInit = true;
            };
        /**
         * @return {?}
         */
        NgxTTitanColorPickerComponent.prototype.setInputValue = /**
         * @return {?}
         */
            function () {
                if (typeof this.pickerInput !== 'undefined') {
                    this.pickerInput.setInputValue(this.colorPickerService.prepareReturnColor(this.hsva, this._pickerConfig.inputFormat));
                }
            };
        /**
         * @return {?}
         */
        NgxTTitanColorPickerComponent.prototype.setDraggersToCurrentColor = /**
         * @return {?}
         */
            function () {
                if (typeof this.mainColor !== 'undefined') {
                    this.mainColor.setDragger({
                        x: this.hsva.saturation,
                        y: 100 - this.hsva.value
                    });
                }
                if (typeof this.huePicker !== 'undefined') {
                    this.huePicker.setDragger({ x: 0, y: Math.round(this.hsva.hue * 100 / 360) });
                }
                if (typeof this.alphaPicker !== 'undefined' && this._pickerConfig.alpha) {
                    this.alphaPicker.setDragger({ x: 0, y: 100 - (this.hsva.alpha * 100) });
                }
                this.cdr.detectChanges();
            };
        NgxTTitanColorPickerComponent.decorators = [
            { type: core.Component, args: [{
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        selector: 'lib-ngx-ttitan-color-picker',
                        template: "<div\n  class=\"ngx-ttitan-color-picker-wrapper\"\n>\n\n  <div class=\"picker-input-wrapper\">\n    <div\n      [ngStyle]=\"{backgroundColor: color}\"\n      class=\"debug-output\"\n      *ngIf=\"_pickerConfig.debug\"\n    >\n      {{color}}\n    </div>\n    <div class=\"picker-input-label\" *ngIf=\"title !== ''\">\n      <label [for]=\"uuid\" >{{title}}</label>\n    </div>\n    <div class=\"picker-input-holder\">\n      <div class=\"picker-color\" [ngStyle]=\"{background: currentColorAlpha}\">\n\n      </div>\n      <div class=\"picker-input\">\n        <input\n          libNgxTTitanColorPickerInput\n          #pickerInput=\"libNgxTTitanColorPickerInput\"\n          (inputChange)=\"inputColorChange($event)\"\n          [format]=\"_pickerConfig.inputFormat\"\n          [id]=\"uuid\"\n          type=\"text\"\n          (focus)=\"openPicker()\"\n        />\n      </div>\n      <!--<div class=\"picker-save-sign\">-->\n      <!--S-->\n      <!--</div>-->\n    </div>\n\n  </div>\n  <div class=\"ngx-ttitan-color-picker\" [ngClass]=\"{'no-alpha': !_pickerConfig.alpha, 'open': pickerOpen}\">\n    <div class=\"ngx-ttitan-color-picker__MainColor\">\n      <div class=\"ngx-ttitan-color-picker__ColorLayer\" [ngStyle]=\"{backgroundColor: currentColorMax}\" ></div>\n      <div class=\"ngx-ttitan-color-picker__Slidable\"\n           libNgxTTitanColorPickerSelector\n           #mainColor=\"libNgxTTitanColorPickerSelector\"\n           [context]=\"this\"\n           (change)=\"colorPickerService.saturationChange($event, this)\"\n      >\n        <div class=\"ngx-ttitan-color-picker__Dragger\"\n             libNgxTTitanColorPickerDragger\n             [context]=\"this\"\n             style=\"transform: translate3d(0px, 0px, 0px);\"\n        ></div>\n      </div>\n    </div>\n    <div class=\"ngx-ttitan-color-picker__HuePicker\">\n      <div class=\"ngx-ttitan-color-picker__Slidable\"\n           libNgxTTitanColorPickerSelector\n           #huePicker=\"libNgxTTitanColorPickerSelector\"\n           (change)=\"colorPickerService.hueChange($event, this)\"\n           [direction]=\"'vertical'\"\n           [context]=\"this\"\n      >\n        <div class=\"ngx-ttitan-color-picker__Dragger\"\n             libNgxTTitanColorPickerDragger\n             [pickerPad]=\"0\"\n             style=\" transform: translate3d(0px, 0px, 0px);\"\n             [context]=\"this\"\n        ></div>\n      </div>\n    </div>\n    <div class=\"ngx-ttitan-color-picker__AlphaPicker\" *ngIf=\"_pickerConfig.alpha === true\">\n      <div class=\"ngx-ttitan-color-picker__ColorLayer\"\n           [ngStyle]=\"{background: 'linear-gradient(to top, ' + currentColorAlphaZero + '  18px, ' + currentColor + ' calc(100% - 18px)'}\"\n      ></div>\n      <div class=\"ngx-ttitan-color-picker__Slidable\"\n           libNgxTTitanColorPickerSelector\n           #alphaPicker=\"libNgxTTitanColorPickerSelector\"\n           (change)=\"colorPickerService.alphaChange($event, this)\"\n           [direction]=\"'vertical'\"\n           [context]=\"this\"\n      >\n        <div class=\"ngx-ttitan-color-picker__Dragger\"\n             libNgxTTitanColorPickerDragger\n             [pickerPad]=\"0\" style=\" transform: translate3d(0px, 0px, 0px);\"\n             [context]=\"this\"\n        ></div>\n      </div>\n    </div>\n  </div>\n  <lib-ngx-ttitan-color-picker-palette-list\n    (change)=\"inputColorChange($event)\"\n    [pallets]=\"pickerPallets\"\n    [context]=\"this\"\n  ></lib-ngx-ttitan-color-picker-palette-list>\n</div>\n\n",
                        styles: [":host *,:host :after,:host :before{box-sizing:border-box}:host .debug-output{width:100%;height:20px}:host .picker-input-wrapper{margin-bottom:6px}:host .picker-input-wrapper .picker-input-label{margin-bottom:6px}:host .picker-input-wrapper .picker-input-label label{text-transform:uppercase;font-weight:600}:host .picker-input-wrapper .picker-input-holder{display:flex;height:33px;border:1px solid #bbb;overflow:hidden;border-radius:3px;background-color:#eee}:host .picker-input-wrapper .picker-input-holder .picker-color{flex:0 0 31px;background-color:#ff0300}:host .picker-input-wrapper .picker-input-holder .picker-input{flex:auto;background-color:transparent}:host .picker-input-wrapper .picker-input-holder .picker-input input{background-color:transparent;color:#272727;font-family:monospace;font-size:14px;border:none;outline:0;padding:8px 2px 8px 8px;width:100%}:host .picker-input-wrapper .picker-input-holder .picker-save-sign{flex:0 0 31px;line-height:33px;text-align:center}:host .ngx-ttitan-color-picker{max-height:0;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:flex;transition:max-height .3s}:host .ngx-ttitan-color-picker.open{margin-bottom:5px;max-height:165px}:host .ngx-ttitan-color-picker__ColorLayer{position:absolute;z-index:10;top:0;left:0;height:100%;width:100%;box-shadow:inset 0 0 2px 0 rgba(0,0,0,.5);pointer-events:none}:host .ngx-ttitan-color-picker__Slidable{height:100%;width:100%;cursor:pointer}:host .ngx-ttitan-color-picker__Dragger{position:relative;z-index:30;bottom:.9rem;-webkit-transform:none;transform:none;height:18px;width:18px;margin:0 auto;-webkit-backface-visibility:hidden;backface-visibility:hidden;will-change:transform;background:0 0;border:3px solid #fff;box-shadow:0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08),inset 0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08);border-radius:50%;pointer-events:none;touch-action:none}:host .ngx-ttitan-color-picker__MainColor{background-image:linear-gradient(45deg,#dfe3e8 25%,transparent 0),linear-gradient(-45deg,#dfe3e8 25%,transparent 0),linear-gradient(45deg,transparent 75%,#dfe3e8 0),linear-gradient(-45deg,transparent 75%,#dfe3e8 0);background-size:1.6rem 1.6rem;background-position:0 0,0 .8rem,.8rem -.8rem,-.8rem 0;position:relative;overflow:hidden;flex:auto;border-radius:4px;cursor:pointer}:host .ngx-ttitan-color-picker__MainColor .ngx-ttitan-color-picker__ColorLayer{box-shadow:inset 0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08);border-radius:4px}:host .ngx-ttitan-color-picker__MainColor .ngx-ttitan-color-picker__Dragger{right:.9rem;margin:0}:host .ngx-ttitan-color-picker__MainColor:after,:host .ngx-ttitan-color-picker__MainColor:before{content:\"\";position:absolute;z-index:20;top:0;left:0;display:block;height:100%;width:100%;pointer-events:none;border-radius:3px}:host .ngx-ttitan-color-picker__MainColor:before{background:linear-gradient(90deg,#fff,transparent)}:host .ngx-ttitan-color-picker__MainColor:after{background-image:linear-gradient(0deg,#000,transparent);box-shadow:inset 0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08)}:host .ngx-ttitan-color-picker__AlphaPicker,:host .ngx-ttitan-color-picker__HuePicker{position:relative;overflow:hidden;height:165px;width:24px;flex:0 0 24px;margin-left:.8rem;border-width:3px;border-radius:8rem;padding:13px 0}:host .ngx-ttitan-color-picker__HuePicker{background:linear-gradient(to bottom,red 0,#ff0 21%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%);box-shadow:inset 0 0 2px 0 rgba(0,0,0,.5)}:host .ngx-ttitan-color-picker__AlphaPicker{background-image:linear-gradient(45deg,#dfe3e8 25%,transparent 0),linear-gradient(-45deg,#dfe3e8 25%,transparent 0),linear-gradient(45deg,transparent 75%,#dfe3e8 0),linear-gradient(-45deg,transparent 75%,#dfe3e8 0);background-size:1.6rem 1.6rem;background-position:0 0,0 .8rem,.8rem -.8rem,-.8rem 0}:host .ngx-ttitan-color-picker__AlphaPicker .ngx-ttitan-color-picker__ColorLayer{border-radius:8rem}:host .ngx-ttitan-color-picker.no-alpha .ngx-ttitan-color-picker__MainColor{width:200px}"],
                    },] },
        ];
        /** @nocollapse */
        NgxTTitanColorPickerComponent.ctorParameters = function () {
            return [
                { type: NgxTTitanColorPickerService },
                { type: core.ChangeDetectorRef }
            ];
        };
        NgxTTitanColorPickerComponent.propDecorators = {
            componentClick: [{ type: core.HostListener, args: ['click', ['$event'],] }],
            options: [{ type: core.Input, args: ['options',] }],
            color: [{ type: core.Input, args: ['color',] }],
            title: [{ type: core.Input, args: ['title',] }],
            colorChange: [{ type: core.Output, args: ['colorChange',] }],
            pickerInput: [{ type: core.ViewChild, args: ['pickerInput',] }],
            paletteList: [{ type: core.ViewChild, args: [NgxTTitanColorPickerPaletteListComponent,] }],
            mainColor: [{ type: core.ViewChild, args: ['mainColor',] }],
            huePicker: [{ type: core.ViewChild, args: ['huePicker',] }],
            alphaPicker: [{ type: core.ViewChild, args: ['alphaPicker',] }]
        };
        return NgxTTitanColorPickerComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NgxTTitanColorPickerDraggerDirective = (function () {
        function NgxTTitanColorPickerDraggerDirective(elRef) {
            this.elRef = elRef;
            this.pickerPad = 0;
        }
        /**
         * @param {?} x
         * @param {?} y
         * @param {?} direction
         * @return {?}
         */
        NgxTTitanColorPickerDraggerDirective.prototype.setPosition = /**
         * @param {?} x
         * @param {?} y
         * @param {?} direction
         * @return {?}
         */
            function (x, y, direction) {
                var /** @type {?} */ rect = this.elRef.nativeElement.getBoundingClientRect();
                if (direction == 'vertical' || direction == 'both') {
                    this.elRef.nativeElement.style.top = Math.round((y - ((rect.height) / 2))) + 'px';
                }
                if (direction == 'horizontal' || direction == 'both') {
                    this.elRef.nativeElement.style.left = Math.round((x - ((rect.width) / 2))) + 'px';
                }
            };
        NgxTTitanColorPickerDraggerDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[libNgxTTitanColorPickerDragger]'
                    },] },
        ];
        /** @nocollapse */
        NgxTTitanColorPickerDraggerDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef }
            ];
        };
        NgxTTitanColorPickerDraggerDirective.propDecorators = {
            pickerPad: [{ type: core.Input, args: ['pickerPad',] }],
            _context: [{ type: core.Input, args: ['context',] }]
        };
        return NgxTTitanColorPickerDraggerDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NgxTTitanColorPickerSelectorDirective = (function () {
        function NgxTTitanColorPickerSelectorDirective(elRef, colorPickerService) {
            this.elRef = elRef;
            this.colorPickerService = colorPickerService;
            this.direction = 'both';
            this.change = new core.EventEmitter();
            this.el = null;
            this.dragStart = false;
            this.globalMouseMove = null;
            this.globalMouseUp = null;
            this.dragger = null;
            this.el = this.elRef.nativeElement;
            this.direction = (['both', 'vertical', 'horizontal'].indexOf(this.direction) === -1) ? 'both' : this.direction;
        }
        /**
         * @param {?} $event
         * @return {?}
         */
        NgxTTitanColorPickerSelectorDirective.prototype.onMouseDown = /**
         * @param {?} $event
         * @return {?}
         */
            function ($event) {
                this.dragStart = true;
                this.eventsSubscibe();
                this.getPosition($event);
            };
        /**
         * @return {?}
         */
        NgxTTitanColorPickerSelectorDirective.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        /**
         * @return {?}
         */
        NgxTTitanColorPickerSelectorDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                // this.eventsUnSubscibe();
            };
        /**
         * @return {?}
         */
        NgxTTitanColorPickerSelectorDirective.prototype.eventsSubscibe = /**
         * @return {?}
         */
            function () {
                var _this = this;
                // this.globalMouseMove = fromEvent(window, 'mousemove').subscribe((event) => {
                //   if(this.dragStart) {
                //     this.getPosition(<MouseEvent>event);
                //   }
                // });
                // this.globalMouseUp = fromEvent(window, 'mouseup').subscribe((event) => {
                //   if(this.dragStart) {
                //     this.dragStart = false;
                //     this.getPosition(<MouseEvent>event);
                //   }
                // });
                //
                this.globalMouseMove = this.colorPickerService.mouseMoveObservable.subscribe(function (event) {
                    if (_this.dragStart) {
                        _this.getPosition(/** @type {?} */ (event));
                    }
                });
                this.globalMouseUp = this.colorPickerService.mouseUpObservable.subscribe(function (event) {
                    if (_this.dragStart) {
                        _this.dragStart = false;
                        _this.eventsUnSubscibe();
                        _this.getPosition(/** @type {?} */ (event));
                    }
                });
            };
        /**
         * @return {?}
         */
        NgxTTitanColorPickerSelectorDirective.prototype.eventsUnSubscibe = /**
         * @return {?}
         */
            function () {
                if (this.globalMouseMove !== null) {
                    this.globalMouseMove.unsubscribe();
                }
                if (this.globalMouseUp !== null) {
                    this.globalMouseUp.unsubscribe();
                }
            };
        /**
         * @param {?} persent
         * @return {?}
         */
        NgxTTitanColorPickerSelectorDirective.prototype.setDragger = /**
         * @param {?} persent
         * @return {?}
         */
            function (persent) {
                if (this.dragger === null) {
                    return;
                }
                var /** @type {?} */ position = this.getRect(this.el);
                var /** @type {?} */ x = Math.round(((position.width - this.dragger.pickerPad * 2) * persent.x / 100));
                var /** @type {?} */ y = Math.round(((position.height - this.dragger.pickerPad * 2) * persent.y / 100));
                this.dragger.setPosition((x > this.dragger.pickerPad) ? x : this.dragger.pickerPad, (y > this.dragger.pickerPad) ? y : this.dragger.pickerPad, this.direction);
            };
        /**
         * @param {?} $event
         * @return {?}
         */
        NgxTTitanColorPickerSelectorDirective.prototype.getPosition = /**
         * @param {?} $event
         * @return {?}
         */
            function ($event) {
                var /** @type {?} */ cursorY = $event.pageY;
                var /** @type {?} */ cursorX = $event.pageX;
                var /** @type {?} */ position = this.getRect(this.el);
                var /** @type {?} */ percent = { x: 0, y: 0 };
                if (this.direction == 'vertical' || this.direction == 'both') {
                    percent.y = Math.round((cursorY - (position.top)) * 100 / (position.height - this.dragger.pickerPad * 2));
                    if (percent.y < 0) {
                        percent.y = 0;
                    }
                    else if (percent.y > 100) {
                        percent.y = 100;
                    }
                }
                if (this.direction == 'horizontal' || this.direction == 'both') {
                    percent.x = Math.round((cursorX - (position.left)) * 100 / (position.width - this.dragger.pickerPad * 2));
                    if (percent.x < 0) {
                        percent.x = 0;
                    }
                    else if (percent.x > 100) {
                        percent.x = 100;
                    }
                }
                this.setDragger(percent);
                this.change.emit(percent);
            };
        /**
         * @param {?} elem
         * @return {?}
         */
        NgxTTitanColorPickerSelectorDirective.prototype.getRect = /**
         * @param {?} elem
         * @return {?}
         */
            function (elem) {
                var /** @type {?} */ box = elem.getBoundingClientRect();
                var /** @type {?} */ body = document.body;
                var /** @type {?} */ docEl = document.documentElement;
                var /** @type {?} */ scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
                var /** @type {?} */ scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
                var /** @type {?} */ clientTop = docEl.clientTop || body.clientTop || 0;
                var /** @type {?} */ clientLeft = docEl.clientLeft || body.clientLeft || 0;
                return {
                    height: box.height,
                    left: box.left + scrollLeft - clientLeft,
                    top: box.top + scrollTop - clientTop,
                    width: box.width,
                };
            };
        NgxTTitanColorPickerSelectorDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[libNgxTTitanColorPickerSelector]',
                        exportAs: 'libNgxTTitanColorPickerSelector'
                    },] },
        ];
        /** @nocollapse */
        NgxTTitanColorPickerSelectorDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: NgxTTitanColorPickerService }
            ];
        };
        NgxTTitanColorPickerSelectorDirective.propDecorators = {
            onMouseDown: [{ type: core.HostListener, args: ['mousedown', ['$event'],] }],
            direction: [{ type: core.Input, args: ['direction',] }],
            _context: [{ type: core.Input, args: ['context',] }],
            change: [{ type: core.Output, args: ['change',] }],
            dragger: [{ type: core.ContentChild, args: [NgxTTitanColorPickerDraggerDirective,] }]
        };
        return NgxTTitanColorPickerSelectorDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NgxTTitanColorPickerInputDirective = (function () {
        function NgxTTitanColorPickerInputDirective(el, colorPickerService) {
            this.el = el;
            this.colorPickerService = colorPickerService;
            this.format = 'hex6';
            this.inputChange = new core.EventEmitter();
        }
        /**
         * @return {?}
         */
        NgxTTitanColorPickerInputDirective.prototype.keyUp = /**
         * @return {?}
         */
            function () {
                this.inputValidate();
            };
        /**
         * @return {?}
         */
        NgxTTitanColorPickerInputDirective.prototype.change = /**
         * @return {?}
         */
            function () {
                this.inputValidate();
            };
        /**
         * @param {?} value
         * @return {?}
         */
        NgxTTitanColorPickerInputDirective.prototype.setInputValue = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                ((this.el.nativeElement)).value = value;
            };
        /**
         * @return {?}
         */
        NgxTTitanColorPickerInputDirective.prototype.inputValidate = /**
         * @return {?}
         */
            function () {
                var /** @type {?} */ res = this.colorPickerService.validateColorFormat(this.el.nativeElement.value, this.format);
                if (res !== 'notValid') {
                    ((this.el.nativeElement)).value = res;
                    this.inputChange.emit(res);
                }
            };
        NgxTTitanColorPickerInputDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[libNgxTTitanColorPickerInput]',
                        exportAs: 'libNgxTTitanColorPickerInput'
                    },] },
        ];
        /** @nocollapse */
        NgxTTitanColorPickerInputDirective.ctorParameters = function () {
            return [
                { type: core.ElementRef },
                { type: NgxTTitanColorPickerService }
            ];
        };
        NgxTTitanColorPickerInputDirective.propDecorators = {
            format: [{ type: core.Input, args: ['format',] }],
            inputChange: [{ type: core.Output, args: ['inputChange',] }],
            keyUp: [{ type: core.HostListener, args: ['keyup',] }],
            change: [{ type: core.HostListener, args: ['change',] }]
        };
        return NgxTTitanColorPickerInputDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NgxTTitanColorPickerModule = (function () {
        function NgxTTitanColorPickerModule() {
        }
        NgxTTitanColorPickerModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule
                        ],
                        declarations: [
                            NgxTTitanColorPickerComponent,
                            NgxTTitanColorPickerSelectorDirective,
                            NgxTTitanColorPickerDraggerDirective,
                            NgxTTitanColorPickerInputDirective,
                            NgxTTitanColorPickerPaletteListComponent,
                        ],
                        exports: [NgxTTitanColorPickerComponent],
                        providers: [
                            NgxTTitanColorPickerService
                        ]
                    },] },
        ];
        return NgxTTitanColorPickerModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.NgxTTitanColorPickerService = NgxTTitanColorPickerService;
    exports.NgxTTitanColorPickerComponent = NgxTTitanColorPickerComponent;
    exports.NgxTTitanColorPickerModule = NgxTTitanColorPickerModule;
    exports.ɵc = NgxTTitanColorPickerDraggerDirective;
    exports.ɵd = NgxTTitanColorPickerInputDirective;
    exports.ɵa = NgxTTitanColorPickerPaletteListComponent;
    exports.ɵb = NgxTTitanColorPickerSelectorDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXR0aXRhbi1jb2xvci1waWNrZXIudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci9saWIvbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuc2VydmljZS50cyIsIm5nOi8vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIvbGliL25neC10dGl0YW4tY29sb3ItcGlja2VyLXBhbGV0dGUtbGlzdC9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1wYWxldHRlLWxpc3QuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci9saWIvbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci9saWIvbmd4LXR0aXRhbi1jb2xvci1waWNrZXItZHJhZ2dlci5kaXJlY3RpdmUudHMiLCJuZzovL25neC10dGl0YW4tY29sb3ItcGlja2VyL2xpYi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1zZWxlY3Rvci5kaXJlY3RpdmUudHMiLCJuZzovL25neC10dGl0YW4tY29sb3ItcGlja2VyL2xpYi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1pbnB1dC5kaXJlY3RpdmUudHMiLCJuZzovL25neC10dGl0YW4tY29sb3ItcGlja2VyL2xpYi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudH0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuY29tcG9uZW50XCI7XG5pbXBvcnQge2Zyb21FdmVudCwgT2JzZXJ2YWJsZX0gZnJvbSBcInJ4anMvaW5kZXhcIjtcbmltcG9ydCB7d2luZG93fSBmcm9tIFwicnhqcy9pbnRlcm5hbC9vcGVyYXRvcnNcIjtcbmltcG9ydCB7Q3VzdG9tUGVyY2VudCwgSFNWQSwgUGFsZXR0ZX0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuaW50ZXJmYWNlXCI7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5neFRUaXRhbkNvbG9yUGlja2VyU2VydmljZSB7XG5cbiAgcHVibGljIHBpY2tlckxpc3Q6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgcHVibGljIHBhbGxldHM6IEFycmF5PFBhbGV0dGU+ID0gW107XG5cbiAgcHVibGljIG1vdXNlTW92ZU9ic2VydmFibGU6IE9ic2VydmFibGU8TW91c2VFdmVudD4gPSA8T2JzZXJ2YWJsZTxNb3VzZUV2ZW50Pj5mcm9tRXZlbnQoZG9jdW1lbnQsICdtb3VzZW1vdmUnKTtcbiAgcHVibGljIG1vdXNlVXBPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPE1vdXNlRXZlbnQ+ID0gPE9ic2VydmFibGU8TW91c2VFdmVudD4+ZnJvbUV2ZW50KGRvY3VtZW50LCAnbW91c2V1cCcpO1xuICAvLyBwdWJsaWMgbW91c2VNb3ZlT2JzZXJ2YWJsZTogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAvLyBwdWJsaWMgbW91c2VVcE9ic2VydmFibGU6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmZpbGxCYXNlUGFsbGV0cygpO1xuICAgIC8vXG4gICAgLy8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKCRldmVudCkgPT4ge1xuICAgIC8vICAgdGhpcy5tb3VzZU1vdmVPYnNlcnZhYmxlLmVtaXQoPE1vdXNlRXZlbnQ+JGV2ZW50KTtcbiAgICAvLyB9KTtcbiAgICAvLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKCRldmVudCkgPT4ge1xuICAgIC8vICAgdGhpcy5tb3VzZVVwT2JzZXJ2YWJsZS5lbWl0KDxNb3VzZUV2ZW50PiRldmVudCk7XG4gICAgLy8gfSk7XG5cbiAgfVxuXG4gIHNhdHVyYXRpb25DaGFuZ2UocGVyY2VudDogQ3VzdG9tUGVyY2VudCwgcGlja2VyQ29tcG9uZW50OiBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCApIHtcbiAgICBwaWNrZXJDb21wb25lbnQuaHN2YS5zYXR1cmF0aW9uID0gcGVyY2VudC54O1xuICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLnZhbHVlID0gKDEwMCAtIHBlcmNlbnQueSk7XG4gICAgdGhpcy5kYXRhVG9Db2xvcihwaWNrZXJDb21wb25lbnQpO1xuICB9XG5cbiAgaHVlQ2hhbmdlKHBlcmNlbnQ6IEN1c3RvbVBlcmNlbnQsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBwaWNrZXJDb21wb25lbnQuaHN2YS5odWUgPSBNYXRoLnJvdW5kKDM2MCAqIHBlcmNlbnQueSAvIDEwMCk7XG4gICAgdGhpcy5kYXRhVG9Db2xvcihwaWNrZXJDb21wb25lbnQpO1xuICB9XG5cbiAgYWxwaGFDaGFuZ2UocGVyY2VudDogQ3VzdG9tUGVyY2VudCwgcGlja2VyQ29tcG9uZW50OiBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCkge1xuICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLmFscGhhID0gKDEwMCAtIHBlcmNlbnQueSkgLyAxMDA7XG4gICAgdGhpcy5kYXRhVG9Db2xvcihwaWNrZXJDb21wb25lbnQpO1xuICB9XG5cbiAgZGF0YVRvQ29sb3IocGlja2VyQ29tcG9uZW50OiBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCkge1xuICAgIGxldCByZ2JhQXJyOiBBcnJheTxudW1iZXI+ID0gdGhpcy5oc3ZhVG9SZ2JhKFxuICAgICAgcGlja2VyQ29tcG9uZW50LmhzdmEuaHVlLFxuICAgICAgcGlja2VyQ29tcG9uZW50LmhzdmEuc2F0dXJhdGlvbixcbiAgICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLnZhbHVlLFxuICAgICAgcGlja2VyQ29tcG9uZW50LmhzdmEuYWxwaGFcbiAgICApO1xuICAgIGxldCByZ2JhTWF4QXJyOiBBcnJheTxudW1iZXI+ID0gdGhpcy5oc3ZhVG9SZ2JhKFxuICAgICAgcGlja2VyQ29tcG9uZW50LmhzdmEuaHVlLFxuICAgICAgMTAwLFxuICAgICAgMTAwLFxuICAgICAgcGlja2VyQ29tcG9uZW50LmhzdmEuYWxwaGFcbiAgICApO1xuXG4gICAgcGlja2VyQ29tcG9uZW50LmN1cnJlbnRDb2xvciA9ICdyZ2IoJyArIHJnYmFBcnJbMF0gKyAnLCcgKyByZ2JhQXJyWzFdICsgJywnICsgcmdiYUFyclsyXSArICcpJztcbiAgICBwaWNrZXJDb21wb25lbnQuY3VycmVudENvbG9yTWF4ID0gJ3JnYmEoJyArIHJnYmFNYXhBcnJbMF0gKyAnLCcgKyByZ2JhTWF4QXJyWzFdICsgJywnICsgcmdiYU1heEFyclsyXSArICcsJyArIHJnYmFNYXhBcnJbM10gKyAnKSc7XG4gICAgcGlja2VyQ29tcG9uZW50LmN1cnJlbnRDb2xvckFscGhhID0gJ3JnYmEoJyArIHJnYmFBcnJbMF0gKyAnLCcgKyByZ2JhQXJyWzFdICsgJywnICsgcmdiYUFyclsyXSArICcsJyArIHJnYmFBcnJbM10gKyAnKSc7XG4gICAgcGlja2VyQ29tcG9uZW50LmN1cnJlbnRDb2xvckFscGhhWmVybyA9ICdyZ2JhKCcgKyByZ2JhQXJyWzBdICsgJywnICsgcmdiYUFyclsxXSArICcsJyArIHJnYmFBcnJbMl0gKyAnLDApJztcblxuICAgIHBpY2tlckNvbXBvbmVudC5zZXRJbnB1dFZhbHVlKCk7XG4gICAgcGlja2VyQ29tcG9uZW50LnVwZGF0ZVJldHVybkNvbG9yKCk7XG5cblxuICB9XG5cbiAgY29sb3JUb0RhdGEoY29sb3I6IHN0cmluZywgcGlja2VyQ29tcG9uZW50OiBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCkge1xuICAgIHN3aXRjaCAodGhpcy5kZXRlY3RDb2xvclR5cGUoY29sb3IpKSB7XG4gICAgICBjYXNlIFwicmdiYVwiOiB0aGlzLnBhcnNlUmdiYUNvbG9yKGNvbG9yLCBwaWNrZXJDb21wb25lbnQpOyBicmVhaztcbiAgICAgIGNhc2UgXCJyZ2JcIjogdGhpcy5wYXJzZVJnYkNvbG9yKGNvbG9yLCBwaWNrZXJDb21wb25lbnQpOyBicmVhaztcbiAgICAgIGNhc2UgXCJoc2xhXCI6IHRoaXMucGFyc2VIc2xhQ29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudCk7IGJyZWFrO1xuICAgICAgY2FzZSBcImhzbFwiOiB0aGlzLnBhcnNlSHNsQ29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudCk7IGJyZWFrO1xuICAgICAgY2FzZSBcImhleDZcIjogdGhpcy5wYXJzZUhleENvbG9yKGNvbG9yLCBwaWNrZXJDb21wb25lbnQpOyBicmVhaztcbiAgICAgIGNhc2UgXCJoZXg4XCI6IHRoaXMucGFyc2VIZXhDb2xvcihjb2xvciwgcGlja2VyQ29tcG9uZW50KTsgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMuZGF0YVRvQ29sb3IocGlja2VyQ29tcG9uZW50KTtcbiAgfVxuXG4gIGdldFBpY2tlclV1aWQoKSB7XG4gICAgbGV0IHBpY2tlcklkID0gJyc7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IDEwMDA7IGkrKykge1xuICAgICAgcGlja2VySWQgPSAncGlja2VyLScgKyB0aGlzLnBpY2tlckxpc3QubGVuZ3RoICsgJy0nICsgaTtcbiAgICAgIGlmKHRoaXMucGlja2VyTGlzdC5pbmRleE9mKHBpY2tlcklkKSA9PT0gLTEgKSB7XG4gICAgICAgIHRoaXMucGlja2VyTGlzdC5wdXNoKHBpY2tlcklkKTtcbiAgICAgICAgcmV0dXJuIHBpY2tlcklkO1xuICAgICAgfVxuICAgIH1cblxuICB9XG5cblxuICBkZXRlY3RDb2xvclR5cGUoY29sb3I6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYoY29sb3IuaW5kZXhPZigncmdiYScpICE9PSAtMSkge1xuICAgICAgcmV0dXJuICdyZ2JhJztcbiAgICB9IGVsc2UgaWYoY29sb3IuaW5kZXhPZigncmdiJykgIT09IC0xKSB7XG4gICAgICByZXR1cm4gJ3JnYic7XG4gICAgfSBlbHNlIGlmKGNvbG9yLmluZGV4T2YoJ2hzbGEnKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiAnaHNsYSc7XG4gICAgfSBlbHNlIGlmKGNvbG9yLmluZGV4T2YoJ2hzbCcpICE9PSAtMSkge1xuICAgICAgcmV0dXJuICdoc2wnO1xuICAgIH0gZWxzZSBpZiAoY29sb3IuaW5kZXhPZignIycpICE9PSAtMSAmJiAoY29sb3IubGVuZ3RoID09IDQgfHwgY29sb3IubGVuZ3RoID09IDcpKXtcbiAgICAgIHJldHVybiAnaGV4Nic7XG4gICAgfSBlbHNlIGlmIChjb2xvci5pbmRleE9mKCcjJykgIT09IC0xICYmIGNvbG9yLmxlbmd0aCA9PSA5KXtcbiAgICAgIHJldHVybiAnaGV4OCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAndW5kZWZpbmVkJztcbiAgICB9XG4gIH1cblxuXG4gIGZpbGxWYWx1ZXNGcm9tSHN2YUFycihoc3ZhQXJyOiBBcnJheTxudW1iZXI+LCBwaWNrZXJDb21wb25lbnQ6IE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50KSB7XG4gICAgcGlja2VyQ29tcG9uZW50LmhzdmEuaHVlID0gaHN2YUFyclswXTtcbiAgICBwaWNrZXJDb21wb25lbnQuaHN2YS5zYXR1cmF0aW9uID0gaHN2YUFyclsxXTtcbiAgICBwaWNrZXJDb21wb25lbnQuaHN2YS52YWx1ZSA9IGhzdmFBcnJbMl07XG4gICAgcGlja2VyQ29tcG9uZW50LmhzdmEuYWxwaGEgPSBoc3ZhQXJyWzNdO1xuICB9XG5cblxuICBwYXJzZVJnYmFDb2xvcihjb2xvciwgcGlja2VyQ29tcG9uZW50OiBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCkge1xuICAgIGxldCBhdXMgPSBjb2xvci5yZXBsYWNlKCdyZ2JhKCcsICcnKS5yZXBsYWNlKCcpJywgJycpO1xuICAgIGxldCBhdXMyID0gYXVzLnNwbGl0KCcsJyk7XG4gICAgaWYoYXVzMi5sZW5ndGggPT0gNCkge1xuICAgICAgdGhpcy5maWxsVmFsdWVzRnJvbUhzdmFBcnIoXG4gICAgICAgIHRoaXMucmdiYVRvSHN2YShcbiAgICAgICAgICBwYXJzZUludChhdXMyWzBdKSxcbiAgICAgICAgICBwYXJzZUludChhdXMyWzFdKSxcbiAgICAgICAgICBwYXJzZUludChhdXMyWzJdKSxcbiAgICAgICAgICBwYXJzZUZsb2F0KGF1czJbM10pLFxuICAgICAgICApLFxuICAgICAgICBwaWNrZXJDb21wb25lbnRcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcGFyc2VSZ2JDb2xvcihjb2xvciwgcGlja2VyQ29tcG9uZW50OiBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCkge1xuICAgIGxldCBhdXMgPSBjb2xvci5yZXBsYWNlKCdyZ2IoJywgJycpLnJlcGxhY2UoJyknLCAnJyk7XG4gICAgbGV0IGF1czIgPSBhdXMuc3BsaXQoJywnKTtcbiAgICBpZihhdXMyLmxlbmd0aCA9PSAzKSB7XG4gICAgICB0aGlzLmZpbGxWYWx1ZXNGcm9tSHN2YUFycihcbiAgICAgICAgdGhpcy5yZ2JhVG9Ic3ZhKFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbMF0pLFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbMV0pLFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbMl0pLFxuICAgICAgICAgIDFcbiAgICAgICAgKSxcbiAgICAgICAgcGlja2VyQ29tcG9uZW50XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHBhcnNlSHNsYUNvbG9yKGNvbG9yLCBwaWNrZXJDb21wb25lbnQ6IE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50KSB7XG4gICAgbGV0IGF1cyA9IGNvbG9yLnJlcGxhY2UoJ2hzbGEoJywgJycpLnJlcGxhY2UoJyknLCAnJykucmVwbGFjZSgnJScsICcnKTtcbiAgICBsZXQgYXVzMiA9IGF1cy5zcGxpdCgnLCcpO1xuICAgIGlmKGF1czIubGVuZ3RoID09IDQpIHtcbiAgICAgIHRoaXMuZmlsbFZhbHVlc0Zyb21Ic3ZhQXJyKFxuICAgICAgICB0aGlzLmhzbGFUb0hzdmEoXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlswXSksXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlsxXSksXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlsyXSksXG4gICAgICAgICAgcGFyc2VGbG9hdChhdXMyWzNdKSxcbiAgICAgICAgKSxcbiAgICAgICAgcGlja2VyQ29tcG9uZW50XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHBhcnNlSHNsQ29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBsZXQgYXVzID0gY29sb3IucmVwbGFjZSgnaHNsKCcsICcnKS5yZXBsYWNlKCcpJywgJycpLnJlcGxhY2UoJyUnLCAnJyk7XG4gICAgbGV0IGF1czIgPSBhdXMuc3BsaXQoJywnKTtcbiAgICBpZihhdXMyLmxlbmd0aCA9PSAzKSB7XG4gICAgICB0aGlzLmZpbGxWYWx1ZXNGcm9tSHN2YUFycihcbiAgICAgICAgdGhpcy5oc2xhVG9Ic3ZhKFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbMF0pLFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbMV0pLFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbMl0pLFxuICAgICAgICAgIDFcbiAgICAgICAgKSxcbiAgICAgICAgcGlja2VyQ29tcG9uZW50XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHBhcnNlSGV4Q29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBsZXQgYXVzID0gY29sb3IucmVwbGFjZSgnIycsICcnKTtcbiAgICB0aGlzLmZpbGxWYWx1ZXNGcm9tSHN2YUFycihcbiAgICAgIHRoaXMuaGV4VG9Ic3ZhKGF1cyksXG4gICAgICBwaWNrZXJDb21wb25lbnRcbiAgICApO1xuICB9XG5cblxuXG4gIGhzdmFUb1JnYmEoSCwgUywgViwgQSk6IEFycmF5PG51bWJlcj4ge1xuICAgIGxldCBmICwgcCwgcSAsIHQsIGxILCBSLCBHLCBCO1xuXG4gICAgSCA9IChIIDwgMzYwKSA/IEggOiAzNTk7XG4gICAgUyA9IFMgLyAxMDA7XG4gICAgViA9IFYgLyAxMDA7XG5cbiAgICBsSCA9IE1hdGguZmxvb3IoSCAvIDYwKTtcblxuICAgIGYgPSBILzYwIC0gbEg7XG5cbiAgICBwID0gViAqICgxIC0gUyk7XG5cbiAgICBxID0gViAqKDEgLSBTKmYpO1xuXG4gICAgdCA9IFYqICgxIC0gKDEtZikqIFMpO1xuXG4gICAgc3dpdGNoIChsSCl7XG4gICAgICBjYXNlIDA6IFIgPSBWOyBHID0gdDsgQiA9IHA7IGJyZWFrO1xuICAgICAgY2FzZSAxOiBSID0gcTsgRyA9IFY7IEIgPSBwOyBicmVhaztcbiAgICAgIGNhc2UgMjogUiA9IHA7IEcgPSBWOyBCID0gdDsgYnJlYWs7XG4gICAgICBjYXNlIDM6IFIgPSBwOyBHID0gcTsgQiA9IFY7IGJyZWFrO1xuICAgICAgY2FzZSA0OiBSID0gdDsgRyA9IHA7IEIgPSBWOyBicmVhaztcbiAgICAgIGNhc2UgNTogUiA9IFY7IEcgPSBwOyBCID0gcTsgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtNYXRoLnJvdW5kKFIqMjU1KSwgTWF0aC5yb3VuZChHKjI1NSksIE1hdGgucm91bmQoQioyNTUpLCBBXTtcbiAgfVxuXG4gIGhzdmFUb1JnYmFTdHJpbmcoSCwgUywgViwgQSwgc2hvd0FscGhhOiBib29sZWFuID0gZmFsc2UpOiBzdHJpbmcge1xuICAgIGxldCBjb2xvckFycjogQXJyYXk8bnVtYmVyPiA9IHRoaXMuaHN2YVRvUmdiYShILCBTLCBWLCBBKTtcblxuICAgIGlmKHNob3dBbHBoYSkge1xuICAgICAgcmV0dXJuICdyZ2JhKCcgKyBjb2xvckFyci5qb2luKCcsJykgKyAnKSc7XG4gICAgfVxuXG4gICAgY29sb3JBcnIucG9wKCk7XG4gICAgcmV0dXJuICdyZ2IoJyArIGNvbG9yQXJyLmpvaW4oJywnKSArICcpJztcblxuICB9XG5cbiAgcmdiYVRvSHN2YShyLCBnLCBiLCBhKTogQXJyYXk8bnVtYmVyPiB7XG4gICAgciAvPSAyNTU7XG4gICAgZyAvPSAyNTU7XG4gICAgYiAvPSAyNTU7XG5cbiAgICBsZXQgbWF4ID0gTWF0aC5tYXgociwgZywgYiksIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xuICAgIGxldCBoLCBzLCB2ID0gbWF4O1xuICAgIGxldCBkID0gbWF4IC0gbWluO1xuICAgIHMgPSBtYXggPT0gMCA/IDAgOiBkIC8gbWF4O1xuXG4gICAgaWYgKG1heCA9PSBtaW4pIHtcbiAgICAgIGggPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2ggKG1heCkge1xuICAgICAgICBjYXNlIHI6IGggPSAoZyAtIGIpIC8gZCArIChnIDwgYiA/IDYgOiAwKTsgYnJlYWs7XG4gICAgICAgIGNhc2UgZzogaCA9IChiIC0gcikgLyBkICsgMjsgYnJlYWs7XG4gICAgICAgIGNhc2UgYjogaCA9IChyIC0gZykgLyBkICsgNDsgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGggLz0gNjtcbiAgICB9XG5cblxuICAgIHJldHVybiBbXG4gICAgICBoICogMzYwLFxuICAgICAgcyAqIDEwMCxcbiAgICAgIHYgKiAxMDAsXG4gICAgICBhXG4gICAgXTtcbiAgfVxuXG4gIGhzdmFUb0hzbGEoaCwgcywgdiwgYSk6IEFycmF5PG51bWJlcj57XG4gICAgcyAvPSAxMDA7XG4gICAgdiAvPSAxMDA7XG4gICAgcmV0dXJuW1xuICAgICAgTWF0aC5yb3VuZChoKSxcbiAgICAgIE1hdGgucm91bmQoKHMqdi8oKGg9KDItcykqdik8MT9oOjItaCkpICogMTAwKSxcbiAgICAgIE1hdGgucm91bmQoKGgvMikgKiAxMDApLFxuICAgICAgYVxuICAgIF1cbiAgfVxuXG4gIGhzbGFUb0hzdmEgKGgsIHMsIGwsIGEpOiBBcnJheTxudW1iZXI+e1xuICAgIHMgLz0gMTAwO1xuICAgIGwgLz0gMTAwO1xuICAgIHMqPWw8LjU/bDoxLWw7XG4gICAgcmV0dXJuW1xuICAgICAgaCxcbiAgICAgIE1hdGgucm91bmQoKDIqcy8obCtzKSkgKiAxMDApLFxuICAgICAgTWF0aC5yb3VuZCgobCtzKSAqIDEwMCksXG4gICAgICBhXG4gICAgXVxuICB9XG5cbiAgaGV4VG9Ic3ZhKGhleDogc3RyaW5nKTogQXJyYXk8bnVtYmVyPiB7XG5cbiAgICBsZXQgcmdiYSA9IFswLDAsMCwxXTtcbiAgICBpZiAoaGV4Lmxlbmd0aCA9PSA2KSB7XG4gICAgICByZ2JhID0gW1xuICAgICAgICBwYXJzZUludChoZXguc3Vic3RyaW5nKDAsIDIpLCAxNiksXG4gICAgICAgIHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMiwgNCksIDE2KSxcbiAgICAgICAgcGFyc2VJbnQoaGV4LnN1YnN0cmluZyg0LCA2KSwgMTYpLFxuICAgICAgICAxXG4gICAgICBdO1xuICAgIH0gZWxzZSBpZiAoaGV4Lmxlbmd0aCA9PSAzKSB7XG4gICAgICByZ2JhID0gW1xuICAgICAgICBwYXJzZUludChoZXguc3Vic3RyaW5nKDAsIDEpICsgaGV4LnN1YnN0cmluZygwLCAxKSwgMTYpLFxuICAgICAgICBwYXJzZUludChoZXguc3Vic3RyaW5nKDEsIDIpICsgaGV4LnN1YnN0cmluZygxLCAyKSwgMTYpLFxuICAgICAgICBwYXJzZUludChoZXguc3Vic3RyaW5nKDIsIDMpICsgaGV4LnN1YnN0cmluZygyLCAzKSwgMTYpLFxuICAgICAgICAxXG4gICAgICBdXG4gICAgfSBlbHNlIGlmIChoZXgubGVuZ3RoID09IDgpIHtcbiAgICAgIHJnYmEgPSBbXG4gICAgICAgIHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMCwgMiksIDE2KSxcbiAgICAgICAgcGFyc2VJbnQoaGV4LnN1YnN0cmluZygyLCA0KSwgMTYpLFxuICAgICAgICBwYXJzZUludChoZXguc3Vic3RyaW5nKDQsIDYpLCAxNiksXG4gICAgICAgIHBhcnNlRmxvYXQoKHBhcnNlSW50KGhleC5zdWJzdHJpbmcoNiwgOCksIDE2KSAvIDI1NSkudG9GaXhlZCgyKSlcbiAgICAgIF1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmdiYVRvSHN2YShyZ2JhWzBdLCByZ2JhWzFdLCByZ2JhWzJdLCByZ2JhWzNdKTtcblxuICB9XG5cbiAgaHN2YVRvSGV4KEgsIFMsIFYsIEEsIHNob3dBbHBoYTogYm9vbGVhbiA9IHRydWUpOiBzdHJpbmcge1xuICAgIGxldCByZ2JhOiBBcnJheTxudW1iZXI+ID0gdGhpcy5oc3ZhVG9SZ2JhKEgsIFMsIFYsIEEpO1xuICAgIGxldCBoQTogc3RyaW5nID0gKChzaG93QWxwaGEpID8gKHJnYmFbM10gKiAyNTUpLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMCwyKSA6ICcnKTtcbiAgICBpZihoQS5sZW5ndGggPiAwKSB7XG4gICAgICBpZihoQS5pbmRleE9mKCcuJykgIT09IC0xKSB7XG4gICAgICAgIGhBID0gJzAnICsgaEEuc2xpY2UoMCwxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihzaG93QWxwaGEpIHtcbiAgICAgIGhBID0gKGhBLmxlbmd0aCA9PSAxKSA/IGhBICsgaEEgOiBoQTtcbiAgICB9XG4gICAgcmV0dXJuICcjJyArXG4gICAgICAoKHJnYmFbMl0gfCByZ2JhWzFdIDw8IDggfCByZ2JhWzBdIDw8IDE2KSB8IDEgPDwgMjQpLnRvU3RyaW5nKDE2KS5zbGljZSgxKSArXG4gICAgICBoQTtcbiAgfVxuXG5cbiAgdmFsaWRhdGVDb2xvckZvcm1hdCh2YWx1ZTogc3RyaW5nLCBmb3JtYXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgc3dpdGNoIChmb3JtYXQpIHtcbiAgICAgIGNhc2UgXCJoZXg2XCI6IHJldHVybiB0aGlzLnZhbGlkYXRlSGV4Rm9ybWF0KHZhbHVlKTtcbiAgICAgIGNhc2UgXCJoZXg4XCI6IHJldHVybiB0aGlzLnZhbGlkYXRlSGV4Rm9ybWF0KHZhbHVlLCB0cnVlKTtcbiAgICAgIGNhc2UgXCJyZ2JcIjogcmV0dXJuIHRoaXMudmFsaWRhdGVSZ2JhRm9ybWF0KHZhbHVlKTtcbiAgICAgIGNhc2UgXCJyZ2JhXCI6IHJldHVybiB0aGlzLnZhbGlkYXRlUmdiYUZvcm1hdCh2YWx1ZSwgdHJ1ZSk7XG4gICAgICAvLyBjYXNlIFwiaHNsXCI6IHJldHVybiB0aGlzLnZhbGlkYXRlSGV4Rm9ybWF0KHZhbHVlKTtcbiAgICAgIC8vIGNhc2UgXCJoc2xhXCI6IHJldHVybiB0aGlzLnZhbGlkYXRlSGV4Rm9ybWF0KHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuICdub3RWYWxpZCc7XG4gIH1cblxuICB2YWxpZGF0ZUhleEZvcm1hdCh2YWx1ZTogc3RyaW5nLCBhbHBoYTogYm9vbGVhbiA9IGZhbHNlKTogc3RyaW5nIHtcbiAgICBsZXQgcmVzdWx0ID0gJ25vdFZhbGlkJztcbiAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoJyMnLCAnJyk7XG4gICAgaWYoIWFscGhhKSB7XG4gICAgICBpZih2YWx1ZS5sZW5ndGggPT09IDYpIHtcbiAgICAgICAgaWYoIWlzTmFOKHBhcnNlSW50KHZhbHVlLCAxNikpKSB7XG4gICAgICAgICAgcmV0dXJuICcjJyArIHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKHZhbHVlLmxlbmd0aCA9PT0gOCkge1xuICAgICAgICBpZighaXNOYU4ocGFyc2VJbnQodmFsdWUsIDE2KSkpIHtcbiAgICAgICAgICByZXR1cm4gJyMnICsgdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgdmFsaWRhdGVSZ2JhRm9ybWF0KHZhbHVlOiBzdHJpbmcsIGFscGhhOiBib29sZWFuID0gZmFsc2UpOiBzdHJpbmcge1xuICAgIGxldCByZXN1bHQgPSAnbm90VmFsaWQnO1xuICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvW14wLTlcXCxdKy9nLCBcIlwiKTtcbiAgICBsZXQgYXVzQXJyOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+ID0gdmFsdWUuc3BsaXQoJywnKTtcbiAgICBsZXQgYWxwaGFWYWw6IHN0cmluZyB8IG51bWJlciA9ICcnO1xuXG4gICAgaWYoIWFscGhhKSB7XG4gICAgICBpZihhdXNBcnIubGVuZ3RoID09IDMpIHtcbiAgICAgICAgYXVzQXJyID0gYXVzQXJyLm1hcChmdW5jdGlvbih2YWw6IHN0cmluZyl7cmV0dXJuIHBhcnNlSW50KHZhbCl9KTtcbiAgICAgICAgaWYoXG4gICAgICAgICAgTWF0aC5tYXguYXBwbHkobnVsbCwgYXVzQXJyKSA8PSAyNTUgJiZcbiAgICAgICAgICBNYXRoLm1pbi5hcHBseShudWxsLCBhdXNBcnIpID49IDBcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuICdyZ2IoJyArIGF1c0Fyci5qb2luKCcsJykgKyAnKSc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYoYXVzQXJyLmxlbmd0aCA9PSA0KSB7XG4gICAgICAgIGFscGhhVmFsID0gcGFyc2VGbG9hdCg8c3RyaW5nPmF1c0Fyci5wb3AoKSk7XG4gICAgICAgIGF1c0FyciA9IGF1c0Fyci5tYXAoZnVuY3Rpb24odmFsOiBzdHJpbmcpe3JldHVybiBwYXJzZUludCh2YWwpfSk7XG4gICAgICAgIGlmKFxuICAgICAgICAgIE1hdGgubWF4LmFwcGx5KG51bGwsIGF1c0FycikgPD0gMjU1ICYmXG4gICAgICAgICAgTWF0aC5taW4uYXBwbHkobnVsbCwgYXVzQXJyKSA+PSAwICYmXG4gICAgICAgICAgYWxwaGFWYWwgPj0gMCAmJiBhbHBoYVZhbCA8PSAxXG4gICAgICAgICkge1xuICAgICAgICAgIGF1c0Fyci5wdXNoKGFscGhhVmFsKTtcbiAgICAgICAgICByZXR1cm4gJ3JnYmEoJyArIGF1c0Fyci5qb2luKCcsJykgKyAnKSc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJlcGFyZVJldHVybkNvbG9yKGhzdmE6IEhTVkEsIGZvcm1hdDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBzd2l0Y2ggKGZvcm1hdCkge1xuICAgICAgY2FzZSBcImhleDZcIjogcmV0dXJuIHRoaXMuaHN2YVRvSGV4KGhzdmEuaHVlLCBoc3ZhLnNhdHVyYXRpb24sIGhzdmEudmFsdWUsIDEsIGZhbHNlKTtcbiAgICAgIGNhc2UgXCJoZXg4XCI6IHJldHVybiB0aGlzLmhzdmFUb0hleChoc3ZhLmh1ZSwgaHN2YS5zYXR1cmF0aW9uLCBoc3ZhLnZhbHVlLCBoc3ZhLmFscGhhLCB0cnVlKTtcbiAgICAgIGNhc2UgXCJyZ2JcIjogcmV0dXJuIHRoaXMuaHN2YVRvUmdiYVN0cmluZyhoc3ZhLmh1ZSwgaHN2YS5zYXR1cmF0aW9uLCBoc3ZhLnZhbHVlLCAxKTtcbiAgICAgIGNhc2UgXCJyZ2JhXCI6IHJldHVybiB0aGlzLmhzdmFUb1JnYmFTdHJpbmcoaHN2YS5odWUsIGhzdmEuc2F0dXJhdGlvbiwgaHN2YS52YWx1ZSwgaHN2YS5hbHBoYSwgdHJ1ZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmhzdmFUb0hleChoc3ZhLmh1ZSwgaHN2YS5zYXR1cmF0aW9uLCBoc3ZhLnZhbHVlLCAxLCBmYWxzZSk7XG4gIH1cblxuICBwcmVwYXJlUGlja2VyUGFsbGV0cyhhdmFpbFBhbGxldHM6IEFycmF5PHN0cmluZz4gPSBbXSwgY3VzdG9tUGFsbGV0czogQXJyYXk8UGFsZXR0ZT4gPSBbXSwgcGlja2VyQ29tcG9uZW50OiBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCkge1xuICAgIHBpY2tlckNvbXBvbmVudC5waWNrZXJQYWxsZXRzID0gW107XG4gICAgdGhpcy5wYWxsZXRzLmZvckVhY2goKHBhbGV0dGUpID0+IHtcbiAgICAgIGlmKGF2YWlsUGFsbGV0cy5pbmRleE9mKHBhbGV0dGUuaWQpICE9PSAtMSkge1xuICAgICAgICBwaWNrZXJDb21wb25lbnQucGlja2VyUGFsbGV0cy5wdXNoKHBhbGV0dGUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGN1c3RvbVBhbGxldHMuZm9yRWFjaCgocGFsZXR0ZSkgPT4ge1xuICAgICAgcGlja2VyQ29tcG9uZW50LnBpY2tlclBhbGxldHMucHVzaChwYWxldHRlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZpbGxCYXNlUGFsbGV0cygpIHtcbiAgICB0aGlzLnBhbGxldHMucHVzaCh7XG4gICAgICBpZDogJ3BvbGFyaXMnLFxuICAgICAgbmFtZTogJ1BvbGFyaXMnLFxuICAgICAgY29sb3JzOiBbXG4gICAgICAgICcjRjlGQUZCJywgJyNGNEY2RjgnLCAnI0RGRTNFOCcsICcjQzRDREQ1JyxcbiAgICAgICAgJyM5MTlFQUInLCAnIzYzNzM4MScsICcjNDU0RjVCJywgJyMyMTJCMzYnLFxuICAgICAgICAnI0IzQjVDQicsICcjNDM0NjdGJywgJyMxQzIyNjAnLCAnIzAwMDQ0QycsXG4gICAgICAgICcjRjZGMEZEJywgJyNFM0QwRkYnLCAnIzlDNkFERScsICcjNTAyNDhGJywgJyMyMzAwNTEnLFxuICAgICAgICAnI0Y0RjVGQScsICcjQjNCQ0Y1JywgJyM1QzZBQzQnLCAnIzIwMkU3OCcsICcjMDAwNjM5JyxcbiAgICAgICAgJyNFQkY1RkEnLCAnI0I0RTFGQScsICcjMDA3QUNFJywgJyMwODRFOEEnLCAnIzAwMTQyOScsXG4gICAgICAgICcjRTBGNUY1JywgJyNCN0VDRUMnLCAnIzQ3QzFCRicsICcjMDA4NDhFJywgJyMwMDMxMzUnLFxuICAgICAgICAnI0UzRjFERicsICcjQkJFNUIzJywgJyM1MEI4M0MnLCAnIzEwODA0MycsICcjMTczNjMwJyxcbiAgICAgICAgJyNGQ0YxQ0QnLCAnI0ZGRUE4QScsICcjRUVDMjAwJywgJyM5QzZGMTknLCAnIzU3M0IwMCcsXG4gICAgICAgICcjRkNFQkRCJywgJyNGRkM1OEInLCAnI0Y0OTM0MicsICcjQzA1NzE3JywgJyM0QTE1MDQnLFxuICAgICAgICAnI0ZCRUFFNScsICcjRkVBRDlBJywgJyNERTM2MTgnLCAnI0JGMDcxMScsICcjMzMwMTAxJyxcbiAgICAgIF1cbiAgICB9KTtcbiAgICB0aGlzLnBhbGxldHMucHVzaCh7XG4gICAgICBpZDogJ21hdGVyaWFsJyxcbiAgICAgIG5hbWU6ICdNYXRlcmlhbCcsXG4gICAgICBjb2xvcnM6IFtcbiAgICAgICAgJyNmZmViZWUnLCAnI2ZmY2RkMicsICcjZWY5YTlhJywgJyNlNTczNzMnLCAnI2VmNTM1MCcsICcjZjQ0MzM2JywgJyNlNTM5MzUnLCAnI2QzMmYyZicsICcjYzYyODI4JywgJyNiNzFjMWMnLCAnI2ZmOGE4MCcsICcjZmY1MjUyJywgJyNmZjE3NDQnLCAnI2Q1MDAwMCcsXG4gICAgICAgICcjZmNlNGVjJywgJyNmOGJiZDAnLCAnI2Y0OGZiMScsICcjZjA2MjkyJywgJyNlYzQwN2EnLCAnI2U5MWU2MycsICcjZDgxYjYwJywgJyNjMjE4NWInLCAnI2FkMTQ1NycsICcjODgwZTRmJywgJyNmZjgwYWInLCAnI2ZmNDA4MScsICcjZjUwMDU3JywgJyNjNTExNjInLFxuICAgICAgICAnI2YzZTVmNScsICcjZTFiZWU3JywgJyNjZTkzZDgnLCAnI2JhNjhjOCcsICcjYWI0N2JjJywgJyM5YzI3YjAnLCAnIzhlMjRhYScsICcjN2IxZmEyJywgJyM2YTFiOWEnLCAnIzRhMTQ4YycsICcjZWE4MGZjJywgJyNlMDQwZmInLCAnI2Q1MDBmOScsICcjYWEwMGZmJyxcbiAgICAgICAgJyNlZGU3ZjYnLCAnI2QxYzRlOScsICcjYjM5ZGRiJywgJyM5NTc1Y2QnLCAnIzdlNTdjMicsICcjNjczYWI3JywgJyM1ZTM1YjEnLCAnIzUxMmRhOCcsICcjNDUyN2EwJywgJyMzMTFiOTInLCAnI2IzODhmZicsICcjN2M0ZGZmJywgJyM2NTFmZmYnLCAnIzYyMDBlYScsXG4gICAgICAgICcjZThlYWY2JywgJyNjNWNhZTknLCAnIzlmYThkYScsICcjNzk4NmNiJywgJyM1YzZiYzAnLCAnIzNmNTFiNScsICcjMzk0OWFiJywgJyMzMDNmOWYnLCAnIzI4MzU5MycsICcjMWEyMzdlJywgJyM4YzllZmYnLCAnIzUzNmRmZScsICcjM2Q1YWZlJywgJyMzMDRmZmUnLFxuICAgICAgICAnI2UzZjJmZCcsICcjYmJkZWZiJywgJyM5MGNhZjknLCAnIzY0YjVmNicsICcjNDJhNWY1JywgJyMyMTk2ZjMnLCAnIzFlODhlNScsICcjMTk3NmQyJywgJyMxNTY1YzAnLCAnIzBkNDdhMScsICcjODJiMWZmJywgJyM0NDhhZmYnLCAnIzI5NzlmZicsICcjMjk2MmZmJyxcbiAgICAgICAgJyNlMWY1ZmUnLCAnI2IzZTVmYycsICcjODFkNGZhJywgJyM0ZmMzZjcnLCAnIzI5YjZmNicsICcjMDNhOWY0JywgJyMwMzliZTUnLCAnIzAyODhkMScsICcjMDI3N2JkJywgJyMwMTU3OWInLCAnIzgwZDhmZicsICcjNDBjNGZmJywgJyMwMGIwZmYnLCAnIzAwOTFlYScsXG4gICAgICAgICcjZTBmN2ZhJywgJyNiMmViZjInLCAnIzgwZGVlYScsICcjNGRkMGUxJywgJyMyNmM2ZGEnLCAnIzAwYmNkNCcsICcjMDBhY2MxJywgJyMwMDk3YTcnLCAnIzAwODM4ZicsICcjMDA2MDY0JywgJyM4NGZmZmYnLCAnIzE4ZmZmZicsICcjMDBlNWZmJywgJyMwMGI4ZDQnLFxuICAgICAgICAnI2UwZjJmMScsICcjYjJkZmRiJywgJyM4MGNiYzQnLCAnIzRkYjZhYycsICcjMjZhNjlhJywgJyMwMDk2ODgnLCAnIzAwODk3YicsICcjMDA3OTZiJywgJyMwMDY5NWMnLCAnIzAwNGQ0MCcsICcjYTdmZmViJywgJyM2NGZmZGEnLCAnIzFkZTliNicsICcjMDBiZmE1JyxcbiAgICAgICAgJyNlOGY1ZTknLCAnI2M4ZTZjOScsICcjYTVkNmE3JywgJyM4MWM3ODQnLCAnIzY2YmI2YScsICcjNGNhZjUwJywgJyM0M2EwNDcnLCAnIzM4OGUzYycsICcjMmU3ZDMyJywgJyMxYjVlMjAnLCAnI2I5ZjZjYScsICcjNjlmMGFlJywgJyMwMGU2NzYnLCAnIzAwYzg1MycsXG4gICAgICAgICcjZjFmOGU5JywgJyNkY2VkYzgnLCAnI2M1ZTFhNScsICcjYWVkNTgxJywgJyM5Y2NjNjUnLCAnIzhiYzM0YScsICcjN2NiMzQyJywgJyM2ODlmMzgnLCAnIzU1OGIyZicsICcjMzM2OTFlJywgJyNjY2ZmOTAnLCAnI2IyZmY1OScsICcjNzZmZjAzJywgJyM2NGRkMTcnLFxuICAgICAgICAnI2Y5ZmJlNycsICcjZjBmNGMzJywgJyNlNmVlOWMnLCAnI2RjZTc3NScsICcjZDRlMTU3JywgJyNjZGRjMzknLCAnI2MwY2EzMycsICcjYWZiNDJiJywgJyM5ZTlkMjQnLCAnIzgyNzcxNycsICcjZjRmZjgxJywgJyNlZWZmNDEnLCAnI2M2ZmYwMCcsICcjYWVlYTAwJyxcbiAgICAgICAgJyNmZmZkZTcnLCAnI2ZmZjljNCcsICcjZmZmNTlkJywgJyNmZmYxNzYnLCAnI2ZmZWU1OCcsICcjZmZlYjNiJywgJyNmZGQ4MzUnLCAnI2ZiYzAyZCcsICcjZjlhODI1JywgJyNmNTdmMTcnLCAnI2ZmZmY4ZCcsICcjZmZmZjAwJywgJyNmZmVhMDAnLCAnI2ZmZDYwMCcsXG4gICAgICAgICcjZmZmOGUxJywgJyNmZmVjYjMnLCAnI2ZmZTA4MicsICcjZmZkNTRmJywgJyNmZmNhMjgnLCAnI2ZmYzEwNycsICcjZmZiMzAwJywgJyNmZmEwMDAnLCAnI2ZmOGYwMCcsICcjZmY2ZjAwJywgJyNmZmU1N2YnLCAnI2ZmZDc0MCcsICcjZmZjNDAwJywgJyNmZmFiMDAnLFxuICAgICAgICAnI2ZmZjNlMCcsICcjZmZlMGIyJywgJyNmZmNjODAnLCAnI2ZmYjc0ZCcsICcjZmZhNzI2JywgJyNmZjk4MDAnLCAnI2ZiOGMwMCcsICcjZjU3YzAwJywgJyNlZjZjMDAnLCAnI2U2NTEwMCcsICcjZmZkMTgwJywgJyNmZmFiNDAnLCAnI2ZmOTEwMCcsICcjZmY2ZDAwJyxcbiAgICAgICAgJyNmYmU5ZTcnLCAnI2ZmY2NiYycsICcjZmZhYjkxJywgJyNmZjhhNjUnLCAnI2ZmNzA0MycsICcjZmY1NzIyJywgJyNmNDUxMWUnLCAnI2U2NGExOScsICcjZDg0MzE1JywgJyNiZjM2MGMnLCAnI2ZmOWU4MCcsICcjZmY2ZTQwJywgJyNmZjNkMDAnLCAnI2RkMmMwMCcsXG4gICAgICAgICcjZWZlYmU5JywgJyNkN2NjYzgnLCAnI2JjYWFhNCcsICcjYTE4ODdmJywgJyM4ZDZlNjMnLCAnIzc5NTU0OCcsICcjNmQ0YzQxJywgJyM1ZDQwMzcnLCAnIzRlMzQyZScsICcjM2UyNzIzJyxcbiAgICAgICAgJyNmYWZhZmEnLCAnI2Y1ZjVmNScsICcjZWVlZWVlJywgJyNlMGUwZTAnLCAnI2JkYmRiZCcsICcjOWU5ZTllJywgJyM3NTc1NzUnLCAnIzYxNjE2MScsICcjNDI0MjQyJywgJyMyMTIxMjEnLFxuICAgICAgICAnI2VjZWZmMScsICcjY2ZkOGRjJywgJyNiMGJlYzUnLCAnIzkwYTRhZScsICcjNzg5MDljJywgJyM2MDdkOGInLCAnIzU0NmU3YScsICcjNDU1YTY0JywgJyMzNzQ3NGYnLCAnIzI2MzIzOCcsXG4gICAgICBdXG4gICAgfSk7XG4gIH1cblxuXG5cblxuXG59XG4iLCJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb2xvclBpY2tlckNvbXBvbmVudCwgUGFsZXR0ZX0gZnJvbSBcIi4uL25neC10dGl0YW4tY29sb3ItcGlja2VyLmludGVyZmFjZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItbmd4LXR0aXRhbi1jb2xvci1waWNrZXItcGFsZXR0ZS1saXN0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwicGlja2VyLXBhbGV0dGUtd3JhcHBlclwiICpuZ0lmPVwicGFsbGV0cy5sZW5ndGggPiAwXCI+XG4gIDxkaXYgY2xhc3M9XCJwYWxldHRlLWxpbmtzXCI+XG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJwYWxldHRlLWxpbmtcIlxuICAgICAgKm5nRm9yPVwibGV0IHBhbGV0dGUgb2YgcGFsbGV0c1wiXG4gICAgICBbbmdDbGFzc109XCJ7J3NlbGVjdGVkJzogKGFjdGl2ZVBhbGV0dGUgIT09IG51bGwgJiYgYWN0aXZlUGFsZXR0ZS5pZCA9PSBwYWxldHRlLmlkKX1cIlxuICAgICAgKGNsaWNrKT1cInNlbGVjdFBhbGV0dGUocGFsZXR0ZSlcIlxuICAgID5cbiAgICAgIHt7cGFsZXR0ZS5uYW1lfX1cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJwYWxldHRlLXBpY2tlci1ob2xkZXJcIiAqbmdJZj1cImFjdGl2ZVBhbGV0dGUgIT09IG51bGwgJiYgYWN0aXZlUGFsZXR0ZS5jb2xvcnMubGVuZ3RoID4gMFwiPlxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwicGFsZXR0ZS1jb2xvclwiXG4gICAgICAqbmdGb3I9XCJsZXQgY29sb3Igb2YgYWN0aXZlUGFsZXR0ZS5jb2xvcnNcIlxuICAgICAgW25nU3R5bGVdPVwie1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yXG4gICAgICB9XCJcbiAgICAgIChjbGljayk9XCJjb2xvclNlbGVjdGVkKGNvbG9yKVwiXG4gICAgPlxuXG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgOmhvc3QgLnBpY2tlci1wYWxldHRlLXdyYXBwZXIgLnBhbGV0dGUtbGlua3N7ZGlzcGxheTpmbGV4O2ZsZXgtd3JhcDp3cmFwO21hcmdpbi1ib3R0b206NXB4fTpob3N0IC5waWNrZXItcGFsZXR0ZS13cmFwcGVyIC5wYWxldHRlLWxpbmtzIC5wYWxldHRlLWxpbmt7bWFyZ2luLXJpZ2h0OjVweDtib3JkZXItcmFkaXVzOjNweDtwYWRkaW5nOjJweCA0cHg7Ym9yZGVyOjFweCBzb2xpZCAjZGRkO3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtmb250LXNpemU6MTBweDtmb250LWZhbWlseTotYXBwbGUtc3lzdGVtLEJsaW5rTWFjU3lzdGVtRm9udCxTYW4gRnJhbmNpc2NvLFJvYm90byxTZWdvZSBVSSxIZWx2ZXRpY2EgTmV1ZSxzYW5zLXNlcmlmO2ZvbnQtd2VpZ2h0OjYwMDtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7Y3Vyc29yOnBvaW50ZXJ9Omhvc3QgLnBpY2tlci1wYWxldHRlLXdyYXBwZXIgLnBhbGV0dGUtbGlua3MgLnBhbGV0dGUtbGluay5zZWxlY3RlZHtiYWNrZ3JvdW5kLWNvbG9yOiM1ZTZiYzU7Y29sb3I6I2ZmZn06aG9zdCAucGlja2VyLXBhbGV0dGUtd3JhcHBlciAucGFsZXR0ZS1waWNrZXItaG9sZGVye2hlaWdodDoxNjVweDtkaXNwbGF5OmZsZXg7ZmxleC13cmFwOndyYXA7YWxpZ24taXRlbXM6ZmxleC1zdGFydDtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydDthbGlnbi1jb250ZW50OmJhc2VsaW5lO292ZXJmbG93LXg6aGlkZGVuO292ZXJmbG93LXk6YXV0b306aG9zdCAucGlja2VyLXBhbGV0dGUtd3JhcHBlciAucGFsZXR0ZS1waWNrZXItaG9sZGVyIC5wYWxldHRlLWNvbG9ye2N1cnNvcjpwb2ludGVyO3dpZHRoOjIwcHg7aGVpZ2h0OjIwcHg7Ym9yZGVyOjFweCBzb2xpZCAjZWNlY2VjO21hcmdpbi10b3A6MXB4O21hcmdpbi1yaWdodDoxcHg7Ym9yZGVyLXJhZGl1czozcHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4VFRpdGFuQ29sb3JQaWNrZXJQYWxldHRlTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCdwYWxsZXRzJykgcHVibGljIHBhbGxldHM6IEFycmF5PFBhbGV0dGU+ID0gW107XG4gIEBJbnB1dCgnY29udGV4dCcpIHB1YmxpYyBfY29udGV4dDogQ29sb3JQaWNrZXJDb21wb25lbnQ7XG4gIEBPdXRwdXQoJ2NoYW5nZScpIHB1YmxpYyBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgcHVibGljIGFjdGl2ZVBhbGV0dGU6IFBhbGV0dGUgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBjbG9zZVBhbGV0dGUoKSB7XG4gICAgdGhpcy5hY3RpdmVQYWxldHRlID0gbnVsbDtcbiAgfVxuXG4gIHNlbGVjdFBhbGV0dGUocGFsZXR0ZTogUGFsZXR0ZSkge1xuICAgIHRoaXMuX2NvbnRleHQuY2xvc2VQaWNrZXIoKTtcbiAgICBpZihcbiAgICAgIHRoaXMuYWN0aXZlUGFsZXR0ZSA9PSBudWxsXG4gICAgKSB7XG4gICAgICB0aGlzLmFjdGl2ZVBhbGV0dGUgPSBwYWxldHRlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5hY3RpdmVQYWxldHRlLmlkICE9PSBwYWxldHRlLmlkKSB7XG4gICAgICB0aGlzLmFjdGl2ZVBhbGV0dGUgPSBwYWxldHRlO1xuICAgIH1cblxuICB9XG5cbiAgY29sb3JTZWxlY3RlZChjb2xvcikge1xuICAgIHRoaXMuY2hhbmdlLmVtaXQoY29sb3IpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uQ2hhbmdlcywgT25Jbml0LFxuICBPdXRwdXQsIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Tmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvckRpcmVjdGl2ZX0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXItc2VsZWN0b3IuZGlyZWN0aXZlXCI7XG5pbXBvcnQge05neFRUaXRhbkNvbG9yUGlja2VyU2VydmljZX0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuc2VydmljZVwiO1xuaW1wb3J0IHtOZ3hUVGl0YW5Db2xvclBpY2tlcklucHV0RGlyZWN0aXZlfSBmcm9tIFwiLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1pbnB1dC5kaXJlY3RpdmVcIjtcbmltcG9ydCB7Tmd4VFRpdGFuQ29sb3JQaWNrZXJQYWxldHRlTGlzdENvbXBvbmVudH0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXItcGFsZXR0ZS1saXN0L25neC10dGl0YW4tY29sb3ItcGlja2VyLXBhbGV0dGUtbGlzdC5jb21wb25lbnRcIjtcbmltcG9ydCB7SFNWQSwgUGFsZXR0ZSwgUGlja2VyQ29uZmlnLCBQaWNrZXJPcHRpb25zfSBmcm9tIFwiLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci5pbnRlcmZhY2VcIjtcbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc2VsZWN0b3I6ICdsaWItbmd4LXR0aXRhbi1jb2xvci1waWNrZXInLFxuICB0ZW1wbGF0ZTogYDxkaXZcclxuICBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyLXdyYXBwZXJcIlxyXG4+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJwaWNrZXItaW5wdXQtd3JhcHBlclwiPlxyXG4gICAgPGRpdlxyXG4gICAgICBbbmdTdHlsZV09XCJ7YmFja2dyb3VuZENvbG9yOiBjb2xvcn1cIlxyXG4gICAgICBjbGFzcz1cImRlYnVnLW91dHB1dFwiXHJcbiAgICAgICpuZ0lmPVwiX3BpY2tlckNvbmZpZy5kZWJ1Z1wiXHJcbiAgICA+XHJcbiAgICAgIHt7Y29sb3J9fVxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWlucHV0LWxhYmVsXCIgKm5nSWY9XCJ0aXRsZSAhPT0gJydcIj5cclxuICAgICAgPGxhYmVsIFtmb3JdPVwidXVpZFwiID57e3RpdGxlfX08L2xhYmVsPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWlucHV0LWhvbGRlclwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWNvbG9yXCIgW25nU3R5bGVdPVwie2JhY2tncm91bmQ6IGN1cnJlbnRDb2xvckFscGhhfVwiPlxyXG5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItaW5wdXRcIj5cclxuICAgICAgICA8aW5wdXRcclxuICAgICAgICAgIGxpYk5neFRUaXRhbkNvbG9yUGlja2VySW5wdXRcclxuICAgICAgICAgICNwaWNrZXJJbnB1dD1cImxpYk5neFRUaXRhbkNvbG9yUGlja2VySW5wdXRcIlxyXG4gICAgICAgICAgKGlucHV0Q2hhbmdlKT1cImlucHV0Q29sb3JDaGFuZ2UoJGV2ZW50KVwiXHJcbiAgICAgICAgICBbZm9ybWF0XT1cIl9waWNrZXJDb25maWcuaW5wdXRGb3JtYXRcIlxyXG4gICAgICAgICAgW2lkXT1cInV1aWRcIlxyXG4gICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgKGZvY3VzKT1cIm9wZW5QaWNrZXIoKVwiXHJcbiAgICAgICAgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDwhLS08ZGl2IGNsYXNzPVwicGlja2VyLXNhdmUtc2lnblwiPi0tPlxyXG4gICAgICA8IS0tUy0tPlxyXG4gICAgICA8IS0tPC9kaXY+LS0+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyXCIgW25nQ2xhc3NdPVwieyduby1hbHBoYSc6ICFfcGlja2VyQ29uZmlnLmFscGhhLCAnb3Blbic6IHBpY2tlck9wZW59XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX01haW5Db2xvclwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0NvbG9yTGF5ZXJcIiBbbmdTdHlsZV09XCJ7YmFja2dyb3VuZENvbG9yOiBjdXJyZW50Q29sb3JNYXh9XCIgPjwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX1NsaWRhYmxlXCJcclxuICAgICAgICAgICBsaWJOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yXHJcbiAgICAgICAgICAgI21haW5Db2xvcj1cImxpYk5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JcIlxyXG4gICAgICAgICAgIFtjb250ZXh0XT1cInRoaXNcIlxyXG4gICAgICAgICAgIChjaGFuZ2UpPVwiY29sb3JQaWNrZXJTZXJ2aWNlLnNhdHVyYXRpb25DaGFuZ2UoJGV2ZW50LCB0aGlzKVwiXHJcbiAgICAgID5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0RyYWdnZXJcIlxyXG4gICAgICAgICAgICAgbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyXHJcbiAgICAgICAgICAgICBbY29udGV4dF09XCJ0aGlzXCJcclxuICAgICAgICAgICAgIHN0eWxlPVwidHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwcHgsIDBweCwgMHB4KTtcIlxyXG4gICAgICAgID48L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fSHVlUGlja2VyXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fU2xpZGFibGVcIlxyXG4gICAgICAgICAgIGxpYk5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JcclxuICAgICAgICAgICAjaHVlUGlja2VyPVwibGliTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvclwiXHJcbiAgICAgICAgICAgKGNoYW5nZSk9XCJjb2xvclBpY2tlclNlcnZpY2UuaHVlQ2hhbmdlKCRldmVudCwgdGhpcylcIlxyXG4gICAgICAgICAgIFtkaXJlY3Rpb25dPVwiJ3ZlcnRpY2FsJ1wiXHJcbiAgICAgICAgICAgW2NvbnRleHRdPVwidGhpc1wiXHJcbiAgICAgID5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0RyYWdnZXJcIlxyXG4gICAgICAgICAgICAgbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyXHJcbiAgICAgICAgICAgICBbcGlja2VyUGFkXT1cIjBcIlxyXG4gICAgICAgICAgICAgc3R5bGU9XCIgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwcHgsIDBweCwgMHB4KTtcIlxyXG4gICAgICAgICAgICAgW2NvbnRleHRdPVwidGhpc1wiXHJcbiAgICAgICAgPjwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19BbHBoYVBpY2tlclwiICpuZ0lmPVwiX3BpY2tlckNvbmZpZy5hbHBoYSA9PT0gdHJ1ZVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0NvbG9yTGF5ZXJcIlxyXG4gICAgICAgICAgIFtuZ1N0eWxlXT1cIntiYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KHRvIHRvcCwgJyArIGN1cnJlbnRDb2xvckFscGhhWmVybyArICcgIDE4cHgsICcgKyBjdXJyZW50Q29sb3IgKyAnIGNhbGMoMTAwJSAtIDE4cHgpJ31cIlxyXG4gICAgICA+PC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fU2xpZGFibGVcIlxyXG4gICAgICAgICAgIGxpYk5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JcclxuICAgICAgICAgICAjYWxwaGFQaWNrZXI9XCJsaWJOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yXCJcclxuICAgICAgICAgICAoY2hhbmdlKT1cImNvbG9yUGlja2VyU2VydmljZS5hbHBoYUNoYW5nZSgkZXZlbnQsIHRoaXMpXCJcclxuICAgICAgICAgICBbZGlyZWN0aW9uXT1cIid2ZXJ0aWNhbCdcIlxyXG4gICAgICAgICAgIFtjb250ZXh0XT1cInRoaXNcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19EcmFnZ2VyXCJcclxuICAgICAgICAgICAgIGxpYk5neFRUaXRhbkNvbG9yUGlja2VyRHJhZ2dlclxyXG4gICAgICAgICAgICAgW3BpY2tlclBhZF09XCIwXCIgc3R5bGU9XCIgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwcHgsIDBweCwgMHB4KTtcIlxyXG4gICAgICAgICAgICAgW2NvbnRleHRdPVwidGhpc1wiXHJcbiAgICAgICAgPjwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIDxsaWItbmd4LXR0aXRhbi1jb2xvci1waWNrZXItcGFsZXR0ZS1saXN0XHJcbiAgICAoY2hhbmdlKT1cImlucHV0Q29sb3JDaGFuZ2UoJGV2ZW50KVwiXHJcbiAgICBbcGFsbGV0c109XCJwaWNrZXJQYWxsZXRzXCJcclxuICAgIFtjb250ZXh0XT1cInRoaXNcIlxyXG4gID48L2xpYi1uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1wYWxldHRlLWxpc3Q+XHJcbjwvZGl2PlxyXG5cclxuYCxcbiAgc3R5bGVzOiBbYDpob3N0ICosOmhvc3QgOmFmdGVyLDpob3N0IDpiZWZvcmV7Ym94LXNpemluZzpib3JkZXItYm94fTpob3N0IC5kZWJ1Zy1vdXRwdXR7d2lkdGg6MTAwJTtoZWlnaHQ6MjBweH06aG9zdCAucGlja2VyLWlucHV0LXdyYXBwZXJ7bWFyZ2luLWJvdHRvbTo2cHh9Omhvc3QgLnBpY2tlci1pbnB1dC13cmFwcGVyIC5waWNrZXItaW5wdXQtbGFiZWx7bWFyZ2luLWJvdHRvbTo2cHh9Omhvc3QgLnBpY2tlci1pbnB1dC13cmFwcGVyIC5waWNrZXItaW5wdXQtbGFiZWwgbGFiZWx7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2ZvbnQtd2VpZ2h0OjYwMH06aG9zdCAucGlja2VyLWlucHV0LXdyYXBwZXIgLnBpY2tlci1pbnB1dC1ob2xkZXJ7ZGlzcGxheTpmbGV4O2hlaWdodDozM3B4O2JvcmRlcjoxcHggc29saWQgI2JiYjtvdmVyZmxvdzpoaWRkZW47Ym9yZGVyLXJhZGl1czozcHg7YmFja2dyb3VuZC1jb2xvcjojZWVlfTpob3N0IC5waWNrZXItaW5wdXQtd3JhcHBlciAucGlja2VyLWlucHV0LWhvbGRlciAucGlja2VyLWNvbG9ye2ZsZXg6MCAwIDMxcHg7YmFja2dyb3VuZC1jb2xvcjojZmYwMzAwfTpob3N0IC5waWNrZXItaW5wdXQtd3JhcHBlciAucGlja2VyLWlucHV0LWhvbGRlciAucGlja2VyLWlucHV0e2ZsZXg6YXV0bztiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50fTpob3N0IC5waWNrZXItaW5wdXQtd3JhcHBlciAucGlja2VyLWlucHV0LWhvbGRlciAucGlja2VyLWlucHV0IGlucHV0e2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7Y29sb3I6IzI3MjcyNztmb250LWZhbWlseTptb25vc3BhY2U7Zm9udC1zaXplOjE0cHg7Ym9yZGVyOm5vbmU7b3V0bGluZTowO3BhZGRpbmc6OHB4IDJweCA4cHggOHB4O3dpZHRoOjEwMCV9Omhvc3QgLnBpY2tlci1pbnB1dC13cmFwcGVyIC5waWNrZXItaW5wdXQtaG9sZGVyIC5waWNrZXItc2F2ZS1zaWdue2ZsZXg6MCAwIDMxcHg7bGluZS1oZWlnaHQ6MzNweDt0ZXh0LWFsaWduOmNlbnRlcn06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJ7bWF4LWhlaWdodDowO292ZXJmbG93OmhpZGRlbjstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmU7ZGlzcGxheTpmbGV4O3RyYW5zaXRpb246bWF4LWhlaWdodCAuM3N9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyLm9wZW57bWFyZ2luLWJvdHRvbTo1cHg7bWF4LWhlaWdodDoxNjVweH06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0NvbG9yTGF5ZXJ7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxMDt0b3A6MDtsZWZ0OjA7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTtib3gtc2hhZG93Omluc2V0IDAgMCAycHggMCByZ2JhKDAsMCwwLC41KTtwb2ludGVyLWV2ZW50czpub25lfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fU2xpZGFibGV7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTtjdXJzb3I6cG9pbnRlcn06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0RyYWdnZXJ7cG9zaXRpb246cmVsYXRpdmU7ei1pbmRleDozMDtib3R0b206LjlyZW07LXdlYmtpdC10cmFuc2Zvcm06bm9uZTt0cmFuc2Zvcm06bm9uZTtoZWlnaHQ6MThweDt3aWR0aDoxOHB4O21hcmdpbjowIGF1dG87LXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjtiYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjt3aWxsLWNoYW5nZTp0cmFuc2Zvcm07YmFja2dyb3VuZDowIDA7Ym9yZGVyOjNweCBzb2xpZCAjZmZmO2JveC1zaGFkb3c6MCAwIDAgMXB4IHJnYmEoNiw0NCw4MiwuMSksMCAycHggMTZweCByZ2JhKDMzLDQzLDU0LC4wOCksaW5zZXQgMCAwIDAgMXB4IHJnYmEoNiw0NCw4MiwuMSksMCAycHggMTZweCByZ2JhKDMzLDQzLDU0LC4wOCk7Ym9yZGVyLXJhZGl1czo1MCU7cG9pbnRlci1ldmVudHM6bm9uZTt0b3VjaC1hY3Rpb246bm9uZX06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX01haW5Db2xvcntiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudCg0NWRlZywjZGZlM2U4IDI1JSx0cmFuc3BhcmVudCAwKSxsaW5lYXItZ3JhZGllbnQoLTQ1ZGVnLCNkZmUzZTggMjUlLHRyYW5zcGFyZW50IDApLGxpbmVhci1ncmFkaWVudCg0NWRlZyx0cmFuc3BhcmVudCA3NSUsI2RmZTNlOCAwKSxsaW5lYXItZ3JhZGllbnQoLTQ1ZGVnLHRyYW5zcGFyZW50IDc1JSwjZGZlM2U4IDApO2JhY2tncm91bmQtc2l6ZToxLjZyZW0gMS42cmVtO2JhY2tncm91bmQtcG9zaXRpb246MCAwLDAgLjhyZW0sLjhyZW0gLS44cmVtLC0uOHJlbSAwO3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbjtmbGV4OmF1dG87Ym9yZGVyLXJhZGl1czo0cHg7Y3Vyc29yOnBvaW50ZXJ9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19NYWluQ29sb3IgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19Db2xvckxheWVye2JveC1zaGFkb3c6aW5zZXQgMCAwIDAgMXB4IHJnYmEoNiw0NCw4MiwuMSksMCAycHggMTZweCByZ2JhKDMzLDQzLDU0LC4wOCk7Ym9yZGVyLXJhZGl1czo0cHh9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19NYWluQ29sb3IgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19EcmFnZ2Vye3JpZ2h0Oi45cmVtO21hcmdpbjowfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fTWFpbkNvbG9yOmFmdGVyLDpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fTWFpbkNvbG9yOmJlZm9yZXtjb250ZW50OlwiXCI7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoyMDt0b3A6MDtsZWZ0OjA7ZGlzcGxheTpibG9jaztoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO3BvaW50ZXItZXZlbnRzOm5vbmU7Ym9yZGVyLXJhZGl1czozcHh9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19NYWluQ29sb3I6YmVmb3Jle2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDkwZGVnLCNmZmYsdHJhbnNwYXJlbnQpfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fTWFpbkNvbG9yOmFmdGVye2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KDBkZWcsIzAwMCx0cmFuc3BhcmVudCk7Ym94LXNoYWRvdzppbnNldCAwIDAgMCAxcHggcmdiYSg2LDQ0LDgyLC4xKSwwIDJweCAxNnB4IHJnYmEoMzMsNDMsNTQsLjA4KX06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0FscGhhUGlja2VyLDpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fSHVlUGlja2Vye3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbjtoZWlnaHQ6MTY1cHg7d2lkdGg6MjRweDtmbGV4OjAgMCAyNHB4O21hcmdpbi1sZWZ0Oi44cmVtO2JvcmRlci13aWR0aDozcHg7Ym9yZGVyLXJhZGl1czo4cmVtO3BhZGRpbmc6MTNweCAwfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fSHVlUGlja2Vye2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSxyZWQgMCwjZmYwIDIxJSwjMGYwIDMzJSwjMGZmIDUwJSwjMDBmIDY3JSwjZjBmIDgzJSxyZWQgMTAwJSk7Ym94LXNoYWRvdzppbnNldCAwIDAgMnB4IDAgcmdiYSgwLDAsMCwuNSl9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19BbHBoYVBpY2tlcntiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudCg0NWRlZywjZGZlM2U4IDI1JSx0cmFuc3BhcmVudCAwKSxsaW5lYXItZ3JhZGllbnQoLTQ1ZGVnLCNkZmUzZTggMjUlLHRyYW5zcGFyZW50IDApLGxpbmVhci1ncmFkaWVudCg0NWRlZyx0cmFuc3BhcmVudCA3NSUsI2RmZTNlOCAwKSxsaW5lYXItZ3JhZGllbnQoLTQ1ZGVnLHRyYW5zcGFyZW50IDc1JSwjZGZlM2U4IDApO2JhY2tncm91bmQtc2l6ZToxLjZyZW0gMS42cmVtO2JhY2tncm91bmQtcG9zaXRpb246MCAwLDAgLjhyZW0sLjhyZW0gLS44cmVtLC0uOHJlbSAwfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fQWxwaGFQaWNrZXIgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19Db2xvckxheWVye2JvcmRlci1yYWRpdXM6OHJlbX06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXIubm8tYWxwaGEgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19NYWluQ29sb3J7d2lkdGg6MjAwcHh9YF0sXG59KVxuZXhwb3J0IGNsYXNzIE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSkgY29tcG9uZW50Q2xpY2soJGV2ZW50KSB7XG4gICAgaWYoIXRoaXMucGlja2VyT3Blbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZih0aGlzLl9waWNrZXJDb25maWcubm9IaWRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmKHR5cGVvZiAkZXZlbnQucGF0aCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgbGV0IHBpY2tlckZvdW5kID0gZmFsc2U7XG4gICAgICAkZXZlbnQucGF0aC5ldmVyeShmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIGlmKFxuICAgICAgICAgIHR5cGVvZiBpdGVtLmNsYXNzTGlzdCAhPT0gXCJ1bmRlZmluZWRcIlxuICAgICAgICApIHtcbiAgICAgICAgICBpZihcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdwaWNrZXItaW5wdXQtaG9sZGVyJykgfHxcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCduZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcicpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBwaWNrZXJGb3VuZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9KTtcblxuICAgICAgaWYoIXBpY2tlckZvdW5kKSB7XG5cbiAgICAgICAgdGhpcy5jbG9zZVBpY2tlcigpO1xuICAgICAgfVxuXG4gICAgfVxuICB9XG5cbiAgQElucHV0KCdvcHRpb25zJykgcHVibGljIG9wdGlvbnM6IFBpY2tlck9wdGlvbnMgPSB7fTtcbiAgQElucHV0KCdjb2xvcicpIHB1YmxpYyBjb2xvcjogc3RyaW5nID0gJyNmZmZmZmYnO1xuICBASW5wdXQoJ3RpdGxlJykgcHVibGljIHRpdGxlOiBzdHJpbmcgPSAnJztcbiAgQE91dHB1dCgnY29sb3JDaGFuZ2UnKSBwdWJsaWMgY29sb3JDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cblxuICBAVmlld0NoaWxkKCdwaWNrZXJJbnB1dCcpIHB1YmxpYyBwaWNrZXJJbnB1dDogTmd4VFRpdGFuQ29sb3JQaWNrZXJJbnB1dERpcmVjdGl2ZTtcbiAgQFZpZXdDaGlsZChOZ3hUVGl0YW5Db2xvclBpY2tlclBhbGV0dGVMaXN0Q29tcG9uZW50KSBwdWJsaWMgcGFsZXR0ZUxpc3Q6IE5neFRUaXRhbkNvbG9yUGlja2VyUGFsZXR0ZUxpc3RDb21wb25lbnQ7XG4gIEBWaWV3Q2hpbGQoJ21haW5Db2xvcicpIHB1YmxpYyBtYWluQ29sb3I6IE5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JEaXJlY3RpdmU7XG4gIEBWaWV3Q2hpbGQoJ2h1ZVBpY2tlcicpIHB1YmxpYyBodWVQaWNrZXI6IE5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JEaXJlY3RpdmU7XG4gIEBWaWV3Q2hpbGQoJ2FscGhhUGlja2VyJykgcHVibGljIGFscGhhUGlja2VyOiBOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yRGlyZWN0aXZlO1xuXG5cbiAgcHVibGljIF9waWNrZXJDb25maWc6IFBpY2tlckNvbmZpZyA9IHtcbiAgICBhbHBoYTogZmFsc2UsXG4gICAgcGlja2VyU2hvdzogZmFsc2UsXG4gICAgbm9IaWRlOiBmYWxzZSxcbiAgICBkZWJ1ZzogZmFsc2UsXG4gICAgb3V0Rm9ybWF0OiAnaGV4NicsXG4gICAgaW5wdXRGb3JtYXQ6ICdoZXg2JyxcbiAgICBhdmFpbFBhbGxldHM6IFsncG9sYXJpcycsICdtYXRlcmlhbCddLFxuICAgIGN1c3RvbVBhbGxldHM6ICBbXSxcbiAgfTtcbiAgcHVibGljIGNvbG9ySW5pdDogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgcGlja2VyT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgcGlja2VyUGFsbGV0czogQXJyYXk8UGFsZXR0ZT4gPSBbXTtcbiAgcHVibGljIGhzdmE6IEhTVkEgPSB7XG4gICAgaHVlOiAwLFxuICAgIHNhdHVyYXRpb246IDEwMCxcbiAgICB2YWx1ZTogMTAwLFxuICAgIGFscGhhOiAxXG4gIH07XG4gIHB1YmxpYyBjdXJyZW50Q29sb3I6IHN0cmluZyA9ICdyZ2IoMjU1LDAsMCknO1xuICBwdWJsaWMgY3VycmVudENvbG9yTWF4OiBzdHJpbmcgPSAncmdiYSgyNTUsMCwwLDEpJztcbiAgcHVibGljIGN1cnJlbnRDb2xvckFscGhhOiBzdHJpbmcgPSAncmdiYSgyNTUsMCwwLDEpJztcbiAgcHVibGljIGN1cnJlbnRDb2xvckFscGhhWmVybzogc3RyaW5nID0gJ3JnYmEoMjU1LDAsMCwwKSc7XG4gIHB1YmxpYyB1dWlkOiBzdHJpbmcgPSAncGlja2VyLSc7XG4gIHB1YmxpYyBhbGxvd2VkRm9ybWF0czogQXJyYXk8c3RyaW5nPiA9IFsnaGV4NicsICdoZXg4JywgJ3JnYicsICdyZ2JhJ107XG4gIHB1YmxpYyBhbHBoYUZvcm1hdHM6IEFycmF5PHN0cmluZz4gPSBbJ2hleDgnLCAncmdiYSddO1xuICBwdWJsaWMgb2xkQ29sb3I6IHN0cmluZyA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBjb2xvclBpY2tlclNlcnZpY2U6IE5neFRUaXRhbkNvbG9yUGlja2VyU2VydmljZSxcbiAgICBwdWJsaWMgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHtcbiAgICB0aGlzLnV1aWQgPSB0aGlzLmNvbG9yUGlja2VyU2VydmljZS5nZXRQaWNrZXJVdWlkKCk7XG5cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudmFsaWRhdGVJbnB1dFBhcmFtcygpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmKCdvcHRpb25zJyBpbiBjaGFuZ2VzKSB7XG4gICAgICB0aGlzLnZhbGlkYXRlSW5wdXRQYXJhbXMoKTtcbiAgICB9XG4gICAgaWYoJ2NvbG9yJyBpbiBjaGFuZ2VzKSB7XG4gICAgICBpZihjaGFuZ2VzLmNvbG9yLmN1cnJlbnRWYWx1ZSAhPT0gY2hhbmdlcy5jb2xvci5wcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuY29sb3JQaWNrZXJTZXJ2aWNlLmNvbG9yVG9EYXRhKHRoaXMuY29sb3IsIHRoaXMpO1xuICAgICAgICAgIHRoaXMuc2V0RHJhZ2dlcnNUb0N1cnJlbnRDb2xvcigpO1xuICAgICAgICB9LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvcGVuUGlja2VyKCkge1xuICAgIHRoaXMucGlja2VyT3BlbiA9IHRydWU7XG4gICAgaWYodHlwZW9mIHRoaXMucGFsZXR0ZUxpc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLnBhbGV0dGVMaXN0LmNsb3NlUGFsZXR0ZSgpO1xuICAgIH1cbiAgfVxuXG5cbiAgY2xvc2VQaWNrZXIoKSB7XG4gICAgdGhpcy5waWNrZXJPcGVuID0gZmFsc2U7XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgdmFsaWRhdGVJbnB1dFBhcmFtcygpIHtcblxuICAgIGlmKCdpbnB1dEZvcm1hdCcgaW4gdGhpcy5vcHRpb25zKSB7XG4gICAgICBpZih0aGlzLmFsbG93ZWRGb3JtYXRzLmluZGV4T2YodGhpcy5vcHRpb25zLm91dEZvcm1hdCkgPT09IC0xKSB7XG4gICAgICAgIHRoaXMuX3BpY2tlckNvbmZpZy5vdXRGb3JtYXQgPSAnaGV4Nic7XG4gICAgICAgIGNvbnNvbGUuZ3JvdXAoXCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlclwiKTtcbiAgICAgICAgY29uc29sZS53YXJuKCdbb3V0Rm9ybWF0XSBtdXN0IGJlIG9uZSBvZiB0aGlzICgnICsgdGhpcy5hbGxvd2VkRm9ybWF0cy5qb2luKCcsJykgKyAnKScpO1xuICAgICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9waWNrZXJDb25maWcub3V0Rm9ybWF0ID0gdGhpcy5vcHRpb25zLm91dEZvcm1hdCArICcnO1xuICAgICAgfVxuICAgIH1cbiAgICBpZignaW5wdXRGb3JtYXQnIGluIHRoaXMub3B0aW9ucykge1xuICAgICAgaWYodGhpcy5hbGxvd2VkRm9ybWF0cy5pbmRleE9mKHRoaXMub3B0aW9ucy5pbnB1dEZvcm1hdCkgPT09IC0xKSB7XG4gICAgICAgIHRoaXMuX3BpY2tlckNvbmZpZy5pbnB1dEZvcm1hdCA9IHRoaXMuX3BpY2tlckNvbmZpZy5vdXRGb3JtYXQgKyAnJztcbiAgICAgICAgY29uc29sZS5ncm91cChcIm5neC10dGl0YW4tY29sb3ItcGlja2VyXCIpO1xuICAgICAgICBjb25zb2xlLndhcm4oJ1tpbnB1dEZvcm1hdF0gbXVzdCBiZSBvbmUgb2YgdGhpcyAoJyArIHRoaXMuYWxsb3dlZEZvcm1hdHMuam9pbignLCcpICsgJyknKTtcbiAgICAgICAgY29uc29sZS5ncm91cEVuZCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fcGlja2VyQ29uZmlnLmlucHV0Rm9ybWF0ID0gdGhpcy5vcHRpb25zLmlucHV0Rm9ybWF0ICsgJyc7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKCdwaWNrZXJTaG93JyBpbiB0aGlzLm9wdGlvbnMpIHtcbiAgICAgIGlmKHRoaXMuX3BpY2tlckNvbmZpZy5waWNrZXJTaG93ICE9PSB0aGlzLm9wdGlvbnMucGlja2VyU2hvdykge1xuICAgICAgICB0aGlzLl9waWNrZXJDb25maWcucGlja2VyU2hvdyA9ICF0aGlzLl9waWNrZXJDb25maWcucGlja2VyU2hvdztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoJ25vSGlkZScgaW4gdGhpcy5vcHRpb25zKSB7XG4gICAgICBpZih0aGlzLl9waWNrZXJDb25maWcubm9IaWRlICE9PSB0aGlzLm9wdGlvbnMubm9IaWRlKSB7XG4gICAgICAgIHRoaXMuX3BpY2tlckNvbmZpZy5ub0hpZGUgPSAhdGhpcy5fcGlja2VyQ29uZmlnLm5vSGlkZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoJ2RlYnVnJyBpbiB0aGlzLm9wdGlvbnMpIHtcbiAgICAgIGlmKHRoaXMuX3BpY2tlckNvbmZpZy5kZWJ1ZyAhPT0gdGhpcy5vcHRpb25zLmRlYnVnKSB7XG4gICAgICAgIHRoaXMuX3BpY2tlckNvbmZpZy5kZWJ1ZyA9ICF0aGlzLl9waWNrZXJDb25maWcuZGVidWc7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKCdhdmFpbFBhbGxldHMnIGluIHRoaXMub3B0aW9ucykge1xuICAgICAgdGhpcy5fcGlja2VyQ29uZmlnLmF2YWlsUGFsbGV0cyA9IHRoaXMub3B0aW9ucy5hdmFpbFBhbGxldHMuZmlsdGVyKGZ1bmN0aW9uKCl7cmV0dXJuIHRydWU7fSk7XG4gICAgfVxuICAgIGlmKCdjdXN0b21QYWxsZXRzJyBpbiB0aGlzLm9wdGlvbnMpIHtcbiAgICAgIHRoaXMuX3BpY2tlckNvbmZpZy5jdXN0b21QYWxsZXRzID0gdGhpcy5vcHRpb25zLmN1c3RvbVBhbGxldHMuZmlsdGVyKGZ1bmN0aW9uKCl7cmV0dXJuIHRydWU7fSk7XG4gICAgfVxuXG4gICAgdGhpcy5jb2xvclBpY2tlclNlcnZpY2UucHJlcGFyZVBpY2tlclBhbGxldHModGhpcy5fcGlja2VyQ29uZmlnLmF2YWlsUGFsbGV0cywgdGhpcy5fcGlja2VyQ29uZmlnLmN1c3RvbVBhbGxldHMsIHRoaXMpO1xuXG4gICAgdGhpcy5fcGlja2VyQ29uZmlnLmFscGhhID0gdGhpcy5hbHBoYUZvcm1hdHMuaW5kZXhPZih0aGlzLl9waWNrZXJDb25maWcub3V0Rm9ybWF0KSAhPT0gLTE7XG4gICAgaWYodGhpcy5fcGlja2VyQ29uZmlnLnBpY2tlclNob3cpIHtcbiAgICAgIHRoaXMub3BlblBpY2tlcigpO1xuICAgIH1cbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgfVxuXG5cbiAgaW5wdXRDb2xvckNoYW5nZShjb2xvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgIHRoaXMuY29sb3JQaWNrZXJTZXJ2aWNlLmNvbG9yVG9EYXRhKHRoaXMuY29sb3IsIHRoaXMpO1xuICAgIHRoaXMuc2V0RHJhZ2dlcnNUb0N1cnJlbnRDb2xvcigpO1xuICB9XG5cbiAgdXBkYXRlUmV0dXJuQ29sb3IoKSB7XG4gICAgdGhpcy5jb2xvciA9IHRoaXMuY29sb3JQaWNrZXJTZXJ2aWNlLnByZXBhcmVSZXR1cm5Db2xvcih0aGlzLmhzdmEsIHRoaXMuX3BpY2tlckNvbmZpZy5vdXRGb3JtYXQpO1xuXG4gICAgaWYodGhpcy5jb2xvckluaXQpIHtcbiAgICAgIGlmKHRoaXMub2xkQ29sb3IgIT09IHRoaXMuY29sb3IpIHtcbiAgICAgICAgdGhpcy5vbGRDb2xvciA9IHRoaXMuY29sb3IgKyAnJztcbiAgICAgICAgdGhpcy5jb2xvckNoYW5nZS5lbWl0KHRoaXMuY29sb3IgKyAnJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuY29sb3JJbml0ID0gdHJ1ZTtcbiAgfVxuXG5cbiAgc2V0SW5wdXRWYWx1ZSgpIHtcbiAgICBpZih0eXBlb2YgdGhpcy5waWNrZXJJbnB1dCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMucGlja2VySW5wdXQuc2V0SW5wdXRWYWx1ZShcbiAgICAgICAgdGhpcy5jb2xvclBpY2tlclNlcnZpY2UucHJlcGFyZVJldHVybkNvbG9yKHRoaXMuaHN2YSwgdGhpcy5fcGlja2VyQ29uZmlnLmlucHV0Rm9ybWF0KVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBzZXREcmFnZ2Vyc1RvQ3VycmVudENvbG9yKCkge1xuXG4gICAgaWYodHlwZW9mIHRoaXMubWFpbkNvbG9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5tYWluQ29sb3Iuc2V0RHJhZ2dlcihcbiAgICAgICAge1xuICAgICAgICAgIHg6IHRoaXMuaHN2YS5zYXR1cmF0aW9uLFxuICAgICAgICAgIHk6IDEwMCAtIHRoaXMuaHN2YS52YWx1ZVxuICAgICAgICB9XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmKHR5cGVvZiB0aGlzLmh1ZVBpY2tlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMuaHVlUGlja2VyLnNldERyYWdnZXIoe3g6IDAsIHk6IE1hdGgucm91bmQodGhpcy5oc3ZhLmh1ZSAqIDEwMCAvIDM2MCl9KTtcbiAgICB9XG5cbiAgICBpZih0eXBlb2YgdGhpcy5hbHBoYVBpY2tlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5fcGlja2VyQ29uZmlnLmFscGhhKSB7XG4gICAgICB0aGlzLmFscGhhUGlja2VyLnNldERyYWdnZXIoe3g6IDAsIHk6IDEwMCAtICh0aGlzLmhzdmEuYWxwaGEgKiAxMDApfSk7XG4gICAgfVxuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG59XG5cbiIsImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb2xvclBpY2tlckNvbXBvbmVudH0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuaW50ZXJmYWNlXCI7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tsaWJOZ3hUVGl0YW5Db2xvclBpY2tlckRyYWdnZXJdJ1xufSlcbmV4cG9ydCBjbGFzcyBOZ3hUVGl0YW5Db2xvclBpY2tlckRyYWdnZXJEaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgncGlja2VyUGFkJykgcHVibGljIHBpY2tlclBhZDogbnVtYmVyID0gMDtcbiAgQElucHV0KCdjb250ZXh0JykgcHVibGljIF9jb250ZXh0OiBDb2xvclBpY2tlckNvbXBvbmVudDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxSZWY6IEVsZW1lbnRSZWYpIHsgfVxuXG5cbiAgcHVibGljIHNldFBvc2l0aW9uKHg6IG51bWJlciwgeTogbnVtYmVyLCBkaXJlY3Rpb246IHN0cmluZyk6IHZvaWQge1xuXG4gICAgbGV0IHJlY3QgPSB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICBpZihkaXJlY3Rpb24gPT0gJ3ZlcnRpY2FsJyB8fCBkaXJlY3Rpb24gPT0gJ2JvdGgnKSB7XG4gICAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gTWF0aC5yb3VuZCgoeSAtICgocmVjdC5oZWlnaHQpIC8gMikpKSArICdweCc7XG4gICAgfVxuICAgIGlmKGRpcmVjdGlvbiA9PSAnaG9yaXpvbnRhbCcgfHwgZGlyZWN0aW9uID09ICdib3RoJykge1xuICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSBNYXRoLnJvdW5kKCh4IC0gKChyZWN0LndpZHRoKSAvIDIpKSkgKyAncHgnO1xuICAgIH1cblxuICB9XG5cbn1cbiIsImltcG9ydCB7XG4gIENvbnRlbnRDaGlsZCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05neFRUaXRhbkNvbG9yUGlja2VyRHJhZ2dlckRpcmVjdGl2ZX0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXItZHJhZ2dlci5kaXJlY3RpdmVcIjtcbi8vIGltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uLCBvZn0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7ZnJvbUV2ZW50LCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtOZ3hUVGl0YW5Db2xvclBpY2tlclNlcnZpY2V9IGZyb20gXCIuL25neC10dGl0YW4tY29sb3ItcGlja2VyLnNlcnZpY2VcIjtcbmltcG9ydCB7Q29sb3JQaWNrZXJDb21wb25lbnQsIEN1c3RvbVBlcmNlbnQsIEN1c3RvbVJlY3R9IGZyb20gXCIuL25neC10dGl0YW4tY29sb3ItcGlja2VyLmludGVyZmFjZVwiO1xuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tsaWJOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yXScsXG4gIGV4cG9ydEFzOiAnbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3Rvcidcbn0pXG5leHBvcnQgY2xhc3MgTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0e1xuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicsIFsnJGV2ZW50J10pIHB1YmxpYyBvbk1vdXNlRG93bigkZXZlbnQpIHtcbiAgICB0aGlzLmRyYWdTdGFydCA9IHRydWU7XG4gICAgdGhpcy5ldmVudHNTdWJzY2liZSgpO1xuICAgIHRoaXMuZ2V0UG9zaXRpb24oJGV2ZW50KTtcbiAgfVxuXG4gIEBJbnB1dCgnZGlyZWN0aW9uJykgcHVibGljIGRpcmVjdGlvbjogc3RyaW5nID0gJ2JvdGgnO1xuICBASW5wdXQoJ2NvbnRleHQnKSBwdWJsaWMgX2NvbnRleHQ6IENvbG9yUGlja2VyQ29tcG9uZW50O1xuXG5cbiAgQE91dHB1dCgnY2hhbmdlJykgcHVibGljIGNoYW5nZTogRXZlbnRFbWl0dGVyPEN1c3RvbVBlcmNlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxDdXN0b21QZXJjZW50PigpO1xuXG4gIHB1YmxpYyBlbDogSFRNTEVsZW1lbnQgPSBudWxsO1xuICBwdWJsaWMgZHJhZ1N0YXJ0OiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBnbG9iYWxNb3VzZU1vdmU6IFN1YnNjcmlwdGlvbiA9IG51bGw7XG4gIHB1YmxpYyBnbG9iYWxNb3VzZVVwOiBTdWJzY3JpcHRpb24gPSBudWxsO1xuXG5cbiAgQENvbnRlbnRDaGlsZChOZ3hUVGl0YW5Db2xvclBpY2tlckRyYWdnZXJEaXJlY3RpdmUpIHB1YmxpYyBkcmFnZ2VyOiBOZ3hUVGl0YW5Db2xvclBpY2tlckRyYWdnZXJEaXJlY3RpdmUgPSBudWxsO1xuXG5cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZWxSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIGNvbG9yUGlja2VyU2VydmljZTogTmd4VFRpdGFuQ29sb3JQaWNrZXJTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuZWwgPSB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSAoWydib3RoJywgJ3ZlcnRpY2FsJywgJ2hvcml6b250YWwnXS5pbmRleE9mKHRoaXMuZGlyZWN0aW9uKSA9PT0gLTEpID8gJ2JvdGgnIDogdGhpcy5kaXJlY3Rpb247XG5cblxuXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcblxuXG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgIC8vIHRoaXMuZXZlbnRzVW5TdWJzY2liZSgpO1xuICB9XG5cblxuICBldmVudHNTdWJzY2liZSgpIHtcbiAgICAvLyB0aGlzLmdsb2JhbE1vdXNlTW92ZSA9IGZyb21FdmVudCh3aW5kb3csICdtb3VzZW1vdmUnKS5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgLy8gICBpZih0aGlzLmRyYWdTdGFydCkge1xuICAgIC8vICAgICB0aGlzLmdldFBvc2l0aW9uKDxNb3VzZUV2ZW50PmV2ZW50KTtcbiAgICAvLyAgIH1cbiAgICAvLyB9KTtcbiAgICAvLyB0aGlzLmdsb2JhbE1vdXNlVXAgPSBmcm9tRXZlbnQod2luZG93LCAnbW91c2V1cCcpLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAvLyAgIGlmKHRoaXMuZHJhZ1N0YXJ0KSB7XG4gICAgLy8gICAgIHRoaXMuZHJhZ1N0YXJ0ID0gZmFsc2U7XG4gICAgLy8gICAgIHRoaXMuZ2V0UG9zaXRpb24oPE1vdXNlRXZlbnQ+ZXZlbnQpO1xuICAgIC8vICAgfVxuICAgIC8vIH0pO1xuXG4gICAgLy9cbiAgICB0aGlzLmdsb2JhbE1vdXNlTW92ZSA9IHRoaXMuY29sb3JQaWNrZXJTZXJ2aWNlLm1vdXNlTW92ZU9ic2VydmFibGUuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgaWYodGhpcy5kcmFnU3RhcnQpIHtcbiAgICAgICAgdGhpcy5nZXRQb3NpdGlvbig8TW91c2VFdmVudD5ldmVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5nbG9iYWxNb3VzZVVwID0gdGhpcy5jb2xvclBpY2tlclNlcnZpY2UubW91c2VVcE9ic2VydmFibGUuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgaWYodGhpcy5kcmFnU3RhcnQpIHtcbiAgICAgICAgdGhpcy5kcmFnU3RhcnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ldmVudHNVblN1YnNjaWJlKCk7XG4gICAgICAgIHRoaXMuZ2V0UG9zaXRpb24oPE1vdXNlRXZlbnQ+ZXZlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGV2ZW50c1VuU3Vic2NpYmUoKSB7XG4gICAgaWYodGhpcy5nbG9iYWxNb3VzZU1vdmUgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuZ2xvYmFsTW91c2VNb3ZlLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmKHRoaXMuZ2xvYmFsTW91c2VVcCAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5nbG9iYWxNb3VzZVVwLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldERyYWdnZXIocGVyc2VudDogQ3VzdG9tUGVyY2VudCkge1xuICAgIGlmKHRoaXMuZHJhZ2dlciA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgcG9zaXRpb246IEN1c3RvbVJlY3QgPSB0aGlzLmdldFJlY3QodGhpcy5lbCk7XG4gICAgbGV0IHggPSBNYXRoLnJvdW5kKCgocG9zaXRpb24ud2lkdGggLSB0aGlzLmRyYWdnZXIucGlja2VyUGFkICogMikgKiBwZXJzZW50LnggLyAxMDApKTtcbiAgICBsZXQgeSA9IE1hdGgucm91bmQoKChwb3NpdGlvbi5oZWlnaHQgLSB0aGlzLmRyYWdnZXIucGlja2VyUGFkICogMikgKiBwZXJzZW50LnkgLyAxMDApKTtcbiAgICB0aGlzLmRyYWdnZXIuc2V0UG9zaXRpb24oXG4gICAgICAoeCA+IHRoaXMuZHJhZ2dlci5waWNrZXJQYWQpID8geCA6IHRoaXMuZHJhZ2dlci5waWNrZXJQYWQsXG4gICAgICAoeSA+IHRoaXMuZHJhZ2dlci5waWNrZXJQYWQpID8geSA6IHRoaXMuZHJhZ2dlci5waWNrZXJQYWQsXG4gICAgICB0aGlzLmRpcmVjdGlvblxuICAgICk7XG5cbiAgfVxuXG4gIHB1YmxpYyBnZXRQb3NpdGlvbigkZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBsZXQgY3Vyc29yWSA9ICRldmVudC5wYWdlWTtcbiAgICBsZXQgY3Vyc29yWCA9ICRldmVudC5wYWdlWDtcbiAgICBsZXQgcG9zaXRpb246IEN1c3RvbVJlY3QgPSB0aGlzLmdldFJlY3QodGhpcy5lbCk7XG4gICAgbGV0IHBlcmNlbnQ6IEN1c3RvbVBlcmNlbnQgPSB7eDogMCwgeTogMH07XG4gICAgaWYodGhpcy5kaXJlY3Rpb24gPT0gJ3ZlcnRpY2FsJyB8fCB0aGlzLmRpcmVjdGlvbiA9PSAnYm90aCcpIHtcbiAgICAgIHBlcmNlbnQueSA9IE1hdGgucm91bmQoKGN1cnNvclkgLSAocG9zaXRpb24udG9wKSkgKiAxMDAgLyAocG9zaXRpb24uaGVpZ2h0IC0gdGhpcy5kcmFnZ2VyLnBpY2tlclBhZCAqIDIpKTtcbiAgICAgIGlmKHBlcmNlbnQueSA8IDApIHtcbiAgICAgICAgcGVyY2VudC55ID0gMFxuICAgICAgfSBlbHNlIGlmKHBlcmNlbnQueSA+IDEwMCkge1xuICAgICAgICBwZXJjZW50LnkgPSAxMDA7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKHRoaXMuZGlyZWN0aW9uID09ICdob3Jpem9udGFsJyB8fCB0aGlzLmRpcmVjdGlvbiA9PSAnYm90aCcpIHtcbiAgICAgIHBlcmNlbnQueCA9IE1hdGgucm91bmQoKGN1cnNvclggLSAocG9zaXRpb24ubGVmdCkpICogMTAwIC8gKHBvc2l0aW9uLndpZHRoIC0gdGhpcy5kcmFnZ2VyLnBpY2tlclBhZCAqIDIpKTtcbiAgICAgIGlmKHBlcmNlbnQueCA8IDApIHtcbiAgICAgICAgcGVyY2VudC54ID0gMFxuICAgICAgfSBlbHNlIGlmKHBlcmNlbnQueCA+IDEwMCkge1xuICAgICAgICBwZXJjZW50LnggPSAxMDA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zZXREcmFnZ2VyKHBlcmNlbnQpO1xuICAgIHRoaXMuY2hhbmdlLmVtaXQocGVyY2VudCk7XG5cbiAgfVxuXG5cblxuICBwdWJsaWMgZ2V0UmVjdChlbGVtOiBIVE1MRWxlbWVudCk6IEN1c3RvbVJlY3Qge1xuXG4gICAgbGV0IGJveCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgbGV0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuICAgIGxldCBkb2NFbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICBsZXQgc2Nyb2xsVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY0VsLnNjcm9sbFRvcCB8fCBib2R5LnNjcm9sbFRvcDtcbiAgICBsZXQgc2Nyb2xsTGVmdCA9IHdpbmRvdy5wYWdlWE9mZnNldCB8fCBkb2NFbC5zY3JvbGxMZWZ0IHx8IGJvZHkuc2Nyb2xsTGVmdDtcbiAgICBsZXQgY2xpZW50VG9wID0gZG9jRWwuY2xpZW50VG9wIHx8IGJvZHkuY2xpZW50VG9wIHx8IDA7XG4gICAgbGV0IGNsaWVudExlZnQgPSBkb2NFbC5jbGllbnRMZWZ0IHx8IGJvZHkuY2xpZW50TGVmdCB8fCAwO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGhlaWdodDogYm94LmhlaWdodCxcbiAgICAgIGxlZnQ6IGJveC5sZWZ0ICsgc2Nyb2xsTGVmdCAtIGNsaWVudExlZnQsXG4gICAgICB0b3A6IGJveC50b3AgKyBzY3JvbGxUb3AgLSBjbGllbnRUb3AsXG4gICAgICB3aWR0aDogYm94LndpZHRoLFxuICAgIH07XG4gIH1cblxuXG5cbn1cbiIsImltcG9ydCB7XG4gIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05neFRUaXRhbkNvbG9yUGlja2VyU2VydmljZX0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuc2VydmljZVwiO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJJbnB1dF0nLFxuICBleHBvcnRBczogJ2xpYk5neFRUaXRhbkNvbG9yUGlja2VySW5wdXQnXG59KVxuZXhwb3J0IGNsYXNzIE5neFRUaXRhbkNvbG9yUGlja2VySW5wdXREaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgnZm9ybWF0JykgZm9ybWF0OiBzdHJpbmcgPSAnaGV4Nic7XG4gIEBPdXRwdXQoJ2lucHV0Q2hhbmdlJykgcHVibGljIGlucHV0Q2hhbmdlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5dXAnKSBrZXlVcCgpIHtcbiAgICB0aGlzLmlucHV0VmFsaWRhdGUoKTtcbiAgfVxuICBASG9zdExpc3RlbmVyKCdjaGFuZ2UnKSBjaGFuZ2UoKSB7XG4gICAgdGhpcy5pbnB1dFZhbGlkYXRlKCk7XG4gIH1cblxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBlbDogRWxlbWVudFJlZixcbiAgICBwdWJsaWMgY29sb3JQaWNrZXJTZXJ2aWNlOiBOZ3hUVGl0YW5Db2xvclBpY2tlclNlcnZpY2VcbiAgKSB7IH1cblxuXG4gIHNldElucHV0VmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgICg8SFRNTElucHV0RWxlbWVudD50aGlzLmVsLm5hdGl2ZUVsZW1lbnQpLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuXG4gIGlucHV0VmFsaWRhdGUoKSB7XG4gICAgbGV0IHJlcyA9IHRoaXMuY29sb3JQaWNrZXJTZXJ2aWNlLnZhbGlkYXRlQ29sb3JGb3JtYXQoXG4gICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudmFsdWUsXG4gICAgICB0aGlzLmZvcm1hdFxuICAgICk7XG5cbiAgICBpZihyZXMgIT09ICdub3RWYWxpZCcpIHtcbiAgICAgICg8SFRNTElucHV0RWxlbWVudD50aGlzLmVsLm5hdGl2ZUVsZW1lbnQpLnZhbHVlID0gcmVzO1xuICAgICAgdGhpcy5pbnB1dENoYW5nZS5lbWl0KHJlcyk7XG4gICAgfVxuXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvckRpcmVjdGl2ZSB9IGZyb20gJy4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXItc2VsZWN0b3IuZGlyZWN0aXZlJztcbmltcG9ydCB7IE5neFRUaXRhbkNvbG9yUGlja2VyRHJhZ2dlckRpcmVjdGl2ZSB9IGZyb20gJy4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXItZHJhZ2dlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IE5neFRUaXRhbkNvbG9yUGlja2VySW5wdXREaXJlY3RpdmUgfSBmcm9tICcuL25neC10dGl0YW4tY29sb3ItcGlja2VyLWlucHV0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOZ3hUVGl0YW5Db2xvclBpY2tlclBhbGV0dGVMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1wYWxldHRlLWxpc3Qvbmd4LXR0aXRhbi1jb2xvci1waWNrZXItcGFsZXR0ZS1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQge05neFRUaXRhbkNvbG9yUGlja2VyU2VydmljZX0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuc2VydmljZVwiO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50LFxuICAgIE5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JEaXJlY3RpdmUsXG4gICAgTmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyRGlyZWN0aXZlLFxuICAgIE5neFRUaXRhbkNvbG9yUGlja2VySW5wdXREaXJlY3RpdmUsXG4gICAgTmd4VFRpdGFuQ29sb3JQaWNrZXJQYWxldHRlTGlzdENvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW05neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgTmd4VFRpdGFuQ29sb3JQaWNrZXJTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4VFRpdGFuQ29sb3JQaWNrZXJNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsiZnJvbUV2ZW50IiwiSW5qZWN0YWJsZSIsIkV2ZW50RW1pdHRlciIsIkNvbXBvbmVudCIsIklucHV0IiwiT3V0cHV0IiwiQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kiLCJDaGFuZ2VEZXRlY3RvclJlZiIsIkhvc3RMaXN0ZW5lciIsIlZpZXdDaGlsZCIsIkRpcmVjdGl2ZSIsIkVsZW1lbnRSZWYiLCJDb250ZW50Q2hpbGQiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7UUFrQkU7OEJBUm1DLEVBQUU7MkJB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LEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQzt3QkFDakMsQ0FBQztxQkFDRixDQUFDO2lCQUNIO3FCQUFNLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7b0JBQzFCLElBQUksR0FBRzt3QkFDTCxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO3dCQUN2RCxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO3dCQUN2RCxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO3dCQUN2RCxDQUFDO3FCQUNGLENBQUE7aUJBQ0Y7cUJBQU0sSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtvQkFDMUIsSUFBSSxHQUFHO3dCQUNMLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQ2pDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQ2pDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQ2pDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsT0FB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U0FBUyxFQUFFLFNBQVM7d0JBQzFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7d0JBQzFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7d0JBQzFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO3dCQUNyRCxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUzt3QkFDckQsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7d0JBQ3JELFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO3dCQUNyRCxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUzt3QkFDckQsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7d0JBQ3JELFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO3dCQUNyRCxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUztxQkFDdEQ7aUJBQ0YsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO29CQUNoQixFQUFFLEVBQUUsVUFBVTtvQkFDZCxJQUFJLEVBQUUsVUFBVTtvQkFDaEIsTUFBTSxFQUFFO3dCQUNOLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO3dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUzt3QkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7d0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO3dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUzt3QkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7d0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO3dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUzt3QkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7d0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO3dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUzt3QkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7d0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO3dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUzt3QkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNB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