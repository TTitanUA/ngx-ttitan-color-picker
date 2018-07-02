(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/index'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-ttitan-color-picker', ['exports', '@angular/core', 'rxjs/index', '@angular/common'], factory) :
    (factory((global['ngx-ttitan-color-picker'] = {}),global.ng.core,global.rxjs.index,global.ng.common));
}(this, (function (exports,i0,index,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NgxTTitanColorPickerService = (function () {
        // public mouseMoveObservable: EventEmitter<MouseEvent> = new EventEmitter();
        // public mouseUpObservable: EventEmitter<MouseEvent> = new EventEmitter();
        function NgxTTitanColorPickerService() {
            this.debug = false;
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        NgxTTitanColorPickerService.ctorParameters = function () { return []; };
        /** @nocollapse */ NgxTTitanColorPickerService.ngInjectableDef = i0.defineInjectable({ factory: function NgxTTitanColorPickerService_Factory() { return new NgxTTitanColorPickerService(); }, token: NgxTTitanColorPickerService, providedIn: "root" });
        return NgxTTitanColorPickerService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NgxTTitanColorPickerPaletteListComponent = (function () {
        function NgxTTitanColorPickerPaletteListComponent() {
            this.pallets = [];
            this.change = new i0.EventEmitter();
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
            { type: i0.Component, args: [{
                        selector: 'lib-ngx-ttitan-color-picker-palette-list',
                        template: "<div class=\"picker-palette-wrapper\" *ngIf=\"pallets.length > 0\">\n  <div class=\"palette-links\">\n    <div\n      class=\"palette-link\"\n      *ngFor=\"let palette of pallets\"\n      [ngClass]=\"{'selected': (activePalette !== null && activePalette.id == palette.id)}\"\n      (click)=\"selectPalette(palette)\"\n    >\n      {{palette.name}}\n    </div>\n  </div>\n  <div class=\"palette-picker-holder\" *ngIf=\"activePalette !== null && activePalette.colors.length > 0\">\n    <div\n      class=\"palette-color\"\n      *ngFor=\"let color of activePalette.colors\"\n      [ngStyle]=\"{\n        backgroundColor: color\n      }\"\n      (click)=\"colorSelected(color)\"\n    >\n\n    </div>\n  </div>\n</div>\n",
                        styles: [":host .picker-palette-wrapper .palette-links{display:flex;flex-wrap:wrap;margin-bottom:5px}:host .picker-palette-wrapper .palette-links .palette-link{margin-right:5px;border-radius:3px;padding:2px 4px;border:1px solid #ddd;text-transform:uppercase;font-size:10px;font-family:-apple-system,BlinkMacSystemFont,San Francisco,Roboto,Segoe UI,Helvetica Neue,sans-serif;font-weight:600;background-color:#fff;cursor:pointer}:host .picker-palette-wrapper .palette-links .palette-link.selected{background-color:#5e6bc5;color:#fff}:host .picker-palette-wrapper .palette-picker-holder{height:165px;display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:flex-start;align-content:baseline}:host .picker-palette-wrapper .palette-picker-holder .palette-color{cursor:pointer;width:10px;height:10px}"]
                    },] },
        ];
        /** @nocollapse */
        NgxTTitanColorPickerPaletteListComponent.ctorParameters = function () { return []; };
        NgxTTitanColorPickerPaletteListComponent.propDecorators = {
            pallets: [{ type: i0.Input, args: ['pallets',] }],
            change: [{ type: i0.Output, args: ['change',] }]
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
            this.alpha = false;
            this.debug = false;
            this.color = 'rgba(255,255,255,0)';
            this.title = 'title';
            this.outFormat = 'hex6';
            this.inputFormat = 'hex6';
            this.availPallets = ['polaris', 'material'];
            this.customPallets = [];
            this.colorChanged = new i0.EventEmitter();
            this.mainColor = null;
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
                this.colorPickerService.debug = this.debug;
                this.validateInputParams();
                this.colorPickerService.preparePickerPallets(this.availPallets, this.customPallets, this);
                this.colorPickerService.colorToData(this.color, this);
                this.cdr.detectChanges();
            };
        /**
         * @return {?}
         */
        NgxTTitanColorPickerComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
            function () {
                this.setDraggesToCurrentColor();
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
            };
        /**
         * @return {?}
         */
        NgxTTitanColorPickerComponent.prototype.validateInputParams = /**
         * @return {?}
         */
            function () {
                if (this.allowedFormats.indexOf(this.outFormat) === -1) {
                    this.outFormat = 'hex6';
                    console.group("ngx-ttitan-color-picker");
                    console.warn('[outFormat] must be one of this (' + this.allowedFormats.join(',') + ')');
                    console.groupEnd();
                }
                if (this.allowedFormats.indexOf(this.inputFormat) === -1) {
                    this.inputFormat = this.outFormat + '';
                    console.group("ngx-ttitan-color-picker");
                    console.warn('[inputFormat] must be one of this (' + this.allowedFormats.join(',') + ')');
                    console.groupEnd();
                }
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
                this.setDraggesToCurrentColor();
            };
        /**
         * @return {?}
         */
        NgxTTitanColorPickerComponent.prototype.updateReturnColor = /**
         * @return {?}
         */
            function () {
                this.color = this.colorPickerService.prepareReturnColor(this.hsva, this.outFormat);
                if (this.colorInit) {
                    this.colorChanged.emit(this.color + '');
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
                    this.pickerInput.setInputValue(this.colorPickerService.prepareReturnColor(this.hsva, this.inputFormat));
                }
            };
        /**
         * @return {?}
         */
        NgxTTitanColorPickerComponent.prototype.setDraggesToCurrentColor = /**
         * @return {?}
         */
            function () {
                if (this.mainColor !== null) {
                    this.mainColor.setDragger({
                        x: this.hsva.saturation,
                        y: 100 - this.hsva.value
                    });
                }
                if (typeof this.huePicker !== 'undefined') {
                    this.huePicker.setDragger({ x: 0, y: Math.round(this.hsva.hue * 100 / 360) });
                }
                if (typeof this.alphaPicker !== 'undefined' && this.alpha) {
                    this.alphaPicker.setDragger({ x: 0, y: 100 - (this.hsva.alpha * 100) });
                }
            };
        NgxTTitanColorPickerComponent.decorators = [
            { type: i0.Component, args: [{
                        changeDetection: i0.ChangeDetectionStrategy.OnPush,
                        selector: 'lib-ngx-ttitan-color-picker',
                        template: "<div\n  class=\"ngx-ttitan-color-picker-wrapper\"\n>\n\n  <div class=\"picker-input-wrapper\">\n    <div\n      [ngStyle]=\"{backgroundColor: color}\"\n      class=\"debug-output\"\n      *ngIf=\"colorPickerService.debug\"\n    >\n      {{color}}\n    </div>\n    <div class=\"picker-input-label\">\n      <label [for]=\"uuid\" >{{title}}</label>\n    </div>\n    <div class=\"picker-input-holder\">\n      <div class=\"picker-color\" [ngStyle]=\"{background: currentColorAlpha}\">\n\n      </div>\n      <div class=\"picker-input\">\n        <input\n          libNgxTTitanColorPickerInput\n          #pickerInput=\"libNgxTTitanColorPickerInput\"\n          (inputChange)=\"inputColorChange($event)\"\n          [format]=\"inputFormat\"\n          [id]=\"uuid\"\n          type=\"text\"\n          (focus)=\"openPicker()\"\n        />\n      </div>\n      <!--<div class=\"picker-save-sign\">-->\n      <!--S-->\n      <!--</div>-->\n    </div>\n\n  </div>\n  <div class=\"ngx-ttitan-color-picker\" [ngClass]=\"{'no-alpha': !alpha, 'open': pickerOpen}\">\n    <div class=\"ngx-ttitan-color-picker__MainColor\">\n      <div class=\"ngx-ttitan-color-picker__ColorLayer\" [ngStyle]=\"{backgroundColor: currentColorMax}\" ></div>\n      <div class=\"ngx-ttitan-color-picker__Slidable\" libNgxTTitanColorPickerSelector #mainColor=\"libNgxTTitanColorPickerSelector\" (change)=\"colorPickerService.saturationChange($event, this)\">\n        <div class=\"ngx-ttitan-color-picker__Dragger\" libNgxTTitanColorPickerDragger style=\"transform: translate3d(0px, 0px, 0px);\"></div>\n      </div>\n    </div>\n    <div class=\"ngx-ttitan-color-picker__HuePicker\">\n      <div class=\"ngx-ttitan-color-picker__Slidable\" libNgxTTitanColorPickerSelector #huePicker=\"libNgxTTitanColorPickerSelector\" (change)=\"colorPickerService.hueChange($event, this)\" [direction]=\"'vertical'\">\n        <div class=\"ngx-ttitan-color-picker__Dragger\" libNgxTTitanColorPickerDragger [pickerPad]=\"0\" style=\" transform: translate3d(0px, 0px, 0px);\"></div>\n      </div>\n    </div>\n    <div class=\"ngx-ttitan-color-picker__AlphaPicker\" *ngIf=\"alpha === true\">\n      <div class=\"ngx-ttitan-color-picker__ColorLayer\"\n\n           [ngStyle]=\"{background: 'linear-gradient(to top, ' + currentColorAlphaZero + '  18px, ' + currentColor + ' calc(100% - 18px)'}\"\n      ></div>\n      <div class=\"ngx-ttitan-color-picker__Slidable\" libNgxTTitanColorPickerSelector #alphaPicker=\"libNgxTTitanColorPickerSelector\" (change)=\"colorPickerService.alphaChange($event, this)\" [direction]=\"'vertical'\">\n        <div class=\"ngx-ttitan-color-picker__Dragger\" libNgxTTitanColorPickerDragger [pickerPad]=\"0\" style=\" transform: translate3d(0px, 0px, 0px);\"></div>\n      </div>\n    </div>\n    <!--<div style=\"height: 40px; width: 40px\" [ngStyle]=\"{background: currentColor}\">-->\n\n    <!--</div>-->\n    <!--<div style=\"height: 40px; width: 40px\" [ngStyle]=\"{background: currentColorAlpha}\">-->\n\n    <!--</div>-->\n  </div>\n  <lib-ngx-ttitan-color-picker-palette-list\n    (change)=\"inputColorChange($event)\"\n    [pallets]=\"pickerPallets\"\n  >\n\n  </lib-ngx-ttitan-color-picker-palette-list>\n</div>\n\n",
                        styles: [":host *,:host :after,:host :before{box-sizing:border-box}:host .debug-output{width:100%;height:20px}:host .picker-input-wrapper{margin-bottom:6px}:host .picker-input-wrapper .picker-input-label{margin-bottom:6px}:host .picker-input-wrapper .picker-input-label label{text-transform:uppercase;font-weight:600}:host .picker-input-wrapper .picker-input-holder{display:flex;height:33px;border:1px solid #bbb;overflow:hidden;border-radius:3px;background-color:#eee}:host .picker-input-wrapper .picker-input-holder .picker-color{flex:0 0 31px;background-color:#ff0300}:host .picker-input-wrapper .picker-input-holder .picker-input{flex:auto;background-color:transparent}:host .picker-input-wrapper .picker-input-holder .picker-input input{background-color:transparent;color:#272727;font-family:monospace;font-size:14px;border:none;outline:0;padding:8px 2px 8px 8px;width:100%}:host .picker-input-wrapper .picker-input-holder .picker-save-sign{flex:0 0 31px;line-height:33px;text-align:center}:host .ngx-ttitan-color-picker{max-height:0;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:flex;transition:max-height .3s}:host .ngx-ttitan-color-picker.open{margin-bottom:5px;max-height:165px}:host .ngx-ttitan-color-picker__ColorLayer{position:absolute;z-index:10;top:0;left:0;height:100%;width:100%;box-shadow:inset 0 0 2px 0 rgba(0,0,0,.5);pointer-events:none}:host .ngx-ttitan-color-picker__Slidable{height:100%;width:100%;cursor:pointer}:host .ngx-ttitan-color-picker__Dragger{position:relative;z-index:30;bottom:.9rem;-webkit-transform:none;transform:none;height:18px;width:18px;margin:0 auto;-webkit-backface-visibility:hidden;backface-visibility:hidden;will-change:transform;background:0 0;border:3px solid #fff;box-shadow:0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08),inset 0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08);border-radius:50%;pointer-events:none;touch-action:none}:host .ngx-ttitan-color-picker__MainColor{background-image:linear-gradient(45deg,#dfe3e8 25%,transparent 0),linear-gradient(-45deg,#dfe3e8 25%,transparent 0),linear-gradient(45deg,transparent 75%,#dfe3e8 0),linear-gradient(-45deg,transparent 75%,#dfe3e8 0);background-size:1.6rem 1.6rem;background-position:0 0,0 .8rem,.8rem -.8rem,-.8rem 0;position:relative;overflow:hidden;width:165px;height:165px;border-radius:4px;cursor:pointer}:host .ngx-ttitan-color-picker__MainColor .ngx-ttitan-color-picker__ColorLayer{box-shadow:inset 0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08);border-radius:4px}:host .ngx-ttitan-color-picker__MainColor .ngx-ttitan-color-picker__Dragger{right:.9rem;margin:0}:host .ngx-ttitan-color-picker__MainColor:after,:host .ngx-ttitan-color-picker__MainColor:before{content:\"\";position:absolute;z-index:20;top:0;left:0;display:block;height:100%;width:100%;pointer-events:none;border-radius:3px}:host .ngx-ttitan-color-picker__MainColor:before{background:linear-gradient(90deg,#fff,transparent)}:host .ngx-ttitan-color-picker__MainColor:after{background-image:linear-gradient(0deg,#000,transparent);box-shadow:inset 0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08)}:host .ngx-ttitan-color-picker__AlphaPicker,:host .ngx-ttitan-color-picker__HuePicker{position:relative;overflow:hidden;height:165px;width:24px;margin-left:.8rem;border-width:3px;border-radius:8rem;padding:13px 0}:host .ngx-ttitan-color-picker__HuePicker{background:linear-gradient(to bottom,red 0,#ff0 21%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%);box-shadow:inset 0 0 2px 0 rgba(0,0,0,.5)}:host .ngx-ttitan-color-picker__AlphaPicker{background-image:linear-gradient(45deg,#dfe3e8 25%,transparent 0),linear-gradient(-45deg,#dfe3e8 25%,transparent 0),linear-gradient(45deg,transparent 75%,#dfe3e8 0),linear-gradient(-45deg,transparent 75%,#dfe3e8 0);background-size:1.6rem 1.6rem;background-position:0 0,0 .8rem,.8rem -.8rem,-.8rem 0}:host .ngx-ttitan-color-picker__AlphaPicker .ngx-ttitan-color-picker__ColorLayer{border-radius:8rem}:host .ngx-ttitan-color-picker.no-alpha .ngx-ttitan-color-picker__MainColor{width:200px}"],
                    },] },
        ];
        /** @nocollapse */
        NgxTTitanColorPickerComponent.ctorParameters = function () {
            return [
                { type: NgxTTitanColorPickerService },
                { type: i0.ChangeDetectorRef }
            ];
        };
        NgxTTitanColorPickerComponent.propDecorators = {
            componentClick: [{ type: i0.HostListener, args: ['click', ['$event'],] }],
            alpha: [{ type: i0.Input, args: ['alpha',] }],
            debug: [{ type: i0.Input, args: ['debug',] }],
            color: [{ type: i0.Input, args: ['color',] }],
            title: [{ type: i0.Input, args: ['title',] }],
            outFormat: [{ type: i0.Input, args: ['outFormat',] }],
            inputFormat: [{ type: i0.Input, args: ['inputFormat',] }],
            availPallets: [{ type: i0.Input, args: ['availPallets',] }],
            customPallets: [{ type: i0.Input, args: ['customPallets',] }],
            colorChanged: [{ type: i0.Output, args: ['colorChanged',] }],
            pickerInput: [{ type: i0.ViewChild, args: ['pickerInput',] }],
            paletteList: [{ type: i0.ViewChild, args: [NgxTTitanColorPickerPaletteListComponent,] }],
            mainColor: [{ type: i0.ViewChild, args: ['mainColor',] }],
            huePicker: [{ type: i0.ViewChild, args: ['huePicker',] }],
            alphaPicker: [{ type: i0.ViewChild, args: ['alphaPicker',] }]
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
            { type: i0.Directive, args: [{
                        selector: '[libNgxTTitanColorPickerDragger]'
                    },] },
        ];
        /** @nocollapse */
        NgxTTitanColorPickerDraggerDirective.ctorParameters = function () {
            return [
                { type: i0.ElementRef }
            ];
        };
        NgxTTitanColorPickerDraggerDirective.propDecorators = {
            pickerPad: [{ type: i0.Input, args: ['pickerPad',] }]
        };
        return NgxTTitanColorPickerDraggerDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NgxTTitanColorPickerSelectorDirective = (function () {
        function NgxTTitanColorPickerSelectorDirective(elRef, colorPickerService) {
            var _this = this;
            this.elRef = elRef;
            this.colorPickerService = colorPickerService;
            this.direction = 'both';
            this.dragger = null;
            this.change = new i0.EventEmitter();
            this.el = null;
            this.dragStart = false;
            this.globalMouseMove = null;
            this.globalMouseUp = null;
            this.el = this.elRef.nativeElement;
            this.direction = (['both', 'vertical', 'horizontal'].indexOf(this.direction) === -1) ? 'both' : this.direction;
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
            this.globalMouseMove = this.colorPickerService.mouseMoveObservable.subscribe(function (event) {
                if (_this.dragStart) {
                    _this.getPosition(/** @type {?} */ (event));
                }
            });
            this.globalMouseUp = this.colorPickerService.mouseUpObservable.subscribe(function (event) {
                if (_this.dragStart) {
                    _this.dragStart = false;
                    _this.getPosition(/** @type {?} */ (event));
                }
            });
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
                this.getPosition($event);
            };
        /**
         * @return {?}
         */
        NgxTTitanColorPickerSelectorDirective.prototype.ngOnDestroy = /**
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
            { type: i0.Directive, args: [{
                        selector: '[libNgxTTitanColorPickerSelector]',
                        exportAs: 'libNgxTTitanColorPickerSelector'
                    },] },
        ];
        /** @nocollapse */
        NgxTTitanColorPickerSelectorDirective.ctorParameters = function () {
            return [
                { type: i0.ElementRef },
                { type: NgxTTitanColorPickerService }
            ];
        };
        NgxTTitanColorPickerSelectorDirective.propDecorators = {
            direction: [{ type: i0.Input, args: ['direction',] }],
            dragger: [{ type: i0.ContentChild, args: [NgxTTitanColorPickerDraggerDirective,] }],
            change: [{ type: i0.Output, args: ['change',] }],
            onMouseDown: [{ type: i0.HostListener, args: ['mousedown', ['$event'],] }]
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
            this.inputChange = new i0.EventEmitter();
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
            { type: i0.Directive, args: [{
                        selector: '[libNgxTTitanColorPickerInput]',
                        exportAs: 'libNgxTTitanColorPickerInput'
                    },] },
        ];
        /** @nocollapse */
        NgxTTitanColorPickerInputDirective.ctorParameters = function () {
            return [
                { type: i0.ElementRef },
                { type: NgxTTitanColorPickerService }
            ];
        };
        NgxTTitanColorPickerInputDirective.propDecorators = {
            format: [{ type: i0.Input, args: ['format',] }],
            inputChange: [{ type: i0.Output, args: ['inputChange',] }],
            keyUp: [{ type: i0.HostListener, args: ['keyup',] }],
            change: [{ type: i0.HostListener, args: ['change',] }]
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
            { type: i0.NgModule, args: [{
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
                        exports: [NgxTTitanColorPickerComponent]
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXR0aXRhbi1jb2xvci1waWNrZXIudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci9saWIvbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuc2VydmljZS50cyIsIm5nOi8vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIvbGliL25neC10dGl0YW4tY29sb3ItcGlja2VyLXBhbGV0dGUtbGlzdC9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1wYWxldHRlLWxpc3QuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci9saWIvbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci9saWIvbmd4LXR0aXRhbi1jb2xvci1waWNrZXItZHJhZ2dlci5kaXJlY3RpdmUudHMiLCJuZzovL25neC10dGl0YW4tY29sb3ItcGlja2VyL2xpYi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1zZWxlY3Rvci5kaXJlY3RpdmUudHMiLCJuZzovL25neC10dGl0YW4tY29sb3ItcGlja2VyL2xpYi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1pbnB1dC5kaXJlY3RpdmUudHMiLCJuZzovL25neC10dGl0YW4tY29sb3ItcGlja2VyL2xpYi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDdXN0b21QZXJjZW50fSBmcm9tIFwiLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1zZWxlY3Rvci5kaXJlY3RpdmVcIjtcbmltcG9ydCB7Tmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnR9IGZyb20gXCIuL25neC10dGl0YW4tY29sb3ItcGlja2VyLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtmcm9tRXZlbnQsIE9ic2VydmFibGV9IGZyb20gXCJyeGpzL2luZGV4XCI7XG5pbXBvcnQge3dpbmRvd30gZnJvbSBcInJ4anMvaW50ZXJuYWwvb3BlcmF0b3JzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSFNWQSB7XG4gIGh1ZTogbnVtYmVyLFxuICBzYXR1cmF0aW9uOiBudW1iZXIsXG4gIHZhbHVlOiBudW1iZXIsXG4gIGFscGhhOiBudW1iZXIsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFsZXR0ZSB7XG4gIG5hbWU6IHN0cmluZyxcbiAgaWQ6IHN0cmluZyxcbiAgY29sb3JzOiBBcnJheTxzdHJpbmc+XG59XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5neFRUaXRhbkNvbG9yUGlja2VyU2VydmljZSB7XG5cbiAgcHVibGljIGRlYnVnOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBwaWNrZXJMaXN0OiBBcnJheTxzdHJpbmc+ID0gW107XG4gIHB1YmxpYyBwYWxsZXRzOiBBcnJheTxQYWxldHRlPiA9IFtdO1xuXG4gIHB1YmxpYyBtb3VzZU1vdmVPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPE1vdXNlRXZlbnQ+ID0gPE9ic2VydmFibGU8TW91c2VFdmVudD4+ZnJvbUV2ZW50KGRvY3VtZW50LCAnbW91c2Vtb3ZlJyk7XG4gIHB1YmxpYyBtb3VzZVVwT2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxNb3VzZUV2ZW50PiA9IDxPYnNlcnZhYmxlPE1vdXNlRXZlbnQ+PmZyb21FdmVudChkb2N1bWVudCwgJ21vdXNldXAnKTtcbiAgLy8gcHVibGljIG1vdXNlTW92ZU9ic2VydmFibGU6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLy8gcHVibGljIG1vdXNlVXBPYnNlcnZhYmxlOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5maWxsQmFzZVBhbGxldHMoKTtcbiAgICAvL1xuICAgIC8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsICgkZXZlbnQpID0+IHtcbiAgICAvLyAgIHRoaXMubW91c2VNb3ZlT2JzZXJ2YWJsZS5lbWl0KDxNb3VzZUV2ZW50PiRldmVudCk7XG4gICAgLy8gfSk7XG4gICAgLy8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgkZXZlbnQpID0+IHtcbiAgICAvLyAgIHRoaXMubW91c2VVcE9ic2VydmFibGUuZW1pdCg8TW91c2VFdmVudD4kZXZlbnQpO1xuICAgIC8vIH0pO1xuXG4gIH1cblxuICBzYXR1cmF0aW9uQ2hhbmdlKHBlcmNlbnQ6IEN1c3RvbVBlcmNlbnQsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQgKSB7XG4gICAgcGlja2VyQ29tcG9uZW50LmhzdmEuc2F0dXJhdGlvbiA9IHBlcmNlbnQueDtcbiAgICBwaWNrZXJDb21wb25lbnQuaHN2YS52YWx1ZSA9ICgxMDAgLSBwZXJjZW50LnkpO1xuICAgIHRoaXMuZGF0YVRvQ29sb3IocGlja2VyQ29tcG9uZW50KTtcbiAgfVxuXG4gIGh1ZUNoYW5nZShwZXJjZW50OiBDdXN0b21QZXJjZW50LCBwaWNrZXJDb21wb25lbnQ6IE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50KSB7XG4gICAgcGlja2VyQ29tcG9uZW50LmhzdmEuaHVlID0gTWF0aC5yb3VuZCgzNjAgKiBwZXJjZW50LnkgLyAxMDApO1xuICAgIHRoaXMuZGF0YVRvQ29sb3IocGlja2VyQ29tcG9uZW50KTtcbiAgfVxuXG4gIGFscGhhQ2hhbmdlKHBlcmNlbnQ6IEN1c3RvbVBlcmNlbnQsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBwaWNrZXJDb21wb25lbnQuaHN2YS5hbHBoYSA9ICgxMDAgLSBwZXJjZW50LnkpIC8gMTAwO1xuICAgIHRoaXMuZGF0YVRvQ29sb3IocGlja2VyQ29tcG9uZW50KTtcbiAgfVxuXG4gIGRhdGFUb0NvbG9yKHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBsZXQgcmdiYUFycjogQXJyYXk8bnVtYmVyPiA9IHRoaXMuaHN2YVRvUmdiYShcbiAgICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLmh1ZSxcbiAgICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLnNhdHVyYXRpb24sXG4gICAgICBwaWNrZXJDb21wb25lbnQuaHN2YS52YWx1ZSxcbiAgICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLmFscGhhXG4gICAgKTtcbiAgICBsZXQgcmdiYU1heEFycjogQXJyYXk8bnVtYmVyPiA9IHRoaXMuaHN2YVRvUmdiYShcbiAgICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLmh1ZSxcbiAgICAgIDEwMCxcbiAgICAgIDEwMCxcbiAgICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLmFscGhhXG4gICAgKTtcblxuICAgIHBpY2tlckNvbXBvbmVudC5jdXJyZW50Q29sb3IgPSAncmdiKCcgKyByZ2JhQXJyWzBdICsgJywnICsgcmdiYUFyclsxXSArICcsJyArIHJnYmFBcnJbMl0gKyAnKSc7XG4gICAgcGlja2VyQ29tcG9uZW50LmN1cnJlbnRDb2xvck1heCA9ICdyZ2JhKCcgKyByZ2JhTWF4QXJyWzBdICsgJywnICsgcmdiYU1heEFyclsxXSArICcsJyArIHJnYmFNYXhBcnJbMl0gKyAnLCcgKyByZ2JhTWF4QXJyWzNdICsgJyknO1xuICAgIHBpY2tlckNvbXBvbmVudC5jdXJyZW50Q29sb3JBbHBoYSA9ICdyZ2JhKCcgKyByZ2JhQXJyWzBdICsgJywnICsgcmdiYUFyclsxXSArICcsJyArIHJnYmFBcnJbMl0gKyAnLCcgKyByZ2JhQXJyWzNdICsgJyknO1xuICAgIHBpY2tlckNvbXBvbmVudC5jdXJyZW50Q29sb3JBbHBoYVplcm8gPSAncmdiYSgnICsgcmdiYUFyclswXSArICcsJyArIHJnYmFBcnJbMV0gKyAnLCcgKyByZ2JhQXJyWzJdICsgJywwKSc7XG5cbiAgICBwaWNrZXJDb21wb25lbnQuc2V0SW5wdXRWYWx1ZSgpO1xuICAgIHBpY2tlckNvbXBvbmVudC51cGRhdGVSZXR1cm5Db2xvcigpO1xuXG5cbiAgfVxuXG4gIGNvbG9yVG9EYXRhKGNvbG9yOiBzdHJpbmcsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBzd2l0Y2ggKHRoaXMuZGV0ZWN0Q29sb3JUeXBlKGNvbG9yKSkge1xuICAgICAgY2FzZSBcInJnYmFcIjogdGhpcy5wYXJzZVJnYmFDb2xvcihjb2xvciwgcGlja2VyQ29tcG9uZW50KTsgYnJlYWs7XG4gICAgICBjYXNlIFwicmdiXCI6IHRoaXMucGFyc2VSZ2JDb2xvcihjb2xvciwgcGlja2VyQ29tcG9uZW50KTsgYnJlYWs7XG4gICAgICBjYXNlIFwiaHNsYVwiOiB0aGlzLnBhcnNlSHNsYUNvbG9yKGNvbG9yLCBwaWNrZXJDb21wb25lbnQpOyBicmVhaztcbiAgICAgIGNhc2UgXCJoc2xcIjogdGhpcy5wYXJzZUhzbENvbG9yKGNvbG9yLCBwaWNrZXJDb21wb25lbnQpOyBicmVhaztcbiAgICAgIGNhc2UgXCJoZXg2XCI6IHRoaXMucGFyc2VIZXhDb2xvcihjb2xvciwgcGlja2VyQ29tcG9uZW50KTsgYnJlYWs7XG4gICAgICBjYXNlIFwiaGV4OFwiOiB0aGlzLnBhcnNlSGV4Q29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudCk7IGJyZWFrO1xuICAgIH1cbiAgICB0aGlzLmRhdGFUb0NvbG9yKHBpY2tlckNvbXBvbmVudCk7XG4gIH1cblxuICBnZXRQaWNrZXJVdWlkKCkge1xuICAgIGxldCBwaWNrZXJJZCA9ICcnO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCAxMDAwOyBpKyspIHtcbiAgICAgIHBpY2tlcklkID0gJ3BpY2tlci0nICsgdGhpcy5waWNrZXJMaXN0Lmxlbmd0aCArICctJyArIGk7XG4gICAgICBpZih0aGlzLnBpY2tlckxpc3QuaW5kZXhPZihwaWNrZXJJZCkgPT09IC0xICkge1xuICAgICAgICB0aGlzLnBpY2tlckxpc3QucHVzaChwaWNrZXJJZCk7XG4gICAgICAgIHJldHVybiBwaWNrZXJJZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG5cbiAgZGV0ZWN0Q29sb3JUeXBlKGNvbG9yOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmKGNvbG9yLmluZGV4T2YoJ3JnYmEnKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiAncmdiYSc7XG4gICAgfSBlbHNlIGlmKGNvbG9yLmluZGV4T2YoJ3JnYicpICE9PSAtMSkge1xuICAgICAgcmV0dXJuICdyZ2InO1xuICAgIH0gZWxzZSBpZihjb2xvci5pbmRleE9mKCdoc2xhJykgIT09IC0xKSB7XG4gICAgICByZXR1cm4gJ2hzbGEnO1xuICAgIH0gZWxzZSBpZihjb2xvci5pbmRleE9mKCdoc2wnKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiAnaHNsJztcbiAgICB9IGVsc2UgaWYgKGNvbG9yLmluZGV4T2YoJyMnKSAhPT0gLTEgJiYgKGNvbG9yLmxlbmd0aCA9PSA0IHx8IGNvbG9yLmxlbmd0aCA9PSA3KSl7XG4gICAgICByZXR1cm4gJ2hleDYnO1xuICAgIH0gZWxzZSBpZiAoY29sb3IuaW5kZXhPZignIycpICE9PSAtMSAmJiBjb2xvci5sZW5ndGggPT0gOSl7XG4gICAgICByZXR1cm4gJ2hleDgnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJ3VuZGVmaW5lZCc7XG4gICAgfVxuICB9XG5cblxuICBmaWxsVmFsdWVzRnJvbUhzdmFBcnIoaHN2YUFycjogQXJyYXk8bnVtYmVyPiwgcGlja2VyQ29tcG9uZW50OiBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCkge1xuICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLmh1ZSA9IGhzdmFBcnJbMF07XG4gICAgcGlja2VyQ29tcG9uZW50LmhzdmEuc2F0dXJhdGlvbiA9IGhzdmFBcnJbMV07XG4gICAgcGlja2VyQ29tcG9uZW50LmhzdmEudmFsdWUgPSBoc3ZhQXJyWzJdO1xuICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLmFscGhhID0gaHN2YUFyclszXTtcbiAgfVxuXG5cbiAgcGFyc2VSZ2JhQ29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBsZXQgYXVzID0gY29sb3IucmVwbGFjZSgncmdiYSgnLCAnJykucmVwbGFjZSgnKScsICcnKTtcbiAgICBsZXQgYXVzMiA9IGF1cy5zcGxpdCgnLCcpO1xuICAgIGlmKGF1czIubGVuZ3RoID09IDQpIHtcbiAgICAgIHRoaXMuZmlsbFZhbHVlc0Zyb21Ic3ZhQXJyKFxuICAgICAgICB0aGlzLnJnYmFUb0hzdmEoXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlswXSksXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlsxXSksXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlsyXSksXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlszXSksXG4gICAgICAgICksXG4gICAgICAgIHBpY2tlckNvbXBvbmVudFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwYXJzZVJnYkNvbG9yKGNvbG9yLCBwaWNrZXJDb21wb25lbnQ6IE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50KSB7XG4gICAgbGV0IGF1cyA9IGNvbG9yLnJlcGxhY2UoJ3JnYignLCAnJykucmVwbGFjZSgnKScsICcnKTtcbiAgICBsZXQgYXVzMiA9IGF1cy5zcGxpdCgnLCcpO1xuICAgIGlmKGF1czIubGVuZ3RoID09IDMpIHtcbiAgICAgIHRoaXMuZmlsbFZhbHVlc0Zyb21Ic3ZhQXJyKFxuICAgICAgICB0aGlzLnJnYmFUb0hzdmEoXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlswXSksXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlsxXSksXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlsyXSksXG4gICAgICAgICAgMVxuICAgICAgICApLFxuICAgICAgICBwaWNrZXJDb21wb25lbnRcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcGFyc2VIc2xhQ29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBsZXQgYXVzID0gY29sb3IucmVwbGFjZSgnaHNsYSgnLCAnJykucmVwbGFjZSgnKScsICcnKS5yZXBsYWNlKCclJywgJycpO1xuICAgIGxldCBhdXMyID0gYXVzLnNwbGl0KCcsJyk7XG4gICAgaWYoYXVzMi5sZW5ndGggPT0gNCkge1xuICAgICAgdGhpcy5maWxsVmFsdWVzRnJvbUhzdmFBcnIoXG4gICAgICAgIHRoaXMuaHNsYVRvSHN2YShcbiAgICAgICAgICBwYXJzZUludChhdXMyWzBdKSxcbiAgICAgICAgICBwYXJzZUludChhdXMyWzFdKSxcbiAgICAgICAgICBwYXJzZUludChhdXMyWzJdKSxcbiAgICAgICAgICBwYXJzZUludChhdXMyWzNdKSxcbiAgICAgICAgKSxcbiAgICAgICAgcGlja2VyQ29tcG9uZW50XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHBhcnNlSHNsQ29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBsZXQgYXVzID0gY29sb3IucmVwbGFjZSgnaHNsKCcsICcnKS5yZXBsYWNlKCcpJywgJycpLnJlcGxhY2UoJyUnLCAnJyk7XG4gICAgbGV0IGF1czIgPSBhdXMuc3BsaXQoJywnKTtcbiAgICBpZihhdXMyLmxlbmd0aCA9PSAzKSB7XG4gICAgICB0aGlzLmZpbGxWYWx1ZXNGcm9tSHN2YUFycihcbiAgICAgICAgdGhpcy5oc2xhVG9Ic3ZhKFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbMF0pLFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbMV0pLFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbMl0pLFxuICAgICAgICAgIDFcbiAgICAgICAgKSxcbiAgICAgICAgcGlja2VyQ29tcG9uZW50XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHBhcnNlSGV4Q29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBsZXQgYXVzID0gY29sb3IucmVwbGFjZSgnIycsICcnKTtcbiAgICB0aGlzLmZpbGxWYWx1ZXNGcm9tSHN2YUFycihcbiAgICAgIHRoaXMuaGV4VG9Ic3ZhKGF1cyksXG4gICAgICBwaWNrZXJDb21wb25lbnRcbiAgICApO1xuICB9XG5cblxuXG4gIGhzdmFUb1JnYmEoSCwgUywgViwgQSk6IEFycmF5PG51bWJlcj4ge1xuICAgIGxldCBmICwgcCwgcSAsIHQsIGxILCBSLCBHLCBCO1xuXG4gICAgSCA9IChIIDwgMzYwKSA/IEggOiAzNTk7XG4gICAgUyA9IFMgLyAxMDA7XG4gICAgViA9IFYgLyAxMDA7XG5cbiAgICBsSCA9IE1hdGguZmxvb3IoSCAvIDYwKTtcblxuICAgIGYgPSBILzYwIC0gbEg7XG5cbiAgICBwID0gViAqICgxIC0gUyk7XG5cbiAgICBxID0gViAqKDEgLSBTKmYpO1xuXG4gICAgdCA9IFYqICgxIC0gKDEtZikqIFMpO1xuXG4gICAgc3dpdGNoIChsSCl7XG4gICAgICBjYXNlIDA6IFIgPSBWOyBHID0gdDsgQiA9IHA7IGJyZWFrO1xuICAgICAgY2FzZSAxOiBSID0gcTsgRyA9IFY7IEIgPSBwOyBicmVhaztcbiAgICAgIGNhc2UgMjogUiA9IHA7IEcgPSBWOyBCID0gdDsgYnJlYWs7XG4gICAgICBjYXNlIDM6IFIgPSBwOyBHID0gcTsgQiA9IFY7IGJyZWFrO1xuICAgICAgY2FzZSA0OiBSID0gdDsgRyA9IHA7IEIgPSBWOyBicmVhaztcbiAgICAgIGNhc2UgNTogUiA9IFY7IEcgPSBwOyBCID0gcTsgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtNYXRoLnJvdW5kKFIqMjU1KSwgTWF0aC5yb3VuZChHKjI1NSksIE1hdGgucm91bmQoQioyNTUpLCBBXTtcbiAgfVxuXG4gIGhzdmFUb1JnYmFTdHJpbmcoSCwgUywgViwgQSwgc2hvd0FscGhhOiBib29sZWFuID0gZmFsc2UpOiBzdHJpbmcge1xuICAgIGxldCBjb2xvckFycjogQXJyYXk8bnVtYmVyPiA9IHRoaXMuaHN2YVRvUmdiYShILCBTLCBWLCBBKTtcblxuICAgIGlmKHNob3dBbHBoYSkge1xuICAgICAgcmV0dXJuICdyZ2JhKCcgKyBjb2xvckFyci5qb2luKCcsJykgKyAnKSc7XG4gICAgfVxuXG4gICAgY29sb3JBcnIucG9wKCk7XG4gICAgcmV0dXJuICdyZ2IoJyArIGNvbG9yQXJyLmpvaW4oJywnKSArICcpJztcblxuICB9XG5cbiAgcmdiYVRvSHN2YShyLCBnLCBiLCBhKTogQXJyYXk8bnVtYmVyPiB7XG4gICAgciAvPSAyNTU7XG4gICAgZyAvPSAyNTU7XG4gICAgYiAvPSAyNTU7XG5cbiAgICBsZXQgbWF4ID0gTWF0aC5tYXgociwgZywgYiksIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xuICAgIGxldCBoLCBzLCB2ID0gbWF4O1xuICAgIGxldCBkID0gbWF4IC0gbWluO1xuICAgIHMgPSBtYXggPT0gMCA/IDAgOiBkIC8gbWF4O1xuXG4gICAgaWYgKG1heCA9PSBtaW4pIHtcbiAgICAgIGggPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2ggKG1heCkge1xuICAgICAgICBjYXNlIHI6IGggPSAoZyAtIGIpIC8gZCArIChnIDwgYiA/IDYgOiAwKTsgYnJlYWs7XG4gICAgICAgIGNhc2UgZzogaCA9IChiIC0gcikgLyBkICsgMjsgYnJlYWs7XG4gICAgICAgIGNhc2UgYjogaCA9IChyIC0gZykgLyBkICsgNDsgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGggLz0gNjtcbiAgICB9XG5cblxuICAgIHJldHVybiBbXG4gICAgICBoICogMzYwLFxuICAgICAgcyAqIDEwMCxcbiAgICAgIHYgKiAxMDAsXG4gICAgICBhXG4gICAgXTtcbiAgfVxuXG4gIGhzdmFUb0hzbGEoaCwgcywgdiwgYSk6IEFycmF5PG51bWJlcj57XG4gICAgcyAvPSAxMDA7XG4gICAgdiAvPSAxMDA7XG4gICAgcmV0dXJuW1xuICAgICAgTWF0aC5yb3VuZChoKSxcbiAgICAgIE1hdGgucm91bmQoKHMqdi8oKGg9KDItcykqdik8MT9oOjItaCkpICogMTAwKSxcbiAgICAgIE1hdGgucm91bmQoKGgvMikgKiAxMDApLFxuICAgICAgYVxuICAgIF1cbiAgfVxuXG4gIGhzbGFUb0hzdmEgKGgsIHMsIGwsIGEpOiBBcnJheTxudW1iZXI+e1xuICAgIHMgLz0gMTAwO1xuICAgIGwgLz0gMTAwO1xuICAgIHMqPWw8LjU/bDoxLWw7XG4gICAgcmV0dXJuW1xuICAgICAgaCxcbiAgICAgIE1hdGgucm91bmQoKDIqcy8obCtzKSkgKiAxMDApLFxuICAgICAgTWF0aC5yb3VuZCgobCtzKSAqIDEwMCksXG4gICAgICBhXG4gICAgXVxuICB9XG5cbiAgaGV4VG9Ic3ZhKGhleDogc3RyaW5nKTogQXJyYXk8bnVtYmVyPiB7XG5cbiAgICBsZXQgcmdiYSA9IFswLDAsMCwxXTtcbiAgICBpZiAoaGV4Lmxlbmd0aCA9PSA2KSB7XG4gICAgICByZ2JhID0gW1xuICAgICAgICBwYXJzZUludChoZXguc3Vic3RyaW5nKDAsIDIpLCAxNiksXG4gICAgICAgIHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMiwgNCksIDE2KSxcbiAgICAgICAgcGFyc2VJbnQoaGV4LnN1YnN0cmluZyg0LCA2KSwgMTYpLFxuICAgICAgICAxXG4gICAgICBdO1xuICAgIH0gZWxzZSBpZiAoaGV4Lmxlbmd0aCA9PSAzKSB7XG4gICAgICByZ2JhID0gW1xuICAgICAgICBwYXJzZUludChoZXguc3Vic3RyaW5nKDAsIDEpICsgaGV4LnN1YnN0cmluZygwLCAxKSwgMTYpLFxuICAgICAgICBwYXJzZUludChoZXguc3Vic3RyaW5nKDEsIDIpICsgaGV4LnN1YnN0cmluZygxLCAyKSwgMTYpLFxuICAgICAgICBwYXJzZUludChoZXguc3Vic3RyaW5nKDIsIDMpICsgaGV4LnN1YnN0cmluZygyLCAzKSwgMTYpLFxuICAgICAgICAxXG4gICAgICBdXG4gICAgfSBlbHNlIGlmIChoZXgubGVuZ3RoID09IDgpIHtcbiAgICAgIHJnYmEgPSBbXG4gICAgICAgIHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMCwgMiksIDE2KSxcbiAgICAgICAgcGFyc2VJbnQoaGV4LnN1YnN0cmluZygyLCA0KSwgMTYpLFxuICAgICAgICBwYXJzZUludChoZXguc3Vic3RyaW5nKDQsIDYpLCAxNiksXG4gICAgICAgIHBhcnNlRmxvYXQoKHBhcnNlSW50KGhleC5zdWJzdHJpbmcoNiwgOCksIDE2KSAvIDI1NSkudG9GaXhlZCgyKSlcbiAgICAgIF1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmdiYVRvSHN2YShyZ2JhWzBdLCByZ2JhWzFdLCByZ2JhWzJdLCByZ2JhWzNdKTtcblxuICB9XG5cbiAgaHN2YVRvSGV4KEgsIFMsIFYsIEEsIHNob3dBbHBoYTogYm9vbGVhbiA9IHRydWUpOiBzdHJpbmcge1xuICAgIGxldCByZ2JhOiBBcnJheTxudW1iZXI+ID0gdGhpcy5oc3ZhVG9SZ2JhKEgsIFMsIFYsIEEpO1xuXG4gICAgbGV0IGhBOiBzdHJpbmcgPSAoKHNob3dBbHBoYSkgPyAocmdiYVszXSAqIDI1NSkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygwLDIpIDogJycpO1xuXG4gICAgaWYoc2hvd0FscGhhKSB7XG4gICAgICBoQSA9IChoQS5sZW5ndGggPT0gMSkgPyBoQSArIGhBIDogaEE7XG4gICAgfVxuICAgIHJldHVybiAnIycgK1xuICAgICAgKChyZ2JhWzJdIHwgcmdiYVsxXSA8PCA4IHwgcmdiYVswXSA8PCAxNikgfCAxIDw8IDI0KS50b1N0cmluZygxNikuc2xpY2UoMSkgK1xuICAgICAgaEE7XG4gIH1cblxuXG4gIHZhbGlkYXRlQ29sb3JGb3JtYXQodmFsdWU6IHN0cmluZywgZm9ybWF0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHN3aXRjaCAoZm9ybWF0KSB7XG4gICAgICBjYXNlIFwiaGV4NlwiOiByZXR1cm4gdGhpcy52YWxpZGF0ZUhleEZvcm1hdCh2YWx1ZSk7XG4gICAgICBjYXNlIFwiaGV4OFwiOiByZXR1cm4gdGhpcy52YWxpZGF0ZUhleEZvcm1hdCh2YWx1ZSwgdHJ1ZSk7XG4gICAgICBjYXNlIFwicmdiXCI6IHJldHVybiB0aGlzLnZhbGlkYXRlUmdiYUZvcm1hdCh2YWx1ZSk7XG4gICAgICBjYXNlIFwicmdiYVwiOiByZXR1cm4gdGhpcy52YWxpZGF0ZVJnYmFGb3JtYXQodmFsdWUsIHRydWUpO1xuICAgICAgLy8gY2FzZSBcImhzbFwiOiByZXR1cm4gdGhpcy52YWxpZGF0ZUhleEZvcm1hdCh2YWx1ZSk7XG4gICAgICAvLyBjYXNlIFwiaHNsYVwiOiByZXR1cm4gdGhpcy52YWxpZGF0ZUhleEZvcm1hdCh2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiAnbm90VmFsaWQnO1xuICB9XG5cbiAgdmFsaWRhdGVIZXhGb3JtYXQodmFsdWU6IHN0cmluZywgYWxwaGE6IGJvb2xlYW4gPSBmYWxzZSk6IHN0cmluZyB7XG4gICAgbGV0IHJlc3VsdCA9ICdub3RWYWxpZCc7XG4gICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKCcjJywgJycpO1xuICAgIGlmKCFhbHBoYSkge1xuICAgICAgaWYodmFsdWUubGVuZ3RoID09PSA2KSB7XG4gICAgICAgIGlmKCFpc05hTihwYXJzZUludCh2YWx1ZSwgMTYpKSkge1xuICAgICAgICAgIHJldHVybiAnIycgKyB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZih2YWx1ZS5sZW5ndGggPT09IDgpIHtcbiAgICAgICAgaWYoIWlzTmFOKHBhcnNlSW50KHZhbHVlLCAxNikpKSB7XG4gICAgICAgICAgcmV0dXJuICcjJyArIHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHZhbGlkYXRlUmdiYUZvcm1hdCh2YWx1ZTogc3RyaW5nLCBhbHBoYTogYm9vbGVhbiA9IGZhbHNlKTogc3RyaW5nIHtcbiAgICBsZXQgcmVzdWx0ID0gJ25vdFZhbGlkJztcbiAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1teMC05XFwsXSsvZywgXCJcIik7XG4gICAgbGV0IGF1c0FycjogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPiA9IHZhbHVlLnNwbGl0KCcsJyk7XG4gICAgbGV0IGFscGhhVmFsOiBzdHJpbmcgfCBudW1iZXIgPSAnJztcblxuICAgIGlmKCFhbHBoYSkge1xuICAgICAgaWYoYXVzQXJyLmxlbmd0aCA9PSAzKSB7XG4gICAgICAgIGF1c0FyciA9IGF1c0Fyci5tYXAoZnVuY3Rpb24odmFsOiBzdHJpbmcpe3JldHVybiBwYXJzZUludCh2YWwpfSk7XG4gICAgICAgIGlmKFxuICAgICAgICAgIE1hdGgubWF4LmFwcGx5KG51bGwsIGF1c0FycikgPD0gMjU1ICYmXG4gICAgICAgICAgTWF0aC5taW4uYXBwbHkobnVsbCwgYXVzQXJyKSA+PSAwXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiAncmdiKCcgKyBhdXNBcnIuam9pbignLCcpICsgJyknO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKGF1c0Fyci5sZW5ndGggPT0gNCkge1xuICAgICAgICBhbHBoYVZhbCA9IHBhcnNlRmxvYXQoPHN0cmluZz5hdXNBcnIucG9wKCkpO1xuICAgICAgICBhdXNBcnIgPSBhdXNBcnIubWFwKGZ1bmN0aW9uKHZhbDogc3RyaW5nKXtyZXR1cm4gcGFyc2VJbnQodmFsKX0pO1xuICAgICAgICBpZihcbiAgICAgICAgICBNYXRoLm1heC5hcHBseShudWxsLCBhdXNBcnIpIDw9IDI1NSAmJlxuICAgICAgICAgIE1hdGgubWluLmFwcGx5KG51bGwsIGF1c0FycikgPj0gMCAmJlxuICAgICAgICAgIGFscGhhVmFsID49IDAgJiYgYWxwaGFWYWwgPD0gMVxuICAgICAgICApIHtcbiAgICAgICAgICBhdXNBcnIucHVzaChhbHBoYVZhbCk7XG4gICAgICAgICAgcmV0dXJuICdyZ2JhKCcgKyBhdXNBcnIuam9pbignLCcpICsgJyknO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByZXBhcmVSZXR1cm5Db2xvcihoc3ZhOiBIU1ZBLCBmb3JtYXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgc3dpdGNoIChmb3JtYXQpIHtcbiAgICAgIGNhc2UgXCJoZXg2XCI6IHJldHVybiB0aGlzLmhzdmFUb0hleChoc3ZhLmh1ZSwgaHN2YS5zYXR1cmF0aW9uLCBoc3ZhLnZhbHVlLCAxLCBmYWxzZSk7XG4gICAgICBjYXNlIFwiaGV4OFwiOiByZXR1cm4gdGhpcy5oc3ZhVG9IZXgoaHN2YS5odWUsIGhzdmEuc2F0dXJhdGlvbiwgaHN2YS52YWx1ZSwgaHN2YS5hbHBoYSwgdHJ1ZSk7XG4gICAgICBjYXNlIFwicmdiXCI6IHJldHVybiB0aGlzLmhzdmFUb1JnYmFTdHJpbmcoaHN2YS5odWUsIGhzdmEuc2F0dXJhdGlvbiwgaHN2YS52YWx1ZSwgMSk7XG4gICAgICBjYXNlIFwicmdiYVwiOiByZXR1cm4gdGhpcy5oc3ZhVG9SZ2JhU3RyaW5nKGhzdmEuaHVlLCBoc3ZhLnNhdHVyYXRpb24sIGhzdmEudmFsdWUsIGhzdmEuYWxwaGEsIHRydWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5oc3ZhVG9IZXgoaHN2YS5odWUsIGhzdmEuc2F0dXJhdGlvbiwgaHN2YS52YWx1ZSwgMSwgZmFsc2UpO1xuICB9XG5cbiAgcHJlcGFyZVBpY2tlclBhbGxldHMoYXZhaWxQYWxsZXRzOiBBcnJheTxzdHJpbmc+ID0gW10sIGN1c3RvbVBhbGxldHM6IEFycmF5PFBhbGV0dGU+ID0gW10sIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICB0aGlzLnBhbGxldHMuZm9yRWFjaCgocGFsZXR0ZSkgPT4ge1xuICAgICAgaWYoYXZhaWxQYWxsZXRzLmluZGV4T2YocGFsZXR0ZS5pZCkgIT09IC0xKSB7XG4gICAgICAgIHBpY2tlckNvbXBvbmVudC5waWNrZXJQYWxsZXRzLnB1c2gocGFsZXR0ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY3VzdG9tUGFsbGV0cy5mb3JFYWNoKChwYWxldHRlKSA9PiB7XG4gICAgICBwaWNrZXJDb21wb25lbnQucGlja2VyUGFsbGV0cy5wdXNoKHBhbGV0dGUpO1xuICAgIH0pXG5cbiAgfVxuXG4gIGZpbGxCYXNlUGFsbGV0cygpIHtcbiAgICB0aGlzLnBhbGxldHMucHVzaCh7XG4gICAgICBpZDogJ3BvbGFyaXMnLFxuICAgICAgbmFtZTogJ1BvbGFyaXMnLFxuICAgICAgY29sb3JzOiBbXG4gICAgICAgICcjRjlGQUZCJywgJyNGNEY2RjgnLCAnI0RGRTNFOCcsICcjQzRDREQ1JyxcbiAgICAgICAgJyM5MTlFQUInLCAnIzYzNzM4MScsICcjNDU0RjVCJywgJyMyMTJCMzYnLFxuICAgICAgICAnI0IzQjVDQicsICcjNDM0NjdGJywgJyMxQzIyNjAnLCAnIzAwMDQ0QycsXG4gICAgICAgICcjRjZGMEZEJywgJyNFM0QwRkYnLCAnIzlDNkFERScsICcjNTAyNDhGJywgJyMyMzAwNTEnLFxuICAgICAgICAnI0Y0RjVGQScsICcjQjNCQ0Y1JywgJyM1QzZBQzQnLCAnIzIwMkU3OCcsICcjMDAwNjM5JyxcbiAgICAgICAgJyNFQkY1RkEnLCAnI0I0RTFGQScsICcjMDA3QUNFJywgJyMwODRFOEEnLCAnIzAwMTQyOScsXG4gICAgICAgICcjRTBGNUY1JywgJyNCN0VDRUMnLCAnIzQ3QzFCRicsICcjMDA4NDhFJywgJyMwMDMxMzUnLFxuICAgICAgICAnI0UzRjFERicsICcjQkJFNUIzJywgJyM1MEI4M0MnLCAnIzEwODA0MycsICcjMTczNjMwJyxcbiAgICAgICAgJyNGQ0YxQ0QnLCAnI0ZGRUE4QScsICcjRUVDMjAwJywgJyM5QzZGMTknLCAnIzU3M0IwMCcsXG4gICAgICAgICcjRkNFQkRCJywgJyNGRkM1OEInLCAnI0Y0OTM0MicsICcjQzA1NzE3JywgJyM0QTE1MDQnLFxuICAgICAgICAnI0ZCRUFFNScsICcjRkVBRDlBJywgJyNERTM2MTgnLCAnI0JGMDcxMScsICcjMzMwMTAxJyxcbiAgICAgIF1cbiAgICB9KTtcbiAgICB0aGlzLnBhbGxldHMucHVzaCh7XG4gICAgICBpZDogJ21hdGVyaWFsJyxcbiAgICAgIG5hbWU6ICdNYXRlcmlhbCcsXG4gICAgICBjb2xvcnM6IFtcbiAgICAgICAgJyNmZmViZWUnLCAnI2ZmY2RkMicsICcjZWY5YTlhJywgJyNlNTczNzMnLCAnI2VmNTM1MCcsICcjZjQ0MzM2JywgJyNlNTM5MzUnLCAnI2QzMmYyZicsICcjYzYyODI4JywgJyNiNzFjMWMnLCAnI2ZmOGE4MCcsICcjZmY1MjUyJywgJyNmZjE3NDQnLCAnI2Q1MDAwMCcsXG4gICAgICAgICcjZmNlNGVjJywgJyNmOGJiZDAnLCAnI2Y0OGZiMScsICcjZjA2MjkyJywgJyNlYzQwN2EnLCAnI2U5MWU2MycsICcjZDgxYjYwJywgJyNjMjE4NWInLCAnI2FkMTQ1NycsICcjODgwZTRmJywgJyNmZjgwYWInLCAnI2ZmNDA4MScsICcjZjUwMDU3JywgJyNjNTExNjInLFxuICAgICAgICAnI2YzZTVmNScsICcjZTFiZWU3JywgJyNjZTkzZDgnLCAnI2JhNjhjOCcsICcjYWI0N2JjJywgJyM5YzI3YjAnLCAnIzhlMjRhYScsICcjN2IxZmEyJywgJyM2YTFiOWEnLCAnIzRhMTQ4YycsICcjZWE4MGZjJywgJyNlMDQwZmInLCAnI2Q1MDBmOScsICcjYWEwMGZmJyxcbiAgICAgICAgJyNlZGU3ZjYnLCAnI2QxYzRlOScsICcjYjM5ZGRiJywgJyM5NTc1Y2QnLCAnIzdlNTdjMicsICcjNjczYWI3JywgJyM1ZTM1YjEnLCAnIzUxMmRhOCcsICcjNDUyN2EwJywgJyMzMTFiOTInLCAnI2IzODhmZicsICcjN2M0ZGZmJywgJyM2NTFmZmYnLCAnIzYyMDBlYScsXG4gICAgICAgICcjZThlYWY2JywgJyNjNWNhZTknLCAnIzlmYThkYScsICcjNzk4NmNiJywgJyM1YzZiYzAnLCAnIzNmNTFiNScsICcjMzk0OWFiJywgJyMzMDNmOWYnLCAnIzI4MzU5MycsICcjMWEyMzdlJywgJyM4YzllZmYnLCAnIzUzNmRmZScsICcjM2Q1YWZlJywgJyMzMDRmZmUnLFxuICAgICAgICAnI2UzZjJmZCcsICcjYmJkZWZiJywgJyM5MGNhZjknLCAnIzY0YjVmNicsICcjNDJhNWY1JywgJyMyMTk2ZjMnLCAnIzFlODhlNScsICcjMTk3NmQyJywgJyMxNTY1YzAnLCAnIzBkNDdhMScsICcjODJiMWZmJywgJyM0NDhhZmYnLCAnIzI5NzlmZicsICcjMjk2MmZmJyxcbiAgICAgICAgJyNlMWY1ZmUnLCAnI2IzZTVmYycsICcjODFkNGZhJywgJyM0ZmMzZjcnLCAnIzI5YjZmNicsICcjMDNhOWY0JywgJyMwMzliZTUnLCAnIzAyODhkMScsICcjMDI3N2JkJywgJyMwMTU3OWInLCAnIzgwZDhmZicsICcjNDBjNGZmJywgJyMwMGIwZmYnLCAnIzAwOTFlYScsXG4gICAgICAgICcjZTBmN2ZhJywgJyNiMmViZjInLCAnIzgwZGVlYScsICcjNGRkMGUxJywgJyMyNmM2ZGEnLCAnIzAwYmNkNCcsICcjMDBhY2MxJywgJyMwMDk3YTcnLCAnIzAwODM4ZicsICcjMDA2MDY0JywgJyM4NGZmZmYnLCAnIzE4ZmZmZicsICcjMDBlNWZmJywgJyMwMGI4ZDQnLFxuICAgICAgICAnI2UwZjJmMScsICcjYjJkZmRiJywgJyM4MGNiYzQnLCAnIzRkYjZhYycsICcjMjZhNjlhJywgJyMwMDk2ODgnLCAnIzAwODk3YicsICcjMDA3OTZiJywgJyMwMDY5NWMnLCAnIzAwNGQ0MCcsICcjYTdmZmViJywgJyM2NGZmZGEnLCAnIzFkZTliNicsICcjMDBiZmE1JyxcbiAgICAgICAgJyNlOGY1ZTknLCAnI2M4ZTZjOScsICcjYTVkNmE3JywgJyM4MWM3ODQnLCAnIzY2YmI2YScsICcjNGNhZjUwJywgJyM0M2EwNDcnLCAnIzM4OGUzYycsICcjMmU3ZDMyJywgJyMxYjVlMjAnLCAnI2I5ZjZjYScsICcjNjlmMGFlJywgJyMwMGU2NzYnLCAnIzAwYzg1MycsXG4gICAgICAgICcjZjFmOGU5JywgJyNkY2VkYzgnLCAnI2M1ZTFhNScsICcjYWVkNTgxJywgJyM5Y2NjNjUnLCAnIzhiYzM0YScsICcjN2NiMzQyJywgJyM2ODlmMzgnLCAnIzU1OGIyZicsICcjMzM2OTFlJywgJyNjY2ZmOTAnLCAnI2IyZmY1OScsICcjNzZmZjAzJywgJyM2NGRkMTcnLFxuICAgICAgICAnI2Y5ZmJlNycsICcjZjBmNGMzJywgJyNlNmVlOWMnLCAnI2RjZTc3NScsICcjZDRlMTU3JywgJyNjZGRjMzknLCAnI2MwY2EzMycsICcjYWZiNDJiJywgJyM5ZTlkMjQnLCAnIzgyNzcxNycsICcjZjRmZjgxJywgJyNlZWZmNDEnLCAnI2M2ZmYwMCcsICcjYWVlYTAwJyxcbiAgICAgICAgJyNmZmZkZTcnLCAnI2ZmZjljNCcsICcjZmZmNTlkJywgJyNmZmYxNzYnLCAnI2ZmZWU1OCcsICcjZmZlYjNiJywgJyNmZGQ4MzUnLCAnI2ZiYzAyZCcsICcjZjlhODI1JywgJyNmNTdmMTcnLCAnI2ZmZmY4ZCcsICcjZmZmZjAwJywgJyNmZmVhMDAnLCAnI2ZmZDYwMCcsXG4gICAgICAgICcjZmZmOGUxJywgJyNmZmVjYjMnLCAnI2ZmZTA4MicsICcjZmZkNTRmJywgJyNmZmNhMjgnLCAnI2ZmYzEwNycsICcjZmZiMzAwJywgJyNmZmEwMDAnLCAnI2ZmOGYwMCcsICcjZmY2ZjAwJywgJyNmZmU1N2YnLCAnI2ZmZDc0MCcsICcjZmZjNDAwJywgJyNmZmFiMDAnLFxuICAgICAgICAnI2ZmZjNlMCcsICcjZmZlMGIyJywgJyNmZmNjODAnLCAnI2ZmYjc0ZCcsICcjZmZhNzI2JywgJyNmZjk4MDAnLCAnI2ZiOGMwMCcsICcjZjU3YzAwJywgJyNlZjZjMDAnLCAnI2U2NTEwMCcsICcjZmZkMTgwJywgJyNmZmFiNDAnLCAnI2ZmOTEwMCcsICcjZmY2ZDAwJyxcbiAgICAgICAgJyNmYmU5ZTcnLCAnI2ZmY2NiYycsICcjZmZhYjkxJywgJyNmZjhhNjUnLCAnI2ZmNzA0MycsICcjZmY1NzIyJywgJyNmNDUxMWUnLCAnI2U2NGExOScsICcjZDg0MzE1JywgJyNiZjM2MGMnLCAnI2ZmOWU4MCcsICcjZmY2ZTQwJywgJyNmZjNkMDAnLCAnI2RkMmMwMCcsXG4gICAgICAgICcjZWZlYmU5JywgJyNkN2NjYzgnLCAnI2JjYWFhNCcsICcjYTE4ODdmJywgJyM4ZDZlNjMnLCAnIzc5NTU0OCcsICcjNmQ0YzQxJywgJyM1ZDQwMzcnLCAnIzRlMzQyZScsICcjM2UyNzIzJyxcbiAgICAgICAgJyNmYWZhZmEnLCAnI2Y1ZjVmNScsICcjZWVlZWVlJywgJyNlMGUwZTAnLCAnI2JkYmRiZCcsICcjOWU5ZTllJywgJyM3NTc1NzUnLCAnIzYxNjE2MScsICcjNDI0MjQyJywgJyMyMTIxMjEnLFxuICAgICAgICAnI2VjZWZmMScsICcjY2ZkOGRjJywgJyNiMGJlYzUnLCAnIzkwYTRhZScsICcjNzg5MDljJywgJyM2MDdkOGInLCAnIzU0NmU3YScsICcjNDU1YTY0JywgJyMzNzQ3NGYnLCAnIzI2MzIzOCcsXG4gICAgICBdXG4gICAgfSk7XG4gIH1cblxuXG5cblxuXG59XG4iLCJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtQYWxldHRlfSBmcm9tIFwiLi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItbmd4LXR0aXRhbi1jb2xvci1waWNrZXItcGFsZXR0ZS1saXN0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwicGlja2VyLXBhbGV0dGUtd3JhcHBlclwiICpuZ0lmPVwicGFsbGV0cy5sZW5ndGggPiAwXCI+XG4gIDxkaXYgY2xhc3M9XCJwYWxldHRlLWxpbmtzXCI+XG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJwYWxldHRlLWxpbmtcIlxuICAgICAgKm5nRm9yPVwibGV0IHBhbGV0dGUgb2YgcGFsbGV0c1wiXG4gICAgICBbbmdDbGFzc109XCJ7J3NlbGVjdGVkJzogKGFjdGl2ZVBhbGV0dGUgIT09IG51bGwgJiYgYWN0aXZlUGFsZXR0ZS5pZCA9PSBwYWxldHRlLmlkKX1cIlxuICAgICAgKGNsaWNrKT1cInNlbGVjdFBhbGV0dGUocGFsZXR0ZSlcIlxuICAgID5cbiAgICAgIHt7cGFsZXR0ZS5uYW1lfX1cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJwYWxldHRlLXBpY2tlci1ob2xkZXJcIiAqbmdJZj1cImFjdGl2ZVBhbGV0dGUgIT09IG51bGwgJiYgYWN0aXZlUGFsZXR0ZS5jb2xvcnMubGVuZ3RoID4gMFwiPlxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwicGFsZXR0ZS1jb2xvclwiXG4gICAgICAqbmdGb3I9XCJsZXQgY29sb3Igb2YgYWN0aXZlUGFsZXR0ZS5jb2xvcnNcIlxuICAgICAgW25nU3R5bGVdPVwie1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yXG4gICAgICB9XCJcbiAgICAgIChjbGljayk9XCJjb2xvclNlbGVjdGVkKGNvbG9yKVwiXG4gICAgPlxuXG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgOmhvc3QgLnBpY2tlci1wYWxldHRlLXdyYXBwZXIgLnBhbGV0dGUtbGlua3N7ZGlzcGxheTpmbGV4O2ZsZXgtd3JhcDp3cmFwO21hcmdpbi1ib3R0b206NXB4fTpob3N0IC5waWNrZXItcGFsZXR0ZS13cmFwcGVyIC5wYWxldHRlLWxpbmtzIC5wYWxldHRlLWxpbmt7bWFyZ2luLXJpZ2h0OjVweDtib3JkZXItcmFkaXVzOjNweDtwYWRkaW5nOjJweCA0cHg7Ym9yZGVyOjFweCBzb2xpZCAjZGRkO3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtmb250LXNpemU6MTBweDtmb250LWZhbWlseTotYXBwbGUtc3lzdGVtLEJsaW5rTWFjU3lzdGVtRm9udCxTYW4gRnJhbmNpc2NvLFJvYm90byxTZWdvZSBVSSxIZWx2ZXRpY2EgTmV1ZSxzYW5zLXNlcmlmO2ZvbnQtd2VpZ2h0OjYwMDtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7Y3Vyc29yOnBvaW50ZXJ9Omhvc3QgLnBpY2tlci1wYWxldHRlLXdyYXBwZXIgLnBhbGV0dGUtbGlua3MgLnBhbGV0dGUtbGluay5zZWxlY3RlZHtiYWNrZ3JvdW5kLWNvbG9yOiM1ZTZiYzU7Y29sb3I6I2ZmZn06aG9zdCAucGlja2VyLXBhbGV0dGUtd3JhcHBlciAucGFsZXR0ZS1waWNrZXItaG9sZGVye2hlaWdodDoxNjVweDtkaXNwbGF5OmZsZXg7ZmxleC13cmFwOndyYXA7YWxpZ24taXRlbXM6ZmxleC1zdGFydDtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydDthbGlnbi1jb250ZW50OmJhc2VsaW5lfTpob3N0IC5waWNrZXItcGFsZXR0ZS13cmFwcGVyIC5wYWxldHRlLXBpY2tlci1ob2xkZXIgLnBhbGV0dGUtY29sb3J7Y3Vyc29yOnBvaW50ZXI7d2lkdGg6MTBweDtoZWlnaHQ6MTBweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hUVGl0YW5Db2xvclBpY2tlclBhbGV0dGVMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoJ3BhbGxldHMnKSBwdWJsaWMgcGFsbGV0czogQXJyYXk8UGFsZXR0ZT4gPSBbXTtcbiAgQE91dHB1dCgnY2hhbmdlJykgcHVibGljIGNoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBwdWJsaWMgYWN0aXZlUGFsZXR0ZTogUGFsZXR0ZSA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIGNsb3NlUGFsZXR0ZSgpIHtcbiAgICB0aGlzLmFjdGl2ZVBhbGV0dGUgPSBudWxsO1xuICB9XG5cbiAgc2VsZWN0UGFsZXR0ZShwYWxldHRlOiBQYWxldHRlKSB7XG4gICAgaWYoXG4gICAgICB0aGlzLmFjdGl2ZVBhbGV0dGUgPT0gbnVsbFxuICAgICkge1xuICAgICAgdGhpcy5hY3RpdmVQYWxldHRlID0gcGFsZXR0ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYWN0aXZlUGFsZXR0ZS5pZCAhPT0gcGFsZXR0ZS5pZCkge1xuICAgICAgdGhpcy5hY3RpdmVQYWxldHRlID0gcGFsZXR0ZTtcbiAgICB9XG5cbiAgfVxuXG4gIGNvbG9yU2VsZWN0ZWQoY29sb3IpIHtcbiAgICB0aGlzLmNoYW5nZS5lbWl0KGNvbG9yKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgQ29udGVudENoaWxkLCBDb250ZW50Q2hpbGRyZW4sIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25Jbml0LFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Tmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvckRpcmVjdGl2ZX0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXItc2VsZWN0b3IuZGlyZWN0aXZlXCI7XG5pbXBvcnQge0hTVkEsIE5neFRUaXRhbkNvbG9yUGlja2VyU2VydmljZSwgUGFsZXR0ZX0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuc2VydmljZVwiO1xuaW1wb3J0IHtOZ3hUVGl0YW5Db2xvclBpY2tlcklucHV0RGlyZWN0aXZlfSBmcm9tIFwiLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1pbnB1dC5kaXJlY3RpdmVcIjtcbmltcG9ydCB7Tmd4VFRpdGFuQ29sb3JQaWNrZXJQYWxldHRlTGlzdENvbXBvbmVudH0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXItcGFsZXR0ZS1saXN0L25neC10dGl0YW4tY29sb3ItcGlja2VyLXBhbGV0dGUtbGlzdC5jb21wb25lbnRcIjtcbi8vW25nU3R5bGVdPVwie2JhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQodG8gdG9wLCAnICsgbmd4VFRpdGFuQ29sb3JQaWNrZXJTZXJ2aWNlLmN1cnJlbnRDb2xvciArICcgMThweCwgcmdiKDI1NSwgNzcsIDI1NSkgY2FsYygxMDAlIC0gMThweCknfVwiXG5AQ29tcG9uZW50KHtcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHNlbGVjdG9yOiAnbGliLW5neC10dGl0YW4tY29sb3ItcGlja2VyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2XHJcbiAgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci13cmFwcGVyXCJcclxuPlxyXG5cclxuICA8ZGl2IGNsYXNzPVwicGlja2VyLWlucHV0LXdyYXBwZXJcIj5cclxuICAgIDxkaXZcclxuICAgICAgW25nU3R5bGVdPVwie2JhY2tncm91bmRDb2xvcjogY29sb3J9XCJcclxuICAgICAgY2xhc3M9XCJkZWJ1Zy1vdXRwdXRcIlxyXG4gICAgICAqbmdJZj1cImNvbG9yUGlja2VyU2VydmljZS5kZWJ1Z1wiXHJcbiAgICA+XHJcbiAgICAgIHt7Y29sb3J9fVxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWlucHV0LWxhYmVsXCI+XHJcbiAgICAgIDxsYWJlbCBbZm9yXT1cInV1aWRcIiA+e3t0aXRsZX19PC9sYWJlbD5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cInBpY2tlci1pbnB1dC1ob2xkZXJcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1jb2xvclwiIFtuZ1N0eWxlXT1cIntiYWNrZ3JvdW5kOiBjdXJyZW50Q29sb3JBbHBoYX1cIj5cclxuXHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWlucHV0XCI+XHJcbiAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICBsaWJOZ3hUVGl0YW5Db2xvclBpY2tlcklucHV0XHJcbiAgICAgICAgICAjcGlja2VySW5wdXQ9XCJsaWJOZ3hUVGl0YW5Db2xvclBpY2tlcklucHV0XCJcclxuICAgICAgICAgIChpbnB1dENoYW5nZSk9XCJpbnB1dENvbG9yQ2hhbmdlKCRldmVudClcIlxyXG4gICAgICAgICAgW2Zvcm1hdF09XCJpbnB1dEZvcm1hdFwiXHJcbiAgICAgICAgICBbaWRdPVwidXVpZFwiXHJcbiAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAoZm9jdXMpPVwib3BlblBpY2tlcigpXCJcclxuICAgICAgICAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPCEtLTxkaXYgY2xhc3M9XCJwaWNrZXItc2F2ZS1zaWduXCI+LS0+XHJcbiAgICAgIDwhLS1TLS0+XHJcbiAgICAgIDwhLS08L2Rpdj4tLT5cclxuICAgIDwvZGl2PlxyXG5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJcIiBbbmdDbGFzc109XCJ7J25vLWFscGhhJzogIWFscGhhLCAnb3Blbic6IHBpY2tlck9wZW59XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX01haW5Db2xvclwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0NvbG9yTGF5ZXJcIiBbbmdTdHlsZV09XCJ7YmFja2dyb3VuZENvbG9yOiBjdXJyZW50Q29sb3JNYXh9XCIgPjwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX1NsaWRhYmxlXCIgbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvciAjbWFpbkNvbG9yPVwibGliTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvclwiIChjaGFuZ2UpPVwiY29sb3JQaWNrZXJTZXJ2aWNlLnNhdHVyYXRpb25DaGFuZ2UoJGV2ZW50LCB0aGlzKVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fRHJhZ2dlclwiIGxpYk5neFRUaXRhbkNvbG9yUGlja2VyRHJhZ2dlciBzdHlsZT1cInRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAwcHgsIDBweCk7XCI+PC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0h1ZVBpY2tlclwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX1NsaWRhYmxlXCIgbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvciAjaHVlUGlja2VyPVwibGliTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvclwiIChjaGFuZ2UpPVwiY29sb3JQaWNrZXJTZXJ2aWNlLmh1ZUNoYW5nZSgkZXZlbnQsIHRoaXMpXCIgW2RpcmVjdGlvbl09XCIndmVydGljYWwnXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19EcmFnZ2VyXCIgbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyIFtwaWNrZXJQYWRdPVwiMFwiIHN0eWxlPVwiIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAwcHgsIDBweCk7XCI+PC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0FscGhhUGlja2VyXCIgKm5nSWY9XCJhbHBoYSA9PT0gdHJ1ZVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0NvbG9yTGF5ZXJcIlxyXG5cclxuICAgICAgICAgICBbbmdTdHlsZV09XCJ7YmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCh0byB0b3AsICcgKyBjdXJyZW50Q29sb3JBbHBoYVplcm8gKyAnICAxOHB4LCAnICsgY3VycmVudENvbG9yICsgJyBjYWxjKDEwMCUgLSAxOHB4KSd9XCJcclxuICAgICAgPjwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX1NsaWRhYmxlXCIgbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvciAjYWxwaGFQaWNrZXI9XCJsaWJOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yXCIgKGNoYW5nZSk9XCJjb2xvclBpY2tlclNlcnZpY2UuYWxwaGFDaGFuZ2UoJGV2ZW50LCB0aGlzKVwiIFtkaXJlY3Rpb25dPVwiJ3ZlcnRpY2FsJ1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fRHJhZ2dlclwiIGxpYk5neFRUaXRhbkNvbG9yUGlja2VyRHJhZ2dlciBbcGlja2VyUGFkXT1cIjBcIiBzdHlsZT1cIiB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDBweCwgMHB4LCAwcHgpO1wiPjwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPCEtLTxkaXYgc3R5bGU9XCJoZWlnaHQ6IDQwcHg7IHdpZHRoOiA0MHB4XCIgW25nU3R5bGVdPVwie2JhY2tncm91bmQ6IGN1cnJlbnRDb2xvcn1cIj4tLT5cclxuXHJcbiAgICA8IS0tPC9kaXY+LS0+XHJcbiAgICA8IS0tPGRpdiBzdHlsZT1cImhlaWdodDogNDBweDsgd2lkdGg6IDQwcHhcIiBbbmdTdHlsZV09XCJ7YmFja2dyb3VuZDogY3VycmVudENvbG9yQWxwaGF9XCI+LS0+XHJcblxyXG4gICAgPCEtLTwvZGl2Pi0tPlxyXG4gIDwvZGl2PlxyXG4gIDxsaWItbmd4LXR0aXRhbi1jb2xvci1waWNrZXItcGFsZXR0ZS1saXN0XHJcbiAgICAoY2hhbmdlKT1cImlucHV0Q29sb3JDaGFuZ2UoJGV2ZW50KVwiXHJcbiAgICBbcGFsbGV0c109XCJwaWNrZXJQYWxsZXRzXCJcclxuICA+XHJcblxyXG4gIDwvbGliLW5neC10dGl0YW4tY29sb3ItcGlja2VyLXBhbGV0dGUtbGlzdD5cclxuPC9kaXY+XHJcblxyXG5gLFxuICBzdHlsZXM6IFtgOmhvc3QgKiw6aG9zdCA6YWZ0ZXIsOmhvc3QgOmJlZm9yZXtib3gtc2l6aW5nOmJvcmRlci1ib3h9Omhvc3QgLmRlYnVnLW91dHB1dHt3aWR0aDoxMDAlO2hlaWdodDoyMHB4fTpob3N0IC5waWNrZXItaW5wdXQtd3JhcHBlcnttYXJnaW4tYm90dG9tOjZweH06aG9zdCAucGlja2VyLWlucHV0LXdyYXBwZXIgLnBpY2tlci1pbnB1dC1sYWJlbHttYXJnaW4tYm90dG9tOjZweH06aG9zdCAucGlja2VyLWlucHV0LXdyYXBwZXIgLnBpY2tlci1pbnB1dC1sYWJlbCBsYWJlbHt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7Zm9udC13ZWlnaHQ6NjAwfTpob3N0IC5waWNrZXItaW5wdXQtd3JhcHBlciAucGlja2VyLWlucHV0LWhvbGRlcntkaXNwbGF5OmZsZXg7aGVpZ2h0OjMzcHg7Ym9yZGVyOjFweCBzb2xpZCAjYmJiO292ZXJmbG93OmhpZGRlbjtib3JkZXItcmFkaXVzOjNweDtiYWNrZ3JvdW5kLWNvbG9yOiNlZWV9Omhvc3QgLnBpY2tlci1pbnB1dC13cmFwcGVyIC5waWNrZXItaW5wdXQtaG9sZGVyIC5waWNrZXItY29sb3J7ZmxleDowIDAgMzFweDtiYWNrZ3JvdW5kLWNvbG9yOiNmZjAzMDB9Omhvc3QgLnBpY2tlci1pbnB1dC13cmFwcGVyIC5waWNrZXItaW5wdXQtaG9sZGVyIC5waWNrZXItaW5wdXR7ZmxleDphdXRvO2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnR9Omhvc3QgLnBpY2tlci1pbnB1dC13cmFwcGVyIC5waWNrZXItaW5wdXQtaG9sZGVyIC5waWNrZXItaW5wdXQgaW5wdXR7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtjb2xvcjojMjcyNzI3O2ZvbnQtZmFtaWx5Om1vbm9zcGFjZTtmb250LXNpemU6MTRweDtib3JkZXI6bm9uZTtvdXRsaW5lOjA7cGFkZGluZzo4cHggMnB4IDhweCA4cHg7d2lkdGg6MTAwJX06aG9zdCAucGlja2VyLWlucHV0LXdyYXBwZXIgLnBpY2tlci1pbnB1dC1ob2xkZXIgLnBpY2tlci1zYXZlLXNpZ257ZmxleDowIDAgMzFweDtsaW5lLWhlaWdodDozM3B4O3RleHQtYWxpZ246Y2VudGVyfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcnttYXgtaGVpZ2h0OjA7b3ZlcmZsb3c6aGlkZGVuOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZTtkaXNwbGF5OmZsZXg7dHJhbnNpdGlvbjptYXgtaGVpZ2h0IC4zc306aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXIub3BlbnttYXJnaW4tYm90dG9tOjVweDttYXgtaGVpZ2h0OjE2NXB4fTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fQ29sb3JMYXllcntwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjEwO3RvcDowO2xlZnQ6MDtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO2JveC1zaGFkb3c6aW5zZXQgMCAwIDJweCAwIHJnYmEoMCwwLDAsLjUpO3BvaW50ZXItZXZlbnRzOm5vbmV9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19TbGlkYWJsZXtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO2N1cnNvcjpwb2ludGVyfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fRHJhZ2dlcntwb3NpdGlvbjpyZWxhdGl2ZTt6LWluZGV4OjMwO2JvdHRvbTouOXJlbTstd2Via2l0LXRyYW5zZm9ybTpub25lO3RyYW5zZm9ybTpub25lO2hlaWdodDoxOHB4O3dpZHRoOjE4cHg7bWFyZ2luOjAgYXV0bzstd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuO2JhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuO3dpbGwtY2hhbmdlOnRyYW5zZm9ybTtiYWNrZ3JvdW5kOjAgMDtib3JkZXI6M3B4IHNvbGlkICNmZmY7Ym94LXNoYWRvdzowIDAgMCAxcHggcmdiYSg2LDQ0LDgyLC4xKSwwIDJweCAxNnB4IHJnYmEoMzMsNDMsNTQsLjA4KSxpbnNldCAwIDAgMCAxcHggcmdiYSg2LDQ0LDgyLC4xKSwwIDJweCAxNnB4IHJnYmEoMzMsNDMsNTQsLjA4KTtib3JkZXItcmFkaXVzOjUwJTtwb2ludGVyLWV2ZW50czpub25lO3RvdWNoLWFjdGlvbjpub25lfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fTWFpbkNvbG9ye2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KDQ1ZGVnLCNkZmUzZTggMjUlLHRyYW5zcGFyZW50IDApLGxpbmVhci1ncmFkaWVudCgtNDVkZWcsI2RmZTNlOCAyNSUsdHJhbnNwYXJlbnQgMCksbGluZWFyLWdyYWRpZW50KDQ1ZGVnLHRyYW5zcGFyZW50IDc1JSwjZGZlM2U4IDApLGxpbmVhci1ncmFkaWVudCgtNDVkZWcsdHJhbnNwYXJlbnQgNzUlLCNkZmUzZTggMCk7YmFja2dyb3VuZC1zaXplOjEuNnJlbSAxLjZyZW07YmFja2dyb3VuZC1wb3NpdGlvbjowIDAsMCAuOHJlbSwuOHJlbSAtLjhyZW0sLS44cmVtIDA7cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6aGlkZGVuO3dpZHRoOjE2NXB4O2hlaWdodDoxNjVweDtib3JkZXItcmFkaXVzOjRweDtjdXJzb3I6cG9pbnRlcn06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX01haW5Db2xvciAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0NvbG9yTGF5ZXJ7Ym94LXNoYWRvdzppbnNldCAwIDAgMCAxcHggcmdiYSg2LDQ0LDgyLC4xKSwwIDJweCAxNnB4IHJnYmEoMzMsNDMsNTQsLjA4KTtib3JkZXItcmFkaXVzOjRweH06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX01haW5Db2xvciAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0RyYWdnZXJ7cmlnaHQ6LjlyZW07bWFyZ2luOjB9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19NYWluQ29sb3I6YWZ0ZXIsOmhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19NYWluQ29sb3I6YmVmb3Jle2NvbnRlbnQ6XCJcIjtwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjIwO3RvcDowO2xlZnQ6MDtkaXNwbGF5OmJsb2NrO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7cG9pbnRlci1ldmVudHM6bm9uZTtib3JkZXItcmFkaXVzOjNweH06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX01haW5Db2xvcjpiZWZvcmV7YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoOTBkZWcsI2ZmZix0cmFuc3BhcmVudCl9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19NYWluQ29sb3I6YWZ0ZXJ7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQoMGRlZywjMDAwLHRyYW5zcGFyZW50KTtib3gtc2hhZG93Omluc2V0IDAgMCAwIDFweCByZ2JhKDYsNDQsODIsLjEpLDAgMnB4IDE2cHggcmdiYSgzMyw0Myw1NCwuMDgpfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fQWxwaGFQaWNrZXIsOmhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19IdWVQaWNrZXJ7cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6aGlkZGVuO2hlaWdodDoxNjVweDt3aWR0aDoyNHB4O21hcmdpbi1sZWZ0Oi44cmVtO2JvcmRlci13aWR0aDozcHg7Ym9yZGVyLXJhZGl1czo4cmVtO3BhZGRpbmc6MTNweCAwfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fSHVlUGlja2Vye2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSxyZWQgMCwjZmYwIDIxJSwjMGYwIDMzJSwjMGZmIDUwJSwjMDBmIDY3JSwjZjBmIDgzJSxyZWQgMTAwJSk7Ym94LXNoYWRvdzppbnNldCAwIDAgMnB4IDAgcmdiYSgwLDAsMCwuNSl9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19BbHBoYVBpY2tlcntiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudCg0NWRlZywjZGZlM2U4IDI1JSx0cmFuc3BhcmVudCAwKSxsaW5lYXItZ3JhZGllbnQoLTQ1ZGVnLCNkZmUzZTggMjUlLHRyYW5zcGFyZW50IDApLGxpbmVhci1ncmFkaWVudCg0NWRlZyx0cmFuc3BhcmVudCA3NSUsI2RmZTNlOCAwKSxsaW5lYXItZ3JhZGllbnQoLTQ1ZGVnLHRyYW5zcGFyZW50IDc1JSwjZGZlM2U4IDApO2JhY2tncm91bmQtc2l6ZToxLjZyZW0gMS42cmVtO2JhY2tncm91bmQtcG9zaXRpb246MCAwLDAgLjhyZW0sLjhyZW0gLS44cmVtLC0uOHJlbSAwfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fQWxwaGFQaWNrZXIgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19Db2xvckxheWVye2JvcmRlci1yYWRpdXM6OHJlbX06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXIubm8tYWxwaGEgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19NYWluQ29sb3J7d2lkdGg6MjAwcHh9YF0sXG59KVxuZXhwb3J0IGNsYXNzIE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pIGNvbXBvbmVudENsaWNrKCRldmVudCkge1xuICAgIGlmKCF0aGlzLnBpY2tlck9wZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYodHlwZW9mICRldmVudC5wYXRoICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBsZXQgcGlja2VyRm91bmQgPSBmYWxzZTtcbiAgICAgICRldmVudC5wYXRoLmV2ZXJ5KGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgaWYoXG4gICAgICAgICAgdHlwZW9mIGl0ZW0uY2xhc3NMaXN0ICE9PSBcInVuZGVmaW5lZFwiXG4gICAgICAgICkge1xuICAgICAgICAgIGlmKFxuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ3BpY2tlci1pbnB1dC1ob2xkZXInKSB8fFxuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ25neC10dGl0YW4tY29sb3ItcGlja2VyJylcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHBpY2tlckZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0pO1xuXG4gICAgICBpZighcGlja2VyRm91bmQpIHtcbiAgICAgICAgdGhpcy5jbG9zZVBpY2tlcigpO1xuICAgICAgfVxuXG4gICAgfVxuICB9XG5cbiAgQElucHV0KCdhbHBoYScpIHB1YmxpYyBhbHBoYTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoJ2RlYnVnJykgcHVibGljIGRlYnVnOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgnY29sb3InKSBwdWJsaWMgY29sb3I6IHN0cmluZyA9ICdyZ2JhKDI1NSwyNTUsMjU1LDApJztcbiAgQElucHV0KCd0aXRsZScpIHB1YmxpYyB0aXRsZTogc3RyaW5nID0gJ3RpdGxlJztcbiAgQElucHV0KCdvdXRGb3JtYXQnKSBwdWJsaWMgb3V0Rm9ybWF0OiBzdHJpbmcgPSAnaGV4Nic7XG4gIEBJbnB1dCgnaW5wdXRGb3JtYXQnKSBwdWJsaWMgaW5wdXRGb3JtYXQ6IHN0cmluZyA9ICdoZXg2JztcbiAgQElucHV0KCdhdmFpbFBhbGxldHMnKSBwdWJsaWMgYXZhaWxQYWxsZXRzOiBBcnJheTxzdHJpbmc+ID0gWydwb2xhcmlzJywgJ21hdGVyaWFsJ107XG4gIEBJbnB1dCgnY3VzdG9tUGFsbGV0cycpIHB1YmxpYyBjdXN0b21QYWxsZXRzOiAgQXJyYXk8UGFsZXR0ZT4gPSBbXTtcbiAgQE91dHB1dCgnY29sb3JDaGFuZ2VkJykgcHVibGljIGNvbG9yQ2hhbmdlZDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBAVmlld0NoaWxkKCdwaWNrZXJJbnB1dCcpIHB1YmxpYyBwaWNrZXJJbnB1dDogTmd4VFRpdGFuQ29sb3JQaWNrZXJJbnB1dERpcmVjdGl2ZTtcblxuICBAVmlld0NoaWxkKE5neFRUaXRhbkNvbG9yUGlja2VyUGFsZXR0ZUxpc3RDb21wb25lbnQpIHB1YmxpYyBwYWxldHRlTGlzdDogTmd4VFRpdGFuQ29sb3JQaWNrZXJQYWxldHRlTGlzdENvbXBvbmVudDtcblxuICBAVmlld0NoaWxkKCdtYWluQ29sb3InKSBwdWJsaWMgbWFpbkNvbG9yOiBOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yRGlyZWN0aXZlID0gbnVsbDtcbiAgQFZpZXdDaGlsZCgnaHVlUGlja2VyJykgcHVibGljIGh1ZVBpY2tlcjogTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvckRpcmVjdGl2ZTtcbiAgQFZpZXdDaGlsZCgnYWxwaGFQaWNrZXInKSBwdWJsaWMgYWxwaGFQaWNrZXI6IE5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JEaXJlY3RpdmU7XG5cbiAgcHVibGljIGNvbG9ySW5pdDogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgcGlja2VyT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHB1YmxpYyBwaWNrZXJQYWxsZXRzOiBBcnJheTxQYWxldHRlPiA9IFtdO1xuXG4gIHB1YmxpYyBoc3ZhOiBIU1ZBID0ge1xuICAgIGh1ZTogMCxcbiAgICBzYXR1cmF0aW9uOiAxMDAsXG4gICAgdmFsdWU6IDEwMCxcbiAgICBhbHBoYTogMVxuICB9O1xuXG4gIHB1YmxpYyBjdXJyZW50Q29sb3I6IHN0cmluZyA9ICdyZ2IoMjU1LDAsMCknO1xuICBwdWJsaWMgY3VycmVudENvbG9yTWF4OiBzdHJpbmcgPSAncmdiYSgyNTUsMCwwLDEpJztcbiAgcHVibGljIGN1cnJlbnRDb2xvckFscGhhOiBzdHJpbmcgPSAncmdiYSgyNTUsMCwwLDEpJztcbiAgcHVibGljIGN1cnJlbnRDb2xvckFscGhhWmVybzogc3RyaW5nID0gJ3JnYmEoMjU1LDAsMCwwKSc7XG5cbiAgcHVibGljIHV1aWQ6IHN0cmluZyA9ICdwaWNrZXItJztcblxuICBwdWJsaWMgYWxsb3dlZEZvcm1hdHM6IEFycmF5PHN0cmluZz4gPSBbJ2hleDYnLCAnaGV4OCcsICdyZ2InLCAncmdiYSddO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBjb2xvclBpY2tlclNlcnZpY2U6IE5neFRUaXRhbkNvbG9yUGlja2VyU2VydmljZSxcbiAgICBwdWJsaWMgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHtcbiAgICB0aGlzLnV1aWQgPSB0aGlzLmNvbG9yUGlja2VyU2VydmljZS5nZXRQaWNrZXJVdWlkKCk7XG5cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY29sb3JQaWNrZXJTZXJ2aWNlLmRlYnVnID0gdGhpcy5kZWJ1ZztcbiAgICB0aGlzLnZhbGlkYXRlSW5wdXRQYXJhbXMoKTtcbiAgICB0aGlzLmNvbG9yUGlja2VyU2VydmljZS5wcmVwYXJlUGlja2VyUGFsbGV0cyh0aGlzLmF2YWlsUGFsbGV0cywgdGhpcy5jdXN0b21QYWxsZXRzLCB0aGlzKTtcbiAgICB0aGlzLmNvbG9yUGlja2VyU2VydmljZS5jb2xvclRvRGF0YSh0aGlzLmNvbG9yLCB0aGlzKTtcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnNldERyYWdnZXNUb0N1cnJlbnRDb2xvcigpO1xuICB9XG5cbiAgb3BlblBpY2tlcigpIHtcbiAgICB0aGlzLnBpY2tlck9wZW4gPSB0cnVlO1xuICAgIGlmKHR5cGVvZiB0aGlzLnBhbGV0dGVMaXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5wYWxldHRlTGlzdC5jbG9zZVBhbGV0dGUoKTtcbiAgICB9XG4gIH1cblxuICBjbG9zZVBpY2tlcigpIHtcbiAgICB0aGlzLnBpY2tlck9wZW4gPSBmYWxzZTtcbiAgfVxuXG4gIHZhbGlkYXRlSW5wdXRQYXJhbXMoKSB7XG4gICAgaWYodGhpcy5hbGxvd2VkRm9ybWF0cy5pbmRleE9mKHRoaXMub3V0Rm9ybWF0KSA9PT0gLTEpIHtcbiAgICAgIHRoaXMub3V0Rm9ybWF0ID0gJ2hleDYnO1xuICAgICAgY29uc29sZS5ncm91cChcIm5neC10dGl0YW4tY29sb3ItcGlja2VyXCIpO1xuICAgICAgY29uc29sZS53YXJuKCdbb3V0Rm9ybWF0XSBtdXN0IGJlIG9uZSBvZiB0aGlzICgnICsgdGhpcy5hbGxvd2VkRm9ybWF0cy5qb2luKCcsJykgKyAnKScpO1xuICAgICAgY29uc29sZS5ncm91cEVuZCgpO1xuICAgIH1cbiAgICBpZih0aGlzLmFsbG93ZWRGb3JtYXRzLmluZGV4T2YodGhpcy5pbnB1dEZvcm1hdCkgPT09IC0xKSB7XG4gICAgICB0aGlzLmlucHV0Rm9ybWF0ID0gdGhpcy5vdXRGb3JtYXQgKyAnJztcbiAgICAgIGNvbnNvbGUuZ3JvdXAoXCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlclwiKTtcbiAgICAgIGNvbnNvbGUud2FybignW2lucHV0Rm9ybWF0XSBtdXN0IGJlIG9uZSBvZiB0aGlzICgnICsgdGhpcy5hbGxvd2VkRm9ybWF0cy5qb2luKCcsJykgKyAnKScpO1xuICAgICAgY29uc29sZS5ncm91cEVuZCgpO1xuICAgIH1cbiAgfVxuXG5cbiAgaW5wdXRDb2xvckNoYW5nZShjb2xvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgIHRoaXMuY29sb3JQaWNrZXJTZXJ2aWNlLmNvbG9yVG9EYXRhKHRoaXMuY29sb3IsIHRoaXMpO1xuICAgIHRoaXMuc2V0RHJhZ2dlc1RvQ3VycmVudENvbG9yKCk7XG4gIH1cblxuICB1cGRhdGVSZXR1cm5Db2xvcigpIHtcbiAgICB0aGlzLmNvbG9yID0gdGhpcy5jb2xvclBpY2tlclNlcnZpY2UucHJlcGFyZVJldHVybkNvbG9yKHRoaXMuaHN2YSwgdGhpcy5vdXRGb3JtYXQpO1xuXG4gICAgaWYodGhpcy5jb2xvckluaXQpIHtcbiAgICAgIHRoaXMuY29sb3JDaGFuZ2VkLmVtaXQodGhpcy5jb2xvciArICcnKTtcbiAgICB9XG4gICAgdGhpcy5jb2xvckluaXQgPSB0cnVlO1xuICB9XG5cblxuICBzZXRJbnB1dFZhbHVlKCkge1xuICAgIGlmKHR5cGVvZiB0aGlzLnBpY2tlcklucHV0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5waWNrZXJJbnB1dC5zZXRJbnB1dFZhbHVlKFxuICAgICAgICB0aGlzLmNvbG9yUGlja2VyU2VydmljZS5wcmVwYXJlUmV0dXJuQ29sb3IodGhpcy5oc3ZhLCB0aGlzLmlucHV0Rm9ybWF0KVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBzZXREcmFnZ2VzVG9DdXJyZW50Q29sb3IoKSB7XG5cbiAgICBpZih0aGlzLm1haW5Db2xvciAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5tYWluQ29sb3Iuc2V0RHJhZ2dlcihcbiAgICAgICAge1xuICAgICAgICAgIHg6IHRoaXMuaHN2YS5zYXR1cmF0aW9uLFxuICAgICAgICAgIHk6IDEwMCAtIHRoaXMuaHN2YS52YWx1ZVxuICAgICAgICB9XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmKHR5cGVvZiB0aGlzLmh1ZVBpY2tlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMuaHVlUGlja2VyLnNldERyYWdnZXIoe3g6IDAsIHk6IE1hdGgucm91bmQodGhpcy5oc3ZhLmh1ZSAqIDEwMCAvIDM2MCl9KTtcbiAgICB9XG5cbiAgICBpZih0eXBlb2YgdGhpcy5hbHBoYVBpY2tlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5hbHBoYSkge1xuICAgICAgdGhpcy5hbHBoYVBpY2tlci5zZXREcmFnZ2VyKHt4OiAwLCB5OiAxMDAgLSAodGhpcy5oc3ZhLmFscGhhICogMTAwKX0pO1xuICAgIH1cblxuICB9XG5cbn1cbiIsImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyXSdcbn0pXG5leHBvcnQgY2xhc3MgTmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyRGlyZWN0aXZlIHtcblxuICBASW5wdXQoJ3BpY2tlclBhZCcpIHB1YmxpYyBwaWNrZXJQYWQ6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsUmVmOiBFbGVtZW50UmVmKSB7IH1cblxuXG4gIHB1YmxpYyBzZXRQb3NpdGlvbih4OiBudW1iZXIsIHk6IG51bWJlciwgZGlyZWN0aW9uOiBzdHJpbmcpOiB2b2lkIHtcblxuICAgIGxldCByZWN0ID0gdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgaWYoZGlyZWN0aW9uID09ICd2ZXJ0aWNhbCcgfHwgZGlyZWN0aW9uID09ICdib3RoJykge1xuICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LnN0eWxlLnRvcCA9IE1hdGgucm91bmQoKHkgLSAoKHJlY3QuaGVpZ2h0KSAvIDIpKSkgKyAncHgnO1xuICAgIH1cbiAgICBpZihkaXJlY3Rpb24gPT0gJ2hvcml6b250YWwnIHx8IGRpcmVjdGlvbiA9PSAnYm90aCcpIHtcbiAgICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gTWF0aC5yb3VuZCgoeCAtICgocmVjdC53aWR0aCkgLyAyKSkpICsgJ3B4JztcbiAgICB9XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQge1xuICBDb250ZW50Q2hpbGQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Tmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyRGlyZWN0aXZlfSBmcm9tIFwiLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1kcmFnZ2VyLmRpcmVjdGl2ZVwiO1xuLy8gaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24sIG9mfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtmcm9tRXZlbnQsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge05neFRUaXRhbkNvbG9yUGlja2VyU2VydmljZX0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuc2VydmljZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEN1c3RvbVJlY3Qge1xuICBoZWlnaHQ6IG51bWJlcixcbiAgbGVmdDogbnVtYmVyLFxuICB0b3A6IG51bWJlcixcbiAgd2lkdGg6IG51bWJlclxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEN1c3RvbVBlcmNlbnQge1xuICB4OiBudW1iZXIsXG4gIHk6IG51bWJlcixcbn1cblxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3Rvcl0nLFxuICBleHBvcnRBczogJ2xpYk5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3InXG59KVxuZXhwb3J0IGNsYXNzIE5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3l7XG5cbiAgQElucHV0KCdkaXJlY3Rpb24nKSBwdWJsaWMgZGlyZWN0aW9uOiBzdHJpbmcgPSAnYm90aCc7XG5cbiAgQENvbnRlbnRDaGlsZChOZ3hUVGl0YW5Db2xvclBpY2tlckRyYWdnZXJEaXJlY3RpdmUpIHB1YmxpYyBkcmFnZ2VyOiBOZ3hUVGl0YW5Db2xvclBpY2tlckRyYWdnZXJEaXJlY3RpdmUgPSBudWxsO1xuXG4gIEBPdXRwdXQoJ2NoYW5nZScpIHB1YmxpYyBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxDdXN0b21QZXJjZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Q3VzdG9tUGVyY2VudD4oKTtcblxuICBwdWJsaWMgZWw6IEhUTUxFbGVtZW50ID0gbnVsbDtcbiAgcHVibGljIGRyYWdTdGFydDogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgZ2xvYmFsTW91c2VNb3ZlOiBTdWJzY3JpcHRpb24gPSBudWxsO1xuICBwdWJsaWMgZ2xvYmFsTW91c2VVcDogU3Vic2NyaXB0aW9uID0gbnVsbDtcblxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicsIFsnJGV2ZW50J10pIHB1YmxpYyBvbk1vdXNlRG93bigkZXZlbnQpIHtcbiAgICB0aGlzLmRyYWdTdGFydCA9IHRydWU7XG4gICAgdGhpcy5nZXRQb3NpdGlvbigkZXZlbnQpO1xuICB9XG5cblxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBlbFJlZjogRWxlbWVudFJlZixcbiAgICBwdWJsaWMgY29sb3JQaWNrZXJTZXJ2aWNlOiBOZ3hUVGl0YW5Db2xvclBpY2tlclNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5lbCA9IHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmRpcmVjdGlvbiA9IChbJ2JvdGgnLCAndmVydGljYWwnLCAnaG9yaXpvbnRhbCddLmluZGV4T2YodGhpcy5kaXJlY3Rpb24pID09PSAtMSkgPyAnYm90aCcgOiB0aGlzLmRpcmVjdGlvbjtcbiAgICAvLyB0aGlzLmdsb2JhbE1vdXNlTW92ZSA9IGZyb21FdmVudCh3aW5kb3csICdtb3VzZW1vdmUnKS5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgLy8gICBpZih0aGlzLmRyYWdTdGFydCkge1xuICAgIC8vICAgICB0aGlzLmdldFBvc2l0aW9uKDxNb3VzZUV2ZW50PmV2ZW50KTtcbiAgICAvLyAgIH1cbiAgICAvLyB9KTtcbiAgICAvLyB0aGlzLmdsb2JhbE1vdXNlVXAgPSBmcm9tRXZlbnQod2luZG93LCAnbW91c2V1cCcpLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAvLyAgIGlmKHRoaXMuZHJhZ1N0YXJ0KSB7XG4gICAgLy8gICAgIHRoaXMuZHJhZ1N0YXJ0ID0gZmFsc2U7XG4gICAgLy8gICAgIHRoaXMuZ2V0UG9zaXRpb24oPE1vdXNlRXZlbnQ+ZXZlbnQpO1xuICAgIC8vICAgfVxuICAgIC8vIH0pO1xuXG4gICAgdGhpcy5nbG9iYWxNb3VzZU1vdmUgPSB0aGlzLmNvbG9yUGlja2VyU2VydmljZS5tb3VzZU1vdmVPYnNlcnZhYmxlLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgIGlmKHRoaXMuZHJhZ1N0YXJ0KSB7XG4gICAgICAgIHRoaXMuZ2V0UG9zaXRpb24oPE1vdXNlRXZlbnQ+ZXZlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuZ2xvYmFsTW91c2VVcCA9IHRoaXMuY29sb3JQaWNrZXJTZXJ2aWNlLm1vdXNlVXBPYnNlcnZhYmxlLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgIGlmKHRoaXMuZHJhZ1N0YXJ0KSB7XG4gICAgICAgIHRoaXMuZHJhZ1N0YXJ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZ2V0UG9zaXRpb24oPE1vdXNlRXZlbnQ+ZXZlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZih0aGlzLmdsb2JhbE1vdXNlTW92ZSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5nbG9iYWxNb3VzZU1vdmUudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYodGhpcy5nbG9iYWxNb3VzZVVwICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmdsb2JhbE1vdXNlVXAudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0RHJhZ2dlcihwZXJzZW50OiBDdXN0b21QZXJjZW50KSB7XG4gICAgaWYodGhpcy5kcmFnZ2VyID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBwb3NpdGlvbjogQ3VzdG9tUmVjdCA9IHRoaXMuZ2V0UmVjdCh0aGlzLmVsKTtcbiAgICBsZXQgeCA9IE1hdGgucm91bmQoKChwb3NpdGlvbi53aWR0aCAtIHRoaXMuZHJhZ2dlci5waWNrZXJQYWQgKiAyKSAqIHBlcnNlbnQueCAvIDEwMCkpO1xuICAgIGxldCB5ID0gTWF0aC5yb3VuZCgoKHBvc2l0aW9uLmhlaWdodCAtIHRoaXMuZHJhZ2dlci5waWNrZXJQYWQgKiAyKSAqIHBlcnNlbnQueSAvIDEwMCkpO1xuICAgIHRoaXMuZHJhZ2dlci5zZXRQb3NpdGlvbihcbiAgICAgICh4ID4gdGhpcy5kcmFnZ2VyLnBpY2tlclBhZCkgPyB4IDogdGhpcy5kcmFnZ2VyLnBpY2tlclBhZCxcbiAgICAgICh5ID4gdGhpcy5kcmFnZ2VyLnBpY2tlclBhZCkgPyB5IDogdGhpcy5kcmFnZ2VyLnBpY2tlclBhZCxcbiAgICAgIHRoaXMuZGlyZWN0aW9uXG4gICAgKTtcblxuICB9XG5cbiAgcHVibGljIGdldFBvc2l0aW9uKCRldmVudDogTW91c2VFdmVudCkge1xuICAgIGxldCBjdXJzb3JZID0gJGV2ZW50LnBhZ2VZO1xuICAgIGxldCBjdXJzb3JYID0gJGV2ZW50LnBhZ2VYO1xuICAgIGxldCBwb3NpdGlvbjogQ3VzdG9tUmVjdCA9IHRoaXMuZ2V0UmVjdCh0aGlzLmVsKTtcbiAgICBsZXQgcGVyY2VudDogQ3VzdG9tUGVyY2VudCA9IHt4OiAwLCB5OiAwfTtcbiAgICBpZih0aGlzLmRpcmVjdGlvbiA9PSAndmVydGljYWwnIHx8IHRoaXMuZGlyZWN0aW9uID09ICdib3RoJykge1xuICAgICAgcGVyY2VudC55ID0gTWF0aC5yb3VuZCgoY3Vyc29yWSAtIChwb3NpdGlvbi50b3ApKSAqIDEwMCAvIChwb3NpdGlvbi5oZWlnaHQgLSB0aGlzLmRyYWdnZXIucGlja2VyUGFkICogMikpO1xuICAgICAgaWYocGVyY2VudC55IDwgMCkge1xuICAgICAgICBwZXJjZW50LnkgPSAwXG4gICAgICB9IGVsc2UgaWYocGVyY2VudC55ID4gMTAwKSB7XG4gICAgICAgIHBlcmNlbnQueSA9IDEwMDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYodGhpcy5kaXJlY3Rpb24gPT0gJ2hvcml6b250YWwnIHx8IHRoaXMuZGlyZWN0aW9uID09ICdib3RoJykge1xuICAgICAgcGVyY2VudC54ID0gTWF0aC5yb3VuZCgoY3Vyc29yWCAtIChwb3NpdGlvbi5sZWZ0KSkgKiAxMDAgLyAocG9zaXRpb24ud2lkdGggLSB0aGlzLmRyYWdnZXIucGlja2VyUGFkICogMikpO1xuICAgICAgaWYocGVyY2VudC54IDwgMCkge1xuICAgICAgICBwZXJjZW50LnggPSAwXG4gICAgICB9IGVsc2UgaWYocGVyY2VudC54ID4gMTAwKSB7XG4gICAgICAgIHBlcmNlbnQueCA9IDEwMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNldERyYWdnZXIocGVyY2VudCk7XG4gICAgdGhpcy5jaGFuZ2UuZW1pdChwZXJjZW50KTtcblxuICB9XG5cblxuXG4gIHB1YmxpYyBnZXRSZWN0KGVsZW06IEhUTUxFbGVtZW50KTogQ3VzdG9tUmVjdCB7XG5cbiAgICBsZXQgYm94ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBsZXQgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgbGV0IGRvY0VsID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgIGxldCBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jRWwuc2Nyb2xsVG9wIHx8IGJvZHkuc2Nyb2xsVG9wO1xuICAgIGxldCBzY3JvbGxMZWZ0ID0gd2luZG93LnBhZ2VYT2Zmc2V0IHx8IGRvY0VsLnNjcm9sbExlZnQgfHwgYm9keS5zY3JvbGxMZWZ0O1xuICAgIGxldCBjbGllbnRUb3AgPSBkb2NFbC5jbGllbnRUb3AgfHwgYm9keS5jbGllbnRUb3AgfHwgMDtcbiAgICBsZXQgY2xpZW50TGVmdCA9IGRvY0VsLmNsaWVudExlZnQgfHwgYm9keS5jbGllbnRMZWZ0IHx8IDA7XG5cbiAgICByZXR1cm4ge1xuICAgICAgaGVpZ2h0OiBib3guaGVpZ2h0LFxuICAgICAgbGVmdDogYm94LmxlZnQgKyBzY3JvbGxMZWZ0IC0gY2xpZW50TGVmdCxcbiAgICAgIHRvcDogYm94LnRvcCArIHNjcm9sbFRvcCAtIGNsaWVudFRvcCxcbiAgICAgIHdpZHRoOiBib3gud2lkdGgsXG4gICAgfTtcbiAgfVxuXG5cblxufVxuIiwiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Tmd4VFRpdGFuQ29sb3JQaWNrZXJTZXJ2aWNlfSBmcm9tIFwiLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci5zZXJ2aWNlXCI7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tsaWJOZ3hUVGl0YW5Db2xvclBpY2tlcklucHV0XScsXG4gIGV4cG9ydEFzOiAnbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJJbnB1dCdcbn0pXG5leHBvcnQgY2xhc3MgTmd4VFRpdGFuQ29sb3JQaWNrZXJJbnB1dERpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCdmb3JtYXQnKSBmb3JtYXQ6IHN0cmluZyA9ICdoZXg2JztcbiAgQE91dHB1dCgnaW5wdXRDaGFuZ2UnKSBwdWJsaWMgaW5wdXRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cblxuICBASG9zdExpc3RlbmVyKCdrZXl1cCcpIGtleVVwKCkge1xuICAgIHRoaXMuaW5wdXRWYWxpZGF0ZSgpO1xuICB9XG4gIEBIb3N0TGlzdGVuZXIoJ2NoYW5nZScpIGNoYW5nZSgpIHtcbiAgICB0aGlzLmlucHV0VmFsaWRhdGUoKTtcbiAgfVxuXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsOiBFbGVtZW50UmVmLFxuICAgIHB1YmxpYyBjb2xvclBpY2tlclNlcnZpY2U6IE5neFRUaXRhbkNvbG9yUGlja2VyU2VydmljZVxuICApIHsgfVxuXG5cbiAgc2V0SW5wdXRWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgKDxIVE1MSW5wdXRFbGVtZW50PnRoaXMuZWwubmF0aXZlRWxlbWVudCkudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG5cbiAgaW5wdXRWYWxpZGF0ZSgpIHtcbiAgICBsZXQgcmVzID0gdGhpcy5jb2xvclBpY2tlclNlcnZpY2UudmFsaWRhdGVDb2xvckZvcm1hdChcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC52YWx1ZSxcbiAgICAgIHRoaXMuZm9ybWF0XG4gICAgKTtcblxuICAgIGlmKHJlcyAhPT0gJ25vdFZhbGlkJykge1xuICAgICAgKDxIVE1MSW5wdXRFbGVtZW50PnRoaXMuZWwubmF0aXZlRWxlbWVudCkudmFsdWUgPSByZXM7XG4gICAgICB0aGlzLmlucHV0Q2hhbmdlLmVtaXQocmVzKTtcbiAgICB9XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL25neC10dGl0YW4tY29sb3ItcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yRGlyZWN0aXZlIH0gZnJvbSAnLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1zZWxlY3Rvci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyRGlyZWN0aXZlIH0gZnJvbSAnLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1kcmFnZ2VyLmRpcmVjdGl2ZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgTmd4VFRpdGFuQ29sb3JQaWNrZXJJbnB1dERpcmVjdGl2ZSB9IGZyb20gJy4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXItaW5wdXQuZGlyZWN0aXZlJztcbmltcG9ydCB7IE5neFRUaXRhbkNvbG9yUGlja2VyUGFsZXR0ZUxpc3RDb21wb25lbnQgfSBmcm9tICcuL25neC10dGl0YW4tY29sb3ItcGlja2VyLXBhbGV0dGUtbGlzdC9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1wYWxldHRlLWxpc3QuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCxcbiAgICBOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yRGlyZWN0aXZlLFxuICAgIE5neFRUaXRhbkNvbG9yUGlja2VyRHJhZ2dlckRpcmVjdGl2ZSxcbiAgICBOZ3hUVGl0YW5Db2xvclBpY2tlcklucHV0RGlyZWN0aXZlLFxuICAgIE5neFRUaXRhbkNvbG9yUGlja2VyUGFsZXR0ZUxpc3RDb21wb25lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4VFRpdGFuQ29sb3JQaWNrZXJNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsiZnJvbUV2ZW50IiwiSW5qZWN0YWJsZSIsIkV2ZW50RW1pdHRlciIsIkNvbXBvbmVudCIsIklucHV0IiwiT3V0cHV0IiwiQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kiLCJDaGFuZ2VEZXRlY3RvclJlZiIsIkhvc3RMaXN0ZW5lciIsIlZpZXdDaGlsZCIsIkRpcmVjdGl2ZSIsIkVsZW1lbnRSZWYiLCJDb250ZW50Q2hpbGQiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7UUFpQ0U7eUJBVHdCLEtBQUs7OEJBQ00sRUFBRTsyQkFDSixFQUFFO3lEQUUwQ0EsZUFBUyxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUM7dURB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RSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7d0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO3dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUzt3QkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7d0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO3dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUzt3QkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7d0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO3dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUzt3QkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7d0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO3dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUzt3QkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7d0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNB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