import { Injectable, Directive, ElementRef, Input, ContentChild, EventEmitter, HostListener, Output, Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, NgModule } from '@angular/core';
import { fromEvent } from 'rxjs';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxTTitanColorPickerService = /** @class */ (function () {
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
        this.globalMouseMove = fromEvent(window, 'mousemove').subscribe(function (event) {
            if (_this.dragStart) {
                _this.getPosition(/** @type {?} */ (event));
            }
        });
        this.globalMouseUp = fromEvent(window, 'mouseup').subscribe(function (event) {
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
        { type: Component, args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'lib-ngx-ttitan-color-picker',
                    template: "<div\n  class=\"ngx-ttitan-color-picker-wrapper\"\n>\n\n  <div class=\"picker-input-wrapper\">\n    <div\n      [ngStyle]=\"{backgroundColor: color}\"\n      class=\"debug-output\"\n      *ngIf=\"colorPickerService.debug\"\n    >\n      {{color}}\n    </div>\n    <div class=\"picker-input-label\">\n      <label [for]=\"uuid\" >{{title}}</label>\n    </div>\n    <div class=\"picker-input-holder\">\n      <div class=\"picker-color\" [ngStyle]=\"{background: currentColorAlpha}\">\n\n      </div>\n      <div class=\"picker-input\">\n        <input\n          libNgxTTitanColorPickerInput\n          #pickerInput=\"libNgxTTitanColorPickerInput\"\n          (inputChange)=\"inputColorChange($event)\"\n          [format]=\"inputFormat\"\n          [id]=\"uuid\"\n          type=\"text\"\n          (focus)=\"openPicker()\"\n        />\n      </div>\n      <!--<div class=\"picker-save-sign\">-->\n      <!--S-->\n      <!--</div>-->\n    </div>\n\n  </div>\n  <div class=\"ngx-ttitan-color-picker\" [ngClass]=\"{'no-alpha': !alpha, 'open': pickerOpen}\">\n    <div class=\"ngx-ttitan-color-picker__MainColor\">\n      <div class=\"ngx-ttitan-color-picker__ColorLayer\" [ngStyle]=\"{backgroundColor: currentColorMax}\" ></div>\n      <div class=\"ngx-ttitan-color-picker__Slidable\" libNgxTTitanColorPickerSelector #mainColor=\"libNgxTTitanColorPickerSelector\" (change)=\"colorPickerService.saturationChange($event, this)\">\n        <div class=\"ngx-ttitan-color-picker__Dragger\" libNgxTTitanColorPickerDragger style=\"transform: translate3d(0px, 0px, 0px);\"></div>\n      </div>\n    </div>\n    <div class=\"ngx-ttitan-color-picker__HuePicker\">\n      <div class=\"ngx-ttitan-color-picker__Slidable\"  libNgxTTitanColorPickerSelector #huePicker=\"libNgxTTitanColorPickerSelector\" (change)=\"colorPickerService.hueChange($event, this)\" [direction]=\"'vertical'\">\n        <div class=\"ngx-ttitan-color-picker__Dragger\" libNgxTTitanColorPickerDragger [pickerPad]=\"0\" style=\" transform: translate3d(0px, 0px, 0px);\"></div>\n      </div>\n    </div>\n    <div class=\"ngx-ttitan-color-picker__AlphaPicker\" *ngIf=\"alpha === true\">\n      <div class=\"ngx-ttitan-color-picker__ColorLayer\"\n\n           [ngStyle]=\"{background: 'linear-gradient(to top, ' + currentColorAlphaZero + '  18px, ' + currentColor + ' calc(100% - 18px)'}\"\n      ></div>\n      <div class=\"ngx-ttitan-color-picker__Slidable\"  libNgxTTitanColorPickerSelector #alphaPicker=\"libNgxTTitanColorPickerSelector\" (change)=\"colorPickerService.alphaChange($event, this)\" [direction]=\"'vertical'\">\n        <div class=\"ngx-ttitan-color-picker__Dragger\" libNgxTTitanColorPickerDragger [pickerPad]=\"0\" style=\" transform: translate3d(0px, 0px, 0px);\"></div>\n      </div>\n    </div>\n    <!--<div style=\"height: 40px; width: 40px\" [ngStyle]=\"{background: currentColor}\">-->\n\n    <!--</div>-->\n    <!--<div style=\"height: 40px; width: 40px\" [ngStyle]=\"{background: currentColorAlpha}\">-->\n\n    <!--</div>-->\n  </div>\n  <lib-ngx-ttitan-color-picker-palette-list\n    (change)=\"inputColorChange($event)\"\n    [pallets]=\"pickerPallets\"\n  >\n\n  </lib-ngx-ttitan-color-picker-palette-list>\n</div>\n\n",
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

export { NgxTTitanColorPickerService, NgxTTitanColorPickerComponent, NgxTTitanColorPickerModule, NgxTTitanColorPickerDraggerDirective as ɵc, NgxTTitanColorPickerInputDirective as ɵd, NgxTTitanColorPickerPaletteListComponent as ɵa, NgxTTitanColorPickerSelectorDirective as ɵb };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXR0aXRhbi1jb2xvci1waWNrZXIuanMubWFwIiwic291cmNlcyI6WyJuZzovL25neC10dGl0YW4tY29sb3ItcGlja2VyL2xpYi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci9saWIvbmd4LXR0aXRhbi1jb2xvci1waWNrZXItZHJhZ2dlci5kaXJlY3RpdmUudHMiLCJuZzovL25neC10dGl0YW4tY29sb3ItcGlja2VyL2xpYi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1zZWxlY3Rvci5kaXJlY3RpdmUudHMiLCJuZzovL25neC10dGl0YW4tY29sb3ItcGlja2VyL2xpYi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1pbnB1dC5kaXJlY3RpdmUudHMiLCJuZzovL25neC10dGl0YW4tY29sb3ItcGlja2VyL2xpYi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1wYWxldHRlLWxpc3Qvbmd4LXR0aXRhbi1jb2xvci1waWNrZXItcGFsZXR0ZS1saXN0LmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIvbGliL25neC10dGl0YW4tY29sb3ItcGlja2VyLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIvbGliL25neC10dGl0YW4tY29sb3ItcGlja2VyLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0N1c3RvbVBlcmNlbnR9IGZyb20gXCIuL25neC10dGl0YW4tY29sb3ItcGlja2VyLXNlbGVjdG9yLmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHtOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudH0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuY29tcG9uZW50XCI7XG5pbXBvcnQge2Zyb21FdmVudCwgT2JzZXJ2YWJsZX0gZnJvbSBcInJ4anMvaW5kZXhcIjtcbmltcG9ydCB7d2luZG93fSBmcm9tIFwicnhqcy9pbnRlcm5hbC9vcGVyYXRvcnNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBIU1ZBIHtcbiAgaHVlOiBudW1iZXIsXG4gIHNhdHVyYXRpb246IG51bWJlcixcbiAgdmFsdWU6IG51bWJlcixcbiAgYWxwaGE6IG51bWJlcixcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYWxldHRlIHtcbiAgbmFtZTogc3RyaW5nLFxuICBpZDogc3RyaW5nLFxuICBjb2xvcnM6IEFycmF5PHN0cmluZz5cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5neFRUaXRhbkNvbG9yUGlja2VyU2VydmljZSB7XG5cbiAgcHVibGljIGRlYnVnOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBwaWNrZXJMaXN0OiBBcnJheTxzdHJpbmc+ID0gW107XG4gIHB1YmxpYyBwYWxsZXRzOiBBcnJheTxQYWxldHRlPiA9IFtdO1xuXG4gIC8vIHB1YmxpYyBtb3VzZU1vdmVPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPE1vdXNlRXZlbnQ+ID0gPE9ic2VydmFibGU8TW91c2VFdmVudD4+ZnJvbUV2ZW50KGRvY3VtZW50LCAnbW91c2Vtb3ZlJyk7XG4gIC8vIHB1YmxpYyBtb3VzZVVwT2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxNb3VzZUV2ZW50PiA9IDxPYnNlcnZhYmxlPE1vdXNlRXZlbnQ+PmZyb21FdmVudChkb2N1bWVudCwgJ21vdXNldXAnKTtcbiAgLy8gcHVibGljIG1vdXNlTW92ZU9ic2VydmFibGU6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLy8gcHVibGljIG1vdXNlVXBPYnNlcnZhYmxlOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5maWxsQmFzZVBhbGxldHMoKTtcbiAgICAvL1xuICAgIC8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsICgkZXZlbnQpID0+IHtcbiAgICAvLyAgIHRoaXMubW91c2VNb3ZlT2JzZXJ2YWJsZS5lbWl0KDxNb3VzZUV2ZW50PiRldmVudCk7XG4gICAgLy8gfSk7XG4gICAgLy8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgkZXZlbnQpID0+IHtcbiAgICAvLyAgIHRoaXMubW91c2VVcE9ic2VydmFibGUuZW1pdCg8TW91c2VFdmVudD4kZXZlbnQpO1xuICAgIC8vIH0pO1xuXG4gIH1cblxuICBzYXR1cmF0aW9uQ2hhbmdlKHBlcmNlbnQ6IEN1c3RvbVBlcmNlbnQsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQgKSB7XG4gICAgcGlja2VyQ29tcG9uZW50LmhzdmEuc2F0dXJhdGlvbiA9IHBlcmNlbnQueDtcbiAgICBwaWNrZXJDb21wb25lbnQuaHN2YS52YWx1ZSA9ICgxMDAgLSBwZXJjZW50LnkpO1xuICAgIHRoaXMuZGF0YVRvQ29sb3IocGlja2VyQ29tcG9uZW50KTtcbiAgfVxuXG4gIGh1ZUNoYW5nZShwZXJjZW50OiBDdXN0b21QZXJjZW50LCBwaWNrZXJDb21wb25lbnQ6IE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50KSB7XG4gICAgcGlja2VyQ29tcG9uZW50LmhzdmEuaHVlID0gTWF0aC5yb3VuZCgzNjAgKiBwZXJjZW50LnkgLyAxMDApO1xuICAgIHRoaXMuZGF0YVRvQ29sb3IocGlja2VyQ29tcG9uZW50KTtcbiAgfVxuXG4gIGFscGhhQ2hhbmdlKHBlcmNlbnQ6IEN1c3RvbVBlcmNlbnQsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBwaWNrZXJDb21wb25lbnQuaHN2YS5hbHBoYSA9ICgxMDAgLSBwZXJjZW50LnkpIC8gMTAwO1xuICAgIHRoaXMuZGF0YVRvQ29sb3IocGlja2VyQ29tcG9uZW50KTtcbiAgfVxuXG4gIGRhdGFUb0NvbG9yKHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBsZXQgcmdiYUFycjogQXJyYXk8bnVtYmVyPiA9IHRoaXMuaHN2YVRvUmdiYShcbiAgICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLmh1ZSxcbiAgICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLnNhdHVyYXRpb24sXG4gICAgICBwaWNrZXJDb21wb25lbnQuaHN2YS52YWx1ZSxcbiAgICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLmFscGhhXG4gICAgKTtcbiAgICBsZXQgcmdiYU1heEFycjogQXJyYXk8bnVtYmVyPiA9IHRoaXMuaHN2YVRvUmdiYShcbiAgICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLmh1ZSxcbiAgICAgIDEwMCxcbiAgICAgIDEwMCxcbiAgICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLmFscGhhXG4gICAgKTtcblxuICAgIHBpY2tlckNvbXBvbmVudC5jdXJyZW50Q29sb3IgPSAncmdiKCcgKyByZ2JhQXJyWzBdICsgJywnICsgcmdiYUFyclsxXSArICcsJyArIHJnYmFBcnJbMl0gKyAnKSc7XG4gICAgcGlja2VyQ29tcG9uZW50LmN1cnJlbnRDb2xvck1heCA9ICdyZ2JhKCcgKyByZ2JhTWF4QXJyWzBdICsgJywnICsgcmdiYU1heEFyclsxXSArICcsJyArIHJnYmFNYXhBcnJbMl0gKyAnLCcgKyByZ2JhTWF4QXJyWzNdICsgJyknO1xuICAgIHBpY2tlckNvbXBvbmVudC5jdXJyZW50Q29sb3JBbHBoYSA9ICdyZ2JhKCcgKyByZ2JhQXJyWzBdICsgJywnICsgcmdiYUFyclsxXSArICcsJyArIHJnYmFBcnJbMl0gKyAnLCcgKyByZ2JhQXJyWzNdICsgJyknO1xuICAgIHBpY2tlckNvbXBvbmVudC5jdXJyZW50Q29sb3JBbHBoYVplcm8gPSAncmdiYSgnICsgcmdiYUFyclswXSArICcsJyArIHJnYmFBcnJbMV0gKyAnLCcgKyByZ2JhQXJyWzJdICsgJywwKSc7XG5cbiAgICBwaWNrZXJDb21wb25lbnQuc2V0SW5wdXRWYWx1ZSgpO1xuICAgIHBpY2tlckNvbXBvbmVudC51cGRhdGVSZXR1cm5Db2xvcigpO1xuXG5cbiAgfVxuXG4gIGNvbG9yVG9EYXRhKGNvbG9yOiBzdHJpbmcsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBzd2l0Y2ggKHRoaXMuZGV0ZWN0Q29sb3JUeXBlKGNvbG9yKSkge1xuICAgICAgY2FzZSBcInJnYmFcIjogdGhpcy5wYXJzZVJnYmFDb2xvcihjb2xvciwgcGlja2VyQ29tcG9uZW50KTsgYnJlYWs7XG4gICAgICBjYXNlIFwicmdiXCI6IHRoaXMucGFyc2VSZ2JDb2xvcihjb2xvciwgcGlja2VyQ29tcG9uZW50KTsgYnJlYWs7XG4gICAgICBjYXNlIFwiaHNsYVwiOiB0aGlzLnBhcnNlSHNsYUNvbG9yKGNvbG9yLCBwaWNrZXJDb21wb25lbnQpOyBicmVhaztcbiAgICAgIGNhc2UgXCJoc2xcIjogdGhpcy5wYXJzZUhzbENvbG9yKGNvbG9yLCBwaWNrZXJDb21wb25lbnQpOyBicmVhaztcbiAgICAgIGNhc2UgXCJoZXg2XCI6IHRoaXMucGFyc2VIZXhDb2xvcihjb2xvciwgcGlja2VyQ29tcG9uZW50KTsgYnJlYWs7XG4gICAgICBjYXNlIFwiaGV4OFwiOiB0aGlzLnBhcnNlSGV4Q29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudCk7IGJyZWFrO1xuICAgIH1cbiAgICB0aGlzLmRhdGFUb0NvbG9yKHBpY2tlckNvbXBvbmVudCk7XG4gIH1cblxuICBnZXRQaWNrZXJVdWlkKCkge1xuICAgIGxldCBwaWNrZXJJZCA9ICcnO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCAxMDAwOyBpKyspIHtcbiAgICAgIHBpY2tlcklkID0gJ3BpY2tlci0nICsgdGhpcy5waWNrZXJMaXN0Lmxlbmd0aCArICctJyArIGk7XG4gICAgICBpZih0aGlzLnBpY2tlckxpc3QuaW5kZXhPZihwaWNrZXJJZCkgPT09IC0xICkge1xuICAgICAgICB0aGlzLnBpY2tlckxpc3QucHVzaChwaWNrZXJJZCk7XG4gICAgICAgIHJldHVybiBwaWNrZXJJZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG5cbiAgZGV0ZWN0Q29sb3JUeXBlKGNvbG9yOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmKGNvbG9yLmluZGV4T2YoJ3JnYmEnKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiAncmdiYSc7XG4gICAgfSBlbHNlIGlmKGNvbG9yLmluZGV4T2YoJ3JnYicpICE9PSAtMSkge1xuICAgICAgcmV0dXJuICdyZ2InO1xuICAgIH0gZWxzZSBpZihjb2xvci5pbmRleE9mKCdoc2xhJykgIT09IC0xKSB7XG4gICAgICByZXR1cm4gJ2hzbGEnO1xuICAgIH0gZWxzZSBpZihjb2xvci5pbmRleE9mKCdoc2wnKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiAnaHNsJztcbiAgICB9IGVsc2UgaWYgKGNvbG9yLmluZGV4T2YoJyMnKSAhPT0gLTEgJiYgKGNvbG9yLmxlbmd0aCA9PSA0IHx8IGNvbG9yLmxlbmd0aCA9PSA3KSl7XG4gICAgICByZXR1cm4gJ2hleDYnO1xuICAgIH0gZWxzZSBpZiAoY29sb3IuaW5kZXhPZignIycpICE9PSAtMSAmJiBjb2xvci5sZW5ndGggPT0gOSl7XG4gICAgICByZXR1cm4gJ2hleDgnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJ3VuZGVmaW5lZCc7XG4gICAgfVxuICB9XG5cblxuICBmaWxsVmFsdWVzRnJvbUhzdmFBcnIoaHN2YUFycjogQXJyYXk8bnVtYmVyPiwgcGlja2VyQ29tcG9uZW50OiBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCkge1xuICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLmh1ZSA9IGhzdmFBcnJbMF07XG4gICAgcGlja2VyQ29tcG9uZW50LmhzdmEuc2F0dXJhdGlvbiA9IGhzdmFBcnJbMV07XG4gICAgcGlja2VyQ29tcG9uZW50LmhzdmEudmFsdWUgPSBoc3ZhQXJyWzJdO1xuICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLmFscGhhID0gaHN2YUFyclszXTtcbiAgfVxuXG5cbiAgcGFyc2VSZ2JhQ29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBsZXQgYXVzID0gY29sb3IucmVwbGFjZSgncmdiYSgnLCAnJykucmVwbGFjZSgnKScsICcnKTtcbiAgICBsZXQgYXVzMiA9IGF1cy5zcGxpdCgnLCcpO1xuICAgIGlmKGF1czIubGVuZ3RoID09IDQpIHtcbiAgICAgIHRoaXMuZmlsbFZhbHVlc0Zyb21Ic3ZhQXJyKFxuICAgICAgICB0aGlzLnJnYmFUb0hzdmEoXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlswXSksXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlsxXSksXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlsyXSksXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlszXSksXG4gICAgICAgICksXG4gICAgICAgIHBpY2tlckNvbXBvbmVudFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwYXJzZVJnYkNvbG9yKGNvbG9yLCBwaWNrZXJDb21wb25lbnQ6IE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50KSB7XG4gICAgbGV0IGF1cyA9IGNvbG9yLnJlcGxhY2UoJ3JnYignLCAnJykucmVwbGFjZSgnKScsICcnKTtcbiAgICBsZXQgYXVzMiA9IGF1cy5zcGxpdCgnLCcpO1xuICAgIGlmKGF1czIubGVuZ3RoID09IDMpIHtcbiAgICAgIHRoaXMuZmlsbFZhbHVlc0Zyb21Ic3ZhQXJyKFxuICAgICAgICB0aGlzLnJnYmFUb0hzdmEoXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlswXSksXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlsxXSksXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlsyXSksXG4gICAgICAgICAgMVxuICAgICAgICApLFxuICAgICAgICBwaWNrZXJDb21wb25lbnRcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcGFyc2VIc2xhQ29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBsZXQgYXVzID0gY29sb3IucmVwbGFjZSgnaHNsYSgnLCAnJykucmVwbGFjZSgnKScsICcnKS5yZXBsYWNlKCclJywgJycpO1xuICAgIGxldCBhdXMyID0gYXVzLnNwbGl0KCcsJyk7XG4gICAgaWYoYXVzMi5sZW5ndGggPT0gNCkge1xuICAgICAgdGhpcy5maWxsVmFsdWVzRnJvbUhzdmFBcnIoXG4gICAgICAgIHRoaXMuaHNsYVRvSHN2YShcbiAgICAgICAgICBwYXJzZUludChhdXMyWzBdKSxcbiAgICAgICAgICBwYXJzZUludChhdXMyWzFdKSxcbiAgICAgICAgICBwYXJzZUludChhdXMyWzJdKSxcbiAgICAgICAgICBwYXJzZUludChhdXMyWzNdKSxcbiAgICAgICAgKSxcbiAgICAgICAgcGlja2VyQ29tcG9uZW50XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHBhcnNlSHNsQ29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBsZXQgYXVzID0gY29sb3IucmVwbGFjZSgnaHNsKCcsICcnKS5yZXBsYWNlKCcpJywgJycpLnJlcGxhY2UoJyUnLCAnJyk7XG4gICAgbGV0IGF1czIgPSBhdXMuc3BsaXQoJywnKTtcbiAgICBpZihhdXMyLmxlbmd0aCA9PSAzKSB7XG4gICAgICB0aGlzLmZpbGxWYWx1ZXNGcm9tSHN2YUFycihcbiAgICAgICAgdGhpcy5oc2xhVG9Ic3ZhKFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbMF0pLFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbMV0pLFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbMl0pLFxuICAgICAgICAgIDFcbiAgICAgICAgKSxcbiAgICAgICAgcGlja2VyQ29tcG9uZW50XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHBhcnNlSGV4Q29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBsZXQgYXVzID0gY29sb3IucmVwbGFjZSgnIycsICcnKTtcbiAgICB0aGlzLmZpbGxWYWx1ZXNGcm9tSHN2YUFycihcbiAgICAgIHRoaXMuaGV4VG9Ic3ZhKGF1cyksXG4gICAgICBwaWNrZXJDb21wb25lbnRcbiAgICApO1xuICB9XG5cblxuXG4gIGhzdmFUb1JnYmEoSCwgUywgViwgQSk6IEFycmF5PG51bWJlcj4ge1xuICAgIGxldCBmICwgcCwgcSAsIHQsIGxILCBSLCBHLCBCO1xuXG4gICAgSCA9IChIIDwgMzYwKSA/IEggOiAzNTk7XG4gICAgUyA9IFMgLyAxMDA7XG4gICAgViA9IFYgLyAxMDA7XG5cbiAgICBsSCA9IE1hdGguZmxvb3IoSCAvIDYwKTtcblxuICAgIGYgPSBILzYwIC0gbEg7XG5cbiAgICBwID0gViAqICgxIC0gUyk7XG5cbiAgICBxID0gViAqKDEgLSBTKmYpO1xuXG4gICAgdCA9IFYqICgxIC0gKDEtZikqIFMpO1xuXG4gICAgc3dpdGNoIChsSCl7XG4gICAgICBjYXNlIDA6IFIgPSBWOyBHID0gdDsgQiA9IHA7IGJyZWFrO1xuICAgICAgY2FzZSAxOiBSID0gcTsgRyA9IFY7IEIgPSBwOyBicmVhaztcbiAgICAgIGNhc2UgMjogUiA9IHA7IEcgPSBWOyBCID0gdDsgYnJlYWs7XG4gICAgICBjYXNlIDM6IFIgPSBwOyBHID0gcTsgQiA9IFY7IGJyZWFrO1xuICAgICAgY2FzZSA0OiBSID0gdDsgRyA9IHA7IEIgPSBWOyBicmVhaztcbiAgICAgIGNhc2UgNTogUiA9IFY7IEcgPSBwOyBCID0gcTsgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtNYXRoLnJvdW5kKFIqMjU1KSwgTWF0aC5yb3VuZChHKjI1NSksIE1hdGgucm91bmQoQioyNTUpLCBBXTtcbiAgfVxuXG4gIGhzdmFUb1JnYmFTdHJpbmcoSCwgUywgViwgQSwgc2hvd0FscGhhOiBib29sZWFuID0gZmFsc2UpOiBzdHJpbmcge1xuICAgIGxldCBjb2xvckFycjogQXJyYXk8bnVtYmVyPiA9IHRoaXMuaHN2YVRvUmdiYShILCBTLCBWLCBBKTtcblxuICAgIGlmKHNob3dBbHBoYSkge1xuICAgICAgcmV0dXJuICdyZ2JhKCcgKyBjb2xvckFyci5qb2luKCcsJykgKyAnKSc7XG4gICAgfVxuXG4gICAgY29sb3JBcnIucG9wKCk7XG4gICAgcmV0dXJuICdyZ2IoJyArIGNvbG9yQXJyLmpvaW4oJywnKSArICcpJztcblxuICB9XG5cbiAgcmdiYVRvSHN2YShyLCBnLCBiLCBhKTogQXJyYXk8bnVtYmVyPiB7XG4gICAgciAvPSAyNTU7XG4gICAgZyAvPSAyNTU7XG4gICAgYiAvPSAyNTU7XG5cbiAgICBsZXQgbWF4ID0gTWF0aC5tYXgociwgZywgYiksIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xuICAgIGxldCBoLCBzLCB2ID0gbWF4O1xuICAgIGxldCBkID0gbWF4IC0gbWluO1xuICAgIHMgPSBtYXggPT0gMCA/IDAgOiBkIC8gbWF4O1xuXG4gICAgaWYgKG1heCA9PSBtaW4pIHtcbiAgICAgIGggPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2ggKG1heCkge1xuICAgICAgICBjYXNlIHI6IGggPSAoZyAtIGIpIC8gZCArIChnIDwgYiA/IDYgOiAwKTsgYnJlYWs7XG4gICAgICAgIGNhc2UgZzogaCA9IChiIC0gcikgLyBkICsgMjsgYnJlYWs7XG4gICAgICAgIGNhc2UgYjogaCA9IChyIC0gZykgLyBkICsgNDsgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGggLz0gNjtcbiAgICB9XG5cblxuICAgIHJldHVybiBbXG4gICAgICBoICogMzYwLFxuICAgICAgcyAqIDEwMCxcbiAgICAgIHYgKiAxMDAsXG4gICAgICBhXG4gICAgXTtcbiAgfVxuXG4gIGhzdmFUb0hzbGEoaCwgcywgdiwgYSk6IEFycmF5PG51bWJlcj57XG4gICAgcyAvPSAxMDA7XG4gICAgdiAvPSAxMDA7XG4gICAgcmV0dXJuW1xuICAgICAgTWF0aC5yb3VuZChoKSxcbiAgICAgIE1hdGgucm91bmQoKHMqdi8oKGg9KDItcykqdik8MT9oOjItaCkpICogMTAwKSxcbiAgICAgIE1hdGgucm91bmQoKGgvMikgKiAxMDApLFxuICAgICAgYVxuICAgIF1cbiAgfVxuXG4gIGhzbGFUb0hzdmEgKGgsIHMsIGwsIGEpOiBBcnJheTxudW1iZXI+e1xuICAgIHMgLz0gMTAwO1xuICAgIGwgLz0gMTAwO1xuICAgIHMqPWw8LjU/bDoxLWw7XG4gICAgcmV0dXJuW1xuICAgICAgaCxcbiAgICAgIE1hdGgucm91bmQoKDIqcy8obCtzKSkgKiAxMDApLFxuICAgICAgTWF0aC5yb3VuZCgobCtzKSAqIDEwMCksXG4gICAgICBhXG4gICAgXVxuICB9XG5cbiAgaGV4VG9Ic3ZhKGhleDogc3RyaW5nKTogQXJyYXk8bnVtYmVyPiB7XG5cbiAgICBsZXQgcmdiYSA9IFswLDAsMCwxXTtcbiAgICBpZiAoaGV4Lmxlbmd0aCA9PSA2KSB7XG4gICAgICByZ2JhID0gW1xuICAgICAgICBwYXJzZUludChoZXguc3Vic3RyaW5nKDAsIDIpLCAxNiksXG4gICAgICAgIHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMiwgNCksIDE2KSxcbiAgICAgICAgcGFyc2VJbnQoaGV4LnN1YnN0cmluZyg0LCA2KSwgMTYpLFxuICAgICAgICAxXG4gICAgICBdO1xuICAgIH0gZWxzZSBpZiAoaGV4Lmxlbmd0aCA9PSAzKSB7XG4gICAgICByZ2JhID0gW1xuICAgICAgICBwYXJzZUludChoZXguc3Vic3RyaW5nKDAsIDEpICsgaGV4LnN1YnN0cmluZygwLCAxKSwgMTYpLFxuICAgICAgICBwYXJzZUludChoZXguc3Vic3RyaW5nKDEsIDIpICsgaGV4LnN1YnN0cmluZygxLCAyKSwgMTYpLFxuICAgICAgICBwYXJzZUludChoZXguc3Vic3RyaW5nKDIsIDMpICsgaGV4LnN1YnN0cmluZygyLCAzKSwgMTYpLFxuICAgICAgICAxXG4gICAgICBdXG4gICAgfSBlbHNlIGlmIChoZXgubGVuZ3RoID09IDgpIHtcbiAgICAgIHJnYmEgPSBbXG4gICAgICAgIHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMCwgMiksIDE2KSxcbiAgICAgICAgcGFyc2VJbnQoaGV4LnN1YnN0cmluZygyLCA0KSwgMTYpLFxuICAgICAgICBwYXJzZUludChoZXguc3Vic3RyaW5nKDQsIDYpLCAxNiksXG4gICAgICAgIHBhcnNlRmxvYXQoKHBhcnNlSW50KGhleC5zdWJzdHJpbmcoNiwgOCksIDE2KSAvIDI1NSkudG9GaXhlZCgyKSlcbiAgICAgIF1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmdiYVRvSHN2YShyZ2JhWzBdLCByZ2JhWzFdLCByZ2JhWzJdLCByZ2JhWzNdKTtcblxuICB9XG5cbiAgaHN2YVRvSGV4KEgsIFMsIFYsIEEsIHNob3dBbHBoYTogYm9vbGVhbiA9IHRydWUpOiBzdHJpbmcge1xuICAgIGxldCByZ2JhOiBBcnJheTxudW1iZXI+ID0gdGhpcy5oc3ZhVG9SZ2JhKEgsIFMsIFYsIEEpO1xuXG4gICAgbGV0IGhBOiBzdHJpbmcgPSAoKHNob3dBbHBoYSkgPyAocmdiYVszXSAqIDI1NSkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygwLDIpIDogJycpO1xuXG4gICAgaWYoc2hvd0FscGhhKSB7XG4gICAgICBoQSA9IChoQS5sZW5ndGggPT0gMSkgPyBoQSArIGhBIDogaEE7XG4gICAgfVxuICAgIHJldHVybiAnIycgK1xuICAgICAgKChyZ2JhWzJdIHwgcmdiYVsxXSA8PCA4IHwgcmdiYVswXSA8PCAxNikgfCAxIDw8IDI0KS50b1N0cmluZygxNikuc2xpY2UoMSkgK1xuICAgICAgaEE7XG4gIH1cblxuXG4gIHZhbGlkYXRlQ29sb3JGb3JtYXQodmFsdWU6IHN0cmluZywgZm9ybWF0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHN3aXRjaCAoZm9ybWF0KSB7XG4gICAgICBjYXNlIFwiaGV4NlwiOiByZXR1cm4gdGhpcy52YWxpZGF0ZUhleEZvcm1hdCh2YWx1ZSk7XG4gICAgICBjYXNlIFwiaGV4OFwiOiByZXR1cm4gdGhpcy52YWxpZGF0ZUhleEZvcm1hdCh2YWx1ZSwgdHJ1ZSk7XG4gICAgICBjYXNlIFwicmdiXCI6IHJldHVybiB0aGlzLnZhbGlkYXRlUmdiYUZvcm1hdCh2YWx1ZSk7XG4gICAgICBjYXNlIFwicmdiYVwiOiByZXR1cm4gdGhpcy52YWxpZGF0ZVJnYmFGb3JtYXQodmFsdWUsIHRydWUpO1xuICAgICAgLy8gY2FzZSBcImhzbFwiOiByZXR1cm4gdGhpcy52YWxpZGF0ZUhleEZvcm1hdCh2YWx1ZSk7XG4gICAgICAvLyBjYXNlIFwiaHNsYVwiOiByZXR1cm4gdGhpcy52YWxpZGF0ZUhleEZvcm1hdCh2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiAnbm90VmFsaWQnO1xuICB9XG5cbiAgdmFsaWRhdGVIZXhGb3JtYXQodmFsdWU6IHN0cmluZywgYWxwaGE6IGJvb2xlYW4gPSBmYWxzZSk6IHN0cmluZyB7XG4gICAgbGV0IHJlc3VsdCA9ICdub3RWYWxpZCc7XG4gICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKCcjJywgJycpO1xuICAgIGlmKCFhbHBoYSkge1xuICAgICAgaWYodmFsdWUubGVuZ3RoID09PSA2KSB7XG4gICAgICAgIGlmKCFpc05hTihwYXJzZUludCh2YWx1ZSwgMTYpKSkge1xuICAgICAgICAgIHJldHVybiAnIycgKyB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZih2YWx1ZS5sZW5ndGggPT09IDgpIHtcbiAgICAgICAgaWYoIWlzTmFOKHBhcnNlSW50KHZhbHVlLCAxNikpKSB7XG4gICAgICAgICAgcmV0dXJuICcjJyArIHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHZhbGlkYXRlUmdiYUZvcm1hdCh2YWx1ZTogc3RyaW5nLCBhbHBoYTogYm9vbGVhbiA9IGZhbHNlKTogc3RyaW5nIHtcbiAgICBsZXQgcmVzdWx0ID0gJ25vdFZhbGlkJztcbiAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1teMC05XFwsXSsvZywgXCJcIik7XG4gICAgbGV0IGF1c0FycjogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPiA9IHZhbHVlLnNwbGl0KCcsJyk7XG4gICAgbGV0IGFscGhhVmFsOiBzdHJpbmcgfCBudW1iZXIgPSAnJztcblxuICAgIGlmKCFhbHBoYSkge1xuICAgICAgaWYoYXVzQXJyLmxlbmd0aCA9PSAzKSB7XG4gICAgICAgIGF1c0FyciA9IGF1c0Fyci5tYXAoZnVuY3Rpb24odmFsOiBzdHJpbmcpe3JldHVybiBwYXJzZUludCh2YWwpfSk7XG4gICAgICAgIGlmKFxuICAgICAgICAgIE1hdGgubWF4LmFwcGx5KG51bGwsIGF1c0FycikgPD0gMjU1ICYmXG4gICAgICAgICAgTWF0aC5taW4uYXBwbHkobnVsbCwgYXVzQXJyKSA+PSAwXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiAncmdiKCcgKyBhdXNBcnIuam9pbignLCcpICsgJyknO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKGF1c0Fyci5sZW5ndGggPT0gNCkge1xuICAgICAgICBhbHBoYVZhbCA9IHBhcnNlRmxvYXQoPHN0cmluZz5hdXNBcnIucG9wKCkpO1xuICAgICAgICBhdXNBcnIgPSBhdXNBcnIubWFwKGZ1bmN0aW9uKHZhbDogc3RyaW5nKXtyZXR1cm4gcGFyc2VJbnQodmFsKX0pO1xuICAgICAgICBpZihcbiAgICAgICAgICBNYXRoLm1heC5hcHBseShudWxsLCBhdXNBcnIpIDw9IDI1NSAmJlxuICAgICAgICAgIE1hdGgubWluLmFwcGx5KG51bGwsIGF1c0FycikgPj0gMCAmJlxuICAgICAgICAgIGFscGhhVmFsID49IDAgJiYgYWxwaGFWYWwgPD0gMVxuICAgICAgICApIHtcbiAgICAgICAgICBhdXNBcnIucHVzaChhbHBoYVZhbCk7XG4gICAgICAgICAgcmV0dXJuICdyZ2JhKCcgKyBhdXNBcnIuam9pbignLCcpICsgJyknO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByZXBhcmVSZXR1cm5Db2xvcihoc3ZhOiBIU1ZBLCBmb3JtYXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgc3dpdGNoIChmb3JtYXQpIHtcbiAgICAgIGNhc2UgXCJoZXg2XCI6IHJldHVybiB0aGlzLmhzdmFUb0hleChoc3ZhLmh1ZSwgaHN2YS5zYXR1cmF0aW9uLCBoc3ZhLnZhbHVlLCAxLCBmYWxzZSk7XG4gICAgICBjYXNlIFwiaGV4OFwiOiByZXR1cm4gdGhpcy5oc3ZhVG9IZXgoaHN2YS5odWUsIGhzdmEuc2F0dXJhdGlvbiwgaHN2YS52YWx1ZSwgaHN2YS5hbHBoYSwgdHJ1ZSk7XG4gICAgICBjYXNlIFwicmdiXCI6IHJldHVybiB0aGlzLmhzdmFUb1JnYmFTdHJpbmcoaHN2YS5odWUsIGhzdmEuc2F0dXJhdGlvbiwgaHN2YS52YWx1ZSwgMSk7XG4gICAgICBjYXNlIFwicmdiYVwiOiByZXR1cm4gdGhpcy5oc3ZhVG9SZ2JhU3RyaW5nKGhzdmEuaHVlLCBoc3ZhLnNhdHVyYXRpb24sIGhzdmEudmFsdWUsIGhzdmEuYWxwaGEsIHRydWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5oc3ZhVG9IZXgoaHN2YS5odWUsIGhzdmEuc2F0dXJhdGlvbiwgaHN2YS52YWx1ZSwgMSwgZmFsc2UpO1xuICB9XG5cbiAgcHJlcGFyZVBpY2tlclBhbGxldHMoYXZhaWxQYWxsZXRzOiBBcnJheTxzdHJpbmc+ID0gW10sIGN1c3RvbVBhbGxldHM6IEFycmF5PFBhbGV0dGU+ID0gW10sIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICB0aGlzLnBhbGxldHMuZm9yRWFjaCgocGFsZXR0ZSkgPT4ge1xuICAgICAgaWYoYXZhaWxQYWxsZXRzLmluZGV4T2YocGFsZXR0ZS5pZCkgIT09IC0xKSB7XG4gICAgICAgIHBpY2tlckNvbXBvbmVudC5waWNrZXJQYWxsZXRzLnB1c2gocGFsZXR0ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY3VzdG9tUGFsbGV0cy5mb3JFYWNoKChwYWxldHRlKSA9PiB7XG4gICAgICBwaWNrZXJDb21wb25lbnQucGlja2VyUGFsbGV0cy5wdXNoKHBhbGV0dGUpO1xuICAgIH0pXG5cbiAgfVxuXG4gIGZpbGxCYXNlUGFsbGV0cygpIHtcbiAgICB0aGlzLnBhbGxldHMucHVzaCh7XG4gICAgICBpZDogJ3BvbGFyaXMnLFxuICAgICAgbmFtZTogJ1BvbGFyaXMnLFxuICAgICAgY29sb3JzOiBbXG4gICAgICAgICcjRjlGQUZCJywgJyNGNEY2RjgnLCAnI0RGRTNFOCcsICcjQzRDREQ1JyxcbiAgICAgICAgJyM5MTlFQUInLCAnIzYzNzM4MScsICcjNDU0RjVCJywgJyMyMTJCMzYnLFxuICAgICAgICAnI0IzQjVDQicsICcjNDM0NjdGJywgJyMxQzIyNjAnLCAnIzAwMDQ0QycsXG4gICAgICAgICcjRjZGMEZEJywgJyNFM0QwRkYnLCAnIzlDNkFERScsICcjNTAyNDhGJywgJyMyMzAwNTEnLFxuICAgICAgICAnI0Y0RjVGQScsICcjQjNCQ0Y1JywgJyM1QzZBQzQnLCAnIzIwMkU3OCcsICcjMDAwNjM5JyxcbiAgICAgICAgJyNFQkY1RkEnLCAnI0I0RTFGQScsICcjMDA3QUNFJywgJyMwODRFOEEnLCAnIzAwMTQyOScsXG4gICAgICAgICcjRTBGNUY1JywgJyNCN0VDRUMnLCAnIzQ3QzFCRicsICcjMDA4NDhFJywgJyMwMDMxMzUnLFxuICAgICAgICAnI0UzRjFERicsICcjQkJFNUIzJywgJyM1MEI4M0MnLCAnIzEwODA0MycsICcjMTczNjMwJyxcbiAgICAgICAgJyNGQ0YxQ0QnLCAnI0ZGRUE4QScsICcjRUVDMjAwJywgJyM5QzZGMTknLCAnIzU3M0IwMCcsXG4gICAgICAgICcjRkNFQkRCJywgJyNGRkM1OEInLCAnI0Y0OTM0MicsICcjQzA1NzE3JywgJyM0QTE1MDQnLFxuICAgICAgICAnI0ZCRUFFNScsICcjRkVBRDlBJywgJyNERTM2MTgnLCAnI0JGMDcxMScsICcjMzMwMTAxJyxcbiAgICAgIF1cbiAgICB9KTtcbiAgICB0aGlzLnBhbGxldHMucHVzaCh7XG4gICAgICBpZDogJ21hdGVyaWFsJyxcbiAgICAgIG5hbWU6ICdNYXRlcmlhbCcsXG4gICAgICBjb2xvcnM6IFtcbiAgICAgICAgJyNmZmViZWUnLCAnI2ZmY2RkMicsICcjZWY5YTlhJywgJyNlNTczNzMnLCAnI2VmNTM1MCcsICcjZjQ0MzM2JywgJyNlNTM5MzUnLCAnI2QzMmYyZicsICcjYzYyODI4JywgJyNiNzFjMWMnLCAnI2ZmOGE4MCcsICcjZmY1MjUyJywgJyNmZjE3NDQnLCAnI2Q1MDAwMCcsXG4gICAgICAgICcjZmNlNGVjJywgJyNmOGJiZDAnLCAnI2Y0OGZiMScsICcjZjA2MjkyJywgJyNlYzQwN2EnLCAnI2U5MWU2MycsICcjZDgxYjYwJywgJyNjMjE4NWInLCAnI2FkMTQ1NycsICcjODgwZTRmJywgJyNmZjgwYWInLCAnI2ZmNDA4MScsICcjZjUwMDU3JywgJyNjNTExNjInLFxuICAgICAgICAnI2YzZTVmNScsICcjZTFiZWU3JywgJyNjZTkzZDgnLCAnI2JhNjhjOCcsICcjYWI0N2JjJywgJyM5YzI3YjAnLCAnIzhlMjRhYScsICcjN2IxZmEyJywgJyM2YTFiOWEnLCAnIzRhMTQ4YycsICcjZWE4MGZjJywgJyNlMDQwZmInLCAnI2Q1MDBmOScsICcjYWEwMGZmJyxcbiAgICAgICAgJyNlZGU3ZjYnLCAnI2QxYzRlOScsICcjYjM5ZGRiJywgJyM5NTc1Y2QnLCAnIzdlNTdjMicsICcjNjczYWI3JywgJyM1ZTM1YjEnLCAnIzUxMmRhOCcsICcjNDUyN2EwJywgJyMzMTFiOTInLCAnI2IzODhmZicsICcjN2M0ZGZmJywgJyM2NTFmZmYnLCAnIzYyMDBlYScsXG4gICAgICAgICcjZThlYWY2JywgJyNjNWNhZTknLCAnIzlmYThkYScsICcjNzk4NmNiJywgJyM1YzZiYzAnLCAnIzNmNTFiNScsICcjMzk0OWFiJywgJyMzMDNmOWYnLCAnIzI4MzU5MycsICcjMWEyMzdlJywgJyM4YzllZmYnLCAnIzUzNmRmZScsICcjM2Q1YWZlJywgJyMzMDRmZmUnLFxuICAgICAgICAnI2UzZjJmZCcsICcjYmJkZWZiJywgJyM5MGNhZjknLCAnIzY0YjVmNicsICcjNDJhNWY1JywgJyMyMTk2ZjMnLCAnIzFlODhlNScsICcjMTk3NmQyJywgJyMxNTY1YzAnLCAnIzBkNDdhMScsICcjODJiMWZmJywgJyM0NDhhZmYnLCAnIzI5NzlmZicsICcjMjk2MmZmJyxcbiAgICAgICAgJyNlMWY1ZmUnLCAnI2IzZTVmYycsICcjODFkNGZhJywgJyM0ZmMzZjcnLCAnIzI5YjZmNicsICcjMDNhOWY0JywgJyMwMzliZTUnLCAnIzAyODhkMScsICcjMDI3N2JkJywgJyMwMTU3OWInLCAnIzgwZDhmZicsICcjNDBjNGZmJywgJyMwMGIwZmYnLCAnIzAwOTFlYScsXG4gICAgICAgICcjZTBmN2ZhJywgJyNiMmViZjInLCAnIzgwZGVlYScsICcjNGRkMGUxJywgJyMyNmM2ZGEnLCAnIzAwYmNkNCcsICcjMDBhY2MxJywgJyMwMDk3YTcnLCAnIzAwODM4ZicsICcjMDA2MDY0JywgJyM4NGZmZmYnLCAnIzE4ZmZmZicsICcjMDBlNWZmJywgJyMwMGI4ZDQnLFxuICAgICAgICAnI2UwZjJmMScsICcjYjJkZmRiJywgJyM4MGNiYzQnLCAnIzRkYjZhYycsICcjMjZhNjlhJywgJyMwMDk2ODgnLCAnIzAwODk3YicsICcjMDA3OTZiJywgJyMwMDY5NWMnLCAnIzAwNGQ0MCcsICcjYTdmZmViJywgJyM2NGZmZGEnLCAnIzFkZTliNicsICcjMDBiZmE1JyxcbiAgICAgICAgJyNlOGY1ZTknLCAnI2M4ZTZjOScsICcjYTVkNmE3JywgJyM4MWM3ODQnLCAnIzY2YmI2YScsICcjNGNhZjUwJywgJyM0M2EwNDcnLCAnIzM4OGUzYycsICcjMmU3ZDMyJywgJyMxYjVlMjAnLCAnI2I5ZjZjYScsICcjNjlmMGFlJywgJyMwMGU2NzYnLCAnIzAwYzg1MycsXG4gICAgICAgICcjZjFmOGU5JywgJyNkY2VkYzgnLCAnI2M1ZTFhNScsICcjYWVkNTgxJywgJyM5Y2NjNjUnLCAnIzhiYzM0YScsICcjN2NiMzQyJywgJyM2ODlmMzgnLCAnIzU1OGIyZicsICcjMzM2OTFlJywgJyNjY2ZmOTAnLCAnI2IyZmY1OScsICcjNzZmZjAzJywgJyM2NGRkMTcnLFxuICAgICAgICAnI2Y5ZmJlNycsICcjZjBmNGMzJywgJyNlNmVlOWMnLCAnI2RjZTc3NScsICcjZDRlMTU3JywgJyNjZGRjMzknLCAnI2MwY2EzMycsICcjYWZiNDJiJywgJyM5ZTlkMjQnLCAnIzgyNzcxNycsICcjZjRmZjgxJywgJyNlZWZmNDEnLCAnI2M2ZmYwMCcsICcjYWVlYTAwJyxcbiAgICAgICAgJyNmZmZkZTcnLCAnI2ZmZjljNCcsICcjZmZmNTlkJywgJyNmZmYxNzYnLCAnI2ZmZWU1OCcsICcjZmZlYjNiJywgJyNmZGQ4MzUnLCAnI2ZiYzAyZCcsICcjZjlhODI1JywgJyNmNTdmMTcnLCAnI2ZmZmY4ZCcsICcjZmZmZjAwJywgJyNmZmVhMDAnLCAnI2ZmZDYwMCcsXG4gICAgICAgICcjZmZmOGUxJywgJyNmZmVjYjMnLCAnI2ZmZTA4MicsICcjZmZkNTRmJywgJyNmZmNhMjgnLCAnI2ZmYzEwNycsICcjZmZiMzAwJywgJyNmZmEwMDAnLCAnI2ZmOGYwMCcsICcjZmY2ZjAwJywgJyNmZmU1N2YnLCAnI2ZmZDc0MCcsICcjZmZjNDAwJywgJyNmZmFiMDAnLFxuICAgICAgICAnI2ZmZjNlMCcsICcjZmZlMGIyJywgJyNmZmNjODAnLCAnI2ZmYjc0ZCcsICcjZmZhNzI2JywgJyNmZjk4MDAnLCAnI2ZiOGMwMCcsICcjZjU3YzAwJywgJyNlZjZjMDAnLCAnI2U2NTEwMCcsICcjZmZkMTgwJywgJyNmZmFiNDAnLCAnI2ZmOTEwMCcsICcjZmY2ZDAwJyxcbiAgICAgICAgJyNmYmU5ZTcnLCAnI2ZmY2NiYycsICcjZmZhYjkxJywgJyNmZjhhNjUnLCAnI2ZmNzA0MycsICcjZmY1NzIyJywgJyNmNDUxMWUnLCAnI2U2NGExOScsICcjZDg0MzE1JywgJyNiZjM2MGMnLCAnI2ZmOWU4MCcsICcjZmY2ZTQwJywgJyNmZjNkMDAnLCAnI2RkMmMwMCcsXG4gICAgICAgICcjZWZlYmU5JywgJyNkN2NjYzgnLCAnI2JjYWFhNCcsICcjYTE4ODdmJywgJyM4ZDZlNjMnLCAnIzc5NTU0OCcsICcjNmQ0YzQxJywgJyM1ZDQwMzcnLCAnIzRlMzQyZScsICcjM2UyNzIzJyxcbiAgICAgICAgJyNmYWZhZmEnLCAnI2Y1ZjVmNScsICcjZWVlZWVlJywgJyNlMGUwZTAnLCAnI2JkYmRiZCcsICcjOWU5ZTllJywgJyM3NTc1NzUnLCAnIzYxNjE2MScsICcjNDI0MjQyJywgJyMyMTIxMjEnLFxuICAgICAgICAnI2VjZWZmMScsICcjY2ZkOGRjJywgJyNiMGJlYzUnLCAnIzkwYTRhZScsICcjNzg5MDljJywgJyM2MDdkOGInLCAnIzU0NmU3YScsICcjNDU1YTY0JywgJyMzNzQ3NGYnLCAnIzI2MzIzOCcsXG4gICAgICBdXG4gICAgfSk7XG4gIH1cblxuXG5cblxuXG59XG4iLCJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2xpYk5neFRUaXRhbkNvbG9yUGlja2VyRHJhZ2dlcl0nXG59KVxuZXhwb3J0IGNsYXNzIE5neFRUaXRhbkNvbG9yUGlja2VyRHJhZ2dlckRpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCdwaWNrZXJQYWQnKSBwdWJsaWMgcGlja2VyUGFkOiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbFJlZjogRWxlbWVudFJlZikgeyB9XG5cblxuICBwdWJsaWMgc2V0UG9zaXRpb24oeDogbnVtYmVyLCB5OiBudW1iZXIsIGRpcmVjdGlvbjogc3RyaW5nKTogdm9pZCB7XG5cbiAgICBsZXQgcmVjdCA9IHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIGlmKGRpcmVjdGlvbiA9PSAndmVydGljYWwnIHx8IGRpcmVjdGlvbiA9PSAnYm90aCcpIHtcbiAgICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5zdHlsZS50b3AgPSBNYXRoLnJvdW5kKCh5IC0gKChyZWN0LmhlaWdodCkgLyAyKSkpICsgJ3B4JztcbiAgICB9XG4gICAgaWYoZGlyZWN0aW9uID09ICdob3Jpem9udGFsJyB8fCBkaXJlY3Rpb24gPT0gJ2JvdGgnKSB7XG4gICAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9IE1hdGgucm91bmQoKHggLSAoKHJlY3Qud2lkdGgpIC8gMikpKSArICdweCc7XG4gICAgfVxuXG4gIH1cblxufVxuIiwiaW1wb3J0IHtcbiAgQ29udGVudENoaWxkLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Tmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyRGlyZWN0aXZlfSBmcm9tIFwiLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1kcmFnZ2VyLmRpcmVjdGl2ZVwiO1xuLy8gaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24sIG9mfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtmcm9tRXZlbnQsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge05neFRUaXRhbkNvbG9yUGlja2VyU2VydmljZX0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuc2VydmljZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEN1c3RvbVJlY3Qge1xuICBoZWlnaHQ6IG51bWJlcixcbiAgbGVmdDogbnVtYmVyLFxuICB0b3A6IG51bWJlcixcbiAgd2lkdGg6IG51bWJlclxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEN1c3RvbVBlcmNlbnQge1xuICB4OiBudW1iZXIsXG4gIHk6IG51bWJlcixcbn1cblxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3Rvcl0nLFxuICBleHBvcnRBczogJ2xpYk5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3InXG59KVxuZXhwb3J0IGNsYXNzIE5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdHtcblxuICBASW5wdXQoJ2RpcmVjdGlvbicpIHB1YmxpYyBkaXJlY3Rpb246IHN0cmluZyA9ICdib3RoJztcblxuICBAQ29udGVudENoaWxkKE5neFRUaXRhbkNvbG9yUGlja2VyRHJhZ2dlckRpcmVjdGl2ZSkgcHVibGljIGRyYWdnZXI6IE5neFRUaXRhbkNvbG9yUGlja2VyRHJhZ2dlckRpcmVjdGl2ZSA9IG51bGw7XG5cbiAgQE91dHB1dCgnY2hhbmdlJykgcHVibGljIGNoYW5nZTogRXZlbnRFbWl0dGVyPEN1c3RvbVBlcmNlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxDdXN0b21QZXJjZW50PigpO1xuXG4gIHB1YmxpYyBlbDogSFRNTEVsZW1lbnQgPSBudWxsO1xuICBwdWJsaWMgZHJhZ1N0YXJ0OiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBnbG9iYWxNb3VzZU1vdmU6IFN1YnNjcmlwdGlvbiA9IG51bGw7XG4gIHB1YmxpYyBnbG9iYWxNb3VzZVVwOiBTdWJzY3JpcHRpb24gPSBudWxsO1xuXG5cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWRvd24nLCBbJyRldmVudCddKSBwdWJsaWMgb25Nb3VzZURvd24oJGV2ZW50KSB7XG4gICAgdGhpcy5kcmFnU3RhcnQgPSB0cnVlO1xuICAgIHRoaXMuZ2V0UG9zaXRpb24oJGV2ZW50KTtcbiAgfVxuXG5cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZWxSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIGNvbG9yUGlja2VyU2VydmljZTogTmd4VFRpdGFuQ29sb3JQaWNrZXJTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuZWwgPSB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSAoWydib3RoJywgJ3ZlcnRpY2FsJywgJ2hvcml6b250YWwnXS5pbmRleE9mKHRoaXMuZGlyZWN0aW9uKSA9PT0gLTEpID8gJ2JvdGgnIDogdGhpcy5kaXJlY3Rpb247XG5cblxuXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcblxuXG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgIHRoaXMuZXZlbnRzVW5TdWJzY2liZSgpO1xuICB9XG5cblxuICBldmVudHNTdWJzY2liZSgpIHtcbiAgICB0aGlzLmdsb2JhbE1vdXNlTW92ZSA9IGZyb21FdmVudCh3aW5kb3csICdtb3VzZW1vdmUnKS5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICBpZih0aGlzLmRyYWdTdGFydCkge1xuICAgICAgICB0aGlzLmdldFBvc2l0aW9uKDxNb3VzZUV2ZW50PmV2ZW50KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmdsb2JhbE1vdXNlVXAgPSBmcm9tRXZlbnQod2luZG93LCAnbW91c2V1cCcpLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgIGlmKHRoaXMuZHJhZ1N0YXJ0KSB7XG4gICAgICAgIHRoaXMuZHJhZ1N0YXJ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZ2V0UG9zaXRpb24oPE1vdXNlRXZlbnQ+ZXZlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICAvLyB0aGlzLmdsb2JhbE1vdXNlTW92ZSA9IHRoaXMuY29sb3JQaWNrZXJTZXJ2aWNlLm1vdXNlTW92ZU9ic2VydmFibGUuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgIC8vICAgaWYodGhpcy5kcmFnU3RhcnQpIHtcbiAgICAvLyAgICAgdGhpcy5nZXRQb3NpdGlvbig8TW91c2VFdmVudD5ldmVudCk7XG4gICAgLy8gICB9XG4gICAgLy8gfSk7XG4gICAgLy8gdGhpcy5nbG9iYWxNb3VzZVVwID0gdGhpcy5jb2xvclBpY2tlclNlcnZpY2UubW91c2VVcE9ic2VydmFibGUuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgIC8vICAgaWYodGhpcy5kcmFnU3RhcnQpIHtcbiAgICAvLyAgICAgdGhpcy5kcmFnU3RhcnQgPSBmYWxzZTtcbiAgICAvLyAgICAgdGhpcy5nZXRQb3NpdGlvbig8TW91c2VFdmVudD5ldmVudCk7XG4gICAgLy8gICB9XG4gICAgLy8gfSk7XG4gIH1cbiAgZXZlbnRzVW5TdWJzY2liZSgpIHtcbiAgICBpZih0aGlzLmdsb2JhbE1vdXNlTW92ZSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5nbG9iYWxNb3VzZU1vdmUudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYodGhpcy5nbG9iYWxNb3VzZVVwICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmdsb2JhbE1vdXNlVXAudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0RHJhZ2dlcihwZXJzZW50OiBDdXN0b21QZXJjZW50KSB7XG4gICAgaWYodGhpcy5kcmFnZ2VyID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBwb3NpdGlvbjogQ3VzdG9tUmVjdCA9IHRoaXMuZ2V0UmVjdCh0aGlzLmVsKTtcbiAgICBsZXQgeCA9IE1hdGgucm91bmQoKChwb3NpdGlvbi53aWR0aCAtIHRoaXMuZHJhZ2dlci5waWNrZXJQYWQgKiAyKSAqIHBlcnNlbnQueCAvIDEwMCkpO1xuICAgIGxldCB5ID0gTWF0aC5yb3VuZCgoKHBvc2l0aW9uLmhlaWdodCAtIHRoaXMuZHJhZ2dlci5waWNrZXJQYWQgKiAyKSAqIHBlcnNlbnQueSAvIDEwMCkpO1xuICAgIHRoaXMuZHJhZ2dlci5zZXRQb3NpdGlvbihcbiAgICAgICh4ID4gdGhpcy5kcmFnZ2VyLnBpY2tlclBhZCkgPyB4IDogdGhpcy5kcmFnZ2VyLnBpY2tlclBhZCxcbiAgICAgICh5ID4gdGhpcy5kcmFnZ2VyLnBpY2tlclBhZCkgPyB5IDogdGhpcy5kcmFnZ2VyLnBpY2tlclBhZCxcbiAgICAgIHRoaXMuZGlyZWN0aW9uXG4gICAgKTtcblxuICB9XG5cbiAgcHVibGljIGdldFBvc2l0aW9uKCRldmVudDogTW91c2VFdmVudCkge1xuICAgIGxldCBjdXJzb3JZID0gJGV2ZW50LnBhZ2VZO1xuICAgIGxldCBjdXJzb3JYID0gJGV2ZW50LnBhZ2VYO1xuICAgIGxldCBwb3NpdGlvbjogQ3VzdG9tUmVjdCA9IHRoaXMuZ2V0UmVjdCh0aGlzLmVsKTtcbiAgICBsZXQgcGVyY2VudDogQ3VzdG9tUGVyY2VudCA9IHt4OiAwLCB5OiAwfTtcbiAgICBpZih0aGlzLmRpcmVjdGlvbiA9PSAndmVydGljYWwnIHx8IHRoaXMuZGlyZWN0aW9uID09ICdib3RoJykge1xuICAgICAgcGVyY2VudC55ID0gTWF0aC5yb3VuZCgoY3Vyc29yWSAtIChwb3NpdGlvbi50b3ApKSAqIDEwMCAvIChwb3NpdGlvbi5oZWlnaHQgLSB0aGlzLmRyYWdnZXIucGlja2VyUGFkICogMikpO1xuICAgICAgaWYocGVyY2VudC55IDwgMCkge1xuICAgICAgICBwZXJjZW50LnkgPSAwXG4gICAgICB9IGVsc2UgaWYocGVyY2VudC55ID4gMTAwKSB7XG4gICAgICAgIHBlcmNlbnQueSA9IDEwMDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYodGhpcy5kaXJlY3Rpb24gPT0gJ2hvcml6b250YWwnIHx8IHRoaXMuZGlyZWN0aW9uID09ICdib3RoJykge1xuICAgICAgcGVyY2VudC54ID0gTWF0aC5yb3VuZCgoY3Vyc29yWCAtIChwb3NpdGlvbi5sZWZ0KSkgKiAxMDAgLyAocG9zaXRpb24ud2lkdGggLSB0aGlzLmRyYWdnZXIucGlja2VyUGFkICogMikpO1xuICAgICAgaWYocGVyY2VudC54IDwgMCkge1xuICAgICAgICBwZXJjZW50LnggPSAwXG4gICAgICB9IGVsc2UgaWYocGVyY2VudC54ID4gMTAwKSB7XG4gICAgICAgIHBlcmNlbnQueCA9IDEwMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNldERyYWdnZXIocGVyY2VudCk7XG4gICAgdGhpcy5jaGFuZ2UuZW1pdChwZXJjZW50KTtcblxuICB9XG5cblxuXG4gIHB1YmxpYyBnZXRSZWN0KGVsZW06IEhUTUxFbGVtZW50KTogQ3VzdG9tUmVjdCB7XG5cbiAgICBsZXQgYm94ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBsZXQgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgbGV0IGRvY0VsID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgIGxldCBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jRWwuc2Nyb2xsVG9wIHx8IGJvZHkuc2Nyb2xsVG9wO1xuICAgIGxldCBzY3JvbGxMZWZ0ID0gd2luZG93LnBhZ2VYT2Zmc2V0IHx8IGRvY0VsLnNjcm9sbExlZnQgfHwgYm9keS5zY3JvbGxMZWZ0O1xuICAgIGxldCBjbGllbnRUb3AgPSBkb2NFbC5jbGllbnRUb3AgfHwgYm9keS5jbGllbnRUb3AgfHwgMDtcbiAgICBsZXQgY2xpZW50TGVmdCA9IGRvY0VsLmNsaWVudExlZnQgfHwgYm9keS5jbGllbnRMZWZ0IHx8IDA7XG5cbiAgICByZXR1cm4ge1xuICAgICAgaGVpZ2h0OiBib3guaGVpZ2h0LFxuICAgICAgbGVmdDogYm94LmxlZnQgKyBzY3JvbGxMZWZ0IC0gY2xpZW50TGVmdCxcbiAgICAgIHRvcDogYm94LnRvcCArIHNjcm9sbFRvcCAtIGNsaWVudFRvcCxcbiAgICAgIHdpZHRoOiBib3gud2lkdGgsXG4gICAgfTtcbiAgfVxuXG5cblxufVxuIiwiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Tmd4VFRpdGFuQ29sb3JQaWNrZXJTZXJ2aWNlfSBmcm9tIFwiLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci5zZXJ2aWNlXCI7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tsaWJOZ3hUVGl0YW5Db2xvclBpY2tlcklucHV0XScsXG4gIGV4cG9ydEFzOiAnbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJJbnB1dCdcbn0pXG5leHBvcnQgY2xhc3MgTmd4VFRpdGFuQ29sb3JQaWNrZXJJbnB1dERpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCdmb3JtYXQnKSBmb3JtYXQ6IHN0cmluZyA9ICdoZXg2JztcbiAgQE91dHB1dCgnaW5wdXRDaGFuZ2UnKSBwdWJsaWMgaW5wdXRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cblxuICBASG9zdExpc3RlbmVyKCdrZXl1cCcpIGtleVVwKCkge1xuICAgIHRoaXMuaW5wdXRWYWxpZGF0ZSgpO1xuICB9XG4gIEBIb3N0TGlzdGVuZXIoJ2NoYW5nZScpIGNoYW5nZSgpIHtcbiAgICB0aGlzLmlucHV0VmFsaWRhdGUoKTtcbiAgfVxuXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsOiBFbGVtZW50UmVmLFxuICAgIHB1YmxpYyBjb2xvclBpY2tlclNlcnZpY2U6IE5neFRUaXRhbkNvbG9yUGlja2VyU2VydmljZVxuICApIHsgfVxuXG5cbiAgc2V0SW5wdXRWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgKDxIVE1MSW5wdXRFbGVtZW50PnRoaXMuZWwubmF0aXZlRWxlbWVudCkudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG5cbiAgaW5wdXRWYWxpZGF0ZSgpIHtcbiAgICBsZXQgcmVzID0gdGhpcy5jb2xvclBpY2tlclNlcnZpY2UudmFsaWRhdGVDb2xvckZvcm1hdChcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC52YWx1ZSxcbiAgICAgIHRoaXMuZm9ybWF0XG4gICAgKTtcblxuICAgIGlmKHJlcyAhPT0gJ25vdFZhbGlkJykge1xuICAgICAgKDxIVE1MSW5wdXRFbGVtZW50PnRoaXMuZWwubmF0aXZlRWxlbWVudCkudmFsdWUgPSByZXM7XG4gICAgICB0aGlzLmlucHV0Q2hhbmdlLmVtaXQocmVzKTtcbiAgICB9XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtQYWxldHRlfSBmcm9tIFwiLi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItbmd4LXR0aXRhbi1jb2xvci1waWNrZXItcGFsZXR0ZS1saXN0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwicGlja2VyLXBhbGV0dGUtd3JhcHBlclwiICpuZ0lmPVwicGFsbGV0cy5sZW5ndGggPiAwXCI+XG4gIDxkaXYgY2xhc3M9XCJwYWxldHRlLWxpbmtzXCI+XG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJwYWxldHRlLWxpbmtcIlxuICAgICAgKm5nRm9yPVwibGV0IHBhbGV0dGUgb2YgcGFsbGV0c1wiXG4gICAgICBbbmdDbGFzc109XCJ7J3NlbGVjdGVkJzogKGFjdGl2ZVBhbGV0dGUgIT09IG51bGwgJiYgYWN0aXZlUGFsZXR0ZS5pZCA9PSBwYWxldHRlLmlkKX1cIlxuICAgICAgKGNsaWNrKT1cInNlbGVjdFBhbGV0dGUocGFsZXR0ZSlcIlxuICAgID5cbiAgICAgIHt7cGFsZXR0ZS5uYW1lfX1cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJwYWxldHRlLXBpY2tlci1ob2xkZXJcIiAqbmdJZj1cImFjdGl2ZVBhbGV0dGUgIT09IG51bGwgJiYgYWN0aXZlUGFsZXR0ZS5jb2xvcnMubGVuZ3RoID4gMFwiPlxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwicGFsZXR0ZS1jb2xvclwiXG4gICAgICAqbmdGb3I9XCJsZXQgY29sb3Igb2YgYWN0aXZlUGFsZXR0ZS5jb2xvcnNcIlxuICAgICAgW25nU3R5bGVdPVwie1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yXG4gICAgICB9XCJcbiAgICAgIChjbGljayk9XCJjb2xvclNlbGVjdGVkKGNvbG9yKVwiXG4gICAgPlxuXG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgOmhvc3QgLnBpY2tlci1wYWxldHRlLXdyYXBwZXIgLnBhbGV0dGUtbGlua3N7ZGlzcGxheTpmbGV4O2ZsZXgtd3JhcDp3cmFwO21hcmdpbi1ib3R0b206NXB4fTpob3N0IC5waWNrZXItcGFsZXR0ZS13cmFwcGVyIC5wYWxldHRlLWxpbmtzIC5wYWxldHRlLWxpbmt7bWFyZ2luLXJpZ2h0OjVweDtib3JkZXItcmFkaXVzOjNweDtwYWRkaW5nOjJweCA0cHg7Ym9yZGVyOjFweCBzb2xpZCAjZGRkO3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtmb250LXNpemU6MTBweDtmb250LWZhbWlseTotYXBwbGUtc3lzdGVtLEJsaW5rTWFjU3lzdGVtRm9udCxTYW4gRnJhbmNpc2NvLFJvYm90byxTZWdvZSBVSSxIZWx2ZXRpY2EgTmV1ZSxzYW5zLXNlcmlmO2ZvbnQtd2VpZ2h0OjYwMDtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7Y3Vyc29yOnBvaW50ZXJ9Omhvc3QgLnBpY2tlci1wYWxldHRlLXdyYXBwZXIgLnBhbGV0dGUtbGlua3MgLnBhbGV0dGUtbGluay5zZWxlY3RlZHtiYWNrZ3JvdW5kLWNvbG9yOiM1ZTZiYzU7Y29sb3I6I2ZmZn06aG9zdCAucGlja2VyLXBhbGV0dGUtd3JhcHBlciAucGFsZXR0ZS1waWNrZXItaG9sZGVye2hlaWdodDoxNjVweDtkaXNwbGF5OmZsZXg7ZmxleC13cmFwOndyYXA7YWxpZ24taXRlbXM6ZmxleC1zdGFydDtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydDthbGlnbi1jb250ZW50OmJhc2VsaW5lfTpob3N0IC5waWNrZXItcGFsZXR0ZS13cmFwcGVyIC5wYWxldHRlLXBpY2tlci1ob2xkZXIgLnBhbGV0dGUtY29sb3J7Y3Vyc29yOnBvaW50ZXI7d2lkdGg6MTBweDtoZWlnaHQ6MTBweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hUVGl0YW5Db2xvclBpY2tlclBhbGV0dGVMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoJ3BhbGxldHMnKSBwdWJsaWMgcGFsbGV0czogQXJyYXk8UGFsZXR0ZT4gPSBbXTtcbiAgQE91dHB1dCgnY2hhbmdlJykgcHVibGljIGNoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBwdWJsaWMgYWN0aXZlUGFsZXR0ZTogUGFsZXR0ZSA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIGNsb3NlUGFsZXR0ZSgpIHtcbiAgICB0aGlzLmFjdGl2ZVBhbGV0dGUgPSBudWxsO1xuICB9XG5cbiAgc2VsZWN0UGFsZXR0ZShwYWxldHRlOiBQYWxldHRlKSB7XG4gICAgaWYoXG4gICAgICB0aGlzLmFjdGl2ZVBhbGV0dGUgPT0gbnVsbFxuICAgICkge1xuICAgICAgdGhpcy5hY3RpdmVQYWxldHRlID0gcGFsZXR0ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYWN0aXZlUGFsZXR0ZS5pZCAhPT0gcGFsZXR0ZS5pZCkge1xuICAgICAgdGhpcy5hY3RpdmVQYWxldHRlID0gcGFsZXR0ZTtcbiAgICB9XG5cbiAgfVxuXG4gIGNvbG9yU2VsZWN0ZWQoY29sb3IpIHtcbiAgICB0aGlzLmNoYW5nZS5lbWl0KGNvbG9yKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgQ29udGVudENoaWxkLCBDb250ZW50Q2hpbGRyZW4sIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25Jbml0LFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Tmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvckRpcmVjdGl2ZX0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXItc2VsZWN0b3IuZGlyZWN0aXZlXCI7XG5pbXBvcnQge0hTVkEsIE5neFRUaXRhbkNvbG9yUGlja2VyU2VydmljZSwgUGFsZXR0ZX0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuc2VydmljZVwiO1xuaW1wb3J0IHtOZ3hUVGl0YW5Db2xvclBpY2tlcklucHV0RGlyZWN0aXZlfSBmcm9tIFwiLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1pbnB1dC5kaXJlY3RpdmVcIjtcbmltcG9ydCB7Tmd4VFRpdGFuQ29sb3JQaWNrZXJQYWxldHRlTGlzdENvbXBvbmVudH0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXItcGFsZXR0ZS1saXN0L25neC10dGl0YW4tY29sb3ItcGlja2VyLXBhbGV0dGUtbGlzdC5jb21wb25lbnRcIjtcbi8vW25nU3R5bGVdPVwie2JhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQodG8gdG9wLCAnICsgbmd4VFRpdGFuQ29sb3JQaWNrZXJTZXJ2aWNlLmN1cnJlbnRDb2xvciArICcgMThweCwgcmdiKDI1NSwgNzcsIDI1NSkgY2FsYygxMDAlIC0gMThweCknfVwiXG5AQ29tcG9uZW50KHtcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHNlbGVjdG9yOiAnbGliLW5neC10dGl0YW4tY29sb3ItcGlja2VyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2XHJcbiAgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci13cmFwcGVyXCJcclxuPlxyXG5cclxuICA8ZGl2IGNsYXNzPVwicGlja2VyLWlucHV0LXdyYXBwZXJcIj5cclxuICAgIDxkaXZcclxuICAgICAgW25nU3R5bGVdPVwie2JhY2tncm91bmRDb2xvcjogY29sb3J9XCJcclxuICAgICAgY2xhc3M9XCJkZWJ1Zy1vdXRwdXRcIlxyXG4gICAgICAqbmdJZj1cImNvbG9yUGlja2VyU2VydmljZS5kZWJ1Z1wiXHJcbiAgICA+XHJcbiAgICAgIHt7Y29sb3J9fVxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWlucHV0LWxhYmVsXCI+XHJcbiAgICAgIDxsYWJlbCBbZm9yXT1cInV1aWRcIiA+e3t0aXRsZX19PC9sYWJlbD5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cInBpY2tlci1pbnB1dC1ob2xkZXJcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1jb2xvclwiIFtuZ1N0eWxlXT1cIntiYWNrZ3JvdW5kOiBjdXJyZW50Q29sb3JBbHBoYX1cIj5cclxuXHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWlucHV0XCI+XHJcbiAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICBsaWJOZ3hUVGl0YW5Db2xvclBpY2tlcklucHV0XHJcbiAgICAgICAgICAjcGlja2VySW5wdXQ9XCJsaWJOZ3hUVGl0YW5Db2xvclBpY2tlcklucHV0XCJcclxuICAgICAgICAgIChpbnB1dENoYW5nZSk9XCJpbnB1dENvbG9yQ2hhbmdlKCRldmVudClcIlxyXG4gICAgICAgICAgW2Zvcm1hdF09XCJpbnB1dEZvcm1hdFwiXHJcbiAgICAgICAgICBbaWRdPVwidXVpZFwiXHJcbiAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAoZm9jdXMpPVwib3BlblBpY2tlcigpXCJcclxuICAgICAgICAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPCEtLTxkaXYgY2xhc3M9XCJwaWNrZXItc2F2ZS1zaWduXCI+LS0+XHJcbiAgICAgIDwhLS1TLS0+XHJcbiAgICAgIDwhLS08L2Rpdj4tLT5cclxuICAgIDwvZGl2PlxyXG5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJcIiBbbmdDbGFzc109XCJ7J25vLWFscGhhJzogIWFscGhhLCAnb3Blbic6IHBpY2tlck9wZW59XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX01haW5Db2xvclwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0NvbG9yTGF5ZXJcIiBbbmdTdHlsZV09XCJ7YmFja2dyb3VuZENvbG9yOiBjdXJyZW50Q29sb3JNYXh9XCIgPjwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX1NsaWRhYmxlXCIgbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvciAjbWFpbkNvbG9yPVwibGliTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvclwiIChjaGFuZ2UpPVwiY29sb3JQaWNrZXJTZXJ2aWNlLnNhdHVyYXRpb25DaGFuZ2UoJGV2ZW50LCB0aGlzKVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fRHJhZ2dlclwiIGxpYk5neFRUaXRhbkNvbG9yUGlja2VyRHJhZ2dlciBzdHlsZT1cInRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAwcHgsIDBweCk7XCI+PC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0h1ZVBpY2tlclwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX1NsaWRhYmxlXCIgIGxpYk5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3IgI2h1ZVBpY2tlcj1cImxpYk5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JcIiAoY2hhbmdlKT1cImNvbG9yUGlja2VyU2VydmljZS5odWVDaGFuZ2UoJGV2ZW50LCB0aGlzKVwiIFtkaXJlY3Rpb25dPVwiJ3ZlcnRpY2FsJ1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fRHJhZ2dlclwiIGxpYk5neFRUaXRhbkNvbG9yUGlja2VyRHJhZ2dlciBbcGlja2VyUGFkXT1cIjBcIiBzdHlsZT1cIiB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDBweCwgMHB4LCAwcHgpO1wiPjwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19BbHBoYVBpY2tlclwiICpuZ0lmPVwiYWxwaGEgPT09IHRydWVcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19Db2xvckxheWVyXCJcclxuXHJcbiAgICAgICAgICAgW25nU3R5bGVdPVwie2JhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQodG8gdG9wLCAnICsgY3VycmVudENvbG9yQWxwaGFaZXJvICsgJyAgMThweCwgJyArIGN1cnJlbnRDb2xvciArICcgY2FsYygxMDAlIC0gMThweCknfVwiXHJcbiAgICAgID48L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19TbGlkYWJsZVwiICBsaWJOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yICNhbHBoYVBpY2tlcj1cImxpYk5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JcIiAoY2hhbmdlKT1cImNvbG9yUGlja2VyU2VydmljZS5hbHBoYUNoYW5nZSgkZXZlbnQsIHRoaXMpXCIgW2RpcmVjdGlvbl09XCIndmVydGljYWwnXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19EcmFnZ2VyXCIgbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyIFtwaWNrZXJQYWRdPVwiMFwiIHN0eWxlPVwiIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAwcHgsIDBweCk7XCI+PC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8IS0tPGRpdiBzdHlsZT1cImhlaWdodDogNDBweDsgd2lkdGg6IDQwcHhcIiBbbmdTdHlsZV09XCJ7YmFja2dyb3VuZDogY3VycmVudENvbG9yfVwiPi0tPlxyXG5cclxuICAgIDwhLS08L2Rpdj4tLT5cclxuICAgIDwhLS08ZGl2IHN0eWxlPVwiaGVpZ2h0OiA0MHB4OyB3aWR0aDogNDBweFwiIFtuZ1N0eWxlXT1cIntiYWNrZ3JvdW5kOiBjdXJyZW50Q29sb3JBbHBoYX1cIj4tLT5cclxuXHJcbiAgICA8IS0tPC9kaXY+LS0+XHJcbiAgPC9kaXY+XHJcbiAgPGxpYi1uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1wYWxldHRlLWxpc3RcclxuICAgIChjaGFuZ2UpPVwiaW5wdXRDb2xvckNoYW5nZSgkZXZlbnQpXCJcclxuICAgIFtwYWxsZXRzXT1cInBpY2tlclBhbGxldHNcIlxyXG4gID5cclxuXHJcbiAgPC9saWItbmd4LXR0aXRhbi1jb2xvci1waWNrZXItcGFsZXR0ZS1saXN0PlxyXG48L2Rpdj5cclxuXHJcbmAsXG4gIHN0eWxlczogW2A6aG9zdCAqLDpob3N0IDphZnRlciw6aG9zdCA6YmVmb3Jle2JveC1zaXppbmc6Ym9yZGVyLWJveH06aG9zdCAuZGVidWctb3V0cHV0e3dpZHRoOjEwMCU7aGVpZ2h0OjIwcHh9Omhvc3QgLnBpY2tlci1pbnB1dC13cmFwcGVye21hcmdpbi1ib3R0b206NnB4fTpob3N0IC5waWNrZXItaW5wdXQtd3JhcHBlciAucGlja2VyLWlucHV0LWxhYmVse21hcmdpbi1ib3R0b206NnB4fTpob3N0IC5waWNrZXItaW5wdXQtd3JhcHBlciAucGlja2VyLWlucHV0LWxhYmVsIGxhYmVse3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtmb250LXdlaWdodDo2MDB9Omhvc3QgLnBpY2tlci1pbnB1dC13cmFwcGVyIC5waWNrZXItaW5wdXQtaG9sZGVye2Rpc3BsYXk6ZmxleDtoZWlnaHQ6MzNweDtib3JkZXI6MXB4IHNvbGlkICNiYmI7b3ZlcmZsb3c6aGlkZGVuO2JvcmRlci1yYWRpdXM6M3B4O2JhY2tncm91bmQtY29sb3I6I2VlZX06aG9zdCAucGlja2VyLWlucHV0LXdyYXBwZXIgLnBpY2tlci1pbnB1dC1ob2xkZXIgLnBpY2tlci1jb2xvcntmbGV4OjAgMCAzMXB4O2JhY2tncm91bmQtY29sb3I6I2ZmMDMwMH06aG9zdCAucGlja2VyLWlucHV0LXdyYXBwZXIgLnBpY2tlci1pbnB1dC1ob2xkZXIgLnBpY2tlci1pbnB1dHtmbGV4OmF1dG87YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudH06aG9zdCAucGlja2VyLWlucHV0LXdyYXBwZXIgLnBpY2tlci1pbnB1dC1ob2xkZXIgLnBpY2tlci1pbnB1dCBpbnB1dHtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O2NvbG9yOiMyNzI3Mjc7Zm9udC1mYW1pbHk6bW9ub3NwYWNlO2ZvbnQtc2l6ZToxNHB4O2JvcmRlcjpub25lO291dGxpbmU6MDtwYWRkaW5nOjhweCAycHggOHB4IDhweDt3aWR0aDoxMDAlfTpob3N0IC5waWNrZXItaW5wdXQtd3JhcHBlciAucGlja2VyLWlucHV0LWhvbGRlciAucGlja2VyLXNhdmUtc2lnbntmbGV4OjAgMCAzMXB4O2xpbmUtaGVpZ2h0OjMzcHg7dGV4dC1hbGlnbjpjZW50ZXJ9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2Vye21heC1oZWlnaHQ6MDtvdmVyZmxvdzpoaWRkZW47LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lO2Rpc3BsYXk6ZmxleDt0cmFuc2l0aW9uOm1heC1oZWlnaHQgLjNzfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci5vcGVue21hcmdpbi1ib3R0b206NXB4O21heC1oZWlnaHQ6MTY1cHh9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19Db2xvckxheWVye3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MTA7dG9wOjA7bGVmdDowO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7Ym94LXNoYWRvdzppbnNldCAwIDAgMnB4IDAgcmdiYSgwLDAsMCwuNSk7cG9pbnRlci1ldmVudHM6bm9uZX06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX1NsaWRhYmxle2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7Y3Vyc29yOnBvaW50ZXJ9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19EcmFnZ2Vye3Bvc2l0aW9uOnJlbGF0aXZlO3otaW5kZXg6MzA7Ym90dG9tOi45cmVtOy13ZWJraXQtdHJhbnNmb3JtOm5vbmU7dHJhbnNmb3JtOm5vbmU7aGVpZ2h0OjE4cHg7d2lkdGg6MThweDttYXJnaW46MCBhdXRvOy13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW47YmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW47d2lsbC1jaGFuZ2U6dHJhbnNmb3JtO2JhY2tncm91bmQ6MCAwO2JvcmRlcjozcHggc29saWQgI2ZmZjtib3gtc2hhZG93OjAgMCAwIDFweCByZ2JhKDYsNDQsODIsLjEpLDAgMnB4IDE2cHggcmdiYSgzMyw0Myw1NCwuMDgpLGluc2V0IDAgMCAwIDFweCByZ2JhKDYsNDQsODIsLjEpLDAgMnB4IDE2cHggcmdiYSgzMyw0Myw1NCwuMDgpO2JvcmRlci1yYWRpdXM6NTAlO3BvaW50ZXItZXZlbnRzOm5vbmU7dG91Y2gtYWN0aW9uOm5vbmV9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19NYWluQ29sb3J7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQoNDVkZWcsI2RmZTNlOCAyNSUsdHJhbnNwYXJlbnQgMCksbGluZWFyLWdyYWRpZW50KC00NWRlZywjZGZlM2U4IDI1JSx0cmFuc3BhcmVudCAwKSxsaW5lYXItZ3JhZGllbnQoNDVkZWcsdHJhbnNwYXJlbnQgNzUlLCNkZmUzZTggMCksbGluZWFyLWdyYWRpZW50KC00NWRlZyx0cmFuc3BhcmVudCA3NSUsI2RmZTNlOCAwKTtiYWNrZ3JvdW5kLXNpemU6MS42cmVtIDEuNnJlbTtiYWNrZ3JvdW5kLXBvc2l0aW9uOjAgMCwwIC44cmVtLC44cmVtIC0uOHJlbSwtLjhyZW0gMDtwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW47d2lkdGg6MTY1cHg7aGVpZ2h0OjE2NXB4O2JvcmRlci1yYWRpdXM6NHB4O2N1cnNvcjpwb2ludGVyfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fTWFpbkNvbG9yIC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fQ29sb3JMYXllcntib3gtc2hhZG93Omluc2V0IDAgMCAwIDFweCByZ2JhKDYsNDQsODIsLjEpLDAgMnB4IDE2cHggcmdiYSgzMyw0Myw1NCwuMDgpO2JvcmRlci1yYWRpdXM6NHB4fTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fTWFpbkNvbG9yIC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fRHJhZ2dlcntyaWdodDouOXJlbTttYXJnaW46MH06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX01haW5Db2xvcjphZnRlciw6aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX01haW5Db2xvcjpiZWZvcmV7Y29udGVudDpcIlwiO3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MjA7dG9wOjA7bGVmdDowO2Rpc3BsYXk6YmxvY2s7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTtwb2ludGVyLWV2ZW50czpub25lO2JvcmRlci1yYWRpdXM6M3B4fTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fTWFpbkNvbG9yOmJlZm9yZXtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCg5MGRlZywjZmZmLHRyYW5zcGFyZW50KX06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX01haW5Db2xvcjphZnRlcntiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudCgwZGVnLCMwMDAsdHJhbnNwYXJlbnQpO2JveC1zaGFkb3c6aW5zZXQgMCAwIDAgMXB4IHJnYmEoNiw0NCw4MiwuMSksMCAycHggMTZweCByZ2JhKDMzLDQzLDU0LC4wOCl9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19BbHBoYVBpY2tlciw6aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0h1ZVBpY2tlcntwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW47aGVpZ2h0OjE2NXB4O3dpZHRoOjI0cHg7bWFyZ2luLWxlZnQ6LjhyZW07Ym9yZGVyLXdpZHRoOjNweDtib3JkZXItcmFkaXVzOjhyZW07cGFkZGluZzoxM3B4IDB9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19IdWVQaWNrZXJ7YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLHJlZCAwLCNmZjAgMjElLCMwZjAgMzMlLCMwZmYgNTAlLCMwMGYgNjclLCNmMGYgODMlLHJlZCAxMDAlKTtib3gtc2hhZG93Omluc2V0IDAgMCAycHggMCByZ2JhKDAsMCwwLC41KX06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0FscGhhUGlja2Vye2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KDQ1ZGVnLCNkZmUzZTggMjUlLHRyYW5zcGFyZW50IDApLGxpbmVhci1ncmFkaWVudCgtNDVkZWcsI2RmZTNlOCAyNSUsdHJhbnNwYXJlbnQgMCksbGluZWFyLWdyYWRpZW50KDQ1ZGVnLHRyYW5zcGFyZW50IDc1JSwjZGZlM2U4IDApLGxpbmVhci1ncmFkaWVudCgtNDVkZWcsdHJhbnNwYXJlbnQgNzUlLCNkZmUzZTggMCk7YmFja2dyb3VuZC1zaXplOjEuNnJlbSAxLjZyZW07YmFja2dyb3VuZC1wb3NpdGlvbjowIDAsMCAuOHJlbSwuOHJlbSAtLjhyZW0sLS44cmVtIDB9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19BbHBoYVBpY2tlciAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0NvbG9yTGF5ZXJ7Ym9yZGVyLXJhZGl1czo4cmVtfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci5uby1hbHBoYSAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX01haW5Db2xvcnt3aWR0aDoyMDBweH1gXSxcbn0pXG5leHBvcnQgY2xhc3MgTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSkgY29tcG9uZW50Q2xpY2soJGV2ZW50KSB7XG4gICAgaWYoIXRoaXMucGlja2VyT3Blbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZih0eXBlb2YgJGV2ZW50LnBhdGggIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIGxldCBwaWNrZXJGb3VuZCA9IGZhbHNlO1xuICAgICAgJGV2ZW50LnBhdGguZXZlcnkoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICBpZihcbiAgICAgICAgICB0eXBlb2YgaXRlbS5jbGFzc0xpc3QgIT09IFwidW5kZWZpbmVkXCJcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYoXG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5jb250YWlucygncGlja2VyLWlucHV0LWhvbGRlcicpIHx8XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5jb250YWlucygnbmd4LXR0aXRhbi1jb2xvci1waWNrZXInKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcGlja2VyRm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSk7XG5cbiAgICAgIGlmKCFwaWNrZXJGb3VuZCkge1xuICAgICAgICB0aGlzLmNsb3NlUGlja2VyKCk7XG4gICAgICB9XG5cbiAgICB9XG4gIH1cblxuICBASW5wdXQoJ2FscGhhJykgcHVibGljIGFscGhhOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgnZGVidWcnKSBwdWJsaWMgZGVidWc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCdjb2xvcicpIHB1YmxpYyBjb2xvcjogc3RyaW5nID0gJ3JnYmEoMjU1LDI1NSwyNTUsMCknO1xuICBASW5wdXQoJ3RpdGxlJykgcHVibGljIHRpdGxlOiBzdHJpbmcgPSAndGl0bGUnO1xuICBASW5wdXQoJ291dEZvcm1hdCcpIHB1YmxpYyBvdXRGb3JtYXQ6IHN0cmluZyA9ICdoZXg2JztcbiAgQElucHV0KCdpbnB1dEZvcm1hdCcpIHB1YmxpYyBpbnB1dEZvcm1hdDogc3RyaW5nID0gJ2hleDYnO1xuICBASW5wdXQoJ2F2YWlsUGFsbGV0cycpIHB1YmxpYyBhdmFpbFBhbGxldHM6IEFycmF5PHN0cmluZz4gPSBbJ3BvbGFyaXMnLCAnbWF0ZXJpYWwnXTtcbiAgQElucHV0KCdjdXN0b21QYWxsZXRzJykgcHVibGljIGN1c3RvbVBhbGxldHM6ICBBcnJheTxQYWxldHRlPiA9IFtdO1xuICBAT3V0cHV0KCdjb2xvckNoYW5nZWQnKSBwdWJsaWMgY29sb3JDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIEBWaWV3Q2hpbGQoJ3BpY2tlcklucHV0JykgcHVibGljIHBpY2tlcklucHV0OiBOZ3hUVGl0YW5Db2xvclBpY2tlcklucHV0RGlyZWN0aXZlO1xuXG4gIEBWaWV3Q2hpbGQoTmd4VFRpdGFuQ29sb3JQaWNrZXJQYWxldHRlTGlzdENvbXBvbmVudCkgcHVibGljIHBhbGV0dGVMaXN0OiBOZ3hUVGl0YW5Db2xvclBpY2tlclBhbGV0dGVMaXN0Q29tcG9uZW50O1xuXG4gIEBWaWV3Q2hpbGQoJ21haW5Db2xvcicpIHB1YmxpYyBtYWluQ29sb3I6IE5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JEaXJlY3RpdmU7XG4gIEBWaWV3Q2hpbGQoJ2h1ZVBpY2tlcicpIHB1YmxpYyBodWVQaWNrZXI6IE5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JEaXJlY3RpdmU7XG4gIEBWaWV3Q2hpbGQoJ2FscGhhUGlja2VyJykgcHVibGljIGFscGhhUGlja2VyOiBOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yRGlyZWN0aXZlO1xuXG5cbiAgcHVibGljIGNvbG9ySW5pdDogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgcGlja2VyT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHB1YmxpYyBwaWNrZXJQYWxsZXRzOiBBcnJheTxQYWxldHRlPiA9IFtdO1xuXG4gIHB1YmxpYyBoc3ZhOiBIU1ZBID0ge1xuICAgIGh1ZTogMCxcbiAgICBzYXR1cmF0aW9uOiAxMDAsXG4gICAgdmFsdWU6IDEwMCxcbiAgICBhbHBoYTogMVxuICB9O1xuXG4gIHB1YmxpYyBjdXJyZW50Q29sb3I6IHN0cmluZyA9ICdyZ2IoMjU1LDAsMCknO1xuICBwdWJsaWMgY3VycmVudENvbG9yTWF4OiBzdHJpbmcgPSAncmdiYSgyNTUsMCwwLDEpJztcbiAgcHVibGljIGN1cnJlbnRDb2xvckFscGhhOiBzdHJpbmcgPSAncmdiYSgyNTUsMCwwLDEpJztcbiAgcHVibGljIGN1cnJlbnRDb2xvckFscGhhWmVybzogc3RyaW5nID0gJ3JnYmEoMjU1LDAsMCwwKSc7XG5cbiAgcHVibGljIHV1aWQ6IHN0cmluZyA9ICdwaWNrZXItJztcblxuICBwdWJsaWMgYWxsb3dlZEZvcm1hdHM6IEFycmF5PHN0cmluZz4gPSBbJ2hleDYnLCAnaGV4OCcsICdyZ2InLCAncmdiYSddO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBjb2xvclBpY2tlclNlcnZpY2U6IE5neFRUaXRhbkNvbG9yUGlja2VyU2VydmljZSxcbiAgICBwdWJsaWMgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHtcbiAgICB0aGlzLnV1aWQgPSB0aGlzLmNvbG9yUGlja2VyU2VydmljZS5nZXRQaWNrZXJVdWlkKCk7XG5cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY29sb3JQaWNrZXJTZXJ2aWNlLmRlYnVnID0gdGhpcy5kZWJ1ZztcbiAgICB0aGlzLnZhbGlkYXRlSW5wdXRQYXJhbXMoKTtcbiAgICB0aGlzLmNvbG9yUGlja2VyU2VydmljZS5wcmVwYXJlUGlja2VyUGFsbGV0cyh0aGlzLmF2YWlsUGFsbGV0cywgdGhpcy5jdXN0b21QYWxsZXRzLCB0aGlzKTtcbiAgICB0aGlzLmNvbG9yUGlja2VyU2VydmljZS5jb2xvclRvRGF0YSh0aGlzLmNvbG9yLCB0aGlzKTtcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnNldERyYWdnZXNUb0N1cnJlbnRDb2xvcigpO1xuICB9XG5cbiAgb3BlblBpY2tlcigpIHtcbiAgICB0aGlzLnBpY2tlck9wZW4gPSB0cnVlO1xuICAgIGlmKHR5cGVvZiB0aGlzLnBhbGV0dGVMaXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5wYWxldHRlTGlzdC5jbG9zZVBhbGV0dGUoKTtcbiAgICB9XG4gICAgaWYodHlwZW9mIHRoaXMubWFpbkNvbG9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5tYWluQ29sb3IuZXZlbnRzU3Vic2NpYmUoKTtcbiAgICB9XG4gICAgaWYodHlwZW9mIHRoaXMuaHVlUGlja2VyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5odWVQaWNrZXIuZXZlbnRzU3Vic2NpYmUoKTtcbiAgICB9XG4gICAgaWYodHlwZW9mIHRoaXMuYWxwaGFQaWNrZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLmFscGhhUGlja2VyLmV2ZW50c1N1YnNjaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgY2xvc2VQaWNrZXIoKSB7XG4gICAgaWYodHlwZW9mIHRoaXMubWFpbkNvbG9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5tYWluQ29sb3IuZXZlbnRzVW5TdWJzY2liZSgpO1xuICAgIH1cbiAgICBpZih0eXBlb2YgdGhpcy5odWVQaWNrZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLmh1ZVBpY2tlci5ldmVudHNVblN1YnNjaWJlKCk7XG4gICAgfVxuICAgIGlmKHR5cGVvZiB0aGlzLmFscGhhUGlja2VyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5hbHBoYVBpY2tlci5ldmVudHNVblN1YnNjaWJlKCk7XG4gICAgfVxuICAgIHRoaXMucGlja2VyT3BlbiA9IGZhbHNlO1xuICB9XG5cbiAgdmFsaWRhdGVJbnB1dFBhcmFtcygpIHtcbiAgICBpZih0aGlzLmFsbG93ZWRGb3JtYXRzLmluZGV4T2YodGhpcy5vdXRGb3JtYXQpID09PSAtMSkge1xuICAgICAgdGhpcy5vdXRGb3JtYXQgPSAnaGV4Nic7XG4gICAgICBjb25zb2xlLmdyb3VwKFwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJcIik7XG4gICAgICBjb25zb2xlLndhcm4oJ1tvdXRGb3JtYXRdIG11c3QgYmUgb25lIG9mIHRoaXMgKCcgKyB0aGlzLmFsbG93ZWRGb3JtYXRzLmpvaW4oJywnKSArICcpJyk7XG4gICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gICAgfVxuICAgIGlmKHRoaXMuYWxsb3dlZEZvcm1hdHMuaW5kZXhPZih0aGlzLmlucHV0Rm9ybWF0KSA9PT0gLTEpIHtcbiAgICAgIHRoaXMuaW5wdXRGb3JtYXQgPSB0aGlzLm91dEZvcm1hdCArICcnO1xuICAgICAgY29uc29sZS5ncm91cChcIm5neC10dGl0YW4tY29sb3ItcGlja2VyXCIpO1xuICAgICAgY29uc29sZS53YXJuKCdbaW5wdXRGb3JtYXRdIG11c3QgYmUgb25lIG9mIHRoaXMgKCcgKyB0aGlzLmFsbG93ZWRGb3JtYXRzLmpvaW4oJywnKSArICcpJyk7XG4gICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gICAgfVxuICB9XG5cblxuICBpbnB1dENvbG9yQ2hhbmdlKGNvbG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgdGhpcy5jb2xvclBpY2tlclNlcnZpY2UuY29sb3JUb0RhdGEodGhpcy5jb2xvciwgdGhpcyk7XG4gICAgdGhpcy5zZXREcmFnZ2VzVG9DdXJyZW50Q29sb3IoKTtcbiAgfVxuXG4gIHVwZGF0ZVJldHVybkNvbG9yKCkge1xuICAgIHRoaXMuY29sb3IgPSB0aGlzLmNvbG9yUGlja2VyU2VydmljZS5wcmVwYXJlUmV0dXJuQ29sb3IodGhpcy5oc3ZhLCB0aGlzLm91dEZvcm1hdCk7XG5cbiAgICBpZih0aGlzLmNvbG9ySW5pdCkge1xuICAgICAgdGhpcy5jb2xvckNoYW5nZWQuZW1pdCh0aGlzLmNvbG9yICsgJycpO1xuICAgIH1cbiAgICB0aGlzLmNvbG9ySW5pdCA9IHRydWU7XG4gIH1cblxuXG4gIHNldElucHV0VmFsdWUoKSB7XG4gICAgaWYodHlwZW9mIHRoaXMucGlja2VySW5wdXQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLnBpY2tlcklucHV0LnNldElucHV0VmFsdWUoXG4gICAgICAgIHRoaXMuY29sb3JQaWNrZXJTZXJ2aWNlLnByZXBhcmVSZXR1cm5Db2xvcih0aGlzLmhzdmEsIHRoaXMuaW5wdXRGb3JtYXQpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHNldERyYWdnZXNUb0N1cnJlbnRDb2xvcigpIHtcblxuICAgIGlmKHR5cGVvZiB0aGlzLm1haW5Db2xvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMubWFpbkNvbG9yLnNldERyYWdnZXIoXG4gICAgICAgIHtcbiAgICAgICAgICB4OiB0aGlzLmhzdmEuc2F0dXJhdGlvbixcbiAgICAgICAgICB5OiAxMDAgLSB0aGlzLmhzdmEudmFsdWVcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZih0eXBlb2YgdGhpcy5odWVQaWNrZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLmh1ZVBpY2tlci5zZXREcmFnZ2VyKHt4OiAwLCB5OiBNYXRoLnJvdW5kKHRoaXMuaHN2YS5odWUgKiAxMDAgLyAzNjApfSk7XG4gICAgfVxuXG4gICAgaWYodHlwZW9mIHRoaXMuYWxwaGFQaWNrZXIgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuYWxwaGEpIHtcbiAgICAgIHRoaXMuYWxwaGFQaWNrZXIuc2V0RHJhZ2dlcih7eDogMCwgeTogMTAwIC0gKHRoaXMuaHN2YS5hbHBoYSAqIDEwMCl9KTtcbiAgICB9XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL25neC10dGl0YW4tY29sb3ItcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yRGlyZWN0aXZlIH0gZnJvbSAnLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1zZWxlY3Rvci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyRGlyZWN0aXZlIH0gZnJvbSAnLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1kcmFnZ2VyLmRpcmVjdGl2ZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgTmd4VFRpdGFuQ29sb3JQaWNrZXJJbnB1dERpcmVjdGl2ZSB9IGZyb20gJy4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXItaW5wdXQuZGlyZWN0aXZlJztcbmltcG9ydCB7IE5neFRUaXRhbkNvbG9yUGlja2VyUGFsZXR0ZUxpc3RDb21wb25lbnQgfSBmcm9tICcuL25neC10dGl0YW4tY29sb3ItcGlja2VyLXBhbGV0dGUtbGlzdC9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1wYWxldHRlLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7Tmd4VFRpdGFuQ29sb3JQaWNrZXJTZXJ2aWNlfSBmcm9tIFwiLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci5zZXJ2aWNlXCI7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQsXG4gICAgTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvckRpcmVjdGl2ZSxcbiAgICBOZ3hUVGl0YW5Db2xvclBpY2tlckRyYWdnZXJEaXJlY3RpdmUsXG4gICAgTmd4VFRpdGFuQ29sb3JQaWNrZXJJbnB1dERpcmVjdGl2ZSxcbiAgICBOZ3hUVGl0YW5Db2xvclBpY2tlclBhbGV0dGVMaXN0Q29tcG9uZW50LFxuICBdLFxuICBleHBvcnRzOiBbTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtcbiAgICBOZ3hUVGl0YW5Db2xvclBpY2tlclNlcnZpY2VcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hUVGl0YW5Db2xvclBpY2tlck1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7OztJQStCRTtxQkFUd0IsS0FBSzswQkFDTSxFQUFFO3VCQUNKLEVBQUU7UUFRakMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDOzs7Ozs7OztLQVN4Qjs7Ozs7O0lBRUQsc0RBQWdCOzs7OztJQUFoQixVQUFpQixPQUFzQixFQUFFLGVBQThDO1FBQ3JGLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDNUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQ25DOzs7Ozs7SUFFRCwrQ0FBUzs7Ozs7SUFBVCxV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RUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUztnQkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO2dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUztnQkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO2dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUztnQkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO2dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUztnQkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO2dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUztnQkFDeEosU0FBUyxFQUFF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