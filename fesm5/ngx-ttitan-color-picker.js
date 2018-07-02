import { Injectable, Directive, ElementRef, Input, EventEmitter, HostListener, Output, ContentChild, Component, NgModule, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, defineInjectable } from '@angular/core';
import { fromEvent } from 'rxjs/index';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    NgxTTitanColorPickerService.ctorParameters = function () { return []; };
    /** @nocollapse */ NgxTTitanColorPickerService.ngInjectableDef = defineInjectable({ factory: function NgxTTitanColorPickerService_Factory() { return new NgxTTitanColorPickerService(); }, token: NgxTTitanColorPickerService, providedIn: "root" });
    return NgxTTitanColorPickerService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxTTitanColorPickerDraggerDirective = /** @class */ (function () {
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
        { type: Directive, args: [{
                    selector: '[libNgxTTitanColorPickerDragger]'
                },] },
    ];
    /** @nocollapse */
    NgxTTitanColorPickerDraggerDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    NgxTTitanColorPickerDraggerDirective.propDecorators = {
        pickerPad: [{ type: Input, args: ['pickerPad',] }]
    };
    return NgxTTitanColorPickerDraggerDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxTTitanColorPickerSelectorDirective = /** @class */ (function () {
    function NgxTTitanColorPickerSelectorDirective(elRef, colorPickerService) {
        var _this = this;
        this.elRef = elRef;
        this.colorPickerService = colorPickerService;
        this.direction = 'both';
        this.dragger = null;
        this.change = new EventEmitter();
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
        { type: Directive, args: [{
                    selector: '[libNgxTTitanColorPickerSelector]',
                    exportAs: 'libNgxTTitanColorPickerSelector'
                },] },
    ];
    /** @nocollapse */
    NgxTTitanColorPickerSelectorDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgxTTitanColorPickerService }
    ]; };
    NgxTTitanColorPickerSelectorDirective.propDecorators = {
        direction: [{ type: Input, args: ['direction',] }],
        dragger: [{ type: ContentChild, args: [NgxTTitanColorPickerDraggerDirective,] }],
        change: [{ type: Output, args: ['change',] }],
        onMouseDown: [{ type: HostListener, args: ['mousedown', ['$event'],] }]
    };
    return NgxTTitanColorPickerSelectorDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxTTitanColorPickerInputDirective = /** @class */ (function () {
    function NgxTTitanColorPickerInputDirective(el, colorPickerService) {
        this.el = el;
        this.colorPickerService = colorPickerService;
        this.format = 'hex6';
        this.inputChange = new EventEmitter();
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
        (/** @type {?} */ (this.el.nativeElement)).value = value;
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
            (/** @type {?} */ (this.el.nativeElement)).value = res;
            this.inputChange.emit(res);
        }
    };
    NgxTTitanColorPickerInputDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[libNgxTTitanColorPickerInput]',
                    exportAs: 'libNgxTTitanColorPickerInput'
                },] },
    ];
    /** @nocollapse */
    NgxTTitanColorPickerInputDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: NgxTTitanColorPickerService }
    ]; };
    NgxTTitanColorPickerInputDirective.propDecorators = {
        format: [{ type: Input, args: ['format',] }],
        inputChange: [{ type: Output, args: ['inputChange',] }],
        keyUp: [{ type: HostListener, args: ['keyup',] }],
        change: [{ type: HostListener, args: ['change',] }]
    };
    return NgxTTitanColorPickerInputDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxTTitanColorPickerPaletteListComponent = /** @class */ (function () {
    function NgxTTitanColorPickerPaletteListComponent() {
        this.pallets = [];
        this.change = new EventEmitter();
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
        { type: Component, args: [{
                    selector: 'lib-ngx-ttitan-color-picker-palette-list',
                    template: "<div class=\"picker-palette-wrapper\" *ngIf=\"pallets.length > 0\">\n  <div class=\"palette-links\">\n    <div\n      class=\"palette-link\"\n      *ngFor=\"let palette of pallets\"\n      [ngClass]=\"{'selected': (activePalette !== null && activePalette.id == palette.id)}\"\n      (click)=\"selectPalette(palette)\"\n    >\n      {{palette.name}}\n    </div>\n  </div>\n  <div class=\"palette-picker-holder\" *ngIf=\"activePalette !== null && activePalette.colors.length > 0\">\n    <div\n      class=\"palette-color\"\n      *ngFor=\"let color of activePalette.colors\"\n      [ngStyle]=\"{\n        backgroundColor: color\n      }\"\n      (click)=\"colorSelected(color)\"\n    >\n\n    </div>\n  </div>\n</div>\n",
                    styles: [":host .picker-palette-wrapper .palette-links{display:flex;flex-wrap:wrap;margin-bottom:5px}:host .picker-palette-wrapper .palette-links .palette-link{margin-right:5px;border-radius:3px;padding:2px 4px;border:1px solid #ddd;text-transform:uppercase;font-size:10px;font-family:-apple-system,BlinkMacSystemFont,San Francisco,Roboto,Segoe UI,Helvetica Neue,sans-serif;font-weight:600;background-color:#fff;cursor:pointer}:host .picker-palette-wrapper .palette-links .palette-link.selected{background-color:#5e6bc5;color:#fff}:host .picker-palette-wrapper .palette-picker-holder{height:165px;display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:flex-start;align-content:baseline}:host .picker-palette-wrapper .palette-picker-holder .palette-color{cursor:pointer;width:10px;height:10px}"]
                },] },
    ];
    /** @nocollapse */
    NgxTTitanColorPickerPaletteListComponent.ctorParameters = function () { return []; };
    NgxTTitanColorPickerPaletteListComponent.propDecorators = {
        pallets: [{ type: Input, args: ['pallets',] }],
        change: [{ type: Output, args: ['change',] }]
    };
    return NgxTTitanColorPickerPaletteListComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxTTitanColorPickerComponent = /** @class */ (function () {
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
        this.colorChanged = new EventEmitter();
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
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'lib-ngx-ttitan-color-picker',
                    template: "<div\n  class=\"ngx-ttitan-color-picker-wrapper\"\n>\n\n  <div class=\"picker-input-wrapper\">\n    <div\n      [ngStyle]=\"{backgroundColor: color}\"\n      class=\"debug-output\"\n      *ngIf=\"colorPickerService.debug\"\n    >\n      {{color}}\n    </div>\n    <div class=\"picker-input-label\">\n      <label [for]=\"uuid\" >{{title}}</label>\n    </div>\n    <div class=\"picker-input-holder\">\n      <div class=\"picker-color\" [ngStyle]=\"{background: currentColorAlpha}\">\n\n      </div>\n      <div class=\"picker-input\">\n        <input\n          libNgxTTitanColorPickerInput\n          #pickerInput=\"libNgxTTitanColorPickerInput\"\n          (inputChange)=\"inputColorChange($event)\"\n          [format]=\"inputFormat\"\n          [id]=\"uuid\"\n          type=\"text\"\n          (focus)=\"openPicker()\"\n        />\n      </div>\n      <!--<div class=\"picker-save-sign\">-->\n      <!--S-->\n      <!--</div>-->\n    </div>\n\n  </div>\n  <div class=\"ngx-ttitan-color-picker\" [ngClass]=\"{'no-alpha': !alpha, 'open': pickerOpen}\">\n    <div class=\"ngx-ttitan-color-picker__MainColor\">\n      <div class=\"ngx-ttitan-color-picker__ColorLayer\" [ngStyle]=\"{backgroundColor: currentColorMax}\" ></div>\n      <div class=\"ngx-ttitan-color-picker__Slidable\" libNgxTTitanColorPickerSelector #mainColor=\"libNgxTTitanColorPickerSelector\" (change)=\"colorPickerService.saturationChange($event, this)\">\n        <div class=\"ngx-ttitan-color-picker__Dragger\" libNgxTTitanColorPickerDragger style=\"transform: translate3d(0px, 0px, 0px);\"></div>\n      </div>\n    </div>\n    <div class=\"ngx-ttitan-color-picker__HuePicker\">\n      <div class=\"ngx-ttitan-color-picker__Slidable\" libNgxTTitanColorPickerSelector #huePicker=\"libNgxTTitanColorPickerSelector\" (change)=\"colorPickerService.hueChange($event, this)\" [direction]=\"'vertical'\">\n        <div class=\"ngx-ttitan-color-picker__Dragger\" libNgxTTitanColorPickerDragger [pickerPad]=\"0\" style=\" transform: translate3d(0px, 0px, 0px);\"></div>\n      </div>\n    </div>\n    <div class=\"ngx-ttitan-color-picker__AlphaPicker\" *ngIf=\"alpha === true\">\n      <div class=\"ngx-ttitan-color-picker__ColorLayer\"\n\n           [ngStyle]=\"{background: 'linear-gradient(to top, ' + currentColorAlphaZero + '  18px, ' + currentColor + ' calc(100% - 18px)'}\"\n      ></div>\n      <div class=\"ngx-ttitan-color-picker__Slidable\" libNgxTTitanColorPickerSelector #alphaPicker=\"libNgxTTitanColorPickerSelector\" (change)=\"colorPickerService.alphaChange($event, this)\" [direction]=\"'vertical'\">\n        <div class=\"ngx-ttitan-color-picker__Dragger\" libNgxTTitanColorPickerDragger [pickerPad]=\"0\" style=\" transform: translate3d(0px, 0px, 0px);\"></div>\n      </div>\n    </div>\n    <!--<div style=\"height: 40px; width: 40px\" [ngStyle]=\"{background: currentColor}\">-->\n\n    <!--</div>-->\n    <!--<div style=\"height: 40px; width: 40px\" [ngStyle]=\"{background: currentColorAlpha}\">-->\n\n    <!--</div>-->\n  </div>\n  <lib-ngx-ttitan-color-picker-palette-list\n    (change)=\"inputColorChange($event)\"\n    [pallets]=\"pickerPallets\"\n  >\n\n  </lib-ngx-ttitan-color-picker-palette-list>\n</div>\n\n",
                    styles: [":host *,:host :after,:host :before{box-sizing:border-box}:host .debug-output{width:100%;height:20px}:host .picker-input-wrapper{margin-bottom:6px}:host .picker-input-wrapper .picker-input-label{margin-bottom:6px}:host .picker-input-wrapper .picker-input-label label{text-transform:uppercase;font-weight:600}:host .picker-input-wrapper .picker-input-holder{display:flex;height:33px;border:1px solid #bbb;overflow:hidden;border-radius:3px;background-color:#eee}:host .picker-input-wrapper .picker-input-holder .picker-color{flex:0 0 31px;background-color:#ff0300}:host .picker-input-wrapper .picker-input-holder .picker-input{flex:auto;background-color:transparent}:host .picker-input-wrapper .picker-input-holder .picker-input input{background-color:transparent;color:#272727;font-family:monospace;font-size:14px;border:none;outline:0;padding:8px 2px 8px 8px;width:100%}:host .picker-input-wrapper .picker-input-holder .picker-save-sign{flex:0 0 31px;line-height:33px;text-align:center}:host .ngx-ttitan-color-picker{max-height:0;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:flex;transition:max-height .3s}:host .ngx-ttitan-color-picker.open{margin-bottom:5px;max-height:165px}:host .ngx-ttitan-color-picker__ColorLayer{position:absolute;z-index:10;top:0;left:0;height:100%;width:100%;box-shadow:inset 0 0 2px 0 rgba(0,0,0,.5);pointer-events:none}:host .ngx-ttitan-color-picker__Slidable{height:100%;width:100%;cursor:pointer}:host .ngx-ttitan-color-picker__Dragger{position:relative;z-index:30;bottom:.9rem;-webkit-transform:none;transform:none;height:18px;width:18px;margin:0 auto;-webkit-backface-visibility:hidden;backface-visibility:hidden;will-change:transform;background:0 0;border:3px solid #fff;box-shadow:0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08),inset 0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08);border-radius:50%;pointer-events:none;touch-action:none}:host .ngx-ttitan-color-picker__MainColor{background-image:linear-gradient(45deg,#dfe3e8 25%,transparent 0),linear-gradient(-45deg,#dfe3e8 25%,transparent 0),linear-gradient(45deg,transparent 75%,#dfe3e8 0),linear-gradient(-45deg,transparent 75%,#dfe3e8 0);background-size:1.6rem 1.6rem;background-position:0 0,0 .8rem,.8rem -.8rem,-.8rem 0;position:relative;overflow:hidden;width:165px;height:165px;border-radius:4px;cursor:pointer}:host .ngx-ttitan-color-picker__MainColor .ngx-ttitan-color-picker__ColorLayer{box-shadow:inset 0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08);border-radius:4px}:host .ngx-ttitan-color-picker__MainColor .ngx-ttitan-color-picker__Dragger{right:.9rem;margin:0}:host .ngx-ttitan-color-picker__MainColor:after,:host .ngx-ttitan-color-picker__MainColor:before{content:\"\";position:absolute;z-index:20;top:0;left:0;display:block;height:100%;width:100%;pointer-events:none;border-radius:3px}:host .ngx-ttitan-color-picker__MainColor:before{background:linear-gradient(90deg,#fff,transparent)}:host .ngx-ttitan-color-picker__MainColor:after{background-image:linear-gradient(0deg,#000,transparent);box-shadow:inset 0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08)}:host .ngx-ttitan-color-picker__AlphaPicker,:host .ngx-ttitan-color-picker__HuePicker{position:relative;overflow:hidden;height:165px;width:24px;margin-left:.8rem;border-width:3px;border-radius:8rem;padding:13px 0}:host .ngx-ttitan-color-picker__HuePicker{background:linear-gradient(to bottom,red 0,#ff0 21%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%);box-shadow:inset 0 0 2px 0 rgba(0,0,0,.5)}:host .ngx-ttitan-color-picker__AlphaPicker{background-image:linear-gradient(45deg,#dfe3e8 25%,transparent 0),linear-gradient(-45deg,#dfe3e8 25%,transparent 0),linear-gradient(45deg,transparent 75%,#dfe3e8 0),linear-gradient(-45deg,transparent 75%,#dfe3e8 0);background-size:1.6rem 1.6rem;background-position:0 0,0 .8rem,.8rem -.8rem,-.8rem 0}:host .ngx-ttitan-color-picker__AlphaPicker .ngx-ttitan-color-picker__ColorLayer{border-radius:8rem}:host .ngx-ttitan-color-picker.no-alpha .ngx-ttitan-color-picker__MainColor{width:200px}"],
                },] },
    ];
    /** @nocollapse */
    NgxTTitanColorPickerComponent.ctorParameters = function () { return [
        { type: NgxTTitanColorPickerService },
        { type: ChangeDetectorRef }
    ]; };
    NgxTTitanColorPickerComponent.propDecorators = {
        componentClick: [{ type: HostListener, args: ['click', ['$event'],] }],
        alpha: [{ type: Input, args: ['alpha',] }],
        debug: [{ type: Input, args: ['debug',] }],
        color: [{ type: Input, args: ['color',] }],
        title: [{ type: Input, args: ['title',] }],
        outFormat: [{ type: Input, args: ['outFormat',] }],
        inputFormat: [{ type: Input, args: ['inputFormat',] }],
        availPallets: [{ type: Input, args: ['availPallets',] }],
        customPallets: [{ type: Input, args: ['customPallets',] }],
        colorChanged: [{ type: Output, args: ['colorChanged',] }],
        pickerInput: [{ type: ViewChild, args: ['pickerInput',] }],
        paletteList: [{ type: ViewChild, args: [NgxTTitanColorPickerPaletteListComponent,] }],
        mainColor: [{ type: ViewChild, args: ['mainColor',] }],
        huePicker: [{ type: ViewChild, args: ['huePicker',] }],
        alphaPicker: [{ type: ViewChild, args: ['alphaPicker',] }]
    };
    return NgxTTitanColorPickerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxTTitanColorPickerModule = /** @class */ (function () {
    function NgxTTitanColorPickerModule() {
    }
    NgxTTitanColorPickerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
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

export { NgxTTitanColorPickerService, NgxTTitanColorPickerComponent, NgxTTitanColorPickerModule, NgxTTitanColorPickerDraggerDirective as ɵc, NgxTTitanColorPickerInputDirective as ɵd, NgxTTitanColorPickerPaletteListComponent as ɵa, NgxTTitanColorPickerSelectorDirective as ɵb };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXR0aXRhbi1jb2xvci1waWNrZXIuanMubWFwIiwic291cmNlcyI6WyJuZzovL25neC10dGl0YW4tY29sb3ItcGlja2VyL2xpYi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci9saWIvbmd4LXR0aXRhbi1jb2xvci1waWNrZXItZHJhZ2dlci5kaXJlY3RpdmUudHMiLCJuZzovL25neC10dGl0YW4tY29sb3ItcGlja2VyL2xpYi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1zZWxlY3Rvci5kaXJlY3RpdmUudHMiLCJuZzovL25neC10dGl0YW4tY29sb3ItcGlja2VyL2xpYi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1pbnB1dC5kaXJlY3RpdmUudHMiLCJuZzovL25neC10dGl0YW4tY29sb3ItcGlja2VyL2xpYi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1wYWxldHRlLWxpc3Qvbmd4LXR0aXRhbi1jb2xvci1waWNrZXItcGFsZXR0ZS1saXN0LmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIvbGliL25neC10dGl0YW4tY29sb3ItcGlja2VyLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIvbGliL25neC10dGl0YW4tY29sb3ItcGlja2VyLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0N1c3RvbVBlcmNlbnR9IGZyb20gXCIuL25neC10dGl0YW4tY29sb3ItcGlja2VyLXNlbGVjdG9yLmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHtOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudH0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuY29tcG9uZW50XCI7XG5pbXBvcnQge2Zyb21FdmVudCwgT2JzZXJ2YWJsZX0gZnJvbSBcInJ4anMvaW5kZXhcIjtcbmltcG9ydCB7d2luZG93fSBmcm9tIFwicnhqcy9pbnRlcm5hbC9vcGVyYXRvcnNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBIU1ZBIHtcbiAgaHVlOiBudW1iZXIsXG4gIHNhdHVyYXRpb246IG51bWJlcixcbiAgdmFsdWU6IG51bWJlcixcbiAgYWxwaGE6IG51bWJlcixcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYWxldHRlIHtcbiAgbmFtZTogc3RyaW5nLFxuICBpZDogc3RyaW5nLFxuICBjb2xvcnM6IEFycmF5PHN0cmluZz5cbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmd4VFRpdGFuQ29sb3JQaWNrZXJTZXJ2aWNlIHtcblxuICBwdWJsaWMgZGVidWc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIHBpY2tlckxpc3Q6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgcHVibGljIHBhbGxldHM6IEFycmF5PFBhbGV0dGU+ID0gW107XG5cbiAgcHVibGljIG1vdXNlTW92ZU9ic2VydmFibGU6IE9ic2VydmFibGU8TW91c2VFdmVudD4gPSA8T2JzZXJ2YWJsZTxNb3VzZUV2ZW50Pj5mcm9tRXZlbnQoZG9jdW1lbnQsICdtb3VzZW1vdmUnKTtcbiAgcHVibGljIG1vdXNlVXBPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPE1vdXNlRXZlbnQ+ID0gPE9ic2VydmFibGU8TW91c2VFdmVudD4+ZnJvbUV2ZW50KGRvY3VtZW50LCAnbW91c2V1cCcpO1xuICAvLyBwdWJsaWMgbW91c2VNb3ZlT2JzZXJ2YWJsZTogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAvLyBwdWJsaWMgbW91c2VVcE9ic2VydmFibGU6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmZpbGxCYXNlUGFsbGV0cygpO1xuICAgIC8vXG4gICAgLy8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKCRldmVudCkgPT4ge1xuICAgIC8vICAgdGhpcy5tb3VzZU1vdmVPYnNlcnZhYmxlLmVtaXQoPE1vdXNlRXZlbnQ+JGV2ZW50KTtcbiAgICAvLyB9KTtcbiAgICAvLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKCRldmVudCkgPT4ge1xuICAgIC8vICAgdGhpcy5tb3VzZVVwT2JzZXJ2YWJsZS5lbWl0KDxNb3VzZUV2ZW50PiRldmVudCk7XG4gICAgLy8gfSk7XG5cbiAgfVxuXG4gIHNhdHVyYXRpb25DaGFuZ2UocGVyY2VudDogQ3VzdG9tUGVyY2VudCwgcGlja2VyQ29tcG9uZW50OiBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCApIHtcbiAgICBwaWNrZXJDb21wb25lbnQuaHN2YS5zYXR1cmF0aW9uID0gcGVyY2VudC54O1xuICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLnZhbHVlID0gKDEwMCAtIHBlcmNlbnQueSk7XG4gICAgdGhpcy5kYXRhVG9Db2xvcihwaWNrZXJDb21wb25lbnQpO1xuICB9XG5cbiAgaHVlQ2hhbmdlKHBlcmNlbnQ6IEN1c3RvbVBlcmNlbnQsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBwaWNrZXJDb21wb25lbnQuaHN2YS5odWUgPSBNYXRoLnJvdW5kKDM2MCAqIHBlcmNlbnQueSAvIDEwMCk7XG4gICAgdGhpcy5kYXRhVG9Db2xvcihwaWNrZXJDb21wb25lbnQpO1xuICB9XG5cbiAgYWxwaGFDaGFuZ2UocGVyY2VudDogQ3VzdG9tUGVyY2VudCwgcGlja2VyQ29tcG9uZW50OiBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCkge1xuICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLmFscGhhID0gKDEwMCAtIHBlcmNlbnQueSkgLyAxMDA7XG4gICAgdGhpcy5kYXRhVG9Db2xvcihwaWNrZXJDb21wb25lbnQpO1xuICB9XG5cbiAgZGF0YVRvQ29sb3IocGlja2VyQ29tcG9uZW50OiBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCkge1xuICAgIGxldCByZ2JhQXJyOiBBcnJheTxudW1iZXI+ID0gdGhpcy5oc3ZhVG9SZ2JhKFxuICAgICAgcGlja2VyQ29tcG9uZW50LmhzdmEuaHVlLFxuICAgICAgcGlja2VyQ29tcG9uZW50LmhzdmEuc2F0dXJhdGlvbixcbiAgICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLnZhbHVlLFxuICAgICAgcGlja2VyQ29tcG9uZW50LmhzdmEuYWxwaGFcbiAgICApO1xuICAgIGxldCByZ2JhTWF4QXJyOiBBcnJheTxudW1iZXI+ID0gdGhpcy5oc3ZhVG9SZ2JhKFxuICAgICAgcGlja2VyQ29tcG9uZW50LmhzdmEuaHVlLFxuICAgICAgMTAwLFxuICAgICAgMTAwLFxuICAgICAgcGlja2VyQ29tcG9uZW50LmhzdmEuYWxwaGFcbiAgICApO1xuXG4gICAgcGlja2VyQ29tcG9uZW50LmN1cnJlbnRDb2xvciA9ICdyZ2IoJyArIHJnYmFBcnJbMF0gKyAnLCcgKyByZ2JhQXJyWzFdICsgJywnICsgcmdiYUFyclsyXSArICcpJztcbiAgICBwaWNrZXJDb21wb25lbnQuY3VycmVudENvbG9yTWF4ID0gJ3JnYmEoJyArIHJnYmFNYXhBcnJbMF0gKyAnLCcgKyByZ2JhTWF4QXJyWzFdICsgJywnICsgcmdiYU1heEFyclsyXSArICcsJyArIHJnYmFNYXhBcnJbM10gKyAnKSc7XG4gICAgcGlja2VyQ29tcG9uZW50LmN1cnJlbnRDb2xvckFscGhhID0gJ3JnYmEoJyArIHJnYmFBcnJbMF0gKyAnLCcgKyByZ2JhQXJyWzFdICsgJywnICsgcmdiYUFyclsyXSArICcsJyArIHJnYmFBcnJbM10gKyAnKSc7XG4gICAgcGlja2VyQ29tcG9uZW50LmN1cnJlbnRDb2xvckFscGhhWmVybyA9ICdyZ2JhKCcgKyByZ2JhQXJyWzBdICsgJywnICsgcmdiYUFyclsxXSArICcsJyArIHJnYmFBcnJbMl0gKyAnLDApJztcblxuICAgIHBpY2tlckNvbXBvbmVudC5zZXRJbnB1dFZhbHVlKCk7XG4gICAgcGlja2VyQ29tcG9uZW50LnVwZGF0ZVJldHVybkNvbG9yKCk7XG5cblxuICB9XG5cbiAgY29sb3JUb0RhdGEoY29sb3I6IHN0cmluZywgcGlja2VyQ29tcG9uZW50OiBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCkge1xuICAgIHN3aXRjaCAodGhpcy5kZXRlY3RDb2xvclR5cGUoY29sb3IpKSB7XG4gICAgICBjYXNlIFwicmdiYVwiOiB0aGlzLnBhcnNlUmdiYUNvbG9yKGNvbG9yLCBwaWNrZXJDb21wb25lbnQpOyBicmVhaztcbiAgICAgIGNhc2UgXCJyZ2JcIjogdGhpcy5wYXJzZVJnYkNvbG9yKGNvbG9yLCBwaWNrZXJDb21wb25lbnQpOyBicmVhaztcbiAgICAgIGNhc2UgXCJoc2xhXCI6IHRoaXMucGFyc2VIc2xhQ29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudCk7IGJyZWFrO1xuICAgICAgY2FzZSBcImhzbFwiOiB0aGlzLnBhcnNlSHNsQ29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudCk7IGJyZWFrO1xuICAgICAgY2FzZSBcImhleDZcIjogdGhpcy5wYXJzZUhleENvbG9yKGNvbG9yLCBwaWNrZXJDb21wb25lbnQpOyBicmVhaztcbiAgICAgIGNhc2UgXCJoZXg4XCI6IHRoaXMucGFyc2VIZXhDb2xvcihjb2xvciwgcGlja2VyQ29tcG9uZW50KTsgYnJlYWs7XG4gICAgfVxuICAgIHRoaXMuZGF0YVRvQ29sb3IocGlja2VyQ29tcG9uZW50KTtcbiAgfVxuXG4gIGdldFBpY2tlclV1aWQoKSB7XG4gICAgbGV0IHBpY2tlcklkID0gJyc7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IDEwMDA7IGkrKykge1xuICAgICAgcGlja2VySWQgPSAncGlja2VyLScgKyB0aGlzLnBpY2tlckxpc3QubGVuZ3RoICsgJy0nICsgaTtcbiAgICAgIGlmKHRoaXMucGlja2VyTGlzdC5pbmRleE9mKHBpY2tlcklkKSA9PT0gLTEgKSB7XG4gICAgICAgIHRoaXMucGlja2VyTGlzdC5wdXNoKHBpY2tlcklkKTtcbiAgICAgICAgcmV0dXJuIHBpY2tlcklkO1xuICAgICAgfVxuICAgIH1cblxuICB9XG5cblxuICBkZXRlY3RDb2xvclR5cGUoY29sb3I6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYoY29sb3IuaW5kZXhPZigncmdiYScpICE9PSAtMSkge1xuICAgICAgcmV0dXJuICdyZ2JhJztcbiAgICB9IGVsc2UgaWYoY29sb3IuaW5kZXhPZigncmdiJykgIT09IC0xKSB7XG4gICAgICByZXR1cm4gJ3JnYic7XG4gICAgfSBlbHNlIGlmKGNvbG9yLmluZGV4T2YoJ2hzbGEnKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiAnaHNsYSc7XG4gICAgfSBlbHNlIGlmKGNvbG9yLmluZGV4T2YoJ2hzbCcpICE9PSAtMSkge1xuICAgICAgcmV0dXJuICdoc2wnO1xuICAgIH0gZWxzZSBpZiAoY29sb3IuaW5kZXhPZignIycpICE9PSAtMSAmJiAoY29sb3IubGVuZ3RoID09IDQgfHwgY29sb3IubGVuZ3RoID09IDcpKXtcbiAgICAgIHJldHVybiAnaGV4Nic7XG4gICAgfSBlbHNlIGlmIChjb2xvci5pbmRleE9mKCcjJykgIT09IC0xICYmIGNvbG9yLmxlbmd0aCA9PSA5KXtcbiAgICAgIHJldHVybiAnaGV4OCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAndW5kZWZpbmVkJztcbiAgICB9XG4gIH1cblxuXG4gIGZpbGxWYWx1ZXNGcm9tSHN2YUFycihoc3ZhQXJyOiBBcnJheTxudW1iZXI+LCBwaWNrZXJDb21wb25lbnQ6IE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50KSB7XG4gICAgcGlja2VyQ29tcG9uZW50LmhzdmEuaHVlID0gaHN2YUFyclswXTtcbiAgICBwaWNrZXJDb21wb25lbnQuaHN2YS5zYXR1cmF0aW9uID0gaHN2YUFyclsxXTtcbiAgICBwaWNrZXJDb21wb25lbnQuaHN2YS52YWx1ZSA9IGhzdmFBcnJbMl07XG4gICAgcGlja2VyQ29tcG9uZW50LmhzdmEuYWxwaGEgPSBoc3ZhQXJyWzNdO1xuICB9XG5cblxuICBwYXJzZVJnYmFDb2xvcihjb2xvciwgcGlja2VyQ29tcG9uZW50OiBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCkge1xuICAgIGxldCBhdXMgPSBjb2xvci5yZXBsYWNlKCdyZ2JhKCcsICcnKS5yZXBsYWNlKCcpJywgJycpO1xuICAgIGxldCBhdXMyID0gYXVzLnNwbGl0KCcsJyk7XG4gICAgaWYoYXVzMi5sZW5ndGggPT0gNCkge1xuICAgICAgdGhpcy5maWxsVmFsdWVzRnJvbUhzdmFBcnIoXG4gICAgICAgIHRoaXMucmdiYVRvSHN2YShcbiAgICAgICAgICBwYXJzZUludChhdXMyWzBdKSxcbiAgICAgICAgICBwYXJzZUludChhdXMyWzFdKSxcbiAgICAgICAgICBwYXJzZUludChhdXMyWzJdKSxcbiAgICAgICAgICBwYXJzZUludChhdXMyWzNdKSxcbiAgICAgICAgKSxcbiAgICAgICAgcGlja2VyQ29tcG9uZW50XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHBhcnNlUmdiQ29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBsZXQgYXVzID0gY29sb3IucmVwbGFjZSgncmdiKCcsICcnKS5yZXBsYWNlKCcpJywgJycpO1xuICAgIGxldCBhdXMyID0gYXVzLnNwbGl0KCcsJyk7XG4gICAgaWYoYXVzMi5sZW5ndGggPT0gMykge1xuICAgICAgdGhpcy5maWxsVmFsdWVzRnJvbUhzdmFBcnIoXG4gICAgICAgIHRoaXMucmdiYVRvSHN2YShcbiAgICAgICAgICBwYXJzZUludChhdXMyWzBdKSxcbiAgICAgICAgICBwYXJzZUludChhdXMyWzFdKSxcbiAgICAgICAgICBwYXJzZUludChhdXMyWzJdKSxcbiAgICAgICAgICAxXG4gICAgICAgICksXG4gICAgICAgIHBpY2tlckNvbXBvbmVudFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwYXJzZUhzbGFDb2xvcihjb2xvciwgcGlja2VyQ29tcG9uZW50OiBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCkge1xuICAgIGxldCBhdXMgPSBjb2xvci5yZXBsYWNlKCdoc2xhKCcsICcnKS5yZXBsYWNlKCcpJywgJycpLnJlcGxhY2UoJyUnLCAnJyk7XG4gICAgbGV0IGF1czIgPSBhdXMuc3BsaXQoJywnKTtcbiAgICBpZihhdXMyLmxlbmd0aCA9PSA0KSB7XG4gICAgICB0aGlzLmZpbGxWYWx1ZXNGcm9tSHN2YUFycihcbiAgICAgICAgdGhpcy5oc2xhVG9Ic3ZhKFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbMF0pLFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbMV0pLFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbMl0pLFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbM10pLFxuICAgICAgICApLFxuICAgICAgICBwaWNrZXJDb21wb25lbnRcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcGFyc2VIc2xDb2xvcihjb2xvciwgcGlja2VyQ29tcG9uZW50OiBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCkge1xuICAgIGxldCBhdXMgPSBjb2xvci5yZXBsYWNlKCdoc2woJywgJycpLnJlcGxhY2UoJyknLCAnJykucmVwbGFjZSgnJScsICcnKTtcbiAgICBsZXQgYXVzMiA9IGF1cy5zcGxpdCgnLCcpO1xuICAgIGlmKGF1czIubGVuZ3RoID09IDMpIHtcbiAgICAgIHRoaXMuZmlsbFZhbHVlc0Zyb21Ic3ZhQXJyKFxuICAgICAgICB0aGlzLmhzbGFUb0hzdmEoXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlswXSksXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlsxXSksXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlsyXSksXG4gICAgICAgICAgMVxuICAgICAgICApLFxuICAgICAgICBwaWNrZXJDb21wb25lbnRcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcGFyc2VIZXhDb2xvcihjb2xvciwgcGlja2VyQ29tcG9uZW50OiBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCkge1xuICAgIGxldCBhdXMgPSBjb2xvci5yZXBsYWNlKCcjJywgJycpO1xuICAgIHRoaXMuZmlsbFZhbHVlc0Zyb21Ic3ZhQXJyKFxuICAgICAgdGhpcy5oZXhUb0hzdmEoYXVzKSxcbiAgICAgIHBpY2tlckNvbXBvbmVudFxuICAgICk7XG4gIH1cblxuXG5cbiAgaHN2YVRvUmdiYShILCBTLCBWLCBBKTogQXJyYXk8bnVtYmVyPiB7XG4gICAgbGV0IGYgLCBwLCBxICwgdCwgbEgsIFIsIEcsIEI7XG5cbiAgICBIID0gKEggPCAzNjApID8gSCA6IDM1OTtcbiAgICBTID0gUyAvIDEwMDtcbiAgICBWID0gViAvIDEwMDtcblxuICAgIGxIID0gTWF0aC5mbG9vcihIIC8gNjApO1xuXG4gICAgZiA9IEgvNjAgLSBsSDtcblxuICAgIHAgPSBWICogKDEgLSBTKTtcblxuICAgIHEgPSBWICooMSAtIFMqZik7XG5cbiAgICB0ID0gViogKDEgLSAoMS1mKSogUyk7XG5cbiAgICBzd2l0Y2ggKGxIKXtcbiAgICAgIGNhc2UgMDogUiA9IFY7IEcgPSB0OyBCID0gcDsgYnJlYWs7XG4gICAgICBjYXNlIDE6IFIgPSBxOyBHID0gVjsgQiA9IHA7IGJyZWFrO1xuICAgICAgY2FzZSAyOiBSID0gcDsgRyA9IFY7IEIgPSB0OyBicmVhaztcbiAgICAgIGNhc2UgMzogUiA9IHA7IEcgPSBxOyBCID0gVjsgYnJlYWs7XG4gICAgICBjYXNlIDQ6IFIgPSB0OyBHID0gcDsgQiA9IFY7IGJyZWFrO1xuICAgICAgY2FzZSA1OiBSID0gVjsgRyA9IHA7IEIgPSBxOyBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gW01hdGgucm91bmQoUioyNTUpLCBNYXRoLnJvdW5kKEcqMjU1KSwgTWF0aC5yb3VuZChCKjI1NSksIEFdO1xuICB9XG5cbiAgaHN2YVRvUmdiYVN0cmluZyhILCBTLCBWLCBBLCBzaG93QWxwaGE6IGJvb2xlYW4gPSBmYWxzZSk6IHN0cmluZyB7XG4gICAgbGV0IGNvbG9yQXJyOiBBcnJheTxudW1iZXI+ID0gdGhpcy5oc3ZhVG9SZ2JhKEgsIFMsIFYsIEEpO1xuXG4gICAgaWYoc2hvd0FscGhhKSB7XG4gICAgICByZXR1cm4gJ3JnYmEoJyArIGNvbG9yQXJyLmpvaW4oJywnKSArICcpJztcbiAgICB9XG5cbiAgICBjb2xvckFyci5wb3AoKTtcbiAgICByZXR1cm4gJ3JnYignICsgY29sb3JBcnIuam9pbignLCcpICsgJyknO1xuXG4gIH1cblxuICByZ2JhVG9Ic3ZhKHIsIGcsIGIsIGEpOiBBcnJheTxudW1iZXI+IHtcbiAgICByIC89IDI1NTtcbiAgICBnIC89IDI1NTtcbiAgICBiIC89IDI1NTtcblxuICAgIGxldCBtYXggPSBNYXRoLm1heChyLCBnLCBiKSwgbWluID0gTWF0aC5taW4ociwgZywgYik7XG4gICAgbGV0IGgsIHMsIHYgPSBtYXg7XG4gICAgbGV0IGQgPSBtYXggLSBtaW47XG4gICAgcyA9IG1heCA9PSAwID8gMCA6IGQgLyBtYXg7XG5cbiAgICBpZiAobWF4ID09IG1pbikge1xuICAgICAgaCA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXRjaCAobWF4KSB7XG4gICAgICAgIGNhc2UgcjogaCA9IChnIC0gYikgLyBkICsgKGcgPCBiID8gNiA6IDApOyBicmVhaztcbiAgICAgICAgY2FzZSBnOiBoID0gKGIgLSByKSAvIGQgKyAyOyBicmVhaztcbiAgICAgICAgY2FzZSBiOiBoID0gKHIgLSBnKSAvIGQgKyA0OyBicmVhaztcbiAgICAgIH1cblxuICAgICAgaCAvPSA2O1xuICAgIH1cblxuXG4gICAgcmV0dXJuIFtcbiAgICAgIGggKiAzNjAsXG4gICAgICBzICogMTAwLFxuICAgICAgdiAqIDEwMCxcbiAgICAgIGFcbiAgICBdO1xuICB9XG5cbiAgaHN2YVRvSHNsYShoLCBzLCB2LCBhKTogQXJyYXk8bnVtYmVyPntcbiAgICBzIC89IDEwMDtcbiAgICB2IC89IDEwMDtcbiAgICByZXR1cm5bXG4gICAgICBNYXRoLnJvdW5kKGgpLFxuICAgICAgTWF0aC5yb3VuZCgocyp2LygoaD0oMi1zKSp2KTwxP2g6Mi1oKSkgKiAxMDApLFxuICAgICAgTWF0aC5yb3VuZCgoaC8yKSAqIDEwMCksXG4gICAgICBhXG4gICAgXVxuICB9XG5cbiAgaHNsYVRvSHN2YSAoaCwgcywgbCwgYSk6IEFycmF5PG51bWJlcj57XG4gICAgcyAvPSAxMDA7XG4gICAgbCAvPSAxMDA7XG4gICAgcyo9bDwuNT9sOjEtbDtcbiAgICByZXR1cm5bXG4gICAgICBoLFxuICAgICAgTWF0aC5yb3VuZCgoMipzLyhsK3MpKSAqIDEwMCksXG4gICAgICBNYXRoLnJvdW5kKChsK3MpICogMTAwKSxcbiAgICAgIGFcbiAgICBdXG4gIH1cblxuICBoZXhUb0hzdmEoaGV4OiBzdHJpbmcpOiBBcnJheTxudW1iZXI+IHtcblxuICAgIGxldCByZ2JhID0gWzAsMCwwLDFdO1xuICAgIGlmIChoZXgubGVuZ3RoID09IDYpIHtcbiAgICAgIHJnYmEgPSBbXG4gICAgICAgIHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMCwgMiksIDE2KSxcbiAgICAgICAgcGFyc2VJbnQoaGV4LnN1YnN0cmluZygyLCA0KSwgMTYpLFxuICAgICAgICBwYXJzZUludChoZXguc3Vic3RyaW5nKDQsIDYpLCAxNiksXG4gICAgICAgIDFcbiAgICAgIF07XG4gICAgfSBlbHNlIGlmIChoZXgubGVuZ3RoID09IDMpIHtcbiAgICAgIHJnYmEgPSBbXG4gICAgICAgIHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMCwgMSkgKyBoZXguc3Vic3RyaW5nKDAsIDEpLCAxNiksXG4gICAgICAgIHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMSwgMikgKyBoZXguc3Vic3RyaW5nKDEsIDIpLCAxNiksXG4gICAgICAgIHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMiwgMykgKyBoZXguc3Vic3RyaW5nKDIsIDMpLCAxNiksXG4gICAgICAgIDFcbiAgICAgIF1cbiAgICB9IGVsc2UgaWYgKGhleC5sZW5ndGggPT0gOCkge1xuICAgICAgcmdiYSA9IFtcbiAgICAgICAgcGFyc2VJbnQoaGV4LnN1YnN0cmluZygwLCAyKSwgMTYpLFxuICAgICAgICBwYXJzZUludChoZXguc3Vic3RyaW5nKDIsIDQpLCAxNiksXG4gICAgICAgIHBhcnNlSW50KGhleC5zdWJzdHJpbmcoNCwgNiksIDE2KSxcbiAgICAgICAgcGFyc2VGbG9hdCgocGFyc2VJbnQoaGV4LnN1YnN0cmluZyg2LCA4KSwgMTYpIC8gMjU1KS50b0ZpeGVkKDIpKVxuICAgICAgXVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZ2JhVG9Ic3ZhKHJnYmFbMF0sIHJnYmFbMV0sIHJnYmFbMl0sIHJnYmFbM10pO1xuXG4gIH1cblxuICBoc3ZhVG9IZXgoSCwgUywgViwgQSwgc2hvd0FscGhhOiBib29sZWFuID0gdHJ1ZSk6IHN0cmluZyB7XG4gICAgbGV0IHJnYmE6IEFycmF5PG51bWJlcj4gPSB0aGlzLmhzdmFUb1JnYmEoSCwgUywgViwgQSk7XG5cbiAgICBsZXQgaEE6IHN0cmluZyA9ICgoc2hvd0FscGhhKSA/IChyZ2JhWzNdICogMjU1KS50b1N0cmluZygxNikuc3Vic3RyaW5nKDAsMikgOiAnJyk7XG5cbiAgICBpZihzaG93QWxwaGEpIHtcbiAgICAgIGhBID0gKGhBLmxlbmd0aCA9PSAxKSA/IGhBICsgaEEgOiBoQTtcbiAgICB9XG4gICAgcmV0dXJuICcjJyArXG4gICAgICAoKHJnYmFbMl0gfCByZ2JhWzFdIDw8IDggfCByZ2JhWzBdIDw8IDE2KSB8IDEgPDwgMjQpLnRvU3RyaW5nKDE2KS5zbGljZSgxKSArXG4gICAgICBoQTtcbiAgfVxuXG5cbiAgdmFsaWRhdGVDb2xvckZvcm1hdCh2YWx1ZTogc3RyaW5nLCBmb3JtYXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgc3dpdGNoIChmb3JtYXQpIHtcbiAgICAgIGNhc2UgXCJoZXg2XCI6IHJldHVybiB0aGlzLnZhbGlkYXRlSGV4Rm9ybWF0KHZhbHVlKTtcbiAgICAgIGNhc2UgXCJoZXg4XCI6IHJldHVybiB0aGlzLnZhbGlkYXRlSGV4Rm9ybWF0KHZhbHVlLCB0cnVlKTtcbiAgICAgIGNhc2UgXCJyZ2JcIjogcmV0dXJuIHRoaXMudmFsaWRhdGVSZ2JhRm9ybWF0KHZhbHVlKTtcbiAgICAgIGNhc2UgXCJyZ2JhXCI6IHJldHVybiB0aGlzLnZhbGlkYXRlUmdiYUZvcm1hdCh2YWx1ZSwgdHJ1ZSk7XG4gICAgICAvLyBjYXNlIFwiaHNsXCI6IHJldHVybiB0aGlzLnZhbGlkYXRlSGV4Rm9ybWF0KHZhbHVlKTtcbiAgICAgIC8vIGNhc2UgXCJoc2xhXCI6IHJldHVybiB0aGlzLnZhbGlkYXRlSGV4Rm9ybWF0KHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuICdub3RWYWxpZCc7XG4gIH1cblxuICB2YWxpZGF0ZUhleEZvcm1hdCh2YWx1ZTogc3RyaW5nLCBhbHBoYTogYm9vbGVhbiA9IGZhbHNlKTogc3RyaW5nIHtcbiAgICBsZXQgcmVzdWx0ID0gJ25vdFZhbGlkJztcbiAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoJyMnLCAnJyk7XG4gICAgaWYoIWFscGhhKSB7XG4gICAgICBpZih2YWx1ZS5sZW5ndGggPT09IDYpIHtcbiAgICAgICAgaWYoIWlzTmFOKHBhcnNlSW50KHZhbHVlLCAxNikpKSB7XG4gICAgICAgICAgcmV0dXJuICcjJyArIHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKHZhbHVlLmxlbmd0aCA9PT0gOCkge1xuICAgICAgICBpZighaXNOYU4ocGFyc2VJbnQodmFsdWUsIDE2KSkpIHtcbiAgICAgICAgICByZXR1cm4gJyMnICsgdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgdmFsaWRhdGVSZ2JhRm9ybWF0KHZhbHVlOiBzdHJpbmcsIGFscGhhOiBib29sZWFuID0gZmFsc2UpOiBzdHJpbmcge1xuICAgIGxldCByZXN1bHQgPSAnbm90VmFsaWQnO1xuICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvW14wLTlcXCxdKy9nLCBcIlwiKTtcbiAgICBsZXQgYXVzQXJyOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+ID0gdmFsdWUuc3BsaXQoJywnKTtcbiAgICBsZXQgYWxwaGFWYWw6IHN0cmluZyB8IG51bWJlciA9ICcnO1xuXG4gICAgaWYoIWFscGhhKSB7XG4gICAgICBpZihhdXNBcnIubGVuZ3RoID09IDMpIHtcbiAgICAgICAgYXVzQXJyID0gYXVzQXJyLm1hcChmdW5jdGlvbih2YWw6IHN0cmluZyl7cmV0dXJuIHBhcnNlSW50KHZhbCl9KTtcbiAgICAgICAgaWYoXG4gICAgICAgICAgTWF0aC5tYXguYXBwbHkobnVsbCwgYXVzQXJyKSA8PSAyNTUgJiZcbiAgICAgICAgICBNYXRoLm1pbi5hcHBseShudWxsLCBhdXNBcnIpID49IDBcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuICdyZ2IoJyArIGF1c0Fyci5qb2luKCcsJykgKyAnKSc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYoYXVzQXJyLmxlbmd0aCA9PSA0KSB7XG4gICAgICAgIGFscGhhVmFsID0gcGFyc2VGbG9hdCg8c3RyaW5nPmF1c0Fyci5wb3AoKSk7XG4gICAgICAgIGF1c0FyciA9IGF1c0Fyci5tYXAoZnVuY3Rpb24odmFsOiBzdHJpbmcpe3JldHVybiBwYXJzZUludCh2YWwpfSk7XG4gICAgICAgIGlmKFxuICAgICAgICAgIE1hdGgubWF4LmFwcGx5KG51bGwsIGF1c0FycikgPD0gMjU1ICYmXG4gICAgICAgICAgTWF0aC5taW4uYXBwbHkobnVsbCwgYXVzQXJyKSA+PSAwICYmXG4gICAgICAgICAgYWxwaGFWYWwgPj0gMCAmJiBhbHBoYVZhbCA8PSAxXG4gICAgICAgICkge1xuICAgICAgICAgIGF1c0Fyci5wdXNoKGFscGhhVmFsKTtcbiAgICAgICAgICByZXR1cm4gJ3JnYmEoJyArIGF1c0Fyci5qb2luKCcsJykgKyAnKSc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJlcGFyZVJldHVybkNvbG9yKGhzdmE6IEhTVkEsIGZvcm1hdDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBzd2l0Y2ggKGZvcm1hdCkge1xuICAgICAgY2FzZSBcImhleDZcIjogcmV0dXJuIHRoaXMuaHN2YVRvSGV4KGhzdmEuaHVlLCBoc3ZhLnNhdHVyYXRpb24sIGhzdmEudmFsdWUsIDEsIGZhbHNlKTtcbiAgICAgIGNhc2UgXCJoZXg4XCI6IHJldHVybiB0aGlzLmhzdmFUb0hleChoc3ZhLmh1ZSwgaHN2YS5zYXR1cmF0aW9uLCBoc3ZhLnZhbHVlLCBoc3ZhLmFscGhhLCB0cnVlKTtcbiAgICAgIGNhc2UgXCJyZ2JcIjogcmV0dXJuIHRoaXMuaHN2YVRvUmdiYVN0cmluZyhoc3ZhLmh1ZSwgaHN2YS5zYXR1cmF0aW9uLCBoc3ZhLnZhbHVlLCAxKTtcbiAgICAgIGNhc2UgXCJyZ2JhXCI6IHJldHVybiB0aGlzLmhzdmFUb1JnYmFTdHJpbmcoaHN2YS5odWUsIGhzdmEuc2F0dXJhdGlvbiwgaHN2YS52YWx1ZSwgaHN2YS5hbHBoYSwgdHJ1ZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmhzdmFUb0hleChoc3ZhLmh1ZSwgaHN2YS5zYXR1cmF0aW9uLCBoc3ZhLnZhbHVlLCAxLCBmYWxzZSk7XG4gIH1cblxuICBwcmVwYXJlUGlja2VyUGFsbGV0cyhhdmFpbFBhbGxldHM6IEFycmF5PHN0cmluZz4gPSBbXSwgY3VzdG9tUGFsbGV0czogQXJyYXk8UGFsZXR0ZT4gPSBbXSwgcGlja2VyQ29tcG9uZW50OiBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCkge1xuICAgIHRoaXMucGFsbGV0cy5mb3JFYWNoKChwYWxldHRlKSA9PiB7XG4gICAgICBpZihhdmFpbFBhbGxldHMuaW5kZXhPZihwYWxldHRlLmlkKSAhPT0gLTEpIHtcbiAgICAgICAgcGlja2VyQ29tcG9uZW50LnBpY2tlclBhbGxldHMucHVzaChwYWxldHRlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjdXN0b21QYWxsZXRzLmZvckVhY2goKHBhbGV0dGUpID0+IHtcbiAgICAgIHBpY2tlckNvbXBvbmVudC5waWNrZXJQYWxsZXRzLnB1c2gocGFsZXR0ZSk7XG4gICAgfSlcblxuICB9XG5cbiAgZmlsbEJhc2VQYWxsZXRzKCkge1xuICAgIHRoaXMucGFsbGV0cy5wdXNoKHtcbiAgICAgIGlkOiAncG9sYXJpcycsXG4gICAgICBuYW1lOiAnUG9sYXJpcycsXG4gICAgICBjb2xvcnM6IFtcbiAgICAgICAgJyNGOUZBRkInLCAnI0Y0RjZGOCcsICcjREZFM0U4JywgJyNDNENERDUnLFxuICAgICAgICAnIzkxOUVBQicsICcjNjM3MzgxJywgJyM0NTRGNUInLCAnIzIxMkIzNicsXG4gICAgICAgICcjQjNCNUNCJywgJyM0MzQ2N0YnLCAnIzFDMjI2MCcsICcjMDAwNDRDJyxcbiAgICAgICAgJyNGNkYwRkQnLCAnI0UzRDBGRicsICcjOUM2QURFJywgJyM1MDI0OEYnLCAnIzIzMDA1MScsXG4gICAgICAgICcjRjRGNUZBJywgJyNCM0JDRjUnLCAnIzVDNkFDNCcsICcjMjAyRTc4JywgJyMwMDA2MzknLFxuICAgICAgICAnI0VCRjVGQScsICcjQjRFMUZBJywgJyMwMDdBQ0UnLCAnIzA4NEU4QScsICcjMDAxNDI5JyxcbiAgICAgICAgJyNFMEY1RjUnLCAnI0I3RUNFQycsICcjNDdDMUJGJywgJyMwMDg0OEUnLCAnIzAwMzEzNScsXG4gICAgICAgICcjRTNGMURGJywgJyNCQkU1QjMnLCAnIzUwQjgzQycsICcjMTA4MDQzJywgJyMxNzM2MzAnLFxuICAgICAgICAnI0ZDRjFDRCcsICcjRkZFQThBJywgJyNFRUMyMDAnLCAnIzlDNkYxOScsICcjNTczQjAwJyxcbiAgICAgICAgJyNGQ0VCREInLCAnI0ZGQzU4QicsICcjRjQ5MzQyJywgJyNDMDU3MTcnLCAnIzRBMTUwNCcsXG4gICAgICAgICcjRkJFQUU1JywgJyNGRUFEOUEnLCAnI0RFMzYxOCcsICcjQkYwNzExJywgJyMzMzAxMDEnLFxuICAgICAgXVxuICAgIH0pO1xuICAgIHRoaXMucGFsbGV0cy5wdXNoKHtcbiAgICAgIGlkOiAnbWF0ZXJpYWwnLFxuICAgICAgbmFtZTogJ01hdGVyaWFsJyxcbiAgICAgIGNvbG9yczogW1xuICAgICAgICAnI2ZmZWJlZScsICcjZmZjZGQyJywgJyNlZjlhOWEnLCAnI2U1NzM3MycsICcjZWY1MzUwJywgJyNmNDQzMzYnLCAnI2U1MzkzNScsICcjZDMyZjJmJywgJyNjNjI4MjgnLCAnI2I3MWMxYycsICcjZmY4YTgwJywgJyNmZjUyNTInLCAnI2ZmMTc0NCcsICcjZDUwMDAwJyxcbiAgICAgICAgJyNmY2U0ZWMnLCAnI2Y4YmJkMCcsICcjZjQ4ZmIxJywgJyNmMDYyOTInLCAnI2VjNDA3YScsICcjZTkxZTYzJywgJyNkODFiNjAnLCAnI2MyMTg1YicsICcjYWQxNDU3JywgJyM4ODBlNGYnLCAnI2ZmODBhYicsICcjZmY0MDgxJywgJyNmNTAwNTcnLCAnI2M1MTE2MicsXG4gICAgICAgICcjZjNlNWY1JywgJyNlMWJlZTcnLCAnI2NlOTNkOCcsICcjYmE2OGM4JywgJyNhYjQ3YmMnLCAnIzljMjdiMCcsICcjOGUyNGFhJywgJyM3YjFmYTInLCAnIzZhMWI5YScsICcjNGExNDhjJywgJyNlYTgwZmMnLCAnI2UwNDBmYicsICcjZDUwMGY5JywgJyNhYTAwZmYnLFxuICAgICAgICAnI2VkZTdmNicsICcjZDFjNGU5JywgJyNiMzlkZGInLCAnIzk1NzVjZCcsICcjN2U1N2MyJywgJyM2NzNhYjcnLCAnIzVlMzViMScsICcjNTEyZGE4JywgJyM0NTI3YTAnLCAnIzMxMWI5MicsICcjYjM4OGZmJywgJyM3YzRkZmYnLCAnIzY1MWZmZicsICcjNjIwMGVhJyxcbiAgICAgICAgJyNlOGVhZjYnLCAnI2M1Y2FlOScsICcjOWZhOGRhJywgJyM3OTg2Y2InLCAnIzVjNmJjMCcsICcjM2Y1MWI1JywgJyMzOTQ5YWInLCAnIzMwM2Y5ZicsICcjMjgzNTkzJywgJyMxYTIzN2UnLCAnIzhjOWVmZicsICcjNTM2ZGZlJywgJyMzZDVhZmUnLCAnIzMwNGZmZScsXG4gICAgICAgICcjZTNmMmZkJywgJyNiYmRlZmInLCAnIzkwY2FmOScsICcjNjRiNWY2JywgJyM0MmE1ZjUnLCAnIzIxOTZmMycsICcjMWU4OGU1JywgJyMxOTc2ZDInLCAnIzE1NjVjMCcsICcjMGQ0N2ExJywgJyM4MmIxZmYnLCAnIzQ0OGFmZicsICcjMjk3OWZmJywgJyMyOTYyZmYnLFxuICAgICAgICAnI2UxZjVmZScsICcjYjNlNWZjJywgJyM4MWQ0ZmEnLCAnIzRmYzNmNycsICcjMjliNmY2JywgJyMwM2E5ZjQnLCAnIzAzOWJlNScsICcjMDI4OGQxJywgJyMwMjc3YmQnLCAnIzAxNTc5YicsICcjODBkOGZmJywgJyM0MGM0ZmYnLCAnIzAwYjBmZicsICcjMDA5MWVhJyxcbiAgICAgICAgJyNlMGY3ZmEnLCAnI2IyZWJmMicsICcjODBkZWVhJywgJyM0ZGQwZTEnLCAnIzI2YzZkYScsICcjMDBiY2Q0JywgJyMwMGFjYzEnLCAnIzAwOTdhNycsICcjMDA4MzhmJywgJyMwMDYwNjQnLCAnIzg0ZmZmZicsICcjMThmZmZmJywgJyMwMGU1ZmYnLCAnIzAwYjhkNCcsXG4gICAgICAgICcjZTBmMmYxJywgJyNiMmRmZGInLCAnIzgwY2JjNCcsICcjNGRiNmFjJywgJyMyNmE2OWEnLCAnIzAwOTY4OCcsICcjMDA4OTdiJywgJyMwMDc5NmInLCAnIzAwNjk1YycsICcjMDA0ZDQwJywgJyNhN2ZmZWInLCAnIzY0ZmZkYScsICcjMWRlOWI2JywgJyMwMGJmYTUnLFxuICAgICAgICAnI2U4ZjVlOScsICcjYzhlNmM5JywgJyNhNWQ2YTcnLCAnIzgxYzc4NCcsICcjNjZiYjZhJywgJyM0Y2FmNTAnLCAnIzQzYTA0NycsICcjMzg4ZTNjJywgJyMyZTdkMzInLCAnIzFiNWUyMCcsICcjYjlmNmNhJywgJyM2OWYwYWUnLCAnIzAwZTY3NicsICcjMDBjODUzJyxcbiAgICAgICAgJyNmMWY4ZTknLCAnI2RjZWRjOCcsICcjYzVlMWE1JywgJyNhZWQ1ODEnLCAnIzljY2M2NScsICcjOGJjMzRhJywgJyM3Y2IzNDInLCAnIzY4OWYzOCcsICcjNTU4YjJmJywgJyMzMzY5MWUnLCAnI2NjZmY5MCcsICcjYjJmZjU5JywgJyM3NmZmMDMnLCAnIzY0ZGQxNycsXG4gICAgICAgICcjZjlmYmU3JywgJyNmMGY0YzMnLCAnI2U2ZWU5YycsICcjZGNlNzc1JywgJyNkNGUxNTcnLCAnI2NkZGMzOScsICcjYzBjYTMzJywgJyNhZmI0MmInLCAnIzllOWQyNCcsICcjODI3NzE3JywgJyNmNGZmODEnLCAnI2VlZmY0MScsICcjYzZmZjAwJywgJyNhZWVhMDAnLFxuICAgICAgICAnI2ZmZmRlNycsICcjZmZmOWM0JywgJyNmZmY1OWQnLCAnI2ZmZjE3NicsICcjZmZlZTU4JywgJyNmZmViM2InLCAnI2ZkZDgzNScsICcjZmJjMDJkJywgJyNmOWE4MjUnLCAnI2Y1N2YxNycsICcjZmZmZjhkJywgJyNmZmZmMDAnLCAnI2ZmZWEwMCcsICcjZmZkNjAwJyxcbiAgICAgICAgJyNmZmY4ZTEnLCAnI2ZmZWNiMycsICcjZmZlMDgyJywgJyNmZmQ1NGYnLCAnI2ZmY2EyOCcsICcjZmZjMTA3JywgJyNmZmIzMDAnLCAnI2ZmYTAwMCcsICcjZmY4ZjAwJywgJyNmZjZmMDAnLCAnI2ZmZTU3ZicsICcjZmZkNzQwJywgJyNmZmM0MDAnLCAnI2ZmYWIwMCcsXG4gICAgICAgICcjZmZmM2UwJywgJyNmZmUwYjInLCAnI2ZmY2M4MCcsICcjZmZiNzRkJywgJyNmZmE3MjYnLCAnI2ZmOTgwMCcsICcjZmI4YzAwJywgJyNmNTdjMDAnLCAnI2VmNmMwMCcsICcjZTY1MTAwJywgJyNmZmQxODAnLCAnI2ZmYWI0MCcsICcjZmY5MTAwJywgJyNmZjZkMDAnLFxuICAgICAgICAnI2ZiZTllNycsICcjZmZjY2JjJywgJyNmZmFiOTEnLCAnI2ZmOGE2NScsICcjZmY3MDQzJywgJyNmZjU3MjInLCAnI2Y0NTExZScsICcjZTY0YTE5JywgJyNkODQzMTUnLCAnI2JmMzYwYycsICcjZmY5ZTgwJywgJyNmZjZlNDAnLCAnI2ZmM2QwMCcsICcjZGQyYzAwJyxcbiAgICAgICAgJyNlZmViZTknLCAnI2Q3Y2NjOCcsICcjYmNhYWE0JywgJyNhMTg4N2YnLCAnIzhkNmU2MycsICcjNzk1NTQ4JywgJyM2ZDRjNDEnLCAnIzVkNDAzNycsICcjNGUzNDJlJywgJyMzZTI3MjMnLFxuICAgICAgICAnI2ZhZmFmYScsICcjZjVmNWY1JywgJyNlZWVlZWUnLCAnI2UwZTBlMCcsICcjYmRiZGJkJywgJyM5ZTllOWUnLCAnIzc1NzU3NScsICcjNjE2MTYxJywgJyM0MjQyNDInLCAnIzIxMjEyMScsXG4gICAgICAgICcjZWNlZmYxJywgJyNjZmQ4ZGMnLCAnI2IwYmVjNScsICcjOTBhNGFlJywgJyM3ODkwOWMnLCAnIzYwN2Q4YicsICcjNTQ2ZTdhJywgJyM0NTVhNjQnLCAnIzM3NDc0ZicsICcjMjYzMjM4JyxcbiAgICAgIF1cbiAgICB9KTtcbiAgfVxuXG5cblxuXG5cbn1cbiIsImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyXSdcbn0pXG5leHBvcnQgY2xhc3MgTmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyRGlyZWN0aXZlIHtcblxuICBASW5wdXQoJ3BpY2tlclBhZCcpIHB1YmxpYyBwaWNrZXJQYWQ6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsUmVmOiBFbGVtZW50UmVmKSB7IH1cblxuXG4gIHB1YmxpYyBzZXRQb3NpdGlvbih4OiBudW1iZXIsIHk6IG51bWJlciwgZGlyZWN0aW9uOiBzdHJpbmcpOiB2b2lkIHtcblxuICAgIGxldCByZWN0ID0gdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgaWYoZGlyZWN0aW9uID09ICd2ZXJ0aWNhbCcgfHwgZGlyZWN0aW9uID09ICdib3RoJykge1xuICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LnN0eWxlLnRvcCA9IE1hdGgucm91bmQoKHkgLSAoKHJlY3QuaGVpZ2h0KSAvIDIpKSkgKyAncHgnO1xuICAgIH1cbiAgICBpZihkaXJlY3Rpb24gPT0gJ2hvcml6b250YWwnIHx8IGRpcmVjdGlvbiA9PSAnYm90aCcpIHtcbiAgICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gTWF0aC5yb3VuZCgoeCAtICgocmVjdC53aWR0aCkgLyAyKSkpICsgJ3B4JztcbiAgICB9XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQge1xuICBDb250ZW50Q2hpbGQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Tmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyRGlyZWN0aXZlfSBmcm9tIFwiLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1kcmFnZ2VyLmRpcmVjdGl2ZVwiO1xuLy8gaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24sIG9mfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtmcm9tRXZlbnQsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge05neFRUaXRhbkNvbG9yUGlja2VyU2VydmljZX0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuc2VydmljZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEN1c3RvbVJlY3Qge1xuICBoZWlnaHQ6IG51bWJlcixcbiAgbGVmdDogbnVtYmVyLFxuICB0b3A6IG51bWJlcixcbiAgd2lkdGg6IG51bWJlclxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEN1c3RvbVBlcmNlbnQge1xuICB4OiBudW1iZXIsXG4gIHk6IG51bWJlcixcbn1cblxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3Rvcl0nLFxuICBleHBvcnRBczogJ2xpYk5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3InXG59KVxuZXhwb3J0IGNsYXNzIE5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3l7XG5cbiAgQElucHV0KCdkaXJlY3Rpb24nKSBwdWJsaWMgZGlyZWN0aW9uOiBzdHJpbmcgPSAnYm90aCc7XG5cbiAgQENvbnRlbnRDaGlsZChOZ3hUVGl0YW5Db2xvclBpY2tlckRyYWdnZXJEaXJlY3RpdmUpIHB1YmxpYyBkcmFnZ2VyOiBOZ3hUVGl0YW5Db2xvclBpY2tlckRyYWdnZXJEaXJlY3RpdmUgPSBudWxsO1xuXG4gIEBPdXRwdXQoJ2NoYW5nZScpIHB1YmxpYyBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxDdXN0b21QZXJjZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Q3VzdG9tUGVyY2VudD4oKTtcblxuICBwdWJsaWMgZWw6IEhUTUxFbGVtZW50ID0gbnVsbDtcbiAgcHVibGljIGRyYWdTdGFydDogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgZ2xvYmFsTW91c2VNb3ZlOiBTdWJzY3JpcHRpb24gPSBudWxsO1xuICBwdWJsaWMgZ2xvYmFsTW91c2VVcDogU3Vic2NyaXB0aW9uID0gbnVsbDtcblxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicsIFsnJGV2ZW50J10pIHB1YmxpYyBvbk1vdXNlRG93bigkZXZlbnQpIHtcbiAgICB0aGlzLmRyYWdTdGFydCA9IHRydWU7XG4gICAgdGhpcy5nZXRQb3NpdGlvbigkZXZlbnQpO1xuICB9XG5cblxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBlbFJlZjogRWxlbWVudFJlZixcbiAgICBwdWJsaWMgY29sb3JQaWNrZXJTZXJ2aWNlOiBOZ3hUVGl0YW5Db2xvclBpY2tlclNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5lbCA9IHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmRpcmVjdGlvbiA9IChbJ2JvdGgnLCAndmVydGljYWwnLCAnaG9yaXpvbnRhbCddLmluZGV4T2YodGhpcy5kaXJlY3Rpb24pID09PSAtMSkgPyAnYm90aCcgOiB0aGlzLmRpcmVjdGlvbjtcbiAgICAvLyB0aGlzLmdsb2JhbE1vdXNlTW92ZSA9IGZyb21FdmVudCh3aW5kb3csICdtb3VzZW1vdmUnKS5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgLy8gICBpZih0aGlzLmRyYWdTdGFydCkge1xuICAgIC8vICAgICB0aGlzLmdldFBvc2l0aW9uKDxNb3VzZUV2ZW50PmV2ZW50KTtcbiAgICAvLyAgIH1cbiAgICAvLyB9KTtcbiAgICAvLyB0aGlzLmdsb2JhbE1vdXNlVXAgPSBmcm9tRXZlbnQod2luZG93LCAnbW91c2V1cCcpLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAvLyAgIGlmKHRoaXMuZHJhZ1N0YXJ0KSB7XG4gICAgLy8gICAgIHRoaXMuZHJhZ1N0YXJ0ID0gZmFsc2U7XG4gICAgLy8gICAgIHRoaXMuZ2V0UG9zaXRpb24oPE1vdXNlRXZlbnQ+ZXZlbnQpO1xuICAgIC8vICAgfVxuICAgIC8vIH0pO1xuXG4gICAgdGhpcy5nbG9iYWxNb3VzZU1vdmUgPSB0aGlzLmNvbG9yUGlja2VyU2VydmljZS5tb3VzZU1vdmVPYnNlcnZhYmxlLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgIGlmKHRoaXMuZHJhZ1N0YXJ0KSB7XG4gICAgICAgIHRoaXMuZ2V0UG9zaXRpb24oPE1vdXNlRXZlbnQ+ZXZlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuZ2xvYmFsTW91c2VVcCA9IHRoaXMuY29sb3JQaWNrZXJTZXJ2aWNlLm1vdXNlVXBPYnNlcnZhYmxlLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgIGlmKHRoaXMuZHJhZ1N0YXJ0KSB7XG4gICAgICAgIHRoaXMuZHJhZ1N0YXJ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZ2V0UG9zaXRpb24oPE1vdXNlRXZlbnQ+ZXZlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICBpZih0aGlzLmdsb2JhbE1vdXNlTW92ZSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5nbG9iYWxNb3VzZU1vdmUudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYodGhpcy5nbG9iYWxNb3VzZVVwICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmdsb2JhbE1vdXNlVXAudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0RHJhZ2dlcihwZXJzZW50OiBDdXN0b21QZXJjZW50KSB7XG4gICAgaWYodGhpcy5kcmFnZ2VyID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBwb3NpdGlvbjogQ3VzdG9tUmVjdCA9IHRoaXMuZ2V0UmVjdCh0aGlzLmVsKTtcbiAgICBsZXQgeCA9IE1hdGgucm91bmQoKChwb3NpdGlvbi53aWR0aCAtIHRoaXMuZHJhZ2dlci5waWNrZXJQYWQgKiAyKSAqIHBlcnNlbnQueCAvIDEwMCkpO1xuICAgIGxldCB5ID0gTWF0aC5yb3VuZCgoKHBvc2l0aW9uLmhlaWdodCAtIHRoaXMuZHJhZ2dlci5waWNrZXJQYWQgKiAyKSAqIHBlcnNlbnQueSAvIDEwMCkpO1xuICAgIHRoaXMuZHJhZ2dlci5zZXRQb3NpdGlvbihcbiAgICAgICh4ID4gdGhpcy5kcmFnZ2VyLnBpY2tlclBhZCkgPyB4IDogdGhpcy5kcmFnZ2VyLnBpY2tlclBhZCxcbiAgICAgICh5ID4gdGhpcy5kcmFnZ2VyLnBpY2tlclBhZCkgPyB5IDogdGhpcy5kcmFnZ2VyLnBpY2tlclBhZCxcbiAgICAgIHRoaXMuZGlyZWN0aW9uXG4gICAgKTtcblxuICB9XG5cbiAgcHVibGljIGdldFBvc2l0aW9uKCRldmVudDogTW91c2VFdmVudCkge1xuICAgIGxldCBjdXJzb3JZID0gJGV2ZW50LnBhZ2VZO1xuICAgIGxldCBjdXJzb3JYID0gJGV2ZW50LnBhZ2VYO1xuICAgIGxldCBwb3NpdGlvbjogQ3VzdG9tUmVjdCA9IHRoaXMuZ2V0UmVjdCh0aGlzLmVsKTtcbiAgICBsZXQgcGVyY2VudDogQ3VzdG9tUGVyY2VudCA9IHt4OiAwLCB5OiAwfTtcbiAgICBpZih0aGlzLmRpcmVjdGlvbiA9PSAndmVydGljYWwnIHx8IHRoaXMuZGlyZWN0aW9uID09ICdib3RoJykge1xuICAgICAgcGVyY2VudC55ID0gTWF0aC5yb3VuZCgoY3Vyc29yWSAtIChwb3NpdGlvbi50b3ApKSAqIDEwMCAvIChwb3NpdGlvbi5oZWlnaHQgLSB0aGlzLmRyYWdnZXIucGlja2VyUGFkICogMikpO1xuICAgICAgaWYocGVyY2VudC55IDwgMCkge1xuICAgICAgICBwZXJjZW50LnkgPSAwXG4gICAgICB9IGVsc2UgaWYocGVyY2VudC55ID4gMTAwKSB7XG4gICAgICAgIHBlcmNlbnQueSA9IDEwMDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYodGhpcy5kaXJlY3Rpb24gPT0gJ2hvcml6b250YWwnIHx8IHRoaXMuZGlyZWN0aW9uID09ICdib3RoJykge1xuICAgICAgcGVyY2VudC54ID0gTWF0aC5yb3VuZCgoY3Vyc29yWCAtIChwb3NpdGlvbi5sZWZ0KSkgKiAxMDAgLyAocG9zaXRpb24ud2lkdGggLSB0aGlzLmRyYWdnZXIucGlja2VyUGFkICogMikpO1xuICAgICAgaWYocGVyY2VudC54IDwgMCkge1xuICAgICAgICBwZXJjZW50LnggPSAwXG4gICAgICB9IGVsc2UgaWYocGVyY2VudC54ID4gMTAwKSB7XG4gICAgICAgIHBlcmNlbnQueCA9IDEwMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNldERyYWdnZXIocGVyY2VudCk7XG4gICAgdGhpcy5jaGFuZ2UuZW1pdChwZXJjZW50KTtcblxuICB9XG5cblxuXG4gIHB1YmxpYyBnZXRSZWN0KGVsZW06IEhUTUxFbGVtZW50KTogQ3VzdG9tUmVjdCB7XG5cbiAgICBsZXQgYm94ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBsZXQgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgbGV0IGRvY0VsID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgIGxldCBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jRWwuc2Nyb2xsVG9wIHx8IGJvZHkuc2Nyb2xsVG9wO1xuICAgIGxldCBzY3JvbGxMZWZ0ID0gd2luZG93LnBhZ2VYT2Zmc2V0IHx8IGRvY0VsLnNjcm9sbExlZnQgfHwgYm9keS5zY3JvbGxMZWZ0O1xuICAgIGxldCBjbGllbnRUb3AgPSBkb2NFbC5jbGllbnRUb3AgfHwgYm9keS5jbGllbnRUb3AgfHwgMDtcbiAgICBsZXQgY2xpZW50TGVmdCA9IGRvY0VsLmNsaWVudExlZnQgfHwgYm9keS5jbGllbnRMZWZ0IHx8IDA7XG5cbiAgICByZXR1cm4ge1xuICAgICAgaGVpZ2h0OiBib3guaGVpZ2h0LFxuICAgICAgbGVmdDogYm94LmxlZnQgKyBzY3JvbGxMZWZ0IC0gY2xpZW50TGVmdCxcbiAgICAgIHRvcDogYm94LnRvcCArIHNjcm9sbFRvcCAtIGNsaWVudFRvcCxcbiAgICAgIHdpZHRoOiBib3gud2lkdGgsXG4gICAgfTtcbiAgfVxuXG5cblxufVxuIiwiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Tmd4VFRpdGFuQ29sb3JQaWNrZXJTZXJ2aWNlfSBmcm9tIFwiLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci5zZXJ2aWNlXCI7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tsaWJOZ3hUVGl0YW5Db2xvclBpY2tlcklucHV0XScsXG4gIGV4cG9ydEFzOiAnbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJJbnB1dCdcbn0pXG5leHBvcnQgY2xhc3MgTmd4VFRpdGFuQ29sb3JQaWNrZXJJbnB1dERpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCdmb3JtYXQnKSBmb3JtYXQ6IHN0cmluZyA9ICdoZXg2JztcbiAgQE91dHB1dCgnaW5wdXRDaGFuZ2UnKSBwdWJsaWMgaW5wdXRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cblxuICBASG9zdExpc3RlbmVyKCdrZXl1cCcpIGtleVVwKCkge1xuICAgIHRoaXMuaW5wdXRWYWxpZGF0ZSgpO1xuICB9XG4gIEBIb3N0TGlzdGVuZXIoJ2NoYW5nZScpIGNoYW5nZSgpIHtcbiAgICB0aGlzLmlucHV0VmFsaWRhdGUoKTtcbiAgfVxuXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsOiBFbGVtZW50UmVmLFxuICAgIHB1YmxpYyBjb2xvclBpY2tlclNlcnZpY2U6IE5neFRUaXRhbkNvbG9yUGlja2VyU2VydmljZVxuICApIHsgfVxuXG5cbiAgc2V0SW5wdXRWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgKDxIVE1MSW5wdXRFbGVtZW50PnRoaXMuZWwubmF0aXZlRWxlbWVudCkudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG5cbiAgaW5wdXRWYWxpZGF0ZSgpIHtcbiAgICBsZXQgcmVzID0gdGhpcy5jb2xvclBpY2tlclNlcnZpY2UudmFsaWRhdGVDb2xvckZvcm1hdChcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC52YWx1ZSxcbiAgICAgIHRoaXMuZm9ybWF0XG4gICAgKTtcblxuICAgIGlmKHJlcyAhPT0gJ25vdFZhbGlkJykge1xuICAgICAgKDxIVE1MSW5wdXRFbGVtZW50PnRoaXMuZWwubmF0aXZlRWxlbWVudCkudmFsdWUgPSByZXM7XG4gICAgICB0aGlzLmlucHV0Q2hhbmdlLmVtaXQocmVzKTtcbiAgICB9XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtQYWxldHRlfSBmcm9tIFwiLi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItbmd4LXR0aXRhbi1jb2xvci1waWNrZXItcGFsZXR0ZS1saXN0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwicGlja2VyLXBhbGV0dGUtd3JhcHBlclwiICpuZ0lmPVwicGFsbGV0cy5sZW5ndGggPiAwXCI+XG4gIDxkaXYgY2xhc3M9XCJwYWxldHRlLWxpbmtzXCI+XG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJwYWxldHRlLWxpbmtcIlxuICAgICAgKm5nRm9yPVwibGV0IHBhbGV0dGUgb2YgcGFsbGV0c1wiXG4gICAgICBbbmdDbGFzc109XCJ7J3NlbGVjdGVkJzogKGFjdGl2ZVBhbGV0dGUgIT09IG51bGwgJiYgYWN0aXZlUGFsZXR0ZS5pZCA9PSBwYWxldHRlLmlkKX1cIlxuICAgICAgKGNsaWNrKT1cInNlbGVjdFBhbGV0dGUocGFsZXR0ZSlcIlxuICAgID5cbiAgICAgIHt7cGFsZXR0ZS5uYW1lfX1cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJwYWxldHRlLXBpY2tlci1ob2xkZXJcIiAqbmdJZj1cImFjdGl2ZVBhbGV0dGUgIT09IG51bGwgJiYgYWN0aXZlUGFsZXR0ZS5jb2xvcnMubGVuZ3RoID4gMFwiPlxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwicGFsZXR0ZS1jb2xvclwiXG4gICAgICAqbmdGb3I9XCJsZXQgY29sb3Igb2YgYWN0aXZlUGFsZXR0ZS5jb2xvcnNcIlxuICAgICAgW25nU3R5bGVdPVwie1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yXG4gICAgICB9XCJcbiAgICAgIChjbGljayk9XCJjb2xvclNlbGVjdGVkKGNvbG9yKVwiXG4gICAgPlxuXG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgOmhvc3QgLnBpY2tlci1wYWxldHRlLXdyYXBwZXIgLnBhbGV0dGUtbGlua3N7ZGlzcGxheTpmbGV4O2ZsZXgtd3JhcDp3cmFwO21hcmdpbi1ib3R0b206NXB4fTpob3N0IC5waWNrZXItcGFsZXR0ZS13cmFwcGVyIC5wYWxldHRlLWxpbmtzIC5wYWxldHRlLWxpbmt7bWFyZ2luLXJpZ2h0OjVweDtib3JkZXItcmFkaXVzOjNweDtwYWRkaW5nOjJweCA0cHg7Ym9yZGVyOjFweCBzb2xpZCAjZGRkO3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtmb250LXNpemU6MTBweDtmb250LWZhbWlseTotYXBwbGUtc3lzdGVtLEJsaW5rTWFjU3lzdGVtRm9udCxTYW4gRnJhbmNpc2NvLFJvYm90byxTZWdvZSBVSSxIZWx2ZXRpY2EgTmV1ZSxzYW5zLXNlcmlmO2ZvbnQtd2VpZ2h0OjYwMDtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7Y3Vyc29yOnBvaW50ZXJ9Omhvc3QgLnBpY2tlci1wYWxldHRlLXdyYXBwZXIgLnBhbGV0dGUtbGlua3MgLnBhbGV0dGUtbGluay5zZWxlY3RlZHtiYWNrZ3JvdW5kLWNvbG9yOiM1ZTZiYzU7Y29sb3I6I2ZmZn06aG9zdCAucGlja2VyLXBhbGV0dGUtd3JhcHBlciAucGFsZXR0ZS1waWNrZXItaG9sZGVye2hlaWdodDoxNjVweDtkaXNwbGF5OmZsZXg7ZmxleC13cmFwOndyYXA7YWxpZ24taXRlbXM6ZmxleC1zdGFydDtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydDthbGlnbi1jb250ZW50OmJhc2VsaW5lfTpob3N0IC5waWNrZXItcGFsZXR0ZS13cmFwcGVyIC5wYWxldHRlLXBpY2tlci1ob2xkZXIgLnBhbGV0dGUtY29sb3J7Y3Vyc29yOnBvaW50ZXI7d2lkdGg6MTBweDtoZWlnaHQ6MTBweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hUVGl0YW5Db2xvclBpY2tlclBhbGV0dGVMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoJ3BhbGxldHMnKSBwdWJsaWMgcGFsbGV0czogQXJyYXk8UGFsZXR0ZT4gPSBbXTtcbiAgQE91dHB1dCgnY2hhbmdlJykgcHVibGljIGNoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBwdWJsaWMgYWN0aXZlUGFsZXR0ZTogUGFsZXR0ZSA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIGNsb3NlUGFsZXR0ZSgpIHtcbiAgICB0aGlzLmFjdGl2ZVBhbGV0dGUgPSBudWxsO1xuICB9XG5cbiAgc2VsZWN0UGFsZXR0ZShwYWxldHRlOiBQYWxldHRlKSB7XG4gICAgaWYoXG4gICAgICB0aGlzLmFjdGl2ZVBhbGV0dGUgPT0gbnVsbFxuICAgICkge1xuICAgICAgdGhpcy5hY3RpdmVQYWxldHRlID0gcGFsZXR0ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYWN0aXZlUGFsZXR0ZS5pZCAhPT0gcGFsZXR0ZS5pZCkge1xuICAgICAgdGhpcy5hY3RpdmVQYWxldHRlID0gcGFsZXR0ZTtcbiAgICB9XG5cbiAgfVxuXG4gIGNvbG9yU2VsZWN0ZWQoY29sb3IpIHtcbiAgICB0aGlzLmNoYW5nZS5lbWl0KGNvbG9yKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgQ29udGVudENoaWxkLCBDb250ZW50Q2hpbGRyZW4sIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25Jbml0LFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Tmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvckRpcmVjdGl2ZX0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXItc2VsZWN0b3IuZGlyZWN0aXZlXCI7XG5pbXBvcnQge0hTVkEsIE5neFRUaXRhbkNvbG9yUGlja2VyU2VydmljZSwgUGFsZXR0ZX0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuc2VydmljZVwiO1xuaW1wb3J0IHtOZ3hUVGl0YW5Db2xvclBpY2tlcklucHV0RGlyZWN0aXZlfSBmcm9tIFwiLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1pbnB1dC5kaXJlY3RpdmVcIjtcbmltcG9ydCB7Tmd4VFRpdGFuQ29sb3JQaWNrZXJQYWxldHRlTGlzdENvbXBvbmVudH0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXItcGFsZXR0ZS1saXN0L25neC10dGl0YW4tY29sb3ItcGlja2VyLXBhbGV0dGUtbGlzdC5jb21wb25lbnRcIjtcbi8vW25nU3R5bGVdPVwie2JhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQodG8gdG9wLCAnICsgbmd4VFRpdGFuQ29sb3JQaWNrZXJTZXJ2aWNlLmN1cnJlbnRDb2xvciArICcgMThweCwgcmdiKDI1NSwgNzcsIDI1NSkgY2FsYygxMDAlIC0gMThweCknfVwiXG5AQ29tcG9uZW50KHtcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHNlbGVjdG9yOiAnbGliLW5neC10dGl0YW4tY29sb3ItcGlja2VyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2XHJcbiAgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci13cmFwcGVyXCJcclxuPlxyXG5cclxuICA8ZGl2IGNsYXNzPVwicGlja2VyLWlucHV0LXdyYXBwZXJcIj5cclxuICAgIDxkaXZcclxuICAgICAgW25nU3R5bGVdPVwie2JhY2tncm91bmRDb2xvcjogY29sb3J9XCJcclxuICAgICAgY2xhc3M9XCJkZWJ1Zy1vdXRwdXRcIlxyXG4gICAgICAqbmdJZj1cImNvbG9yUGlja2VyU2VydmljZS5kZWJ1Z1wiXHJcbiAgICA+XHJcbiAgICAgIHt7Y29sb3J9fVxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWlucHV0LWxhYmVsXCI+XHJcbiAgICAgIDxsYWJlbCBbZm9yXT1cInV1aWRcIiA+e3t0aXRsZX19PC9sYWJlbD5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cInBpY2tlci1pbnB1dC1ob2xkZXJcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1jb2xvclwiIFtuZ1N0eWxlXT1cIntiYWNrZ3JvdW5kOiBjdXJyZW50Q29sb3JBbHBoYX1cIj5cclxuXHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWlucHV0XCI+XHJcbiAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICBsaWJOZ3hUVGl0YW5Db2xvclBpY2tlcklucHV0XHJcbiAgICAgICAgICAjcGlja2VySW5wdXQ9XCJsaWJOZ3hUVGl0YW5Db2xvclBpY2tlcklucHV0XCJcclxuICAgICAgICAgIChpbnB1dENoYW5nZSk9XCJpbnB1dENvbG9yQ2hhbmdlKCRldmVudClcIlxyXG4gICAgICAgICAgW2Zvcm1hdF09XCJpbnB1dEZvcm1hdFwiXHJcbiAgICAgICAgICBbaWRdPVwidXVpZFwiXHJcbiAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAoZm9jdXMpPVwib3BlblBpY2tlcigpXCJcclxuICAgICAgICAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPCEtLTxkaXYgY2xhc3M9XCJwaWNrZXItc2F2ZS1zaWduXCI+LS0+XHJcbiAgICAgIDwhLS1TLS0+XHJcbiAgICAgIDwhLS08L2Rpdj4tLT5cclxuICAgIDwvZGl2PlxyXG5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJcIiBbbmdDbGFzc109XCJ7J25vLWFscGhhJzogIWFscGhhLCAnb3Blbic6IHBpY2tlck9wZW59XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX01haW5Db2xvclwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0NvbG9yTGF5ZXJcIiBbbmdTdHlsZV09XCJ7YmFja2dyb3VuZENvbG9yOiBjdXJyZW50Q29sb3JNYXh9XCIgPjwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX1NsaWRhYmxlXCIgbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvciAjbWFpbkNvbG9yPVwibGliTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvclwiIChjaGFuZ2UpPVwiY29sb3JQaWNrZXJTZXJ2aWNlLnNhdHVyYXRpb25DaGFuZ2UoJGV2ZW50LCB0aGlzKVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fRHJhZ2dlclwiIGxpYk5neFRUaXRhbkNvbG9yUGlja2VyRHJhZ2dlciBzdHlsZT1cInRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAwcHgsIDBweCk7XCI+PC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0h1ZVBpY2tlclwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX1NsaWRhYmxlXCIgbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvciAjaHVlUGlja2VyPVwibGliTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvclwiIChjaGFuZ2UpPVwiY29sb3JQaWNrZXJTZXJ2aWNlLmh1ZUNoYW5nZSgkZXZlbnQsIHRoaXMpXCIgW2RpcmVjdGlvbl09XCIndmVydGljYWwnXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19EcmFnZ2VyXCIgbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyIFtwaWNrZXJQYWRdPVwiMFwiIHN0eWxlPVwiIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAwcHgsIDBweCk7XCI+PC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0FscGhhUGlja2VyXCIgKm5nSWY9XCJhbHBoYSA9PT0gdHJ1ZVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0NvbG9yTGF5ZXJcIlxyXG5cclxuICAgICAgICAgICBbbmdTdHlsZV09XCJ7YmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCh0byB0b3AsICcgKyBjdXJyZW50Q29sb3JBbHBoYVplcm8gKyAnICAxOHB4LCAnICsgY3VycmVudENvbG9yICsgJyBjYWxjKDEwMCUgLSAxOHB4KSd9XCJcclxuICAgICAgPjwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX1NsaWRhYmxlXCIgbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvciAjYWxwaGFQaWNrZXI9XCJsaWJOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yXCIgKGNoYW5nZSk9XCJjb2xvclBpY2tlclNlcnZpY2UuYWxwaGFDaGFuZ2UoJGV2ZW50LCB0aGlzKVwiIFtkaXJlY3Rpb25dPVwiJ3ZlcnRpY2FsJ1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fRHJhZ2dlclwiIGxpYk5neFRUaXRhbkNvbG9yUGlja2VyRHJhZ2dlciBbcGlja2VyUGFkXT1cIjBcIiBzdHlsZT1cIiB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDBweCwgMHB4LCAwcHgpO1wiPjwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPCEtLTxkaXYgc3R5bGU9XCJoZWlnaHQ6IDQwcHg7IHdpZHRoOiA0MHB4XCIgW25nU3R5bGVdPVwie2JhY2tncm91bmQ6IGN1cnJlbnRDb2xvcn1cIj4tLT5cclxuXHJcbiAgICA8IS0tPC9kaXY+LS0+XHJcbiAgICA8IS0tPGRpdiBzdHlsZT1cImhlaWdodDogNDBweDsgd2lkdGg6IDQwcHhcIiBbbmdTdHlsZV09XCJ7YmFja2dyb3VuZDogY3VycmVudENvbG9yQWxwaGF9XCI+LS0+XHJcblxyXG4gICAgPCEtLTwvZGl2Pi0tPlxyXG4gIDwvZGl2PlxyXG4gIDxsaWItbmd4LXR0aXRhbi1jb2xvci1waWNrZXItcGFsZXR0ZS1saXN0XHJcbiAgICAoY2hhbmdlKT1cImlucHV0Q29sb3JDaGFuZ2UoJGV2ZW50KVwiXHJcbiAgICBbcGFsbGV0c109XCJwaWNrZXJQYWxsZXRzXCJcclxuICA+XHJcblxyXG4gIDwvbGliLW5neC10dGl0YW4tY29sb3ItcGlja2VyLXBhbGV0dGUtbGlzdD5cclxuPC9kaXY+XHJcblxyXG5gLFxuICBzdHlsZXM6IFtgOmhvc3QgKiw6aG9zdCA6YWZ0ZXIsOmhvc3QgOmJlZm9yZXtib3gtc2l6aW5nOmJvcmRlci1ib3h9Omhvc3QgLmRlYnVnLW91dHB1dHt3aWR0aDoxMDAlO2hlaWdodDoyMHB4fTpob3N0IC5waWNrZXItaW5wdXQtd3JhcHBlcnttYXJnaW4tYm90dG9tOjZweH06aG9zdCAucGlja2VyLWlucHV0LXdyYXBwZXIgLnBpY2tlci1pbnB1dC1sYWJlbHttYXJnaW4tYm90dG9tOjZweH06aG9zdCAucGlja2VyLWlucHV0LXdyYXBwZXIgLnBpY2tlci1pbnB1dC1sYWJlbCBsYWJlbHt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7Zm9udC13ZWlnaHQ6NjAwfTpob3N0IC5waWNrZXItaW5wdXQtd3JhcHBlciAucGlja2VyLWlucHV0LWhvbGRlcntkaXNwbGF5OmZsZXg7aGVpZ2h0OjMzcHg7Ym9yZGVyOjFweCBzb2xpZCAjYmJiO292ZXJmbG93OmhpZGRlbjtib3JkZXItcmFkaXVzOjNweDtiYWNrZ3JvdW5kLWNvbG9yOiNlZWV9Omhvc3QgLnBpY2tlci1pbnB1dC13cmFwcGVyIC5waWNrZXItaW5wdXQtaG9sZGVyIC5waWNrZXItY29sb3J7ZmxleDowIDAgMzFweDtiYWNrZ3JvdW5kLWNvbG9yOiNmZjAzMDB9Omhvc3QgLnBpY2tlci1pbnB1dC13cmFwcGVyIC5waWNrZXItaW5wdXQtaG9sZGVyIC5waWNrZXItaW5wdXR7ZmxleDphdXRvO2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnR9Omhvc3QgLnBpY2tlci1pbnB1dC13cmFwcGVyIC5waWNrZXItaW5wdXQtaG9sZGVyIC5waWNrZXItaW5wdXQgaW5wdXR7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtjb2xvcjojMjcyNzI3O2ZvbnQtZmFtaWx5Om1vbm9zcGFjZTtmb250LXNpemU6MTRweDtib3JkZXI6bm9uZTtvdXRsaW5lOjA7cGFkZGluZzo4cHggMnB4IDhweCA4cHg7d2lkdGg6MTAwJX06aG9zdCAucGlja2VyLWlucHV0LXdyYXBwZXIgLnBpY2tlci1pbnB1dC1ob2xkZXIgLnBpY2tlci1zYXZlLXNpZ257ZmxleDowIDAgMzFweDtsaW5lLWhlaWdodDozM3B4O3RleHQtYWxpZ246Y2VudGVyfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcnttYXgtaGVpZ2h0OjA7b3ZlcmZsb3c6aGlkZGVuOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZTtkaXNwbGF5OmZsZXg7dHJhbnNpdGlvbjptYXgtaGVpZ2h0IC4zc306aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXIub3BlbnttYXJnaW4tYm90dG9tOjVweDttYXgtaGVpZ2h0OjE2NXB4fTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fQ29sb3JMYXllcntwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjEwO3RvcDowO2xlZnQ6MDtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO2JveC1zaGFkb3c6aW5zZXQgMCAwIDJweCAwIHJnYmEoMCwwLDAsLjUpO3BvaW50ZXItZXZlbnRzOm5vbmV9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19TbGlkYWJsZXtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO2N1cnNvcjpwb2ludGVyfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fRHJhZ2dlcntwb3NpdGlvbjpyZWxhdGl2ZTt6LWluZGV4OjMwO2JvdHRvbTouOXJlbTstd2Via2l0LXRyYW5zZm9ybTpub25lO3RyYW5zZm9ybTpub25lO2hlaWdodDoxOHB4O3dpZHRoOjE4cHg7bWFyZ2luOjAgYXV0bzstd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuO2JhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuO3dpbGwtY2hhbmdlOnRyYW5zZm9ybTtiYWNrZ3JvdW5kOjAgMDtib3JkZXI6M3B4IHNvbGlkICNmZmY7Ym94LXNoYWRvdzowIDAgMCAxcHggcmdiYSg2LDQ0LDgyLC4xKSwwIDJweCAxNnB4IHJnYmEoMzMsNDMsNTQsLjA4KSxpbnNldCAwIDAgMCAxcHggcmdiYSg2LDQ0LDgyLC4xKSwwIDJweCAxNnB4IHJnYmEoMzMsNDMsNTQsLjA4KTtib3JkZXItcmFkaXVzOjUwJTtwb2ludGVyLWV2ZW50czpub25lO3RvdWNoLWFjdGlvbjpub25lfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fTWFpbkNvbG9ye2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KDQ1ZGVnLCNkZmUzZTggMjUlLHRyYW5zcGFyZW50IDApLGxpbmVhci1ncmFkaWVudCgtNDVkZWcsI2RmZTNlOCAyNSUsdHJhbnNwYXJlbnQgMCksbGluZWFyLWdyYWRpZW50KDQ1ZGVnLHRyYW5zcGFyZW50IDc1JSwjZGZlM2U4IDApLGxpbmVhci1ncmFkaWVudCgtNDVkZWcsdHJhbnNwYXJlbnQgNzUlLCNkZmUzZTggMCk7YmFja2dyb3VuZC1zaXplOjEuNnJlbSAxLjZyZW07YmFja2dyb3VuZC1wb3NpdGlvbjowIDAsMCAuOHJlbSwuOHJlbSAtLjhyZW0sLS44cmVtIDA7cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6aGlkZGVuO3dpZHRoOjE2NXB4O2hlaWdodDoxNjVweDtib3JkZXItcmFkaXVzOjRweDtjdXJzb3I6cG9pbnRlcn06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX01haW5Db2xvciAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0NvbG9yTGF5ZXJ7Ym94LXNoYWRvdzppbnNldCAwIDAgMCAxcHggcmdiYSg2LDQ0LDgyLC4xKSwwIDJweCAxNnB4IHJnYmEoMzMsNDMsNTQsLjA4KTtib3JkZXItcmFkaXVzOjRweH06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX01haW5Db2xvciAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0RyYWdnZXJ7cmlnaHQ6LjlyZW07bWFyZ2luOjB9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19NYWluQ29sb3I6YWZ0ZXIsOmhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19NYWluQ29sb3I6YmVmb3Jle2NvbnRlbnQ6XCJcIjtwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjIwO3RvcDowO2xlZnQ6MDtkaXNwbGF5OmJsb2NrO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7cG9pbnRlci1ldmVudHM6bm9uZTtib3JkZXItcmFkaXVzOjNweH06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX01haW5Db2xvcjpiZWZvcmV7YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoOTBkZWcsI2ZmZix0cmFuc3BhcmVudCl9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19NYWluQ29sb3I6YWZ0ZXJ7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQoMGRlZywjMDAwLHRyYW5zcGFyZW50KTtib3gtc2hhZG93Omluc2V0IDAgMCAwIDFweCByZ2JhKDYsNDQsODIsLjEpLDAgMnB4IDE2cHggcmdiYSgzMyw0Myw1NCwuMDgpfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fQWxwaGFQaWNrZXIsOmhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19IdWVQaWNrZXJ7cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6aGlkZGVuO2hlaWdodDoxNjVweDt3aWR0aDoyNHB4O21hcmdpbi1sZWZ0Oi44cmVtO2JvcmRlci13aWR0aDozcHg7Ym9yZGVyLXJhZGl1czo4cmVtO3BhZGRpbmc6MTNweCAwfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fSHVlUGlja2Vye2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSxyZWQgMCwjZmYwIDIxJSwjMGYwIDMzJSwjMGZmIDUwJSwjMDBmIDY3JSwjZjBmIDgzJSxyZWQgMTAwJSk7Ym94LXNoYWRvdzppbnNldCAwIDAgMnB4IDAgcmdiYSgwLDAsMCwuNSl9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19BbHBoYVBpY2tlcntiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudCg0NWRlZywjZGZlM2U4IDI1JSx0cmFuc3BhcmVudCAwKSxsaW5lYXItZ3JhZGllbnQoLTQ1ZGVnLCNkZmUzZTggMjUlLHRyYW5zcGFyZW50IDApLGxpbmVhci1ncmFkaWVudCg0NWRlZyx0cmFuc3BhcmVudCA3NSUsI2RmZTNlOCAwKSxsaW5lYXItZ3JhZGllbnQoLTQ1ZGVnLHRyYW5zcGFyZW50IDc1JSwjZGZlM2U4IDApO2JhY2tncm91bmQtc2l6ZToxLjZyZW0gMS42cmVtO2JhY2tncm91bmQtcG9zaXRpb246MCAwLDAgLjhyZW0sLjhyZW0gLS44cmVtLC0uOHJlbSAwfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fQWxwaGFQaWNrZXIgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19Db2xvckxheWVye2JvcmRlci1yYWRpdXM6OHJlbX06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXIubm8tYWxwaGEgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19NYWluQ29sb3J7d2lkdGg6MjAwcHh9YF0sXG59KVxuZXhwb3J0IGNsYXNzIE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0IHtcblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pIGNvbXBvbmVudENsaWNrKCRldmVudCkge1xuICAgIGlmKCF0aGlzLnBpY2tlck9wZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYodHlwZW9mICRldmVudC5wYXRoICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBsZXQgcGlja2VyRm91bmQgPSBmYWxzZTtcbiAgICAgICRldmVudC5wYXRoLmV2ZXJ5KGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgaWYoXG4gICAgICAgICAgdHlwZW9mIGl0ZW0uY2xhc3NMaXN0ICE9PSBcInVuZGVmaW5lZFwiXG4gICAgICAgICkge1xuICAgICAgICAgIGlmKFxuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ3BpY2tlci1pbnB1dC1ob2xkZXInKSB8fFxuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ25neC10dGl0YW4tY29sb3ItcGlja2VyJylcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHBpY2tlckZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0pO1xuXG4gICAgICBpZighcGlja2VyRm91bmQpIHtcbiAgICAgICAgdGhpcy5jbG9zZVBpY2tlcigpO1xuICAgICAgfVxuXG4gICAgfVxuICB9XG5cbiAgQElucHV0KCdhbHBoYScpIHB1YmxpYyBhbHBoYTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoJ2RlYnVnJykgcHVibGljIGRlYnVnOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgnY29sb3InKSBwdWJsaWMgY29sb3I6IHN0cmluZyA9ICdyZ2JhKDI1NSwyNTUsMjU1LDApJztcbiAgQElucHV0KCd0aXRsZScpIHB1YmxpYyB0aXRsZTogc3RyaW5nID0gJ3RpdGxlJztcbiAgQElucHV0KCdvdXRGb3JtYXQnKSBwdWJsaWMgb3V0Rm9ybWF0OiBzdHJpbmcgPSAnaGV4Nic7XG4gIEBJbnB1dCgnaW5wdXRGb3JtYXQnKSBwdWJsaWMgaW5wdXRGb3JtYXQ6IHN0cmluZyA9ICdoZXg2JztcbiAgQElucHV0KCdhdmFpbFBhbGxldHMnKSBwdWJsaWMgYXZhaWxQYWxsZXRzOiBBcnJheTxzdHJpbmc+ID0gWydwb2xhcmlzJywgJ21hdGVyaWFsJ107XG4gIEBJbnB1dCgnY3VzdG9tUGFsbGV0cycpIHB1YmxpYyBjdXN0b21QYWxsZXRzOiAgQXJyYXk8UGFsZXR0ZT4gPSBbXTtcbiAgQE91dHB1dCgnY29sb3JDaGFuZ2VkJykgcHVibGljIGNvbG9yQ2hhbmdlZDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBAVmlld0NoaWxkKCdwaWNrZXJJbnB1dCcpIHB1YmxpYyBwaWNrZXJJbnB1dDogTmd4VFRpdGFuQ29sb3JQaWNrZXJJbnB1dERpcmVjdGl2ZTtcblxuICBAVmlld0NoaWxkKE5neFRUaXRhbkNvbG9yUGlja2VyUGFsZXR0ZUxpc3RDb21wb25lbnQpIHB1YmxpYyBwYWxldHRlTGlzdDogTmd4VFRpdGFuQ29sb3JQaWNrZXJQYWxldHRlTGlzdENvbXBvbmVudDtcblxuICBAVmlld0NoaWxkKCdtYWluQ29sb3InKSBwdWJsaWMgbWFpbkNvbG9yOiBOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yRGlyZWN0aXZlID0gbnVsbDtcbiAgQFZpZXdDaGlsZCgnaHVlUGlja2VyJykgcHVibGljIGh1ZVBpY2tlcjogTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvckRpcmVjdGl2ZTtcbiAgQFZpZXdDaGlsZCgnYWxwaGFQaWNrZXInKSBwdWJsaWMgYWxwaGFQaWNrZXI6IE5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JEaXJlY3RpdmU7XG5cbiAgcHVibGljIGNvbG9ySW5pdDogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgcGlja2VyT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHB1YmxpYyBwaWNrZXJQYWxsZXRzOiBBcnJheTxQYWxldHRlPiA9IFtdO1xuXG4gIHB1YmxpYyBoc3ZhOiBIU1ZBID0ge1xuICAgIGh1ZTogMCxcbiAgICBzYXR1cmF0aW9uOiAxMDAsXG4gICAgdmFsdWU6IDEwMCxcbiAgICBhbHBoYTogMVxuICB9O1xuXG4gIHB1YmxpYyBjdXJyZW50Q29sb3I6IHN0cmluZyA9ICdyZ2IoMjU1LDAsMCknO1xuICBwdWJsaWMgY3VycmVudENvbG9yTWF4OiBzdHJpbmcgPSAncmdiYSgyNTUsMCwwLDEpJztcbiAgcHVibGljIGN1cnJlbnRDb2xvckFscGhhOiBzdHJpbmcgPSAncmdiYSgyNTUsMCwwLDEpJztcbiAgcHVibGljIGN1cnJlbnRDb2xvckFscGhhWmVybzogc3RyaW5nID0gJ3JnYmEoMjU1LDAsMCwwKSc7XG5cbiAgcHVibGljIHV1aWQ6IHN0cmluZyA9ICdwaWNrZXItJztcblxuICBwdWJsaWMgYWxsb3dlZEZvcm1hdHM6IEFycmF5PHN0cmluZz4gPSBbJ2hleDYnLCAnaGV4OCcsICdyZ2InLCAncmdiYSddO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBjb2xvclBpY2tlclNlcnZpY2U6IE5neFRUaXRhbkNvbG9yUGlja2VyU2VydmljZSxcbiAgICBwdWJsaWMgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHtcbiAgICB0aGlzLnV1aWQgPSB0aGlzLmNvbG9yUGlja2VyU2VydmljZS5nZXRQaWNrZXJVdWlkKCk7XG5cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY29sb3JQaWNrZXJTZXJ2aWNlLmRlYnVnID0gdGhpcy5kZWJ1ZztcbiAgICB0aGlzLnZhbGlkYXRlSW5wdXRQYXJhbXMoKTtcbiAgICB0aGlzLmNvbG9yUGlja2VyU2VydmljZS5wcmVwYXJlUGlja2VyUGFsbGV0cyh0aGlzLmF2YWlsUGFsbGV0cywgdGhpcy5jdXN0b21QYWxsZXRzLCB0aGlzKTtcbiAgICB0aGlzLmNvbG9yUGlja2VyU2VydmljZS5jb2xvclRvRGF0YSh0aGlzLmNvbG9yLCB0aGlzKTtcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnNldERyYWdnZXNUb0N1cnJlbnRDb2xvcigpO1xuICB9XG5cbiAgb3BlblBpY2tlcigpIHtcbiAgICB0aGlzLnBpY2tlck9wZW4gPSB0cnVlO1xuICAgIGlmKHR5cGVvZiB0aGlzLnBhbGV0dGVMaXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5wYWxldHRlTGlzdC5jbG9zZVBhbGV0dGUoKTtcbiAgICB9XG4gIH1cblxuICBjbG9zZVBpY2tlcigpIHtcbiAgICB0aGlzLnBpY2tlck9wZW4gPSBmYWxzZTtcbiAgfVxuXG4gIHZhbGlkYXRlSW5wdXRQYXJhbXMoKSB7XG4gICAgaWYodGhpcy5hbGxvd2VkRm9ybWF0cy5pbmRleE9mKHRoaXMub3V0Rm9ybWF0KSA9PT0gLTEpIHtcbiAgICAgIHRoaXMub3V0Rm9ybWF0ID0gJ2hleDYnO1xuICAgICAgY29uc29sZS5ncm91cChcIm5neC10dGl0YW4tY29sb3ItcGlja2VyXCIpO1xuICAgICAgY29uc29sZS53YXJuKCdbb3V0Rm9ybWF0XSBtdXN0IGJlIG9uZSBvZiB0aGlzICgnICsgdGhpcy5hbGxvd2VkRm9ybWF0cy5qb2luKCcsJykgKyAnKScpO1xuICAgICAgY29uc29sZS5ncm91cEVuZCgpO1xuICAgIH1cbiAgICBpZih0aGlzLmFsbG93ZWRGb3JtYXRzLmluZGV4T2YodGhpcy5pbnB1dEZvcm1hdCkgPT09IC0xKSB7XG4gICAgICB0aGlzLmlucHV0Rm9ybWF0ID0gdGhpcy5vdXRGb3JtYXQgKyAnJztcbiAgICAgIGNvbnNvbGUuZ3JvdXAoXCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlclwiKTtcbiAgICAgIGNvbnNvbGUud2FybignW2lucHV0Rm9ybWF0XSBtdXN0IGJlIG9uZSBvZiB0aGlzICgnICsgdGhpcy5hbGxvd2VkRm9ybWF0cy5qb2luKCcsJykgKyAnKScpO1xuICAgICAgY29uc29sZS5ncm91cEVuZCgpO1xuICAgIH1cbiAgfVxuXG5cbiAgaW5wdXRDb2xvckNoYW5nZShjb2xvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuICAgIHRoaXMuY29sb3JQaWNrZXJTZXJ2aWNlLmNvbG9yVG9EYXRhKHRoaXMuY29sb3IsIHRoaXMpO1xuICAgIHRoaXMuc2V0RHJhZ2dlc1RvQ3VycmVudENvbG9yKCk7XG4gIH1cblxuICB1cGRhdGVSZXR1cm5Db2xvcigpIHtcbiAgICB0aGlzLmNvbG9yID0gdGhpcy5jb2xvclBpY2tlclNlcnZpY2UucHJlcGFyZVJldHVybkNvbG9yKHRoaXMuaHN2YSwgdGhpcy5vdXRGb3JtYXQpO1xuXG4gICAgaWYodGhpcy5jb2xvckluaXQpIHtcbiAgICAgIHRoaXMuY29sb3JDaGFuZ2VkLmVtaXQodGhpcy5jb2xvciArICcnKTtcbiAgICB9XG4gICAgdGhpcy5jb2xvckluaXQgPSB0cnVlO1xuICB9XG5cblxuICBzZXRJbnB1dFZhbHVlKCkge1xuICAgIGlmKHR5cGVvZiB0aGlzLnBpY2tlcklucHV0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5waWNrZXJJbnB1dC5zZXRJbnB1dFZhbHVlKFxuICAgICAgICB0aGlzLmNvbG9yUGlja2VyU2VydmljZS5wcmVwYXJlUmV0dXJuQ29sb3IodGhpcy5oc3ZhLCB0aGlzLmlucHV0Rm9ybWF0KVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBzZXREcmFnZ2VzVG9DdXJyZW50Q29sb3IoKSB7XG5cbiAgICBpZih0aGlzLm1haW5Db2xvciAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5tYWluQ29sb3Iuc2V0RHJhZ2dlcihcbiAgICAgICAge1xuICAgICAgICAgIHg6IHRoaXMuaHN2YS5zYXR1cmF0aW9uLFxuICAgICAgICAgIHk6IDEwMCAtIHRoaXMuaHN2YS52YWx1ZVxuICAgICAgICB9XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmKHR5cGVvZiB0aGlzLmh1ZVBpY2tlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMuaHVlUGlja2VyLnNldERyYWdnZXIoe3g6IDAsIHk6IE1hdGgucm91bmQodGhpcy5oc3ZhLmh1ZSAqIDEwMCAvIDM2MCl9KTtcbiAgICB9XG5cbiAgICBpZih0eXBlb2YgdGhpcy5hbHBoYVBpY2tlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5hbHBoYSkge1xuICAgICAgdGhpcy5hbHBoYVBpY2tlci5zZXREcmFnZ2VyKHt4OiAwLCB5OiAxMDAgLSAodGhpcy5oc3ZhLmFscGhhICogMTAwKX0pO1xuICAgIH1cblxuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JEaXJlY3RpdmUgfSBmcm9tICcuL25neC10dGl0YW4tY29sb3ItcGlja2VyLXNlbGVjdG9yLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOZ3hUVGl0YW5Db2xvclBpY2tlckRyYWdnZXJEaXJlY3RpdmUgfSBmcm9tICcuL25neC10dGl0YW4tY29sb3ItcGlja2VyLWRyYWdnZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQgeyBOZ3hUVGl0YW5Db2xvclBpY2tlcklucHV0RGlyZWN0aXZlIH0gZnJvbSAnLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1pbnB1dC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTmd4VFRpdGFuQ29sb3JQaWNrZXJQYWxldHRlTGlzdENvbXBvbmVudCB9IGZyb20gJy4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXItcGFsZXR0ZS1saXN0L25neC10dGl0YW4tY29sb3ItcGlja2VyLXBhbGV0dGUtbGlzdC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50LFxuICAgIE5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JEaXJlY3RpdmUsXG4gICAgTmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyRGlyZWN0aXZlLFxuICAgIE5neFRUaXRhbkNvbG9yUGlja2VySW5wdXREaXJlY3RpdmUsXG4gICAgTmd4VFRpdGFuQ29sb3JQaWNrZXJQYWxldHRlTGlzdENvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW05neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hUVGl0YW5Db2xvclBpY2tlck1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7SUFpQ0U7cUJBVHdCLEtBQUs7MEJBQ00sRUFBRTt1QkFDSixFQUFFO3FEQUUwQyxTQUFTLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQzttREFDbEMsU0FBUyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUM7UUFLdkcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDOzs7Ozs7OztLQVN4Qjs7Ozs7O0lBRUQsc0RBQWdCOzs7OztJQUFoQixVQUFpQixPQUFzQixFQUFFLGVBQThDO1FBQ3JGLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDNUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQ25DOzs7Ozs7SUFFRCwrQ0FBUzs7Ozs7SUFBVCxVQUFVLE9BQXNCLEVBQUUsZUFBOEM7UUFDOUUsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQ25DOzs7Ozs7SUFFRCxpREFBVzs7Ozs7SUFBWCxVQUFZLE9BQXNCLEVBQUUsZUFBOEM7UUFDaEYsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUM7UUFDckQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQztLQUNuQzs7Ozs7SUFFRCxpREFBVzs7OztJQUFYLFVBQVksZUFBOEM7UUFDeEQscUJBQUksT0FBTyxHQUFrQixJQUFJLENBQUMsVUFBVSxDQUMxQyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFDeEIsZUFBZSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQy9CLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUMxQixlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FDM0IsQ0FBQztRQUNGLHFCQUFJLFVBQVUsR0FBa0IsSUFBSSxDQUFDLFVBQVUsQ0FDN0MsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQ3hCLEdBQUcsRUFDSCxHQUFHLEVBQ0gsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQzNCLENBQUM7UUFFRixlQUFlLENBQUMsWUFBWSxHQUFHLE1BQU0sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUMvRixlQUFlLENBQUMsZUFBZSxHQUFHLE9BQU8sR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ2xJLGVBQWUsQ0FBQyxpQkFBaUIsR0FBRyxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN4SCxlQUFlLENBQUMscUJBQXFCLEdBQUcsT0FBTyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBRTNHLGVBQWUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUNoQyxlQUFlLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztLQUdyQzs7Ozs7O0lBRUQsaURBQVc7Ozs7O0lBQVgsVUFBWSxLQUFhLEVBQUUsZUFBOEM7UUFDdkUsUUFBUSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQztZQUNqQyxLQUFLLE1BQU07Z0JBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsZUFBZSxDQUFDLENBQUM7Z0JBQUMsTUFBTTtZQUNoRSxLQUFLLEtBQUs7Z0JBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsZUFBZSxDQUFDLENBQUM7Z0JBQUMsTUFBTTtZQUM5RCxLQUFLLE1BQU07Z0JBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsZUFBZSxDQUFDLENBQUM7Z0JBQUMsTUFBTTtZQUNoRSxLQUFLLEtBQUs7Z0JBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsZUFBZSxDQUFDLENBQUM7Z0JBQUMsTUFBTTtZQUM5RCxLQUFLLE1BQU07Z0JBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsZUFBZSxDQUFDLENBQUM7Z0JBQUMsTUFBTTtZQUMvRCxLQUFLLE1BQU07Z0JBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsZUFBZSxDQUFDLENBQUM7Z0JBQUMsTUFBTTtTQUNoRTtRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7S0FDbkM7Ozs7SUFFRCxtREFBYTs7O0lBQWI7UUFDRSxxQkFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLEtBQUkscUJBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzVCLFFBQVEsR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUN4RCxJQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBRSxFQUFFO2dCQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDL0IsT0FBTyxRQUFRLENBQUM7YUFDakI7U0FDRjtLQUVGOzs7OztJQUdELHFEQUFlOzs7O0lBQWYsVUFBZ0IsS0FBYTtRQUMzQixJQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDL0IsT0FBTyxNQUFNLENBQUM7U0FDZjthQUFNLElBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNyQyxPQUFPLEtBQUssQ0FBQztTQUNkO2FBQU0sSUFBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ3RDLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7YUFBTSxJQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDckMsT0FBTyxLQUFLLENBQUM7U0FDZDthQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxFQUFDO1lBQy9FLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7YUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUM7WUFDeEQsT0FBTyxNQUFNLENBQUM7U0FDZjthQUFNO1lBQ0wsT0FBTyxXQUFXLENBQUM7U0FDcEI7S0FDRjs7Ozs7O0lBR0QsMkRBQXFCOzs7OztJQUFyQixVQUFzQixPQUFzQixFQUFFLGVBQThDO1FBQzFGLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QyxlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0MsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN6Qzs7Ozs7O0lBR0Qsb0RBQWM7Ozs7O0lBQWQsVUFBZSxLQUFLLEVBQUUsZUFBOEM7UUFDbEUscUJBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdEQscUJBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUIsSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUNuQixJQUFJLENBQUMscUJBQXFCLENBQ3hCLElBQUksQ0FBQyxVQUFVLENBQ2IsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNqQixRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ2pCLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDakIsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNsQixFQUNELGVBQWUsQ0FDaEIsQ0FBQztTQUNIO0tBQ0Y7Ozs7OztJQUVELG1EQUFhOzs7OztJQUFiLFVBQWMsS0FBSyxFQUFFLGVBQThDO1FBQ2pFLHFCQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3JELHFCQUFJLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDbkIsSUFBSSxDQUFDLHFCQUFxQixDQUN4QixJQUFJLENBQUMsVUFBVSxDQUNiLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDakIsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNqQixRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ2pCLENBQUMsQ0FDRixFQUNELGVBQWUsQ0FDaEIsQ0FBQztTQUNIO0tBQ0Y7Ozs7OztJQUVELG9EQUFjOzs7OztJQUFkLFVBQWUsS0FBSyxFQUFFLGVBQThDO1FBQ2xFLHFCQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdkUscUJBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUIsSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUNuQixJQUFJLENBQUMscUJBQXFCLENBQ3hCLElBQUksQ0FBQyxVQUFVLENBQ2IsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNqQixRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ2pCLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDakIsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNsQixFQUNELGVBQWUsQ0FDaEIsQ0FBQztTQUNIO0tBQ0Y7Ozs7OztJQUVELG1EQUFhOzs7OztJQUFiLFVBQWMsS0FBSyxFQUFFLGVBQThDO1FBQ2pFLHFCQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdEUscUJBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUIsSUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUNuQixJQUFJLENBQUMscUJBQXFCLENBQ3hCLElBQUksQ0FBQyxVQUFVLENBQ2IsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNqQixRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ2pCLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDakIsQ0FBQyxDQUNGLEVBQ0QsZUFBZSxDQUNoQixDQUFDO1NBQ0g7S0FDRjs7Ozs7O0lBRUQsbURBQWE7Ozs7O0lBQWIsVUFBYyxLQUFLLEVBQUUsZUFBOEM7UUFDakUscUJBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxxQkFBcUIsQ0FDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFDbkIsZUFBZSxDQUNoQixDQUFDO0tBQ0g7Ozs7Ozs7O0lBSUQsZ0RBQVU7Ozs7Ozs7SUFBVixVQUFXLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDbkIscUJBQUksQ0FBQyxtQkFBRyxDQUFDLG1CQUFFLENBQUMsbUJBQUcsQ0FBQyxtQkFBRSxFQUFFLG1CQUFFLENBQUMsbUJBQUUsQ0FBQyxtQkFBRSxDQUFDLENBQUM7UUFFOUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3hCLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ1osQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFFWixFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFFeEIsQ0FBQyxHQUFHLENBQUMsR0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBRWQsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFaEIsQ0FBQyxHQUFHLENBQUMsSUFBRyxDQUFDLEdBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWpCLENBQUMsR0FBRyxDQUFDLElBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLENBQUMsSUFBRyxDQUFDLENBQUMsQ0FBQztRQUV0QixRQUFRLEVBQUU7WUFDUixLQUFLLENBQUM7Z0JBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQUMsTUFBTTtZQUNuQyxLQUFLLENBQUM7Z0JBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQUMsTUFBTTtZQUNuQyxLQUFLLENBQUM7Z0JBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQUMsTUFBTTtZQUNuQyxLQUFLLENBQUM7Z0JBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQUMsTUFBTTtZQUNuQyxLQUFLLENBQUM7Z0JBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQUMsTUFBTTtZQUNuQyxLQUFLLENBQUM7Z0JBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQUMsTUFBTTtTQUNwQztRQUVELE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUNyRTs7Ozs7Ozs7O0lBRUQsc0RBQWdCOzs7Ozs7OztJQUFoQixVQUFpQixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsU0FBMEI7UUFBMUIsMEJBQUEsRUFBQSxpQkFBMEI7UUFDckQscUJBQUksUUFBUSxHQUFrQixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRTFELElBQUcsU0FBUyxFQUFFO1lBQ1osT0FBTyxPQUFPLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7U0FDM0M7UUFFRCxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDZixPQUFPLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztLQUUxQzs7Ozs7Ozs7SUFFRCxnREFBVTs7Ozs7OztJQUFWLFVBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUNuQixDQUFDLElBQUksR0FBRyxDQUFDO1FBQ1QsQ0FBQyxJQUFJLEdBQUcsQ0FBQztRQUNULENBQUMsSUFBSSxHQUFHLENBQUM7UUFFVCxxQkFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxtQkFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JELHFCQUFJLENBQUMsbUJBQUUsQ0FBQyxtQkFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ2xCLHFCQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xCLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBRTNCLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRTtZQUNkLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDUDthQUFNO1lBQ0wsUUFBUSxHQUFHO2dCQUNULEtBQUssQ0FBQztvQkFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFBQyxNQUFNO2dCQUNqRCxLQUFLLENBQUM7b0JBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUFDLE1BQU07Z0JBQ25DLEtBQUssQ0FBQztvQkFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQUMsTUFBTTthQUNwQztZQUVELENBQUMsSUFBSSxDQUFDLENBQUM7U0FDUjtRQUdELE9BQU87WUFDTCxDQUFDLEdBQUcsR0FBRztZQUNQLENBQUMsR0FBRyxHQUFHO1lBQ1AsQ0FBQyxHQUFHLEdBQUc7WUFDUCxDQUFDO1NBQ0YsQ0FBQztLQUNIOzs7Ozs7OztJQUVELGdEQUFVOzs7Ozs7O0lBQVYsVUFBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ25CLENBQUMsSUFBSSxHQUFHLENBQUM7UUFDVCxDQUFDLElBQUksR0FBRyxDQUFDO1FBQ1QsT0FBTTtZQUNKLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxJQUFFLENBQUMsSUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUM7WUFDN0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLElBQUksR0FBRyxDQUFDO1lBQ3ZCLENBQUM7U0FDRixDQUFBO0tBQ0Y7Ozs7Ozs7O0lBRUQsZ0RBQVU7Ozs7Ozs7SUFBVixVQUFZLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDcEIsQ0FBQyxJQUFJLEdBQUcsQ0FBQztRQUNULENBQUMsSUFBSSxHQUFHLENBQUM7UUFDVCxDQUFDLElBQUUsQ0FBQyxHQUFDLEVBQUUsR0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztRQUNkLE9BQU07WUFDSixDQUFDO1lBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLElBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQztZQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsSUFBSSxHQUFHLENBQUM7WUFDdkIsQ0FBQztTQUNGLENBQUE7S0FDRjs7Ozs7SUFFRCwrQ0FBUzs7OztJQUFULFVBQVUsR0FBVztRQUVuQixxQkFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ25CLElBQUksR0FBRztnQkFDTCxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNqQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNqQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNqQyxDQUFDO2FBQ0YsQ0FBQztTQUNIO2FBQU0sSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUMxQixJQUFJLEdBQUc7Z0JBQ0wsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDdkQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDdkQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDdkQsQ0FBQzthQUNGLENBQUE7U0FDRjthQUFNLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDMUIsSUFBSSxHQUFHO2dCQUNMLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ2pDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ2pDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ2pDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2pFLENBQUE7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUU1RDs7Ozs7Ozs7O0lBRUQsK0NBQVM7Ozs7Ozs7O0lBQVQsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsU0FBeUI7UUFBekIsMEJBQUEsRUFBQSxnQkFBeUI7UUFDN0MscUJBQUksSUFBSSxHQUFrQixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXRELHFCQUFJLEVBQUUsSUFBWSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFFbEYsSUFBRyxTQUFTLEVBQUU7WUFDWixFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztTQUN0QztRQUNELE9BQU8sR0FBRztZQUNSLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDMUUsRUFBRSxDQUFDO0tBQ047Ozs7OztJQUdELHlEQUFtQjs7Ozs7SUFBbkIsVUFBb0IsS0FBYSxFQUFFLE1BQWM7UUFDL0MsUUFBUSxNQUFNO1lBQ1osS0FBSyxNQUFNLEVBQUUsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEQsS0FBSyxNQUFNLEVBQUUsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3hELEtBQUssS0FBSyxFQUFFLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xELEtBQUssTUFBTSxFQUFFLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztTQUcxRDtRQUNELE9BQU8sVUFBVSxDQUFDO0tBQ25COzs7Ozs7SUFFRCx1REFBaUI7Ozs7O0lBQWpCLFVBQWtCLEtBQWEsRUFBRSxLQUFzQjtRQUF0QixzQkFBQSxFQUFBLGFBQXNCO1FBQ3JELHFCQUFJLE1BQU0sR0FBRyxVQUFVLENBQUM7UUFDeEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLElBQUcsQ0FBQyxLQUFLLEVBQUU7WUFDVCxJQUFHLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUNyQixJQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRTtvQkFDOUIsT0FBTyxHQUFHLEdBQUcsS0FBSyxDQUFDO2lCQUNwQjthQUNGO1NBQ0Y7YUFBTTtZQUNMLElBQUcsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3JCLElBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFO29CQUM5QixPQUFPLEdBQUcsR0FBRyxLQUFLLENBQUM7aUJBQ3BCO2FBQ0Y7U0FDRjtRQUVELE9BQU8sTUFBTSxDQUFDO0tBQ2Y7Ozs7OztJQUVELHdEQUFrQjs7Ozs7SUFBbEIsVUFBbUIsS0FBYSxFQUFFLEtBQXNCO1FBQXRCLHNCQUFBLEVBQUEsYUFBc0I7UUFDdEQscUJBQUksTUFBTSxHQUFHLFVBQVUsQ0FBQztRQUN4QixLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDeEMscUJBQUksTUFBTSxHQUEyQixLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RELHFCQUFJLFFBQVEsR0FBb0IsRUFBRSxDQUFDO1FBRW5DLElBQUcsQ0FBQyxLQUFLLEVBQUU7WUFDVCxJQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO2dCQUNyQixNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFTLEdBQVcsSUFBRSxPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQSxFQUFDLENBQUMsQ0FBQztnQkFDakUsSUFDRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRztvQkFDbkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQ2xDLEVBQUU7b0JBQ0EsT0FBTyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7aUJBQ3hDO2FBQ0Y7U0FDRjthQUFNO1lBQ0wsSUFBRyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtnQkFDckIsUUFBUSxHQUFHLFVBQVUsbUJBQVMsTUFBTSxDQUFDLEdBQUcsRUFBRSxFQUFDLENBQUM7Z0JBQzVDLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVMsR0FBVyxJQUFFLE9BQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFBLEVBQUMsQ0FBQyxDQUFDO2dCQUNqRSxJQUNFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHO29CQUNuQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQztvQkFDakMsUUFBUSxJQUFJLENBQUMsSUFBSSxRQUFRLElBQUksQ0FDL0IsRUFBRTtvQkFDQSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUN0QixPQUFPLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztpQkFDekM7YUFDRjtTQUNGO1FBRUQsT0FBTyxNQUFNLENBQUM7S0FDZjs7Ozs7O0lBRUQsd0RBQWtCOzs7OztJQUFsQixVQUFtQixJQUFVLEVBQUUsTUFBYztRQUMzQyxRQUFRLE1BQU07WUFDWixLQUFLLE1BQU0sRUFBRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3BGLEtBQUssTUFBTSxFQUFFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzVGLEtBQUssS0FBSyxFQUFFLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ25GLEtBQUssTUFBTSxFQUFFLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDcEc7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ3hFOzs7Ozs7O0lBRUQsMERBQW9COzs7Ozs7SUFBcEIsVUFBcUIsWUFBZ0MsRUFBRSxhQUFrQyxFQUFFLGVBQThDO1FBQXBILDZCQUFBLEVBQUEsaUJBQWdDO1FBQUUsOEJBQUEsRUFBQSxrQkFBa0M7UUFDdkYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxPQUFPO1lBQzNCLElBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQzFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzdDO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFDLE9BQU87WUFDNUIsZUFBZSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDN0MsQ0FBQyxDQUFBO0tBRUg7Ozs7SUFFRCxxREFBZTs7O0lBQWY7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUNoQixFQUFFLEVBQUUsU0FBUztZQUNiLElBQUksRUFBRSxTQUFTO1lBQ2YsTUFBTSxFQUFFO2dCQUNOLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQzFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQzFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQzFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO2dCQUNyRCxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUztnQkFDckQsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQ3JELFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO2dCQUNyRCxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUztnQkFDckQsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQ3JELFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO2dCQUNyRCxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUzthQUN0RDtTQUNGLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ2hCLEVBQUUsRUFBRSxVQUFVO1lBQ2QsSUFBSSxFQUFFLFVBQVU7WUFDaEIsTUFBTSxFQUFFO2dCQUNOLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO2dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUztnQkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO2dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUztnQkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO2dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUztnQkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO2dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUztnQkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO2dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVB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