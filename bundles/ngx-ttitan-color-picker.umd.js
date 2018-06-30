(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-ttitan-color-picker', ['exports', '@angular/core', 'rxjs', '@angular/common'], factory) :
    (factory((global['ngx-ttitan-color-picker'] = {}),global.ng.core,global.rxjs,global.ng.common));
}(this, (function (exports,i0,rxjs,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var NgxTTitanColorPickerService = (function () {
        function NgxTTitanColorPickerService() {
            this.pickerList = [];
            this.pallets = [];
            this.fillBasePallets();
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
                var /** @type {?} */ hR = rgba[0].toString(16);
                var /** @type {?} */ hG = rgba[1].toString(16);
                var /** @type {?} */ hB = rgba[2].toString(16);
                var /** @type {?} */ hA = ((showAlpha) ? (rgba[3] * 255).toString(16).substring(0, 2) : '');
                hR = (hR.length == 1) ? hR + hR : hR;
                hG = (hG.length == 1) ? hG + hG : hG;
                hB = (hB.length == 1) ? hB + hB : hB;
                if (showAlpha) {
                    hA = (hA.length == 1) ? hA + hA : hA;
                }
                return '#' +
                    hR +
                    hG +
                    hB +
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
        function NgxTTitanColorPickerComponent(colorPickerService) {
            this.colorPickerService = colorPickerService;
            this.alpha = false;
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
            this.validateInputParams();
            this.colorPickerService.preparePickerPallets(this.availPallets, this.customPallets, this);
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
                this.colorPickerService.colorToData(this.color, this);
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
                        selector: 'lib-ngx-ttitan-color-picker',
                        template: "<div\n  class=\"ngx-ttitan-color-picker-wrapper\"\n>\n  <div class=\"picker-input-wrapper\">\n    <div class=\"picker-input-label\">\n      <label [for]=\"uuid\" >{{title}} {{color}}</label>\n    </div>\n    <div class=\"picker-input-holder\">\n      <div class=\"picker-color\" [ngStyle]=\"{background: currentColorAlpha}\">\n\n      </div>\n      <div class=\"picker-input\">\n        <input\n          libNgxTTitanColorPickerInput\n          #pickerInput=\"libNgxTTitanColorPickerInput\"\n          (inputChange)=\"inputColorChange($event)\"\n          [format]=\"inputFormat\"\n          [id]=\"uuid\"\n          type=\"text\"\n          (focus)=\"openPicker()\"\n        />\n      </div>\n      <!--<div class=\"picker-save-sign\">-->\n      <!--S-->\n      <!--</div>-->\n    </div>\n\n  </div>\n  <div class=\"ngx-ttitan-color-picker\" [ngClass]=\"{'no-alpha': !alpha, 'open': pickerOpen}\">\n    <div class=\"ngx-ttitan-color-picker__MainColor\">\n      <div class=\"ngx-ttitan-color-picker__ColorLayer\" [ngStyle]=\"{backgroundColor: currentColorMax}\" ></div>\n      <div class=\"ngx-ttitan-color-picker__Slidable\" libNgxTTitanColorPickerSelector #mainColor=\"libNgxTTitanColorPickerSelector\" (change)=\"colorPickerService.saturationChange($event, this)\">\n        <div class=\"ngx-ttitan-color-picker__Dragger\" libNgxTTitanColorPickerDragger style=\"transform: translate3d(0px, 0px, 0px);\"></div>\n      </div>\n    </div>\n    <div class=\"ngx-ttitan-color-picker__HuePicker\">\n      <div class=\"ngx-ttitan-color-picker__Slidable\" libNgxTTitanColorPickerSelector #huePicker=\"libNgxTTitanColorPickerSelector\" (change)=\"colorPickerService.hueChange($event, this)\" [direction]=\"'vertical'\">\n        <div class=\"ngx-ttitan-color-picker__Dragger\" libNgxTTitanColorPickerDragger [pickerPad]=\"0\" style=\" transform: translate3d(0px, 0px, 0px);\"></div>\n      </div>\n    </div>\n    <div class=\"ngx-ttitan-color-picker__AlphaPicker\" *ngIf=\"alpha === true\">\n      <div class=\"ngx-ttitan-color-picker__ColorLayer\"\n\n           [ngStyle]=\"{background: 'linear-gradient(to top, ' + currentColorAlphaZero + '  18px, ' + currentColor + ' calc(100% - 18px)'}\"\n      ></div>\n      <div class=\"ngx-ttitan-color-picker__Slidable\" libNgxTTitanColorPickerSelector #alphaPicker=\"libNgxTTitanColorPickerSelector\" (change)=\"colorPickerService.alphaChange($event, this)\" [direction]=\"'vertical'\">\n        <div class=\"ngx-ttitan-color-picker__Dragger\" libNgxTTitanColorPickerDragger [pickerPad]=\"0\" style=\" transform: translate3d(0px, 0px, 0px);\"></div>\n      </div>\n    </div>\n    <!--<div style=\"height: 40px; width: 40px\" [ngStyle]=\"{background: currentColor}\">-->\n\n    <!--</div>-->\n    <!--<div style=\"height: 40px; width: 40px\" [ngStyle]=\"{background: currentColorAlpha}\">-->\n\n    <!--</div>-->\n  </div>\n  <lib-ngx-ttitan-color-picker-palette-list\n    (change)=\"inputColorChange($event)\"\n    [pallets]=\"pickerPallets\"\n  >\n\n  </lib-ngx-ttitan-color-picker-palette-list>\n</div>\n\n",
                        styles: [":host *,:host :after,:host :before{box-sizing:border-box}:host .picker-input-wrapper{margin-bottom:6px}:host .picker-input-wrapper .picker-input-label{margin-bottom:6px}:host .picker-input-wrapper .picker-input-label label{text-transform:uppercase;font-weight:600}:host .picker-input-wrapper .picker-input-holder{display:flex;height:33px;border:1px solid #bbb;overflow:hidden;border-radius:3px;background-color:#eee}:host .picker-input-wrapper .picker-input-holder .picker-color{flex:0 0 31px;background-color:#ff0300}:host .picker-input-wrapper .picker-input-holder .picker-input{flex:auto;background-color:transparent}:host .picker-input-wrapper .picker-input-holder .picker-input input{background-color:transparent;color:#272727;font-family:monospace;font-size:14px;border:none;outline:0;padding:8px 2px 8px 8px;width:100%}:host .picker-input-wrapper .picker-input-holder .picker-save-sign{flex:0 0 31px;line-height:33px;text-align:center}:host .ngx-ttitan-color-picker{max-height:0;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:flex;transition:max-height .3s}:host .ngx-ttitan-color-picker.open{margin-bottom:5px;max-height:165px}:host .ngx-ttitan-color-picker__ColorLayer{position:absolute;z-index:10;top:0;left:0;height:100%;width:100%;box-shadow:inset 0 0 2px 0 rgba(0,0,0,.5);pointer-events:none}:host .ngx-ttitan-color-picker__Slidable{height:100%;width:100%;cursor:pointer}:host .ngx-ttitan-color-picker__Dragger{position:relative;z-index:30;bottom:.9rem;-webkit-transform:none;transform:none;height:18px;width:18px;margin:0 auto;-webkit-backface-visibility:hidden;backface-visibility:hidden;will-change:transform;background:0 0;border:3px solid #fff;box-shadow:0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08),inset 0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08);border-radius:50%;pointer-events:none;touch-action:none}:host .ngx-ttitan-color-picker__MainColor{background-image:linear-gradient(45deg,#dfe3e8 25%,transparent 0),linear-gradient(-45deg,#dfe3e8 25%,transparent 0),linear-gradient(45deg,transparent 75%,#dfe3e8 0),linear-gradient(-45deg,transparent 75%,#dfe3e8 0);background-size:1.6rem 1.6rem;background-position:0 0,0 .8rem,.8rem -.8rem,-.8rem 0;position:relative;overflow:hidden;width:165px;height:165px;border-radius:4px;cursor:pointer}:host .ngx-ttitan-color-picker__MainColor .ngx-ttitan-color-picker__ColorLayer{box-shadow:inset 0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08);border-radius:4px}:host .ngx-ttitan-color-picker__MainColor .ngx-ttitan-color-picker__Dragger{right:.9rem;margin:0}:host .ngx-ttitan-color-picker__MainColor:after,:host .ngx-ttitan-color-picker__MainColor:before{content:\"\";position:absolute;z-index:20;top:0;left:0;display:block;height:100%;width:100%;pointer-events:none;border-radius:3px}:host .ngx-ttitan-color-picker__MainColor:before{background:linear-gradient(90deg,#fff,transparent)}:host .ngx-ttitan-color-picker__MainColor:after{background-image:linear-gradient(0deg,#000,transparent);box-shadow:inset 0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08)}:host .ngx-ttitan-color-picker__AlphaPicker,:host .ngx-ttitan-color-picker__HuePicker{position:relative;overflow:hidden;height:165px;width:24px;margin-left:.8rem;border-width:3px;border-radius:8rem;padding:13px 0}:host .ngx-ttitan-color-picker__HuePicker{background:linear-gradient(to bottom,red 0,#ff0 21%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%);box-shadow:inset 0 0 2px 0 rgba(0,0,0,.5)}:host .ngx-ttitan-color-picker__AlphaPicker{background-image:linear-gradient(45deg,#dfe3e8 25%,transparent 0),linear-gradient(-45deg,#dfe3e8 25%,transparent 0),linear-gradient(45deg,transparent 75%,#dfe3e8 0),linear-gradient(-45deg,transparent 75%,#dfe3e8 0);background-size:1.6rem 1.6rem;background-position:0 0,0 .8rem,.8rem -.8rem,-.8rem 0}:host .ngx-ttitan-color-picker__AlphaPicker .ngx-ttitan-color-picker__ColorLayer{border-radius:8rem}:host .ngx-ttitan-color-picker.no-alpha .ngx-ttitan-color-picker__MainColor{width:200px}"],
                    },] },
        ];
        /** @nocollapse */
        NgxTTitanColorPickerComponent.ctorParameters = function () {
            return [
                { type: NgxTTitanColorPickerService }
            ];
        };
        NgxTTitanColorPickerComponent.propDecorators = {
            componentClick: [{ type: i0.HostListener, args: ['click', ['$event'],] }],
            alpha: [{ type: i0.Input, args: ['alpha',] }],
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
        function NgxTTitanColorPickerSelectorDirective(elRef) {
            var _this = this;
            this.elRef = elRef;
            this.direction = 'both';
            this.dragger = null;
            this.change = new i0.EventEmitter();
            this.el = null;
            this.dragStart = false;
            this.globalMouseMove = null;
            this.globalMouseUp = null;
            this.el = this.elRef.nativeElement;
            this.direction = (['both', 'vertical', 'horizontal'].indexOf(this.direction) === -1) ? 'both' : this.direction;
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
                { type: i0.ElementRef }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXR0aXRhbi1jb2xvci1waWNrZXIudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci9saWIvbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuc2VydmljZS50cyIsIm5nOi8vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIvbGliL25neC10dGl0YW4tY29sb3ItcGlja2VyLXBhbGV0dGUtbGlzdC9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1wYWxldHRlLWxpc3QuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci9saWIvbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci9saWIvbmd4LXR0aXRhbi1jb2xvci1waWNrZXItZHJhZ2dlci5kaXJlY3RpdmUudHMiLCJuZzovL25neC10dGl0YW4tY29sb3ItcGlja2VyL2xpYi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1zZWxlY3Rvci5kaXJlY3RpdmUudHMiLCJuZzovL25neC10dGl0YW4tY29sb3ItcGlja2VyL2xpYi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1pbnB1dC5kaXJlY3RpdmUudHMiLCJuZzovL25neC10dGl0YW4tY29sb3ItcGlja2VyL2xpYi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDdXN0b21QZXJjZW50fSBmcm9tIFwiLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1zZWxlY3Rvci5kaXJlY3RpdmVcIjtcbmltcG9ydCB7Tmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnR9IGZyb20gXCIuL25neC10dGl0YW4tY29sb3ItcGlja2VyLmNvbXBvbmVudFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEhTVkEge1xuICBodWU6IG51bWJlcixcbiAgc2F0dXJhdGlvbjogbnVtYmVyLFxuICB2YWx1ZTogbnVtYmVyLFxuICBhbHBoYTogbnVtYmVyLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBhbGV0dGUge1xuICBuYW1lOiBzdHJpbmcsXG4gIGlkOiBzdHJpbmcsXG4gIGNvbG9yczogQXJyYXk8c3RyaW5nPlxufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOZ3hUVGl0YW5Db2xvclBpY2tlclNlcnZpY2Uge1xuXG5cbiAgcHVibGljIHBpY2tlckxpc3Q6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgcHVibGljIHBhbGxldHM6IEFycmF5PFBhbGV0dGU+ID0gW107XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5maWxsQmFzZVBhbGxldHMoKTtcbiAgfVxuXG4gIHNhdHVyYXRpb25DaGFuZ2UocGVyY2VudDogQ3VzdG9tUGVyY2VudCwgcGlja2VyQ29tcG9uZW50OiBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCApIHtcbiAgICBwaWNrZXJDb21wb25lbnQuaHN2YS5zYXR1cmF0aW9uID0gcGVyY2VudC54O1xuICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLnZhbHVlID0gKDEwMCAtIHBlcmNlbnQueSk7XG4gICAgdGhpcy5kYXRhVG9Db2xvcihwaWNrZXJDb21wb25lbnQpO1xuICB9XG5cbiAgaHVlQ2hhbmdlKHBlcmNlbnQ6IEN1c3RvbVBlcmNlbnQsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBwaWNrZXJDb21wb25lbnQuaHN2YS5odWUgPSBNYXRoLnJvdW5kKDM2MCAqIHBlcmNlbnQueSAvIDEwMCk7XG4gICAgdGhpcy5kYXRhVG9Db2xvcihwaWNrZXJDb21wb25lbnQpO1xuICB9XG5cbiAgYWxwaGFDaGFuZ2UocGVyY2VudDogQ3VzdG9tUGVyY2VudCwgcGlja2VyQ29tcG9uZW50OiBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCkge1xuICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLmFscGhhID0gKDEwMCAtIHBlcmNlbnQueSkgLyAxMDA7XG4gICAgdGhpcy5kYXRhVG9Db2xvcihwaWNrZXJDb21wb25lbnQpO1xuICB9XG5cbiAgZGF0YVRvQ29sb3IocGlja2VyQ29tcG9uZW50OiBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCkge1xuICAgIGxldCByZ2JhQXJyOiBBcnJheTxudW1iZXI+ID0gdGhpcy5oc3ZhVG9SZ2JhKFxuICAgICAgcGlja2VyQ29tcG9uZW50LmhzdmEuaHVlLFxuICAgICAgcGlja2VyQ29tcG9uZW50LmhzdmEuc2F0dXJhdGlvbixcbiAgICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLnZhbHVlLFxuICAgICAgcGlja2VyQ29tcG9uZW50LmhzdmEuYWxwaGFcbiAgICApO1xuICAgIGxldCByZ2JhTWF4QXJyOiBBcnJheTxudW1iZXI+ID0gdGhpcy5oc3ZhVG9SZ2JhKFxuICAgICAgcGlja2VyQ29tcG9uZW50LmhzdmEuaHVlLFxuICAgICAgMTAwLFxuICAgICAgMTAwLFxuICAgICAgcGlja2VyQ29tcG9uZW50LmhzdmEuYWxwaGFcbiAgICApO1xuXG4gICAgcGlja2VyQ29tcG9uZW50LmN1cnJlbnRDb2xvciA9ICdyZ2IoJyArIHJnYmFBcnJbMF0gKyAnLCcgKyByZ2JhQXJyWzFdICsgJywnICsgcmdiYUFyclsyXSArICcpJztcbiAgICBwaWNrZXJDb21wb25lbnQuY3VycmVudENvbG9yTWF4ID0gJ3JnYmEoJyArIHJnYmFNYXhBcnJbMF0gKyAnLCcgKyByZ2JhTWF4QXJyWzFdICsgJywnICsgcmdiYU1heEFyclsyXSArICcsJyArIHJnYmFNYXhBcnJbM10gKyAnKSc7XG4gICAgcGlja2VyQ29tcG9uZW50LmN1cnJlbnRDb2xvckFscGhhID0gJ3JnYmEoJyArIHJnYmFBcnJbMF0gKyAnLCcgKyByZ2JhQXJyWzFdICsgJywnICsgcmdiYUFyclsyXSArICcsJyArIHJnYmFBcnJbM10gKyAnKSc7XG4gICAgcGlja2VyQ29tcG9uZW50LmN1cnJlbnRDb2xvckFscGhhWmVybyA9ICdyZ2JhKCcgKyByZ2JhQXJyWzBdICsgJywnICsgcmdiYUFyclsxXSArICcsJyArIHJnYmFBcnJbMl0gKyAnLDApJztcblxuICAgIHBpY2tlckNvbXBvbmVudC5zZXRJbnB1dFZhbHVlKCk7XG4gICAgcGlja2VyQ29tcG9uZW50LnVwZGF0ZVJldHVybkNvbG9yKCk7XG5cblxuICB9XG5cbiAgY29sb3JUb0RhdGEoY29sb3I6IHN0cmluZywgcGlja2VyQ29tcG9uZW50OiBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCkge1xuICAgIHN3aXRjaCAodGhpcy5kZXRlY3RDb2xvclR5cGUoY29sb3IpKSB7XG4gICAgICBjYXNlIFwicmdiYVwiOiB0aGlzLnBhcnNlUmdiYUNvbG9yKGNvbG9yLCBwaWNrZXJDb21wb25lbnQpOyBicmVhaztcbiAgICAgIGNhc2UgXCJyZ2JcIjogdGhpcy5wYXJzZVJnYkNvbG9yKGNvbG9yLCBwaWNrZXJDb21wb25lbnQpOyBicmVhaztcbiAgICAgIGNhc2UgXCJoc2xhXCI6IHRoaXMucGFyc2VIc2xhQ29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudCk7IGJyZWFrO1xuICAgICAgY2FzZSBcImhzbFwiOiB0aGlzLnBhcnNlSHNsQ29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudCk7IGJyZWFrO1xuICAgICAgY2FzZSBcImhleDZcIjogdGhpcy5wYXJzZUhleENvbG9yKGNvbG9yLCBwaWNrZXJDb21wb25lbnQpOyBicmVhaztcbiAgICAgIGNhc2UgXCJoZXg4XCI6IHRoaXMucGFyc2VIZXhDb2xvcihjb2xvciwgcGlja2VyQ29tcG9uZW50KTsgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMuZGF0YVRvQ29sb3IocGlja2VyQ29tcG9uZW50KTtcbiAgfVxuXG4gIGdldFBpY2tlclV1aWQoKSB7XG4gICAgbGV0IHBpY2tlcklkID0gJyc7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IDEwMDA7IGkrKykge1xuICAgICAgcGlja2VySWQgPSAncGlja2VyLScgKyB0aGlzLnBpY2tlckxpc3QubGVuZ3RoICsgJy0nICsgaTtcbiAgICAgIGlmKHRoaXMucGlja2VyTGlzdC5pbmRleE9mKHBpY2tlcklkKSA9PT0gLTEgKSB7XG4gICAgICAgIHRoaXMucGlja2VyTGlzdC5wdXNoKHBpY2tlcklkKTtcbiAgICAgICAgcmV0dXJuIHBpY2tlcklkO1xuICAgICAgfVxuICAgIH1cblxuICB9XG5cblxuICBkZXRlY3RDb2xvclR5cGUoY29sb3I6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYoY29sb3IuaW5kZXhPZigncmdiYScpICE9PSAtMSkge1xuICAgICAgcmV0dXJuICdyZ2JhJztcbiAgICB9IGVsc2UgaWYoY29sb3IuaW5kZXhPZigncmdiJykgIT09IC0xKSB7XG4gICAgICByZXR1cm4gJ3JnYic7XG4gICAgfSBlbHNlIGlmKGNvbG9yLmluZGV4T2YoJ2hzbGEnKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiAnaHNsYSc7XG4gICAgfSBlbHNlIGlmKGNvbG9yLmluZGV4T2YoJ2hzbCcpICE9PSAtMSkge1xuICAgICAgcmV0dXJuICdoc2wnO1xuICAgIH0gZWxzZSBpZiAoY29sb3IuaW5kZXhPZignIycpICE9PSAtMSAmJiAoY29sb3IubGVuZ3RoID09IDQgfHwgY29sb3IubGVuZ3RoID09IDcpKXtcbiAgICAgIHJldHVybiAnaGV4Nic7XG4gICAgfSBlbHNlIGlmIChjb2xvci5pbmRleE9mKCcjJykgIT09IC0xICYmIGNvbG9yLmxlbmd0aCA9PSA5KXtcbiAgICAgIHJldHVybiAnaGV4OCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAndW5kZWZpbmVkJztcbiAgICB9XG4gIH1cblxuXG4gIGZpbGxWYWx1ZXNGcm9tSHN2YUFycihoc3ZhQXJyOiBBcnJheTxudW1iZXI+LCBwaWNrZXJDb21wb25lbnQ6IE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50KSB7XG4gICAgcGlja2VyQ29tcG9uZW50LmhzdmEuaHVlID0gaHN2YUFyclswXTtcbiAgICBwaWNrZXJDb21wb25lbnQuaHN2YS5zYXR1cmF0aW9uID0gaHN2YUFyclsxXTtcbiAgICBwaWNrZXJDb21wb25lbnQuaHN2YS52YWx1ZSA9IGhzdmFBcnJbMl07XG4gICAgcGlja2VyQ29tcG9uZW50LmhzdmEuYWxwaGEgPSBoc3ZhQXJyWzNdO1xuICB9XG5cblxuICBwYXJzZVJnYmFDb2xvcihjb2xvciwgcGlja2VyQ29tcG9uZW50OiBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCkge1xuICAgIGxldCBhdXMgPSBjb2xvci5yZXBsYWNlKCdyZ2JhKCcsICcnKS5yZXBsYWNlKCcpJywgJycpO1xuICAgIGxldCBhdXMyID0gYXVzLnNwbGl0KCcsJyk7XG4gICAgaWYoYXVzMi5sZW5ndGggPT0gNCkge1xuICAgICAgdGhpcy5maWxsVmFsdWVzRnJvbUhzdmFBcnIoXG4gICAgICAgIHRoaXMucmdiYVRvSHN2YShcbiAgICAgICAgICBwYXJzZUludChhdXMyWzBdKSxcbiAgICAgICAgICBwYXJzZUludChhdXMyWzFdKSxcbiAgICAgICAgICBwYXJzZUludChhdXMyWzJdKSxcbiAgICAgICAgICBwYXJzZUludChhdXMyWzNdKSxcbiAgICAgICAgKSxcbiAgICAgICAgcGlja2VyQ29tcG9uZW50XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHBhcnNlUmdiQ29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBsZXQgYXVzID0gY29sb3IucmVwbGFjZSgncmdiKCcsICcnKS5yZXBsYWNlKCcpJywgJycpO1xuICAgIGxldCBhdXMyID0gYXVzLnNwbGl0KCcsJyk7XG4gICAgaWYoYXVzMi5sZW5ndGggPT0gMykge1xuICAgICAgdGhpcy5maWxsVmFsdWVzRnJvbUhzdmFBcnIoXG4gICAgICAgIHRoaXMucmdiYVRvSHN2YShcbiAgICAgICAgICBwYXJzZUludChhdXMyWzBdKSxcbiAgICAgICAgICBwYXJzZUludChhdXMyWzFdKSxcbiAgICAgICAgICBwYXJzZUludChhdXMyWzJdKSxcbiAgICAgICAgICAxXG4gICAgICAgICksXG4gICAgICAgIHBpY2tlckNvbXBvbmVudFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwYXJzZUhzbGFDb2xvcihjb2xvciwgcGlja2VyQ29tcG9uZW50OiBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCkge1xuICAgIGxldCBhdXMgPSBjb2xvci5yZXBsYWNlKCdoc2xhKCcsICcnKS5yZXBsYWNlKCcpJywgJycpLnJlcGxhY2UoJyUnLCAnJyk7XG4gICAgbGV0IGF1czIgPSBhdXMuc3BsaXQoJywnKTtcbiAgICBpZihhdXMyLmxlbmd0aCA9PSA0KSB7XG4gICAgICB0aGlzLmZpbGxWYWx1ZXNGcm9tSHN2YUFycihcbiAgICAgICAgdGhpcy5oc2xhVG9Ic3ZhKFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbMF0pLFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbMV0pLFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbMl0pLFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbM10pLFxuICAgICAgICApLFxuICAgICAgICBwaWNrZXJDb21wb25lbnRcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcGFyc2VIc2xDb2xvcihjb2xvciwgcGlja2VyQ29tcG9uZW50OiBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCkge1xuICAgIGxldCBhdXMgPSBjb2xvci5yZXBsYWNlKCdoc2woJywgJycpLnJlcGxhY2UoJyknLCAnJykucmVwbGFjZSgnJScsICcnKTtcbiAgICBsZXQgYXVzMiA9IGF1cy5zcGxpdCgnLCcpO1xuICAgIGlmKGF1czIubGVuZ3RoID09IDMpIHtcbiAgICAgIHRoaXMuZmlsbFZhbHVlc0Zyb21Ic3ZhQXJyKFxuICAgICAgICB0aGlzLmhzbGFUb0hzdmEoXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlswXSksXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlsxXSksXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlsyXSksXG4gICAgICAgICAgMVxuICAgICAgICApLFxuICAgICAgICBwaWNrZXJDb21wb25lbnRcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcGFyc2VIZXhDb2xvcihjb2xvciwgcGlja2VyQ29tcG9uZW50OiBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCkge1xuICAgIGxldCBhdXMgPSBjb2xvci5yZXBsYWNlKCcjJywgJycpO1xuICAgIHRoaXMuZmlsbFZhbHVlc0Zyb21Ic3ZhQXJyKFxuICAgICAgdGhpcy5oZXhUb0hzdmEoYXVzKSxcbiAgICAgIHBpY2tlckNvbXBvbmVudFxuICAgICk7XG4gIH1cblxuXG5cbiAgaHN2YVRvUmdiYShILCBTLCBWLCBBKTogQXJyYXk8bnVtYmVyPiB7XG4gICAgbGV0IGYgLCBwLCBxICwgdCwgbEgsIFIsIEcsIEI7XG5cbiAgICBIID0gKEggPCAzNjApID8gSCA6IDM1OTtcbiAgICBTID0gUyAvIDEwMDtcbiAgICBWID0gViAvIDEwMDtcblxuICAgIGxIID0gTWF0aC5mbG9vcihIIC8gNjApO1xuXG4gICAgZiA9IEgvNjAgLSBsSDtcblxuICAgIHAgPSBWICogKDEgLSBTKTtcblxuICAgIHEgPSBWICooMSAtIFMqZik7XG5cbiAgICB0ID0gViogKDEgLSAoMS1mKSogUyk7XG5cbiAgICBzd2l0Y2ggKGxIKXtcbiAgICAgIGNhc2UgMDogUiA9IFY7IEcgPSB0OyBCID0gcDsgYnJlYWs7XG4gICAgICBjYXNlIDE6IFIgPSBxOyBHID0gVjsgQiA9IHA7IGJyZWFrO1xuICAgICAgY2FzZSAyOiBSID0gcDsgRyA9IFY7IEIgPSB0OyBicmVhaztcbiAgICAgIGNhc2UgMzogUiA9IHA7IEcgPSBxOyBCID0gVjsgYnJlYWs7XG4gICAgICBjYXNlIDQ6IFIgPSB0OyBHID0gcDsgQiA9IFY7IGJyZWFrO1xuICAgICAgY2FzZSA1OiBSID0gVjsgRyA9IHA7IEIgPSBxOyBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gW01hdGgucm91bmQoUioyNTUpLCBNYXRoLnJvdW5kKEcqMjU1KSwgTWF0aC5yb3VuZChCKjI1NSksIEFdO1xuICB9XG5cbiAgaHN2YVRvUmdiYVN0cmluZyhILCBTLCBWLCBBLCBzaG93QWxwaGE6IGJvb2xlYW4gPSBmYWxzZSk6IHN0cmluZyB7XG4gICAgbGV0IGNvbG9yQXJyOiBBcnJheTxudW1iZXI+ID0gdGhpcy5oc3ZhVG9SZ2JhKEgsIFMsIFYsIEEpO1xuXG4gICAgaWYoc2hvd0FscGhhKSB7XG4gICAgICByZXR1cm4gJ3JnYmEoJyArIGNvbG9yQXJyLmpvaW4oJywnKSArICcpJztcbiAgICB9XG5cbiAgICBjb2xvckFyci5wb3AoKTtcbiAgICByZXR1cm4gJ3JnYignICsgY29sb3JBcnIuam9pbignLCcpICsgJyknO1xuXG4gIH1cblxuICByZ2JhVG9Ic3ZhKHIsIGcsIGIsIGEpOiBBcnJheTxudW1iZXI+IHtcbiAgICByIC89IDI1NTtcbiAgICBnIC89IDI1NTtcbiAgICBiIC89IDI1NTtcblxuICAgIGxldCBtYXggPSBNYXRoLm1heChyLCBnLCBiKSwgbWluID0gTWF0aC5taW4ociwgZywgYik7XG4gICAgbGV0IGgsIHMsIHYgPSBtYXg7XG4gICAgbGV0IGQgPSBtYXggLSBtaW47XG4gICAgcyA9IG1heCA9PSAwID8gMCA6IGQgLyBtYXg7XG5cbiAgICBpZiAobWF4ID09IG1pbikge1xuICAgICAgaCA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXRjaCAobWF4KSB7XG4gICAgICAgIGNhc2UgcjogaCA9IChnIC0gYikgLyBkICsgKGcgPCBiID8gNiA6IDApOyBicmVhaztcbiAgICAgICAgY2FzZSBnOiBoID0gKGIgLSByKSAvIGQgKyAyOyBicmVhaztcbiAgICAgICAgY2FzZSBiOiBoID0gKHIgLSBnKSAvIGQgKyA0OyBicmVhaztcbiAgICAgIH1cblxuICAgICAgaCAvPSA2O1xuICAgIH1cblxuXG4gICAgcmV0dXJuIFtcbiAgICAgIGggKiAzNjAsXG4gICAgICBzICogMTAwLFxuICAgICAgdiAqIDEwMCxcbiAgICAgIGFcbiAgICBdO1xuICB9XG5cbiAgaHN2YVRvSHNsYShoLCBzLCB2LCBhKTogQXJyYXk8bnVtYmVyPntcbiAgICBzIC89IDEwMDtcbiAgICB2IC89IDEwMDtcbiAgICByZXR1cm5bXG4gICAgICBNYXRoLnJvdW5kKGgpLFxuICAgICAgTWF0aC5yb3VuZCgocyp2LygoaD0oMi1zKSp2KTwxP2g6Mi1oKSkgKiAxMDApLFxuICAgICAgTWF0aC5yb3VuZCgoaC8yKSAqIDEwMCksXG4gICAgICBhXG4gICAgXVxuICB9XG5cbiAgaHNsYVRvSHN2YSAoaCwgcywgbCwgYSk6IEFycmF5PG51bWJlcj57XG4gICAgcyAvPSAxMDA7XG4gICAgbCAvPSAxMDA7XG4gICAgcyo9bDwuNT9sOjEtbDtcbiAgICByZXR1cm5bXG4gICAgICBoLFxuICAgICAgTWF0aC5yb3VuZCgoMipzLyhsK3MpKSAqIDEwMCksXG4gICAgICBNYXRoLnJvdW5kKChsK3MpICogMTAwKSxcbiAgICAgIGFcbiAgICBdXG4gIH1cblxuICBoZXhUb0hzdmEoaGV4OiBzdHJpbmcpOiBBcnJheTxudW1iZXI+IHtcblxuICAgIGxldCByZ2JhID0gWzAsMCwwLDFdO1xuICAgIGlmIChoZXgubGVuZ3RoID09IDYpIHtcbiAgICAgIHJnYmEgPSBbXG4gICAgICAgIHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMCwgMiksIDE2KSxcbiAgICAgICAgcGFyc2VJbnQoaGV4LnN1YnN0cmluZygyLCA0KSwgMTYpLFxuICAgICAgICBwYXJzZUludChoZXguc3Vic3RyaW5nKDQsIDYpLCAxNiksXG4gICAgICAgIDFcbiAgICAgIF07XG4gICAgfSBlbHNlIGlmIChoZXgubGVuZ3RoID09IDMpIHtcbiAgICAgIHJnYmEgPSBbXG4gICAgICAgIHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMCwgMSkgKyBoZXguc3Vic3RyaW5nKDAsIDEpLCAxNiksXG4gICAgICAgIHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMSwgMikgKyBoZXguc3Vic3RyaW5nKDEsIDIpLCAxNiksXG4gICAgICAgIHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMiwgMykgKyBoZXguc3Vic3RyaW5nKDIsIDMpLCAxNiksXG4gICAgICAgIDFcbiAgICAgIF1cbiAgICB9IGVsc2UgaWYgKGhleC5sZW5ndGggPT0gOCkge1xuICAgICAgcmdiYSA9IFtcbiAgICAgICAgcGFyc2VJbnQoaGV4LnN1YnN0cmluZygwLCAyKSwgMTYpLFxuICAgICAgICBwYXJzZUludChoZXguc3Vic3RyaW5nKDIsIDQpLCAxNiksXG4gICAgICAgIHBhcnNlSW50KGhleC5zdWJzdHJpbmcoNCwgNiksIDE2KSxcbiAgICAgICAgcGFyc2VGbG9hdCgocGFyc2VJbnQoaGV4LnN1YnN0cmluZyg2LCA4KSwgMTYpIC8gMjU1KS50b0ZpeGVkKDIpKVxuICAgICAgXVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZ2JhVG9Ic3ZhKHJnYmFbMF0sIHJnYmFbMV0sIHJnYmFbMl0sIHJnYmFbM10pO1xuXG4gIH1cblxuICBoc3ZhVG9IZXgoSCwgUywgViwgQSwgc2hvd0FscGhhOiBib29sZWFuID0gdHJ1ZSk6IHN0cmluZyB7XG4gICAgbGV0IHJnYmE6IEFycmF5PG51bWJlcj4gPSB0aGlzLmhzdmFUb1JnYmEoSCwgUywgViwgQSk7XG4gICAgbGV0IGhSOiBzdHJpbmcgPSByZ2JhWzBdLnRvU3RyaW5nKDE2KTtcbiAgICBsZXQgaEc6IHN0cmluZyA9IHJnYmFbMV0udG9TdHJpbmcoMTYpO1xuICAgIGxldCBoQjogc3RyaW5nID0gcmdiYVsyXS50b1N0cmluZygxNik7XG4gICAgbGV0IGhBOiBzdHJpbmcgPSAoKHNob3dBbHBoYSkgPyAocmdiYVszXSAqIDI1NSkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygwLDIpIDogJycpO1xuXG4gICAgaFIgPSAoaFIubGVuZ3RoID09IDEpID8gaFIgKyBoUiA6IGhSO1xuICAgIGhHID0gKGhHLmxlbmd0aCA9PSAxKSA/IGhHICsgaEcgOiBoRztcbiAgICBoQiA9IChoQi5sZW5ndGggPT0gMSkgPyBoQiArIGhCIDogaEI7XG4gICAgaWYoc2hvd0FscGhhKSB7XG4gICAgICBoQSA9IChoQS5sZW5ndGggPT0gMSkgPyBoQSArIGhBIDogaEE7XG4gICAgfVxuXG4gICAgcmV0dXJuICcjJyArXG4gICAgICBoUiArXG4gICAgICBoRyArXG4gICAgICBoQiArXG4gICAgICBoQTtcbiAgfVxuXG5cbiAgdmFsaWRhdGVDb2xvckZvcm1hdCh2YWx1ZTogc3RyaW5nLCBmb3JtYXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgc3dpdGNoIChmb3JtYXQpIHtcbiAgICAgIGNhc2UgXCJoZXg2XCI6IHJldHVybiB0aGlzLnZhbGlkYXRlSGV4Rm9ybWF0KHZhbHVlKTtcbiAgICAgIGNhc2UgXCJoZXg4XCI6IHJldHVybiB0aGlzLnZhbGlkYXRlSGV4Rm9ybWF0KHZhbHVlLCB0cnVlKTtcbiAgICAgIGNhc2UgXCJyZ2JcIjogcmV0dXJuIHRoaXMudmFsaWRhdGVSZ2JhRm9ybWF0KHZhbHVlKTtcbiAgICAgIGNhc2UgXCJyZ2JhXCI6IHJldHVybiB0aGlzLnZhbGlkYXRlUmdiYUZvcm1hdCh2YWx1ZSwgdHJ1ZSk7XG4gICAgICAvLyBjYXNlIFwiaHNsXCI6IHJldHVybiB0aGlzLnZhbGlkYXRlSGV4Rm9ybWF0KHZhbHVlKTtcbiAgICAgIC8vIGNhc2UgXCJoc2xhXCI6IHJldHVybiB0aGlzLnZhbGlkYXRlSGV4Rm9ybWF0KHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuICdub3RWYWxpZCc7XG4gIH1cblxuICB2YWxpZGF0ZUhleEZvcm1hdCh2YWx1ZTogc3RyaW5nLCBhbHBoYTogYm9vbGVhbiA9IGZhbHNlKTogc3RyaW5nIHtcbiAgICBsZXQgcmVzdWx0ID0gJ25vdFZhbGlkJztcbiAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoJyMnLCAnJyk7XG4gICAgaWYoIWFscGhhKSB7XG4gICAgICBpZih2YWx1ZS5sZW5ndGggPT09IDYpIHtcbiAgICAgICAgaWYoIWlzTmFOKHBhcnNlSW50KHZhbHVlLCAxNikpKSB7XG4gICAgICAgICAgcmV0dXJuICcjJyArIHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKHZhbHVlLmxlbmd0aCA9PT0gOCkge1xuICAgICAgICBpZighaXNOYU4ocGFyc2VJbnQodmFsdWUsIDE2KSkpIHtcbiAgICAgICAgICByZXR1cm4gJyMnICsgdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgdmFsaWRhdGVSZ2JhRm9ybWF0KHZhbHVlOiBzdHJpbmcsIGFscGhhOiBib29sZWFuID0gZmFsc2UpOiBzdHJpbmcge1xuICAgIGxldCByZXN1bHQgPSAnbm90VmFsaWQnO1xuICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvW14wLTlcXCxdKy9nLCBcIlwiKTtcbiAgICBsZXQgYXVzQXJyOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+ID0gdmFsdWUuc3BsaXQoJywnKTtcbiAgICBsZXQgYWxwaGFWYWw6IHN0cmluZyB8IG51bWJlciA9ICcnO1xuXG4gICAgaWYoIWFscGhhKSB7XG4gICAgICBpZihhdXNBcnIubGVuZ3RoID09IDMpIHtcbiAgICAgICAgYXVzQXJyID0gYXVzQXJyLm1hcChmdW5jdGlvbih2YWw6IHN0cmluZyl7cmV0dXJuIHBhcnNlSW50KHZhbCl9KTtcbiAgICAgICAgaWYoXG4gICAgICAgICAgTWF0aC5tYXguYXBwbHkobnVsbCwgYXVzQXJyKSA8PSAyNTUgJiZcbiAgICAgICAgICBNYXRoLm1pbi5hcHBseShudWxsLCBhdXNBcnIpID49IDBcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuICdyZ2IoJyArIGF1c0Fyci5qb2luKCcsJykgKyAnKSc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYoYXVzQXJyLmxlbmd0aCA9PSA0KSB7XG4gICAgICAgIGFscGhhVmFsID0gcGFyc2VGbG9hdCg8c3RyaW5nPmF1c0Fyci5wb3AoKSk7XG4gICAgICAgIGF1c0FyciA9IGF1c0Fyci5tYXAoZnVuY3Rpb24odmFsOiBzdHJpbmcpe3JldHVybiBwYXJzZUludCh2YWwpfSk7XG4gICAgICAgIGlmKFxuICAgICAgICAgIE1hdGgubWF4LmFwcGx5KG51bGwsIGF1c0FycikgPD0gMjU1ICYmXG4gICAgICAgICAgTWF0aC5taW4uYXBwbHkobnVsbCwgYXVzQXJyKSA+PSAwICYmXG4gICAgICAgICAgYWxwaGFWYWwgPj0gMCAmJiBhbHBoYVZhbCA8PSAxXG4gICAgICAgICkge1xuICAgICAgICAgIGF1c0Fyci5wdXNoKGFscGhhVmFsKTtcbiAgICAgICAgICByZXR1cm4gJ3JnYmEoJyArIGF1c0Fyci5qb2luKCcsJykgKyAnKSc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJlcGFyZVJldHVybkNvbG9yKGhzdmE6IEhTVkEsIGZvcm1hdDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBzd2l0Y2ggKGZvcm1hdCkge1xuICAgICAgY2FzZSBcImhleDZcIjogcmV0dXJuIHRoaXMuaHN2YVRvSGV4KGhzdmEuaHVlLCBoc3ZhLnNhdHVyYXRpb24sIGhzdmEudmFsdWUsIDEsIGZhbHNlKTtcbiAgICAgIGNhc2UgXCJoZXg4XCI6IHJldHVybiB0aGlzLmhzdmFUb0hleChoc3ZhLmh1ZSwgaHN2YS5zYXR1cmF0aW9uLCBoc3ZhLnZhbHVlLCBoc3ZhLmFscGhhLCB0cnVlKTtcbiAgICAgIGNhc2UgXCJyZ2JcIjogcmV0dXJuIHRoaXMuaHN2YVRvUmdiYVN0cmluZyhoc3ZhLmh1ZSwgaHN2YS5zYXR1cmF0aW9uLCBoc3ZhLnZhbHVlLCAxKTtcbiAgICAgIGNhc2UgXCJyZ2JhXCI6IHJldHVybiB0aGlzLmhzdmFUb1JnYmFTdHJpbmcoaHN2YS5odWUsIGhzdmEuc2F0dXJhdGlvbiwgaHN2YS52YWx1ZSwgaHN2YS5hbHBoYSwgdHJ1ZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmhzdmFUb0hleChoc3ZhLmh1ZSwgaHN2YS5zYXR1cmF0aW9uLCBoc3ZhLnZhbHVlLCAxLCBmYWxzZSk7XG4gIH1cblxuICBwcmVwYXJlUGlja2VyUGFsbGV0cyhhdmFpbFBhbGxldHM6IEFycmF5PHN0cmluZz4gPSBbXSwgY3VzdG9tUGFsbGV0czogQXJyYXk8UGFsZXR0ZT4gPSBbXSwgcGlja2VyQ29tcG9uZW50OiBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCkge1xuICAgIHRoaXMucGFsbGV0cy5mb3JFYWNoKChwYWxldHRlKSA9PiB7XG4gICAgICBpZihhdmFpbFBhbGxldHMuaW5kZXhPZihwYWxldHRlLmlkKSAhPT0gLTEpIHtcbiAgICAgICAgcGlja2VyQ29tcG9uZW50LnBpY2tlclBhbGxldHMucHVzaChwYWxldHRlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjdXN0b21QYWxsZXRzLmZvckVhY2goKHBhbGV0dGUpID0+IHtcbiAgICAgIHBpY2tlckNvbXBvbmVudC5waWNrZXJQYWxsZXRzLnB1c2gocGFsZXR0ZSk7XG4gICAgfSlcblxuICB9XG5cbiAgZmlsbEJhc2VQYWxsZXRzKCkge1xuICAgIHRoaXMucGFsbGV0cy5wdXNoKHtcbiAgICAgIGlkOiAncG9sYXJpcycsXG4gICAgICBuYW1lOiAnUG9sYXJpcycsXG4gICAgICBjb2xvcnM6IFtcbiAgICAgICAgJyNGOUZBRkInLCAnI0Y0RjZGOCcsICcjREZFM0U4JywgJyNDNENERDUnLFxuICAgICAgICAnIzkxOUVBQicsICcjNjM3MzgxJywgJyM0NTRGNUInLCAnIzIxMkIzNicsXG4gICAgICAgICcjQjNCNUNCJywgJyM0MzQ2N0YnLCAnIzFDMjI2MCcsICcjMDAwNDRDJyxcbiAgICAgICAgJyNGNkYwRkQnLCAnI0UzRDBGRicsICcjOUM2QURFJywgJyM1MDI0OEYnLCAnIzIzMDA1MScsXG4gICAgICAgICcjRjRGNUZBJywgJyNCM0JDRjUnLCAnIzVDNkFDNCcsICcjMjAyRTc4JywgJyMwMDA2MzknLFxuICAgICAgICAnI0VCRjVGQScsICcjQjRFMUZBJywgJyMwMDdBQ0UnLCAnIzA4NEU4QScsICcjMDAxNDI5JyxcbiAgICAgICAgJyNFMEY1RjUnLCAnI0I3RUNFQycsICcjNDdDMUJGJywgJyMwMDg0OEUnLCAnIzAwMzEzNScsXG4gICAgICAgICcjRTNGMURGJywgJyNCQkU1QjMnLCAnIzUwQjgzQycsICcjMTA4MDQzJywgJyMxNzM2MzAnLFxuICAgICAgICAnI0ZDRjFDRCcsICcjRkZFQThBJywgJyNFRUMyMDAnLCAnIzlDNkYxOScsICcjNTczQjAwJyxcbiAgICAgICAgJyNGQ0VCREInLCAnI0ZGQzU4QicsICcjRjQ5MzQyJywgJyNDMDU3MTcnLCAnIzRBMTUwNCcsXG4gICAgICAgICcjRkJFQUU1JywgJyNGRUFEOUEnLCAnI0RFMzYxOCcsICcjQkYwNzExJywgJyMzMzAxMDEnLFxuICAgICAgXVxuICAgIH0pO1xuICAgIHRoaXMucGFsbGV0cy5wdXNoKHtcbiAgICAgIGlkOiAnbWF0ZXJpYWwnLFxuICAgICAgbmFtZTogJ01hdGVyaWFsJyxcbiAgICAgIGNvbG9yczogW1xuICAgICAgICAnI2ZmZWJlZScsICcjZmZjZGQyJywgJyNlZjlhOWEnLCAnI2U1NzM3MycsICcjZWY1MzUwJywgJyNmNDQzMzYnLCAnI2U1MzkzNScsICcjZDMyZjJmJywgJyNjNjI4MjgnLCAnI2I3MWMxYycsICcjZmY4YTgwJywgJyNmZjUyNTInLCAnI2ZmMTc0NCcsICcjZDUwMDAwJyxcbiAgICAgICAgJyNmY2U0ZWMnLCAnI2Y4YmJkMCcsICcjZjQ4ZmIxJywgJyNmMDYyOTInLCAnI2VjNDA3YScsICcjZTkxZTYzJywgJyNkODFiNjAnLCAnI2MyMTg1YicsICcjYWQxNDU3JywgJyM4ODBlNGYnLCAnI2ZmODBhYicsICcjZmY0MDgxJywgJyNmNTAwNTcnLCAnI2M1MTE2MicsXG4gICAgICAgICcjZjNlNWY1JywgJyNlMWJlZTcnLCAnI2NlOTNkOCcsICcjYmE2OGM4JywgJyNhYjQ3YmMnLCAnIzljMjdiMCcsICcjOGUyNGFhJywgJyM3YjFmYTInLCAnIzZhMWI5YScsICcjNGExNDhjJywgJyNlYTgwZmMnLCAnI2UwNDBmYicsICcjZDUwMGY5JywgJyNhYTAwZmYnLFxuICAgICAgICAnI2VkZTdmNicsICcjZDFjNGU5JywgJyNiMzlkZGInLCAnIzk1NzVjZCcsICcjN2U1N2MyJywgJyM2NzNhYjcnLCAnIzVlMzViMScsICcjNTEyZGE4JywgJyM0NTI3YTAnLCAnIzMxMWI5MicsICcjYjM4OGZmJywgJyM3YzRkZmYnLCAnIzY1MWZmZicsICcjNjIwMGVhJyxcbiAgICAgICAgJyNlOGVhZjYnLCAnI2M1Y2FlOScsICcjOWZhOGRhJywgJyM3OTg2Y2InLCAnIzVjNmJjMCcsICcjM2Y1MWI1JywgJyMzOTQ5YWInLCAnIzMwM2Y5ZicsICcjMjgzNTkzJywgJyMxYTIzN2UnLCAnIzhjOWVmZicsICcjNTM2ZGZlJywgJyMzZDVhZmUnLCAnIzMwNGZmZScsXG4gICAgICAgICcjZTNmMmZkJywgJyNiYmRlZmInLCAnIzkwY2FmOScsICcjNjRiNWY2JywgJyM0MmE1ZjUnLCAnIzIxOTZmMycsICcjMWU4OGU1JywgJyMxOTc2ZDInLCAnIzE1NjVjMCcsICcjMGQ0N2ExJywgJyM4MmIxZmYnLCAnIzQ0OGFmZicsICcjMjk3OWZmJywgJyMyOTYyZmYnLFxuICAgICAgICAnI2UxZjVmZScsICcjYjNlNWZjJywgJyM4MWQ0ZmEnLCAnIzRmYzNmNycsICcjMjliNmY2JywgJyMwM2E5ZjQnLCAnIzAzOWJlNScsICcjMDI4OGQxJywgJyMwMjc3YmQnLCAnIzAxNTc5YicsICcjODBkOGZmJywgJyM0MGM0ZmYnLCAnIzAwYjBmZicsICcjMDA5MWVhJyxcbiAgICAgICAgJyNlMGY3ZmEnLCAnI2IyZWJmMicsICcjODBkZWVhJywgJyM0ZGQwZTEnLCAnIzI2YzZkYScsICcjMDBiY2Q0JywgJyMwMGFjYzEnLCAnIzAwOTdhNycsICcjMDA4MzhmJywgJyMwMDYwNjQnLCAnIzg0ZmZmZicsICcjMThmZmZmJywgJyMwMGU1ZmYnLCAnIzAwYjhkNCcsXG4gICAgICAgICcjZTBmMmYxJywgJyNiMmRmZGInLCAnIzgwY2JjNCcsICcjNGRiNmFjJywgJyMyNmE2OWEnLCAnIzAwOTY4OCcsICcjMDA4OTdiJywgJyMwMDc5NmInLCAnIzAwNjk1YycsICcjMDA0ZDQwJywgJyNhN2ZmZWInLCAnIzY0ZmZkYScsICcjMWRlOWI2JywgJyMwMGJmYTUnLFxuICAgICAgICAnI2U4ZjVlOScsICcjYzhlNmM5JywgJyNhNWQ2YTcnLCAnIzgxYzc4NCcsICcjNjZiYjZhJywgJyM0Y2FmNTAnLCAnIzQzYTA0NycsICcjMzg4ZTNjJywgJyMyZTdkMzInLCAnIzFiNWUyMCcsICcjYjlmNmNhJywgJyM2OWYwYWUnLCAnIzAwZTY3NicsICcjMDBjODUzJyxcbiAgICAgICAgJyNmMWY4ZTknLCAnI2RjZWRjOCcsICcjYzVlMWE1JywgJyNhZWQ1ODEnLCAnIzljY2M2NScsICcjOGJjMzRhJywgJyM3Y2IzNDInLCAnIzY4OWYzOCcsICcjNTU4YjJmJywgJyMzMzY5MWUnLCAnI2NjZmY5MCcsICcjYjJmZjU5JywgJyM3NmZmMDMnLCAnIzY0ZGQxNycsXG4gICAgICAgICcjZjlmYmU3JywgJyNmMGY0YzMnLCAnI2U2ZWU5YycsICcjZGNlNzc1JywgJyNkNGUxNTcnLCAnI2NkZGMzOScsICcjYzBjYTMzJywgJyNhZmI0MmInLCAnIzllOWQyNCcsICcjODI3NzE3JywgJyNmNGZmODEnLCAnI2VlZmY0MScsICcjYzZmZjAwJywgJyNhZWVhMDAnLFxuICAgICAgICAnI2ZmZmRlNycsICcjZmZmOWM0JywgJyNmZmY1OWQnLCAnI2ZmZjE3NicsICcjZmZlZTU4JywgJyNmZmViM2InLCAnI2ZkZDgzNScsICcjZmJjMDJkJywgJyNmOWE4MjUnLCAnI2Y1N2YxNycsICcjZmZmZjhkJywgJyNmZmZmMDAnLCAnI2ZmZWEwMCcsICcjZmZkNjAwJyxcbiAgICAgICAgJyNmZmY4ZTEnLCAnI2ZmZWNiMycsICcjZmZlMDgyJywgJyNmZmQ1NGYnLCAnI2ZmY2EyOCcsICcjZmZjMTA3JywgJyNmZmIzMDAnLCAnI2ZmYTAwMCcsICcjZmY4ZjAwJywgJyNmZjZmMDAnLCAnI2ZmZTU3ZicsICcjZmZkNzQwJywgJyNmZmM0MDAnLCAnI2ZmYWIwMCcsXG4gICAgICAgICcjZmZmM2UwJywgJyNmZmUwYjInLCAnI2ZmY2M4MCcsICcjZmZiNzRkJywgJyNmZmE3MjYnLCAnI2ZmOTgwMCcsICcjZmI4YzAwJywgJyNmNTdjMDAnLCAnI2VmNmMwMCcsICcjZTY1MTAwJywgJyNmZmQxODAnLCAnI2ZmYWI0MCcsICcjZmY5MTAwJywgJyNmZjZkMDAnLFxuICAgICAgICAnI2ZiZTllNycsICcjZmZjY2JjJywgJyNmZmFiOTEnLCAnI2ZmOGE2NScsICcjZmY3MDQzJywgJyNmZjU3MjInLCAnI2Y0NTExZScsICcjZTY0YTE5JywgJyNkODQzMTUnLCAnI2JmMzYwYycsICcjZmY5ZTgwJywgJyNmZjZlNDAnLCAnI2ZmM2QwMCcsICcjZGQyYzAwJyxcbiAgICAgICAgJyNlZmViZTknLCAnI2Q3Y2NjOCcsICcjYmNhYWE0JywgJyNhMTg4N2YnLCAnIzhkNmU2MycsICcjNzk1NTQ4JywgJyM2ZDRjNDEnLCAnIzVkNDAzNycsICcjNGUzNDJlJywgJyMzZTI3MjMnLFxuICAgICAgICAnI2ZhZmFmYScsICcjZjVmNWY1JywgJyNlZWVlZWUnLCAnI2UwZTBlMCcsICcjYmRiZGJkJywgJyM5ZTllOWUnLCAnIzc1NzU3NScsICcjNjE2MTYxJywgJyM0MjQyNDInLCAnIzIxMjEyMScsXG4gICAgICAgICcjZWNlZmYxJywgJyNjZmQ4ZGMnLCAnI2IwYmVjNScsICcjOTBhNGFlJywgJyM3ODkwOWMnLCAnIzYwN2Q4YicsICcjNTQ2ZTdhJywgJyM0NTVhNjQnLCAnIzM3NDc0ZicsICcjMjYzMjM4JyxcbiAgICAgIF1cbiAgICB9KTtcbiAgfVxuXG5cblxuXG5cbn1cbiIsImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1BhbGV0dGV9IGZyb20gXCIuLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1wYWxldHRlLWxpc3QnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJwaWNrZXItcGFsZXR0ZS13cmFwcGVyXCIgKm5nSWY9XCJwYWxsZXRzLmxlbmd0aCA+IDBcIj5cbiAgPGRpdiBjbGFzcz1cInBhbGV0dGUtbGlua3NcIj5cbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cInBhbGV0dGUtbGlua1wiXG4gICAgICAqbmdGb3I9XCJsZXQgcGFsZXR0ZSBvZiBwYWxsZXRzXCJcbiAgICAgIFtuZ0NsYXNzXT1cInsnc2VsZWN0ZWQnOiAoYWN0aXZlUGFsZXR0ZSAhPT0gbnVsbCAmJiBhY3RpdmVQYWxldHRlLmlkID09IHBhbGV0dGUuaWQpfVwiXG4gICAgICAoY2xpY2spPVwic2VsZWN0UGFsZXR0ZShwYWxldHRlKVwiXG4gICAgPlxuICAgICAge3twYWxldHRlLm5hbWV9fVxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInBhbGV0dGUtcGlja2VyLWhvbGRlclwiICpuZ0lmPVwiYWN0aXZlUGFsZXR0ZSAhPT0gbnVsbCAmJiBhY3RpdmVQYWxldHRlLmNvbG9ycy5sZW5ndGggPiAwXCI+XG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJwYWxldHRlLWNvbG9yXCJcbiAgICAgICpuZ0Zvcj1cImxldCBjb2xvciBvZiBhY3RpdmVQYWxldHRlLmNvbG9yc1wiXG4gICAgICBbbmdTdHlsZV09XCJ7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogY29sb3JcbiAgICAgIH1cIlxuICAgICAgKGNsaWNrKT1cImNvbG9yU2VsZWN0ZWQoY29sb3IpXCJcbiAgICA+XG5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2A6aG9zdCAucGlja2VyLXBhbGV0dGUtd3JhcHBlciAucGFsZXR0ZS1saW5rc3tkaXNwbGF5OmZsZXg7ZmxleC13cmFwOndyYXA7bWFyZ2luLWJvdHRvbTo1cHh9Omhvc3QgLnBpY2tlci1wYWxldHRlLXdyYXBwZXIgLnBhbGV0dGUtbGlua3MgLnBhbGV0dGUtbGlua3ttYXJnaW4tcmlnaHQ6NXB4O2JvcmRlci1yYWRpdXM6M3B4O3BhZGRpbmc6MnB4IDRweDtib3JkZXI6MXB4IHNvbGlkICNkZGQ7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2ZvbnQtc2l6ZToxMHB4O2ZvbnQtZmFtaWx5Oi1hcHBsZS1zeXN0ZW0sQmxpbmtNYWNTeXN0ZW1Gb250LFNhbiBGcmFuY2lzY28sUm9ib3RvLFNlZ29lIFVJLEhlbHZldGljYSBOZXVlLHNhbnMtc2VyaWY7Zm9udC13ZWlnaHQ6NjAwO2JhY2tncm91bmQtY29sb3I6I2ZmZjtjdXJzb3I6cG9pbnRlcn06aG9zdCAucGlja2VyLXBhbGV0dGUtd3JhcHBlciAucGFsZXR0ZS1saW5rcyAucGFsZXR0ZS1saW5rLnNlbGVjdGVke2JhY2tncm91bmQtY29sb3I6IzVlNmJjNTtjb2xvcjojZmZmfTpob3N0IC5waWNrZXItcGFsZXR0ZS13cmFwcGVyIC5wYWxldHRlLXBpY2tlci1ob2xkZXJ7aGVpZ2h0OjE2NXB4O2Rpc3BsYXk6ZmxleDtmbGV4LXdyYXA6d3JhcDthbGlnbi1pdGVtczpmbGV4LXN0YXJ0O2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0O2FsaWduLWNvbnRlbnQ6YmFzZWxpbmV9Omhvc3QgLnBpY2tlci1wYWxldHRlLXdyYXBwZXIgLnBhbGV0dGUtcGlja2VyLWhvbGRlciAucGFsZXR0ZS1jb2xvcntjdXJzb3I6cG9pbnRlcjt3aWR0aDoxMHB4O2hlaWdodDoxMHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIE5neFRUaXRhbkNvbG9yUGlja2VyUGFsZXR0ZUxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgncGFsbGV0cycpIHB1YmxpYyBwYWxsZXRzOiBBcnJheTxQYWxldHRlPiA9IFtdO1xuICBAT3V0cHV0KCdjaGFuZ2UnKSBwdWJsaWMgY2hhbmdlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIHB1YmxpYyBhY3RpdmVQYWxldHRlOiBQYWxldHRlID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgY2xvc2VQYWxldHRlKCkge1xuICAgIHRoaXMuYWN0aXZlUGFsZXR0ZSA9IG51bGw7XG4gIH1cblxuICBzZWxlY3RQYWxldHRlKHBhbGV0dGU6IFBhbGV0dGUpIHtcbiAgICBpZihcbiAgICAgIHRoaXMuYWN0aXZlUGFsZXR0ZSA9PSBudWxsXG4gICAgKSB7XG4gICAgICB0aGlzLmFjdGl2ZVBhbGV0dGUgPSBwYWxldHRlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5hY3RpdmVQYWxldHRlLmlkICE9PSBwYWxldHRlLmlkKSB7XG4gICAgICB0aGlzLmFjdGl2ZVBhbGV0dGUgPSBwYWxldHRlO1xuICAgIH1cblxuICB9XG5cbiAgY29sb3JTZWxlY3RlZChjb2xvcikge1xuICAgIHRoaXMuY2hhbmdlLmVtaXQoY29sb3IpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgQ29udGVudENoaWxkLCBDb250ZW50Q2hpbGRyZW4sIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25Jbml0LFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Tmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvckRpcmVjdGl2ZX0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXItc2VsZWN0b3IuZGlyZWN0aXZlXCI7XG5pbXBvcnQge0hTVkEsIE5neFRUaXRhbkNvbG9yUGlja2VyU2VydmljZSwgUGFsZXR0ZX0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuc2VydmljZVwiO1xuaW1wb3J0IHtOZ3hUVGl0YW5Db2xvclBpY2tlcklucHV0RGlyZWN0aXZlfSBmcm9tIFwiLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1pbnB1dC5kaXJlY3RpdmVcIjtcbmltcG9ydCB7Tmd4VFRpdGFuQ29sb3JQaWNrZXJQYWxldHRlTGlzdENvbXBvbmVudH0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXItcGFsZXR0ZS1saXN0L25neC10dGl0YW4tY29sb3ItcGlja2VyLXBhbGV0dGUtbGlzdC5jb21wb25lbnRcIjtcbi8vW25nU3R5bGVdPVwie2JhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQodG8gdG9wLCAnICsgbmd4VFRpdGFuQ29sb3JQaWNrZXJTZXJ2aWNlLmN1cnJlbnRDb2xvciArICcgMThweCwgcmdiKDI1NSwgNzcsIDI1NSkgY2FsYygxMDAlIC0gMThweCknfVwiXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItbmd4LXR0aXRhbi1jb2xvci1waWNrZXInLFxuICB0ZW1wbGF0ZTogYDxkaXZcclxuICBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyLXdyYXBwZXJcIlxyXG4+XHJcbiAgPGRpdiBjbGFzcz1cInBpY2tlci1pbnB1dC13cmFwcGVyXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWlucHV0LWxhYmVsXCI+XHJcbiAgICAgIDxsYWJlbCBbZm9yXT1cInV1aWRcIiA+e3t0aXRsZX19IHt7Y29sb3J9fTwvbGFiZWw+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItaW5wdXQtaG9sZGVyXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItY29sb3JcIiBbbmdTdHlsZV09XCJ7YmFja2dyb3VuZDogY3VycmVudENvbG9yQWxwaGF9XCI+XHJcblxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1pbnB1dFwiPlxyXG4gICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJJbnB1dFxyXG4gICAgICAgICAgI3BpY2tlcklucHV0PVwibGliTmd4VFRpdGFuQ29sb3JQaWNrZXJJbnB1dFwiXHJcbiAgICAgICAgICAoaW5wdXRDaGFuZ2UpPVwiaW5wdXRDb2xvckNoYW5nZSgkZXZlbnQpXCJcclxuICAgICAgICAgIFtmb3JtYXRdPVwiaW5wdXRGb3JtYXRcIlxyXG4gICAgICAgICAgW2lkXT1cInV1aWRcIlxyXG4gICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgKGZvY3VzKT1cIm9wZW5QaWNrZXIoKVwiXHJcbiAgICAgICAgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDwhLS08ZGl2IGNsYXNzPVwicGlja2VyLXNhdmUtc2lnblwiPi0tPlxyXG4gICAgICA8IS0tUy0tPlxyXG4gICAgICA8IS0tPC9kaXY+LS0+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyXCIgW25nQ2xhc3NdPVwieyduby1hbHBoYSc6ICFhbHBoYSwgJ29wZW4nOiBwaWNrZXJPcGVufVwiPlxyXG4gICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19NYWluQ29sb3JcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19Db2xvckxheWVyXCIgW25nU3R5bGVdPVwie2JhY2tncm91bmRDb2xvcjogY3VycmVudENvbG9yTWF4fVwiID48L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19TbGlkYWJsZVwiIGxpYk5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3IgI21haW5Db2xvcj1cImxpYk5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JcIiAoY2hhbmdlKT1cImNvbG9yUGlja2VyU2VydmljZS5zYXR1cmF0aW9uQ2hhbmdlKCRldmVudCwgdGhpcylcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0RyYWdnZXJcIiBsaWJOZ3hUVGl0YW5Db2xvclBpY2tlckRyYWdnZXIgc3R5bGU9XCJ0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDBweCwgMHB4LCAwcHgpO1wiPjwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19IdWVQaWNrZXJcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19TbGlkYWJsZVwiIGxpYk5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3IgI2h1ZVBpY2tlcj1cImxpYk5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JcIiAoY2hhbmdlKT1cImNvbG9yUGlja2VyU2VydmljZS5odWVDaGFuZ2UoJGV2ZW50LCB0aGlzKVwiIFtkaXJlY3Rpb25dPVwiJ3ZlcnRpY2FsJ1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fRHJhZ2dlclwiIGxpYk5neFRUaXRhbkNvbG9yUGlja2VyRHJhZ2dlciBbcGlja2VyUGFkXT1cIjBcIiBzdHlsZT1cIiB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDBweCwgMHB4LCAwcHgpO1wiPjwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19BbHBoYVBpY2tlclwiICpuZ0lmPVwiYWxwaGEgPT09IHRydWVcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19Db2xvckxheWVyXCJcclxuXHJcbiAgICAgICAgICAgW25nU3R5bGVdPVwie2JhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQodG8gdG9wLCAnICsgY3VycmVudENvbG9yQWxwaGFaZXJvICsgJyAgMThweCwgJyArIGN1cnJlbnRDb2xvciArICcgY2FsYygxMDAlIC0gMThweCknfVwiXHJcbiAgICAgID48L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19TbGlkYWJsZVwiIGxpYk5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3IgI2FscGhhUGlja2VyPVwibGliTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvclwiIChjaGFuZ2UpPVwiY29sb3JQaWNrZXJTZXJ2aWNlLmFscGhhQ2hhbmdlKCRldmVudCwgdGhpcylcIiBbZGlyZWN0aW9uXT1cIid2ZXJ0aWNhbCdcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0RyYWdnZXJcIiBsaWJOZ3hUVGl0YW5Db2xvclBpY2tlckRyYWdnZXIgW3BpY2tlclBhZF09XCIwXCIgc3R5bGU9XCIgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwcHgsIDBweCwgMHB4KTtcIj48L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDwhLS08ZGl2IHN0eWxlPVwiaGVpZ2h0OiA0MHB4OyB3aWR0aDogNDBweFwiIFtuZ1N0eWxlXT1cIntiYWNrZ3JvdW5kOiBjdXJyZW50Q29sb3J9XCI+LS0+XHJcblxyXG4gICAgPCEtLTwvZGl2Pi0tPlxyXG4gICAgPCEtLTxkaXYgc3R5bGU9XCJoZWlnaHQ6IDQwcHg7IHdpZHRoOiA0MHB4XCIgW25nU3R5bGVdPVwie2JhY2tncm91bmQ6IGN1cnJlbnRDb2xvckFscGhhfVwiPi0tPlxyXG5cclxuICAgIDwhLS08L2Rpdj4tLT5cclxuICA8L2Rpdj5cclxuICA8bGliLW5neC10dGl0YW4tY29sb3ItcGlja2VyLXBhbGV0dGUtbGlzdFxyXG4gICAgKGNoYW5nZSk9XCJpbnB1dENvbG9yQ2hhbmdlKCRldmVudClcIlxyXG4gICAgW3BhbGxldHNdPVwicGlja2VyUGFsbGV0c1wiXHJcbiAgPlxyXG5cclxuICA8L2xpYi1uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1wYWxldHRlLWxpc3Q+XHJcbjwvZGl2PlxyXG5cclxuYCxcbiAgc3R5bGVzOiBbYDpob3N0ICosOmhvc3QgOmFmdGVyLDpob3N0IDpiZWZvcmV7Ym94LXNpemluZzpib3JkZXItYm94fTpob3N0IC5waWNrZXItaW5wdXQtd3JhcHBlcnttYXJnaW4tYm90dG9tOjZweH06aG9zdCAucGlja2VyLWlucHV0LXdyYXBwZXIgLnBpY2tlci1pbnB1dC1sYWJlbHttYXJnaW4tYm90dG9tOjZweH06aG9zdCAucGlja2VyLWlucHV0LXdyYXBwZXIgLnBpY2tlci1pbnB1dC1sYWJlbCBsYWJlbHt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7Zm9udC13ZWlnaHQ6NjAwfTpob3N0IC5waWNrZXItaW5wdXQtd3JhcHBlciAucGlja2VyLWlucHV0LWhvbGRlcntkaXNwbGF5OmZsZXg7aGVpZ2h0OjMzcHg7Ym9yZGVyOjFweCBzb2xpZCAjYmJiO292ZXJmbG93OmhpZGRlbjtib3JkZXItcmFkaXVzOjNweDtiYWNrZ3JvdW5kLWNvbG9yOiNlZWV9Omhvc3QgLnBpY2tlci1pbnB1dC13cmFwcGVyIC5waWNrZXItaW5wdXQtaG9sZGVyIC5waWNrZXItY29sb3J7ZmxleDowIDAgMzFweDtiYWNrZ3JvdW5kLWNvbG9yOiNmZjAzMDB9Omhvc3QgLnBpY2tlci1pbnB1dC13cmFwcGVyIC5waWNrZXItaW5wdXQtaG9sZGVyIC5waWNrZXItaW5wdXR7ZmxleDphdXRvO2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnR9Omhvc3QgLnBpY2tlci1pbnB1dC13cmFwcGVyIC5waWNrZXItaW5wdXQtaG9sZGVyIC5waWNrZXItaW5wdXQgaW5wdXR7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtjb2xvcjojMjcyNzI3O2ZvbnQtZmFtaWx5Om1vbm9zcGFjZTtmb250LXNpemU6MTRweDtib3JkZXI6bm9uZTtvdXRsaW5lOjA7cGFkZGluZzo4cHggMnB4IDhweCA4cHg7d2lkdGg6MTAwJX06aG9zdCAucGlja2VyLWlucHV0LXdyYXBwZXIgLnBpY2tlci1pbnB1dC1ob2xkZXIgLnBpY2tlci1zYXZlLXNpZ257ZmxleDowIDAgMzFweDtsaW5lLWhlaWdodDozM3B4O3RleHQtYWxpZ246Y2VudGVyfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcnttYXgtaGVpZ2h0OjA7b3ZlcmZsb3c6aGlkZGVuOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZTtkaXNwbGF5OmZsZXg7dHJhbnNpdGlvbjptYXgtaGVpZ2h0IC4zc306aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXIub3BlbnttYXJnaW4tYm90dG9tOjVweDttYXgtaGVpZ2h0OjE2NXB4fTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fQ29sb3JMYXllcntwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjEwO3RvcDowO2xlZnQ6MDtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO2JveC1zaGFkb3c6aW5zZXQgMCAwIDJweCAwIHJnYmEoMCwwLDAsLjUpO3BvaW50ZXItZXZlbnRzOm5vbmV9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19TbGlkYWJsZXtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO2N1cnNvcjpwb2ludGVyfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fRHJhZ2dlcntwb3NpdGlvbjpyZWxhdGl2ZTt6LWluZGV4OjMwO2JvdHRvbTouOXJlbTstd2Via2l0LXRyYW5zZm9ybTpub25lO3RyYW5zZm9ybTpub25lO2hlaWdodDoxOHB4O3dpZHRoOjE4cHg7bWFyZ2luOjAgYXV0bzstd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuO2JhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuO3dpbGwtY2hhbmdlOnRyYW5zZm9ybTtiYWNrZ3JvdW5kOjAgMDtib3JkZXI6M3B4IHNvbGlkICNmZmY7Ym94LXNoYWRvdzowIDAgMCAxcHggcmdiYSg2LDQ0LDgyLC4xKSwwIDJweCAxNnB4IHJnYmEoMzMsNDMsNTQsLjA4KSxpbnNldCAwIDAgMCAxcHggcmdiYSg2LDQ0LDgyLC4xKSwwIDJweCAxNnB4IHJnYmEoMzMsNDMsNTQsLjA4KTtib3JkZXItcmFkaXVzOjUwJTtwb2ludGVyLWV2ZW50czpub25lO3RvdWNoLWFjdGlvbjpub25lfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fTWFpbkNvbG9ye2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KDQ1ZGVnLCNkZmUzZTggMjUlLHRyYW5zcGFyZW50IDApLGxpbmVhci1ncmFkaWVudCgtNDVkZWcsI2RmZTNlOCAyNSUsdHJhbnNwYXJlbnQgMCksbGluZWFyLWdyYWRpZW50KDQ1ZGVnLHRyYW5zcGFyZW50IDc1JSwjZGZlM2U4IDApLGxpbmVhci1ncmFkaWVudCgtNDVkZWcsdHJhbnNwYXJlbnQgNzUlLCNkZmUzZTggMCk7YmFja2dyb3VuZC1zaXplOjEuNnJlbSAxLjZyZW07YmFja2dyb3VuZC1wb3NpdGlvbjowIDAsMCAuOHJlbSwuOHJlbSAtLjhyZW0sLS44cmVtIDA7cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6aGlkZGVuO3dpZHRoOjE2NXB4O2hlaWdodDoxNjVweDtib3JkZXItcmFkaXVzOjRweDtjdXJzb3I6cG9pbnRlcn06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX01haW5Db2xvciAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0NvbG9yTGF5ZXJ7Ym94LXNoYWRvdzppbnNldCAwIDAgMCAxcHggcmdiYSg2LDQ0LDgyLC4xKSwwIDJweCAxNnB4IHJnYmEoMzMsNDMsNTQsLjA4KTtib3JkZXItcmFkaXVzOjRweH06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX01haW5Db2xvciAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0RyYWdnZXJ7cmlnaHQ6LjlyZW07bWFyZ2luOjB9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19NYWluQ29sb3I6YWZ0ZXIsOmhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19NYWluQ29sb3I6YmVmb3Jle2NvbnRlbnQ6XCJcIjtwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjIwO3RvcDowO2xlZnQ6MDtkaXNwbGF5OmJsb2NrO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7cG9pbnRlci1ldmVudHM6bm9uZTtib3JkZXItcmFkaXVzOjNweH06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX01haW5Db2xvcjpiZWZvcmV7YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoOTBkZWcsI2ZmZix0cmFuc3BhcmVudCl9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19NYWluQ29sb3I6YWZ0ZXJ7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQoMGRlZywjMDAwLHRyYW5zcGFyZW50KTtib3gtc2hhZG93Omluc2V0IDAgMCAwIDFweCByZ2JhKDYsNDQsODIsLjEpLDAgMnB4IDE2cHggcmdiYSgzMyw0Myw1NCwuMDgpfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fQWxwaGFQaWNrZXIsOmhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19IdWVQaWNrZXJ7cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6aGlkZGVuO2hlaWdodDoxNjVweDt3aWR0aDoyNHB4O21hcmdpbi1sZWZ0Oi44cmVtO2JvcmRlci13aWR0aDozcHg7Ym9yZGVyLXJhZGl1czo4cmVtO3BhZGRpbmc6MTNweCAwfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fSHVlUGlja2Vye2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSxyZWQgMCwjZmYwIDIxJSwjMGYwIDMzJSwjMGZmIDUwJSwjMDBmIDY3JSwjZjBmIDgzJSxyZWQgMTAwJSk7Ym94LXNoYWRvdzppbnNldCAwIDAgMnB4IDAgcmdiYSgwLDAsMCwuNSl9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19BbHBoYVBpY2tlcntiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudCg0NWRlZywjZGZlM2U4IDI1JSx0cmFuc3BhcmVudCAwKSxsaW5lYXItZ3JhZGllbnQoLTQ1ZGVnLCNkZmUzZTggMjUlLHRyYW5zcGFyZW50IDApLGxpbmVhci1ncmFkaWVudCg0NWRlZyx0cmFuc3BhcmVudCA3NSUsI2RmZTNlOCAwKSxsaW5lYXItZ3JhZGllbnQoLTQ1ZGVnLHRyYW5zcGFyZW50IDc1JSwjZGZlM2U4IDApO2JhY2tncm91bmQtc2l6ZToxLjZyZW0gMS42cmVtO2JhY2tncm91bmQtcG9zaXRpb246MCAwLDAgLjhyZW0sLjhyZW0gLS44cmVtLC0uOHJlbSAwfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fQWxwaGFQaWNrZXIgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19Db2xvckxheWVye2JvcmRlci1yYWRpdXM6OHJlbX06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXIubm8tYWxwaGEgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19NYWluQ29sb3J7d2lkdGg6MjAwcHh9YF0sXG59KVxuZXhwb3J0IGNsYXNzIE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pIGNvbXBvbmVudENsaWNrKCRldmVudCkge1xuICAgIGlmKCF0aGlzLnBpY2tlck9wZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYodHlwZW9mICRldmVudC5wYXRoICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBsZXQgcGlja2VyRm91bmQgPSBmYWxzZTtcbiAgICAgICRldmVudC5wYXRoLmV2ZXJ5KGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgaWYoXG4gICAgICAgICAgdHlwZW9mIGl0ZW0uY2xhc3NMaXN0ICE9PSBcInVuZGVmaW5lZFwiXG4gICAgICAgICkge1xuICAgICAgICAgIGlmKFxuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ3BpY2tlci1pbnB1dC1ob2xkZXInKSB8fFxuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ25neC10dGl0YW4tY29sb3ItcGlja2VyJylcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHBpY2tlckZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0pO1xuXG4gICAgICBpZighcGlja2VyRm91bmQpIHtcbiAgICAgICAgdGhpcy5jbG9zZVBpY2tlcigpO1xuICAgICAgfVxuXG4gICAgfVxuICB9XG5cbiAgQElucHV0KCdhbHBoYScpIHB1YmxpYyBhbHBoYTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoJ2NvbG9yJykgcHVibGljIGNvbG9yOiBzdHJpbmcgPSAncmdiYSgyNTUsMjU1LDI1NSwwKSc7XG4gIEBJbnB1dCgndGl0bGUnKSBwdWJsaWMgdGl0bGU6IHN0cmluZyA9ICd0aXRsZSc7XG4gIEBJbnB1dCgnb3V0Rm9ybWF0JykgcHVibGljIG91dEZvcm1hdDogc3RyaW5nID0gJ2hleDYnO1xuICBASW5wdXQoJ2lucHV0Rm9ybWF0JykgcHVibGljIGlucHV0Rm9ybWF0OiBzdHJpbmcgPSAnaGV4Nic7XG4gIEBJbnB1dCgnYXZhaWxQYWxsZXRzJykgcHVibGljIGF2YWlsUGFsbGV0czogQXJyYXk8c3RyaW5nPiA9IFsncG9sYXJpcycsICdtYXRlcmlhbCddO1xuICBASW5wdXQoJ2N1c3RvbVBhbGxldHMnKSBwdWJsaWMgY3VzdG9tUGFsbGV0czogIEFycmF5PFBhbGV0dGU+ID0gW107XG4gIEBPdXRwdXQoJ2NvbG9yQ2hhbmdlZCcpIHB1YmxpYyBjb2xvckNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgQFZpZXdDaGlsZCgncGlja2VySW5wdXQnKSBwdWJsaWMgcGlja2VySW5wdXQ6IE5neFRUaXRhbkNvbG9yUGlja2VySW5wdXREaXJlY3RpdmU7XG5cbiAgQFZpZXdDaGlsZChOZ3hUVGl0YW5Db2xvclBpY2tlclBhbGV0dGVMaXN0Q29tcG9uZW50KSBwdWJsaWMgcGFsZXR0ZUxpc3Q6IE5neFRUaXRhbkNvbG9yUGlja2VyUGFsZXR0ZUxpc3RDb21wb25lbnQ7XG5cbiAgQFZpZXdDaGlsZCgnbWFpbkNvbG9yJykgcHVibGljIG1haW5Db2xvcjogTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvckRpcmVjdGl2ZSA9IG51bGw7XG4gIEBWaWV3Q2hpbGQoJ2h1ZVBpY2tlcicpIHB1YmxpYyBodWVQaWNrZXI6IE5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JEaXJlY3RpdmU7XG4gIEBWaWV3Q2hpbGQoJ2FscGhhUGlja2VyJykgcHVibGljIGFscGhhUGlja2VyOiBOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yRGlyZWN0aXZlO1xuXG4gIHB1YmxpYyBjb2xvckluaXQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIHBpY2tlck9wZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwdWJsaWMgcGlja2VyUGFsbGV0czogQXJyYXk8UGFsZXR0ZT4gPSBbXTtcblxuICBwdWJsaWMgaHN2YTogSFNWQSA9IHtcbiAgICBodWU6IDAsXG4gICAgc2F0dXJhdGlvbjogMTAwLFxuICAgIHZhbHVlOiAxMDAsXG4gICAgYWxwaGE6IDFcbiAgfTtcblxuICBwdWJsaWMgY3VycmVudENvbG9yOiBzdHJpbmcgPSAncmdiKDI1NSwwLDApJztcbiAgcHVibGljIGN1cnJlbnRDb2xvck1heDogc3RyaW5nID0gJ3JnYmEoMjU1LDAsMCwxKSc7XG4gIHB1YmxpYyBjdXJyZW50Q29sb3JBbHBoYTogc3RyaW5nID0gJ3JnYmEoMjU1LDAsMCwxKSc7XG4gIHB1YmxpYyBjdXJyZW50Q29sb3JBbHBoYVplcm86IHN0cmluZyA9ICdyZ2JhKDI1NSwwLDAsMCknO1xuXG4gIHB1YmxpYyB1dWlkOiBzdHJpbmcgPSAncGlja2VyLSc7XG5cbiAgcHVibGljIGFsbG93ZWRGb3JtYXRzOiBBcnJheTxzdHJpbmc+ID0gWydoZXg2JywgJ2hleDgnLCAncmdiJywgJ3JnYmEnXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgY29sb3JQaWNrZXJTZXJ2aWNlOiBOZ3hUVGl0YW5Db2xvclBpY2tlclNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy51dWlkID0gdGhpcy5jb2xvclBpY2tlclNlcnZpY2UuZ2V0UGlja2VyVXVpZCgpO1xuICAgIHRoaXMudmFsaWRhdGVJbnB1dFBhcmFtcygpO1xuICAgIHRoaXMuY29sb3JQaWNrZXJTZXJ2aWNlLnByZXBhcmVQaWNrZXJQYWxsZXRzKHRoaXMuYXZhaWxQYWxsZXRzLCB0aGlzLmN1c3RvbVBhbGxldHMsIHRoaXMpO1xuXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNvbG9yUGlja2VyU2VydmljZS5jb2xvclRvRGF0YSh0aGlzLmNvbG9yLCB0aGlzKTtcbiAgfVxuXG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuc2V0RHJhZ2dlc1RvQ3VycmVudENvbG9yKCk7XG4gIH1cblxuICBvcGVuUGlja2VyKCkge1xuICAgIHRoaXMucGlja2VyT3BlbiA9IHRydWU7XG4gICAgaWYodHlwZW9mIHRoaXMucGFsZXR0ZUxpc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLnBhbGV0dGVMaXN0LmNsb3NlUGFsZXR0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGNsb3NlUGlja2VyKCkge1xuICAgIHRoaXMucGlja2VyT3BlbiA9IGZhbHNlO1xuICB9XG5cbiAgdmFsaWRhdGVJbnB1dFBhcmFtcygpIHtcbiAgICBpZih0aGlzLmFsbG93ZWRGb3JtYXRzLmluZGV4T2YodGhpcy5vdXRGb3JtYXQpID09PSAtMSkge1xuICAgICAgdGhpcy5vdXRGb3JtYXQgPSAnaGV4Nic7XG4gICAgICBjb25zb2xlLmdyb3VwKFwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJcIik7XG4gICAgICBjb25zb2xlLndhcm4oJ1tvdXRGb3JtYXRdIG11c3QgYmUgb25lIG9mIHRoaXMgKCcgKyB0aGlzLmFsbG93ZWRGb3JtYXRzLmpvaW4oJywnKSArICcpJyk7XG4gICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gICAgfVxuICAgIGlmKHRoaXMuYWxsb3dlZEZvcm1hdHMuaW5kZXhPZih0aGlzLmlucHV0Rm9ybWF0KSA9PT0gLTEpIHtcbiAgICAgIHRoaXMuaW5wdXRGb3JtYXQgPSB0aGlzLm91dEZvcm1hdCArICcnO1xuICAgICAgY29uc29sZS5ncm91cChcIm5neC10dGl0YW4tY29sb3ItcGlja2VyXCIpO1xuICAgICAgY29uc29sZS53YXJuKCdbaW5wdXRGb3JtYXRdIG11c3QgYmUgb25lIG9mIHRoaXMgKCcgKyB0aGlzLmFsbG93ZWRGb3JtYXRzLmpvaW4oJywnKSArICcpJyk7XG4gICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gICAgfVxuICB9XG5cblxuICBpbnB1dENvbG9yQ2hhbmdlKGNvbG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgdGhpcy5jb2xvclBpY2tlclNlcnZpY2UuY29sb3JUb0RhdGEodGhpcy5jb2xvciwgdGhpcyk7XG4gICAgdGhpcy5zZXREcmFnZ2VzVG9DdXJyZW50Q29sb3IoKTtcbiAgfVxuXG4gIHVwZGF0ZVJldHVybkNvbG9yKCkge1xuICAgIHRoaXMuY29sb3IgPSB0aGlzLmNvbG9yUGlja2VyU2VydmljZS5wcmVwYXJlUmV0dXJuQ29sb3IodGhpcy5oc3ZhLCB0aGlzLm91dEZvcm1hdCk7XG5cbiAgICBpZih0aGlzLmNvbG9ySW5pdCkge1xuICAgICAgdGhpcy5jb2xvckNoYW5nZWQuZW1pdCh0aGlzLmNvbG9yICsgJycpO1xuICAgIH1cbiAgICB0aGlzLmNvbG9ySW5pdCA9IHRydWU7XG4gIH1cblxuXG4gIHNldElucHV0VmFsdWUoKSB7XG4gICAgaWYodHlwZW9mIHRoaXMucGlja2VySW5wdXQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLnBpY2tlcklucHV0LnNldElucHV0VmFsdWUoXG4gICAgICAgIHRoaXMuY29sb3JQaWNrZXJTZXJ2aWNlLnByZXBhcmVSZXR1cm5Db2xvcih0aGlzLmhzdmEsIHRoaXMuaW5wdXRGb3JtYXQpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHNldERyYWdnZXNUb0N1cnJlbnRDb2xvcigpIHtcblxuICAgIGlmKHRoaXMubWFpbkNvbG9yICE9PSBudWxsKSB7XG4gICAgICB0aGlzLm1haW5Db2xvci5zZXREcmFnZ2VyKFxuICAgICAgICB7XG4gICAgICAgICAgeDogdGhpcy5oc3ZhLnNhdHVyYXRpb24sXG4gICAgICAgICAgeTogMTAwIC0gdGhpcy5oc3ZhLnZhbHVlXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYodHlwZW9mIHRoaXMuaHVlUGlja2VyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5odWVQaWNrZXIuc2V0RHJhZ2dlcih7eDogMCwgeTogTWF0aC5yb3VuZCh0aGlzLmhzdmEuaHVlICogMTAwIC8gMzYwKX0pO1xuICAgIH1cblxuICAgIGlmKHR5cGVvZiB0aGlzLmFscGhhUGlja2VyICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLmFscGhhKSB7XG4gICAgICB0aGlzLmFscGhhUGlja2VyLnNldERyYWdnZXIoe3g6IDAsIHk6IDEwMCAtICh0aGlzLmhzdmEuYWxwaGEgKiAxMDApfSk7XG4gICAgfVxuXG4gIH1cblxufVxuIiwiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tsaWJOZ3hUVGl0YW5Db2xvclBpY2tlckRyYWdnZXJdJ1xufSlcbmV4cG9ydCBjbGFzcyBOZ3hUVGl0YW5Db2xvclBpY2tlckRyYWdnZXJEaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgncGlja2VyUGFkJykgcHVibGljIHBpY2tlclBhZDogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxSZWY6IEVsZW1lbnRSZWYpIHsgfVxuXG5cbiAgcHVibGljIHNldFBvc2l0aW9uKHg6IG51bWJlciwgeTogbnVtYmVyLCBkaXJlY3Rpb246IHN0cmluZyk6IHZvaWQge1xuXG4gICAgbGV0IHJlY3QgPSB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICBpZihkaXJlY3Rpb24gPT0gJ3ZlcnRpY2FsJyB8fCBkaXJlY3Rpb24gPT0gJ2JvdGgnKSB7XG4gICAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gTWF0aC5yb3VuZCgoeSAtICgocmVjdC5oZWlnaHQpIC8gMikpKSArICdweCc7XG4gICAgfVxuICAgIGlmKGRpcmVjdGlvbiA9PSAnaG9yaXpvbnRhbCcgfHwgZGlyZWN0aW9uID09ICdib3RoJykge1xuICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSBNYXRoLnJvdW5kKCh4IC0gKChyZWN0LndpZHRoKSAvIDIpKSkgKyAncHgnO1xuICAgIH1cblxuICB9XG5cbn1cbiIsImltcG9ydCB7XG4gIENvbnRlbnRDaGlsZCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ3hUVGl0YW5Db2xvclBpY2tlckRyYWdnZXJEaXJlY3RpdmV9IGZyb20gXCIuL25neC10dGl0YW4tY29sb3ItcGlja2VyLWRyYWdnZXIuZGlyZWN0aXZlXCI7XG4vLyBpbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgb2Z9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge2Zyb21FdmVudCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGludGVyZmFjZSBDdXN0b21SZWN0IHtcbiAgaGVpZ2h0OiBudW1iZXIsXG4gIGxlZnQ6IG51bWJlcixcbiAgdG9wOiBudW1iZXIsXG4gIHdpZHRoOiBudW1iZXJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDdXN0b21QZXJjZW50IHtcbiAgeDogbnVtYmVyLFxuICB5OiBudW1iZXIsXG59XG5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2xpYk5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JdJyxcbiAgZXhwb3J0QXM6ICdsaWJOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yJ1xufSlcbmV4cG9ydCBjbGFzcyBOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95e1xuXG4gIEBJbnB1dCgnZGlyZWN0aW9uJykgcHVibGljIGRpcmVjdGlvbjogc3RyaW5nID0gJ2JvdGgnO1xuXG4gIEBDb250ZW50Q2hpbGQoTmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyRGlyZWN0aXZlKSBwdWJsaWMgZHJhZ2dlcjogTmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyRGlyZWN0aXZlID0gbnVsbDtcblxuICBAT3V0cHV0KCdjaGFuZ2UnKSBwdWJsaWMgY2hhbmdlOiBFdmVudEVtaXR0ZXI8Q3VzdG9tUGVyY2VudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEN1c3RvbVBlcmNlbnQ+KCk7XG5cbiAgcHVibGljIGVsOiBIVE1MRWxlbWVudCA9IG51bGw7XG4gIHB1YmxpYyBkcmFnU3RhcnQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGdsb2JhbE1vdXNlTW92ZTogU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgcHVibGljIGdsb2JhbE1vdXNlVXA6IFN1YnNjcmlwdGlvbiA9IG51bGw7XG5cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWRvd24nLCBbJyRldmVudCddKSBwdWJsaWMgb25Nb3VzZURvd24oJGV2ZW50KSB7XG4gICAgdGhpcy5kcmFnU3RhcnQgPSB0cnVlO1xuICAgIHRoaXMuZ2V0UG9zaXRpb24oJGV2ZW50KTtcbiAgfVxuXG5cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLmVsID0gdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuZGlyZWN0aW9uID0gKFsnYm90aCcsICd2ZXJ0aWNhbCcsICdob3Jpem9udGFsJ10uaW5kZXhPZih0aGlzLmRpcmVjdGlvbikgPT09IC0xKSA/ICdib3RoJyA6IHRoaXMuZGlyZWN0aW9uO1xuICAgIHRoaXMuZ2xvYmFsTW91c2VNb3ZlID0gZnJvbUV2ZW50KHdpbmRvdywgJ21vdXNlbW92ZScpLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgIGlmKHRoaXMuZHJhZ1N0YXJ0KSB7XG4gICAgICAgIHRoaXMuZ2V0UG9zaXRpb24oPE1vdXNlRXZlbnQ+ZXZlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuZ2xvYmFsTW91c2VVcCA9IGZyb21FdmVudCh3aW5kb3csICdtb3VzZXVwJykuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgaWYodGhpcy5kcmFnU3RhcnQpIHtcbiAgICAgICAgdGhpcy5kcmFnU3RhcnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5nZXRQb3NpdGlvbig8TW91c2VFdmVudD5ldmVudCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmKHRoaXMuZ2xvYmFsTW91c2VNb3ZlICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmdsb2JhbE1vdXNlTW92ZS51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZih0aGlzLmdsb2JhbE1vdXNlVXAgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuZ2xvYmFsTW91c2VVcC51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXREcmFnZ2VyKHBlcnNlbnQ6IEN1c3RvbVBlcmNlbnQpIHtcbiAgICBpZih0aGlzLmRyYWdnZXIgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHBvc2l0aW9uOiBDdXN0b21SZWN0ID0gdGhpcy5nZXRSZWN0KHRoaXMuZWwpO1xuICAgIGxldCB4ID0gTWF0aC5yb3VuZCgoKHBvc2l0aW9uLndpZHRoIC0gdGhpcy5kcmFnZ2VyLnBpY2tlclBhZCAqIDIpICogcGVyc2VudC54IC8gMTAwKSk7XG4gICAgbGV0IHkgPSBNYXRoLnJvdW5kKCgocG9zaXRpb24uaGVpZ2h0IC0gdGhpcy5kcmFnZ2VyLnBpY2tlclBhZCAqIDIpICogcGVyc2VudC55IC8gMTAwKSk7XG4gICAgdGhpcy5kcmFnZ2VyLnNldFBvc2l0aW9uKFxuICAgICAgKHggPiB0aGlzLmRyYWdnZXIucGlja2VyUGFkKSA/IHggOiB0aGlzLmRyYWdnZXIucGlja2VyUGFkLFxuICAgICAgKHkgPiB0aGlzLmRyYWdnZXIucGlja2VyUGFkKSA/IHkgOiB0aGlzLmRyYWdnZXIucGlja2VyUGFkLFxuICAgICAgdGhpcy5kaXJlY3Rpb25cbiAgICApO1xuXG4gIH1cblxuICBwdWJsaWMgZ2V0UG9zaXRpb24oJGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgbGV0IGN1cnNvclkgPSAkZXZlbnQucGFnZVk7XG4gICAgbGV0IGN1cnNvclggPSAkZXZlbnQucGFnZVg7XG4gICAgbGV0IHBvc2l0aW9uOiBDdXN0b21SZWN0ID0gdGhpcy5nZXRSZWN0KHRoaXMuZWwpO1xuICAgIGxldCBwZXJjZW50OiBDdXN0b21QZXJjZW50ID0ge3g6IDAsIHk6IDB9O1xuICAgIGlmKHRoaXMuZGlyZWN0aW9uID09ICd2ZXJ0aWNhbCcgfHwgdGhpcy5kaXJlY3Rpb24gPT0gJ2JvdGgnKSB7XG4gICAgICBwZXJjZW50LnkgPSBNYXRoLnJvdW5kKChjdXJzb3JZIC0gKHBvc2l0aW9uLnRvcCkpICogMTAwIC8gKHBvc2l0aW9uLmhlaWdodCAtIHRoaXMuZHJhZ2dlci5waWNrZXJQYWQgKiAyKSk7XG4gICAgICBpZihwZXJjZW50LnkgPCAwKSB7XG4gICAgICAgIHBlcmNlbnQueSA9IDBcbiAgICAgIH0gZWxzZSBpZihwZXJjZW50LnkgPiAxMDApIHtcbiAgICAgICAgcGVyY2VudC55ID0gMTAwO1xuICAgICAgfVxuICAgIH1cbiAgICBpZih0aGlzLmRpcmVjdGlvbiA9PSAnaG9yaXpvbnRhbCcgfHwgdGhpcy5kaXJlY3Rpb24gPT0gJ2JvdGgnKSB7XG4gICAgICBwZXJjZW50LnggPSBNYXRoLnJvdW5kKChjdXJzb3JYIC0gKHBvc2l0aW9uLmxlZnQpKSAqIDEwMCAvIChwb3NpdGlvbi53aWR0aCAtIHRoaXMuZHJhZ2dlci5waWNrZXJQYWQgKiAyKSk7XG4gICAgICBpZihwZXJjZW50LnggPCAwKSB7XG4gICAgICAgIHBlcmNlbnQueCA9IDBcbiAgICAgIH0gZWxzZSBpZihwZXJjZW50LnggPiAxMDApIHtcbiAgICAgICAgcGVyY2VudC54ID0gMTAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2V0RHJhZ2dlcihwZXJjZW50KTtcbiAgICB0aGlzLmNoYW5nZS5lbWl0KHBlcmNlbnQpO1xuXG4gIH1cblxuXG5cbiAgcHVibGljIGdldFJlY3QoZWxlbTogSFRNTEVsZW1lbnQpOiBDdXN0b21SZWN0IHtcblxuICAgIGxldCBib3ggPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICBsZXQgZG9jRWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgbGV0IHNjcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2NFbC5zY3JvbGxUb3AgfHwgYm9keS5zY3JvbGxUb3A7XG4gICAgbGV0IHNjcm9sbExlZnQgPSB3aW5kb3cucGFnZVhPZmZzZXQgfHwgZG9jRWwuc2Nyb2xsTGVmdCB8fCBib2R5LnNjcm9sbExlZnQ7XG4gICAgbGV0IGNsaWVudFRvcCA9IGRvY0VsLmNsaWVudFRvcCB8fCBib2R5LmNsaWVudFRvcCB8fCAwO1xuICAgIGxldCBjbGllbnRMZWZ0ID0gZG9jRWwuY2xpZW50TGVmdCB8fCBib2R5LmNsaWVudExlZnQgfHwgMDtcblxuICAgIHJldHVybiB7XG4gICAgICBoZWlnaHQ6IGJveC5oZWlnaHQsXG4gICAgICBsZWZ0OiBib3gubGVmdCArIHNjcm9sbExlZnQgLSBjbGllbnRMZWZ0LFxuICAgICAgdG9wOiBib3gudG9wICsgc2Nyb2xsVG9wIC0gY2xpZW50VG9wLFxuICAgICAgd2lkdGg6IGJveC53aWR0aCxcbiAgICB9O1xuICB9XG5cblxuXG59XG4iLCJpbXBvcnQge1xuICBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ3hUVGl0YW5Db2xvclBpY2tlclNlcnZpY2V9IGZyb20gXCIuL25neC10dGl0YW4tY29sb3ItcGlja2VyLnNlcnZpY2VcIjtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2xpYk5neFRUaXRhbkNvbG9yUGlja2VySW5wdXRdJyxcbiAgZXhwb3J0QXM6ICdsaWJOZ3hUVGl0YW5Db2xvclBpY2tlcklucHV0J1xufSlcbmV4cG9ydCBjbGFzcyBOZ3hUVGl0YW5Db2xvclBpY2tlcklucHV0RGlyZWN0aXZlIHtcblxuICBASW5wdXQoJ2Zvcm1hdCcpIGZvcm1hdDogc3RyaW5nID0gJ2hleDYnO1xuICBAT3V0cHV0KCdpbnB1dENoYW5nZScpIHB1YmxpYyBpbnB1dENoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleXVwJykga2V5VXAoKSB7XG4gICAgdGhpcy5pbnB1dFZhbGlkYXRlKCk7XG4gIH1cbiAgQEhvc3RMaXN0ZW5lcignY2hhbmdlJykgY2hhbmdlKCkge1xuICAgIHRoaXMuaW5wdXRWYWxpZGF0ZSgpO1xuICB9XG5cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIGNvbG9yUGlja2VyU2VydmljZTogTmd4VFRpdGFuQ29sb3JQaWNrZXJTZXJ2aWNlXG4gICkgeyB9XG5cblxuICBzZXRJbnB1dFZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAoPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy5lbC5uYXRpdmVFbGVtZW50KS52YWx1ZSA9IHZhbHVlO1xuICB9XG5cblxuICBpbnB1dFZhbGlkYXRlKCkge1xuICAgIGxldCByZXMgPSB0aGlzLmNvbG9yUGlja2VyU2VydmljZS52YWxpZGF0ZUNvbG9yRm9ybWF0KFxuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnZhbHVlLFxuICAgICAgdGhpcy5mb3JtYXRcbiAgICApO1xuXG4gICAgaWYocmVzICE9PSAnbm90VmFsaWQnKSB7XG4gICAgICAoPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy5lbC5uYXRpdmVFbGVtZW50KS52YWx1ZSA9IHJlcztcbiAgICAgIHRoaXMuaW5wdXRDaGFuZ2UuZW1pdChyZXMpO1xuICAgIH1cblxuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JEaXJlY3RpdmUgfSBmcm9tICcuL25neC10dGl0YW4tY29sb3ItcGlja2VyLXNlbGVjdG9yLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOZ3hUVGl0YW5Db2xvclBpY2tlckRyYWdnZXJEaXJlY3RpdmUgfSBmcm9tICcuL25neC10dGl0YW4tY29sb3ItcGlja2VyLWRyYWdnZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQgeyBOZ3hUVGl0YW5Db2xvclBpY2tlcklucHV0RGlyZWN0aXZlIH0gZnJvbSAnLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1pbnB1dC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTmd4VFRpdGFuQ29sb3JQaWNrZXJQYWxldHRlTGlzdENvbXBvbmVudCB9IGZyb20gJy4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXItcGFsZXR0ZS1saXN0L25neC10dGl0YW4tY29sb3ItcGlja2VyLXBhbGV0dGUtbGlzdC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50LFxuICAgIE5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JEaXJlY3RpdmUsXG4gICAgTmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyRGlyZWN0aXZlLFxuICAgIE5neFRUaXRhbkNvbG9yUGlja2VySW5wdXREaXJlY3RpdmUsXG4gICAgTmd4VFRpdGFuQ29sb3JQaWNrZXJQYWxldHRlTGlzdENvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW05neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hUVGl0YW5Db2xvclBpY2tlck1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJJbmplY3RhYmxlIiwiRXZlbnRFbWl0dGVyIiwiQ29tcG9uZW50IiwiSW5wdXQiLCJPdXRwdXQiLCJIb3N0TGlzdGVuZXIiLCJWaWV3Q2hpbGQiLCJEaXJlY3RpdmUiLCJFbGVtZW50UmVmIiwiZnJvbUV2ZW50IiwiQ29udGVudENoaWxkIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFB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TUFBTSxFQUFFO3dCQUNOLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7d0JBQzFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7d0JBQzFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7d0JBQzFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO3dCQUNyRCxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUzt3QkFDckQsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7d0JBQ3JELFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO3dCQUNyRCxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUzt3QkFDckQsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7d0JBQ3JELFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO3dCQUNyRCxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUztxQkFDdEQ7aUJBQ0YsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO29CQUNoQixFQUFFLEVBQUUsVUFBVTtvQkFDZCxJQUFJLEVBQUUsVUFBVTtvQkFDaEIsTUFBTSxFQUFFO3dCQUNOLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO3dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUzt3QkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7d0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO3dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUzt3QkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7d0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO3dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUzt3QkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7d0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO3dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUzt3QkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7d0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO3dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUzt3QkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxF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