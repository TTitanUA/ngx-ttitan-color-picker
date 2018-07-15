(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-ttitan-color-picker', ['exports', '@angular/core', 'rxjs', '@angular/common'], factory) :
    (factory((global['ngx-ttitan-color-picker'] = {}),global.ng.core,global.rxjs,global.ng.common));
}(this, (function (exports,core,rxjs,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NgxTTitanColorPickerService = (function () {
        // public mouseMoveObservable: Observable<MouseEvent> = <Observable<MouseEvent>>fromEvent(document, 'mousemove');
        // public mouseUpObservable: Observable<MouseEvent> = <Observable<MouseEvent>>fromEvent(document, 'mouseup');
        // public mouseMoveObservable: EventEmitter<MouseEvent> = new EventEmitter();
        // public mouseUpObservable: EventEmitter<MouseEvent> = new EventEmitter();
        function NgxTTitanColorPickerService() {
            this.debug = false;
            this.pickerList = [];
            this.pallets = [];
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
                        styles: [":host .picker-palette-wrapper .palette-links{display:flex;flex-wrap:wrap;margin-bottom:5px}:host .picker-palette-wrapper .palette-links .palette-link{margin-right:5px;border-radius:3px;padding:2px 4px;border:1px solid #ddd;text-transform:uppercase;font-size:10px;font-family:-apple-system,BlinkMacSystemFont,San Francisco,Roboto,Segoe UI,Helvetica Neue,sans-serif;font-weight:600;background-color:#fff;cursor:pointer}:host .picker-palette-wrapper .palette-links .palette-link.selected{background-color:#5e6bc5;color:#fff}:host .picker-palette-wrapper .palette-picker-holder{height:165px;display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:flex-start;align-content:baseline}:host .picker-palette-wrapper .palette-picker-holder .palette-color{cursor:pointer;width:10px;height:10px}"]
                    },] },
        ];
        /** @nocollapse */
        NgxTTitanColorPickerPaletteListComponent.ctorParameters = function () { return []; };
        NgxTTitanColorPickerPaletteListComponent.propDecorators = {
            pallets: [{ type: core.Input, args: ['pallets',] }],
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
            this.alpha = false;
            this.debug = false;
            this.color = 'rgba(255,255,255,0)';
            this.title = 'title';
            this.outFormat = 'hex6';
            this.inputFormat = 'hex6';
            this.availPallets = ['polaris', 'material'];
            this.customPallets = [];
            this.colorChanged = new core.EventEmitter();
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
                if (typeof this.mainColor !== 'undefined') {
                    this.mainColor.eventsSubscibe();
                }
                if (typeof this.huePicker !== 'undefined') {
                    this.huePicker.eventsSubscibe();
                }
                if (typeof this.alphaPicker !== 'undefined') {
                    this.alphaPicker.eventsSubscibe();
                }
            };
        /**
         * @return {?}
         */
        NgxTTitanColorPickerComponent.prototype.closePicker = /**
         * @return {?}
         */
            function () {
                if (typeof this.mainColor !== 'undefined') {
                    this.mainColor.eventsUnSubscibe();
                }
                if (typeof this.huePicker !== 'undefined') {
                    this.huePicker.eventsUnSubscibe();
                }
                if (typeof this.alphaPicker !== 'undefined') {
                    this.alphaPicker.eventsUnSubscibe();
                }
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
                if (typeof this.mainColor !== 'undefined') {
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
            { type: core.Component, args: [{
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        selector: 'lib-ngx-ttitan-color-picker',
                        template: "<div\n  class=\"ngx-ttitan-color-picker-wrapper\"\n>\n\n  <div class=\"picker-input-wrapper\">\n    <div\n      [ngStyle]=\"{backgroundColor: color}\"\n      class=\"debug-output\"\n      *ngIf=\"colorPickerService.debug\"\n    >\n      {{color}}\n    </div>\n    <div class=\"picker-input-label\">\n      <label [for]=\"uuid\" >{{title}}</label>\n    </div>\n    <div class=\"picker-input-holder\">\n      <div class=\"picker-color\" [ngStyle]=\"{background: currentColorAlpha}\">\n\n      </div>\n      <div class=\"picker-input\">\n        <input\n          libNgxTTitanColorPickerInput\n          #pickerInput=\"libNgxTTitanColorPickerInput\"\n          (inputChange)=\"inputColorChange($event)\"\n          [format]=\"inputFormat\"\n          [id]=\"uuid\"\n          type=\"text\"\n          (focus)=\"openPicker()\"\n        />\n      </div>\n      <!--<div class=\"picker-save-sign\">-->\n      <!--S-->\n      <!--</div>-->\n    </div>\n\n  </div>\n  <div class=\"ngx-ttitan-color-picker\" [ngClass]=\"{'no-alpha': !alpha, 'open': pickerOpen}\">\n    <div class=\"ngx-ttitan-color-picker__MainColor\">\n      <div class=\"ngx-ttitan-color-picker__ColorLayer\" [ngStyle]=\"{backgroundColor: currentColorMax}\" ></div>\n      <div class=\"ngx-ttitan-color-picker__Slidable\" libNgxTTitanColorPickerSelector #mainColor=\"libNgxTTitanColorPickerSelector\" (change)=\"colorPickerService.saturationChange($event, this)\">\n        <div class=\"ngx-ttitan-color-picker__Dragger\" libNgxTTitanColorPickerDragger style=\"transform: translate3d(0px, 0px, 0px);\"></div>\n      </div>\n    </div>\n    <div class=\"ngx-ttitan-color-picker__HuePicker\">\n      <div class=\"ngx-ttitan-color-picker__Slidable\"  libNgxTTitanColorPickerSelector #huePicker=\"libNgxTTitanColorPickerSelector\" (change)=\"colorPickerService.hueChange($event, this)\" [direction]=\"'vertical'\">\n        <div class=\"ngx-ttitan-color-picker__Dragger\" libNgxTTitanColorPickerDragger [pickerPad]=\"0\" style=\" transform: translate3d(0px, 0px, 0px);\"></div>\n      </div>\n    </div>\n    <div class=\"ngx-ttitan-color-picker__AlphaPicker\" *ngIf=\"alpha === true\">\n      <div class=\"ngx-ttitan-color-picker__ColorLayer\"\n\n           [ngStyle]=\"{background: 'linear-gradient(to top, ' + currentColorAlphaZero + '  18px, ' + currentColor + ' calc(100% - 18px)'}\"\n      ></div>\n      <div class=\"ngx-ttitan-color-picker__Slidable\"  libNgxTTitanColorPickerSelector #alphaPicker=\"libNgxTTitanColorPickerSelector\" (change)=\"colorPickerService.alphaChange($event, this)\" [direction]=\"'vertical'\">\n        <div class=\"ngx-ttitan-color-picker__Dragger\" libNgxTTitanColorPickerDragger [pickerPad]=\"0\" style=\" transform: translate3d(0px, 0px, 0px);\"></div>\n      </div>\n    </div>\n    <!--<div style=\"height: 40px; width: 40px\" [ngStyle]=\"{background: currentColor}\">-->\n\n    <!--</div>-->\n    <!--<div style=\"height: 40px; width: 40px\" [ngStyle]=\"{background: currentColorAlpha}\">-->\n\n    <!--</div>-->\n  </div>\n  <lib-ngx-ttitan-color-picker-palette-list\n    (change)=\"inputColorChange($event)\"\n    [pallets]=\"pickerPallets\"\n  >\n\n  </lib-ngx-ttitan-color-picker-palette-list>\n</div>\n\n",
                        styles: [":host *,:host :after,:host :before{box-sizing:border-box}:host .debug-output{width:100%;height:20px}:host .picker-input-wrapper{margin-bottom:6px}:host .picker-input-wrapper .picker-input-label{margin-bottom:6px}:host .picker-input-wrapper .picker-input-label label{text-transform:uppercase;font-weight:600}:host .picker-input-wrapper .picker-input-holder{display:flex;height:33px;border:1px solid #bbb;overflow:hidden;border-radius:3px;background-color:#eee}:host .picker-input-wrapper .picker-input-holder .picker-color{flex:0 0 31px;background-color:#ff0300}:host .picker-input-wrapper .picker-input-holder .picker-input{flex:auto;background-color:transparent}:host .picker-input-wrapper .picker-input-holder .picker-input input{background-color:transparent;color:#272727;font-family:monospace;font-size:14px;border:none;outline:0;padding:8px 2px 8px 8px;width:100%}:host .picker-input-wrapper .picker-input-holder .picker-save-sign{flex:0 0 31px;line-height:33px;text-align:center}:host .ngx-ttitan-color-picker{max-height:0;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:flex;transition:max-height .3s}:host .ngx-ttitan-color-picker.open{margin-bottom:5px;max-height:165px}:host .ngx-ttitan-color-picker__ColorLayer{position:absolute;z-index:10;top:0;left:0;height:100%;width:100%;box-shadow:inset 0 0 2px 0 rgba(0,0,0,.5);pointer-events:none}:host .ngx-ttitan-color-picker__Slidable{height:100%;width:100%;cursor:pointer}:host .ngx-ttitan-color-picker__Dragger{position:relative;z-index:30;bottom:.9rem;-webkit-transform:none;transform:none;height:18px;width:18px;margin:0 auto;-webkit-backface-visibility:hidden;backface-visibility:hidden;will-change:transform;background:0 0;border:3px solid #fff;box-shadow:0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08),inset 0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08);border-radius:50%;pointer-events:none;touch-action:none}:host .ngx-ttitan-color-picker__MainColor{background-image:linear-gradient(45deg,#dfe3e8 25%,transparent 0),linear-gradient(-45deg,#dfe3e8 25%,transparent 0),linear-gradient(45deg,transparent 75%,#dfe3e8 0),linear-gradient(-45deg,transparent 75%,#dfe3e8 0);background-size:1.6rem 1.6rem;background-position:0 0,0 .8rem,.8rem -.8rem,-.8rem 0;position:relative;overflow:hidden;width:165px;height:165px;border-radius:4px;cursor:pointer}:host .ngx-ttitan-color-picker__MainColor .ngx-ttitan-color-picker__ColorLayer{box-shadow:inset 0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08);border-radius:4px}:host .ngx-ttitan-color-picker__MainColor .ngx-ttitan-color-picker__Dragger{right:.9rem;margin:0}:host .ngx-ttitan-color-picker__MainColor:after,:host .ngx-ttitan-color-picker__MainColor:before{content:\"\";position:absolute;z-index:20;top:0;left:0;display:block;height:100%;width:100%;pointer-events:none;border-radius:3px}:host .ngx-ttitan-color-picker__MainColor:before{background:linear-gradient(90deg,#fff,transparent)}:host .ngx-ttitan-color-picker__MainColor:after{background-image:linear-gradient(0deg,#000,transparent);box-shadow:inset 0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08)}:host .ngx-ttitan-color-picker__AlphaPicker,:host .ngx-ttitan-color-picker__HuePicker{position:relative;overflow:hidden;height:165px;width:24px;margin-left:.8rem;border-width:3px;border-radius:8rem;padding:13px 0}:host .ngx-ttitan-color-picker__HuePicker{background:linear-gradient(to bottom,red 0,#ff0 21%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%);box-shadow:inset 0 0 2px 0 rgba(0,0,0,.5)}:host .ngx-ttitan-color-picker__AlphaPicker{background-image:linear-gradient(45deg,#dfe3e8 25%,transparent 0),linear-gradient(-45deg,#dfe3e8 25%,transparent 0),linear-gradient(45deg,transparent 75%,#dfe3e8 0),linear-gradient(-45deg,transparent 75%,#dfe3e8 0);background-size:1.6rem 1.6rem;background-position:0 0,0 .8rem,.8rem -.8rem,-.8rem 0}:host .ngx-ttitan-color-picker__AlphaPicker .ngx-ttitan-color-picker__ColorLayer{border-radius:8rem}:host .ngx-ttitan-color-picker.no-alpha .ngx-ttitan-color-picker__MainColor{width:200px}"],
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
            alpha: [{ type: core.Input, args: ['alpha',] }],
            debug: [{ type: core.Input, args: ['debug',] }],
            color: [{ type: core.Input, args: ['color',] }],
            title: [{ type: core.Input, args: ['title',] }],
            outFormat: [{ type: core.Input, args: ['outFormat',] }],
            inputFormat: [{ type: core.Input, args: ['inputFormat',] }],
            availPallets: [{ type: core.Input, args: ['availPallets',] }],
            customPallets: [{ type: core.Input, args: ['customPallets',] }],
            colorChanged: [{ type: core.Output, args: ['colorChanged',] }],
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
            pickerPad: [{ type: core.Input, args: ['pickerPad',] }]
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
            this.dragger = null;
            this.change = new core.EventEmitter();
            this.el = null;
            this.dragStart = false;
            this.globalMouseMove = null;
            this.globalMouseUp = null;
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
                this.eventsUnSubscibe();
            };
        /**
         * @return {?}
         */
        NgxTTitanColorPickerSelectorDirective.prototype.eventsSubscibe = /**
         * @return {?}
         */
            function () {
                var _this = this;
                this.globalMouseMove = rxjs.fromEvent(window, 'mousemove').subscribe(function (event) {
                    if (_this.dragStart) {
                        _this.getPosition(/** @type {?} */ (event));
                    }
                });
                this.globalMouseUp = rxjs.fromEvent(window, 'mouseup').subscribe(function (event) {
                    if (_this.dragStart) {
                        _this.dragStart = false;
                        _this.getPosition(/** @type {?} */ (event));
                    }
                });
                // this.globalMouseMove = this.colorPickerService.mouseMoveObservable.subscribe((event) => {
                //   if(this.dragStart) {
                //     this.getPosition(<MouseEvent>event);
                //   }
                // });
                // this.globalMouseUp = this.colorPickerService.mouseUpObservable.subscribe((event) => {
                //   if(this.dragStart) {
                //     this.dragStart = false;
                //     this.getPosition(<MouseEvent>event);
                //   }
                // });
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
            direction: [{ type: core.Input, args: ['direction',] }],
            dragger: [{ type: core.ContentChild, args: [NgxTTitanColorPickerDraggerDirective,] }],
            change: [{ type: core.Output, args: ['change',] }],
            onMouseDown: [{ type: core.HostListener, args: ['mousedown', ['$event'],] }]
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXR0aXRhbi1jb2xvci1waWNrZXIudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci9saWIvbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuc2VydmljZS50cyIsIm5nOi8vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIvbGliL25neC10dGl0YW4tY29sb3ItcGlja2VyLXBhbGV0dGUtbGlzdC9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1wYWxldHRlLWxpc3QuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci9saWIvbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci9saWIvbmd4LXR0aXRhbi1jb2xvci1waWNrZXItZHJhZ2dlci5kaXJlY3RpdmUudHMiLCJuZzovL25neC10dGl0YW4tY29sb3ItcGlja2VyL2xpYi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1zZWxlY3Rvci5kaXJlY3RpdmUudHMiLCJuZzovL25neC10dGl0YW4tY29sb3ItcGlja2VyL2xpYi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1pbnB1dC5kaXJlY3RpdmUudHMiLCJuZzovL25neC10dGl0YW4tY29sb3ItcGlja2VyL2xpYi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDdXN0b21QZXJjZW50fSBmcm9tIFwiLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1zZWxlY3Rvci5kaXJlY3RpdmVcIjtcbmltcG9ydCB7Tmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnR9IGZyb20gXCIuL25neC10dGl0YW4tY29sb3ItcGlja2VyLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtmcm9tRXZlbnQsIE9ic2VydmFibGV9IGZyb20gXCJyeGpzL2luZGV4XCI7XG5pbXBvcnQge3dpbmRvd30gZnJvbSBcInJ4anMvaW50ZXJuYWwvb3BlcmF0b3JzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSFNWQSB7XG4gIGh1ZTogbnVtYmVyLFxuICBzYXR1cmF0aW9uOiBudW1iZXIsXG4gIHZhbHVlOiBudW1iZXIsXG4gIGFscGhhOiBudW1iZXIsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFsZXR0ZSB7XG4gIG5hbWU6IHN0cmluZyxcbiAgaWQ6IHN0cmluZyxcbiAgY29sb3JzOiBBcnJheTxzdHJpbmc+XG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ3hUVGl0YW5Db2xvclBpY2tlclNlcnZpY2Uge1xuXG4gIHB1YmxpYyBkZWJ1ZzogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgcGlja2VyTGlzdDogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICBwdWJsaWMgcGFsbGV0czogQXJyYXk8UGFsZXR0ZT4gPSBbXTtcblxuICAvLyBwdWJsaWMgbW91c2VNb3ZlT2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxNb3VzZUV2ZW50PiA9IDxPYnNlcnZhYmxlPE1vdXNlRXZlbnQ+PmZyb21FdmVudChkb2N1bWVudCwgJ21vdXNlbW92ZScpO1xuICAvLyBwdWJsaWMgbW91c2VVcE9ic2VydmFibGU6IE9ic2VydmFibGU8TW91c2VFdmVudD4gPSA8T2JzZXJ2YWJsZTxNb3VzZUV2ZW50Pj5mcm9tRXZlbnQoZG9jdW1lbnQsICdtb3VzZXVwJyk7XG4gIC8vIHB1YmxpYyBtb3VzZU1vdmVPYnNlcnZhYmxlOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIC8vIHB1YmxpYyBtb3VzZVVwT2JzZXJ2YWJsZTogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZmlsbEJhc2VQYWxsZXRzKCk7XG4gICAgLy9cbiAgICAvLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoJGV2ZW50KSA9PiB7XG4gICAgLy8gICB0aGlzLm1vdXNlTW92ZU9ic2VydmFibGUuZW1pdCg8TW91c2VFdmVudD4kZXZlbnQpO1xuICAgIC8vIH0pO1xuICAgIC8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoJGV2ZW50KSA9PiB7XG4gICAgLy8gICB0aGlzLm1vdXNlVXBPYnNlcnZhYmxlLmVtaXQoPE1vdXNlRXZlbnQ+JGV2ZW50KTtcbiAgICAvLyB9KTtcblxuICB9XG5cbiAgc2F0dXJhdGlvbkNoYW5nZShwZXJjZW50OiBDdXN0b21QZXJjZW50LCBwaWNrZXJDb21wb25lbnQ6IE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50ICkge1xuICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLnNhdHVyYXRpb24gPSBwZXJjZW50Lng7XG4gICAgcGlja2VyQ29tcG9uZW50LmhzdmEudmFsdWUgPSAoMTAwIC0gcGVyY2VudC55KTtcbiAgICB0aGlzLmRhdGFUb0NvbG9yKHBpY2tlckNvbXBvbmVudCk7XG4gIH1cblxuICBodWVDaGFuZ2UocGVyY2VudDogQ3VzdG9tUGVyY2VudCwgcGlja2VyQ29tcG9uZW50OiBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCkge1xuICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLmh1ZSA9IE1hdGgucm91bmQoMzYwICogcGVyY2VudC55IC8gMTAwKTtcbiAgICB0aGlzLmRhdGFUb0NvbG9yKHBpY2tlckNvbXBvbmVudCk7XG4gIH1cblxuICBhbHBoYUNoYW5nZShwZXJjZW50OiBDdXN0b21QZXJjZW50LCBwaWNrZXJDb21wb25lbnQ6IE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50KSB7XG4gICAgcGlja2VyQ29tcG9uZW50LmhzdmEuYWxwaGEgPSAoMTAwIC0gcGVyY2VudC55KSAvIDEwMDtcbiAgICB0aGlzLmRhdGFUb0NvbG9yKHBpY2tlckNvbXBvbmVudCk7XG4gIH1cblxuICBkYXRhVG9Db2xvcihwaWNrZXJDb21wb25lbnQ6IE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50KSB7XG4gICAgbGV0IHJnYmFBcnI6IEFycmF5PG51bWJlcj4gPSB0aGlzLmhzdmFUb1JnYmEoXG4gICAgICBwaWNrZXJDb21wb25lbnQuaHN2YS5odWUsXG4gICAgICBwaWNrZXJDb21wb25lbnQuaHN2YS5zYXR1cmF0aW9uLFxuICAgICAgcGlja2VyQ29tcG9uZW50LmhzdmEudmFsdWUsXG4gICAgICBwaWNrZXJDb21wb25lbnQuaHN2YS5hbHBoYVxuICAgICk7XG4gICAgbGV0IHJnYmFNYXhBcnI6IEFycmF5PG51bWJlcj4gPSB0aGlzLmhzdmFUb1JnYmEoXG4gICAgICBwaWNrZXJDb21wb25lbnQuaHN2YS5odWUsXG4gICAgICAxMDAsXG4gICAgICAxMDAsXG4gICAgICBwaWNrZXJDb21wb25lbnQuaHN2YS5hbHBoYVxuICAgICk7XG5cbiAgICBwaWNrZXJDb21wb25lbnQuY3VycmVudENvbG9yID0gJ3JnYignICsgcmdiYUFyclswXSArICcsJyArIHJnYmFBcnJbMV0gKyAnLCcgKyByZ2JhQXJyWzJdICsgJyknO1xuICAgIHBpY2tlckNvbXBvbmVudC5jdXJyZW50Q29sb3JNYXggPSAncmdiYSgnICsgcmdiYU1heEFyclswXSArICcsJyArIHJnYmFNYXhBcnJbMV0gKyAnLCcgKyByZ2JhTWF4QXJyWzJdICsgJywnICsgcmdiYU1heEFyclszXSArICcpJztcbiAgICBwaWNrZXJDb21wb25lbnQuY3VycmVudENvbG9yQWxwaGEgPSAncmdiYSgnICsgcmdiYUFyclswXSArICcsJyArIHJnYmFBcnJbMV0gKyAnLCcgKyByZ2JhQXJyWzJdICsgJywnICsgcmdiYUFyclszXSArICcpJztcbiAgICBwaWNrZXJDb21wb25lbnQuY3VycmVudENvbG9yQWxwaGFaZXJvID0gJ3JnYmEoJyArIHJnYmFBcnJbMF0gKyAnLCcgKyByZ2JhQXJyWzFdICsgJywnICsgcmdiYUFyclsyXSArICcsMCknO1xuXG4gICAgcGlja2VyQ29tcG9uZW50LnNldElucHV0VmFsdWUoKTtcbiAgICBwaWNrZXJDb21wb25lbnQudXBkYXRlUmV0dXJuQ29sb3IoKTtcblxuXG4gIH1cblxuICBjb2xvclRvRGF0YShjb2xvcjogc3RyaW5nLCBwaWNrZXJDb21wb25lbnQ6IE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50KSB7XG4gICAgc3dpdGNoICh0aGlzLmRldGVjdENvbG9yVHlwZShjb2xvcikpIHtcbiAgICAgIGNhc2UgXCJyZ2JhXCI6IHRoaXMucGFyc2VSZ2JhQ29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudCk7IGJyZWFrO1xuICAgICAgY2FzZSBcInJnYlwiOiB0aGlzLnBhcnNlUmdiQ29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudCk7IGJyZWFrO1xuICAgICAgY2FzZSBcImhzbGFcIjogdGhpcy5wYXJzZUhzbGFDb2xvcihjb2xvciwgcGlja2VyQ29tcG9uZW50KTsgYnJlYWs7XG4gICAgICBjYXNlIFwiaHNsXCI6IHRoaXMucGFyc2VIc2xDb2xvcihjb2xvciwgcGlja2VyQ29tcG9uZW50KTsgYnJlYWs7XG4gICAgICBjYXNlIFwiaGV4NlwiOiB0aGlzLnBhcnNlSGV4Q29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudCk7IGJyZWFrO1xuICAgICAgY2FzZSBcImhleDhcIjogdGhpcy5wYXJzZUhleENvbG9yKGNvbG9yLCBwaWNrZXJDb21wb25lbnQpOyBicmVhaztcbiAgICB9XG4gICAgdGhpcy5kYXRhVG9Db2xvcihwaWNrZXJDb21wb25lbnQpO1xuICB9XG5cbiAgZ2V0UGlja2VyVXVpZCgpIHtcbiAgICBsZXQgcGlja2VySWQgPSAnJztcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgMTAwMDsgaSsrKSB7XG4gICAgICBwaWNrZXJJZCA9ICdwaWNrZXItJyArIHRoaXMucGlja2VyTGlzdC5sZW5ndGggKyAnLScgKyBpO1xuICAgICAgaWYodGhpcy5waWNrZXJMaXN0LmluZGV4T2YocGlja2VySWQpID09PSAtMSApIHtcbiAgICAgICAgdGhpcy5waWNrZXJMaXN0LnB1c2gocGlja2VySWQpO1xuICAgICAgICByZXR1cm4gcGlja2VySWQ7XG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxuXG4gIGRldGVjdENvbG9yVHlwZShjb2xvcjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZihjb2xvci5pbmRleE9mKCdyZ2JhJykgIT09IC0xKSB7XG4gICAgICByZXR1cm4gJ3JnYmEnO1xuICAgIH0gZWxzZSBpZihjb2xvci5pbmRleE9mKCdyZ2InKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiAncmdiJztcbiAgICB9IGVsc2UgaWYoY29sb3IuaW5kZXhPZignaHNsYScpICE9PSAtMSkge1xuICAgICAgcmV0dXJuICdoc2xhJztcbiAgICB9IGVsc2UgaWYoY29sb3IuaW5kZXhPZignaHNsJykgIT09IC0xKSB7XG4gICAgICByZXR1cm4gJ2hzbCc7XG4gICAgfSBlbHNlIGlmIChjb2xvci5pbmRleE9mKCcjJykgIT09IC0xICYmIChjb2xvci5sZW5ndGggPT0gNCB8fCBjb2xvci5sZW5ndGggPT0gNykpe1xuICAgICAgcmV0dXJuICdoZXg2JztcbiAgICB9IGVsc2UgaWYgKGNvbG9yLmluZGV4T2YoJyMnKSAhPT0gLTEgJiYgY29sb3IubGVuZ3RoID09IDkpe1xuICAgICAgcmV0dXJuICdoZXg4JztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICd1bmRlZmluZWQnO1xuICAgIH1cbiAgfVxuXG5cbiAgZmlsbFZhbHVlc0Zyb21Ic3ZhQXJyKGhzdmFBcnI6IEFycmF5PG51bWJlcj4sIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBwaWNrZXJDb21wb25lbnQuaHN2YS5odWUgPSBoc3ZhQXJyWzBdO1xuICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLnNhdHVyYXRpb24gPSBoc3ZhQXJyWzFdO1xuICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLnZhbHVlID0gaHN2YUFyclsyXTtcbiAgICBwaWNrZXJDb21wb25lbnQuaHN2YS5hbHBoYSA9IGhzdmFBcnJbM107XG4gIH1cblxuXG4gIHBhcnNlUmdiYUNvbG9yKGNvbG9yLCBwaWNrZXJDb21wb25lbnQ6IE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50KSB7XG4gICAgbGV0IGF1cyA9IGNvbG9yLnJlcGxhY2UoJ3JnYmEoJywgJycpLnJlcGxhY2UoJyknLCAnJyk7XG4gICAgbGV0IGF1czIgPSBhdXMuc3BsaXQoJywnKTtcbiAgICBpZihhdXMyLmxlbmd0aCA9PSA0KSB7XG4gICAgICB0aGlzLmZpbGxWYWx1ZXNGcm9tSHN2YUFycihcbiAgICAgICAgdGhpcy5yZ2JhVG9Ic3ZhKFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbMF0pLFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbMV0pLFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbMl0pLFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbM10pLFxuICAgICAgICApLFxuICAgICAgICBwaWNrZXJDb21wb25lbnRcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcGFyc2VSZ2JDb2xvcihjb2xvciwgcGlja2VyQ29tcG9uZW50OiBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCkge1xuICAgIGxldCBhdXMgPSBjb2xvci5yZXBsYWNlKCdyZ2IoJywgJycpLnJlcGxhY2UoJyknLCAnJyk7XG4gICAgbGV0IGF1czIgPSBhdXMuc3BsaXQoJywnKTtcbiAgICBpZihhdXMyLmxlbmd0aCA9PSAzKSB7XG4gICAgICB0aGlzLmZpbGxWYWx1ZXNGcm9tSHN2YUFycihcbiAgICAgICAgdGhpcy5yZ2JhVG9Ic3ZhKFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbMF0pLFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbMV0pLFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbMl0pLFxuICAgICAgICAgIDFcbiAgICAgICAgKSxcbiAgICAgICAgcGlja2VyQ29tcG9uZW50XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHBhcnNlSHNsYUNvbG9yKGNvbG9yLCBwaWNrZXJDb21wb25lbnQ6IE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50KSB7XG4gICAgbGV0IGF1cyA9IGNvbG9yLnJlcGxhY2UoJ2hzbGEoJywgJycpLnJlcGxhY2UoJyknLCAnJykucmVwbGFjZSgnJScsICcnKTtcbiAgICBsZXQgYXVzMiA9IGF1cy5zcGxpdCgnLCcpO1xuICAgIGlmKGF1czIubGVuZ3RoID09IDQpIHtcbiAgICAgIHRoaXMuZmlsbFZhbHVlc0Zyb21Ic3ZhQXJyKFxuICAgICAgICB0aGlzLmhzbGFUb0hzdmEoXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlswXSksXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlsxXSksXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlsyXSksXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlszXSksXG4gICAgICAgICksXG4gICAgICAgIHBpY2tlckNvbXBvbmVudFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwYXJzZUhzbENvbG9yKGNvbG9yLCBwaWNrZXJDb21wb25lbnQ6IE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50KSB7XG4gICAgbGV0IGF1cyA9IGNvbG9yLnJlcGxhY2UoJ2hzbCgnLCAnJykucmVwbGFjZSgnKScsICcnKS5yZXBsYWNlKCclJywgJycpO1xuICAgIGxldCBhdXMyID0gYXVzLnNwbGl0KCcsJyk7XG4gICAgaWYoYXVzMi5sZW5ndGggPT0gMykge1xuICAgICAgdGhpcy5maWxsVmFsdWVzRnJvbUhzdmFBcnIoXG4gICAgICAgIHRoaXMuaHNsYVRvSHN2YShcbiAgICAgICAgICBwYXJzZUludChhdXMyWzBdKSxcbiAgICAgICAgICBwYXJzZUludChhdXMyWzFdKSxcbiAgICAgICAgICBwYXJzZUludChhdXMyWzJdKSxcbiAgICAgICAgICAxXG4gICAgICAgICksXG4gICAgICAgIHBpY2tlckNvbXBvbmVudFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwYXJzZUhleENvbG9yKGNvbG9yLCBwaWNrZXJDb21wb25lbnQ6IE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50KSB7XG4gICAgbGV0IGF1cyA9IGNvbG9yLnJlcGxhY2UoJyMnLCAnJyk7XG4gICAgdGhpcy5maWxsVmFsdWVzRnJvbUhzdmFBcnIoXG4gICAgICB0aGlzLmhleFRvSHN2YShhdXMpLFxuICAgICAgcGlja2VyQ29tcG9uZW50XG4gICAgKTtcbiAgfVxuXG5cblxuICBoc3ZhVG9SZ2JhKEgsIFMsIFYsIEEpOiBBcnJheTxudW1iZXI+IHtcbiAgICBsZXQgZiAsIHAsIHEgLCB0LCBsSCwgUiwgRywgQjtcblxuICAgIEggPSAoSCA8IDM2MCkgPyBIIDogMzU5O1xuICAgIFMgPSBTIC8gMTAwO1xuICAgIFYgPSBWIC8gMTAwO1xuXG4gICAgbEggPSBNYXRoLmZsb29yKEggLyA2MCk7XG5cbiAgICBmID0gSC82MCAtIGxIO1xuXG4gICAgcCA9IFYgKiAoMSAtIFMpO1xuXG4gICAgcSA9IFYgKigxIC0gUypmKTtcblxuICAgIHQgPSBWKiAoMSAtICgxLWYpKiBTKTtcblxuICAgIHN3aXRjaCAobEgpe1xuICAgICAgY2FzZSAwOiBSID0gVjsgRyA9IHQ7IEIgPSBwOyBicmVhaztcbiAgICAgIGNhc2UgMTogUiA9IHE7IEcgPSBWOyBCID0gcDsgYnJlYWs7XG4gICAgICBjYXNlIDI6IFIgPSBwOyBHID0gVjsgQiA9IHQ7IGJyZWFrO1xuICAgICAgY2FzZSAzOiBSID0gcDsgRyA9IHE7IEIgPSBWOyBicmVhaztcbiAgICAgIGNhc2UgNDogUiA9IHQ7IEcgPSBwOyBCID0gVjsgYnJlYWs7XG4gICAgICBjYXNlIDU6IFIgPSBWOyBHID0gcDsgQiA9IHE7IGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBbTWF0aC5yb3VuZChSKjI1NSksIE1hdGgucm91bmQoRyoyNTUpLCBNYXRoLnJvdW5kKEIqMjU1KSwgQV07XG4gIH1cblxuICBoc3ZhVG9SZ2JhU3RyaW5nKEgsIFMsIFYsIEEsIHNob3dBbHBoYTogYm9vbGVhbiA9IGZhbHNlKTogc3RyaW5nIHtcbiAgICBsZXQgY29sb3JBcnI6IEFycmF5PG51bWJlcj4gPSB0aGlzLmhzdmFUb1JnYmEoSCwgUywgViwgQSk7XG5cbiAgICBpZihzaG93QWxwaGEpIHtcbiAgICAgIHJldHVybiAncmdiYSgnICsgY29sb3JBcnIuam9pbignLCcpICsgJyknO1xuICAgIH1cblxuICAgIGNvbG9yQXJyLnBvcCgpO1xuICAgIHJldHVybiAncmdiKCcgKyBjb2xvckFyci5qb2luKCcsJykgKyAnKSc7XG5cbiAgfVxuXG4gIHJnYmFUb0hzdmEociwgZywgYiwgYSk6IEFycmF5PG51bWJlcj4ge1xuICAgIHIgLz0gMjU1O1xuICAgIGcgLz0gMjU1O1xuICAgIGIgLz0gMjU1O1xuXG4gICAgbGV0IG1heCA9IE1hdGgubWF4KHIsIGcsIGIpLCBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcbiAgICBsZXQgaCwgcywgdiA9IG1heDtcbiAgICBsZXQgZCA9IG1heCAtIG1pbjtcbiAgICBzID0gbWF4ID09IDAgPyAwIDogZCAvIG1heDtcblxuICAgIGlmIChtYXggPT0gbWluKSB7XG4gICAgICBoID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpdGNoIChtYXgpIHtcbiAgICAgICAgY2FzZSByOiBoID0gKGcgLSBiKSAvIGQgKyAoZyA8IGIgPyA2IDogMCk7IGJyZWFrO1xuICAgICAgICBjYXNlIGc6IGggPSAoYiAtIHIpIC8gZCArIDI7IGJyZWFrO1xuICAgICAgICBjYXNlIGI6IGggPSAociAtIGcpIC8gZCArIDQ7IGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBoIC89IDY7XG4gICAgfVxuXG5cbiAgICByZXR1cm4gW1xuICAgICAgaCAqIDM2MCxcbiAgICAgIHMgKiAxMDAsXG4gICAgICB2ICogMTAwLFxuICAgICAgYVxuICAgIF07XG4gIH1cblxuICBoc3ZhVG9Ic2xhKGgsIHMsIHYsIGEpOiBBcnJheTxudW1iZXI+e1xuICAgIHMgLz0gMTAwO1xuICAgIHYgLz0gMTAwO1xuICAgIHJldHVybltcbiAgICAgIE1hdGgucm91bmQoaCksXG4gICAgICBNYXRoLnJvdW5kKChzKnYvKChoPSgyLXMpKnYpPDE/aDoyLWgpKSAqIDEwMCksXG4gICAgICBNYXRoLnJvdW5kKChoLzIpICogMTAwKSxcbiAgICAgIGFcbiAgICBdXG4gIH1cblxuICBoc2xhVG9Ic3ZhIChoLCBzLCBsLCBhKTogQXJyYXk8bnVtYmVyPntcbiAgICBzIC89IDEwMDtcbiAgICBsIC89IDEwMDtcbiAgICBzKj1sPC41P2w6MS1sO1xuICAgIHJldHVybltcbiAgICAgIGgsXG4gICAgICBNYXRoLnJvdW5kKCgyKnMvKGwrcykpICogMTAwKSxcbiAgICAgIE1hdGgucm91bmQoKGwrcykgKiAxMDApLFxuICAgICAgYVxuICAgIF1cbiAgfVxuXG4gIGhleFRvSHN2YShoZXg6IHN0cmluZyk6IEFycmF5PG51bWJlcj4ge1xuXG4gICAgbGV0IHJnYmEgPSBbMCwwLDAsMV07XG4gICAgaWYgKGhleC5sZW5ndGggPT0gNikge1xuICAgICAgcmdiYSA9IFtcbiAgICAgICAgcGFyc2VJbnQoaGV4LnN1YnN0cmluZygwLCAyKSwgMTYpLFxuICAgICAgICBwYXJzZUludChoZXguc3Vic3RyaW5nKDIsIDQpLCAxNiksXG4gICAgICAgIHBhcnNlSW50KGhleC5zdWJzdHJpbmcoNCwgNiksIDE2KSxcbiAgICAgICAgMVxuICAgICAgXTtcbiAgICB9IGVsc2UgaWYgKGhleC5sZW5ndGggPT0gMykge1xuICAgICAgcmdiYSA9IFtcbiAgICAgICAgcGFyc2VJbnQoaGV4LnN1YnN0cmluZygwLCAxKSArIGhleC5zdWJzdHJpbmcoMCwgMSksIDE2KSxcbiAgICAgICAgcGFyc2VJbnQoaGV4LnN1YnN0cmluZygxLCAyKSArIGhleC5zdWJzdHJpbmcoMSwgMiksIDE2KSxcbiAgICAgICAgcGFyc2VJbnQoaGV4LnN1YnN0cmluZygyLCAzKSArIGhleC5zdWJzdHJpbmcoMiwgMyksIDE2KSxcbiAgICAgICAgMVxuICAgICAgXVxuICAgIH0gZWxzZSBpZiAoaGV4Lmxlbmd0aCA9PSA4KSB7XG4gICAgICByZ2JhID0gW1xuICAgICAgICBwYXJzZUludChoZXguc3Vic3RyaW5nKDAsIDIpLCAxNiksXG4gICAgICAgIHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMiwgNCksIDE2KSxcbiAgICAgICAgcGFyc2VJbnQoaGV4LnN1YnN0cmluZyg0LCA2KSwgMTYpLFxuICAgICAgICBwYXJzZUZsb2F0KChwYXJzZUludChoZXguc3Vic3RyaW5nKDYsIDgpLCAxNikgLyAyNTUpLnRvRml4ZWQoMikpXG4gICAgICBdXG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJnYmFUb0hzdmEocmdiYVswXSwgcmdiYVsxXSwgcmdiYVsyXSwgcmdiYVszXSk7XG5cbiAgfVxuXG4gIGhzdmFUb0hleChILCBTLCBWLCBBLCBzaG93QWxwaGE6IGJvb2xlYW4gPSB0cnVlKTogc3RyaW5nIHtcbiAgICBsZXQgcmdiYTogQXJyYXk8bnVtYmVyPiA9IHRoaXMuaHN2YVRvUmdiYShILCBTLCBWLCBBKTtcblxuICAgIGxldCBoQTogc3RyaW5nID0gKChzaG93QWxwaGEpID8gKHJnYmFbM10gKiAyNTUpLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMCwyKSA6ICcnKTtcblxuICAgIGlmKHNob3dBbHBoYSkge1xuICAgICAgaEEgPSAoaEEubGVuZ3RoID09IDEpID8gaEEgKyBoQSA6IGhBO1xuICAgIH1cbiAgICByZXR1cm4gJyMnICtcbiAgICAgICgocmdiYVsyXSB8IHJnYmFbMV0gPDwgOCB8IHJnYmFbMF0gPDwgMTYpIHwgMSA8PCAyNCkudG9TdHJpbmcoMTYpLnNsaWNlKDEpICtcbiAgICAgIGhBO1xuICB9XG5cblxuICB2YWxpZGF0ZUNvbG9yRm9ybWF0KHZhbHVlOiBzdHJpbmcsIGZvcm1hdDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBzd2l0Y2ggKGZvcm1hdCkge1xuICAgICAgY2FzZSBcImhleDZcIjogcmV0dXJuIHRoaXMudmFsaWRhdGVIZXhGb3JtYXQodmFsdWUpO1xuICAgICAgY2FzZSBcImhleDhcIjogcmV0dXJuIHRoaXMudmFsaWRhdGVIZXhGb3JtYXQodmFsdWUsIHRydWUpO1xuICAgICAgY2FzZSBcInJnYlwiOiByZXR1cm4gdGhpcy52YWxpZGF0ZVJnYmFGb3JtYXQodmFsdWUpO1xuICAgICAgY2FzZSBcInJnYmFcIjogcmV0dXJuIHRoaXMudmFsaWRhdGVSZ2JhRm9ybWF0KHZhbHVlLCB0cnVlKTtcbiAgICAgIC8vIGNhc2UgXCJoc2xcIjogcmV0dXJuIHRoaXMudmFsaWRhdGVIZXhGb3JtYXQodmFsdWUpO1xuICAgICAgLy8gY2FzZSBcImhzbGFcIjogcmV0dXJuIHRoaXMudmFsaWRhdGVIZXhGb3JtYXQodmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gJ25vdFZhbGlkJztcbiAgfVxuXG4gIHZhbGlkYXRlSGV4Rm9ybWF0KHZhbHVlOiBzdHJpbmcsIGFscGhhOiBib29sZWFuID0gZmFsc2UpOiBzdHJpbmcge1xuICAgIGxldCByZXN1bHQgPSAnbm90VmFsaWQnO1xuICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgnIycsICcnKTtcbiAgICBpZighYWxwaGEpIHtcbiAgICAgIGlmKHZhbHVlLmxlbmd0aCA9PT0gNikge1xuICAgICAgICBpZighaXNOYU4ocGFyc2VJbnQodmFsdWUsIDE2KSkpIHtcbiAgICAgICAgICByZXR1cm4gJyMnICsgdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYodmFsdWUubGVuZ3RoID09PSA4KSB7XG4gICAgICAgIGlmKCFpc05hTihwYXJzZUludCh2YWx1ZSwgMTYpKSkge1xuICAgICAgICAgIHJldHVybiAnIycgKyB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICB2YWxpZGF0ZVJnYmFGb3JtYXQodmFsdWU6IHN0cmluZywgYWxwaGE6IGJvb2xlYW4gPSBmYWxzZSk6IHN0cmluZyB7XG4gICAgbGV0IHJlc3VsdCA9ICdub3RWYWxpZCc7XG4gICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bXjAtOVxcLF0rL2csIFwiXCIpO1xuICAgIGxldCBhdXNBcnI6IEFycmF5PHN0cmluZyB8IG51bWJlcj4gPSB2YWx1ZS5zcGxpdCgnLCcpO1xuICAgIGxldCBhbHBoYVZhbDogc3RyaW5nIHwgbnVtYmVyID0gJyc7XG5cbiAgICBpZighYWxwaGEpIHtcbiAgICAgIGlmKGF1c0Fyci5sZW5ndGggPT0gMykge1xuICAgICAgICBhdXNBcnIgPSBhdXNBcnIubWFwKGZ1bmN0aW9uKHZhbDogc3RyaW5nKXtyZXR1cm4gcGFyc2VJbnQodmFsKX0pO1xuICAgICAgICBpZihcbiAgICAgICAgICBNYXRoLm1heC5hcHBseShudWxsLCBhdXNBcnIpIDw9IDI1NSAmJlxuICAgICAgICAgIE1hdGgubWluLmFwcGx5KG51bGwsIGF1c0FycikgPj0gMFxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm4gJ3JnYignICsgYXVzQXJyLmpvaW4oJywnKSArICcpJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZihhdXNBcnIubGVuZ3RoID09IDQpIHtcbiAgICAgICAgYWxwaGFWYWwgPSBwYXJzZUZsb2F0KDxzdHJpbmc+YXVzQXJyLnBvcCgpKTtcbiAgICAgICAgYXVzQXJyID0gYXVzQXJyLm1hcChmdW5jdGlvbih2YWw6IHN0cmluZyl7cmV0dXJuIHBhcnNlSW50KHZhbCl9KTtcbiAgICAgICAgaWYoXG4gICAgICAgICAgTWF0aC5tYXguYXBwbHkobnVsbCwgYXVzQXJyKSA8PSAyNTUgJiZcbiAgICAgICAgICBNYXRoLm1pbi5hcHBseShudWxsLCBhdXNBcnIpID49IDAgJiZcbiAgICAgICAgICBhbHBoYVZhbCA+PSAwICYmIGFscGhhVmFsIDw9IDFcbiAgICAgICAgKSB7XG4gICAgICAgICAgYXVzQXJyLnB1c2goYWxwaGFWYWwpO1xuICAgICAgICAgIHJldHVybiAncmdiYSgnICsgYXVzQXJyLmpvaW4oJywnKSArICcpJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcmVwYXJlUmV0dXJuQ29sb3IoaHN2YTogSFNWQSwgZm9ybWF0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHN3aXRjaCAoZm9ybWF0KSB7XG4gICAgICBjYXNlIFwiaGV4NlwiOiByZXR1cm4gdGhpcy5oc3ZhVG9IZXgoaHN2YS5odWUsIGhzdmEuc2F0dXJhdGlvbiwgaHN2YS52YWx1ZSwgMSwgZmFsc2UpO1xuICAgICAgY2FzZSBcImhleDhcIjogcmV0dXJuIHRoaXMuaHN2YVRvSGV4KGhzdmEuaHVlLCBoc3ZhLnNhdHVyYXRpb24sIGhzdmEudmFsdWUsIGhzdmEuYWxwaGEsIHRydWUpO1xuICAgICAgY2FzZSBcInJnYlwiOiByZXR1cm4gdGhpcy5oc3ZhVG9SZ2JhU3RyaW5nKGhzdmEuaHVlLCBoc3ZhLnNhdHVyYXRpb24sIGhzdmEudmFsdWUsIDEpO1xuICAgICAgY2FzZSBcInJnYmFcIjogcmV0dXJuIHRoaXMuaHN2YVRvUmdiYVN0cmluZyhoc3ZhLmh1ZSwgaHN2YS5zYXR1cmF0aW9uLCBoc3ZhLnZhbHVlLCBoc3ZhLmFscGhhLCB0cnVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaHN2YVRvSGV4KGhzdmEuaHVlLCBoc3ZhLnNhdHVyYXRpb24sIGhzdmEudmFsdWUsIDEsIGZhbHNlKTtcbiAgfVxuXG4gIHByZXBhcmVQaWNrZXJQYWxsZXRzKGF2YWlsUGFsbGV0czogQXJyYXk8c3RyaW5nPiA9IFtdLCBjdXN0b21QYWxsZXRzOiBBcnJheTxQYWxldHRlPiA9IFtdLCBwaWNrZXJDb21wb25lbnQ6IE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50KSB7XG4gICAgdGhpcy5wYWxsZXRzLmZvckVhY2goKHBhbGV0dGUpID0+IHtcbiAgICAgIGlmKGF2YWlsUGFsbGV0cy5pbmRleE9mKHBhbGV0dGUuaWQpICE9PSAtMSkge1xuICAgICAgICBwaWNrZXJDb21wb25lbnQucGlja2VyUGFsbGV0cy5wdXNoKHBhbGV0dGUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGN1c3RvbVBhbGxldHMuZm9yRWFjaCgocGFsZXR0ZSkgPT4ge1xuICAgICAgcGlja2VyQ29tcG9uZW50LnBpY2tlclBhbGxldHMucHVzaChwYWxldHRlKTtcbiAgICB9KVxuXG4gIH1cblxuICBmaWxsQmFzZVBhbGxldHMoKSB7XG4gICAgdGhpcy5wYWxsZXRzLnB1c2goe1xuICAgICAgaWQ6ICdwb2xhcmlzJyxcbiAgICAgIG5hbWU6ICdQb2xhcmlzJyxcbiAgICAgIGNvbG9yczogW1xuICAgICAgICAnI0Y5RkFGQicsICcjRjRGNkY4JywgJyNERkUzRTgnLCAnI0M0Q0RENScsXG4gICAgICAgICcjOTE5RUFCJywgJyM2MzczODEnLCAnIzQ1NEY1QicsICcjMjEyQjM2JyxcbiAgICAgICAgJyNCM0I1Q0InLCAnIzQzNDY3RicsICcjMUMyMjYwJywgJyMwMDA0NEMnLFxuICAgICAgICAnI0Y2RjBGRCcsICcjRTNEMEZGJywgJyM5QzZBREUnLCAnIzUwMjQ4RicsICcjMjMwMDUxJyxcbiAgICAgICAgJyNGNEY1RkEnLCAnI0IzQkNGNScsICcjNUM2QUM0JywgJyMyMDJFNzgnLCAnIzAwMDYzOScsXG4gICAgICAgICcjRUJGNUZBJywgJyNCNEUxRkEnLCAnIzAwN0FDRScsICcjMDg0RThBJywgJyMwMDE0MjknLFxuICAgICAgICAnI0UwRjVGNScsICcjQjdFQ0VDJywgJyM0N0MxQkYnLCAnIzAwODQ4RScsICcjMDAzMTM1JyxcbiAgICAgICAgJyNFM0YxREYnLCAnI0JCRTVCMycsICcjNTBCODNDJywgJyMxMDgwNDMnLCAnIzE3MzYzMCcsXG4gICAgICAgICcjRkNGMUNEJywgJyNGRkVBOEEnLCAnI0VFQzIwMCcsICcjOUM2RjE5JywgJyM1NzNCMDAnLFxuICAgICAgICAnI0ZDRUJEQicsICcjRkZDNThCJywgJyNGNDkzNDInLCAnI0MwNTcxNycsICcjNEExNTA0JyxcbiAgICAgICAgJyNGQkVBRTUnLCAnI0ZFQUQ5QScsICcjREUzNjE4JywgJyNCRjA3MTEnLCAnIzMzMDEwMScsXG4gICAgICBdXG4gICAgfSk7XG4gICAgdGhpcy5wYWxsZXRzLnB1c2goe1xuICAgICAgaWQ6ICdtYXRlcmlhbCcsXG4gICAgICBuYW1lOiAnTWF0ZXJpYWwnLFxuICAgICAgY29sb3JzOiBbXG4gICAgICAgICcjZmZlYmVlJywgJyNmZmNkZDInLCAnI2VmOWE5YScsICcjZTU3MzczJywgJyNlZjUzNTAnLCAnI2Y0NDMzNicsICcjZTUzOTM1JywgJyNkMzJmMmYnLCAnI2M2MjgyOCcsICcjYjcxYzFjJywgJyNmZjhhODAnLCAnI2ZmNTI1MicsICcjZmYxNzQ0JywgJyNkNTAwMDAnLFxuICAgICAgICAnI2ZjZTRlYycsICcjZjhiYmQwJywgJyNmNDhmYjEnLCAnI2YwNjI5MicsICcjZWM0MDdhJywgJyNlOTFlNjMnLCAnI2Q4MWI2MCcsICcjYzIxODViJywgJyNhZDE0NTcnLCAnIzg4MGU0ZicsICcjZmY4MGFiJywgJyNmZjQwODEnLCAnI2Y1MDA1NycsICcjYzUxMTYyJyxcbiAgICAgICAgJyNmM2U1ZjUnLCAnI2UxYmVlNycsICcjY2U5M2Q4JywgJyNiYTY4YzgnLCAnI2FiNDdiYycsICcjOWMyN2IwJywgJyM4ZTI0YWEnLCAnIzdiMWZhMicsICcjNmExYjlhJywgJyM0YTE0OGMnLCAnI2VhODBmYycsICcjZTA0MGZiJywgJyNkNTAwZjknLCAnI2FhMDBmZicsXG4gICAgICAgICcjZWRlN2Y2JywgJyNkMWM0ZTknLCAnI2IzOWRkYicsICcjOTU3NWNkJywgJyM3ZTU3YzInLCAnIzY3M2FiNycsICcjNWUzNWIxJywgJyM1MTJkYTgnLCAnIzQ1MjdhMCcsICcjMzExYjkyJywgJyNiMzg4ZmYnLCAnIzdjNGRmZicsICcjNjUxZmZmJywgJyM2MjAwZWEnLFxuICAgICAgICAnI2U4ZWFmNicsICcjYzVjYWU5JywgJyM5ZmE4ZGEnLCAnIzc5ODZjYicsICcjNWM2YmMwJywgJyMzZjUxYjUnLCAnIzM5NDlhYicsICcjMzAzZjlmJywgJyMyODM1OTMnLCAnIzFhMjM3ZScsICcjOGM5ZWZmJywgJyM1MzZkZmUnLCAnIzNkNWFmZScsICcjMzA0ZmZlJyxcbiAgICAgICAgJyNlM2YyZmQnLCAnI2JiZGVmYicsICcjOTBjYWY5JywgJyM2NGI1ZjYnLCAnIzQyYTVmNScsICcjMjE5NmYzJywgJyMxZTg4ZTUnLCAnIzE5NzZkMicsICcjMTU2NWMwJywgJyMwZDQ3YTEnLCAnIzgyYjFmZicsICcjNDQ4YWZmJywgJyMyOTc5ZmYnLCAnIzI5NjJmZicsXG4gICAgICAgICcjZTFmNWZlJywgJyNiM2U1ZmMnLCAnIzgxZDRmYScsICcjNGZjM2Y3JywgJyMyOWI2ZjYnLCAnIzAzYTlmNCcsICcjMDM5YmU1JywgJyMwMjg4ZDEnLCAnIzAyNzdiZCcsICcjMDE1NzliJywgJyM4MGQ4ZmYnLCAnIzQwYzRmZicsICcjMDBiMGZmJywgJyMwMDkxZWEnLFxuICAgICAgICAnI2UwZjdmYScsICcjYjJlYmYyJywgJyM4MGRlZWEnLCAnIzRkZDBlMScsICcjMjZjNmRhJywgJyMwMGJjZDQnLCAnIzAwYWNjMScsICcjMDA5N2E3JywgJyMwMDgzOGYnLCAnIzAwNjA2NCcsICcjODRmZmZmJywgJyMxOGZmZmYnLCAnIzAwZTVmZicsICcjMDBiOGQ0JyxcbiAgICAgICAgJyNlMGYyZjEnLCAnI2IyZGZkYicsICcjODBjYmM0JywgJyM0ZGI2YWMnLCAnIzI2YTY5YScsICcjMDA5Njg4JywgJyMwMDg5N2InLCAnIzAwNzk2YicsICcjMDA2OTVjJywgJyMwMDRkNDAnLCAnI2E3ZmZlYicsICcjNjRmZmRhJywgJyMxZGU5YjYnLCAnIzAwYmZhNScsXG4gICAgICAgICcjZThmNWU5JywgJyNjOGU2YzknLCAnI2E1ZDZhNycsICcjODFjNzg0JywgJyM2NmJiNmEnLCAnIzRjYWY1MCcsICcjNDNhMDQ3JywgJyMzODhlM2MnLCAnIzJlN2QzMicsICcjMWI1ZTIwJywgJyNiOWY2Y2EnLCAnIzY5ZjBhZScsICcjMDBlNjc2JywgJyMwMGM4NTMnLFxuICAgICAgICAnI2YxZjhlOScsICcjZGNlZGM4JywgJyNjNWUxYTUnLCAnI2FlZDU4MScsICcjOWNjYzY1JywgJyM4YmMzNGEnLCAnIzdjYjM0MicsICcjNjg5ZjM4JywgJyM1NThiMmYnLCAnIzMzNjkxZScsICcjY2NmZjkwJywgJyNiMmZmNTknLCAnIzc2ZmYwMycsICcjNjRkZDE3JyxcbiAgICAgICAgJyNmOWZiZTcnLCAnI2YwZjRjMycsICcjZTZlZTljJywgJyNkY2U3NzUnLCAnI2Q0ZTE1NycsICcjY2RkYzM5JywgJyNjMGNhMzMnLCAnI2FmYjQyYicsICcjOWU5ZDI0JywgJyM4Mjc3MTcnLCAnI2Y0ZmY4MScsICcjZWVmZjQxJywgJyNjNmZmMDAnLCAnI2FlZWEwMCcsXG4gICAgICAgICcjZmZmZGU3JywgJyNmZmY5YzQnLCAnI2ZmZjU5ZCcsICcjZmZmMTc2JywgJyNmZmVlNTgnLCAnI2ZmZWIzYicsICcjZmRkODM1JywgJyNmYmMwMmQnLCAnI2Y5YTgyNScsICcjZjU3ZjE3JywgJyNmZmZmOGQnLCAnI2ZmZmYwMCcsICcjZmZlYTAwJywgJyNmZmQ2MDAnLFxuICAgICAgICAnI2ZmZjhlMScsICcjZmZlY2IzJywgJyNmZmUwODInLCAnI2ZmZDU0ZicsICcjZmZjYTI4JywgJyNmZmMxMDcnLCAnI2ZmYjMwMCcsICcjZmZhMDAwJywgJyNmZjhmMDAnLCAnI2ZmNmYwMCcsICcjZmZlNTdmJywgJyNmZmQ3NDAnLCAnI2ZmYzQwMCcsICcjZmZhYjAwJyxcbiAgICAgICAgJyNmZmYzZTAnLCAnI2ZmZTBiMicsICcjZmZjYzgwJywgJyNmZmI3NGQnLCAnI2ZmYTcyNicsICcjZmY5ODAwJywgJyNmYjhjMDAnLCAnI2Y1N2MwMCcsICcjZWY2YzAwJywgJyNlNjUxMDAnLCAnI2ZmZDE4MCcsICcjZmZhYjQwJywgJyNmZjkxMDAnLCAnI2ZmNmQwMCcsXG4gICAgICAgICcjZmJlOWU3JywgJyNmZmNjYmMnLCAnI2ZmYWI5MScsICcjZmY4YTY1JywgJyNmZjcwNDMnLCAnI2ZmNTcyMicsICcjZjQ1MTFlJywgJyNlNjRhMTknLCAnI2Q4NDMxNScsICcjYmYzNjBjJywgJyNmZjllODAnLCAnI2ZmNmU0MCcsICcjZmYzZDAwJywgJyNkZDJjMDAnLFxuICAgICAgICAnI2VmZWJlOScsICcjZDdjY2M4JywgJyNiY2FhYTQnLCAnI2ExODg3ZicsICcjOGQ2ZTYzJywgJyM3OTU1NDgnLCAnIzZkNGM0MScsICcjNWQ0MDM3JywgJyM0ZTM0MmUnLCAnIzNlMjcyMycsXG4gICAgICAgICcjZmFmYWZhJywgJyNmNWY1ZjUnLCAnI2VlZWVlZScsICcjZTBlMGUwJywgJyNiZGJkYmQnLCAnIzllOWU5ZScsICcjNzU3NTc1JywgJyM2MTYxNjEnLCAnIzQyNDI0MicsICcjMjEyMTIxJyxcbiAgICAgICAgJyNlY2VmZjEnLCAnI2NmZDhkYycsICcjYjBiZWM1JywgJyM5MGE0YWUnLCAnIzc4OTA5YycsICcjNjA3ZDhiJywgJyM1NDZlN2EnLCAnIzQ1NWE2NCcsICcjMzc0NzRmJywgJyMyNjMyMzgnLFxuICAgICAgXVxuICAgIH0pO1xuICB9XG5cblxuXG5cblxufVxuIiwiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UGFsZXR0ZX0gZnJvbSBcIi4uL25neC10dGl0YW4tY29sb3ItcGlja2VyLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLW5neC10dGl0YW4tY29sb3ItcGlja2VyLXBhbGV0dGUtbGlzdCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInBpY2tlci1wYWxldHRlLXdyYXBwZXJcIiAqbmdJZj1cInBhbGxldHMubGVuZ3RoID4gMFwiPlxuICA8ZGl2IGNsYXNzPVwicGFsZXR0ZS1saW5rc1wiPlxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwicGFsZXR0ZS1saW5rXCJcbiAgICAgICpuZ0Zvcj1cImxldCBwYWxldHRlIG9mIHBhbGxldHNcIlxuICAgICAgW25nQ2xhc3NdPVwieydzZWxlY3RlZCc6IChhY3RpdmVQYWxldHRlICE9PSBudWxsICYmIGFjdGl2ZVBhbGV0dGUuaWQgPT0gcGFsZXR0ZS5pZCl9XCJcbiAgICAgIChjbGljayk9XCJzZWxlY3RQYWxldHRlKHBhbGV0dGUpXCJcbiAgICA+XG4gICAgICB7e3BhbGV0dGUubmFtZX19XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwicGFsZXR0ZS1waWNrZXItaG9sZGVyXCIgKm5nSWY9XCJhY3RpdmVQYWxldHRlICE9PSBudWxsICYmIGFjdGl2ZVBhbGV0dGUuY29sb3JzLmxlbmd0aCA+IDBcIj5cbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cInBhbGV0dGUtY29sb3JcIlxuICAgICAgKm5nRm9yPVwibGV0IGNvbG9yIG9mIGFjdGl2ZVBhbGV0dGUuY29sb3JzXCJcbiAgICAgIFtuZ1N0eWxlXT1cIntcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBjb2xvclxuICAgICAgfVwiXG4gICAgICAoY2xpY2spPVwiY29sb3JTZWxlY3RlZChjb2xvcilcIlxuICAgID5cblxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYDpob3N0IC5waWNrZXItcGFsZXR0ZS13cmFwcGVyIC5wYWxldHRlLWxpbmtze2Rpc3BsYXk6ZmxleDtmbGV4LXdyYXA6d3JhcDttYXJnaW4tYm90dG9tOjVweH06aG9zdCAucGlja2VyLXBhbGV0dGUtd3JhcHBlciAucGFsZXR0ZS1saW5rcyAucGFsZXR0ZS1saW5re21hcmdpbi1yaWdodDo1cHg7Ym9yZGVyLXJhZGl1czozcHg7cGFkZGluZzoycHggNHB4O2JvcmRlcjoxcHggc29saWQgI2RkZDt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7Zm9udC1zaXplOjEwcHg7Zm9udC1mYW1pbHk6LWFwcGxlLXN5c3RlbSxCbGlua01hY1N5c3RlbUZvbnQsU2FuIEZyYW5jaXNjbyxSb2JvdG8sU2Vnb2UgVUksSGVsdmV0aWNhIE5ldWUsc2Fucy1zZXJpZjtmb250LXdlaWdodDo2MDA7YmFja2dyb3VuZC1jb2xvcjojZmZmO2N1cnNvcjpwb2ludGVyfTpob3N0IC5waWNrZXItcGFsZXR0ZS13cmFwcGVyIC5wYWxldHRlLWxpbmtzIC5wYWxldHRlLWxpbmsuc2VsZWN0ZWR7YmFja2dyb3VuZC1jb2xvcjojNWU2YmM1O2NvbG9yOiNmZmZ9Omhvc3QgLnBpY2tlci1wYWxldHRlLXdyYXBwZXIgLnBhbGV0dGUtcGlja2VyLWhvbGRlcntoZWlnaHQ6MTY1cHg7ZGlzcGxheTpmbGV4O2ZsZXgtd3JhcDp3cmFwO2FsaWduLWl0ZW1zOmZsZXgtc3RhcnQ7anVzdGlmeS1jb250ZW50OmZsZXgtc3RhcnQ7YWxpZ24tY29udGVudDpiYXNlbGluZX06aG9zdCAucGlja2VyLXBhbGV0dGUtd3JhcHBlciAucGFsZXR0ZS1waWNrZXItaG9sZGVyIC5wYWxldHRlLWNvbG9ye2N1cnNvcjpwb2ludGVyO3dpZHRoOjEwcHg7aGVpZ2h0OjEwcHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4VFRpdGFuQ29sb3JQaWNrZXJQYWxldHRlTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCdwYWxsZXRzJykgcHVibGljIHBhbGxldHM6IEFycmF5PFBhbGV0dGU+ID0gW107XG4gIEBPdXRwdXQoJ2NoYW5nZScpIHB1YmxpYyBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgcHVibGljIGFjdGl2ZVBhbGV0dGU6IFBhbGV0dGUgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBjbG9zZVBhbGV0dGUoKSB7XG4gICAgdGhpcy5hY3RpdmVQYWxldHRlID0gbnVsbDtcbiAgfVxuXG4gIHNlbGVjdFBhbGV0dGUocGFsZXR0ZTogUGFsZXR0ZSkge1xuICAgIGlmKFxuICAgICAgdGhpcy5hY3RpdmVQYWxldHRlID09IG51bGxcbiAgICApIHtcbiAgICAgIHRoaXMuYWN0aXZlUGFsZXR0ZSA9IHBhbGV0dGU7XG4gICAgfSBlbHNlIGlmICh0aGlzLmFjdGl2ZVBhbGV0dGUuaWQgIT09IHBhbGV0dGUuaWQpIHtcbiAgICAgIHRoaXMuYWN0aXZlUGFsZXR0ZSA9IHBhbGV0dGU7XG4gICAgfVxuXG4gIH1cblxuICBjb2xvclNlbGVjdGVkKGNvbG9yKSB7XG4gICAgdGhpcy5jaGFuZ2UuZW1pdChjb2xvcik7XG4gIH1cblxufVxuIiwiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIENvbnRlbnRDaGlsZCwgQ29udGVudENoaWxkcmVuLCBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JEaXJlY3RpdmV9IGZyb20gXCIuL25neC10dGl0YW4tY29sb3ItcGlja2VyLXNlbGVjdG9yLmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHtIU1ZBLCBOZ3hUVGl0YW5Db2xvclBpY2tlclNlcnZpY2UsIFBhbGV0dGV9IGZyb20gXCIuL25neC10dGl0YW4tY29sb3ItcGlja2VyLnNlcnZpY2VcIjtcbmltcG9ydCB7Tmd4VFRpdGFuQ29sb3JQaWNrZXJJbnB1dERpcmVjdGl2ZX0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXItaW5wdXQuZGlyZWN0aXZlXCI7XG5pbXBvcnQge05neFRUaXRhbkNvbG9yUGlja2VyUGFsZXR0ZUxpc3RDb21wb25lbnR9IGZyb20gXCIuL25neC10dGl0YW4tY29sb3ItcGlja2VyLXBhbGV0dGUtbGlzdC9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1wYWxldHRlLWxpc3QuY29tcG9uZW50XCI7XG4vL1tuZ1N0eWxlXT1cIntiYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KHRvIHRvcCwgJyArIG5neFRUaXRhbkNvbG9yUGlja2VyU2VydmljZS5jdXJyZW50Q29sb3IgKyAnIDE4cHgsIHJnYigyNTUsIDc3LCAyNTUpIGNhbGMoMTAwJSAtIDE4cHgpJ31cIlxuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzZWxlY3RvcjogJ2xpYi1uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcicsXG4gIHRlbXBsYXRlOiBgPGRpdlxyXG4gIGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXItd3JhcHBlclwiXHJcbj5cclxuXHJcbiAgPGRpdiBjbGFzcz1cInBpY2tlci1pbnB1dC13cmFwcGVyXCI+XHJcbiAgICA8ZGl2XHJcbiAgICAgIFtuZ1N0eWxlXT1cIntiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yfVwiXHJcbiAgICAgIGNsYXNzPVwiZGVidWctb3V0cHV0XCJcclxuICAgICAgKm5nSWY9XCJjb2xvclBpY2tlclNlcnZpY2UuZGVidWdcIlxyXG4gICAgPlxyXG4gICAgICB7e2NvbG9yfX1cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cInBpY2tlci1pbnB1dC1sYWJlbFwiPlxyXG4gICAgICA8bGFiZWwgW2Zvcl09XCJ1dWlkXCIgPnt7dGl0bGV9fTwvbGFiZWw+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItaW5wdXQtaG9sZGVyXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItY29sb3JcIiBbbmdTdHlsZV09XCJ7YmFja2dyb3VuZDogY3VycmVudENvbG9yQWxwaGF9XCI+XHJcblxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1pbnB1dFwiPlxyXG4gICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJJbnB1dFxyXG4gICAgICAgICAgI3BpY2tlcklucHV0PVwibGliTmd4VFRpdGFuQ29sb3JQaWNrZXJJbnB1dFwiXHJcbiAgICAgICAgICAoaW5wdXRDaGFuZ2UpPVwiaW5wdXRDb2xvckNoYW5nZSgkZXZlbnQpXCJcclxuICAgICAgICAgIFtmb3JtYXRdPVwiaW5wdXRGb3JtYXRcIlxyXG4gICAgICAgICAgW2lkXT1cInV1aWRcIlxyXG4gICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgKGZvY3VzKT1cIm9wZW5QaWNrZXIoKVwiXHJcbiAgICAgICAgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDwhLS08ZGl2IGNsYXNzPVwicGlja2VyLXNhdmUtc2lnblwiPi0tPlxyXG4gICAgICA8IS0tUy0tPlxyXG4gICAgICA8IS0tPC9kaXY+LS0+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyXCIgW25nQ2xhc3NdPVwieyduby1hbHBoYSc6ICFhbHBoYSwgJ29wZW4nOiBwaWNrZXJPcGVufVwiPlxyXG4gICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19NYWluQ29sb3JcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19Db2xvckxheWVyXCIgW25nU3R5bGVdPVwie2JhY2tncm91bmRDb2xvcjogY3VycmVudENvbG9yTWF4fVwiID48L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19TbGlkYWJsZVwiIGxpYk5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3IgI21haW5Db2xvcj1cImxpYk5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JcIiAoY2hhbmdlKT1cImNvbG9yUGlja2VyU2VydmljZS5zYXR1cmF0aW9uQ2hhbmdlKCRldmVudCwgdGhpcylcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0RyYWdnZXJcIiBsaWJOZ3hUVGl0YW5Db2xvclBpY2tlckRyYWdnZXIgc3R5bGU9XCJ0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDBweCwgMHB4LCAwcHgpO1wiPjwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19IdWVQaWNrZXJcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19TbGlkYWJsZVwiICBsaWJOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yICNodWVQaWNrZXI9XCJsaWJOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yXCIgKGNoYW5nZSk9XCJjb2xvclBpY2tlclNlcnZpY2UuaHVlQ2hhbmdlKCRldmVudCwgdGhpcylcIiBbZGlyZWN0aW9uXT1cIid2ZXJ0aWNhbCdcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0RyYWdnZXJcIiBsaWJOZ3hUVGl0YW5Db2xvclBpY2tlckRyYWdnZXIgW3BpY2tlclBhZF09XCIwXCIgc3R5bGU9XCIgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwcHgsIDBweCwgMHB4KTtcIj48L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fQWxwaGFQaWNrZXJcIiAqbmdJZj1cImFscGhhID09PSB0cnVlXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fQ29sb3JMYXllclwiXHJcblxyXG4gICAgICAgICAgIFtuZ1N0eWxlXT1cIntiYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KHRvIHRvcCwgJyArIGN1cnJlbnRDb2xvckFscGhhWmVybyArICcgIDE4cHgsICcgKyBjdXJyZW50Q29sb3IgKyAnIGNhbGMoMTAwJSAtIDE4cHgpJ31cIlxyXG4gICAgICA+PC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fU2xpZGFibGVcIiAgbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvciAjYWxwaGFQaWNrZXI9XCJsaWJOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yXCIgKGNoYW5nZSk9XCJjb2xvclBpY2tlclNlcnZpY2UuYWxwaGFDaGFuZ2UoJGV2ZW50LCB0aGlzKVwiIFtkaXJlY3Rpb25dPVwiJ3ZlcnRpY2FsJ1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fRHJhZ2dlclwiIGxpYk5neFRUaXRhbkNvbG9yUGlja2VyRHJhZ2dlciBbcGlja2VyUGFkXT1cIjBcIiBzdHlsZT1cIiB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDBweCwgMHB4LCAwcHgpO1wiPjwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPCEtLTxkaXYgc3R5bGU9XCJoZWlnaHQ6IDQwcHg7IHdpZHRoOiA0MHB4XCIgW25nU3R5bGVdPVwie2JhY2tncm91bmQ6IGN1cnJlbnRDb2xvcn1cIj4tLT5cclxuXHJcbiAgICA8IS0tPC9kaXY+LS0+XHJcbiAgICA8IS0tPGRpdiBzdHlsZT1cImhlaWdodDogNDBweDsgd2lkdGg6IDQwcHhcIiBbbmdTdHlsZV09XCJ7YmFja2dyb3VuZDogY3VycmVudENvbG9yQWxwaGF9XCI+LS0+XHJcblxyXG4gICAgPCEtLTwvZGl2Pi0tPlxyXG4gIDwvZGl2PlxyXG4gIDxsaWItbmd4LXR0aXRhbi1jb2xvci1waWNrZXItcGFsZXR0ZS1saXN0XHJcbiAgICAoY2hhbmdlKT1cImlucHV0Q29sb3JDaGFuZ2UoJGV2ZW50KVwiXHJcbiAgICBbcGFsbGV0c109XCJwaWNrZXJQYWxsZXRzXCJcclxuICA+XHJcblxyXG4gIDwvbGliLW5neC10dGl0YW4tY29sb3ItcGlja2VyLXBhbGV0dGUtbGlzdD5cclxuPC9kaXY+XHJcblxyXG5gLFxuICBzdHlsZXM6IFtgOmhvc3QgKiw6aG9zdCA6YWZ0ZXIsOmhvc3QgOmJlZm9yZXtib3gtc2l6aW5nOmJvcmRlci1ib3h9Omhvc3QgLmRlYnVnLW91dHB1dHt3aWR0aDoxMDAlO2hlaWdodDoyMHB4fTpob3N0IC5waWNrZXItaW5wdXQtd3JhcHBlcnttYXJnaW4tYm90dG9tOjZweH06aG9zdCAucGlja2VyLWlucHV0LXdyYXBwZXIgLnBpY2tlci1pbnB1dC1sYWJlbHttYXJnaW4tYm90dG9tOjZweH06aG9zdCAucGlja2VyLWlucHV0LXdyYXBwZXIgLnBpY2tlci1pbnB1dC1sYWJlbCBsYWJlbHt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7Zm9udC13ZWlnaHQ6NjAwfTpob3N0IC5waWNrZXItaW5wdXQtd3JhcHBlciAucGlja2VyLWlucHV0LWhvbGRlcntkaXNwbGF5OmZsZXg7aGVpZ2h0OjMzcHg7Ym9yZGVyOjFweCBzb2xpZCAjYmJiO292ZXJmbG93OmhpZGRlbjtib3JkZXItcmFkaXVzOjNweDtiYWNrZ3JvdW5kLWNvbG9yOiNlZWV9Omhvc3QgLnBpY2tlci1pbnB1dC13cmFwcGVyIC5waWNrZXItaW5wdXQtaG9sZGVyIC5waWNrZXItY29sb3J7ZmxleDowIDAgMzFweDtiYWNrZ3JvdW5kLWNvbG9yOiNmZjAzMDB9Omhvc3QgLnBpY2tlci1pbnB1dC13cmFwcGVyIC5waWNrZXItaW5wdXQtaG9sZGVyIC5waWNrZXItaW5wdXR7ZmxleDphdXRvO2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnR9Omhvc3QgLnBpY2tlci1pbnB1dC13cmFwcGVyIC5waWNrZXItaW5wdXQtaG9sZGVyIC5waWNrZXItaW5wdXQgaW5wdXR7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtjb2xvcjojMjcyNzI3O2ZvbnQtZmFtaWx5Om1vbm9zcGFjZTtmb250LXNpemU6MTRweDtib3JkZXI6bm9uZTtvdXRsaW5lOjA7cGFkZGluZzo4cHggMnB4IDhweCA4cHg7d2lkdGg6MTAwJX06aG9zdCAucGlja2VyLWlucHV0LXdyYXBwZXIgLnBpY2tlci1pbnB1dC1ob2xkZXIgLnBpY2tlci1zYXZlLXNpZ257ZmxleDowIDAgMzFweDtsaW5lLWhlaWdodDozM3B4O3RleHQtYWxpZ246Y2VudGVyfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcnttYXgtaGVpZ2h0OjA7b3ZlcmZsb3c6aGlkZGVuOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZTtkaXNwbGF5OmZsZXg7dHJhbnNpdGlvbjptYXgtaGVpZ2h0IC4zc306aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXIub3BlbnttYXJnaW4tYm90dG9tOjVweDttYXgtaGVpZ2h0OjE2NXB4fTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fQ29sb3JMYXllcntwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjEwO3RvcDowO2xlZnQ6MDtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO2JveC1zaGFkb3c6aW5zZXQgMCAwIDJweCAwIHJnYmEoMCwwLDAsLjUpO3BvaW50ZXItZXZlbnRzOm5vbmV9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19TbGlkYWJsZXtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO2N1cnNvcjpwb2ludGVyfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fRHJhZ2dlcntwb3NpdGlvbjpyZWxhdGl2ZTt6LWluZGV4OjMwO2JvdHRvbTouOXJlbTstd2Via2l0LXRyYW5zZm9ybTpub25lO3RyYW5zZm9ybTpub25lO2hlaWdodDoxOHB4O3dpZHRoOjE4cHg7bWFyZ2luOjAgYXV0bzstd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuO2JhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuO3dpbGwtY2hhbmdlOnRyYW5zZm9ybTtiYWNrZ3JvdW5kOjAgMDtib3JkZXI6M3B4IHNvbGlkICNmZmY7Ym94LXNoYWRvdzowIDAgMCAxcHggcmdiYSg2LDQ0LDgyLC4xKSwwIDJweCAxNnB4IHJnYmEoMzMsNDMsNTQsLjA4KSxpbnNldCAwIDAgMCAxcHggcmdiYSg2LDQ0LDgyLC4xKSwwIDJweCAxNnB4IHJnYmEoMzMsNDMsNTQsLjA4KTtib3JkZXItcmFkaXVzOjUwJTtwb2ludGVyLWV2ZW50czpub25lO3RvdWNoLWFjdGlvbjpub25lfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fTWFpbkNvbG9ye2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KDQ1ZGVnLCNkZmUzZTggMjUlLHRyYW5zcGFyZW50IDApLGxpbmVhci1ncmFkaWVudCgtNDVkZWcsI2RmZTNlOCAyNSUsdHJhbnNwYXJlbnQgMCksbGluZWFyLWdyYWRpZW50KDQ1ZGVnLHRyYW5zcGFyZW50IDc1JSwjZGZlM2U4IDApLGxpbmVhci1ncmFkaWVudCgtNDVkZWcsdHJhbnNwYXJlbnQgNzUlLCNkZmUzZTggMCk7YmFja2dyb3VuZC1zaXplOjEuNnJlbSAxLjZyZW07YmFja2dyb3VuZC1wb3NpdGlvbjowIDAsMCAuOHJlbSwuOHJlbSAtLjhyZW0sLS44cmVtIDA7cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6aGlkZGVuO3dpZHRoOjE2NXB4O2hlaWdodDoxNjVweDtib3JkZXItcmFkaXVzOjRweDtjdXJzb3I6cG9pbnRlcn06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX01haW5Db2xvciAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0NvbG9yTGF5ZXJ7Ym94LXNoYWRvdzppbnNldCAwIDAgMCAxcHggcmdiYSg2LDQ0LDgyLC4xKSwwIDJweCAxNnB4IHJnYmEoMzMsNDMsNTQsLjA4KTtib3JkZXItcmFkaXVzOjRweH06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX01haW5Db2xvciAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0RyYWdnZXJ7cmlnaHQ6LjlyZW07bWFyZ2luOjB9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19NYWluQ29sb3I6YWZ0ZXIsOmhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19NYWluQ29sb3I6YmVmb3Jle2NvbnRlbnQ6XCJcIjtwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjIwO3RvcDowO2xlZnQ6MDtkaXNwbGF5OmJsb2NrO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7cG9pbnRlci1ldmVudHM6bm9uZTtib3JkZXItcmFkaXVzOjNweH06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX01haW5Db2xvcjpiZWZvcmV7YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoOTBkZWcsI2ZmZix0cmFuc3BhcmVudCl9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19NYWluQ29sb3I6YWZ0ZXJ7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQoMGRlZywjMDAwLHRyYW5zcGFyZW50KTtib3gtc2hhZG93Omluc2V0IDAgMCAwIDFweCByZ2JhKDYsNDQsODIsLjEpLDAgMnB4IDE2cHggcmdiYSgzMyw0Myw1NCwuMDgpfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fQWxwaGFQaWNrZXIsOmhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19IdWVQaWNrZXJ7cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6aGlkZGVuO2hlaWdodDoxNjVweDt3aWR0aDoyNHB4O21hcmdpbi1sZWZ0Oi44cmVtO2JvcmRlci13aWR0aDozcHg7Ym9yZGVyLXJhZGl1czo4cmVtO3BhZGRpbmc6MTNweCAwfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fSHVlUGlja2Vye2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSxyZWQgMCwjZmYwIDIxJSwjMGYwIDMzJSwjMGZmIDUwJSwjMDBmIDY3JSwjZjBmIDgzJSxyZWQgMTAwJSk7Ym94LXNoYWRvdzppbnNldCAwIDAgMnB4IDAgcmdiYSgwLDAsMCwuNSl9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19BbHBoYVBpY2tlcntiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudCg0NWRlZywjZGZlM2U4IDI1JSx0cmFuc3BhcmVudCAwKSxsaW5lYXItZ3JhZGllbnQoLTQ1ZGVnLCNkZmUzZTggMjUlLHRyYW5zcGFyZW50IDApLGxpbmVhci1ncmFkaWVudCg0NWRlZyx0cmFuc3BhcmVudCA3NSUsI2RmZTNlOCAwKSxsaW5lYXItZ3JhZGllbnQoLTQ1ZGVnLHRyYW5zcGFyZW50IDc1JSwjZGZlM2U4IDApO2JhY2tncm91bmQtc2l6ZToxLjZyZW0gMS42cmVtO2JhY2tncm91bmQtcG9zaXRpb246MCAwLDAgLjhyZW0sLjhyZW0gLS44cmVtLC0uOHJlbSAwfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fQWxwaGFQaWNrZXIgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19Db2xvckxheWVye2JvcmRlci1yYWRpdXM6OHJlbX06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXIubm8tYWxwaGEgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19NYWluQ29sb3J7d2lkdGg6MjAwcHh9YF0sXG59KVxuZXhwb3J0IGNsYXNzIE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pIGNvbXBvbmVudENsaWNrKCRldmVudCkge1xuICAgIGlmKCF0aGlzLnBpY2tlck9wZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYodHlwZW9mICRldmVudC5wYXRoICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBsZXQgcGlja2VyRm91bmQgPSBmYWxzZTtcbiAgICAgICRldmVudC5wYXRoLmV2ZXJ5KGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgaWYoXG4gICAgICAgICAgdHlwZW9mIGl0ZW0uY2xhc3NMaXN0ICE9PSBcInVuZGVmaW5lZFwiXG4gICAgICAgICkge1xuICAgICAgICAgIGlmKFxuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ3BpY2tlci1pbnB1dC1ob2xkZXInKSB8fFxuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ25neC10dGl0YW4tY29sb3ItcGlja2VyJylcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHBpY2tlckZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0pO1xuXG4gICAgICBpZighcGlja2VyRm91bmQpIHtcbiAgICAgICAgdGhpcy5jbG9zZVBpY2tlcigpO1xuICAgICAgfVxuXG4gICAgfVxuICB9XG5cbiAgQElucHV0KCdhbHBoYScpIHB1YmxpYyBhbHBoYTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoJ2RlYnVnJykgcHVibGljIGRlYnVnOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgnY29sb3InKSBwdWJsaWMgY29sb3I6IHN0cmluZyA9ICdyZ2JhKDI1NSwyNTUsMjU1LDApJztcbiAgQElucHV0KCd0aXRsZScpIHB1YmxpYyB0aXRsZTogc3RyaW5nID0gJ3RpdGxlJztcbiAgQElucHV0KCdvdXRGb3JtYXQnKSBwdWJsaWMgb3V0Rm9ybWF0OiBzdHJpbmcgPSAnaGV4Nic7XG4gIEBJbnB1dCgnaW5wdXRGb3JtYXQnKSBwdWJsaWMgaW5wdXRGb3JtYXQ6IHN0cmluZyA9ICdoZXg2JztcbiAgQElucHV0KCdhdmFpbFBhbGxldHMnKSBwdWJsaWMgYXZhaWxQYWxsZXRzOiBBcnJheTxzdHJpbmc+ID0gWydwb2xhcmlzJywgJ21hdGVyaWFsJ107XG4gIEBJbnB1dCgnY3VzdG9tUGFsbGV0cycpIHB1YmxpYyBjdXN0b21QYWxsZXRzOiAgQXJyYXk8UGFsZXR0ZT4gPSBbXTtcbiAgQE91dHB1dCgnY29sb3JDaGFuZ2VkJykgcHVibGljIGNvbG9yQ2hhbmdlZDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBAVmlld0NoaWxkKCdwaWNrZXJJbnB1dCcpIHB1YmxpYyBwaWNrZXJJbnB1dDogTmd4VFRpdGFuQ29sb3JQaWNrZXJJbnB1dERpcmVjdGl2ZTtcblxuICBAVmlld0NoaWxkKE5neFRUaXRhbkNvbG9yUGlja2VyUGFsZXR0ZUxpc3RDb21wb25lbnQpIHB1YmxpYyBwYWxldHRlTGlzdDogTmd4VFRpdGFuQ29sb3JQaWNrZXJQYWxldHRlTGlzdENvbXBvbmVudDtcblxuICBAVmlld0NoaWxkKCdtYWluQ29sb3InKSBwdWJsaWMgbWFpbkNvbG9yOiBOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yRGlyZWN0aXZlO1xuICBAVmlld0NoaWxkKCdodWVQaWNrZXInKSBwdWJsaWMgaHVlUGlja2VyOiBOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yRGlyZWN0aXZlO1xuICBAVmlld0NoaWxkKCdhbHBoYVBpY2tlcicpIHB1YmxpYyBhbHBoYVBpY2tlcjogTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvckRpcmVjdGl2ZTtcblxuXG4gIHB1YmxpYyBjb2xvckluaXQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIHBpY2tlck9wZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwdWJsaWMgcGlja2VyUGFsbGV0czogQXJyYXk8UGFsZXR0ZT4gPSBbXTtcblxuICBwdWJsaWMgaHN2YTogSFNWQSA9IHtcbiAgICBodWU6IDAsXG4gICAgc2F0dXJhdGlvbjogMTAwLFxuICAgIHZhbHVlOiAxMDAsXG4gICAgYWxwaGE6IDFcbiAgfTtcblxuICBwdWJsaWMgY3VycmVudENvbG9yOiBzdHJpbmcgPSAncmdiKDI1NSwwLDApJztcbiAgcHVibGljIGN1cnJlbnRDb2xvck1heDogc3RyaW5nID0gJ3JnYmEoMjU1LDAsMCwxKSc7XG4gIHB1YmxpYyBjdXJyZW50Q29sb3JBbHBoYTogc3RyaW5nID0gJ3JnYmEoMjU1LDAsMCwxKSc7XG4gIHB1YmxpYyBjdXJyZW50Q29sb3JBbHBoYVplcm86IHN0cmluZyA9ICdyZ2JhKDI1NSwwLDAsMCknO1xuXG4gIHB1YmxpYyB1dWlkOiBzdHJpbmcgPSAncGlja2VyLSc7XG5cbiAgcHVibGljIGFsbG93ZWRGb3JtYXRzOiBBcnJheTxzdHJpbmc+ID0gWydoZXg2JywgJ2hleDgnLCAncmdiJywgJ3JnYmEnXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgY29sb3JQaWNrZXJTZXJ2aWNlOiBOZ3hUVGl0YW5Db2xvclBpY2tlclNlcnZpY2UsXG4gICAgcHVibGljIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7XG4gICAgdGhpcy51dWlkID0gdGhpcy5jb2xvclBpY2tlclNlcnZpY2UuZ2V0UGlja2VyVXVpZCgpO1xuXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNvbG9yUGlja2VyU2VydmljZS5kZWJ1ZyA9IHRoaXMuZGVidWc7XG4gICAgdGhpcy52YWxpZGF0ZUlucHV0UGFyYW1zKCk7XG4gICAgdGhpcy5jb2xvclBpY2tlclNlcnZpY2UucHJlcGFyZVBpY2tlclBhbGxldHModGhpcy5hdmFpbFBhbGxldHMsIHRoaXMuY3VzdG9tUGFsbGV0cywgdGhpcyk7XG4gICAgdGhpcy5jb2xvclBpY2tlclNlcnZpY2UuY29sb3JUb0RhdGEodGhpcy5jb2xvciwgdGhpcyk7XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5zZXREcmFnZ2VzVG9DdXJyZW50Q29sb3IoKTtcbiAgfVxuXG4gIG9wZW5QaWNrZXIoKSB7XG4gICAgdGhpcy5waWNrZXJPcGVuID0gdHJ1ZTtcbiAgICBpZih0eXBlb2YgdGhpcy5wYWxldHRlTGlzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMucGFsZXR0ZUxpc3QuY2xvc2VQYWxldHRlKCk7XG4gICAgfVxuICAgIGlmKHR5cGVvZiB0aGlzLm1haW5Db2xvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMubWFpbkNvbG9yLmV2ZW50c1N1YnNjaWJlKCk7XG4gICAgfVxuICAgIGlmKHR5cGVvZiB0aGlzLmh1ZVBpY2tlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMuaHVlUGlja2VyLmV2ZW50c1N1YnNjaWJlKCk7XG4gICAgfVxuICAgIGlmKHR5cGVvZiB0aGlzLmFscGhhUGlja2VyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5hbHBoYVBpY2tlci5ldmVudHNTdWJzY2liZSgpO1xuICAgIH1cbiAgfVxuXG4gIGNsb3NlUGlja2VyKCkge1xuICAgIGlmKHR5cGVvZiB0aGlzLm1haW5Db2xvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMubWFpbkNvbG9yLmV2ZW50c1VuU3Vic2NpYmUoKTtcbiAgICB9XG4gICAgaWYodHlwZW9mIHRoaXMuaHVlUGlja2VyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5odWVQaWNrZXIuZXZlbnRzVW5TdWJzY2liZSgpO1xuICAgIH1cbiAgICBpZih0eXBlb2YgdGhpcy5hbHBoYVBpY2tlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMuYWxwaGFQaWNrZXIuZXZlbnRzVW5TdWJzY2liZSgpO1xuICAgIH1cbiAgICB0aGlzLnBpY2tlck9wZW4gPSBmYWxzZTtcbiAgfVxuXG4gIHZhbGlkYXRlSW5wdXRQYXJhbXMoKSB7XG4gICAgaWYodGhpcy5hbGxvd2VkRm9ybWF0cy5pbmRleE9mKHRoaXMub3V0Rm9ybWF0KSA9PT0gLTEpIHtcbiAgICAgIHRoaXMub3V0Rm9ybWF0ID0gJ2hleDYnO1xuICAgICAgY29uc29sZS5ncm91cChcIm5neC10dGl0YW4tY29sb3ItcGlja2VyXCIpO1xuICAgICAgY29uc29sZS53YXJuKCdbb3V0Rm9ybWF0XSBtdXN0IGJlIG9uZSBvZiB0aGlzICgnICsgdGhpcy5hbGxvd2VkRm9ybWF0cy5qb2luKCcsJykgKyAnKScpO1xuICAgICAgY29uc29sZS5ncm91cEVuZCgpO1xuICAgIH1cbiAgICBpZih0aGlzLmFsbG93ZWRGb3JtYXRzLmluZGV4T2YodGhpcy5pbnB1dEZvcm1hdCkgPT09IC0xKSB7XG4gICAgICB0aGlzLmlucHV0Rm9ybWF0ID0gdGhpcy5vdXRGb3JtYXQgKyAnJztcbiAgICAgIGNvbnNvbGUuZ3JvdXAoXCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlclwiKTtcbiAgICAgIGNvbnNvbGUud2FybignW2lucHV0Rm9ybWF0XSBtdXN0IGJlIG9uZSBvZiB0aGlzICgnICsgdGhpcy5hbGxvd2VkRm9ybWF0cy5qb2luKCcsJykgKyAnKScpO1xuICAgICAgY29uc29sZS5ncm91cEVuZCgpO1xuICAgIH1cbiAgfVxuXG5cbiAgaW5wdXRDb2xvckNoYW5nZShjb2xvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgIHRoaXMuY29sb3JQaWNrZXJTZXJ2aWNlLmNvbG9yVG9EYXRhKHRoaXMuY29sb3IsIHRoaXMpO1xuICAgIHRoaXMuc2V0RHJhZ2dlc1RvQ3VycmVudENvbG9yKCk7XG4gIH1cblxuICB1cGRhdGVSZXR1cm5Db2xvcigpIHtcbiAgICB0aGlzLmNvbG9yID0gdGhpcy5jb2xvclBpY2tlclNlcnZpY2UucHJlcGFyZVJldHVybkNvbG9yKHRoaXMuaHN2YSwgdGhpcy5vdXRGb3JtYXQpO1xuXG4gICAgaWYodGhpcy5jb2xvckluaXQpIHtcbiAgICAgIHRoaXMuY29sb3JDaGFuZ2VkLmVtaXQodGhpcy5jb2xvciArICcnKTtcbiAgICB9XG4gICAgdGhpcy5jb2xvckluaXQgPSB0cnVlO1xuICB9XG5cblxuICBzZXRJbnB1dFZhbHVlKCkge1xuICAgIGlmKHR5cGVvZiB0aGlzLnBpY2tlcklucHV0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5waWNrZXJJbnB1dC5zZXRJbnB1dFZhbHVlKFxuICAgICAgICB0aGlzLmNvbG9yUGlja2VyU2VydmljZS5wcmVwYXJlUmV0dXJuQ29sb3IodGhpcy5oc3ZhLCB0aGlzLmlucHV0Rm9ybWF0KVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBzZXREcmFnZ2VzVG9DdXJyZW50Q29sb3IoKSB7XG5cbiAgICBpZih0eXBlb2YgdGhpcy5tYWluQ29sb3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLm1haW5Db2xvci5zZXREcmFnZ2VyKFxuICAgICAgICB7XG4gICAgICAgICAgeDogdGhpcy5oc3ZhLnNhdHVyYXRpb24sXG4gICAgICAgICAgeTogMTAwIC0gdGhpcy5oc3ZhLnZhbHVlXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYodHlwZW9mIHRoaXMuaHVlUGlja2VyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5odWVQaWNrZXIuc2V0RHJhZ2dlcih7eDogMCwgeTogTWF0aC5yb3VuZCh0aGlzLmhzdmEuaHVlICogMTAwIC8gMzYwKX0pO1xuICAgIH1cblxuICAgIGlmKHR5cGVvZiB0aGlzLmFscGhhUGlja2VyICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLmFscGhhKSB7XG4gICAgICB0aGlzLmFscGhhUGlja2VyLnNldERyYWdnZXIoe3g6IDAsIHk6IDEwMCAtICh0aGlzLmhzdmEuYWxwaGEgKiAxMDApfSk7XG4gICAgfVxuXG4gIH1cblxufVxuIiwiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tsaWJOZ3hUVGl0YW5Db2xvclBpY2tlckRyYWdnZXJdJ1xufSlcbmV4cG9ydCBjbGFzcyBOZ3hUVGl0YW5Db2xvclBpY2tlckRyYWdnZXJEaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgncGlja2VyUGFkJykgcHVibGljIHBpY2tlclBhZDogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxSZWY6IEVsZW1lbnRSZWYpIHsgfVxuXG5cbiAgcHVibGljIHNldFBvc2l0aW9uKHg6IG51bWJlciwgeTogbnVtYmVyLCBkaXJlY3Rpb246IHN0cmluZyk6IHZvaWQge1xuXG4gICAgbGV0IHJlY3QgPSB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICBpZihkaXJlY3Rpb24gPT0gJ3ZlcnRpY2FsJyB8fCBkaXJlY3Rpb24gPT0gJ2JvdGgnKSB7XG4gICAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gTWF0aC5yb3VuZCgoeSAtICgocmVjdC5oZWlnaHQpIC8gMikpKSArICdweCc7XG4gICAgfVxuICAgIGlmKGRpcmVjdGlvbiA9PSAnaG9yaXpvbnRhbCcgfHwgZGlyZWN0aW9uID09ICdib3RoJykge1xuICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSBNYXRoLnJvdW5kKCh4IC0gKChyZWN0LndpZHRoKSAvIDIpKSkgKyAncHgnO1xuICAgIH1cblxuICB9XG5cbn1cbiIsImltcG9ydCB7XG4gIENvbnRlbnRDaGlsZCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05neFRUaXRhbkNvbG9yUGlja2VyRHJhZ2dlckRpcmVjdGl2ZX0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXItZHJhZ2dlci5kaXJlY3RpdmVcIjtcbi8vIGltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uLCBvZn0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7ZnJvbUV2ZW50LCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtOZ3hUVGl0YW5Db2xvclBpY2tlclNlcnZpY2V9IGZyb20gXCIuL25neC10dGl0YW4tY29sb3ItcGlja2VyLnNlcnZpY2VcIjtcblxuZXhwb3J0IGludGVyZmFjZSBDdXN0b21SZWN0IHtcbiAgaGVpZ2h0OiBudW1iZXIsXG4gIGxlZnQ6IG51bWJlcixcbiAgdG9wOiBudW1iZXIsXG4gIHdpZHRoOiBudW1iZXJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDdXN0b21QZXJjZW50IHtcbiAgeDogbnVtYmVyLFxuICB5OiBudW1iZXIsXG59XG5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2xpYk5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JdJyxcbiAgZXhwb3J0QXM6ICdsaWJOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yJ1xufSlcbmV4cG9ydCBjbGFzcyBOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXR7XG5cbiAgQElucHV0KCdkaXJlY3Rpb24nKSBwdWJsaWMgZGlyZWN0aW9uOiBzdHJpbmcgPSAnYm90aCc7XG5cbiAgQENvbnRlbnRDaGlsZChOZ3hUVGl0YW5Db2xvclBpY2tlckRyYWdnZXJEaXJlY3RpdmUpIHB1YmxpYyBkcmFnZ2VyOiBOZ3hUVGl0YW5Db2xvclBpY2tlckRyYWdnZXJEaXJlY3RpdmUgPSBudWxsO1xuXG4gIEBPdXRwdXQoJ2NoYW5nZScpIHB1YmxpYyBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxDdXN0b21QZXJjZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Q3VzdG9tUGVyY2VudD4oKTtcblxuICBwdWJsaWMgZWw6IEhUTUxFbGVtZW50ID0gbnVsbDtcbiAgcHVibGljIGRyYWdTdGFydDogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgZ2xvYmFsTW91c2VNb3ZlOiBTdWJzY3JpcHRpb24gPSBudWxsO1xuICBwdWJsaWMgZ2xvYmFsTW91c2VVcDogU3Vic2NyaXB0aW9uID0gbnVsbDtcblxuXG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2Vkb3duJywgWyckZXZlbnQnXSkgcHVibGljIG9uTW91c2VEb3duKCRldmVudCkge1xuICAgIHRoaXMuZHJhZ1N0YXJ0ID0gdHJ1ZTtcbiAgICB0aGlzLmdldFBvc2l0aW9uKCRldmVudCk7XG4gIH1cblxuXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsUmVmOiBFbGVtZW50UmVmLFxuICAgIHB1YmxpYyBjb2xvclBpY2tlclNlcnZpY2U6IE5neFRUaXRhbkNvbG9yUGlja2VyU2VydmljZVxuICApIHtcbiAgICB0aGlzLmVsID0gdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuZGlyZWN0aW9uID0gKFsnYm90aCcsICd2ZXJ0aWNhbCcsICdob3Jpem9udGFsJ10uaW5kZXhPZih0aGlzLmRpcmVjdGlvbikgPT09IC0xKSA/ICdib3RoJyA6IHRoaXMuZGlyZWN0aW9uO1xuXG5cblxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG5cblxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICB0aGlzLmV2ZW50c1VuU3Vic2NpYmUoKTtcbiAgfVxuXG5cbiAgZXZlbnRzU3Vic2NpYmUoKSB7XG4gICAgdGhpcy5nbG9iYWxNb3VzZU1vdmUgPSBmcm9tRXZlbnQod2luZG93LCAnbW91c2Vtb3ZlJykuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgaWYodGhpcy5kcmFnU3RhcnQpIHtcbiAgICAgICAgdGhpcy5nZXRQb3NpdGlvbig8TW91c2VFdmVudD5ldmVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5nbG9iYWxNb3VzZVVwID0gZnJvbUV2ZW50KHdpbmRvdywgJ21vdXNldXAnKS5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICBpZih0aGlzLmRyYWdTdGFydCkge1xuICAgICAgICB0aGlzLmRyYWdTdGFydCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmdldFBvc2l0aW9uKDxNb3VzZUV2ZW50PmV2ZW50KTtcbiAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgLy8gdGhpcy5nbG9iYWxNb3VzZU1vdmUgPSB0aGlzLmNvbG9yUGlja2VyU2VydmljZS5tb3VzZU1vdmVPYnNlcnZhYmxlLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAvLyAgIGlmKHRoaXMuZHJhZ1N0YXJ0KSB7XG4gICAgLy8gICAgIHRoaXMuZ2V0UG9zaXRpb24oPE1vdXNlRXZlbnQ+ZXZlbnQpO1xuICAgIC8vICAgfVxuICAgIC8vIH0pO1xuICAgIC8vIHRoaXMuZ2xvYmFsTW91c2VVcCA9IHRoaXMuY29sb3JQaWNrZXJTZXJ2aWNlLm1vdXNlVXBPYnNlcnZhYmxlLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAvLyAgIGlmKHRoaXMuZHJhZ1N0YXJ0KSB7XG4gICAgLy8gICAgIHRoaXMuZHJhZ1N0YXJ0ID0gZmFsc2U7XG4gICAgLy8gICAgIHRoaXMuZ2V0UG9zaXRpb24oPE1vdXNlRXZlbnQ+ZXZlbnQpO1xuICAgIC8vICAgfVxuICAgIC8vIH0pO1xuICB9XG4gIGV2ZW50c1VuU3Vic2NpYmUoKSB7XG4gICAgaWYodGhpcy5nbG9iYWxNb3VzZU1vdmUgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuZ2xvYmFsTW91c2VNb3ZlLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmKHRoaXMuZ2xvYmFsTW91c2VVcCAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5nbG9iYWxNb3VzZVVwLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNldERyYWdnZXIocGVyc2VudDogQ3VzdG9tUGVyY2VudCkge1xuICAgIGlmKHRoaXMuZHJhZ2dlciA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgcG9zaXRpb246IEN1c3RvbVJlY3QgPSB0aGlzLmdldFJlY3QodGhpcy5lbCk7XG4gICAgbGV0IHggPSBNYXRoLnJvdW5kKCgocG9zaXRpb24ud2lkdGggLSB0aGlzLmRyYWdnZXIucGlja2VyUGFkICogMikgKiBwZXJzZW50LnggLyAxMDApKTtcbiAgICBsZXQgeSA9IE1hdGgucm91bmQoKChwb3NpdGlvbi5oZWlnaHQgLSB0aGlzLmRyYWdnZXIucGlja2VyUGFkICogMikgKiBwZXJzZW50LnkgLyAxMDApKTtcbiAgICB0aGlzLmRyYWdnZXIuc2V0UG9zaXRpb24oXG4gICAgICAoeCA+IHRoaXMuZHJhZ2dlci5waWNrZXJQYWQpID8geCA6IHRoaXMuZHJhZ2dlci5waWNrZXJQYWQsXG4gICAgICAoeSA+IHRoaXMuZHJhZ2dlci5waWNrZXJQYWQpID8geSA6IHRoaXMuZHJhZ2dlci5waWNrZXJQYWQsXG4gICAgICB0aGlzLmRpcmVjdGlvblxuICAgICk7XG5cbiAgfVxuXG4gIHB1YmxpYyBnZXRQb3NpdGlvbigkZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBsZXQgY3Vyc29yWSA9ICRldmVudC5wYWdlWTtcbiAgICBsZXQgY3Vyc29yWCA9ICRldmVudC5wYWdlWDtcbiAgICBsZXQgcG9zaXRpb246IEN1c3RvbVJlY3QgPSB0aGlzLmdldFJlY3QodGhpcy5lbCk7XG4gICAgbGV0IHBlcmNlbnQ6IEN1c3RvbVBlcmNlbnQgPSB7eDogMCwgeTogMH07XG4gICAgaWYodGhpcy5kaXJlY3Rpb24gPT0gJ3ZlcnRpY2FsJyB8fCB0aGlzLmRpcmVjdGlvbiA9PSAnYm90aCcpIHtcbiAgICAgIHBlcmNlbnQueSA9IE1hdGgucm91bmQoKGN1cnNvclkgLSAocG9zaXRpb24udG9wKSkgKiAxMDAgLyAocG9zaXRpb24uaGVpZ2h0IC0gdGhpcy5kcmFnZ2VyLnBpY2tlclBhZCAqIDIpKTtcbiAgICAgIGlmKHBlcmNlbnQueSA8IDApIHtcbiAgICAgICAgcGVyY2VudC55ID0gMFxuICAgICAgfSBlbHNlIGlmKHBlcmNlbnQueSA+IDEwMCkge1xuICAgICAgICBwZXJjZW50LnkgPSAxMDA7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKHRoaXMuZGlyZWN0aW9uID09ICdob3Jpem9udGFsJyB8fCB0aGlzLmRpcmVjdGlvbiA9PSAnYm90aCcpIHtcbiAgICAgIHBlcmNlbnQueCA9IE1hdGgucm91bmQoKGN1cnNvclggLSAocG9zaXRpb24ubGVmdCkpICogMTAwIC8gKHBvc2l0aW9uLndpZHRoIC0gdGhpcy5kcmFnZ2VyLnBpY2tlclBhZCAqIDIpKTtcbiAgICAgIGlmKHBlcmNlbnQueCA8IDApIHtcbiAgICAgICAgcGVyY2VudC54ID0gMFxuICAgICAgfSBlbHNlIGlmKHBlcmNlbnQueCA+IDEwMCkge1xuICAgICAgICBwZXJjZW50LnggPSAxMDA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zZXREcmFnZ2VyKHBlcmNlbnQpO1xuICAgIHRoaXMuY2hhbmdlLmVtaXQocGVyY2VudCk7XG5cbiAgfVxuXG5cblxuICBwdWJsaWMgZ2V0UmVjdChlbGVtOiBIVE1MRWxlbWVudCk6IEN1c3RvbVJlY3Qge1xuXG4gICAgbGV0IGJveCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgbGV0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuICAgIGxldCBkb2NFbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICBsZXQgc2Nyb2xsVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY0VsLnNjcm9sbFRvcCB8fCBib2R5LnNjcm9sbFRvcDtcbiAgICBsZXQgc2Nyb2xsTGVmdCA9IHdpbmRvdy5wYWdlWE9mZnNldCB8fCBkb2NFbC5zY3JvbGxMZWZ0IHx8IGJvZHkuc2Nyb2xsTGVmdDtcbiAgICBsZXQgY2xpZW50VG9wID0gZG9jRWwuY2xpZW50VG9wIHx8IGJvZHkuY2xpZW50VG9wIHx8IDA7XG4gICAgbGV0IGNsaWVudExlZnQgPSBkb2NFbC5jbGllbnRMZWZ0IHx8IGJvZHkuY2xpZW50TGVmdCB8fCAwO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGhlaWdodDogYm94LmhlaWdodCxcbiAgICAgIGxlZnQ6IGJveC5sZWZ0ICsgc2Nyb2xsTGVmdCAtIGNsaWVudExlZnQsXG4gICAgICB0b3A6IGJveC50b3AgKyBzY3JvbGxUb3AgLSBjbGllbnRUb3AsXG4gICAgICB3aWR0aDogYm94LndpZHRoLFxuICAgIH07XG4gIH1cblxuXG5cbn1cbiIsImltcG9ydCB7XG4gIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05neFRUaXRhbkNvbG9yUGlja2VyU2VydmljZX0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuc2VydmljZVwiO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJJbnB1dF0nLFxuICBleHBvcnRBczogJ2xpYk5neFRUaXRhbkNvbG9yUGlja2VySW5wdXQnXG59KVxuZXhwb3J0IGNsYXNzIE5neFRUaXRhbkNvbG9yUGlja2VySW5wdXREaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgnZm9ybWF0JykgZm9ybWF0OiBzdHJpbmcgPSAnaGV4Nic7XG4gIEBPdXRwdXQoJ2lucHV0Q2hhbmdlJykgcHVibGljIGlucHV0Q2hhbmdlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5dXAnKSBrZXlVcCgpIHtcbiAgICB0aGlzLmlucHV0VmFsaWRhdGUoKTtcbiAgfVxuICBASG9zdExpc3RlbmVyKCdjaGFuZ2UnKSBjaGFuZ2UoKSB7XG4gICAgdGhpcy5pbnB1dFZhbGlkYXRlKCk7XG4gIH1cblxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBlbDogRWxlbWVudFJlZixcbiAgICBwdWJsaWMgY29sb3JQaWNrZXJTZXJ2aWNlOiBOZ3hUVGl0YW5Db2xvclBpY2tlclNlcnZpY2VcbiAgKSB7IH1cblxuXG4gIHNldElucHV0VmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgICg8SFRNTElucHV0RWxlbWVudD50aGlzLmVsLm5hdGl2ZUVsZW1lbnQpLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuXG4gIGlucHV0VmFsaWRhdGUoKSB7XG4gICAgbGV0IHJlcyA9IHRoaXMuY29sb3JQaWNrZXJTZXJ2aWNlLnZhbGlkYXRlQ29sb3JGb3JtYXQoXG4gICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudmFsdWUsXG4gICAgICB0aGlzLmZvcm1hdFxuICAgICk7XG5cbiAgICBpZihyZXMgIT09ICdub3RWYWxpZCcpIHtcbiAgICAgICg8SFRNTElucHV0RWxlbWVudD50aGlzLmVsLm5hdGl2ZUVsZW1lbnQpLnZhbHVlID0gcmVzO1xuICAgICAgdGhpcy5pbnB1dENoYW5nZS5lbWl0KHJlcyk7XG4gICAgfVxuXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvckRpcmVjdGl2ZSB9IGZyb20gJy4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXItc2VsZWN0b3IuZGlyZWN0aXZlJztcbmltcG9ydCB7IE5neFRUaXRhbkNvbG9yUGlja2VyRHJhZ2dlckRpcmVjdGl2ZSB9IGZyb20gJy4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXItZHJhZ2dlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IE5neFRUaXRhbkNvbG9yUGlja2VySW5wdXREaXJlY3RpdmUgfSBmcm9tICcuL25neC10dGl0YW4tY29sb3ItcGlja2VyLWlucHV0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOZ3hUVGl0YW5Db2xvclBpY2tlclBhbGV0dGVMaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1wYWxldHRlLWxpc3Qvbmd4LXR0aXRhbi1jb2xvci1waWNrZXItcGFsZXR0ZS1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQge05neFRUaXRhbkNvbG9yUGlja2VyU2VydmljZX0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuc2VydmljZVwiO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50LFxuICAgIE5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JEaXJlY3RpdmUsXG4gICAgTmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyRGlyZWN0aXZlLFxuICAgIE5neFRUaXRhbkNvbG9yUGlja2VySW5wdXREaXJlY3RpdmUsXG4gICAgTmd4VFRpdGFuQ29sb3JQaWNrZXJQYWxldHRlTGlzdENvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW05neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50XSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgTmd4VFRpdGFuQ29sb3JQaWNrZXJTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4VFRpdGFuQ29sb3JQaWNrZXJNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsiSW5qZWN0YWJsZSIsIkV2ZW50RW1pdHRlciIsIkNvbXBvbmVudCIsIklucHV0IiwiT3V0cHV0IiwiQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kiLCJDaGFuZ2VEZXRlY3RvclJlZiIsIkhvc3RMaXN0ZW5lciIsIlZpZXdDaGlsZCIsIkRpcmVjdGl2ZSIsIkVsZW1lbnRSZWYiLCJmcm9tRXZlbnQiLCJDb250ZW50Q2hpbGQiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7OztRQStCRTt5QkFUd0IsS0FBSzs4QkFDTSxFQUFFOzJCQUNKLEVBQUU7WUFRakMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDOzs7Ozs7OztTQVN4Qjs7Ozs7O1FBRUQsc0RBQWdCOzs7OztZQUFoQixVQUFpQixPQUFz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QUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO3dCQUN2RCxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO3dCQUN2RCxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO3dCQUN2RCxDQUFDO3FCQUNGLENBQUE7aUJBQ0Y7cUJBQU0sSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtvQkFDMUIsSUFBSSxHQUFHO3dCQUNMLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQ2pDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQ2pDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7d0JBQ2pDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNqRSxDQUFBO2lCQUNGO2dCQUNELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFD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QVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUzt3QkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7d0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO3dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUzt3QkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7d0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO3dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUzt3QkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7d0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO3dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUzt3QkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7d0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO3dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO3dCQUM1RyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxF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