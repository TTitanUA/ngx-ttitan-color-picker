import { Injectable, Directive, ElementRef, Input, ContentChild, EventEmitter, HostListener, Output, Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, NgModule } from '@angular/core';
import { fromEvent } from 'rxjs/index';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgxTTitanColorPickerService {
    constructor() {
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
    saturationChange(percent, pickerComponent) {
        pickerComponent.hsva.saturation = percent.x;
        pickerComponent.hsva.value = (100 - percent.y);
        this.dataToColor(pickerComponent);
    }
    /**
     * @param {?} percent
     * @param {?} pickerComponent
     * @return {?}
     */
    hueChange(percent, pickerComponent) {
        pickerComponent.hsva.hue = Math.round(360 * percent.y / 100);
        this.dataToColor(pickerComponent);
    }
    /**
     * @param {?} percent
     * @param {?} pickerComponent
     * @return {?}
     */
    alphaChange(percent, pickerComponent) {
        pickerComponent.hsva.alpha = (100 - percent.y) / 100;
        this.dataToColor(pickerComponent);
    }
    /**
     * @param {?} pickerComponent
     * @return {?}
     */
    dataToColor(pickerComponent) {
        let /** @type {?} */ rgbaArr = this.hsvaToRgba(pickerComponent.hsva.hue, pickerComponent.hsva.saturation, pickerComponent.hsva.value, pickerComponent.hsva.alpha);
        let /** @type {?} */ rgbaMaxArr = this.hsvaToRgba(pickerComponent.hsva.hue, 100, 100, pickerComponent.hsva.alpha);
        pickerComponent.currentColor = 'rgb(' + rgbaArr[0] + ',' + rgbaArr[1] + ',' + rgbaArr[2] + ')';
        pickerComponent.currentColorMax = 'rgba(' + rgbaMaxArr[0] + ',' + rgbaMaxArr[1] + ',' + rgbaMaxArr[2] + ',' + rgbaMaxArr[3] + ')';
        pickerComponent.currentColorAlpha = 'rgba(' + rgbaArr[0] + ',' + rgbaArr[1] + ',' + rgbaArr[2] + ',' + rgbaArr[3] + ')';
        pickerComponent.currentColorAlphaZero = 'rgba(' + rgbaArr[0] + ',' + rgbaArr[1] + ',' + rgbaArr[2] + ',0)';
        pickerComponent.setInputValue();
        pickerComponent.updateReturnColor();
    }
    /**
     * @param {?} color
     * @param {?} pickerComponent
     * @return {?}
     */
    colorToData(color, pickerComponent) {
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
    }
    /**
     * @return {?}
     */
    getPickerUuid() {
        let /** @type {?} */ pickerId = '';
        for (let /** @type {?} */ i = 0; i < 1000; i++) {
            pickerId = 'picker-' + this.pickerList.length + '-' + i;
            if (this.pickerList.indexOf(pickerId) === -1) {
                this.pickerList.push(pickerId);
                return pickerId;
            }
        }
    }
    /**
     * @param {?} color
     * @return {?}
     */
    detectColorType(color) {
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
    }
    /**
     * @param {?} hsvaArr
     * @param {?} pickerComponent
     * @return {?}
     */
    fillValuesFromHsvaArr(hsvaArr, pickerComponent) {
        pickerComponent.hsva.hue = hsvaArr[0];
        pickerComponent.hsva.saturation = hsvaArr[1];
        pickerComponent.hsva.value = hsvaArr[2];
        pickerComponent.hsva.alpha = hsvaArr[3];
    }
    /**
     * @param {?} color
     * @param {?} pickerComponent
     * @return {?}
     */
    parseRgbaColor(color, pickerComponent) {
        let /** @type {?} */ aus = color.replace('rgba(', '').replace(')', '');
        let /** @type {?} */ aus2 = aus.split(',');
        if (aus2.length == 4) {
            this.fillValuesFromHsvaArr(this.rgbaToHsva(parseInt(aus2[0]), parseInt(aus2[1]), parseInt(aus2[2]), parseInt(aus2[3])), pickerComponent);
        }
    }
    /**
     * @param {?} color
     * @param {?} pickerComponent
     * @return {?}
     */
    parseRgbColor(color, pickerComponent) {
        let /** @type {?} */ aus = color.replace('rgb(', '').replace(')', '');
        let /** @type {?} */ aus2 = aus.split(',');
        if (aus2.length == 3) {
            this.fillValuesFromHsvaArr(this.rgbaToHsva(parseInt(aus2[0]), parseInt(aus2[1]), parseInt(aus2[2]), 1), pickerComponent);
        }
    }
    /**
     * @param {?} color
     * @param {?} pickerComponent
     * @return {?}
     */
    parseHslaColor(color, pickerComponent) {
        let /** @type {?} */ aus = color.replace('hsla(', '').replace(')', '').replace('%', '');
        let /** @type {?} */ aus2 = aus.split(',');
        if (aus2.length == 4) {
            this.fillValuesFromHsvaArr(this.hslaToHsva(parseInt(aus2[0]), parseInt(aus2[1]), parseInt(aus2[2]), parseInt(aus2[3])), pickerComponent);
        }
    }
    /**
     * @param {?} color
     * @param {?} pickerComponent
     * @return {?}
     */
    parseHslColor(color, pickerComponent) {
        let /** @type {?} */ aus = color.replace('hsl(', '').replace(')', '').replace('%', '');
        let /** @type {?} */ aus2 = aus.split(',');
        if (aus2.length == 3) {
            this.fillValuesFromHsvaArr(this.hslaToHsva(parseInt(aus2[0]), parseInt(aus2[1]), parseInt(aus2[2]), 1), pickerComponent);
        }
    }
    /**
     * @param {?} color
     * @param {?} pickerComponent
     * @return {?}
     */
    parseHexColor(color, pickerComponent) {
        let /** @type {?} */ aus = color.replace('#', '');
        this.fillValuesFromHsvaArr(this.hexToHsva(aus), pickerComponent);
    }
    /**
     * @param {?} H
     * @param {?} S
     * @param {?} V
     * @param {?} A
     * @return {?}
     */
    hsvaToRgba(H, S, V, A) {
        let /** @type {?} */ f, /** @type {?} */ p, /** @type {?} */ q, /** @type {?} */ t, /** @type {?} */ lH, /** @type {?} */ R, /** @type {?} */ G, /** @type {?} */ B;
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
    }
    /**
     * @param {?} H
     * @param {?} S
     * @param {?} V
     * @param {?} A
     * @param {?=} showAlpha
     * @return {?}
     */
    hsvaToRgbaString(H, S, V, A, showAlpha = false) {
        let /** @type {?} */ colorArr = this.hsvaToRgba(H, S, V, A);
        if (showAlpha) {
            return 'rgba(' + colorArr.join(',') + ')';
        }
        colorArr.pop();
        return 'rgb(' + colorArr.join(',') + ')';
    }
    /**
     * @param {?} r
     * @param {?} g
     * @param {?} b
     * @param {?} a
     * @return {?}
     */
    rgbaToHsva(r, g, b, a) {
        r /= 255;
        g /= 255;
        b /= 255;
        let /** @type {?} */ max = Math.max(r, g, b), /** @type {?} */ min = Math.min(r, g, b);
        let /** @type {?} */ h, /** @type {?} */ s, /** @type {?} */ v = max;
        let /** @type {?} */ d = max - min;
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
    }
    /**
     * @param {?} h
     * @param {?} s
     * @param {?} v
     * @param {?} a
     * @return {?}
     */
    hsvaToHsla(h, s, v, a) {
        s /= 100;
        v /= 100;
        return [
            Math.round(h),
            Math.round((s * v / ((h = (2 - s) * v) < 1 ? h : 2 - h)) * 100),
            Math.round((h / 2) * 100),
            a
        ];
    }
    /**
     * @param {?} h
     * @param {?} s
     * @param {?} l
     * @param {?} a
     * @return {?}
     */
    hslaToHsva(h, s, l, a) {
        s /= 100;
        l /= 100;
        s *= l < .5 ? l : 1 - l;
        return [
            h,
            Math.round((2 * s / (l + s)) * 100),
            Math.round((l + s) * 100),
            a
        ];
    }
    /**
     * @param {?} hex
     * @return {?}
     */
    hexToHsva(hex) {
        let /** @type {?} */ rgba = [0, 0, 0, 1];
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
    }
    /**
     * @param {?} H
     * @param {?} S
     * @param {?} V
     * @param {?} A
     * @param {?=} showAlpha
     * @return {?}
     */
    hsvaToHex(H, S, V, A, showAlpha = true) {
        let /** @type {?} */ rgba = this.hsvaToRgba(H, S, V, A);
        let /** @type {?} */ hA = ((showAlpha) ? (rgba[3] * 255).toString(16).substring(0, 2) : '');
        if (showAlpha) {
            hA = (hA.length == 1) ? hA + hA : hA;
        }
        return '#' +
            ((rgba[2] | rgba[1] << 8 | rgba[0] << 16) | 1 << 24).toString(16).slice(1) +
            hA;
    }
    /**
     * @param {?} value
     * @param {?} format
     * @return {?}
     */
    validateColorFormat(value, format) {
        switch (format) {
            case "hex6": return this.validateHexFormat(value);
            case "hex8": return this.validateHexFormat(value, true);
            case "rgb": return this.validateRgbaFormat(value);
            case "rgba": return this.validateRgbaFormat(value, true);
        }
        return 'notValid';
    }
    /**
     * @param {?} value
     * @param {?=} alpha
     * @return {?}
     */
    validateHexFormat(value, alpha = false) {
        let /** @type {?} */ result = 'notValid';
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
    }
    /**
     * @param {?} value
     * @param {?=} alpha
     * @return {?}
     */
    validateRgbaFormat(value, alpha = false) {
        let /** @type {?} */ result = 'notValid';
        value = value.replace(/[^0-9\,]+/g, "");
        let /** @type {?} */ ausArr = value.split(',');
        let /** @type {?} */ alphaVal = '';
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
    }
    /**
     * @param {?} hsva
     * @param {?} format
     * @return {?}
     */
    prepareReturnColor(hsva, format) {
        switch (format) {
            case "hex6": return this.hsvaToHex(hsva.hue, hsva.saturation, hsva.value, 1, false);
            case "hex8": return this.hsvaToHex(hsva.hue, hsva.saturation, hsva.value, hsva.alpha, true);
            case "rgb": return this.hsvaToRgbaString(hsva.hue, hsva.saturation, hsva.value, 1);
            case "rgba": return this.hsvaToRgbaString(hsva.hue, hsva.saturation, hsva.value, hsva.alpha, true);
        }
        return this.hsvaToHex(hsva.hue, hsva.saturation, hsva.value, 1, false);
    }
    /**
     * @param {?=} availPallets
     * @param {?=} customPallets
     * @param {?=} pickerComponent
     * @return {?}
     */
    preparePickerPallets(availPallets = [], customPallets = [], pickerComponent) {
        this.pallets.forEach((palette) => {
            if (availPallets.indexOf(palette.id) !== -1) {
                pickerComponent.pickerPallets.push(palette);
            }
        });
        customPallets.forEach((palette) => {
            pickerComponent.pickerPallets.push(palette);
        });
    }
    /**
     * @return {?}
     */
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
NgxTTitanColorPickerService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NgxTTitanColorPickerService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgxTTitanColorPickerDraggerDirective {
    /**
     * @param {?} elRef
     */
    constructor(elRef) {
        this.elRef = elRef;
        this.pickerPad = 0;
    }
    /**
     * @param {?} x
     * @param {?} y
     * @param {?} direction
     * @return {?}
     */
    setPosition(x, y, direction) {
        let /** @type {?} */ rect = this.elRef.nativeElement.getBoundingClientRect();
        if (direction == 'vertical' || direction == 'both') {
            this.elRef.nativeElement.style.top = Math.round((y - ((rect.height) / 2))) + 'px';
        }
        if (direction == 'horizontal' || direction == 'both') {
            this.elRef.nativeElement.style.left = Math.round((x - ((rect.width) / 2))) + 'px';
        }
    }
}
NgxTTitanColorPickerDraggerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[libNgxTTitanColorPickerDragger]'
            },] },
];
/** @nocollapse */
NgxTTitanColorPickerDraggerDirective.ctorParameters = () => [
    { type: ElementRef }
];
NgxTTitanColorPickerDraggerDirective.propDecorators = {
    pickerPad: [{ type: Input, args: ['pickerPad',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgxTTitanColorPickerSelectorDirective {
    /**
     * @param {?} elRef
     * @param {?} colorPickerService
     */
    constructor(elRef, colorPickerService) {
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
    onMouseDown($event) {
        this.dragStart = true;
        this.getPosition($event);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.eventsUnSubscibe();
    }
    /**
     * @return {?}
     */
    eventsSubscibe() {
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
        this.globalMouseMove = this.colorPickerService.mouseMoveObservable.subscribe((event) => {
            if (this.dragStart) {
                this.getPosition(/** @type {?} */ (event));
            }
        });
        this.globalMouseUp = this.colorPickerService.mouseUpObservable.subscribe((event) => {
            if (this.dragStart) {
                this.dragStart = false;
                this.getPosition(/** @type {?} */ (event));
            }
        });
    }
    /**
     * @return {?}
     */
    eventsUnSubscibe() {
        if (this.globalMouseMove !== null) {
            this.globalMouseMove.unsubscribe();
        }
        if (this.globalMouseUp !== null) {
            this.globalMouseUp.unsubscribe();
        }
    }
    /**
     * @param {?} persent
     * @return {?}
     */
    setDragger(persent) {
        if (this.dragger === null) {
            return;
        }
        let /** @type {?} */ position = this.getRect(this.el);
        let /** @type {?} */ x = Math.round(((position.width - this.dragger.pickerPad * 2) * persent.x / 100));
        let /** @type {?} */ y = Math.round(((position.height - this.dragger.pickerPad * 2) * persent.y / 100));
        this.dragger.setPosition((x > this.dragger.pickerPad) ? x : this.dragger.pickerPad, (y > this.dragger.pickerPad) ? y : this.dragger.pickerPad, this.direction);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    getPosition($event) {
        let /** @type {?} */ cursorY = $event.pageY;
        let /** @type {?} */ cursorX = $event.pageX;
        let /** @type {?} */ position = this.getRect(this.el);
        let /** @type {?} */ percent = { x: 0, y: 0 };
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
    }
    /**
     * @param {?} elem
     * @return {?}
     */
    getRect(elem) {
        let /** @type {?} */ box = elem.getBoundingClientRect();
        let /** @type {?} */ body = document.body;
        let /** @type {?} */ docEl = document.documentElement;
        let /** @type {?} */ scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        let /** @type {?} */ scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
        let /** @type {?} */ clientTop = docEl.clientTop || body.clientTop || 0;
        let /** @type {?} */ clientLeft = docEl.clientLeft || body.clientLeft || 0;
        return {
            height: box.height,
            left: box.left + scrollLeft - clientLeft,
            top: box.top + scrollTop - clientTop,
            width: box.width,
        };
    }
}
NgxTTitanColorPickerSelectorDirective.decorators = [
    { type: Directive, args: [{
                selector: '[libNgxTTitanColorPickerSelector]',
                exportAs: 'libNgxTTitanColorPickerSelector'
            },] },
];
/** @nocollapse */
NgxTTitanColorPickerSelectorDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgxTTitanColorPickerService }
];
NgxTTitanColorPickerSelectorDirective.propDecorators = {
    direction: [{ type: Input, args: ['direction',] }],
    dragger: [{ type: ContentChild, args: [NgxTTitanColorPickerDraggerDirective,] }],
    change: [{ type: Output, args: ['change',] }],
    onMouseDown: [{ type: HostListener, args: ['mousedown', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgxTTitanColorPickerInputDirective {
    /**
     * @param {?} el
     * @param {?} colorPickerService
     */
    constructor(el, colorPickerService) {
        this.el = el;
        this.colorPickerService = colorPickerService;
        this.format = 'hex6';
        this.inputChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    keyUp() {
        this.inputValidate();
    }
    /**
     * @return {?}
     */
    change() {
        this.inputValidate();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setInputValue(value) {
        (/** @type {?} */ (this.el.nativeElement)).value = value;
    }
    /**
     * @return {?}
     */
    inputValidate() {
        let /** @type {?} */ res = this.colorPickerService.validateColorFormat(this.el.nativeElement.value, this.format);
        if (res !== 'notValid') {
            (/** @type {?} */ (this.el.nativeElement)).value = res;
            this.inputChange.emit(res);
        }
    }
}
NgxTTitanColorPickerInputDirective.decorators = [
    { type: Directive, args: [{
                selector: '[libNgxTTitanColorPickerInput]',
                exportAs: 'libNgxTTitanColorPickerInput'
            },] },
];
/** @nocollapse */
NgxTTitanColorPickerInputDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgxTTitanColorPickerService }
];
NgxTTitanColorPickerInputDirective.propDecorators = {
    format: [{ type: Input, args: ['format',] }],
    inputChange: [{ type: Output, args: ['inputChange',] }],
    keyUp: [{ type: HostListener, args: ['keyup',] }],
    change: [{ type: HostListener, args: ['change',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgxTTitanColorPickerPaletteListComponent {
    constructor() {
        this.pallets = [];
        this.change = new EventEmitter();
        this.activePalette = null;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    closePalette() {
        this.activePalette = null;
    }
    /**
     * @param {?} palette
     * @return {?}
     */
    selectPalette(palette) {
        if (this.activePalette == null) {
            this.activePalette = palette;
        }
        else if (this.activePalette.id !== palette.id) {
            this.activePalette = palette;
        }
    }
    /**
     * @param {?} color
     * @return {?}
     */
    colorSelected(color) {
        this.change.emit(color);
    }
}
NgxTTitanColorPickerPaletteListComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-ngx-ttitan-color-picker-palette-list',
                template: `<div class="picker-palette-wrapper" *ngIf="pallets.length > 0">
  <div class="palette-links">
    <div
      class="palette-link"
      *ngFor="let palette of pallets"
      [ngClass]="{'selected': (activePalette !== null && activePalette.id == palette.id)}"
      (click)="selectPalette(palette)"
    >
      {{palette.name}}
    </div>
  </div>
  <div class="palette-picker-holder" *ngIf="activePalette !== null && activePalette.colors.length > 0">
    <div
      class="palette-color"
      *ngFor="let color of activePalette.colors"
      [ngStyle]="{
        backgroundColor: color
      }"
      (click)="colorSelected(color)"
    >

    </div>
  </div>
</div>
`,
                styles: [`:host .picker-palette-wrapper .palette-links{display:flex;flex-wrap:wrap;margin-bottom:5px}:host .picker-palette-wrapper .palette-links .palette-link{margin-right:5px;border-radius:3px;padding:2px 4px;border:1px solid #ddd;text-transform:uppercase;font-size:10px;font-family:-apple-system,BlinkMacSystemFont,San Francisco,Roboto,Segoe UI,Helvetica Neue,sans-serif;font-weight:600;background-color:#fff;cursor:pointer}:host .picker-palette-wrapper .palette-links .palette-link.selected{background-color:#5e6bc5;color:#fff}:host .picker-palette-wrapper .palette-picker-holder{height:165px;display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:flex-start;align-content:baseline}:host .picker-palette-wrapper .palette-picker-holder .palette-color{cursor:pointer;width:10px;height:10px}`]
            },] },
];
/** @nocollapse */
NgxTTitanColorPickerPaletteListComponent.ctorParameters = () => [];
NgxTTitanColorPickerPaletteListComponent.propDecorators = {
    pallets: [{ type: Input, args: ['pallets',] }],
    change: [{ type: Output, args: ['change',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgxTTitanColorPickerComponent {
    /**
     * @param {?} colorPickerService
     * @param {?} cdr
     */
    constructor(colorPickerService, cdr) {
        this.colorPickerService = colorPickerService;
        this.cdr = cdr;
        this.pickerOpenInStart = false;
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
    componentClick($event) {
        if (!this.pickerOpen) {
            return;
        }
        if (typeof $event.path !== "undefined") {
            let /** @type {?} */ pickerFound = false;
            $event.path.every(function (item) {
                if (typeof item.classList !== "undefined") {
                    if (item.classList.contains('picker-input-holder') ||
                        item.classList.contains('ngx-ttitan-color-picker')) {
                        pickerFound = true;
                        return false;
                    }
                }
                return true;
            });
            if (!pickerFound) {
                this.closePicker();
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.colorPickerService.debug = this.debug;
        this.validateInputParams();
        this.colorPickerService.preparePickerPallets(this.availPallets, this.customPallets, this);
        this.colorPickerService.colorToData(this.color, this);
        if (this.pickerOpenInStart) {
            this.openPicker();
        }
        this.cdr.detectChanges();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.setDraggesToCurrentColor();
    }
    /**
     * @return {?}
     */
    openPicker() {
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
    }
    /**
     * @return {?}
     */
    closePicker() {
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
    }
    /**
     * @return {?}
     */
    validateInputParams() {
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
    }
    /**
     * @param {?} color
     * @return {?}
     */
    inputColorChange(color) {
        this.color = color;
        this.colorPickerService.colorToData(this.color, this);
        this.setDraggesToCurrentColor();
    }
    /**
     * @return {?}
     */
    updateReturnColor() {
        this.color = this.colorPickerService.prepareReturnColor(this.hsva, this.outFormat);
        if (this.colorInit) {
            this.colorChanged.emit(this.color + '');
        }
        this.colorInit = true;
    }
    /**
     * @return {?}
     */
    setInputValue() {
        if (typeof this.pickerInput !== 'undefined') {
            this.pickerInput.setInputValue(this.colorPickerService.prepareReturnColor(this.hsva, this.inputFormat));
        }
    }
    /**
     * @return {?}
     */
    setDraggesToCurrentColor() {
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
    }
}
NgxTTitanColorPickerComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'lib-ngx-ttitan-color-picker',
                template: `<div
  class="ngx-ttitan-color-picker-wrapper"
>

  <div class="picker-input-wrapper">
    <div
      [ngStyle]="{backgroundColor: color}"
      class="debug-output"
      *ngIf="colorPickerService.debug"
    >
      {{color}}
    </div>
    <div class="picker-input-label">
      <label [for]="uuid" >{{title}}</label>
    </div>
    <div class="picker-input-holder">
      <div class="picker-color" [ngStyle]="{background: currentColorAlpha}">

      </div>
      <div class="picker-input">
        <input
          libNgxTTitanColorPickerInput
          #pickerInput="libNgxTTitanColorPickerInput"
          (inputChange)="inputColorChange($event)"
          [format]="inputFormat"
          [id]="uuid"
          type="text"
          (focus)="openPicker()"
        />
      </div>
      <!--<div class="picker-save-sign">-->
      <!--S-->
      <!--</div>-->
    </div>

  </div>
  <div class="ngx-ttitan-color-picker" [ngClass]="{'no-alpha': !alpha, 'open': pickerOpen}">
    <div class="ngx-ttitan-color-picker__MainColor">
      <div class="ngx-ttitan-color-picker__ColorLayer" [ngStyle]="{backgroundColor: currentColorMax}" ></div>
      <div class="ngx-ttitan-color-picker__Slidable" libNgxTTitanColorPickerSelector #mainColor="libNgxTTitanColorPickerSelector" (change)="colorPickerService.saturationChange($event, this)">
        <div class="ngx-ttitan-color-picker__Dragger" libNgxTTitanColorPickerDragger style="transform: translate3d(0px, 0px, 0px);"></div>
      </div>
    </div>
    <div class="ngx-ttitan-color-picker__HuePicker">
      <div class="ngx-ttitan-color-picker__Slidable"  libNgxTTitanColorPickerSelector #huePicker="libNgxTTitanColorPickerSelector" (change)="colorPickerService.hueChange($event, this)" [direction]="'vertical'">
        <div class="ngx-ttitan-color-picker__Dragger" libNgxTTitanColorPickerDragger [pickerPad]="0" style=" transform: translate3d(0px, 0px, 0px);"></div>
      </div>
    </div>
    <div class="ngx-ttitan-color-picker__AlphaPicker" *ngIf="alpha === true">
      <div class="ngx-ttitan-color-picker__ColorLayer"

           [ngStyle]="{background: 'linear-gradient(to top, ' + currentColorAlphaZero + '  18px, ' + currentColor + ' calc(100% - 18px)'}"
      ></div>
      <div class="ngx-ttitan-color-picker__Slidable"  libNgxTTitanColorPickerSelector #alphaPicker="libNgxTTitanColorPickerSelector" (change)="colorPickerService.alphaChange($event, this)" [direction]="'vertical'">
        <div class="ngx-ttitan-color-picker__Dragger" libNgxTTitanColorPickerDragger [pickerPad]="0" style=" transform: translate3d(0px, 0px, 0px);"></div>
      </div>
    </div>
    <!--<div style="height: 40px; width: 40px" [ngStyle]="{background: currentColor}">-->

    <!--</div>-->
    <!--<div style="height: 40px; width: 40px" [ngStyle]="{background: currentColorAlpha}">-->

    <!--</div>-->
  </div>
  <lib-ngx-ttitan-color-picker-palette-list
    (change)="inputColorChange($event)"
    [pallets]="pickerPallets"
  >

  </lib-ngx-ttitan-color-picker-palette-list>
</div>

`,
                styles: [`:host *,:host :after,:host :before{box-sizing:border-box}:host .debug-output{width:100%;height:20px}:host .picker-input-wrapper{margin-bottom:6px}:host .picker-input-wrapper .picker-input-label{margin-bottom:6px}:host .picker-input-wrapper .picker-input-label label{text-transform:uppercase;font-weight:600}:host .picker-input-wrapper .picker-input-holder{display:flex;height:33px;border:1px solid #bbb;overflow:hidden;border-radius:3px;background-color:#eee}:host .picker-input-wrapper .picker-input-holder .picker-color{flex:0 0 31px;background-color:#ff0300}:host .picker-input-wrapper .picker-input-holder .picker-input{flex:auto;background-color:transparent}:host .picker-input-wrapper .picker-input-holder .picker-input input{background-color:transparent;color:#272727;font-family:monospace;font-size:14px;border:none;outline:0;padding:8px 2px 8px 8px;width:100%}:host .picker-input-wrapper .picker-input-holder .picker-save-sign{flex:0 0 31px;line-height:33px;text-align:center}:host .ngx-ttitan-color-picker{max-height:0;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:flex;transition:max-height .3s}:host .ngx-ttitan-color-picker.open{margin-bottom:5px;max-height:165px}:host .ngx-ttitan-color-picker__ColorLayer{position:absolute;z-index:10;top:0;left:0;height:100%;width:100%;box-shadow:inset 0 0 2px 0 rgba(0,0,0,.5);pointer-events:none}:host .ngx-ttitan-color-picker__Slidable{height:100%;width:100%;cursor:pointer}:host .ngx-ttitan-color-picker__Dragger{position:relative;z-index:30;bottom:.9rem;-webkit-transform:none;transform:none;height:18px;width:18px;margin:0 auto;-webkit-backface-visibility:hidden;backface-visibility:hidden;will-change:transform;background:0 0;border:3px solid #fff;box-shadow:0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08),inset 0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08);border-radius:50%;pointer-events:none;touch-action:none}:host .ngx-ttitan-color-picker__MainColor{background-image:linear-gradient(45deg,#dfe3e8 25%,transparent 0),linear-gradient(-45deg,#dfe3e8 25%,transparent 0),linear-gradient(45deg,transparent 75%,#dfe3e8 0),linear-gradient(-45deg,transparent 75%,#dfe3e8 0);background-size:1.6rem 1.6rem;background-position:0 0,0 .8rem,.8rem -.8rem,-.8rem 0;position:relative;overflow:hidden;width:165px;height:165px;border-radius:4px;cursor:pointer}:host .ngx-ttitan-color-picker__MainColor .ngx-ttitan-color-picker__ColorLayer{box-shadow:inset 0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08);border-radius:4px}:host .ngx-ttitan-color-picker__MainColor .ngx-ttitan-color-picker__Dragger{right:.9rem;margin:0}:host .ngx-ttitan-color-picker__MainColor:after,:host .ngx-ttitan-color-picker__MainColor:before{content:"";position:absolute;z-index:20;top:0;left:0;display:block;height:100%;width:100%;pointer-events:none;border-radius:3px}:host .ngx-ttitan-color-picker__MainColor:before{background:linear-gradient(90deg,#fff,transparent)}:host .ngx-ttitan-color-picker__MainColor:after{background-image:linear-gradient(0deg,#000,transparent);box-shadow:inset 0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08)}:host .ngx-ttitan-color-picker__AlphaPicker,:host .ngx-ttitan-color-picker__HuePicker{position:relative;overflow:hidden;height:165px;width:24px;margin-left:.8rem;border-width:3px;border-radius:8rem;padding:13px 0}:host .ngx-ttitan-color-picker__HuePicker{background:linear-gradient(to bottom,red 0,#ff0 21%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%);box-shadow:inset 0 0 2px 0 rgba(0,0,0,.5)}:host .ngx-ttitan-color-picker__AlphaPicker{background-image:linear-gradient(45deg,#dfe3e8 25%,transparent 0),linear-gradient(-45deg,#dfe3e8 25%,transparent 0),linear-gradient(45deg,transparent 75%,#dfe3e8 0),linear-gradient(-45deg,transparent 75%,#dfe3e8 0);background-size:1.6rem 1.6rem;background-position:0 0,0 .8rem,.8rem -.8rem,-.8rem 0}:host .ngx-ttitan-color-picker__AlphaPicker .ngx-ttitan-color-picker__ColorLayer{border-radius:8rem}:host .ngx-ttitan-color-picker.no-alpha .ngx-ttitan-color-picker__MainColor{width:200px}`],
            },] },
];
/** @nocollapse */
NgxTTitanColorPickerComponent.ctorParameters = () => [
    { type: NgxTTitanColorPickerService },
    { type: ChangeDetectorRef }
];
NgxTTitanColorPickerComponent.propDecorators = {
    componentClick: [{ type: HostListener, args: ['click', ['$event'],] }],
    pickerOpenInStart: [{ type: Input, args: ['pickerOpen',] }],
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgxTTitanColorPickerModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { NgxTTitanColorPickerService, NgxTTitanColorPickerComponent, NgxTTitanColorPickerModule, NgxTTitanColorPickerDraggerDirective as ɵc, NgxTTitanColorPickerInputDirective as ɵd, NgxTTitanColorPickerPaletteListComponent as ɵa, NgxTTitanColorPickerSelectorDirective as ɵb };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXR0aXRhbi1jb2xvci1waWNrZXIuanMubWFwIiwic291cmNlcyI6WyJuZzovL25neC10dGl0YW4tY29sb3ItcGlja2VyL2xpYi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci9saWIvbmd4LXR0aXRhbi1jb2xvci1waWNrZXItZHJhZ2dlci5kaXJlY3RpdmUudHMiLCJuZzovL25neC10dGl0YW4tY29sb3ItcGlja2VyL2xpYi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1zZWxlY3Rvci5kaXJlY3RpdmUudHMiLCJuZzovL25neC10dGl0YW4tY29sb3ItcGlja2VyL2xpYi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1pbnB1dC5kaXJlY3RpdmUudHMiLCJuZzovL25neC10dGl0YW4tY29sb3ItcGlja2VyL2xpYi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1wYWxldHRlLWxpc3Qvbmd4LXR0aXRhbi1jb2xvci1waWNrZXItcGFsZXR0ZS1saXN0LmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIvbGliL25neC10dGl0YW4tY29sb3ItcGlja2VyLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIvbGliL25neC10dGl0YW4tY29sb3ItcGlja2VyLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0N1c3RvbVBlcmNlbnR9IGZyb20gXCIuL25neC10dGl0YW4tY29sb3ItcGlja2VyLXNlbGVjdG9yLmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHtOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudH0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuY29tcG9uZW50XCI7XG5pbXBvcnQge2Zyb21FdmVudCwgT2JzZXJ2YWJsZX0gZnJvbSBcInJ4anMvaW5kZXhcIjtcbmltcG9ydCB7d2luZG93fSBmcm9tIFwicnhqcy9pbnRlcm5hbC9vcGVyYXRvcnNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBIU1ZBIHtcbiAgaHVlOiBudW1iZXIsXG4gIHNhdHVyYXRpb246IG51bWJlcixcbiAgdmFsdWU6IG51bWJlcixcbiAgYWxwaGE6IG51bWJlcixcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQYWxldHRlIHtcbiAgbmFtZTogc3RyaW5nLFxuICBpZDogc3RyaW5nLFxuICBjb2xvcnM6IEFycmF5PHN0cmluZz5cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5neFRUaXRhbkNvbG9yUGlja2VyU2VydmljZSB7XG5cbiAgcHVibGljIGRlYnVnOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBwaWNrZXJMaXN0OiBBcnJheTxzdHJpbmc+ID0gW107XG4gIHB1YmxpYyBwYWxsZXRzOiBBcnJheTxQYWxldHRlPiA9IFtdO1xuXG4gIHB1YmxpYyBtb3VzZU1vdmVPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPE1vdXNlRXZlbnQ+ID0gPE9ic2VydmFibGU8TW91c2VFdmVudD4+ZnJvbUV2ZW50KGRvY3VtZW50LCAnbW91c2Vtb3ZlJyk7XG4gIHB1YmxpYyBtb3VzZVVwT2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxNb3VzZUV2ZW50PiA9IDxPYnNlcnZhYmxlPE1vdXNlRXZlbnQ+PmZyb21FdmVudChkb2N1bWVudCwgJ21vdXNldXAnKTtcbiAgLy8gcHVibGljIG1vdXNlTW92ZU9ic2VydmFibGU6IEV2ZW50RW1pdHRlcjxNb3VzZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLy8gcHVibGljIG1vdXNlVXBPYnNlcnZhYmxlOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5maWxsQmFzZVBhbGxldHMoKTtcbiAgICAvL1xuICAgIC8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsICgkZXZlbnQpID0+IHtcbiAgICAvLyAgIHRoaXMubW91c2VNb3ZlT2JzZXJ2YWJsZS5lbWl0KDxNb3VzZUV2ZW50PiRldmVudCk7XG4gICAgLy8gfSk7XG4gICAgLy8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgkZXZlbnQpID0+IHtcbiAgICAvLyAgIHRoaXMubW91c2VVcE9ic2VydmFibGUuZW1pdCg8TW91c2VFdmVudD4kZXZlbnQpO1xuICAgIC8vIH0pO1xuXG4gIH1cblxuICBzYXR1cmF0aW9uQ2hhbmdlKHBlcmNlbnQ6IEN1c3RvbVBlcmNlbnQsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQgKSB7XG4gICAgcGlja2VyQ29tcG9uZW50LmhzdmEuc2F0dXJhdGlvbiA9IHBlcmNlbnQueDtcbiAgICBwaWNrZXJDb21wb25lbnQuaHN2YS52YWx1ZSA9ICgxMDAgLSBwZXJjZW50LnkpO1xuICAgIHRoaXMuZGF0YVRvQ29sb3IocGlja2VyQ29tcG9uZW50KTtcbiAgfVxuXG4gIGh1ZUNoYW5nZShwZXJjZW50OiBDdXN0b21QZXJjZW50LCBwaWNrZXJDb21wb25lbnQ6IE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50KSB7XG4gICAgcGlja2VyQ29tcG9uZW50LmhzdmEuaHVlID0gTWF0aC5yb3VuZCgzNjAgKiBwZXJjZW50LnkgLyAxMDApO1xuICAgIHRoaXMuZGF0YVRvQ29sb3IocGlja2VyQ29tcG9uZW50KTtcbiAgfVxuXG4gIGFscGhhQ2hhbmdlKHBlcmNlbnQ6IEN1c3RvbVBlcmNlbnQsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBwaWNrZXJDb21wb25lbnQuaHN2YS5hbHBoYSA9ICgxMDAgLSBwZXJjZW50LnkpIC8gMTAwO1xuICAgIHRoaXMuZGF0YVRvQ29sb3IocGlja2VyQ29tcG9uZW50KTtcbiAgfVxuXG4gIGRhdGFUb0NvbG9yKHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBsZXQgcmdiYUFycjogQXJyYXk8bnVtYmVyPiA9IHRoaXMuaHN2YVRvUmdiYShcbiAgICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLmh1ZSxcbiAgICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLnNhdHVyYXRpb24sXG4gICAgICBwaWNrZXJDb21wb25lbnQuaHN2YS52YWx1ZSxcbiAgICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLmFscGhhXG4gICAgKTtcbiAgICBsZXQgcmdiYU1heEFycjogQXJyYXk8bnVtYmVyPiA9IHRoaXMuaHN2YVRvUmdiYShcbiAgICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLmh1ZSxcbiAgICAgIDEwMCxcbiAgICAgIDEwMCxcbiAgICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLmFscGhhXG4gICAgKTtcblxuICAgIHBpY2tlckNvbXBvbmVudC5jdXJyZW50Q29sb3IgPSAncmdiKCcgKyByZ2JhQXJyWzBdICsgJywnICsgcmdiYUFyclsxXSArICcsJyArIHJnYmFBcnJbMl0gKyAnKSc7XG4gICAgcGlja2VyQ29tcG9uZW50LmN1cnJlbnRDb2xvck1heCA9ICdyZ2JhKCcgKyByZ2JhTWF4QXJyWzBdICsgJywnICsgcmdiYU1heEFyclsxXSArICcsJyArIHJnYmFNYXhBcnJbMl0gKyAnLCcgKyByZ2JhTWF4QXJyWzNdICsgJyknO1xuICAgIHBpY2tlckNvbXBvbmVudC5jdXJyZW50Q29sb3JBbHBoYSA9ICdyZ2JhKCcgKyByZ2JhQXJyWzBdICsgJywnICsgcmdiYUFyclsxXSArICcsJyArIHJnYmFBcnJbMl0gKyAnLCcgKyByZ2JhQXJyWzNdICsgJyknO1xuICAgIHBpY2tlckNvbXBvbmVudC5jdXJyZW50Q29sb3JBbHBoYVplcm8gPSAncmdiYSgnICsgcmdiYUFyclswXSArICcsJyArIHJnYmFBcnJbMV0gKyAnLCcgKyByZ2JhQXJyWzJdICsgJywwKSc7XG5cbiAgICBwaWNrZXJDb21wb25lbnQuc2V0SW5wdXRWYWx1ZSgpO1xuICAgIHBpY2tlckNvbXBvbmVudC51cGRhdGVSZXR1cm5Db2xvcigpO1xuXG5cbiAgfVxuXG4gIGNvbG9yVG9EYXRhKGNvbG9yOiBzdHJpbmcsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBzd2l0Y2ggKHRoaXMuZGV0ZWN0Q29sb3JUeXBlKGNvbG9yKSkge1xuICAgICAgY2FzZSBcInJnYmFcIjogdGhpcy5wYXJzZVJnYmFDb2xvcihjb2xvciwgcGlja2VyQ29tcG9uZW50KTsgYnJlYWs7XG4gICAgICBjYXNlIFwicmdiXCI6IHRoaXMucGFyc2VSZ2JDb2xvcihjb2xvciwgcGlja2VyQ29tcG9uZW50KTsgYnJlYWs7XG4gICAgICBjYXNlIFwiaHNsYVwiOiB0aGlzLnBhcnNlSHNsYUNvbG9yKGNvbG9yLCBwaWNrZXJDb21wb25lbnQpOyBicmVhaztcbiAgICAgIGNhc2UgXCJoc2xcIjogdGhpcy5wYXJzZUhzbENvbG9yKGNvbG9yLCBwaWNrZXJDb21wb25lbnQpOyBicmVhaztcbiAgICAgIGNhc2UgXCJoZXg2XCI6IHRoaXMucGFyc2VIZXhDb2xvcihjb2xvciwgcGlja2VyQ29tcG9uZW50KTsgYnJlYWs7XG4gICAgICBjYXNlIFwiaGV4OFwiOiB0aGlzLnBhcnNlSGV4Q29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudCk7IGJyZWFrO1xuICAgIH1cbiAgICB0aGlzLmRhdGFUb0NvbG9yKHBpY2tlckNvbXBvbmVudCk7XG4gIH1cblxuICBnZXRQaWNrZXJVdWlkKCkge1xuICAgIGxldCBwaWNrZXJJZCA9ICcnO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCAxMDAwOyBpKyspIHtcbiAgICAgIHBpY2tlcklkID0gJ3BpY2tlci0nICsgdGhpcy5waWNrZXJMaXN0Lmxlbmd0aCArICctJyArIGk7XG4gICAgICBpZih0aGlzLnBpY2tlckxpc3QuaW5kZXhPZihwaWNrZXJJZCkgPT09IC0xICkge1xuICAgICAgICB0aGlzLnBpY2tlckxpc3QucHVzaChwaWNrZXJJZCk7XG4gICAgICAgIHJldHVybiBwaWNrZXJJZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuXG5cbiAgZGV0ZWN0Q29sb3JUeXBlKGNvbG9yOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGlmKGNvbG9yLmluZGV4T2YoJ3JnYmEnKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiAncmdiYSc7XG4gICAgfSBlbHNlIGlmKGNvbG9yLmluZGV4T2YoJ3JnYicpICE9PSAtMSkge1xuICAgICAgcmV0dXJuICdyZ2InO1xuICAgIH0gZWxzZSBpZihjb2xvci5pbmRleE9mKCdoc2xhJykgIT09IC0xKSB7XG4gICAgICByZXR1cm4gJ2hzbGEnO1xuICAgIH0gZWxzZSBpZihjb2xvci5pbmRleE9mKCdoc2wnKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiAnaHNsJztcbiAgICB9IGVsc2UgaWYgKGNvbG9yLmluZGV4T2YoJyMnKSAhPT0gLTEgJiYgKGNvbG9yLmxlbmd0aCA9PSA0IHx8IGNvbG9yLmxlbmd0aCA9PSA3KSl7XG4gICAgICByZXR1cm4gJ2hleDYnO1xuICAgIH0gZWxzZSBpZiAoY29sb3IuaW5kZXhPZignIycpICE9PSAtMSAmJiBjb2xvci5sZW5ndGggPT0gOSl7XG4gICAgICByZXR1cm4gJ2hleDgnO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJ3VuZGVmaW5lZCc7XG4gICAgfVxuICB9XG5cblxuICBmaWxsVmFsdWVzRnJvbUhzdmFBcnIoaHN2YUFycjogQXJyYXk8bnVtYmVyPiwgcGlja2VyQ29tcG9uZW50OiBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCkge1xuICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLmh1ZSA9IGhzdmFBcnJbMF07XG4gICAgcGlja2VyQ29tcG9uZW50LmhzdmEuc2F0dXJhdGlvbiA9IGhzdmFBcnJbMV07XG4gICAgcGlja2VyQ29tcG9uZW50LmhzdmEudmFsdWUgPSBoc3ZhQXJyWzJdO1xuICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLmFscGhhID0gaHN2YUFyclszXTtcbiAgfVxuXG5cbiAgcGFyc2VSZ2JhQ29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBsZXQgYXVzID0gY29sb3IucmVwbGFjZSgncmdiYSgnLCAnJykucmVwbGFjZSgnKScsICcnKTtcbiAgICBsZXQgYXVzMiA9IGF1cy5zcGxpdCgnLCcpO1xuICAgIGlmKGF1czIubGVuZ3RoID09IDQpIHtcbiAgICAgIHRoaXMuZmlsbFZhbHVlc0Zyb21Ic3ZhQXJyKFxuICAgICAgICB0aGlzLnJnYmFUb0hzdmEoXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlswXSksXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlsxXSksXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlsyXSksXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlszXSksXG4gICAgICAgICksXG4gICAgICAgIHBpY2tlckNvbXBvbmVudFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwYXJzZVJnYkNvbG9yKGNvbG9yLCBwaWNrZXJDb21wb25lbnQ6IE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50KSB7XG4gICAgbGV0IGF1cyA9IGNvbG9yLnJlcGxhY2UoJ3JnYignLCAnJykucmVwbGFjZSgnKScsICcnKTtcbiAgICBsZXQgYXVzMiA9IGF1cy5zcGxpdCgnLCcpO1xuICAgIGlmKGF1czIubGVuZ3RoID09IDMpIHtcbiAgICAgIHRoaXMuZmlsbFZhbHVlc0Zyb21Ic3ZhQXJyKFxuICAgICAgICB0aGlzLnJnYmFUb0hzdmEoXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlswXSksXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlsxXSksXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlsyXSksXG4gICAgICAgICAgMVxuICAgICAgICApLFxuICAgICAgICBwaWNrZXJDb21wb25lbnRcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcGFyc2VIc2xhQ29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBsZXQgYXVzID0gY29sb3IucmVwbGFjZSgnaHNsYSgnLCAnJykucmVwbGFjZSgnKScsICcnKS5yZXBsYWNlKCclJywgJycpO1xuICAgIGxldCBhdXMyID0gYXVzLnNwbGl0KCcsJyk7XG4gICAgaWYoYXVzMi5sZW5ndGggPT0gNCkge1xuICAgICAgdGhpcy5maWxsVmFsdWVzRnJvbUhzdmFBcnIoXG4gICAgICAgIHRoaXMuaHNsYVRvSHN2YShcbiAgICAgICAgICBwYXJzZUludChhdXMyWzBdKSxcbiAgICAgICAgICBwYXJzZUludChhdXMyWzFdKSxcbiAgICAgICAgICBwYXJzZUludChhdXMyWzJdKSxcbiAgICAgICAgICBwYXJzZUludChhdXMyWzNdKSxcbiAgICAgICAgKSxcbiAgICAgICAgcGlja2VyQ29tcG9uZW50XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHBhcnNlSHNsQ29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBsZXQgYXVzID0gY29sb3IucmVwbGFjZSgnaHNsKCcsICcnKS5yZXBsYWNlKCcpJywgJycpLnJlcGxhY2UoJyUnLCAnJyk7XG4gICAgbGV0IGF1czIgPSBhdXMuc3BsaXQoJywnKTtcbiAgICBpZihhdXMyLmxlbmd0aCA9PSAzKSB7XG4gICAgICB0aGlzLmZpbGxWYWx1ZXNGcm9tSHN2YUFycihcbiAgICAgICAgdGhpcy5oc2xhVG9Ic3ZhKFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbMF0pLFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbMV0pLFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbMl0pLFxuICAgICAgICAgIDFcbiAgICAgICAgKSxcbiAgICAgICAgcGlja2VyQ29tcG9uZW50XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHBhcnNlSGV4Q29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBsZXQgYXVzID0gY29sb3IucmVwbGFjZSgnIycsICcnKTtcbiAgICB0aGlzLmZpbGxWYWx1ZXNGcm9tSHN2YUFycihcbiAgICAgIHRoaXMuaGV4VG9Ic3ZhKGF1cyksXG4gICAgICBwaWNrZXJDb21wb25lbnRcbiAgICApO1xuICB9XG5cblxuXG4gIGhzdmFUb1JnYmEoSCwgUywgViwgQSk6IEFycmF5PG51bWJlcj4ge1xuICAgIGxldCBmICwgcCwgcSAsIHQsIGxILCBSLCBHLCBCO1xuXG4gICAgSCA9IChIIDwgMzYwKSA/IEggOiAzNTk7XG4gICAgUyA9IFMgLyAxMDA7XG4gICAgViA9IFYgLyAxMDA7XG5cbiAgICBsSCA9IE1hdGguZmxvb3IoSCAvIDYwKTtcblxuICAgIGYgPSBILzYwIC0gbEg7XG5cbiAgICBwID0gViAqICgxIC0gUyk7XG5cbiAgICBxID0gViAqKDEgLSBTKmYpO1xuXG4gICAgdCA9IFYqICgxIC0gKDEtZikqIFMpO1xuXG4gICAgc3dpdGNoIChsSCl7XG4gICAgICBjYXNlIDA6IFIgPSBWOyBHID0gdDsgQiA9IHA7IGJyZWFrO1xuICAgICAgY2FzZSAxOiBSID0gcTsgRyA9IFY7IEIgPSBwOyBicmVhaztcbiAgICAgIGNhc2UgMjogUiA9IHA7IEcgPSBWOyBCID0gdDsgYnJlYWs7XG4gICAgICBjYXNlIDM6IFIgPSBwOyBHID0gcTsgQiA9IFY7IGJyZWFrO1xuICAgICAgY2FzZSA0OiBSID0gdDsgRyA9IHA7IEIgPSBWOyBicmVhaztcbiAgICAgIGNhc2UgNTogUiA9IFY7IEcgPSBwOyBCID0gcTsgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtNYXRoLnJvdW5kKFIqMjU1KSwgTWF0aC5yb3VuZChHKjI1NSksIE1hdGgucm91bmQoQioyNTUpLCBBXTtcbiAgfVxuXG4gIGhzdmFUb1JnYmFTdHJpbmcoSCwgUywgViwgQSwgc2hvd0FscGhhOiBib29sZWFuID0gZmFsc2UpOiBzdHJpbmcge1xuICAgIGxldCBjb2xvckFycjogQXJyYXk8bnVtYmVyPiA9IHRoaXMuaHN2YVRvUmdiYShILCBTLCBWLCBBKTtcblxuICAgIGlmKHNob3dBbHBoYSkge1xuICAgICAgcmV0dXJuICdyZ2JhKCcgKyBjb2xvckFyci5qb2luKCcsJykgKyAnKSc7XG4gICAgfVxuXG4gICAgY29sb3JBcnIucG9wKCk7XG4gICAgcmV0dXJuICdyZ2IoJyArIGNvbG9yQXJyLmpvaW4oJywnKSArICcpJztcblxuICB9XG5cbiAgcmdiYVRvSHN2YShyLCBnLCBiLCBhKTogQXJyYXk8bnVtYmVyPiB7XG4gICAgciAvPSAyNTU7XG4gICAgZyAvPSAyNTU7XG4gICAgYiAvPSAyNTU7XG5cbiAgICBsZXQgbWF4ID0gTWF0aC5tYXgociwgZywgYiksIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xuICAgIGxldCBoLCBzLCB2ID0gbWF4O1xuICAgIGxldCBkID0gbWF4IC0gbWluO1xuICAgIHMgPSBtYXggPT0gMCA/IDAgOiBkIC8gbWF4O1xuXG4gICAgaWYgKG1heCA9PSBtaW4pIHtcbiAgICAgIGggPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2ggKG1heCkge1xuICAgICAgICBjYXNlIHI6IGggPSAoZyAtIGIpIC8gZCArIChnIDwgYiA/IDYgOiAwKTsgYnJlYWs7XG4gICAgICAgIGNhc2UgZzogaCA9IChiIC0gcikgLyBkICsgMjsgYnJlYWs7XG4gICAgICAgIGNhc2UgYjogaCA9IChyIC0gZykgLyBkICsgNDsgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGggLz0gNjtcbiAgICB9XG5cblxuICAgIHJldHVybiBbXG4gICAgICBoICogMzYwLFxuICAgICAgcyAqIDEwMCxcbiAgICAgIHYgKiAxMDAsXG4gICAgICBhXG4gICAgXTtcbiAgfVxuXG4gIGhzdmFUb0hzbGEoaCwgcywgdiwgYSk6IEFycmF5PG51bWJlcj57XG4gICAgcyAvPSAxMDA7XG4gICAgdiAvPSAxMDA7XG4gICAgcmV0dXJuW1xuICAgICAgTWF0aC5yb3VuZChoKSxcbiAgICAgIE1hdGgucm91bmQoKHMqdi8oKGg9KDItcykqdik8MT9oOjItaCkpICogMTAwKSxcbiAgICAgIE1hdGgucm91bmQoKGgvMikgKiAxMDApLFxuICAgICAgYVxuICAgIF1cbiAgfVxuXG4gIGhzbGFUb0hzdmEgKGgsIHMsIGwsIGEpOiBBcnJheTxudW1iZXI+e1xuICAgIHMgLz0gMTAwO1xuICAgIGwgLz0gMTAwO1xuICAgIHMqPWw8LjU/bDoxLWw7XG4gICAgcmV0dXJuW1xuICAgICAgaCxcbiAgICAgIE1hdGgucm91bmQoKDIqcy8obCtzKSkgKiAxMDApLFxuICAgICAgTWF0aC5yb3VuZCgobCtzKSAqIDEwMCksXG4gICAgICBhXG4gICAgXVxuICB9XG5cbiAgaGV4VG9Ic3ZhKGhleDogc3RyaW5nKTogQXJyYXk8bnVtYmVyPiB7XG5cbiAgICBsZXQgcmdiYSA9IFswLDAsMCwxXTtcbiAgICBpZiAoaGV4Lmxlbmd0aCA9PSA2KSB7XG4gICAgICByZ2JhID0gW1xuICAgICAgICBwYXJzZUludChoZXguc3Vic3RyaW5nKDAsIDIpLCAxNiksXG4gICAgICAgIHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMiwgNCksIDE2KSxcbiAgICAgICAgcGFyc2VJbnQoaGV4LnN1YnN0cmluZyg0LCA2KSwgMTYpLFxuICAgICAgICAxXG4gICAgICBdO1xuICAgIH0gZWxzZSBpZiAoaGV4Lmxlbmd0aCA9PSAzKSB7XG4gICAgICByZ2JhID0gW1xuICAgICAgICBwYXJzZUludChoZXguc3Vic3RyaW5nKDAsIDEpICsgaGV4LnN1YnN0cmluZygwLCAxKSwgMTYpLFxuICAgICAgICBwYXJzZUludChoZXguc3Vic3RyaW5nKDEsIDIpICsgaGV4LnN1YnN0cmluZygxLCAyKSwgMTYpLFxuICAgICAgICBwYXJzZUludChoZXguc3Vic3RyaW5nKDIsIDMpICsgaGV4LnN1YnN0cmluZygyLCAzKSwgMTYpLFxuICAgICAgICAxXG4gICAgICBdXG4gICAgfSBlbHNlIGlmIChoZXgubGVuZ3RoID09IDgpIHtcbiAgICAgIHJnYmEgPSBbXG4gICAgICAgIHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMCwgMiksIDE2KSxcbiAgICAgICAgcGFyc2VJbnQoaGV4LnN1YnN0cmluZygyLCA0KSwgMTYpLFxuICAgICAgICBwYXJzZUludChoZXguc3Vic3RyaW5nKDQsIDYpLCAxNiksXG4gICAgICAgIHBhcnNlRmxvYXQoKHBhcnNlSW50KGhleC5zdWJzdHJpbmcoNiwgOCksIDE2KSAvIDI1NSkudG9GaXhlZCgyKSlcbiAgICAgIF1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmdiYVRvSHN2YShyZ2JhWzBdLCByZ2JhWzFdLCByZ2JhWzJdLCByZ2JhWzNdKTtcblxuICB9XG5cbiAgaHN2YVRvSGV4KEgsIFMsIFYsIEEsIHNob3dBbHBoYTogYm9vbGVhbiA9IHRydWUpOiBzdHJpbmcge1xuICAgIGxldCByZ2JhOiBBcnJheTxudW1iZXI+ID0gdGhpcy5oc3ZhVG9SZ2JhKEgsIFMsIFYsIEEpO1xuXG4gICAgbGV0IGhBOiBzdHJpbmcgPSAoKHNob3dBbHBoYSkgPyAocmdiYVszXSAqIDI1NSkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygwLDIpIDogJycpO1xuXG4gICAgaWYoc2hvd0FscGhhKSB7XG4gICAgICBoQSA9IChoQS5sZW5ndGggPT0gMSkgPyBoQSArIGhBIDogaEE7XG4gICAgfVxuICAgIHJldHVybiAnIycgK1xuICAgICAgKChyZ2JhWzJdIHwgcmdiYVsxXSA8PCA4IHwgcmdiYVswXSA8PCAxNikgfCAxIDw8IDI0KS50b1N0cmluZygxNikuc2xpY2UoMSkgK1xuICAgICAgaEE7XG4gIH1cblxuXG4gIHZhbGlkYXRlQ29sb3JGb3JtYXQodmFsdWU6IHN0cmluZywgZm9ybWF0OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHN3aXRjaCAoZm9ybWF0KSB7XG4gICAgICBjYXNlIFwiaGV4NlwiOiByZXR1cm4gdGhpcy52YWxpZGF0ZUhleEZvcm1hdCh2YWx1ZSk7XG4gICAgICBjYXNlIFwiaGV4OFwiOiByZXR1cm4gdGhpcy52YWxpZGF0ZUhleEZvcm1hdCh2YWx1ZSwgdHJ1ZSk7XG4gICAgICBjYXNlIFwicmdiXCI6IHJldHVybiB0aGlzLnZhbGlkYXRlUmdiYUZvcm1hdCh2YWx1ZSk7XG4gICAgICBjYXNlIFwicmdiYVwiOiByZXR1cm4gdGhpcy52YWxpZGF0ZVJnYmFGb3JtYXQodmFsdWUsIHRydWUpO1xuICAgICAgLy8gY2FzZSBcImhzbFwiOiByZXR1cm4gdGhpcy52YWxpZGF0ZUhleEZvcm1hdCh2YWx1ZSk7XG4gICAgICAvLyBjYXNlIFwiaHNsYVwiOiByZXR1cm4gdGhpcy52YWxpZGF0ZUhleEZvcm1hdCh2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiAnbm90VmFsaWQnO1xuICB9XG5cbiAgdmFsaWRhdGVIZXhGb3JtYXQodmFsdWU6IHN0cmluZywgYWxwaGE6IGJvb2xlYW4gPSBmYWxzZSk6IHN0cmluZyB7XG4gICAgbGV0IHJlc3VsdCA9ICdub3RWYWxpZCc7XG4gICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKCcjJywgJycpO1xuICAgIGlmKCFhbHBoYSkge1xuICAgICAgaWYodmFsdWUubGVuZ3RoID09PSA2KSB7XG4gICAgICAgIGlmKCFpc05hTihwYXJzZUludCh2YWx1ZSwgMTYpKSkge1xuICAgICAgICAgIHJldHVybiAnIycgKyB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZih2YWx1ZS5sZW5ndGggPT09IDgpIHtcbiAgICAgICAgaWYoIWlzTmFOKHBhcnNlSW50KHZhbHVlLCAxNikpKSB7XG4gICAgICAgICAgcmV0dXJuICcjJyArIHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHZhbGlkYXRlUmdiYUZvcm1hdCh2YWx1ZTogc3RyaW5nLCBhbHBoYTogYm9vbGVhbiA9IGZhbHNlKTogc3RyaW5nIHtcbiAgICBsZXQgcmVzdWx0ID0gJ25vdFZhbGlkJztcbiAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1teMC05XFwsXSsvZywgXCJcIik7XG4gICAgbGV0IGF1c0FycjogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPiA9IHZhbHVlLnNwbGl0KCcsJyk7XG4gICAgbGV0IGFscGhhVmFsOiBzdHJpbmcgfCBudW1iZXIgPSAnJztcblxuICAgIGlmKCFhbHBoYSkge1xuICAgICAgaWYoYXVzQXJyLmxlbmd0aCA9PSAzKSB7XG4gICAgICAgIGF1c0FyciA9IGF1c0Fyci5tYXAoZnVuY3Rpb24odmFsOiBzdHJpbmcpe3JldHVybiBwYXJzZUludCh2YWwpfSk7XG4gICAgICAgIGlmKFxuICAgICAgICAgIE1hdGgubWF4LmFwcGx5KG51bGwsIGF1c0FycikgPD0gMjU1ICYmXG4gICAgICAgICAgTWF0aC5taW4uYXBwbHkobnVsbCwgYXVzQXJyKSA+PSAwXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiAncmdiKCcgKyBhdXNBcnIuam9pbignLCcpICsgJyknO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKGF1c0Fyci5sZW5ndGggPT0gNCkge1xuICAgICAgICBhbHBoYVZhbCA9IHBhcnNlRmxvYXQoPHN0cmluZz5hdXNBcnIucG9wKCkpO1xuICAgICAgICBhdXNBcnIgPSBhdXNBcnIubWFwKGZ1bmN0aW9uKHZhbDogc3RyaW5nKXtyZXR1cm4gcGFyc2VJbnQodmFsKX0pO1xuICAgICAgICBpZihcbiAgICAgICAgICBNYXRoLm1heC5hcHBseShudWxsLCBhdXNBcnIpIDw9IDI1NSAmJlxuICAgICAgICAgIE1hdGgubWluLmFwcGx5KG51bGwsIGF1c0FycikgPj0gMCAmJlxuICAgICAgICAgIGFscGhhVmFsID49IDAgJiYgYWxwaGFWYWwgPD0gMVxuICAgICAgICApIHtcbiAgICAgICAgICBhdXNBcnIucHVzaChhbHBoYVZhbCk7XG4gICAgICAgICAgcmV0dXJuICdyZ2JhKCcgKyBhdXNBcnIuam9pbignLCcpICsgJyknO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByZXBhcmVSZXR1cm5Db2xvcihoc3ZhOiBIU1ZBLCBmb3JtYXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgc3dpdGNoIChmb3JtYXQpIHtcbiAgICAgIGNhc2UgXCJoZXg2XCI6IHJldHVybiB0aGlzLmhzdmFUb0hleChoc3ZhLmh1ZSwgaHN2YS5zYXR1cmF0aW9uLCBoc3ZhLnZhbHVlLCAxLCBmYWxzZSk7XG4gICAgICBjYXNlIFwiaGV4OFwiOiByZXR1cm4gdGhpcy5oc3ZhVG9IZXgoaHN2YS5odWUsIGhzdmEuc2F0dXJhdGlvbiwgaHN2YS52YWx1ZSwgaHN2YS5hbHBoYSwgdHJ1ZSk7XG4gICAgICBjYXNlIFwicmdiXCI6IHJldHVybiB0aGlzLmhzdmFUb1JnYmFTdHJpbmcoaHN2YS5odWUsIGhzdmEuc2F0dXJhdGlvbiwgaHN2YS52YWx1ZSwgMSk7XG4gICAgICBjYXNlIFwicmdiYVwiOiByZXR1cm4gdGhpcy5oc3ZhVG9SZ2JhU3RyaW5nKGhzdmEuaHVlLCBoc3ZhLnNhdHVyYXRpb24sIGhzdmEudmFsdWUsIGhzdmEuYWxwaGEsIHRydWUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5oc3ZhVG9IZXgoaHN2YS5odWUsIGhzdmEuc2F0dXJhdGlvbiwgaHN2YS52YWx1ZSwgMSwgZmFsc2UpO1xuICB9XG5cbiAgcHJlcGFyZVBpY2tlclBhbGxldHMoYXZhaWxQYWxsZXRzOiBBcnJheTxzdHJpbmc+ID0gW10sIGN1c3RvbVBhbGxldHM6IEFycmF5PFBhbGV0dGU+ID0gW10sIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICB0aGlzLnBhbGxldHMuZm9yRWFjaCgocGFsZXR0ZSkgPT4ge1xuICAgICAgaWYoYXZhaWxQYWxsZXRzLmluZGV4T2YocGFsZXR0ZS5pZCkgIT09IC0xKSB7XG4gICAgICAgIHBpY2tlckNvbXBvbmVudC5waWNrZXJQYWxsZXRzLnB1c2gocGFsZXR0ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY3VzdG9tUGFsbGV0cy5mb3JFYWNoKChwYWxldHRlKSA9PiB7XG4gICAgICBwaWNrZXJDb21wb25lbnQucGlja2VyUGFsbGV0cy5wdXNoKHBhbGV0dGUpO1xuICAgIH0pXG5cbiAgfVxuXG4gIGZpbGxCYXNlUGFsbGV0cygpIHtcbiAgICB0aGlzLnBhbGxldHMucHVzaCh7XG4gICAgICBpZDogJ3BvbGFyaXMnLFxuICAgICAgbmFtZTogJ1BvbGFyaXMnLFxuICAgICAgY29sb3JzOiBbXG4gICAgICAgICcjRjlGQUZCJywgJyNGNEY2RjgnLCAnI0RGRTNFOCcsICcjQzRDREQ1JyxcbiAgICAgICAgJyM5MTlFQUInLCAnIzYzNzM4MScsICcjNDU0RjVCJywgJyMyMTJCMzYnLFxuICAgICAgICAnI0IzQjVDQicsICcjNDM0NjdGJywgJyMxQzIyNjAnLCAnIzAwMDQ0QycsXG4gICAgICAgICcjRjZGMEZEJywgJyNFM0QwRkYnLCAnIzlDNkFERScsICcjNTAyNDhGJywgJyMyMzAwNTEnLFxuICAgICAgICAnI0Y0RjVGQScsICcjQjNCQ0Y1JywgJyM1QzZBQzQnLCAnIzIwMkU3OCcsICcjMDAwNjM5JyxcbiAgICAgICAgJyNFQkY1RkEnLCAnI0I0RTFGQScsICcjMDA3QUNFJywgJyMwODRFOEEnLCAnIzAwMTQyOScsXG4gICAgICAgICcjRTBGNUY1JywgJyNCN0VDRUMnLCAnIzQ3QzFCRicsICcjMDA4NDhFJywgJyMwMDMxMzUnLFxuICAgICAgICAnI0UzRjFERicsICcjQkJFNUIzJywgJyM1MEI4M0MnLCAnIzEwODA0MycsICcjMTczNjMwJyxcbiAgICAgICAgJyNGQ0YxQ0QnLCAnI0ZGRUE4QScsICcjRUVDMjAwJywgJyM5QzZGMTknLCAnIzU3M0IwMCcsXG4gICAgICAgICcjRkNFQkRCJywgJyNGRkM1OEInLCAnI0Y0OTM0MicsICcjQzA1NzE3JywgJyM0QTE1MDQnLFxuICAgICAgICAnI0ZCRUFFNScsICcjRkVBRDlBJywgJyNERTM2MTgnLCAnI0JGMDcxMScsICcjMzMwMTAxJyxcbiAgICAgIF1cbiAgICB9KTtcbiAgICB0aGlzLnBhbGxldHMucHVzaCh7XG4gICAgICBpZDogJ21hdGVyaWFsJyxcbiAgICAgIG5hbWU6ICdNYXRlcmlhbCcsXG4gICAgICBjb2xvcnM6IFtcbiAgICAgICAgJyNmZmViZWUnLCAnI2ZmY2RkMicsICcjZWY5YTlhJywgJyNlNTczNzMnLCAnI2VmNTM1MCcsICcjZjQ0MzM2JywgJyNlNTM5MzUnLCAnI2QzMmYyZicsICcjYzYyODI4JywgJyNiNzFjMWMnLCAnI2ZmOGE4MCcsICcjZmY1MjUyJywgJyNmZjE3NDQnLCAnI2Q1MDAwMCcsXG4gICAgICAgICcjZmNlNGVjJywgJyNmOGJiZDAnLCAnI2Y0OGZiMScsICcjZjA2MjkyJywgJyNlYzQwN2EnLCAnI2U5MWU2MycsICcjZDgxYjYwJywgJyNjMjE4NWInLCAnI2FkMTQ1NycsICcjODgwZTRmJywgJyNmZjgwYWInLCAnI2ZmNDA4MScsICcjZjUwMDU3JywgJyNjNTExNjInLFxuICAgICAgICAnI2YzZTVmNScsICcjZTFiZWU3JywgJyNjZTkzZDgnLCAnI2JhNjhjOCcsICcjYWI0N2JjJywgJyM5YzI3YjAnLCAnIzhlMjRhYScsICcjN2IxZmEyJywgJyM2YTFiOWEnLCAnIzRhMTQ4YycsICcjZWE4MGZjJywgJyNlMDQwZmInLCAnI2Q1MDBmOScsICcjYWEwMGZmJyxcbiAgICAgICAgJyNlZGU3ZjYnLCAnI2QxYzRlOScsICcjYjM5ZGRiJywgJyM5NTc1Y2QnLCAnIzdlNTdjMicsICcjNjczYWI3JywgJyM1ZTM1YjEnLCAnIzUxMmRhOCcsICcjNDUyN2EwJywgJyMzMTFiOTInLCAnI2IzODhmZicsICcjN2M0ZGZmJywgJyM2NTFmZmYnLCAnIzYyMDBlYScsXG4gICAgICAgICcjZThlYWY2JywgJyNjNWNhZTknLCAnIzlmYThkYScsICcjNzk4NmNiJywgJyM1YzZiYzAnLCAnIzNmNTFiNScsICcjMzk0OWFiJywgJyMzMDNmOWYnLCAnIzI4MzU5MycsICcjMWEyMzdlJywgJyM4YzllZmYnLCAnIzUzNmRmZScsICcjM2Q1YWZlJywgJyMzMDRmZmUnLFxuICAgICAgICAnI2UzZjJmZCcsICcjYmJkZWZiJywgJyM5MGNhZjknLCAnIzY0YjVmNicsICcjNDJhNWY1JywgJyMyMTk2ZjMnLCAnIzFlODhlNScsICcjMTk3NmQyJywgJyMxNTY1YzAnLCAnIzBkNDdhMScsICcjODJiMWZmJywgJyM0NDhhZmYnLCAnIzI5NzlmZicsICcjMjk2MmZmJyxcbiAgICAgICAgJyNlMWY1ZmUnLCAnI2IzZTVmYycsICcjODFkNGZhJywgJyM0ZmMzZjcnLCAnIzI5YjZmNicsICcjMDNhOWY0JywgJyMwMzliZTUnLCAnIzAyODhkMScsICcjMDI3N2JkJywgJyMwMTU3OWInLCAnIzgwZDhmZicsICcjNDBjNGZmJywgJyMwMGIwZmYnLCAnIzAwOTFlYScsXG4gICAgICAgICcjZTBmN2ZhJywgJyNiMmViZjInLCAnIzgwZGVlYScsICcjNGRkMGUxJywgJyMyNmM2ZGEnLCAnIzAwYmNkNCcsICcjMDBhY2MxJywgJyMwMDk3YTcnLCAnIzAwODM4ZicsICcjMDA2MDY0JywgJyM4NGZmZmYnLCAnIzE4ZmZmZicsICcjMDBlNWZmJywgJyMwMGI4ZDQnLFxuICAgICAgICAnI2UwZjJmMScsICcjYjJkZmRiJywgJyM4MGNiYzQnLCAnIzRkYjZhYycsICcjMjZhNjlhJywgJyMwMDk2ODgnLCAnIzAwODk3YicsICcjMDA3OTZiJywgJyMwMDY5NWMnLCAnIzAwNGQ0MCcsICcjYTdmZmViJywgJyM2NGZmZGEnLCAnIzFkZTliNicsICcjMDBiZmE1JyxcbiAgICAgICAgJyNlOGY1ZTknLCAnI2M4ZTZjOScsICcjYTVkNmE3JywgJyM4MWM3ODQnLCAnIzY2YmI2YScsICcjNGNhZjUwJywgJyM0M2EwNDcnLCAnIzM4OGUzYycsICcjMmU3ZDMyJywgJyMxYjVlMjAnLCAnI2I5ZjZjYScsICcjNjlmMGFlJywgJyMwMGU2NzYnLCAnIzAwYzg1MycsXG4gICAgICAgICcjZjFmOGU5JywgJyNkY2VkYzgnLCAnI2M1ZTFhNScsICcjYWVkNTgxJywgJyM5Y2NjNjUnLCAnIzhiYzM0YScsICcjN2NiMzQyJywgJyM2ODlmMzgnLCAnIzU1OGIyZicsICcjMzM2OTFlJywgJyNjY2ZmOTAnLCAnI2IyZmY1OScsICcjNzZmZjAzJywgJyM2NGRkMTcnLFxuICAgICAgICAnI2Y5ZmJlNycsICcjZjBmNGMzJywgJyNlNmVlOWMnLCAnI2RjZTc3NScsICcjZDRlMTU3JywgJyNjZGRjMzknLCAnI2MwY2EzMycsICcjYWZiNDJiJywgJyM5ZTlkMjQnLCAnIzgyNzcxNycsICcjZjRmZjgxJywgJyNlZWZmNDEnLCAnI2M2ZmYwMCcsICcjYWVlYTAwJyxcbiAgICAgICAgJyNmZmZkZTcnLCAnI2ZmZjljNCcsICcjZmZmNTlkJywgJyNmZmYxNzYnLCAnI2ZmZWU1OCcsICcjZmZlYjNiJywgJyNmZGQ4MzUnLCAnI2ZiYzAyZCcsICcjZjlhODI1JywgJyNmNTdmMTcnLCAnI2ZmZmY4ZCcsICcjZmZmZjAwJywgJyNmZmVhMDAnLCAnI2ZmZDYwMCcsXG4gICAgICAgICcjZmZmOGUxJywgJyNmZmVjYjMnLCAnI2ZmZTA4MicsICcjZmZkNTRmJywgJyNmZmNhMjgnLCAnI2ZmYzEwNycsICcjZmZiMzAwJywgJyNmZmEwMDAnLCAnI2ZmOGYwMCcsICcjZmY2ZjAwJywgJyNmZmU1N2YnLCAnI2ZmZDc0MCcsICcjZmZjNDAwJywgJyNmZmFiMDAnLFxuICAgICAgICAnI2ZmZjNlMCcsICcjZmZlMGIyJywgJyNmZmNjODAnLCAnI2ZmYjc0ZCcsICcjZmZhNzI2JywgJyNmZjk4MDAnLCAnI2ZiOGMwMCcsICcjZjU3YzAwJywgJyNlZjZjMDAnLCAnI2U2NTEwMCcsICcjZmZkMTgwJywgJyNmZmFiNDAnLCAnI2ZmOTEwMCcsICcjZmY2ZDAwJyxcbiAgICAgICAgJyNmYmU5ZTcnLCAnI2ZmY2NiYycsICcjZmZhYjkxJywgJyNmZjhhNjUnLCAnI2ZmNzA0MycsICcjZmY1NzIyJywgJyNmNDUxMWUnLCAnI2U2NGExOScsICcjZDg0MzE1JywgJyNiZjM2MGMnLCAnI2ZmOWU4MCcsICcjZmY2ZTQwJywgJyNmZjNkMDAnLCAnI2RkMmMwMCcsXG4gICAgICAgICcjZWZlYmU5JywgJyNkN2NjYzgnLCAnI2JjYWFhNCcsICcjYTE4ODdmJywgJyM4ZDZlNjMnLCAnIzc5NTU0OCcsICcjNmQ0YzQxJywgJyM1ZDQwMzcnLCAnIzRlMzQyZScsICcjM2UyNzIzJyxcbiAgICAgICAgJyNmYWZhZmEnLCAnI2Y1ZjVmNScsICcjZWVlZWVlJywgJyNlMGUwZTAnLCAnI2JkYmRiZCcsICcjOWU5ZTllJywgJyM3NTc1NzUnLCAnIzYxNjE2MScsICcjNDI0MjQyJywgJyMyMTIxMjEnLFxuICAgICAgICAnI2VjZWZmMScsICcjY2ZkOGRjJywgJyNiMGJlYzUnLCAnIzkwYTRhZScsICcjNzg5MDljJywgJyM2MDdkOGInLCAnIzU0NmU3YScsICcjNDU1YTY0JywgJyMzNzQ3NGYnLCAnIzI2MzIzOCcsXG4gICAgICBdXG4gICAgfSk7XG4gIH1cblxuXG5cblxuXG59XG4iLCJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2xpYk5neFRUaXRhbkNvbG9yUGlja2VyRHJhZ2dlcl0nXG59KVxuZXhwb3J0IGNsYXNzIE5neFRUaXRhbkNvbG9yUGlja2VyRHJhZ2dlckRpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCdwaWNrZXJQYWQnKSBwdWJsaWMgcGlja2VyUGFkOiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbFJlZjogRWxlbWVudFJlZikgeyB9XG5cblxuICBwdWJsaWMgc2V0UG9zaXRpb24oeDogbnVtYmVyLCB5OiBudW1iZXIsIGRpcmVjdGlvbjogc3RyaW5nKTogdm9pZCB7XG5cbiAgICBsZXQgcmVjdCA9IHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIGlmKGRpcmVjdGlvbiA9PSAndmVydGljYWwnIHx8IGRpcmVjdGlvbiA9PSAnYm90aCcpIHtcbiAgICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5zdHlsZS50b3AgPSBNYXRoLnJvdW5kKCh5IC0gKChyZWN0LmhlaWdodCkgLyAyKSkpICsgJ3B4JztcbiAgICB9XG4gICAgaWYoZGlyZWN0aW9uID09ICdob3Jpem9udGFsJyB8fCBkaXJlY3Rpb24gPT0gJ2JvdGgnKSB7XG4gICAgICB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9IE1hdGgucm91bmQoKHggLSAoKHJlY3Qud2lkdGgpIC8gMikpKSArICdweCc7XG4gICAgfVxuXG4gIH1cblxufVxuIiwiaW1wb3J0IHtcbiAgQ29udGVudENoaWxkLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Tmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyRGlyZWN0aXZlfSBmcm9tIFwiLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1kcmFnZ2VyLmRpcmVjdGl2ZVwiO1xuLy8gaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24sIG9mfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtmcm9tRXZlbnQsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge05neFRUaXRhbkNvbG9yUGlja2VyU2VydmljZX0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuc2VydmljZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEN1c3RvbVJlY3Qge1xuICBoZWlnaHQ6IG51bWJlcixcbiAgbGVmdDogbnVtYmVyLFxuICB0b3A6IG51bWJlcixcbiAgd2lkdGg6IG51bWJlclxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEN1c3RvbVBlcmNlbnQge1xuICB4OiBudW1iZXIsXG4gIHk6IG51bWJlcixcbn1cblxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3Rvcl0nLFxuICBleHBvcnRBczogJ2xpYk5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3InXG59KVxuZXhwb3J0IGNsYXNzIE5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdHtcblxuICBASW5wdXQoJ2RpcmVjdGlvbicpIHB1YmxpYyBkaXJlY3Rpb246IHN0cmluZyA9ICdib3RoJztcblxuICBAQ29udGVudENoaWxkKE5neFRUaXRhbkNvbG9yUGlja2VyRHJhZ2dlckRpcmVjdGl2ZSkgcHVibGljIGRyYWdnZXI6IE5neFRUaXRhbkNvbG9yUGlja2VyRHJhZ2dlckRpcmVjdGl2ZSA9IG51bGw7XG5cbiAgQE91dHB1dCgnY2hhbmdlJykgcHVibGljIGNoYW5nZTogRXZlbnRFbWl0dGVyPEN1c3RvbVBlcmNlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxDdXN0b21QZXJjZW50PigpO1xuXG4gIHB1YmxpYyBlbDogSFRNTEVsZW1lbnQgPSBudWxsO1xuICBwdWJsaWMgZHJhZ1N0YXJ0OiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBnbG9iYWxNb3VzZU1vdmU6IFN1YnNjcmlwdGlvbiA9IG51bGw7XG4gIHB1YmxpYyBnbG9iYWxNb3VzZVVwOiBTdWJzY3JpcHRpb24gPSBudWxsO1xuXG5cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWRvd24nLCBbJyRldmVudCddKSBwdWJsaWMgb25Nb3VzZURvd24oJGV2ZW50KSB7XG4gICAgdGhpcy5kcmFnU3RhcnQgPSB0cnVlO1xuICAgIHRoaXMuZ2V0UG9zaXRpb24oJGV2ZW50KTtcbiAgfVxuXG5cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZWxSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIGNvbG9yUGlja2VyU2VydmljZTogTmd4VFRpdGFuQ29sb3JQaWNrZXJTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuZWwgPSB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSAoWydib3RoJywgJ3ZlcnRpY2FsJywgJ2hvcml6b250YWwnXS5pbmRleE9mKHRoaXMuZGlyZWN0aW9uKSA9PT0gLTEpID8gJ2JvdGgnIDogdGhpcy5kaXJlY3Rpb247XG5cblxuXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcblxuXG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgIHRoaXMuZXZlbnRzVW5TdWJzY2liZSgpO1xuICB9XG5cblxuICBldmVudHNTdWJzY2liZSgpIHtcbiAgICAvLyB0aGlzLmdsb2JhbE1vdXNlTW92ZSA9IGZyb21FdmVudCh3aW5kb3csICdtb3VzZW1vdmUnKS5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgLy8gICBpZih0aGlzLmRyYWdTdGFydCkge1xuICAgIC8vICAgICB0aGlzLmdldFBvc2l0aW9uKDxNb3VzZUV2ZW50PmV2ZW50KTtcbiAgICAvLyAgIH1cbiAgICAvLyB9KTtcbiAgICAvLyB0aGlzLmdsb2JhbE1vdXNlVXAgPSBmcm9tRXZlbnQod2luZG93LCAnbW91c2V1cCcpLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAvLyAgIGlmKHRoaXMuZHJhZ1N0YXJ0KSB7XG4gICAgLy8gICAgIHRoaXMuZHJhZ1N0YXJ0ID0gZmFsc2U7XG4gICAgLy8gICAgIHRoaXMuZ2V0UG9zaXRpb24oPE1vdXNlRXZlbnQ+ZXZlbnQpO1xuICAgIC8vICAgfVxuICAgIC8vIH0pO1xuXG5cbiAgICB0aGlzLmdsb2JhbE1vdXNlTW92ZSA9IHRoaXMuY29sb3JQaWNrZXJTZXJ2aWNlLm1vdXNlTW92ZU9ic2VydmFibGUuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgaWYodGhpcy5kcmFnU3RhcnQpIHtcbiAgICAgICAgdGhpcy5nZXRQb3NpdGlvbig8TW91c2VFdmVudD5ldmVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5nbG9iYWxNb3VzZVVwID0gdGhpcy5jb2xvclBpY2tlclNlcnZpY2UubW91c2VVcE9ic2VydmFibGUuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgaWYodGhpcy5kcmFnU3RhcnQpIHtcbiAgICAgICAgdGhpcy5kcmFnU3RhcnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5nZXRQb3NpdGlvbig8TW91c2VFdmVudD5ldmVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgZXZlbnRzVW5TdWJzY2liZSgpIHtcbiAgICBpZih0aGlzLmdsb2JhbE1vdXNlTW92ZSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5nbG9iYWxNb3VzZU1vdmUudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYodGhpcy5nbG9iYWxNb3VzZVVwICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmdsb2JhbE1vdXNlVXAudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0RHJhZ2dlcihwZXJzZW50OiBDdXN0b21QZXJjZW50KSB7XG4gICAgaWYodGhpcy5kcmFnZ2VyID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBwb3NpdGlvbjogQ3VzdG9tUmVjdCA9IHRoaXMuZ2V0UmVjdCh0aGlzLmVsKTtcbiAgICBsZXQgeCA9IE1hdGgucm91bmQoKChwb3NpdGlvbi53aWR0aCAtIHRoaXMuZHJhZ2dlci5waWNrZXJQYWQgKiAyKSAqIHBlcnNlbnQueCAvIDEwMCkpO1xuICAgIGxldCB5ID0gTWF0aC5yb3VuZCgoKHBvc2l0aW9uLmhlaWdodCAtIHRoaXMuZHJhZ2dlci5waWNrZXJQYWQgKiAyKSAqIHBlcnNlbnQueSAvIDEwMCkpO1xuICAgIHRoaXMuZHJhZ2dlci5zZXRQb3NpdGlvbihcbiAgICAgICh4ID4gdGhpcy5kcmFnZ2VyLnBpY2tlclBhZCkgPyB4IDogdGhpcy5kcmFnZ2VyLnBpY2tlclBhZCxcbiAgICAgICh5ID4gdGhpcy5kcmFnZ2VyLnBpY2tlclBhZCkgPyB5IDogdGhpcy5kcmFnZ2VyLnBpY2tlclBhZCxcbiAgICAgIHRoaXMuZGlyZWN0aW9uXG4gICAgKTtcblxuICB9XG5cbiAgcHVibGljIGdldFBvc2l0aW9uKCRldmVudDogTW91c2VFdmVudCkge1xuICAgIGxldCBjdXJzb3JZID0gJGV2ZW50LnBhZ2VZO1xuICAgIGxldCBjdXJzb3JYID0gJGV2ZW50LnBhZ2VYO1xuICAgIGxldCBwb3NpdGlvbjogQ3VzdG9tUmVjdCA9IHRoaXMuZ2V0UmVjdCh0aGlzLmVsKTtcbiAgICBsZXQgcGVyY2VudDogQ3VzdG9tUGVyY2VudCA9IHt4OiAwLCB5OiAwfTtcbiAgICBpZih0aGlzLmRpcmVjdGlvbiA9PSAndmVydGljYWwnIHx8IHRoaXMuZGlyZWN0aW9uID09ICdib3RoJykge1xuICAgICAgcGVyY2VudC55ID0gTWF0aC5yb3VuZCgoY3Vyc29yWSAtIChwb3NpdGlvbi50b3ApKSAqIDEwMCAvIChwb3NpdGlvbi5oZWlnaHQgLSB0aGlzLmRyYWdnZXIucGlja2VyUGFkICogMikpO1xuICAgICAgaWYocGVyY2VudC55IDwgMCkge1xuICAgICAgICBwZXJjZW50LnkgPSAwXG4gICAgICB9IGVsc2UgaWYocGVyY2VudC55ID4gMTAwKSB7XG4gICAgICAgIHBlcmNlbnQueSA9IDEwMDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYodGhpcy5kaXJlY3Rpb24gPT0gJ2hvcml6b250YWwnIHx8IHRoaXMuZGlyZWN0aW9uID09ICdib3RoJykge1xuICAgICAgcGVyY2VudC54ID0gTWF0aC5yb3VuZCgoY3Vyc29yWCAtIChwb3NpdGlvbi5sZWZ0KSkgKiAxMDAgLyAocG9zaXRpb24ud2lkdGggLSB0aGlzLmRyYWdnZXIucGlja2VyUGFkICogMikpO1xuICAgICAgaWYocGVyY2VudC54IDwgMCkge1xuICAgICAgICBwZXJjZW50LnggPSAwXG4gICAgICB9IGVsc2UgaWYocGVyY2VudC54ID4gMTAwKSB7XG4gICAgICAgIHBlcmNlbnQueCA9IDEwMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNldERyYWdnZXIocGVyY2VudCk7XG4gICAgdGhpcy5jaGFuZ2UuZW1pdChwZXJjZW50KTtcblxuICB9XG5cblxuXG4gIHB1YmxpYyBnZXRSZWN0KGVsZW06IEhUTUxFbGVtZW50KTogQ3VzdG9tUmVjdCB7XG5cbiAgICBsZXQgYm94ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBsZXQgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgbGV0IGRvY0VsID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgIGxldCBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jRWwuc2Nyb2xsVG9wIHx8IGJvZHkuc2Nyb2xsVG9wO1xuICAgIGxldCBzY3JvbGxMZWZ0ID0gd2luZG93LnBhZ2VYT2Zmc2V0IHx8IGRvY0VsLnNjcm9sbExlZnQgfHwgYm9keS5zY3JvbGxMZWZ0O1xuICAgIGxldCBjbGllbnRUb3AgPSBkb2NFbC5jbGllbnRUb3AgfHwgYm9keS5jbGllbnRUb3AgfHwgMDtcbiAgICBsZXQgY2xpZW50TGVmdCA9IGRvY0VsLmNsaWVudExlZnQgfHwgYm9keS5jbGllbnRMZWZ0IHx8IDA7XG5cbiAgICByZXR1cm4ge1xuICAgICAgaGVpZ2h0OiBib3guaGVpZ2h0LFxuICAgICAgbGVmdDogYm94LmxlZnQgKyBzY3JvbGxMZWZ0IC0gY2xpZW50TGVmdCxcbiAgICAgIHRvcDogYm94LnRvcCArIHNjcm9sbFRvcCAtIGNsaWVudFRvcCxcbiAgICAgIHdpZHRoOiBib3gud2lkdGgsXG4gICAgfTtcbiAgfVxuXG5cblxufVxuIiwiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Tmd4VFRpdGFuQ29sb3JQaWNrZXJTZXJ2aWNlfSBmcm9tIFwiLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci5zZXJ2aWNlXCI7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tsaWJOZ3hUVGl0YW5Db2xvclBpY2tlcklucHV0XScsXG4gIGV4cG9ydEFzOiAnbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJJbnB1dCdcbn0pXG5leHBvcnQgY2xhc3MgTmd4VFRpdGFuQ29sb3JQaWNrZXJJbnB1dERpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCdmb3JtYXQnKSBmb3JtYXQ6IHN0cmluZyA9ICdoZXg2JztcbiAgQE91dHB1dCgnaW5wdXRDaGFuZ2UnKSBwdWJsaWMgaW5wdXRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cblxuICBASG9zdExpc3RlbmVyKCdrZXl1cCcpIGtleVVwKCkge1xuICAgIHRoaXMuaW5wdXRWYWxpZGF0ZSgpO1xuICB9XG4gIEBIb3N0TGlzdGVuZXIoJ2NoYW5nZScpIGNoYW5nZSgpIHtcbiAgICB0aGlzLmlucHV0VmFsaWRhdGUoKTtcbiAgfVxuXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsOiBFbGVtZW50UmVmLFxuICAgIHB1YmxpYyBjb2xvclBpY2tlclNlcnZpY2U6IE5neFRUaXRhbkNvbG9yUGlja2VyU2VydmljZVxuICApIHsgfVxuXG5cbiAgc2V0SW5wdXRWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgKDxIVE1MSW5wdXRFbGVtZW50PnRoaXMuZWwubmF0aXZlRWxlbWVudCkudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG5cbiAgaW5wdXRWYWxpZGF0ZSgpIHtcbiAgICBsZXQgcmVzID0gdGhpcy5jb2xvclBpY2tlclNlcnZpY2UudmFsaWRhdGVDb2xvckZvcm1hdChcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC52YWx1ZSxcbiAgICAgIHRoaXMuZm9ybWF0XG4gICAgKTtcblxuICAgIGlmKHJlcyAhPT0gJ25vdFZhbGlkJykge1xuICAgICAgKDxIVE1MSW5wdXRFbGVtZW50PnRoaXMuZWwubmF0aXZlRWxlbWVudCkudmFsdWUgPSByZXM7XG4gICAgICB0aGlzLmlucHV0Q2hhbmdlLmVtaXQocmVzKTtcbiAgICB9XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtQYWxldHRlfSBmcm9tIFwiLi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItbmd4LXR0aXRhbi1jb2xvci1waWNrZXItcGFsZXR0ZS1saXN0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwicGlja2VyLXBhbGV0dGUtd3JhcHBlclwiICpuZ0lmPVwicGFsbGV0cy5sZW5ndGggPiAwXCI+XG4gIDxkaXYgY2xhc3M9XCJwYWxldHRlLWxpbmtzXCI+XG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJwYWxldHRlLWxpbmtcIlxuICAgICAgKm5nRm9yPVwibGV0IHBhbGV0dGUgb2YgcGFsbGV0c1wiXG4gICAgICBbbmdDbGFzc109XCJ7J3NlbGVjdGVkJzogKGFjdGl2ZVBhbGV0dGUgIT09IG51bGwgJiYgYWN0aXZlUGFsZXR0ZS5pZCA9PSBwYWxldHRlLmlkKX1cIlxuICAgICAgKGNsaWNrKT1cInNlbGVjdFBhbGV0dGUocGFsZXR0ZSlcIlxuICAgID5cbiAgICAgIHt7cGFsZXR0ZS5uYW1lfX1cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJwYWxldHRlLXBpY2tlci1ob2xkZXJcIiAqbmdJZj1cImFjdGl2ZVBhbGV0dGUgIT09IG51bGwgJiYgYWN0aXZlUGFsZXR0ZS5jb2xvcnMubGVuZ3RoID4gMFwiPlxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwicGFsZXR0ZS1jb2xvclwiXG4gICAgICAqbmdGb3I9XCJsZXQgY29sb3Igb2YgYWN0aXZlUGFsZXR0ZS5jb2xvcnNcIlxuICAgICAgW25nU3R5bGVdPVwie1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yXG4gICAgICB9XCJcbiAgICAgIChjbGljayk9XCJjb2xvclNlbGVjdGVkKGNvbG9yKVwiXG4gICAgPlxuXG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgOmhvc3QgLnBpY2tlci1wYWxldHRlLXdyYXBwZXIgLnBhbGV0dGUtbGlua3N7ZGlzcGxheTpmbGV4O2ZsZXgtd3JhcDp3cmFwO21hcmdpbi1ib3R0b206NXB4fTpob3N0IC5waWNrZXItcGFsZXR0ZS13cmFwcGVyIC5wYWxldHRlLWxpbmtzIC5wYWxldHRlLWxpbmt7bWFyZ2luLXJpZ2h0OjVweDtib3JkZXItcmFkaXVzOjNweDtwYWRkaW5nOjJweCA0cHg7Ym9yZGVyOjFweCBzb2xpZCAjZGRkO3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtmb250LXNpemU6MTBweDtmb250LWZhbWlseTotYXBwbGUtc3lzdGVtLEJsaW5rTWFjU3lzdGVtRm9udCxTYW4gRnJhbmNpc2NvLFJvYm90byxTZWdvZSBVSSxIZWx2ZXRpY2EgTmV1ZSxzYW5zLXNlcmlmO2ZvbnQtd2VpZ2h0OjYwMDtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7Y3Vyc29yOnBvaW50ZXJ9Omhvc3QgLnBpY2tlci1wYWxldHRlLXdyYXBwZXIgLnBhbGV0dGUtbGlua3MgLnBhbGV0dGUtbGluay5zZWxlY3RlZHtiYWNrZ3JvdW5kLWNvbG9yOiM1ZTZiYzU7Y29sb3I6I2ZmZn06aG9zdCAucGlja2VyLXBhbGV0dGUtd3JhcHBlciAucGFsZXR0ZS1waWNrZXItaG9sZGVye2hlaWdodDoxNjVweDtkaXNwbGF5OmZsZXg7ZmxleC13cmFwOndyYXA7YWxpZ24taXRlbXM6ZmxleC1zdGFydDtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydDthbGlnbi1jb250ZW50OmJhc2VsaW5lfTpob3N0IC5waWNrZXItcGFsZXR0ZS13cmFwcGVyIC5wYWxldHRlLXBpY2tlci1ob2xkZXIgLnBhbGV0dGUtY29sb3J7Y3Vyc29yOnBvaW50ZXI7d2lkdGg6MTBweDtoZWlnaHQ6MTBweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hUVGl0YW5Db2xvclBpY2tlclBhbGV0dGVMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoJ3BhbGxldHMnKSBwdWJsaWMgcGFsbGV0czogQXJyYXk8UGFsZXR0ZT4gPSBbXTtcbiAgQE91dHB1dCgnY2hhbmdlJykgcHVibGljIGNoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBwdWJsaWMgYWN0aXZlUGFsZXR0ZTogUGFsZXR0ZSA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIGNsb3NlUGFsZXR0ZSgpIHtcbiAgICB0aGlzLmFjdGl2ZVBhbGV0dGUgPSBudWxsO1xuICB9XG5cbiAgc2VsZWN0UGFsZXR0ZShwYWxldHRlOiBQYWxldHRlKSB7XG4gICAgaWYoXG4gICAgICB0aGlzLmFjdGl2ZVBhbGV0dGUgPT0gbnVsbFxuICAgICkge1xuICAgICAgdGhpcy5hY3RpdmVQYWxldHRlID0gcGFsZXR0ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYWN0aXZlUGFsZXR0ZS5pZCAhPT0gcGFsZXR0ZS5pZCkge1xuICAgICAgdGhpcy5hY3RpdmVQYWxldHRlID0gcGFsZXR0ZTtcbiAgICB9XG5cbiAgfVxuXG4gIGNvbG9yU2VsZWN0ZWQoY29sb3IpIHtcbiAgICB0aGlzLmNoYW5nZS5lbWl0KGNvbG9yKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgQ29udGVudENoaWxkLCBDb250ZW50Q2hpbGRyZW4sIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25Jbml0LFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Tmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvckRpcmVjdGl2ZX0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXItc2VsZWN0b3IuZGlyZWN0aXZlXCI7XG5pbXBvcnQge0hTVkEsIE5neFRUaXRhbkNvbG9yUGlja2VyU2VydmljZSwgUGFsZXR0ZX0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuc2VydmljZVwiO1xuaW1wb3J0IHtOZ3hUVGl0YW5Db2xvclBpY2tlcklucHV0RGlyZWN0aXZlfSBmcm9tIFwiLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1pbnB1dC5kaXJlY3RpdmVcIjtcbmltcG9ydCB7Tmd4VFRpdGFuQ29sb3JQaWNrZXJQYWxldHRlTGlzdENvbXBvbmVudH0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXItcGFsZXR0ZS1saXN0L25neC10dGl0YW4tY29sb3ItcGlja2VyLXBhbGV0dGUtbGlzdC5jb21wb25lbnRcIjtcbi8vW25nU3R5bGVdPVwie2JhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQodG8gdG9wLCAnICsgbmd4VFRpdGFuQ29sb3JQaWNrZXJTZXJ2aWNlLmN1cnJlbnRDb2xvciArICcgMThweCwgcmdiKDI1NSwgNzcsIDI1NSkgY2FsYygxMDAlIC0gMThweCknfVwiXG5AQ29tcG9uZW50KHtcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHNlbGVjdG9yOiAnbGliLW5neC10dGl0YW4tY29sb3ItcGlja2VyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2XHJcbiAgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci13cmFwcGVyXCJcclxuPlxyXG5cclxuICA8ZGl2IGNsYXNzPVwicGlja2VyLWlucHV0LXdyYXBwZXJcIj5cclxuICAgIDxkaXZcclxuICAgICAgW25nU3R5bGVdPVwie2JhY2tncm91bmRDb2xvcjogY29sb3J9XCJcclxuICAgICAgY2xhc3M9XCJkZWJ1Zy1vdXRwdXRcIlxyXG4gICAgICAqbmdJZj1cImNvbG9yUGlja2VyU2VydmljZS5kZWJ1Z1wiXHJcbiAgICA+XHJcbiAgICAgIHt7Y29sb3J9fVxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWlucHV0LWxhYmVsXCI+XHJcbiAgICAgIDxsYWJlbCBbZm9yXT1cInV1aWRcIiA+e3t0aXRsZX19PC9sYWJlbD5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cInBpY2tlci1pbnB1dC1ob2xkZXJcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1jb2xvclwiIFtuZ1N0eWxlXT1cIntiYWNrZ3JvdW5kOiBjdXJyZW50Q29sb3JBbHBoYX1cIj5cclxuXHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWlucHV0XCI+XHJcbiAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICBsaWJOZ3hUVGl0YW5Db2xvclBpY2tlcklucHV0XHJcbiAgICAgICAgICAjcGlja2VySW5wdXQ9XCJsaWJOZ3hUVGl0YW5Db2xvclBpY2tlcklucHV0XCJcclxuICAgICAgICAgIChpbnB1dENoYW5nZSk9XCJpbnB1dENvbG9yQ2hhbmdlKCRldmVudClcIlxyXG4gICAgICAgICAgW2Zvcm1hdF09XCJpbnB1dEZvcm1hdFwiXHJcbiAgICAgICAgICBbaWRdPVwidXVpZFwiXHJcbiAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAoZm9jdXMpPVwib3BlblBpY2tlcigpXCJcclxuICAgICAgICAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPCEtLTxkaXYgY2xhc3M9XCJwaWNrZXItc2F2ZS1zaWduXCI+LS0+XHJcbiAgICAgIDwhLS1TLS0+XHJcbiAgICAgIDwhLS08L2Rpdj4tLT5cclxuICAgIDwvZGl2PlxyXG5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJcIiBbbmdDbGFzc109XCJ7J25vLWFscGhhJzogIWFscGhhLCAnb3Blbic6IHBpY2tlck9wZW59XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX01haW5Db2xvclwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0NvbG9yTGF5ZXJcIiBbbmdTdHlsZV09XCJ7YmFja2dyb3VuZENvbG9yOiBjdXJyZW50Q29sb3JNYXh9XCIgPjwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX1NsaWRhYmxlXCIgbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvciAjbWFpbkNvbG9yPVwibGliTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvclwiIChjaGFuZ2UpPVwiY29sb3JQaWNrZXJTZXJ2aWNlLnNhdHVyYXRpb25DaGFuZ2UoJGV2ZW50LCB0aGlzKVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fRHJhZ2dlclwiIGxpYk5neFRUaXRhbkNvbG9yUGlja2VyRHJhZ2dlciBzdHlsZT1cInRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAwcHgsIDBweCk7XCI+PC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0h1ZVBpY2tlclwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX1NsaWRhYmxlXCIgIGxpYk5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3IgI2h1ZVBpY2tlcj1cImxpYk5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JcIiAoY2hhbmdlKT1cImNvbG9yUGlja2VyU2VydmljZS5odWVDaGFuZ2UoJGV2ZW50LCB0aGlzKVwiIFtkaXJlY3Rpb25dPVwiJ3ZlcnRpY2FsJ1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fRHJhZ2dlclwiIGxpYk5neFRUaXRhbkNvbG9yUGlja2VyRHJhZ2dlciBbcGlja2VyUGFkXT1cIjBcIiBzdHlsZT1cIiB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDBweCwgMHB4LCAwcHgpO1wiPjwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19BbHBoYVBpY2tlclwiICpuZ0lmPVwiYWxwaGEgPT09IHRydWVcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19Db2xvckxheWVyXCJcclxuXHJcbiAgICAgICAgICAgW25nU3R5bGVdPVwie2JhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQodG8gdG9wLCAnICsgY3VycmVudENvbG9yQWxwaGFaZXJvICsgJyAgMThweCwgJyArIGN1cnJlbnRDb2xvciArICcgY2FsYygxMDAlIC0gMThweCknfVwiXHJcbiAgICAgID48L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19TbGlkYWJsZVwiICBsaWJOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yICNhbHBoYVBpY2tlcj1cImxpYk5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JcIiAoY2hhbmdlKT1cImNvbG9yUGlja2VyU2VydmljZS5hbHBoYUNoYW5nZSgkZXZlbnQsIHRoaXMpXCIgW2RpcmVjdGlvbl09XCIndmVydGljYWwnXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19EcmFnZ2VyXCIgbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyIFtwaWNrZXJQYWRdPVwiMFwiIHN0eWxlPVwiIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAwcHgsIDBweCk7XCI+PC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8IS0tPGRpdiBzdHlsZT1cImhlaWdodDogNDBweDsgd2lkdGg6IDQwcHhcIiBbbmdTdHlsZV09XCJ7YmFja2dyb3VuZDogY3VycmVudENvbG9yfVwiPi0tPlxyXG5cclxuICAgIDwhLS08L2Rpdj4tLT5cclxuICAgIDwhLS08ZGl2IHN0eWxlPVwiaGVpZ2h0OiA0MHB4OyB3aWR0aDogNDBweFwiIFtuZ1N0eWxlXT1cIntiYWNrZ3JvdW5kOiBjdXJyZW50Q29sb3JBbHBoYX1cIj4tLT5cclxuXHJcbiAgICA8IS0tPC9kaXY+LS0+XHJcbiAgPC9kaXY+XHJcbiAgPGxpYi1uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1wYWxldHRlLWxpc3RcclxuICAgIChjaGFuZ2UpPVwiaW5wdXRDb2xvckNoYW5nZSgkZXZlbnQpXCJcclxuICAgIFtwYWxsZXRzXT1cInBpY2tlclBhbGxldHNcIlxyXG4gID5cclxuXHJcbiAgPC9saWItbmd4LXR0aXRhbi1jb2xvci1waWNrZXItcGFsZXR0ZS1saXN0PlxyXG48L2Rpdj5cclxuXHJcbmAsXG4gIHN0eWxlczogW2A6aG9zdCAqLDpob3N0IDphZnRlciw6aG9zdCA6YmVmb3Jle2JveC1zaXppbmc6Ym9yZGVyLWJveH06aG9zdCAuZGVidWctb3V0cHV0e3dpZHRoOjEwMCU7aGVpZ2h0OjIwcHh9Omhvc3QgLnBpY2tlci1pbnB1dC13cmFwcGVye21hcmdpbi1ib3R0b206NnB4fTpob3N0IC5waWNrZXItaW5wdXQtd3JhcHBlciAucGlja2VyLWlucHV0LWxhYmVse21hcmdpbi1ib3R0b206NnB4fTpob3N0IC5waWNrZXItaW5wdXQtd3JhcHBlciAucGlja2VyLWlucHV0LWxhYmVsIGxhYmVse3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtmb250LXdlaWdodDo2MDB9Omhvc3QgLnBpY2tlci1pbnB1dC13cmFwcGVyIC5waWNrZXItaW5wdXQtaG9sZGVye2Rpc3BsYXk6ZmxleDtoZWlnaHQ6MzNweDtib3JkZXI6MXB4IHNvbGlkICNiYmI7b3ZlcmZsb3c6aGlkZGVuO2JvcmRlci1yYWRpdXM6M3B4O2JhY2tncm91bmQtY29sb3I6I2VlZX06aG9zdCAucGlja2VyLWlucHV0LXdyYXBwZXIgLnBpY2tlci1pbnB1dC1ob2xkZXIgLnBpY2tlci1jb2xvcntmbGV4OjAgMCAzMXB4O2JhY2tncm91bmQtY29sb3I6I2ZmMDMwMH06aG9zdCAucGlja2VyLWlucHV0LXdyYXBwZXIgLnBpY2tlci1pbnB1dC1ob2xkZXIgLnBpY2tlci1pbnB1dHtmbGV4OmF1dG87YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudH06aG9zdCAucGlja2VyLWlucHV0LXdyYXBwZXIgLnBpY2tlci1pbnB1dC1ob2xkZXIgLnBpY2tlci1pbnB1dCBpbnB1dHtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O2NvbG9yOiMyNzI3Mjc7Zm9udC1mYW1pbHk6bW9ub3NwYWNlO2ZvbnQtc2l6ZToxNHB4O2JvcmRlcjpub25lO291dGxpbmU6MDtwYWRkaW5nOjhweCAycHggOHB4IDhweDt3aWR0aDoxMDAlfTpob3N0IC5waWNrZXItaW5wdXQtd3JhcHBlciAucGlja2VyLWlucHV0LWhvbGRlciAucGlja2VyLXNhdmUtc2lnbntmbGV4OjAgMCAzMXB4O2xpbmUtaGVpZ2h0OjMzcHg7dGV4dC1hbGlnbjpjZW50ZXJ9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2Vye21heC1oZWlnaHQ6MDtvdmVyZmxvdzpoaWRkZW47LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lO2Rpc3BsYXk6ZmxleDt0cmFuc2l0aW9uOm1heC1oZWlnaHQgLjNzfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci5vcGVue21hcmdpbi1ib3R0b206NXB4O21heC1oZWlnaHQ6MTY1cHh9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19Db2xvckxheWVye3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MTA7dG9wOjA7bGVmdDowO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7Ym94LXNoYWRvdzppbnNldCAwIDAgMnB4IDAgcmdiYSgwLDAsMCwuNSk7cG9pbnRlci1ldmVudHM6bm9uZX06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX1NsaWRhYmxle2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7Y3Vyc29yOnBvaW50ZXJ9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19EcmFnZ2Vye3Bvc2l0aW9uOnJlbGF0aXZlO3otaW5kZXg6MzA7Ym90dG9tOi45cmVtOy13ZWJraXQtdHJhbnNmb3JtOm5vbmU7dHJhbnNmb3JtOm5vbmU7aGVpZ2h0OjE4cHg7d2lkdGg6MThweDttYXJnaW46MCBhdXRvOy13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW47YmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW47d2lsbC1jaGFuZ2U6dHJhbnNmb3JtO2JhY2tncm91bmQ6MCAwO2JvcmRlcjozcHggc29saWQgI2ZmZjtib3gtc2hhZG93OjAgMCAwIDFweCByZ2JhKDYsNDQsODIsLjEpLDAgMnB4IDE2cHggcmdiYSgzMyw0Myw1NCwuMDgpLGluc2V0IDAgMCAwIDFweCByZ2JhKDYsNDQsODIsLjEpLDAgMnB4IDE2cHggcmdiYSgzMyw0Myw1NCwuMDgpO2JvcmRlci1yYWRpdXM6NTAlO3BvaW50ZXItZXZlbnRzOm5vbmU7dG91Y2gtYWN0aW9uOm5vbmV9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19NYWluQ29sb3J7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQoNDVkZWcsI2RmZTNlOCAyNSUsdHJhbnNwYXJlbnQgMCksbGluZWFyLWdyYWRpZW50KC00NWRlZywjZGZlM2U4IDI1JSx0cmFuc3BhcmVudCAwKSxsaW5lYXItZ3JhZGllbnQoNDVkZWcsdHJhbnNwYXJlbnQgNzUlLCNkZmUzZTggMCksbGluZWFyLWdyYWRpZW50KC00NWRlZyx0cmFuc3BhcmVudCA3NSUsI2RmZTNlOCAwKTtiYWNrZ3JvdW5kLXNpemU6MS42cmVtIDEuNnJlbTtiYWNrZ3JvdW5kLXBvc2l0aW9uOjAgMCwwIC44cmVtLC44cmVtIC0uOHJlbSwtLjhyZW0gMDtwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW47d2lkdGg6MTY1cHg7aGVpZ2h0OjE2NXB4O2JvcmRlci1yYWRpdXM6NHB4O2N1cnNvcjpwb2ludGVyfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fTWFpbkNvbG9yIC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fQ29sb3JMYXllcntib3gtc2hhZG93Omluc2V0IDAgMCAwIDFweCByZ2JhKDYsNDQsODIsLjEpLDAgMnB4IDE2cHggcmdiYSgzMyw0Myw1NCwuMDgpO2JvcmRlci1yYWRpdXM6NHB4fTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fTWFpbkNvbG9yIC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fRHJhZ2dlcntyaWdodDouOXJlbTttYXJnaW46MH06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX01haW5Db2xvcjphZnRlciw6aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX01haW5Db2xvcjpiZWZvcmV7Y29udGVudDpcIlwiO3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MjA7dG9wOjA7bGVmdDowO2Rpc3BsYXk6YmxvY2s7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTtwb2ludGVyLWV2ZW50czpub25lO2JvcmRlci1yYWRpdXM6M3B4fTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fTWFpbkNvbG9yOmJlZm9yZXtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCg5MGRlZywjZmZmLHRyYW5zcGFyZW50KX06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX01haW5Db2xvcjphZnRlcntiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudCgwZGVnLCMwMDAsdHJhbnNwYXJlbnQpO2JveC1zaGFkb3c6aW5zZXQgMCAwIDAgMXB4IHJnYmEoNiw0NCw4MiwuMSksMCAycHggMTZweCByZ2JhKDMzLDQzLDU0LC4wOCl9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19BbHBoYVBpY2tlciw6aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0h1ZVBpY2tlcntwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW47aGVpZ2h0OjE2NXB4O3dpZHRoOjI0cHg7bWFyZ2luLWxlZnQ6LjhyZW07Ym9yZGVyLXdpZHRoOjNweDtib3JkZXItcmFkaXVzOjhyZW07cGFkZGluZzoxM3B4IDB9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19IdWVQaWNrZXJ7YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLHJlZCAwLCNmZjAgMjElLCMwZjAgMzMlLCMwZmYgNTAlLCMwMGYgNjclLCNmMGYgODMlLHJlZCAxMDAlKTtib3gtc2hhZG93Omluc2V0IDAgMCAycHggMCByZ2JhKDAsMCwwLC41KX06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0FscGhhUGlja2Vye2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KDQ1ZGVnLCNkZmUzZTggMjUlLHRyYW5zcGFyZW50IDApLGxpbmVhci1ncmFkaWVudCgtNDVkZWcsI2RmZTNlOCAyNSUsdHJhbnNwYXJlbnQgMCksbGluZWFyLWdyYWRpZW50KDQ1ZGVnLHRyYW5zcGFyZW50IDc1JSwjZGZlM2U4IDApLGxpbmVhci1ncmFkaWVudCgtNDVkZWcsdHJhbnNwYXJlbnQgNzUlLCNkZmUzZTggMCk7YmFja2dyb3VuZC1zaXplOjEuNnJlbSAxLjZyZW07YmFja2dyb3VuZC1wb3NpdGlvbjowIDAsMCAuOHJlbSwuOHJlbSAtLjhyZW0sLS44cmVtIDB9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19BbHBoYVBpY2tlciAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0NvbG9yTGF5ZXJ7Ym9yZGVyLXJhZGl1czo4cmVtfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci5uby1hbHBoYSAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX01haW5Db2xvcnt3aWR0aDoyMDBweH1gXSxcbn0pXG5leHBvcnQgY2xhc3MgTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSkgY29tcG9uZW50Q2xpY2soJGV2ZW50KSB7XG4gICAgaWYoIXRoaXMucGlja2VyT3Blbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZih0eXBlb2YgJGV2ZW50LnBhdGggIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIGxldCBwaWNrZXJGb3VuZCA9IGZhbHNlO1xuICAgICAgJGV2ZW50LnBhdGguZXZlcnkoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICBpZihcbiAgICAgICAgICB0eXBlb2YgaXRlbS5jbGFzc0xpc3QgIT09IFwidW5kZWZpbmVkXCJcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYoXG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5jb250YWlucygncGlja2VyLWlucHV0LWhvbGRlcicpIHx8XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5jb250YWlucygnbmd4LXR0aXRhbi1jb2xvci1waWNrZXInKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcGlja2VyRm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSk7XG5cbiAgICAgIGlmKCFwaWNrZXJGb3VuZCkge1xuICAgICAgICB0aGlzLmNsb3NlUGlja2VyKCk7XG4gICAgICB9XG5cbiAgICB9XG4gIH1cblxuICBASW5wdXQoJ3BpY2tlck9wZW4nKSBwdWJsaWMgcGlja2VyT3BlbkluU3RhcnQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCdhbHBoYScpIHB1YmxpYyBhbHBoYTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoJ2RlYnVnJykgcHVibGljIGRlYnVnOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgnY29sb3InKSBwdWJsaWMgY29sb3I6IHN0cmluZyA9ICdyZ2JhKDI1NSwyNTUsMjU1LDApJztcbiAgQElucHV0KCd0aXRsZScpIHB1YmxpYyB0aXRsZTogc3RyaW5nID0gJ3RpdGxlJztcbiAgQElucHV0KCdvdXRGb3JtYXQnKSBwdWJsaWMgb3V0Rm9ybWF0OiBzdHJpbmcgPSAnaGV4Nic7XG4gIEBJbnB1dCgnaW5wdXRGb3JtYXQnKSBwdWJsaWMgaW5wdXRGb3JtYXQ6IHN0cmluZyA9ICdoZXg2JztcbiAgQElucHV0KCdhdmFpbFBhbGxldHMnKSBwdWJsaWMgYXZhaWxQYWxsZXRzOiBBcnJheTxzdHJpbmc+ID0gWydwb2xhcmlzJywgJ21hdGVyaWFsJ107XG4gIEBJbnB1dCgnY3VzdG9tUGFsbGV0cycpIHB1YmxpYyBjdXN0b21QYWxsZXRzOiAgQXJyYXk8UGFsZXR0ZT4gPSBbXTtcbiAgQE91dHB1dCgnY29sb3JDaGFuZ2VkJykgcHVibGljIGNvbG9yQ2hhbmdlZDogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBAVmlld0NoaWxkKCdwaWNrZXJJbnB1dCcpIHB1YmxpYyBwaWNrZXJJbnB1dDogTmd4VFRpdGFuQ29sb3JQaWNrZXJJbnB1dERpcmVjdGl2ZTtcblxuICBAVmlld0NoaWxkKE5neFRUaXRhbkNvbG9yUGlja2VyUGFsZXR0ZUxpc3RDb21wb25lbnQpIHB1YmxpYyBwYWxldHRlTGlzdDogTmd4VFRpdGFuQ29sb3JQaWNrZXJQYWxldHRlTGlzdENvbXBvbmVudDtcblxuICBAVmlld0NoaWxkKCdtYWluQ29sb3InKSBwdWJsaWMgbWFpbkNvbG9yOiBOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yRGlyZWN0aXZlO1xuICBAVmlld0NoaWxkKCdodWVQaWNrZXInKSBwdWJsaWMgaHVlUGlja2VyOiBOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yRGlyZWN0aXZlO1xuICBAVmlld0NoaWxkKCdhbHBoYVBpY2tlcicpIHB1YmxpYyBhbHBoYVBpY2tlcjogTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvckRpcmVjdGl2ZTtcblxuXG4gIHB1YmxpYyBjb2xvckluaXQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIHBpY2tlck9wZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwdWJsaWMgcGlja2VyUGFsbGV0czogQXJyYXk8UGFsZXR0ZT4gPSBbXTtcblxuICBwdWJsaWMgaHN2YTogSFNWQSA9IHtcbiAgICBodWU6IDAsXG4gICAgc2F0dXJhdGlvbjogMTAwLFxuICAgIHZhbHVlOiAxMDAsXG4gICAgYWxwaGE6IDFcbiAgfTtcblxuICBwdWJsaWMgY3VycmVudENvbG9yOiBzdHJpbmcgPSAncmdiKDI1NSwwLDApJztcbiAgcHVibGljIGN1cnJlbnRDb2xvck1heDogc3RyaW5nID0gJ3JnYmEoMjU1LDAsMCwxKSc7XG4gIHB1YmxpYyBjdXJyZW50Q29sb3JBbHBoYTogc3RyaW5nID0gJ3JnYmEoMjU1LDAsMCwxKSc7XG4gIHB1YmxpYyBjdXJyZW50Q29sb3JBbHBoYVplcm86IHN0cmluZyA9ICdyZ2JhKDI1NSwwLDAsMCknO1xuXG4gIHB1YmxpYyB1dWlkOiBzdHJpbmcgPSAncGlja2VyLSc7XG5cbiAgcHVibGljIGFsbG93ZWRGb3JtYXRzOiBBcnJheTxzdHJpbmc+ID0gWydoZXg2JywgJ2hleDgnLCAncmdiJywgJ3JnYmEnXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgY29sb3JQaWNrZXJTZXJ2aWNlOiBOZ3hUVGl0YW5Db2xvclBpY2tlclNlcnZpY2UsXG4gICAgcHVibGljIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7XG4gICAgdGhpcy51dWlkID0gdGhpcy5jb2xvclBpY2tlclNlcnZpY2UuZ2V0UGlja2VyVXVpZCgpO1xuXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNvbG9yUGlja2VyU2VydmljZS5kZWJ1ZyA9IHRoaXMuZGVidWc7XG4gICAgdGhpcy52YWxpZGF0ZUlucHV0UGFyYW1zKCk7XG4gICAgdGhpcy5jb2xvclBpY2tlclNlcnZpY2UucHJlcGFyZVBpY2tlclBhbGxldHModGhpcy5hdmFpbFBhbGxldHMsIHRoaXMuY3VzdG9tUGFsbGV0cywgdGhpcyk7XG4gICAgdGhpcy5jb2xvclBpY2tlclNlcnZpY2UuY29sb3JUb0RhdGEodGhpcy5jb2xvciwgdGhpcyk7XG4gICAgaWYodGhpcy5waWNrZXJPcGVuSW5TdGFydCkge1xuICAgICAgdGhpcy5vcGVuUGlja2VyKCk7XG4gICAgfVxuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuc2V0RHJhZ2dlc1RvQ3VycmVudENvbG9yKCk7XG4gIH1cblxuICBvcGVuUGlja2VyKCkge1xuICAgIHRoaXMucGlja2VyT3BlbiA9IHRydWU7XG4gICAgaWYodHlwZW9mIHRoaXMucGFsZXR0ZUxpc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLnBhbGV0dGVMaXN0LmNsb3NlUGFsZXR0ZSgpO1xuICAgIH1cbiAgICBpZih0eXBlb2YgdGhpcy5tYWluQ29sb3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLm1haW5Db2xvci5ldmVudHNTdWJzY2liZSgpO1xuICAgIH1cbiAgICBpZih0eXBlb2YgdGhpcy5odWVQaWNrZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLmh1ZVBpY2tlci5ldmVudHNTdWJzY2liZSgpO1xuICAgIH1cbiAgICBpZih0eXBlb2YgdGhpcy5hbHBoYVBpY2tlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMuYWxwaGFQaWNrZXIuZXZlbnRzU3Vic2NpYmUoKTtcbiAgICB9XG4gIH1cblxuICBjbG9zZVBpY2tlcigpIHtcbiAgICBpZih0eXBlb2YgdGhpcy5tYWluQ29sb3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLm1haW5Db2xvci5ldmVudHNVblN1YnNjaWJlKCk7XG4gICAgfVxuICAgIGlmKHR5cGVvZiB0aGlzLmh1ZVBpY2tlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMuaHVlUGlja2VyLmV2ZW50c1VuU3Vic2NpYmUoKTtcbiAgICB9XG4gICAgaWYodHlwZW9mIHRoaXMuYWxwaGFQaWNrZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLmFscGhhUGlja2VyLmV2ZW50c1VuU3Vic2NpYmUoKTtcbiAgICB9XG4gICAgdGhpcy5waWNrZXJPcGVuID0gZmFsc2U7XG4gIH1cblxuICB2YWxpZGF0ZUlucHV0UGFyYW1zKCkge1xuICAgIGlmKHRoaXMuYWxsb3dlZEZvcm1hdHMuaW5kZXhPZih0aGlzLm91dEZvcm1hdCkgPT09IC0xKSB7XG4gICAgICB0aGlzLm91dEZvcm1hdCA9ICdoZXg2JztcbiAgICAgIGNvbnNvbGUuZ3JvdXAoXCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlclwiKTtcbiAgICAgIGNvbnNvbGUud2FybignW291dEZvcm1hdF0gbXVzdCBiZSBvbmUgb2YgdGhpcyAoJyArIHRoaXMuYWxsb3dlZEZvcm1hdHMuam9pbignLCcpICsgJyknKTtcbiAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgICB9XG4gICAgaWYodGhpcy5hbGxvd2VkRm9ybWF0cy5pbmRleE9mKHRoaXMuaW5wdXRGb3JtYXQpID09PSAtMSkge1xuICAgICAgdGhpcy5pbnB1dEZvcm1hdCA9IHRoaXMub3V0Rm9ybWF0ICsgJyc7XG4gICAgICBjb25zb2xlLmdyb3VwKFwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJcIik7XG4gICAgICBjb25zb2xlLndhcm4oJ1tpbnB1dEZvcm1hdF0gbXVzdCBiZSBvbmUgb2YgdGhpcyAoJyArIHRoaXMuYWxsb3dlZEZvcm1hdHMuam9pbignLCcpICsgJyknKTtcbiAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgICB9XG4gIH1cblxuXG4gIGlucHV0Q29sb3JDaGFuZ2UoY29sb3I6IHN0cmluZykge1xuICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICB0aGlzLmNvbG9yUGlja2VyU2VydmljZS5jb2xvclRvRGF0YSh0aGlzLmNvbG9yLCB0aGlzKTtcbiAgICB0aGlzLnNldERyYWdnZXNUb0N1cnJlbnRDb2xvcigpO1xuICB9XG5cbiAgdXBkYXRlUmV0dXJuQ29sb3IoKSB7XG4gICAgdGhpcy5jb2xvciA9IHRoaXMuY29sb3JQaWNrZXJTZXJ2aWNlLnByZXBhcmVSZXR1cm5Db2xvcih0aGlzLmhzdmEsIHRoaXMub3V0Rm9ybWF0KTtcblxuICAgIGlmKHRoaXMuY29sb3JJbml0KSB7XG4gICAgICB0aGlzLmNvbG9yQ2hhbmdlZC5lbWl0KHRoaXMuY29sb3IgKyAnJyk7XG4gICAgfVxuICAgIHRoaXMuY29sb3JJbml0ID0gdHJ1ZTtcbiAgfVxuXG5cbiAgc2V0SW5wdXRWYWx1ZSgpIHtcbiAgICBpZih0eXBlb2YgdGhpcy5waWNrZXJJbnB1dCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMucGlja2VySW5wdXQuc2V0SW5wdXRWYWx1ZShcbiAgICAgICAgdGhpcy5jb2xvclBpY2tlclNlcnZpY2UucHJlcGFyZVJldHVybkNvbG9yKHRoaXMuaHN2YSwgdGhpcy5pbnB1dEZvcm1hdClcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgc2V0RHJhZ2dlc1RvQ3VycmVudENvbG9yKCkge1xuXG4gICAgaWYodHlwZW9mIHRoaXMubWFpbkNvbG9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5tYWluQ29sb3Iuc2V0RHJhZ2dlcihcbiAgICAgICAge1xuICAgICAgICAgIHg6IHRoaXMuaHN2YS5zYXR1cmF0aW9uLFxuICAgICAgICAgIHk6IDEwMCAtIHRoaXMuaHN2YS52YWx1ZVxuICAgICAgICB9XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmKHR5cGVvZiB0aGlzLmh1ZVBpY2tlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMuaHVlUGlja2VyLnNldERyYWdnZXIoe3g6IDAsIHk6IE1hdGgucm91bmQodGhpcy5oc3ZhLmh1ZSAqIDEwMCAvIDM2MCl9KTtcbiAgICB9XG5cbiAgICBpZih0eXBlb2YgdGhpcy5hbHBoYVBpY2tlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5hbHBoYSkge1xuICAgICAgdGhpcy5hbHBoYVBpY2tlci5zZXREcmFnZ2VyKHt4OiAwLCB5OiAxMDAgLSAodGhpcy5oc3ZhLmFscGhhICogMTAwKX0pO1xuICAgIH1cblxuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCB9IGZyb20gJy4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JEaXJlY3RpdmUgfSBmcm9tICcuL25neC10dGl0YW4tY29sb3ItcGlja2VyLXNlbGVjdG9yLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOZ3hUVGl0YW5Db2xvclBpY2tlckRyYWdnZXJEaXJlY3RpdmUgfSBmcm9tICcuL25neC10dGl0YW4tY29sb3ItcGlja2VyLWRyYWdnZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uXCI7XG5pbXBvcnQgeyBOZ3hUVGl0YW5Db2xvclBpY2tlcklucHV0RGlyZWN0aXZlIH0gZnJvbSAnLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1pbnB1dC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTmd4VFRpdGFuQ29sb3JQaWNrZXJQYWxldHRlTGlzdENvbXBvbmVudCB9IGZyb20gJy4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXItcGFsZXR0ZS1saXN0L25neC10dGl0YW4tY29sb3ItcGlja2VyLXBhbGV0dGUtbGlzdC5jb21wb25lbnQnO1xuaW1wb3J0IHtOZ3hUVGl0YW5Db2xvclBpY2tlclNlcnZpY2V9IGZyb20gXCIuL25neC10dGl0YW4tY29sb3ItcGlja2VyLnNlcnZpY2VcIjtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCxcbiAgICBOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yRGlyZWN0aXZlLFxuICAgIE5neFRUaXRhbkNvbG9yUGlja2VyRHJhZ2dlckRpcmVjdGl2ZSxcbiAgICBOZ3hUVGl0YW5Db2xvclBpY2tlcklucHV0RGlyZWN0aXZlLFxuICAgIE5neFRUaXRhbkNvbG9yUGlja2VyUGFsZXR0ZUxpc3RDb21wb25lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW1xuICAgIE5neFRUaXRhbkNvbG9yUGlja2VyU2VydmljZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE5neFRUaXRhbkNvbG9yUGlja2VyTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7SUErQkU7cUJBVHdCLEtBQUs7MEJBQ00sRUFBRTt1QkFDSixFQUFFO3FEQUUwQyxTQUFTLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQzttREFDbEMsU0FBUyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUM7UUFLdkcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDOzs7Ozs7OztLQVN4Qjs7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsT0FBc0IsRUFBRSxlQUE4QztRQUNyRixlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzVDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQztLQUNuQzs7Ozs7O0lBRUQsU0FBUyxDQUFDLE9BQXNCLEVBQUUsZUFBOEM7UUFDOUUsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUM3RCxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQ25DOzs7Ozs7SUFFRCxXQUFXLENBQUMsT0FBc0IsRUFBRSxlQUE4QztRQUNoRixlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQztRQUNyRCxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQ25DOzs7OztJQUVELFdBQVcsQ0FBQyxlQUE4QztRQUN4RCxxQkFBSSxPQUFPLEdBQWtCLElBQUksQ0FBQyxVQUFVLENBQzFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUN4QixlQUFlLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFDL0IsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQzFCLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUMzQixDQUFDO1FBQ0YscUJBQUksVUFBVSxHQUFrQixJQUFJLENBQUMsVUFBVSxDQUM3QyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFDeEIsR0FBRyxFQUNILEdBQUcsRUFDSCxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FDM0IsQ0FBQztRQUVGLGVBQWUsQ0FBQyxZQUFZLEdBQUcsTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQy9GLGVBQWUsQ0FBQyxlQUFlLEdBQUcsT0FBTyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDbEksZUFBZSxDQUFDLGlCQUFpQixHQUFHLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3hILGVBQWUsQ0FBQyxxQkFBcUIsR0FBRyxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFFM0csZUFBZSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ2hDLGVBQWUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0tBR3JDOzs7Ozs7SUFFRCxXQUFXLENBQUMsS0FBYSxFQUFFLGVBQThDO1FBQ3ZFLFFBQVEsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUM7WUFDakMsS0FBSyxNQUFNO2dCQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDO2dCQUFDLE1BQU07WUFDaEUsS0FBSyxLQUFLO2dCQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDO2dCQUFDLE1BQU07WUFDOUQsS0FBSyxNQUFNO2dCQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDO2dCQUFDLE1BQU07WUFDaEUsS0FBSyxLQUFLO2dCQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDO2dCQUFDLE1BQU07WUFDOUQsS0FBSyxNQUFNO2dCQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDO2dCQUFDLE1BQU07WUFDL0QsS0FBSyxNQUFNO2dCQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDO2dCQUFDLE1BQU07U0FDaEU7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQ25DOzs7O0lBRUQsYUFBYTtRQUNYLHFCQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbEIsS0FBSSxxQkFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDNUIsUUFBUSxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ3hELElBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFFLEVBQUU7Z0JBQzVDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMvQixPQUFPLFFBQVEsQ0FBQzthQUNqQjtTQUNGO0tBRUY7Ozs7O0lBR0QsZUFBZSxDQUFDLEtBQWE7UUFDM0IsSUFBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQy9CLE9BQU8sTUFBTSxDQUFDO1NBQ2Y7YUFBTSxJQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDckMsT0FBTyxLQUFLLENBQUM7U0FDZDthQUFNLElBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUN0QyxPQUFPLE1BQU0sQ0FBQztTQUNmO2FBQU0sSUFBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ3JDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7YUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsRUFBQztZQUMvRSxPQUFPLE1BQU0sQ0FBQztTQUNmO2FBQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFDO1lBQ3hELE9BQU8sTUFBTSxDQUFDO1NBQ2Y7YUFBTTtZQUNMLE9BQU8sV0FBVyxDQUFDO1NBQ3BCO0tBQ0Y7Ozs7OztJQUdELHFCQUFxQixDQUFDLE9BQXNCLEVBQUUsZUFBOEM7UUFDMUYsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDeEMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3pDOzs7Ozs7SUFHRCxjQUFjLENBQUMsS0FBSyxFQUFFLGVBQThDO1FBQ2xFLHFCQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3RELHFCQUFJLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDbkIsSUFBSSxDQUFDLHFCQUFxQixDQUN4QixJQUFJLENBQUMsVUFBVSxDQUNiLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDakIsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNqQixRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ2pCLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDbEIsRUFDRCxlQUFlLENBQ2hCLENBQUM7U0FDSDtLQUNGOzs7Ozs7SUFFRCxhQUFhLENBQUMsS0FBSyxFQUFFLGVBQThDO1FBQ2pFLHFCQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3JELHFCQUFJLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDbkIsSUFBSSxDQUFDLHFCQUFxQixDQUN4QixJQUFJLENBQUMsVUFBVSxDQUNiLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDakIsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNqQixRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ2pCLENBQUMsQ0FDRixFQUNELGVBQWUsQ0FDaEIsQ0FBQztTQUNIO0tBQ0Y7Ozs7OztJQUVELGNBQWMsQ0FBQyxLQUFLLEVBQUUsZUFBOEM7UUFDbEUscUJBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN2RSxxQkFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQixJQUFHLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ25CLElBQUksQ0FBQyxxQkFBcUIsQ0FDeEIsSUFBSSxDQUFDLFVBQVUsQ0FDYixRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ2pCLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDakIsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNqQixRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ2xCLEVBQ0QsZUFBZSxDQUNoQixDQUFDO1NBQ0g7S0FDRjs7Ozs7O0lBRUQsYUFBYSxDQUFDLEtBQUssRUFBRSxlQUE4QztRQUNqRSxxQkFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3RFLHFCQUFJLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLElBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDbkIsSUFBSSxDQUFDLHFCQUFxQixDQUN4QixJQUFJLENBQUMsVUFBVSxDQUNiLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDakIsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUNqQixRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ2pCLENBQUMsQ0FDRixFQUNELGVBQWUsQ0FDaEIsQ0FBQztTQUNIO0tBQ0Y7Ozs7OztJQUVELGFBQWEsQ0FBQyxLQUFLLEVBQUUsZUFBOEM7UUFDakUscUJBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxxQkFBcUIsQ0FDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFDbkIsZUFBZSxDQUNoQixDQUFDO0tBQ0g7Ozs7Ozs7O0lBSUQsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDbkIscUJBQUksQ0FBQyxtQkFBRyxDQUFDLG1CQUFFLENBQUMsbUJBQUcsQ0FBQyxtQkFBRSxFQUFFLG1CQUFFLENBQUMsbUJBQUUsQ0FBQyxtQkFBRSxDQUFDLENBQUM7UUFFOUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ3hCLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ1osQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7UUFFWixFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFFeEIsQ0FBQyxHQUFHLENBQUMsR0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBRWQsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFaEIsQ0FBQyxHQUFHLENBQUMsSUFBRyxDQUFDLEdBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWpCLENBQUMsR0FBRyxDQUFDLElBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLENBQUMsSUFBRyxDQUFDLENBQUMsQ0FBQztRQUV0QixRQUFRLEVBQUU7WUFDUixLQUFLLENBQUM7Z0JBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQUMsTUFBTTtZQUNuQyxLQUFLLENBQUM7Z0JBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQUMsTUFBTTtZQUNuQyxLQUFLLENBQUM7Z0JBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQUMsTUFBTTtZQUNuQyxLQUFLLENBQUM7Z0JBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQUMsTUFBTTtZQUNuQyxLQUFLLENBQUM7Z0JBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQUMsTUFBTTtZQUNuQyxLQUFLLENBQUM7Z0JBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQUMsTUFBTTtTQUNwQztRQUVELE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUNyRTs7Ozs7Ozs7O0lBRUQsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFlBQXFCLEtBQUs7UUFDckQscUJBQUksUUFBUSxHQUFrQixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRTFELElBQUcsU0FBUyxFQUFFO1lBQ1osT0FBTyxPQUFPLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7U0FDM0M7UUFFRCxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDZixPQUFPLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztLQUUxQzs7Ozs7Ozs7SUFFRCxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUNuQixDQUFDLElBQUksR0FBRyxDQUFDO1FBQ1QsQ0FBQyxJQUFJLEdBQUcsQ0FBQztRQUNULENBQUMsSUFBSSxHQUFHLENBQUM7UUFFVCxxQkFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxtQkFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JELHFCQUFJLENBQUMsbUJBQUUsQ0FBQyxtQkFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBQ2xCLHFCQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2xCLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBRTNCLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRTtZQUNkLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDUDthQUFNO1lBQ0wsUUFBUSxHQUFHO2dCQUNULEtBQUssQ0FBQztvQkFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFBQyxNQUFNO2dCQUNqRCxLQUFLLENBQUM7b0JBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUFDLE1BQU07Z0JBQ25DLEtBQUssQ0FBQztvQkFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQUMsTUFBTTthQUNwQztZQUVELENBQUMsSUFBSSxDQUFDLENBQUM7U0FDUjtRQUdELE9BQU87WUFDTCxDQUFDLEdBQUcsR0FBRztZQUNQLENBQUMsR0FBRyxHQUFHO1lBQ1AsQ0FBQyxHQUFHLEdBQUc7WUFDUCxDQUFDO1NBQ0YsQ0FBQztLQUNIOzs7Ozs7OztJQUVELFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ25CLENBQUMsSUFBSSxHQUFHLENBQUM7UUFDVCxDQUFDLElBQUksR0FBRyxDQUFDO1FBQ1QsT0FBTTtZQUNKLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxJQUFFLENBQUMsSUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUM7WUFDN0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLElBQUksR0FBRyxDQUFDO1lBQ3ZCLENBQUM7U0FDRixDQUFBO0tBQ0Y7Ozs7Ozs7O0lBRUQsVUFBVSxDQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDcEIsQ0FBQyxJQUFJLEdBQUcsQ0FBQztRQUNULENBQUMsSUFBSSxHQUFHLENBQUM7UUFDVCxDQUFDLElBQUUsQ0FBQyxHQUFDLEVBQUUsR0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztRQUNkLE9BQU07WUFDSixDQUFDO1lBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLElBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQztZQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsSUFBSSxHQUFHLENBQUM7WUFDdkIsQ0FBQztTQUNGLENBQUE7S0FDRjs7Ozs7SUFFRCxTQUFTLENBQUMsR0FBVztRQUVuQixxQkFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUNyQixJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ25CLElBQUksR0FBRztnQkFDTCxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNqQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNqQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNqQyxDQUFDO2FBQ0YsQ0FBQztTQUNIO2FBQU0sSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUMxQixJQUFJLEdBQUc7Z0JBQ0wsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDdkQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDdkQsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDdkQsQ0FBQzthQUNGLENBQUE7U0FDRjthQUFNLElBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDMUIsSUFBSSxHQUFHO2dCQUNMLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ2pDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ2pDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ2pDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2pFLENBQUE7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUU1RDs7Ozs7Ozs7O0lBRUQsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxZQUFxQixJQUFJO1FBQzdDLHFCQUFJLElBQUksR0FBa0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUV0RCxxQkFBSSxFQUFFLElBQVksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBRWxGLElBQUcsU0FBUyxFQUFFO1lBQ1osRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7U0FDdEM7UUFDRCxPQUFPLEdBQUc7WUFDUixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzFFLEVBQUUsQ0FBQztLQUNOOzs7Ozs7SUFHRCxtQkFBbUIsQ0FBQyxLQUFhLEVBQUUsTUFBYztRQUMvQyxRQUFRLE1BQU07WUFDWixLQUFLLE1BQU0sRUFBRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsRCxLQUFLLE1BQU0sRUFBRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEQsS0FBSyxLQUFLLEVBQUUsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEQsS0FBSyxNQUFNLEVBQUUsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBRzFEO1FBQ0QsT0FBTyxVQUFVLENBQUM7S0FDbkI7Ozs7OztJQUVELGlCQUFpQixDQUFDLEtBQWEsRUFBRSxRQUFpQixLQUFLO1FBQ3JELHFCQUFJLE1BQU0sR0FBRyxVQUFVLENBQUM7UUFDeEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQy9CLElBQUcsQ0FBQyxLQUFLLEVBQUU7WUFDVCxJQUFHLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUNyQixJQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRTtvQkFDOUIsT0FBTyxHQUFHLEdBQUcsS0FBSyxDQUFDO2lCQUNwQjthQUNGO1NBQ0Y7YUFBTTtZQUNMLElBQUcsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQ3JCLElBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFO29CQUM5QixPQUFPLEdBQUcsR0FBRyxLQUFLLENBQUM7aUJBQ3BCO2FBQ0Y7U0FDRjtRQUVELE9BQU8sTUFBTSxDQUFDO0tBQ2Y7Ozs7OztJQUVELGtCQUFrQixDQUFDLEtBQWEsRUFBRSxRQUFpQixLQUFLO1FBQ3RELHFCQUFJLE1BQU0sR0FBRyxVQUFVLENBQUM7UUFDeEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLHFCQUFJLE1BQU0sR0FBMkIsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0RCxxQkFBSSxRQUFRLEdBQW9CLEVBQUUsQ0FBQztRQUVuQyxJQUFHLENBQUMsS0FBSyxFQUFFO1lBQ1QsSUFBRyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtnQkFDckIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBUyxHQUFXLElBQUUsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUEsRUFBQyxDQUFDLENBQUM7Z0JBQ2pFLElBQ0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEdBQUc7b0JBQ25DLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUNsQyxFQUFFO29CQUNBLE9BQU8sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO2lCQUN4QzthQUNGO1NBQ0Y7YUFBTTtZQUNMLElBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQ3JCLFFBQVEsR0FBRyxVQUFVLG1CQUFTLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBQyxDQUFDO2dCQUM1QyxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFTLEdBQVcsSUFBRSxPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQSxFQUFDLENBQUMsQ0FBQztnQkFDakUsSUFDRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRztvQkFDbkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ2pDLFFBQVEsSUFBSSxDQUFDLElBQUksUUFBUSxJQUFJLENBQy9CLEVBQUU7b0JBQ0EsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDdEIsT0FBTyxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7aUJBQ3pDO2FBQ0Y7U0FDRjtRQUVELE9BQU8sTUFBTSxDQUFDO0tBQ2Y7Ozs7OztJQUVELGtCQUFrQixDQUFDLElBQVUsRUFBRSxNQUFjO1FBQzNDLFFBQVEsTUFBTTtZQUNaLEtBQUssTUFBTSxFQUFFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDcEYsS0FBSyxNQUFNLEVBQUUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDNUYsS0FBSyxLQUFLLEVBQUUsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbkYsS0FBSyxNQUFNLEVBQUUsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNwRztRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDeEU7Ozs7Ozs7SUFFRCxvQkFBb0IsQ0FBQyxlQUE4QixFQUFFLEVBQUUsZ0JBQWdDLEVBQUUsRUFBRSxlQUE4QztRQUN2SSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU87WUFDM0IsSUFBRyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDMUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDN0M7U0FDRixDQUFDLENBQUM7UUFDSCxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTztZQUM1QixlQUFlLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM3QyxDQUFDLENBQUE7S0FFSDs7OztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUNoQixFQUFFLEVBQUUsU0FBUztZQUNiLElBQUksRUFBRSxTQUFTO1lBQ2YsTUFBTSxFQUFFO2dCQUNOLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQzFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQzFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQzFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO2dCQUNyRCxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUztnQkFDckQsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQ3JELFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO2dCQUNyRCxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUztnQkFDckQsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQ3JELFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO2dCQUNyRCxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUzthQUN0RDtTQUNGLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQ2hCLEVBQUUsRUFBRSxVQUFVO1lBQ2QsSUFBSSxFQUFFLFVBQVU7WUFDaEIsTUFBTSxFQUFFO2dCQUNOLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO2dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUztnQkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO2dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUztnQkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO2dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUztnQkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO2dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUztnQkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO2dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUztnQkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxF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