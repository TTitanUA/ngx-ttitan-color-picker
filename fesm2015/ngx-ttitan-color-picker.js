import { Injectable, Directive, ElementRef, Input, ContentChild, EventEmitter, HostListener, Output, Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, NgModule } from '@angular/core';
import { fromEvent } from 'rxjs/index';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgxTTitanColorPickerService {
    constructor() {
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
            this.fillValuesFromHsvaArr(this.rgbaToHsva(parseInt(aus2[0]), parseInt(aus2[1]), parseInt(aus2[2]), parseFloat(aus2[3])), pickerComponent);
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
            this.fillValuesFromHsvaArr(this.hslaToHsva(parseInt(aus2[0]), parseInt(aus2[1]), parseInt(aus2[2]), parseFloat(aus2[3])), pickerComponent);
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
        pickerComponent.pickerPallets = [];
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
    pickerPad: [{ type: Input, args: ['pickerPad',] }],
    _context: [{ type: Input, args: ['context',] }]
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
        this.change = new EventEmitter();
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
    onMouseDown($event) {
        this.dragStart = true;
        this.eventsSubscibe();
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
        // this.eventsUnSubscibe();
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
        //
        this.globalMouseMove = this.colorPickerService.mouseMoveObservable.subscribe((event) => {
            if (this.dragStart) {
                this.getPosition(/** @type {?} */ (event));
            }
        });
        this.globalMouseUp = this.colorPickerService.mouseUpObservable.subscribe((event) => {
            if (this.dragStart) {
                this.dragStart = false;
                this.eventsUnSubscibe();
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
    onMouseDown: [{ type: HostListener, args: ['mousedown', ['$event'],] }],
    direction: [{ type: Input, args: ['direction',] }],
    _context: [{ type: Input, args: ['context',] }],
    change: [{ type: Output, args: ['change',] }],
    dragger: [{ type: ContentChild, args: [NgxTTitanColorPickerDraggerDirective,] }]
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
        this._context.closePicker();
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
    _context: [{ type: Input, args: ['context',] }],
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
        this.options = {};
        this.color = '#ffffff';
        this.title = '';
        this.colorChange = new EventEmitter();
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
    componentClick($event) {
        if (!this.pickerOpen) {
            return;
        }
        if (this._pickerConfig.noHide) {
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
        this.validateInputParams();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if ('options' in changes) {
            this.validateInputParams();
        }
        if ('color' in changes) {
            if (changes["color"].currentValue !== changes["color"].previousValue) {
                setTimeout(() => {
                    this.colorPickerService.colorToData(this.color, this);
                    this.setDraggersToCurrentColor();
                }, 1);
            }
        }
    }
    /**
     * @return {?}
     */
    openPicker() {
        this.pickerOpen = true;
        if (typeof this.paletteList !== 'undefined') {
            this.paletteList.closePalette();
        }
    }
    /**
     * @return {?}
     */
    closePicker() {
        this.pickerOpen = false;
        this.cdr.detectChanges();
    }
    /**
     * @return {?}
     */
    validateInputParams() {
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
    }
    /**
     * @param {?} color
     * @return {?}
     */
    inputColorChange(color) {
        this.color = color;
        this.colorPickerService.colorToData(this.color, this);
        this.setDraggersToCurrentColor();
    }
    /**
     * @return {?}
     */
    updateReturnColor() {
        this.color = this.colorPickerService.prepareReturnColor(this.hsva, this._pickerConfig.outFormat);
        if (this.colorInit) {
            if (this.oldColor !== this.color) {
                this.oldColor = this.color + '';
                this.colorChange.emit(this.color + '');
            }
        }
        this.colorInit = true;
    }
    /**
     * @return {?}
     */
    setInputValue() {
        if (typeof this.pickerInput !== 'undefined') {
            this.pickerInput.setInputValue(this.colorPickerService.prepareReturnColor(this.hsva, this._pickerConfig.inputFormat));
        }
    }
    /**
     * @return {?}
     */
    setDraggersToCurrentColor() {
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
      *ngIf="_pickerConfig.debug"
    >
      {{color}}
    </div>
    <div class="picker-input-label" *ngIf="title !== ''">
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
          [format]="_pickerConfig.inputFormat"
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
  <div class="ngx-ttitan-color-picker" [ngClass]="{'no-alpha': !_pickerConfig.alpha, 'open': pickerOpen}">
    <div class="ngx-ttitan-color-picker__MainColor">
      <div class="ngx-ttitan-color-picker__ColorLayer" [ngStyle]="{backgroundColor: currentColorMax}" ></div>
      <div class="ngx-ttitan-color-picker__Slidable"
           libNgxTTitanColorPickerSelector
           #mainColor="libNgxTTitanColorPickerSelector"
           [context]="this"
           (change)="colorPickerService.saturationChange($event, this)"
      >
        <div class="ngx-ttitan-color-picker__Dragger"
             libNgxTTitanColorPickerDragger
             [context]="this"
             style="transform: translate3d(0px, 0px, 0px);"
        ></div>
      </div>
    </div>
    <div class="ngx-ttitan-color-picker__HuePicker">
      <div class="ngx-ttitan-color-picker__Slidable"
           libNgxTTitanColorPickerSelector
           #huePicker="libNgxTTitanColorPickerSelector"
           (change)="colorPickerService.hueChange($event, this)"
           [direction]="'vertical'"
           [context]="this"
      >
        <div class="ngx-ttitan-color-picker__Dragger"
             libNgxTTitanColorPickerDragger
             [pickerPad]="0"
             style=" transform: translate3d(0px, 0px, 0px);"
             [context]="this"
        ></div>
      </div>
    </div>
    <div class="ngx-ttitan-color-picker__AlphaPicker" *ngIf="_pickerConfig.alpha === true">
      <div class="ngx-ttitan-color-picker__ColorLayer"
           [ngStyle]="{background: 'linear-gradient(to top, ' + currentColorAlphaZero + '  18px, ' + currentColor + ' calc(100% - 18px)'}"
      ></div>
      <div class="ngx-ttitan-color-picker__Slidable"
           libNgxTTitanColorPickerSelector
           #alphaPicker="libNgxTTitanColorPickerSelector"
           (change)="colorPickerService.alphaChange($event, this)"
           [direction]="'vertical'"
           [context]="this"
      >
        <div class="ngx-ttitan-color-picker__Dragger"
             libNgxTTitanColorPickerDragger
             [pickerPad]="0" style=" transform: translate3d(0px, 0px, 0px);"
             [context]="this"
        ></div>
      </div>
    </div>
  </div>
  <lib-ngx-ttitan-color-picker-palette-list
    (change)="inputColorChange($event)"
    [pallets]="pickerPallets"
    [context]="this"
  ></lib-ngx-ttitan-color-picker-palette-list>
</div>

`,
                styles: [`:host *,:host :after,:host :before{box-sizing:border-box}:host .debug-output{width:100%;height:20px}:host .picker-input-wrapper{margin-bottom:6px}:host .picker-input-wrapper .picker-input-label{margin-bottom:6px}:host .picker-input-wrapper .picker-input-label label{text-transform:uppercase;font-weight:600}:host .picker-input-wrapper .picker-input-holder{display:flex;height:33px;border:1px solid #bbb;overflow:hidden;border-radius:3px;background-color:#eee}:host .picker-input-wrapper .picker-input-holder .picker-color{flex:0 0 31px;background-color:#ff0300}:host .picker-input-wrapper .picker-input-holder .picker-input{flex:auto;background-color:transparent}:host .picker-input-wrapper .picker-input-holder .picker-input input{background-color:transparent;color:#272727;font-family:monospace;font-size:14px;border:none;outline:0;padding:8px 2px 8px 8px;width:100%}:host .picker-input-wrapper .picker-input-holder .picker-save-sign{flex:0 0 31px;line-height:33px;text-align:center}:host .ngx-ttitan-color-picker{max-height:0;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:flex;transition:max-height .3s}:host .ngx-ttitan-color-picker.open{margin-bottom:5px;max-height:165px}:host .ngx-ttitan-color-picker__ColorLayer{position:absolute;z-index:10;top:0;left:0;height:100%;width:100%;box-shadow:inset 0 0 2px 0 rgba(0,0,0,.5);pointer-events:none}:host .ngx-ttitan-color-picker__Slidable{height:100%;width:100%;cursor:pointer}:host .ngx-ttitan-color-picker__Dragger{position:relative;z-index:30;bottom:.9rem;-webkit-transform:none;transform:none;height:18px;width:18px;margin:0 auto;-webkit-backface-visibility:hidden;backface-visibility:hidden;will-change:transform;background:0 0;border:3px solid #fff;box-shadow:0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08),inset 0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08);border-radius:50%;pointer-events:none;touch-action:none}:host .ngx-ttitan-color-picker__MainColor{background-image:linear-gradient(45deg,#dfe3e8 25%,transparent 0),linear-gradient(-45deg,#dfe3e8 25%,transparent 0),linear-gradient(45deg,transparent 75%,#dfe3e8 0),linear-gradient(-45deg,transparent 75%,#dfe3e8 0);background-size:1.6rem 1.6rem;background-position:0 0,0 .8rem,.8rem -.8rem,-.8rem 0;position:relative;overflow:hidden;flex:auto;border-radius:4px;cursor:pointer}:host .ngx-ttitan-color-picker__MainColor .ngx-ttitan-color-picker__ColorLayer{box-shadow:inset 0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08);border-radius:4px}:host .ngx-ttitan-color-picker__MainColor .ngx-ttitan-color-picker__Dragger{right:.9rem;margin:0}:host .ngx-ttitan-color-picker__MainColor:after,:host .ngx-ttitan-color-picker__MainColor:before{content:"";position:absolute;z-index:20;top:0;left:0;display:block;height:100%;width:100%;pointer-events:none;border-radius:3px}:host .ngx-ttitan-color-picker__MainColor:before{background:linear-gradient(90deg,#fff,transparent)}:host .ngx-ttitan-color-picker__MainColor:after{background-image:linear-gradient(0deg,#000,transparent);box-shadow:inset 0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08)}:host .ngx-ttitan-color-picker__AlphaPicker,:host .ngx-ttitan-color-picker__HuePicker{position:relative;overflow:hidden;height:165px;width:24px;flex:0 0 24px;margin-left:.8rem;border-width:3px;border-radius:8rem;padding:13px 0}:host .ngx-ttitan-color-picker__HuePicker{background:linear-gradient(to bottom,red 0,#ff0 21%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%);box-shadow:inset 0 0 2px 0 rgba(0,0,0,.5)}:host .ngx-ttitan-color-picker__AlphaPicker{background-image:linear-gradient(45deg,#dfe3e8 25%,transparent 0),linear-gradient(-45deg,#dfe3e8 25%,transparent 0),linear-gradient(45deg,transparent 75%,#dfe3e8 0),linear-gradient(-45deg,transparent 75%,#dfe3e8 0);background-size:1.6rem 1.6rem;background-position:0 0,0 .8rem,.8rem -.8rem,-.8rem 0}:host .ngx-ttitan-color-picker__AlphaPicker .ngx-ttitan-color-picker__ColorLayer{border-radius:8rem}:host .ngx-ttitan-color-picker.no-alpha .ngx-ttitan-color-picker__MainColor{width:200px}`],
            },] },
];
/** @nocollapse */
NgxTTitanColorPickerComponent.ctorParameters = () => [
    { type: NgxTTitanColorPickerService },
    { type: ChangeDetectorRef }
];
NgxTTitanColorPickerComponent.propDecorators = {
    componentClick: [{ type: HostListener, args: ['click', ['$event'],] }],
    options: [{ type: Input, args: ['options',] }],
    color: [{ type: Input, args: ['color',] }],
    title: [{ type: Input, args: ['title',] }],
    colorChange: [{ type: Output, args: ['colorChange',] }],
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXR0aXRhbi1jb2xvci1waWNrZXIuanMubWFwIiwic291cmNlcyI6WyJuZzovL25neC10dGl0YW4tY29sb3ItcGlja2VyL2xpYi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci9saWIvbmd4LXR0aXRhbi1jb2xvci1waWNrZXItZHJhZ2dlci5kaXJlY3RpdmUudHMiLCJuZzovL25neC10dGl0YW4tY29sb3ItcGlja2VyL2xpYi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1zZWxlY3Rvci5kaXJlY3RpdmUudHMiLCJuZzovL25neC10dGl0YW4tY29sb3ItcGlja2VyL2xpYi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1pbnB1dC5kaXJlY3RpdmUudHMiLCJuZzovL25neC10dGl0YW4tY29sb3ItcGlja2VyL2xpYi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1wYWxldHRlLWxpc3Qvbmd4LXR0aXRhbi1jb2xvci1waWNrZXItcGFsZXR0ZS1saXN0LmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIvbGliL25neC10dGl0YW4tY29sb3ItcGlja2VyLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIvbGliL25neC10dGl0YW4tY29sb3ItcGlja2VyLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50fSBmcm9tIFwiLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci5jb21wb25lbnRcIjtcbmltcG9ydCB7ZnJvbUV2ZW50LCBPYnNlcnZhYmxlfSBmcm9tIFwicnhqcy9pbmRleFwiO1xuaW1wb3J0IHt3aW5kb3d9IGZyb20gXCJyeGpzL2ludGVybmFsL29wZXJhdG9yc1wiO1xuaW1wb3J0IHtDdXN0b21QZXJjZW50LCBIU1ZBLCBQYWxldHRlfSBmcm9tIFwiLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci5pbnRlcmZhY2VcIjtcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmd4VFRpdGFuQ29sb3JQaWNrZXJTZXJ2aWNlIHtcblxuICBwdWJsaWMgcGlja2VyTGlzdDogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICBwdWJsaWMgcGFsbGV0czogQXJyYXk8UGFsZXR0ZT4gPSBbXTtcblxuICBwdWJsaWMgbW91c2VNb3ZlT2JzZXJ2YWJsZTogT2JzZXJ2YWJsZTxNb3VzZUV2ZW50PiA9IDxPYnNlcnZhYmxlPE1vdXNlRXZlbnQ+PmZyb21FdmVudChkb2N1bWVudCwgJ21vdXNlbW92ZScpO1xuICBwdWJsaWMgbW91c2VVcE9ic2VydmFibGU6IE9ic2VydmFibGU8TW91c2VFdmVudD4gPSA8T2JzZXJ2YWJsZTxNb3VzZUV2ZW50Pj5mcm9tRXZlbnQoZG9jdW1lbnQsICdtb3VzZXVwJyk7XG4gIC8vIHB1YmxpYyBtb3VzZU1vdmVPYnNlcnZhYmxlOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIC8vIHB1YmxpYyBtb3VzZVVwT2JzZXJ2YWJsZTogRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZmlsbEJhc2VQYWxsZXRzKCk7XG4gICAgLy9cbiAgICAvLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoJGV2ZW50KSA9PiB7XG4gICAgLy8gICB0aGlzLm1vdXNlTW92ZU9ic2VydmFibGUuZW1pdCg8TW91c2VFdmVudD4kZXZlbnQpO1xuICAgIC8vIH0pO1xuICAgIC8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoJGV2ZW50KSA9PiB7XG4gICAgLy8gICB0aGlzLm1vdXNlVXBPYnNlcnZhYmxlLmVtaXQoPE1vdXNlRXZlbnQ+JGV2ZW50KTtcbiAgICAvLyB9KTtcblxuICB9XG5cbiAgc2F0dXJhdGlvbkNoYW5nZShwZXJjZW50OiBDdXN0b21QZXJjZW50LCBwaWNrZXJDb21wb25lbnQ6IE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50ICkge1xuICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLnNhdHVyYXRpb24gPSBwZXJjZW50Lng7XG4gICAgcGlja2VyQ29tcG9uZW50LmhzdmEudmFsdWUgPSAoMTAwIC0gcGVyY2VudC55KTtcbiAgICB0aGlzLmRhdGFUb0NvbG9yKHBpY2tlckNvbXBvbmVudCk7XG4gIH1cblxuICBodWVDaGFuZ2UocGVyY2VudDogQ3VzdG9tUGVyY2VudCwgcGlja2VyQ29tcG9uZW50OiBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCkge1xuICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLmh1ZSA9IE1hdGgucm91bmQoMzYwICogcGVyY2VudC55IC8gMTAwKTtcbiAgICB0aGlzLmRhdGFUb0NvbG9yKHBpY2tlckNvbXBvbmVudCk7XG4gIH1cblxuICBhbHBoYUNoYW5nZShwZXJjZW50OiBDdXN0b21QZXJjZW50LCBwaWNrZXJDb21wb25lbnQ6IE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50KSB7XG4gICAgcGlja2VyQ29tcG9uZW50LmhzdmEuYWxwaGEgPSAoMTAwIC0gcGVyY2VudC55KSAvIDEwMDtcbiAgICB0aGlzLmRhdGFUb0NvbG9yKHBpY2tlckNvbXBvbmVudCk7XG4gIH1cblxuICBkYXRhVG9Db2xvcihwaWNrZXJDb21wb25lbnQ6IE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50KSB7XG4gICAgbGV0IHJnYmFBcnI6IEFycmF5PG51bWJlcj4gPSB0aGlzLmhzdmFUb1JnYmEoXG4gICAgICBwaWNrZXJDb21wb25lbnQuaHN2YS5odWUsXG4gICAgICBwaWNrZXJDb21wb25lbnQuaHN2YS5zYXR1cmF0aW9uLFxuICAgICAgcGlja2VyQ29tcG9uZW50LmhzdmEudmFsdWUsXG4gICAgICBwaWNrZXJDb21wb25lbnQuaHN2YS5hbHBoYVxuICAgICk7XG4gICAgbGV0IHJnYmFNYXhBcnI6IEFycmF5PG51bWJlcj4gPSB0aGlzLmhzdmFUb1JnYmEoXG4gICAgICBwaWNrZXJDb21wb25lbnQuaHN2YS5odWUsXG4gICAgICAxMDAsXG4gICAgICAxMDAsXG4gICAgICBwaWNrZXJDb21wb25lbnQuaHN2YS5hbHBoYVxuICAgICk7XG5cbiAgICBwaWNrZXJDb21wb25lbnQuY3VycmVudENvbG9yID0gJ3JnYignICsgcmdiYUFyclswXSArICcsJyArIHJnYmFBcnJbMV0gKyAnLCcgKyByZ2JhQXJyWzJdICsgJyknO1xuICAgIHBpY2tlckNvbXBvbmVudC5jdXJyZW50Q29sb3JNYXggPSAncmdiYSgnICsgcmdiYU1heEFyclswXSArICcsJyArIHJnYmFNYXhBcnJbMV0gKyAnLCcgKyByZ2JhTWF4QXJyWzJdICsgJywnICsgcmdiYU1heEFyclszXSArICcpJztcbiAgICBwaWNrZXJDb21wb25lbnQuY3VycmVudENvbG9yQWxwaGEgPSAncmdiYSgnICsgcmdiYUFyclswXSArICcsJyArIHJnYmFBcnJbMV0gKyAnLCcgKyByZ2JhQXJyWzJdICsgJywnICsgcmdiYUFyclszXSArICcpJztcbiAgICBwaWNrZXJDb21wb25lbnQuY3VycmVudENvbG9yQWxwaGFaZXJvID0gJ3JnYmEoJyArIHJnYmFBcnJbMF0gKyAnLCcgKyByZ2JhQXJyWzFdICsgJywnICsgcmdiYUFyclsyXSArICcsMCknO1xuXG4gICAgcGlja2VyQ29tcG9uZW50LnNldElucHV0VmFsdWUoKTtcbiAgICBwaWNrZXJDb21wb25lbnQudXBkYXRlUmV0dXJuQ29sb3IoKTtcblxuXG4gIH1cblxuICBjb2xvclRvRGF0YShjb2xvcjogc3RyaW5nLCBwaWNrZXJDb21wb25lbnQ6IE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50KSB7XG4gICAgc3dpdGNoICh0aGlzLmRldGVjdENvbG9yVHlwZShjb2xvcikpIHtcbiAgICAgIGNhc2UgXCJyZ2JhXCI6IHRoaXMucGFyc2VSZ2JhQ29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudCk7IGJyZWFrO1xuICAgICAgY2FzZSBcInJnYlwiOiB0aGlzLnBhcnNlUmdiQ29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudCk7IGJyZWFrO1xuICAgICAgY2FzZSBcImhzbGFcIjogdGhpcy5wYXJzZUhzbGFDb2xvcihjb2xvciwgcGlja2VyQ29tcG9uZW50KTsgYnJlYWs7XG4gICAgICBjYXNlIFwiaHNsXCI6IHRoaXMucGFyc2VIc2xDb2xvcihjb2xvciwgcGlja2VyQ29tcG9uZW50KTsgYnJlYWs7XG4gICAgICBjYXNlIFwiaGV4NlwiOiB0aGlzLnBhcnNlSGV4Q29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudCk7IGJyZWFrO1xuICAgICAgY2FzZSBcImhleDhcIjogdGhpcy5wYXJzZUhleENvbG9yKGNvbG9yLCBwaWNrZXJDb21wb25lbnQpOyBicmVhaztcbiAgICB9XG4gICAgdGhpcy5kYXRhVG9Db2xvcihwaWNrZXJDb21wb25lbnQpO1xuICB9XG5cbiAgZ2V0UGlja2VyVXVpZCgpIHtcbiAgICBsZXQgcGlja2VySWQgPSAnJztcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgMTAwMDsgaSsrKSB7XG4gICAgICBwaWNrZXJJZCA9ICdwaWNrZXItJyArIHRoaXMucGlja2VyTGlzdC5sZW5ndGggKyAnLScgKyBpO1xuICAgICAgaWYodGhpcy5waWNrZXJMaXN0LmluZGV4T2YocGlja2VySWQpID09PSAtMSApIHtcbiAgICAgICAgdGhpcy5waWNrZXJMaXN0LnB1c2gocGlja2VySWQpO1xuICAgICAgICByZXR1cm4gcGlja2VySWQ7XG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxuXG4gIGRldGVjdENvbG9yVHlwZShjb2xvcjogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZihjb2xvci5pbmRleE9mKCdyZ2JhJykgIT09IC0xKSB7XG4gICAgICByZXR1cm4gJ3JnYmEnO1xuICAgIH0gZWxzZSBpZihjb2xvci5pbmRleE9mKCdyZ2InKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiAncmdiJztcbiAgICB9IGVsc2UgaWYoY29sb3IuaW5kZXhPZignaHNsYScpICE9PSAtMSkge1xuICAgICAgcmV0dXJuICdoc2xhJztcbiAgICB9IGVsc2UgaWYoY29sb3IuaW5kZXhPZignaHNsJykgIT09IC0xKSB7XG4gICAgICByZXR1cm4gJ2hzbCc7XG4gICAgfSBlbHNlIGlmIChjb2xvci5pbmRleE9mKCcjJykgIT09IC0xICYmIChjb2xvci5sZW5ndGggPT0gNCB8fCBjb2xvci5sZW5ndGggPT0gNykpe1xuICAgICAgcmV0dXJuICdoZXg2JztcbiAgICB9IGVsc2UgaWYgKGNvbG9yLmluZGV4T2YoJyMnKSAhPT0gLTEgJiYgY29sb3IubGVuZ3RoID09IDkpe1xuICAgICAgcmV0dXJuICdoZXg4JztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICd1bmRlZmluZWQnO1xuICAgIH1cbiAgfVxuXG5cbiAgZmlsbFZhbHVlc0Zyb21Ic3ZhQXJyKGhzdmFBcnI6IEFycmF5PG51bWJlcj4sIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBwaWNrZXJDb21wb25lbnQuaHN2YS5odWUgPSBoc3ZhQXJyWzBdO1xuICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLnNhdHVyYXRpb24gPSBoc3ZhQXJyWzFdO1xuICAgIHBpY2tlckNvbXBvbmVudC5oc3ZhLnZhbHVlID0gaHN2YUFyclsyXTtcbiAgICBwaWNrZXJDb21wb25lbnQuaHN2YS5hbHBoYSA9IGhzdmFBcnJbM107XG4gIH1cblxuXG4gIHBhcnNlUmdiYUNvbG9yKGNvbG9yLCBwaWNrZXJDb21wb25lbnQ6IE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50KSB7XG4gICAgbGV0IGF1cyA9IGNvbG9yLnJlcGxhY2UoJ3JnYmEoJywgJycpLnJlcGxhY2UoJyknLCAnJyk7XG4gICAgbGV0IGF1czIgPSBhdXMuc3BsaXQoJywnKTtcbiAgICBpZihhdXMyLmxlbmd0aCA9PSA0KSB7XG4gICAgICB0aGlzLmZpbGxWYWx1ZXNGcm9tSHN2YUFycihcbiAgICAgICAgdGhpcy5yZ2JhVG9Ic3ZhKFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbMF0pLFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbMV0pLFxuICAgICAgICAgIHBhcnNlSW50KGF1czJbMl0pLFxuICAgICAgICAgIHBhcnNlRmxvYXQoYXVzMlszXSksXG4gICAgICAgICksXG4gICAgICAgIHBpY2tlckNvbXBvbmVudFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwYXJzZVJnYkNvbG9yKGNvbG9yLCBwaWNrZXJDb21wb25lbnQ6IE5neFRUaXRhbkNvbG9yUGlja2VyQ29tcG9uZW50KSB7XG4gICAgbGV0IGF1cyA9IGNvbG9yLnJlcGxhY2UoJ3JnYignLCAnJykucmVwbGFjZSgnKScsICcnKTtcbiAgICBsZXQgYXVzMiA9IGF1cy5zcGxpdCgnLCcpO1xuICAgIGlmKGF1czIubGVuZ3RoID09IDMpIHtcbiAgICAgIHRoaXMuZmlsbFZhbHVlc0Zyb21Ic3ZhQXJyKFxuICAgICAgICB0aGlzLnJnYmFUb0hzdmEoXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlswXSksXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlsxXSksXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlsyXSksXG4gICAgICAgICAgMVxuICAgICAgICApLFxuICAgICAgICBwaWNrZXJDb21wb25lbnRcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcGFyc2VIc2xhQ29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudDogTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQpIHtcbiAgICBsZXQgYXVzID0gY29sb3IucmVwbGFjZSgnaHNsYSgnLCAnJykucmVwbGFjZSgnKScsICcnKS5yZXBsYWNlKCclJywgJycpO1xuICAgIGxldCBhdXMyID0gYXVzLnNwbGl0KCcsJyk7XG4gICAgaWYoYXVzMi5sZW5ndGggPT0gNCkge1xuICAgICAgdGhpcy5maWxsVmFsdWVzRnJvbUhzdmFBcnIoXG4gICAgICAgIHRoaXMuaHNsYVRvSHN2YShcbiAgICAgICAgICBwYXJzZUludChhdXMyWzBdKSxcbiAgICAgICAgICBwYXJzZUludChhdXMyWzFdKSxcbiAgICAgICAgICBwYXJzZUludChhdXMyWzJdKSxcbiAgICAgICAgICBwYXJzZUZsb2F0KGF1czJbM10pLFxuICAgICAgICApLFxuICAgICAgICBwaWNrZXJDb21wb25lbnRcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcGFyc2VIc2xDb2xvcihjb2xvciwgcGlja2VyQ29tcG9uZW50OiBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCkge1xuICAgIGxldCBhdXMgPSBjb2xvci5yZXBsYWNlKCdoc2woJywgJycpLnJlcGxhY2UoJyknLCAnJykucmVwbGFjZSgnJScsICcnKTtcbiAgICBsZXQgYXVzMiA9IGF1cy5zcGxpdCgnLCcpO1xuICAgIGlmKGF1czIubGVuZ3RoID09IDMpIHtcbiAgICAgIHRoaXMuZmlsbFZhbHVlc0Zyb21Ic3ZhQXJyKFxuICAgICAgICB0aGlzLmhzbGFUb0hzdmEoXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlswXSksXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlsxXSksXG4gICAgICAgICAgcGFyc2VJbnQoYXVzMlsyXSksXG4gICAgICAgICAgMVxuICAgICAgICApLFxuICAgICAgICBwaWNrZXJDb21wb25lbnRcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcGFyc2VIZXhDb2xvcihjb2xvciwgcGlja2VyQ29tcG9uZW50OiBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCkge1xuICAgIGxldCBhdXMgPSBjb2xvci5yZXBsYWNlKCcjJywgJycpO1xuICAgIHRoaXMuZmlsbFZhbHVlc0Zyb21Ic3ZhQXJyKFxuICAgICAgdGhpcy5oZXhUb0hzdmEoYXVzKSxcbiAgICAgIHBpY2tlckNvbXBvbmVudFxuICAgICk7XG4gIH1cblxuXG5cbiAgaHN2YVRvUmdiYShILCBTLCBWLCBBKTogQXJyYXk8bnVtYmVyPiB7XG4gICAgbGV0IGYgLCBwLCBxICwgdCwgbEgsIFIsIEcsIEI7XG5cbiAgICBIID0gKEggPCAzNjApID8gSCA6IDM1OTtcbiAgICBTID0gUyAvIDEwMDtcbiAgICBWID0gViAvIDEwMDtcblxuICAgIGxIID0gTWF0aC5mbG9vcihIIC8gNjApO1xuXG4gICAgZiA9IEgvNjAgLSBsSDtcblxuICAgIHAgPSBWICogKDEgLSBTKTtcblxuICAgIHEgPSBWICooMSAtIFMqZik7XG5cbiAgICB0ID0gViogKDEgLSAoMS1mKSogUyk7XG5cbiAgICBzd2l0Y2ggKGxIKXtcbiAgICAgIGNhc2UgMDogUiA9IFY7IEcgPSB0OyBCID0gcDsgYnJlYWs7XG4gICAgICBjYXNlIDE6IFIgPSBxOyBHID0gVjsgQiA9IHA7IGJyZWFrO1xuICAgICAgY2FzZSAyOiBSID0gcDsgRyA9IFY7IEIgPSB0OyBicmVhaztcbiAgICAgIGNhc2UgMzogUiA9IHA7IEcgPSBxOyBCID0gVjsgYnJlYWs7XG4gICAgICBjYXNlIDQ6IFIgPSB0OyBHID0gcDsgQiA9IFY7IGJyZWFrO1xuICAgICAgY2FzZSA1OiBSID0gVjsgRyA9IHA7IEIgPSBxOyBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gW01hdGgucm91bmQoUioyNTUpLCBNYXRoLnJvdW5kKEcqMjU1KSwgTWF0aC5yb3VuZChCKjI1NSksIEFdO1xuICB9XG5cbiAgaHN2YVRvUmdiYVN0cmluZyhILCBTLCBWLCBBLCBzaG93QWxwaGE6IGJvb2xlYW4gPSBmYWxzZSk6IHN0cmluZyB7XG4gICAgbGV0IGNvbG9yQXJyOiBBcnJheTxudW1iZXI+ID0gdGhpcy5oc3ZhVG9SZ2JhKEgsIFMsIFYsIEEpO1xuXG4gICAgaWYoc2hvd0FscGhhKSB7XG4gICAgICByZXR1cm4gJ3JnYmEoJyArIGNvbG9yQXJyLmpvaW4oJywnKSArICcpJztcbiAgICB9XG5cbiAgICBjb2xvckFyci5wb3AoKTtcbiAgICByZXR1cm4gJ3JnYignICsgY29sb3JBcnIuam9pbignLCcpICsgJyknO1xuXG4gIH1cblxuICByZ2JhVG9Ic3ZhKHIsIGcsIGIsIGEpOiBBcnJheTxudW1iZXI+IHtcbiAgICByIC89IDI1NTtcbiAgICBnIC89IDI1NTtcbiAgICBiIC89IDI1NTtcblxuICAgIGxldCBtYXggPSBNYXRoLm1heChyLCBnLCBiKSwgbWluID0gTWF0aC5taW4ociwgZywgYik7XG4gICAgbGV0IGgsIHMsIHYgPSBtYXg7XG4gICAgbGV0IGQgPSBtYXggLSBtaW47XG4gICAgcyA9IG1heCA9PSAwID8gMCA6IGQgLyBtYXg7XG5cbiAgICBpZiAobWF4ID09IG1pbikge1xuICAgICAgaCA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXRjaCAobWF4KSB7XG4gICAgICAgIGNhc2UgcjogaCA9IChnIC0gYikgLyBkICsgKGcgPCBiID8gNiA6IDApOyBicmVhaztcbiAgICAgICAgY2FzZSBnOiBoID0gKGIgLSByKSAvIGQgKyAyOyBicmVhaztcbiAgICAgICAgY2FzZSBiOiBoID0gKHIgLSBnKSAvIGQgKyA0OyBicmVhaztcbiAgICAgIH1cblxuICAgICAgaCAvPSA2O1xuICAgIH1cblxuXG4gICAgcmV0dXJuIFtcbiAgICAgIGggKiAzNjAsXG4gICAgICBzICogMTAwLFxuICAgICAgdiAqIDEwMCxcbiAgICAgIGFcbiAgICBdO1xuICB9XG5cbiAgaHN2YVRvSHNsYShoLCBzLCB2LCBhKTogQXJyYXk8bnVtYmVyPntcbiAgICBzIC89IDEwMDtcbiAgICB2IC89IDEwMDtcbiAgICByZXR1cm5bXG4gICAgICBNYXRoLnJvdW5kKGgpLFxuICAgICAgTWF0aC5yb3VuZCgocyp2LygoaD0oMi1zKSp2KTwxP2g6Mi1oKSkgKiAxMDApLFxuICAgICAgTWF0aC5yb3VuZCgoaC8yKSAqIDEwMCksXG4gICAgICBhXG4gICAgXVxuICB9XG5cbiAgaHNsYVRvSHN2YSAoaCwgcywgbCwgYSk6IEFycmF5PG51bWJlcj57XG4gICAgcyAvPSAxMDA7XG4gICAgbCAvPSAxMDA7XG4gICAgcyo9bDwuNT9sOjEtbDtcbiAgICByZXR1cm5bXG4gICAgICBoLFxuICAgICAgTWF0aC5yb3VuZCgoMipzLyhsK3MpKSAqIDEwMCksXG4gICAgICBNYXRoLnJvdW5kKChsK3MpICogMTAwKSxcbiAgICAgIGFcbiAgICBdXG4gIH1cblxuICBoZXhUb0hzdmEoaGV4OiBzdHJpbmcpOiBBcnJheTxudW1iZXI+IHtcblxuICAgIGxldCByZ2JhID0gWzAsMCwwLDFdO1xuICAgIGlmIChoZXgubGVuZ3RoID09IDYpIHtcbiAgICAgIHJnYmEgPSBbXG4gICAgICAgIHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMCwgMiksIDE2KSxcbiAgICAgICAgcGFyc2VJbnQoaGV4LnN1YnN0cmluZygyLCA0KSwgMTYpLFxuICAgICAgICBwYXJzZUludChoZXguc3Vic3RyaW5nKDQsIDYpLCAxNiksXG4gICAgICAgIDFcbiAgICAgIF07XG4gICAgfSBlbHNlIGlmIChoZXgubGVuZ3RoID09IDMpIHtcbiAgICAgIHJnYmEgPSBbXG4gICAgICAgIHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMCwgMSkgKyBoZXguc3Vic3RyaW5nKDAsIDEpLCAxNiksXG4gICAgICAgIHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMSwgMikgKyBoZXguc3Vic3RyaW5nKDEsIDIpLCAxNiksXG4gICAgICAgIHBhcnNlSW50KGhleC5zdWJzdHJpbmcoMiwgMykgKyBoZXguc3Vic3RyaW5nKDIsIDMpLCAxNiksXG4gICAgICAgIDFcbiAgICAgIF1cbiAgICB9IGVsc2UgaWYgKGhleC5sZW5ndGggPT0gOCkge1xuICAgICAgcmdiYSA9IFtcbiAgICAgICAgcGFyc2VJbnQoaGV4LnN1YnN0cmluZygwLCAyKSwgMTYpLFxuICAgICAgICBwYXJzZUludChoZXguc3Vic3RyaW5nKDIsIDQpLCAxNiksXG4gICAgICAgIHBhcnNlSW50KGhleC5zdWJzdHJpbmcoNCwgNiksIDE2KSxcbiAgICAgICAgcGFyc2VGbG9hdCgocGFyc2VJbnQoaGV4LnN1YnN0cmluZyg2LCA4KSwgMTYpIC8gMjU1KS50b0ZpeGVkKDIpKVxuICAgICAgXVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZ2JhVG9Ic3ZhKHJnYmFbMF0sIHJnYmFbMV0sIHJnYmFbMl0sIHJnYmFbM10pO1xuXG4gIH1cblxuICBoc3ZhVG9IZXgoSCwgUywgViwgQSwgc2hvd0FscGhhOiBib29sZWFuID0gdHJ1ZSk6IHN0cmluZyB7XG4gICAgbGV0IHJnYmE6IEFycmF5PG51bWJlcj4gPSB0aGlzLmhzdmFUb1JnYmEoSCwgUywgViwgQSk7XG5cbiAgICBsZXQgaEE6IHN0cmluZyA9ICgoc2hvd0FscGhhKSA/IChyZ2JhWzNdICogMjU1KS50b1N0cmluZygxNikuc3Vic3RyaW5nKDAsMikgOiAnJyk7XG5cbiAgICBpZihzaG93QWxwaGEpIHtcbiAgICAgIGhBID0gKGhBLmxlbmd0aCA9PSAxKSA/IGhBICsgaEEgOiBoQTtcbiAgICB9XG4gICAgcmV0dXJuICcjJyArXG4gICAgICAoKHJnYmFbMl0gfCByZ2JhWzFdIDw8IDggfCByZ2JhWzBdIDw8IDE2KSB8IDEgPDwgMjQpLnRvU3RyaW5nKDE2KS5zbGljZSgxKSArXG4gICAgICBoQTtcbiAgfVxuXG5cbiAgdmFsaWRhdGVDb2xvckZvcm1hdCh2YWx1ZTogc3RyaW5nLCBmb3JtYXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgc3dpdGNoIChmb3JtYXQpIHtcbiAgICAgIGNhc2UgXCJoZXg2XCI6IHJldHVybiB0aGlzLnZhbGlkYXRlSGV4Rm9ybWF0KHZhbHVlKTtcbiAgICAgIGNhc2UgXCJoZXg4XCI6IHJldHVybiB0aGlzLnZhbGlkYXRlSGV4Rm9ybWF0KHZhbHVlLCB0cnVlKTtcbiAgICAgIGNhc2UgXCJyZ2JcIjogcmV0dXJuIHRoaXMudmFsaWRhdGVSZ2JhRm9ybWF0KHZhbHVlKTtcbiAgICAgIGNhc2UgXCJyZ2JhXCI6IHJldHVybiB0aGlzLnZhbGlkYXRlUmdiYUZvcm1hdCh2YWx1ZSwgdHJ1ZSk7XG4gICAgICAvLyBjYXNlIFwiaHNsXCI6IHJldHVybiB0aGlzLnZhbGlkYXRlSGV4Rm9ybWF0KHZhbHVlKTtcbiAgICAgIC8vIGNhc2UgXCJoc2xhXCI6IHJldHVybiB0aGlzLnZhbGlkYXRlSGV4Rm9ybWF0KHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuICdub3RWYWxpZCc7XG4gIH1cblxuICB2YWxpZGF0ZUhleEZvcm1hdCh2YWx1ZTogc3RyaW5nLCBhbHBoYTogYm9vbGVhbiA9IGZhbHNlKTogc3RyaW5nIHtcbiAgICBsZXQgcmVzdWx0ID0gJ25vdFZhbGlkJztcbiAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoJyMnLCAnJyk7XG4gICAgaWYoIWFscGhhKSB7XG4gICAgICBpZih2YWx1ZS5sZW5ndGggPT09IDYpIHtcbiAgICAgICAgaWYoIWlzTmFOKHBhcnNlSW50KHZhbHVlLCAxNikpKSB7XG4gICAgICAgICAgcmV0dXJuICcjJyArIHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKHZhbHVlLmxlbmd0aCA9PT0gOCkge1xuICAgICAgICBpZighaXNOYU4ocGFyc2VJbnQodmFsdWUsIDE2KSkpIHtcbiAgICAgICAgICByZXR1cm4gJyMnICsgdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgdmFsaWRhdGVSZ2JhRm9ybWF0KHZhbHVlOiBzdHJpbmcsIGFscGhhOiBib29sZWFuID0gZmFsc2UpOiBzdHJpbmcge1xuICAgIGxldCByZXN1bHQgPSAnbm90VmFsaWQnO1xuICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvW14wLTlcXCxdKy9nLCBcIlwiKTtcbiAgICBsZXQgYXVzQXJyOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+ID0gdmFsdWUuc3BsaXQoJywnKTtcbiAgICBsZXQgYWxwaGFWYWw6IHN0cmluZyB8IG51bWJlciA9ICcnO1xuXG4gICAgaWYoIWFscGhhKSB7XG4gICAgICBpZihhdXNBcnIubGVuZ3RoID09IDMpIHtcbiAgICAgICAgYXVzQXJyID0gYXVzQXJyLm1hcChmdW5jdGlvbih2YWw6IHN0cmluZyl7cmV0dXJuIHBhcnNlSW50KHZhbCl9KTtcbiAgICAgICAgaWYoXG4gICAgICAgICAgTWF0aC5tYXguYXBwbHkobnVsbCwgYXVzQXJyKSA8PSAyNTUgJiZcbiAgICAgICAgICBNYXRoLm1pbi5hcHBseShudWxsLCBhdXNBcnIpID49IDBcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuICdyZ2IoJyArIGF1c0Fyci5qb2luKCcsJykgKyAnKSc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYoYXVzQXJyLmxlbmd0aCA9PSA0KSB7XG4gICAgICAgIGFscGhhVmFsID0gcGFyc2VGbG9hdCg8c3RyaW5nPmF1c0Fyci5wb3AoKSk7XG4gICAgICAgIGF1c0FyciA9IGF1c0Fyci5tYXAoZnVuY3Rpb24odmFsOiBzdHJpbmcpe3JldHVybiBwYXJzZUludCh2YWwpfSk7XG4gICAgICAgIGlmKFxuICAgICAgICAgIE1hdGgubWF4LmFwcGx5KG51bGwsIGF1c0FycikgPD0gMjU1ICYmXG4gICAgICAgICAgTWF0aC5taW4uYXBwbHkobnVsbCwgYXVzQXJyKSA+PSAwICYmXG4gICAgICAgICAgYWxwaGFWYWwgPj0gMCAmJiBhbHBoYVZhbCA8PSAxXG4gICAgICAgICkge1xuICAgICAgICAgIGF1c0Fyci5wdXNoKGFscGhhVmFsKTtcbiAgICAgICAgICByZXR1cm4gJ3JnYmEoJyArIGF1c0Fyci5qb2luKCcsJykgKyAnKSc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJlcGFyZVJldHVybkNvbG9yKGhzdmE6IEhTVkEsIGZvcm1hdDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBzd2l0Y2ggKGZvcm1hdCkge1xuICAgICAgY2FzZSBcImhleDZcIjogcmV0dXJuIHRoaXMuaHN2YVRvSGV4KGhzdmEuaHVlLCBoc3ZhLnNhdHVyYXRpb24sIGhzdmEudmFsdWUsIDEsIGZhbHNlKTtcbiAgICAgIGNhc2UgXCJoZXg4XCI6IHJldHVybiB0aGlzLmhzdmFUb0hleChoc3ZhLmh1ZSwgaHN2YS5zYXR1cmF0aW9uLCBoc3ZhLnZhbHVlLCBoc3ZhLmFscGhhLCB0cnVlKTtcbiAgICAgIGNhc2UgXCJyZ2JcIjogcmV0dXJuIHRoaXMuaHN2YVRvUmdiYVN0cmluZyhoc3ZhLmh1ZSwgaHN2YS5zYXR1cmF0aW9uLCBoc3ZhLnZhbHVlLCAxKTtcbiAgICAgIGNhc2UgXCJyZ2JhXCI6IHJldHVybiB0aGlzLmhzdmFUb1JnYmFTdHJpbmcoaHN2YS5odWUsIGhzdmEuc2F0dXJhdGlvbiwgaHN2YS52YWx1ZSwgaHN2YS5hbHBoYSwgdHJ1ZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmhzdmFUb0hleChoc3ZhLmh1ZSwgaHN2YS5zYXR1cmF0aW9uLCBoc3ZhLnZhbHVlLCAxLCBmYWxzZSk7XG4gIH1cblxuICBwcmVwYXJlUGlja2VyUGFsbGV0cyhhdmFpbFBhbGxldHM6IEFycmF5PHN0cmluZz4gPSBbXSwgY3VzdG9tUGFsbGV0czogQXJyYXk8UGFsZXR0ZT4gPSBbXSwgcGlja2VyQ29tcG9uZW50OiBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCkge1xuICAgIHBpY2tlckNvbXBvbmVudC5waWNrZXJQYWxsZXRzID0gW107XG4gICAgdGhpcy5wYWxsZXRzLmZvckVhY2goKHBhbGV0dGUpID0+IHtcbiAgICAgIGlmKGF2YWlsUGFsbGV0cy5pbmRleE9mKHBhbGV0dGUuaWQpICE9PSAtMSkge1xuICAgICAgICBwaWNrZXJDb21wb25lbnQucGlja2VyUGFsbGV0cy5wdXNoKHBhbGV0dGUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGN1c3RvbVBhbGxldHMuZm9yRWFjaCgocGFsZXR0ZSkgPT4ge1xuICAgICAgcGlja2VyQ29tcG9uZW50LnBpY2tlclBhbGxldHMucHVzaChwYWxldHRlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZpbGxCYXNlUGFsbGV0cygpIHtcbiAgICB0aGlzLnBhbGxldHMucHVzaCh7XG4gICAgICBpZDogJ3BvbGFyaXMnLFxuICAgICAgbmFtZTogJ1BvbGFyaXMnLFxuICAgICAgY29sb3JzOiBbXG4gICAgICAgICcjRjlGQUZCJywgJyNGNEY2RjgnLCAnI0RGRTNFOCcsICcjQzRDREQ1JyxcbiAgICAgICAgJyM5MTlFQUInLCAnIzYzNzM4MScsICcjNDU0RjVCJywgJyMyMTJCMzYnLFxuICAgICAgICAnI0IzQjVDQicsICcjNDM0NjdGJywgJyMxQzIyNjAnLCAnIzAwMDQ0QycsXG4gICAgICAgICcjRjZGMEZEJywgJyNFM0QwRkYnLCAnIzlDNkFERScsICcjNTAyNDhGJywgJyMyMzAwNTEnLFxuICAgICAgICAnI0Y0RjVGQScsICcjQjNCQ0Y1JywgJyM1QzZBQzQnLCAnIzIwMkU3OCcsICcjMDAwNjM5JyxcbiAgICAgICAgJyNFQkY1RkEnLCAnI0I0RTFGQScsICcjMDA3QUNFJywgJyMwODRFOEEnLCAnIzAwMTQyOScsXG4gICAgICAgICcjRTBGNUY1JywgJyNCN0VDRUMnLCAnIzQ3QzFCRicsICcjMDA4NDhFJywgJyMwMDMxMzUnLFxuICAgICAgICAnI0UzRjFERicsICcjQkJFNUIzJywgJyM1MEI4M0MnLCAnIzEwODA0MycsICcjMTczNjMwJyxcbiAgICAgICAgJyNGQ0YxQ0QnLCAnI0ZGRUE4QScsICcjRUVDMjAwJywgJyM5QzZGMTknLCAnIzU3M0IwMCcsXG4gICAgICAgICcjRkNFQkRCJywgJyNGRkM1OEInLCAnI0Y0OTM0MicsICcjQzA1NzE3JywgJyM0QTE1MDQnLFxuICAgICAgICAnI0ZCRUFFNScsICcjRkVBRDlBJywgJyNERTM2MTgnLCAnI0JGMDcxMScsICcjMzMwMTAxJyxcbiAgICAgIF1cbiAgICB9KTtcbiAgICB0aGlzLnBhbGxldHMucHVzaCh7XG4gICAgICBpZDogJ21hdGVyaWFsJyxcbiAgICAgIG5hbWU6ICdNYXRlcmlhbCcsXG4gICAgICBjb2xvcnM6IFtcbiAgICAgICAgJyNmZmViZWUnLCAnI2ZmY2RkMicsICcjZWY5YTlhJywgJyNlNTczNzMnLCAnI2VmNTM1MCcsICcjZjQ0MzM2JywgJyNlNTM5MzUnLCAnI2QzMmYyZicsICcjYzYyODI4JywgJyNiNzFjMWMnLCAnI2ZmOGE4MCcsICcjZmY1MjUyJywgJyNmZjE3NDQnLCAnI2Q1MDAwMCcsXG4gICAgICAgICcjZmNlNGVjJywgJyNmOGJiZDAnLCAnI2Y0OGZiMScsICcjZjA2MjkyJywgJyNlYzQwN2EnLCAnI2U5MWU2MycsICcjZDgxYjYwJywgJyNjMjE4NWInLCAnI2FkMTQ1NycsICcjODgwZTRmJywgJyNmZjgwYWInLCAnI2ZmNDA4MScsICcjZjUwMDU3JywgJyNjNTExNjInLFxuICAgICAgICAnI2YzZTVmNScsICcjZTFiZWU3JywgJyNjZTkzZDgnLCAnI2JhNjhjOCcsICcjYWI0N2JjJywgJyM5YzI3YjAnLCAnIzhlMjRhYScsICcjN2IxZmEyJywgJyM2YTFiOWEnLCAnIzRhMTQ4YycsICcjZWE4MGZjJywgJyNlMDQwZmInLCAnI2Q1MDBmOScsICcjYWEwMGZmJyxcbiAgICAgICAgJyNlZGU3ZjYnLCAnI2QxYzRlOScsICcjYjM5ZGRiJywgJyM5NTc1Y2QnLCAnIzdlNTdjMicsICcjNjczYWI3JywgJyM1ZTM1YjEnLCAnIzUxMmRhOCcsICcjNDUyN2EwJywgJyMzMTFiOTInLCAnI2IzODhmZicsICcjN2M0ZGZmJywgJyM2NTFmZmYnLCAnIzYyMDBlYScsXG4gICAgICAgICcjZThlYWY2JywgJyNjNWNhZTknLCAnIzlmYThkYScsICcjNzk4NmNiJywgJyM1YzZiYzAnLCAnIzNmNTFiNScsICcjMzk0OWFiJywgJyMzMDNmOWYnLCAnIzI4MzU5MycsICcjMWEyMzdlJywgJyM4YzllZmYnLCAnIzUzNmRmZScsICcjM2Q1YWZlJywgJyMzMDRmZmUnLFxuICAgICAgICAnI2UzZjJmZCcsICcjYmJkZWZiJywgJyM5MGNhZjknLCAnIzY0YjVmNicsICcjNDJhNWY1JywgJyMyMTk2ZjMnLCAnIzFlODhlNScsICcjMTk3NmQyJywgJyMxNTY1YzAnLCAnIzBkNDdhMScsICcjODJiMWZmJywgJyM0NDhhZmYnLCAnIzI5NzlmZicsICcjMjk2MmZmJyxcbiAgICAgICAgJyNlMWY1ZmUnLCAnI2IzZTVmYycsICcjODFkNGZhJywgJyM0ZmMzZjcnLCAnIzI5YjZmNicsICcjMDNhOWY0JywgJyMwMzliZTUnLCAnIzAyODhkMScsICcjMDI3N2JkJywgJyMwMTU3OWInLCAnIzgwZDhmZicsICcjNDBjNGZmJywgJyMwMGIwZmYnLCAnIzAwOTFlYScsXG4gICAgICAgICcjZTBmN2ZhJywgJyNiMmViZjInLCAnIzgwZGVlYScsICcjNGRkMGUxJywgJyMyNmM2ZGEnLCAnIzAwYmNkNCcsICcjMDBhY2MxJywgJyMwMDk3YTcnLCAnIzAwODM4ZicsICcjMDA2MDY0JywgJyM4NGZmZmYnLCAnIzE4ZmZmZicsICcjMDBlNWZmJywgJyMwMGI4ZDQnLFxuICAgICAgICAnI2UwZjJmMScsICcjYjJkZmRiJywgJyM4MGNiYzQnLCAnIzRkYjZhYycsICcjMjZhNjlhJywgJyMwMDk2ODgnLCAnIzAwODk3YicsICcjMDA3OTZiJywgJyMwMDY5NWMnLCAnIzAwNGQ0MCcsICcjYTdmZmViJywgJyM2NGZmZGEnLCAnIzFkZTliNicsICcjMDBiZmE1JyxcbiAgICAgICAgJyNlOGY1ZTknLCAnI2M4ZTZjOScsICcjYTVkNmE3JywgJyM4MWM3ODQnLCAnIzY2YmI2YScsICcjNGNhZjUwJywgJyM0M2EwNDcnLCAnIzM4OGUzYycsICcjMmU3ZDMyJywgJyMxYjVlMjAnLCAnI2I5ZjZjYScsICcjNjlmMGFlJywgJyMwMGU2NzYnLCAnIzAwYzg1MycsXG4gICAgICAgICcjZjFmOGU5JywgJyNkY2VkYzgnLCAnI2M1ZTFhNScsICcjYWVkNTgxJywgJyM5Y2NjNjUnLCAnIzhiYzM0YScsICcjN2NiMzQyJywgJyM2ODlmMzgnLCAnIzU1OGIyZicsICcjMzM2OTFlJywgJyNjY2ZmOTAnLCAnI2IyZmY1OScsICcjNzZmZjAzJywgJyM2NGRkMTcnLFxuICAgICAgICAnI2Y5ZmJlNycsICcjZjBmNGMzJywgJyNlNmVlOWMnLCAnI2RjZTc3NScsICcjZDRlMTU3JywgJyNjZGRjMzknLCAnI2MwY2EzMycsICcjYWZiNDJiJywgJyM5ZTlkMjQnLCAnIzgyNzcxNycsICcjZjRmZjgxJywgJyNlZWZmNDEnLCAnI2M2ZmYwMCcsICcjYWVlYTAwJyxcbiAgICAgICAgJyNmZmZkZTcnLCAnI2ZmZjljNCcsICcjZmZmNTlkJywgJyNmZmYxNzYnLCAnI2ZmZWU1OCcsICcjZmZlYjNiJywgJyNmZGQ4MzUnLCAnI2ZiYzAyZCcsICcjZjlhODI1JywgJyNmNTdmMTcnLCAnI2ZmZmY4ZCcsICcjZmZmZjAwJywgJyNmZmVhMDAnLCAnI2ZmZDYwMCcsXG4gICAgICAgICcjZmZmOGUxJywgJyNmZmVjYjMnLCAnI2ZmZTA4MicsICcjZmZkNTRmJywgJyNmZmNhMjgnLCAnI2ZmYzEwNycsICcjZmZiMzAwJywgJyNmZmEwMDAnLCAnI2ZmOGYwMCcsICcjZmY2ZjAwJywgJyNmZmU1N2YnLCAnI2ZmZDc0MCcsICcjZmZjNDAwJywgJyNmZmFiMDAnLFxuICAgICAgICAnI2ZmZjNlMCcsICcjZmZlMGIyJywgJyNmZmNjODAnLCAnI2ZmYjc0ZCcsICcjZmZhNzI2JywgJyNmZjk4MDAnLCAnI2ZiOGMwMCcsICcjZjU3YzAwJywgJyNlZjZjMDAnLCAnI2U2NTEwMCcsICcjZmZkMTgwJywgJyNmZmFiNDAnLCAnI2ZmOTEwMCcsICcjZmY2ZDAwJyxcbiAgICAgICAgJyNmYmU5ZTcnLCAnI2ZmY2NiYycsICcjZmZhYjkxJywgJyNmZjhhNjUnLCAnI2ZmNzA0MycsICcjZmY1NzIyJywgJyNmNDUxMWUnLCAnI2U2NGExOScsICcjZDg0MzE1JywgJyNiZjM2MGMnLCAnI2ZmOWU4MCcsICcjZmY2ZTQwJywgJyNmZjNkMDAnLCAnI2RkMmMwMCcsXG4gICAgICAgICcjZWZlYmU5JywgJyNkN2NjYzgnLCAnI2JjYWFhNCcsICcjYTE4ODdmJywgJyM4ZDZlNjMnLCAnIzc5NTU0OCcsICcjNmQ0YzQxJywgJyM1ZDQwMzcnLCAnIzRlMzQyZScsICcjM2UyNzIzJyxcbiAgICAgICAgJyNmYWZhZmEnLCAnI2Y1ZjVmNScsICcjZWVlZWVlJywgJyNlMGUwZTAnLCAnI2JkYmRiZCcsICcjOWU5ZTllJywgJyM3NTc1NzUnLCAnIzYxNjE2MScsICcjNDI0MjQyJywgJyMyMTIxMjEnLFxuICAgICAgICAnI2VjZWZmMScsICcjY2ZkOGRjJywgJyNiMGJlYzUnLCAnIzkwYTRhZScsICcjNzg5MDljJywgJyM2MDdkOGInLCAnIzU0NmU3YScsICcjNDU1YTY0JywgJyMzNzQ3NGYnLCAnIzI2MzIzOCcsXG4gICAgICBdXG4gICAgfSk7XG4gIH1cblxuXG5cblxuXG59XG4iLCJpbXBvcnQge0RpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29sb3JQaWNrZXJDb21wb25lbnR9IGZyb20gXCIuL25neC10dGl0YW4tY29sb3ItcGlja2VyLmludGVyZmFjZVwiO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyXSdcbn0pXG5leHBvcnQgY2xhc3MgTmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyRGlyZWN0aXZlIHtcblxuICBASW5wdXQoJ3BpY2tlclBhZCcpIHB1YmxpYyBwaWNrZXJQYWQ6IG51bWJlciA9IDA7XG4gIEBJbnB1dCgnY29udGV4dCcpIHB1YmxpYyBfY29udGV4dDogQ29sb3JQaWNrZXJDb21wb25lbnQ7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsUmVmOiBFbGVtZW50UmVmKSB7IH1cblxuXG4gIHB1YmxpYyBzZXRQb3NpdGlvbih4OiBudW1iZXIsIHk6IG51bWJlciwgZGlyZWN0aW9uOiBzdHJpbmcpOiB2b2lkIHtcblxuICAgIGxldCByZWN0ID0gdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgaWYoZGlyZWN0aW9uID09ICd2ZXJ0aWNhbCcgfHwgZGlyZWN0aW9uID09ICdib3RoJykge1xuICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LnN0eWxlLnRvcCA9IE1hdGgucm91bmQoKHkgLSAoKHJlY3QuaGVpZ2h0KSAvIDIpKSkgKyAncHgnO1xuICAgIH1cbiAgICBpZihkaXJlY3Rpb24gPT0gJ2hvcml6b250YWwnIHx8IGRpcmVjdGlvbiA9PSAnYm90aCcpIHtcbiAgICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gTWF0aC5yb3VuZCgoeCAtICgocmVjdC53aWR0aCkgLyAyKSkpICsgJ3B4JztcbiAgICB9XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQge1xuICBDb250ZW50Q2hpbGQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ3hUVGl0YW5Db2xvclBpY2tlckRyYWdnZXJEaXJlY3RpdmV9IGZyb20gXCIuL25neC10dGl0YW4tY29sb3ItcGlja2VyLWRyYWdnZXIuZGlyZWN0aXZlXCI7XG4vLyBpbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgb2Z9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge2Zyb21FdmVudCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7Tmd4VFRpdGFuQ29sb3JQaWNrZXJTZXJ2aWNlfSBmcm9tIFwiLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci5zZXJ2aWNlXCI7XG5pbXBvcnQge0NvbG9yUGlja2VyQ29tcG9uZW50LCBDdXN0b21QZXJjZW50LCBDdXN0b21SZWN0fSBmcm9tIFwiLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci5pbnRlcmZhY2VcIjtcblxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3Rvcl0nLFxuICBleHBvcnRBczogJ2xpYk5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3InXG59KVxuZXhwb3J0IGNsYXNzIE5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdHtcblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWRvd24nLCBbJyRldmVudCddKSBwdWJsaWMgb25Nb3VzZURvd24oJGV2ZW50KSB7XG4gICAgdGhpcy5kcmFnU3RhcnQgPSB0cnVlO1xuICAgIHRoaXMuZXZlbnRzU3Vic2NpYmUoKTtcbiAgICB0aGlzLmdldFBvc2l0aW9uKCRldmVudCk7XG4gIH1cblxuICBASW5wdXQoJ2RpcmVjdGlvbicpIHB1YmxpYyBkaXJlY3Rpb246IHN0cmluZyA9ICdib3RoJztcbiAgQElucHV0KCdjb250ZXh0JykgcHVibGljIF9jb250ZXh0OiBDb2xvclBpY2tlckNvbXBvbmVudDtcblxuXG4gIEBPdXRwdXQoJ2NoYW5nZScpIHB1YmxpYyBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxDdXN0b21QZXJjZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8Q3VzdG9tUGVyY2VudD4oKTtcblxuICBwdWJsaWMgZWw6IEhUTUxFbGVtZW50ID0gbnVsbDtcbiAgcHVibGljIGRyYWdTdGFydDogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgZ2xvYmFsTW91c2VNb3ZlOiBTdWJzY3JpcHRpb24gPSBudWxsO1xuICBwdWJsaWMgZ2xvYmFsTW91c2VVcDogU3Vic2NyaXB0aW9uID0gbnVsbDtcblxuXG4gIEBDb250ZW50Q2hpbGQoTmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyRGlyZWN0aXZlKSBwdWJsaWMgZHJhZ2dlcjogTmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyRGlyZWN0aXZlID0gbnVsbDtcblxuXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsUmVmOiBFbGVtZW50UmVmLFxuICAgIHB1YmxpYyBjb2xvclBpY2tlclNlcnZpY2U6IE5neFRUaXRhbkNvbG9yUGlja2VyU2VydmljZVxuICApIHtcbiAgICB0aGlzLmVsID0gdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuZGlyZWN0aW9uID0gKFsnYm90aCcsICd2ZXJ0aWNhbCcsICdob3Jpem9udGFsJ10uaW5kZXhPZih0aGlzLmRpcmVjdGlvbikgPT09IC0xKSA/ICdib3RoJyA6IHRoaXMuZGlyZWN0aW9uO1xuXG5cblxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG5cblxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAvLyB0aGlzLmV2ZW50c1VuU3Vic2NpYmUoKTtcbiAgfVxuXG5cbiAgZXZlbnRzU3Vic2NpYmUoKSB7XG4gICAgLy8gdGhpcy5nbG9iYWxNb3VzZU1vdmUgPSBmcm9tRXZlbnQod2luZG93LCAnbW91c2Vtb3ZlJykuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgIC8vICAgaWYodGhpcy5kcmFnU3RhcnQpIHtcbiAgICAvLyAgICAgdGhpcy5nZXRQb3NpdGlvbig8TW91c2VFdmVudD5ldmVudCk7XG4gICAgLy8gICB9XG4gICAgLy8gfSk7XG4gICAgLy8gdGhpcy5nbG9iYWxNb3VzZVVwID0gZnJvbUV2ZW50KHdpbmRvdywgJ21vdXNldXAnKS5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgLy8gICBpZih0aGlzLmRyYWdTdGFydCkge1xuICAgIC8vICAgICB0aGlzLmRyYWdTdGFydCA9IGZhbHNlO1xuICAgIC8vICAgICB0aGlzLmdldFBvc2l0aW9uKDxNb3VzZUV2ZW50PmV2ZW50KTtcbiAgICAvLyAgIH1cbiAgICAvLyB9KTtcblxuICAgIC8vXG4gICAgdGhpcy5nbG9iYWxNb3VzZU1vdmUgPSB0aGlzLmNvbG9yUGlja2VyU2VydmljZS5tb3VzZU1vdmVPYnNlcnZhYmxlLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgIGlmKHRoaXMuZHJhZ1N0YXJ0KSB7XG4gICAgICAgIHRoaXMuZ2V0UG9zaXRpb24oPE1vdXNlRXZlbnQ+ZXZlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuZ2xvYmFsTW91c2VVcCA9IHRoaXMuY29sb3JQaWNrZXJTZXJ2aWNlLm1vdXNlVXBPYnNlcnZhYmxlLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgIGlmKHRoaXMuZHJhZ1N0YXJ0KSB7XG4gICAgICAgIHRoaXMuZHJhZ1N0YXJ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZXZlbnRzVW5TdWJzY2liZSgpO1xuICAgICAgICB0aGlzLmdldFBvc2l0aW9uKDxNb3VzZUV2ZW50PmV2ZW50KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBldmVudHNVblN1YnNjaWJlKCkge1xuICAgIGlmKHRoaXMuZ2xvYmFsTW91c2VNb3ZlICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmdsb2JhbE1vdXNlTW92ZS51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZih0aGlzLmdsb2JhbE1vdXNlVXAgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuZ2xvYmFsTW91c2VVcC51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXREcmFnZ2VyKHBlcnNlbnQ6IEN1c3RvbVBlcmNlbnQpIHtcbiAgICBpZih0aGlzLmRyYWdnZXIgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHBvc2l0aW9uOiBDdXN0b21SZWN0ID0gdGhpcy5nZXRSZWN0KHRoaXMuZWwpO1xuICAgIGxldCB4ID0gTWF0aC5yb3VuZCgoKHBvc2l0aW9uLndpZHRoIC0gdGhpcy5kcmFnZ2VyLnBpY2tlclBhZCAqIDIpICogcGVyc2VudC54IC8gMTAwKSk7XG4gICAgbGV0IHkgPSBNYXRoLnJvdW5kKCgocG9zaXRpb24uaGVpZ2h0IC0gdGhpcy5kcmFnZ2VyLnBpY2tlclBhZCAqIDIpICogcGVyc2VudC55IC8gMTAwKSk7XG4gICAgdGhpcy5kcmFnZ2VyLnNldFBvc2l0aW9uKFxuICAgICAgKHggPiB0aGlzLmRyYWdnZXIucGlja2VyUGFkKSA/IHggOiB0aGlzLmRyYWdnZXIucGlja2VyUGFkLFxuICAgICAgKHkgPiB0aGlzLmRyYWdnZXIucGlja2VyUGFkKSA/IHkgOiB0aGlzLmRyYWdnZXIucGlja2VyUGFkLFxuICAgICAgdGhpcy5kaXJlY3Rpb25cbiAgICApO1xuXG4gIH1cblxuICBwdWJsaWMgZ2V0UG9zaXRpb24oJGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgbGV0IGN1cnNvclkgPSAkZXZlbnQucGFnZVk7XG4gICAgbGV0IGN1cnNvclggPSAkZXZlbnQucGFnZVg7XG4gICAgbGV0IHBvc2l0aW9uOiBDdXN0b21SZWN0ID0gdGhpcy5nZXRSZWN0KHRoaXMuZWwpO1xuICAgIGxldCBwZXJjZW50OiBDdXN0b21QZXJjZW50ID0ge3g6IDAsIHk6IDB9O1xuICAgIGlmKHRoaXMuZGlyZWN0aW9uID09ICd2ZXJ0aWNhbCcgfHwgdGhpcy5kaXJlY3Rpb24gPT0gJ2JvdGgnKSB7XG4gICAgICBwZXJjZW50LnkgPSBNYXRoLnJvdW5kKChjdXJzb3JZIC0gKHBvc2l0aW9uLnRvcCkpICogMTAwIC8gKHBvc2l0aW9uLmhlaWdodCAtIHRoaXMuZHJhZ2dlci5waWNrZXJQYWQgKiAyKSk7XG4gICAgICBpZihwZXJjZW50LnkgPCAwKSB7XG4gICAgICAgIHBlcmNlbnQueSA9IDBcbiAgICAgIH0gZWxzZSBpZihwZXJjZW50LnkgPiAxMDApIHtcbiAgICAgICAgcGVyY2VudC55ID0gMTAwO1xuICAgICAgfVxuICAgIH1cbiAgICBpZih0aGlzLmRpcmVjdGlvbiA9PSAnaG9yaXpvbnRhbCcgfHwgdGhpcy5kaXJlY3Rpb24gPT0gJ2JvdGgnKSB7XG4gICAgICBwZXJjZW50LnggPSBNYXRoLnJvdW5kKChjdXJzb3JYIC0gKHBvc2l0aW9uLmxlZnQpKSAqIDEwMCAvIChwb3NpdGlvbi53aWR0aCAtIHRoaXMuZHJhZ2dlci5waWNrZXJQYWQgKiAyKSk7XG4gICAgICBpZihwZXJjZW50LnggPCAwKSB7XG4gICAgICAgIHBlcmNlbnQueCA9IDBcbiAgICAgIH0gZWxzZSBpZihwZXJjZW50LnggPiAxMDApIHtcbiAgICAgICAgcGVyY2VudC54ID0gMTAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2V0RHJhZ2dlcihwZXJjZW50KTtcbiAgICB0aGlzLmNoYW5nZS5lbWl0KHBlcmNlbnQpO1xuXG4gIH1cblxuXG5cbiAgcHVibGljIGdldFJlY3QoZWxlbTogSFRNTEVsZW1lbnQpOiBDdXN0b21SZWN0IHtcblxuICAgIGxldCBib3ggPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICBsZXQgZG9jRWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgbGV0IHNjcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2NFbC5zY3JvbGxUb3AgfHwgYm9keS5zY3JvbGxUb3A7XG4gICAgbGV0IHNjcm9sbExlZnQgPSB3aW5kb3cucGFnZVhPZmZzZXQgfHwgZG9jRWwuc2Nyb2xsTGVmdCB8fCBib2R5LnNjcm9sbExlZnQ7XG4gICAgbGV0IGNsaWVudFRvcCA9IGRvY0VsLmNsaWVudFRvcCB8fCBib2R5LmNsaWVudFRvcCB8fCAwO1xuICAgIGxldCBjbGllbnRMZWZ0ID0gZG9jRWwuY2xpZW50TGVmdCB8fCBib2R5LmNsaWVudExlZnQgfHwgMDtcblxuICAgIHJldHVybiB7XG4gICAgICBoZWlnaHQ6IGJveC5oZWlnaHQsXG4gICAgICBsZWZ0OiBib3gubGVmdCArIHNjcm9sbExlZnQgLSBjbGllbnRMZWZ0LFxuICAgICAgdG9wOiBib3gudG9wICsgc2Nyb2xsVG9wIC0gY2xpZW50VG9wLFxuICAgICAgd2lkdGg6IGJveC53aWR0aCxcbiAgICB9O1xuICB9XG5cblxuXG59XG4iLCJpbXBvcnQge1xuICBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ3hUVGl0YW5Db2xvclBpY2tlclNlcnZpY2V9IGZyb20gXCIuL25neC10dGl0YW4tY29sb3ItcGlja2VyLnNlcnZpY2VcIjtcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2xpYk5neFRUaXRhbkNvbG9yUGlja2VySW5wdXRdJyxcbiAgZXhwb3J0QXM6ICdsaWJOZ3hUVGl0YW5Db2xvclBpY2tlcklucHV0J1xufSlcbmV4cG9ydCBjbGFzcyBOZ3hUVGl0YW5Db2xvclBpY2tlcklucHV0RGlyZWN0aXZlIHtcblxuICBASW5wdXQoJ2Zvcm1hdCcpIGZvcm1hdDogc3RyaW5nID0gJ2hleDYnO1xuICBAT3V0cHV0KCdpbnB1dENoYW5nZScpIHB1YmxpYyBpbnB1dENoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuXG4gIEBIb3N0TGlzdGVuZXIoJ2tleXVwJykga2V5VXAoKSB7XG4gICAgdGhpcy5pbnB1dFZhbGlkYXRlKCk7XG4gIH1cbiAgQEhvc3RMaXN0ZW5lcignY2hhbmdlJykgY2hhbmdlKCkge1xuICAgIHRoaXMuaW5wdXRWYWxpZGF0ZSgpO1xuICB9XG5cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZWw6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIGNvbG9yUGlja2VyU2VydmljZTogTmd4VFRpdGFuQ29sb3JQaWNrZXJTZXJ2aWNlXG4gICkgeyB9XG5cblxuICBzZXRJbnB1dFZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAoPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy5lbC5uYXRpdmVFbGVtZW50KS52YWx1ZSA9IHZhbHVlO1xuICB9XG5cblxuICBpbnB1dFZhbGlkYXRlKCkge1xuICAgIGxldCByZXMgPSB0aGlzLmNvbG9yUGlja2VyU2VydmljZS52YWxpZGF0ZUNvbG9yRm9ybWF0KFxuICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnZhbHVlLFxuICAgICAgdGhpcy5mb3JtYXRcbiAgICApO1xuXG4gICAgaWYocmVzICE9PSAnbm90VmFsaWQnKSB7XG4gICAgICAoPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy5lbC5uYXRpdmVFbGVtZW50KS52YWx1ZSA9IHJlcztcbiAgICAgIHRoaXMuaW5wdXRDaGFuZ2UuZW1pdChyZXMpO1xuICAgIH1cblxuICB9XG5cbn1cbiIsImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbG9yUGlja2VyQ29tcG9uZW50LCBQYWxldHRlfSBmcm9tIFwiLi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuaW50ZXJmYWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1wYWxldHRlLWxpc3QnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJwaWNrZXItcGFsZXR0ZS13cmFwcGVyXCIgKm5nSWY9XCJwYWxsZXRzLmxlbmd0aCA+IDBcIj5cbiAgPGRpdiBjbGFzcz1cInBhbGV0dGUtbGlua3NcIj5cbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cInBhbGV0dGUtbGlua1wiXG4gICAgICAqbmdGb3I9XCJsZXQgcGFsZXR0ZSBvZiBwYWxsZXRzXCJcbiAgICAgIFtuZ0NsYXNzXT1cInsnc2VsZWN0ZWQnOiAoYWN0aXZlUGFsZXR0ZSAhPT0gbnVsbCAmJiBhY3RpdmVQYWxldHRlLmlkID09IHBhbGV0dGUuaWQpfVwiXG4gICAgICAoY2xpY2spPVwic2VsZWN0UGFsZXR0ZShwYWxldHRlKVwiXG4gICAgPlxuICAgICAge3twYWxldHRlLm5hbWV9fVxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInBhbGV0dGUtcGlja2VyLWhvbGRlclwiICpuZ0lmPVwiYWN0aXZlUGFsZXR0ZSAhPT0gbnVsbCAmJiBhY3RpdmVQYWxldHRlLmNvbG9ycy5sZW5ndGggPiAwXCI+XG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJwYWxldHRlLWNvbG9yXCJcbiAgICAgICpuZ0Zvcj1cImxldCBjb2xvciBvZiBhY3RpdmVQYWxldHRlLmNvbG9yc1wiXG4gICAgICBbbmdTdHlsZV09XCJ7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogY29sb3JcbiAgICAgIH1cIlxuICAgICAgKGNsaWNrKT1cImNvbG9yU2VsZWN0ZWQoY29sb3IpXCJcbiAgICA+XG5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2A6aG9zdCAucGlja2VyLXBhbGV0dGUtd3JhcHBlciAucGFsZXR0ZS1saW5rc3tkaXNwbGF5OmZsZXg7ZmxleC13cmFwOndyYXA7bWFyZ2luLWJvdHRvbTo1cHh9Omhvc3QgLnBpY2tlci1wYWxldHRlLXdyYXBwZXIgLnBhbGV0dGUtbGlua3MgLnBhbGV0dGUtbGlua3ttYXJnaW4tcmlnaHQ6NXB4O2JvcmRlci1yYWRpdXM6M3B4O3BhZGRpbmc6MnB4IDRweDtib3JkZXI6MXB4IHNvbGlkICNkZGQ7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2ZvbnQtc2l6ZToxMHB4O2ZvbnQtZmFtaWx5Oi1hcHBsZS1zeXN0ZW0sQmxpbmtNYWNTeXN0ZW1Gb250LFNhbiBGcmFuY2lzY28sUm9ib3RvLFNlZ29lIFVJLEhlbHZldGljYSBOZXVlLHNhbnMtc2VyaWY7Zm9udC13ZWlnaHQ6NjAwO2JhY2tncm91bmQtY29sb3I6I2ZmZjtjdXJzb3I6cG9pbnRlcn06aG9zdCAucGlja2VyLXBhbGV0dGUtd3JhcHBlciAucGFsZXR0ZS1saW5rcyAucGFsZXR0ZS1saW5rLnNlbGVjdGVke2JhY2tncm91bmQtY29sb3I6IzVlNmJjNTtjb2xvcjojZmZmfTpob3N0IC5waWNrZXItcGFsZXR0ZS13cmFwcGVyIC5wYWxldHRlLXBpY2tlci1ob2xkZXJ7aGVpZ2h0OjE2NXB4O2Rpc3BsYXk6ZmxleDtmbGV4LXdyYXA6d3JhcDthbGlnbi1pdGVtczpmbGV4LXN0YXJ0O2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0O2FsaWduLWNvbnRlbnQ6YmFzZWxpbmV9Omhvc3QgLnBpY2tlci1wYWxldHRlLXdyYXBwZXIgLnBhbGV0dGUtcGlja2VyLWhvbGRlciAucGFsZXR0ZS1jb2xvcntjdXJzb3I6cG9pbnRlcjt3aWR0aDoxMHB4O2hlaWdodDoxMHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIE5neFRUaXRhbkNvbG9yUGlja2VyUGFsZXR0ZUxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgncGFsbGV0cycpIHB1YmxpYyBwYWxsZXRzOiBBcnJheTxQYWxldHRlPiA9IFtdO1xuICBASW5wdXQoJ2NvbnRleHQnKSBwdWJsaWMgX2NvbnRleHQ6IENvbG9yUGlja2VyQ29tcG9uZW50O1xuICBAT3V0cHV0KCdjaGFuZ2UnKSBwdWJsaWMgY2hhbmdlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIHB1YmxpYyBhY3RpdmVQYWxldHRlOiBQYWxldHRlID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgY2xvc2VQYWxldHRlKCkge1xuICAgIHRoaXMuYWN0aXZlUGFsZXR0ZSA9IG51bGw7XG4gIH1cblxuICBzZWxlY3RQYWxldHRlKHBhbGV0dGU6IFBhbGV0dGUpIHtcbiAgICB0aGlzLl9jb250ZXh0LmNsb3NlUGlja2VyKCk7XG4gICAgaWYoXG4gICAgICB0aGlzLmFjdGl2ZVBhbGV0dGUgPT0gbnVsbFxuICAgICkge1xuICAgICAgdGhpcy5hY3RpdmVQYWxldHRlID0gcGFsZXR0ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYWN0aXZlUGFsZXR0ZS5pZCAhPT0gcGFsZXR0ZS5pZCkge1xuICAgICAgdGhpcy5hY3RpdmVQYWxldHRlID0gcGFsZXR0ZTtcbiAgICB9XG5cbiAgfVxuXG4gIGNvbG9yU2VsZWN0ZWQoY29sb3IpIHtcbiAgICB0aGlzLmNoYW5nZS5lbWl0KGNvbG9yKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkNoYW5nZXMsIE9uSW5pdCxcbiAgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JEaXJlY3RpdmV9IGZyb20gXCIuL25neC10dGl0YW4tY29sb3ItcGlja2VyLXNlbGVjdG9yLmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHtOZ3hUVGl0YW5Db2xvclBpY2tlclNlcnZpY2V9IGZyb20gXCIuL25neC10dGl0YW4tY29sb3ItcGlja2VyLnNlcnZpY2VcIjtcbmltcG9ydCB7Tmd4VFRpdGFuQ29sb3JQaWNrZXJJbnB1dERpcmVjdGl2ZX0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXItaW5wdXQuZGlyZWN0aXZlXCI7XG5pbXBvcnQge05neFRUaXRhbkNvbG9yUGlja2VyUGFsZXR0ZUxpc3RDb21wb25lbnR9IGZyb20gXCIuL25neC10dGl0YW4tY29sb3ItcGlja2VyLXBhbGV0dGUtbGlzdC9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1wYWxldHRlLWxpc3QuY29tcG9uZW50XCI7XG5pbXBvcnQge0hTVkEsIFBhbGV0dGUsIFBpY2tlckNvbmZpZywgUGlja2VyT3B0aW9uc30gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuaW50ZXJmYWNlXCI7XG5AQ29tcG9uZW50KHtcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHNlbGVjdG9yOiAnbGliLW5neC10dGl0YW4tY29sb3ItcGlja2VyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2XHJcbiAgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci13cmFwcGVyXCJcclxuPlxyXG5cclxuICA8ZGl2IGNsYXNzPVwicGlja2VyLWlucHV0LXdyYXBwZXJcIj5cclxuICAgIDxkaXZcclxuICAgICAgW25nU3R5bGVdPVwie2JhY2tncm91bmRDb2xvcjogY29sb3J9XCJcclxuICAgICAgY2xhc3M9XCJkZWJ1Zy1vdXRwdXRcIlxyXG4gICAgICAqbmdJZj1cIl9waWNrZXJDb25maWcuZGVidWdcIlxyXG4gICAgPlxyXG4gICAgICB7e2NvbG9yfX1cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cInBpY2tlci1pbnB1dC1sYWJlbFwiICpuZ0lmPVwidGl0bGUgIT09ICcnXCI+XHJcbiAgICAgIDxsYWJlbCBbZm9yXT1cInV1aWRcIiA+e3t0aXRsZX19PC9sYWJlbD5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cInBpY2tlci1pbnB1dC1ob2xkZXJcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1jb2xvclwiIFtuZ1N0eWxlXT1cIntiYWNrZ3JvdW5kOiBjdXJyZW50Q29sb3JBbHBoYX1cIj5cclxuXHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWlucHV0XCI+XHJcbiAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICBsaWJOZ3hUVGl0YW5Db2xvclBpY2tlcklucHV0XHJcbiAgICAgICAgICAjcGlja2VySW5wdXQ9XCJsaWJOZ3hUVGl0YW5Db2xvclBpY2tlcklucHV0XCJcclxuICAgICAgICAgIChpbnB1dENoYW5nZSk9XCJpbnB1dENvbG9yQ2hhbmdlKCRldmVudClcIlxyXG4gICAgICAgICAgW2Zvcm1hdF09XCJfcGlja2VyQ29uZmlnLmlucHV0Rm9ybWF0XCJcclxuICAgICAgICAgIFtpZF09XCJ1dWlkXCJcclxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgIChmb2N1cyk9XCJvcGVuUGlja2VyKClcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8IS0tPGRpdiBjbGFzcz1cInBpY2tlci1zYXZlLXNpZ25cIj4tLT5cclxuICAgICAgPCEtLVMtLT5cclxuICAgICAgPCEtLTwvZGl2Pi0tPlxyXG4gICAgPC9kaXY+XHJcblxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlclwiIFtuZ0NsYXNzXT1cInsnbm8tYWxwaGEnOiAhX3BpY2tlckNvbmZpZy5hbHBoYSwgJ29wZW4nOiBwaWNrZXJPcGVufVwiPlxyXG4gICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19NYWluQ29sb3JcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19Db2xvckxheWVyXCIgW25nU3R5bGVdPVwie2JhY2tncm91bmRDb2xvcjogY3VycmVudENvbG9yTWF4fVwiID48L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19TbGlkYWJsZVwiXHJcbiAgICAgICAgICAgbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvclxyXG4gICAgICAgICAgICNtYWluQ29sb3I9XCJsaWJOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yXCJcclxuICAgICAgICAgICBbY29udGV4dF09XCJ0aGlzXCJcclxuICAgICAgICAgICAoY2hhbmdlKT1cImNvbG9yUGlja2VyU2VydmljZS5zYXR1cmF0aW9uQ2hhbmdlKCRldmVudCwgdGhpcylcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19EcmFnZ2VyXCJcclxuICAgICAgICAgICAgIGxpYk5neFRUaXRhbkNvbG9yUGlja2VyRHJhZ2dlclxyXG4gICAgICAgICAgICAgW2NvbnRleHRdPVwidGhpc1wiXHJcbiAgICAgICAgICAgICBzdHlsZT1cInRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAwcHgsIDBweCk7XCJcclxuICAgICAgICA+PC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0h1ZVBpY2tlclwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX1NsaWRhYmxlXCJcclxuICAgICAgICAgICBsaWJOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yXHJcbiAgICAgICAgICAgI2h1ZVBpY2tlcj1cImxpYk5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JcIlxyXG4gICAgICAgICAgIChjaGFuZ2UpPVwiY29sb3JQaWNrZXJTZXJ2aWNlLmh1ZUNoYW5nZSgkZXZlbnQsIHRoaXMpXCJcclxuICAgICAgICAgICBbZGlyZWN0aW9uXT1cIid2ZXJ0aWNhbCdcIlxyXG4gICAgICAgICAgIFtjb250ZXh0XT1cInRoaXNcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19EcmFnZ2VyXCJcclxuICAgICAgICAgICAgIGxpYk5neFRUaXRhbkNvbG9yUGlja2VyRHJhZ2dlclxyXG4gICAgICAgICAgICAgW3BpY2tlclBhZF09XCIwXCJcclxuICAgICAgICAgICAgIHN0eWxlPVwiIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAwcHgsIDBweCk7XCJcclxuICAgICAgICAgICAgIFtjb250ZXh0XT1cInRoaXNcIlxyXG4gICAgICAgID48L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fQWxwaGFQaWNrZXJcIiAqbmdJZj1cIl9waWNrZXJDb25maWcuYWxwaGEgPT09IHRydWVcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19Db2xvckxheWVyXCJcclxuICAgICAgICAgICBbbmdTdHlsZV09XCJ7YmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCh0byB0b3AsICcgKyBjdXJyZW50Q29sb3JBbHBoYVplcm8gKyAnICAxOHB4LCAnICsgY3VycmVudENvbG9yICsgJyBjYWxjKDEwMCUgLSAxOHB4KSd9XCJcclxuICAgICAgPjwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX1NsaWRhYmxlXCJcclxuICAgICAgICAgICBsaWJOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yXHJcbiAgICAgICAgICAgI2FscGhhUGlja2VyPVwibGliTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvclwiXHJcbiAgICAgICAgICAgKGNoYW5nZSk9XCJjb2xvclBpY2tlclNlcnZpY2UuYWxwaGFDaGFuZ2UoJGV2ZW50LCB0aGlzKVwiXHJcbiAgICAgICAgICAgW2RpcmVjdGlvbl09XCIndmVydGljYWwnXCJcclxuICAgICAgICAgICBbY29udGV4dF09XCJ0aGlzXCJcclxuICAgICAgPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fRHJhZ2dlclwiXHJcbiAgICAgICAgICAgICBsaWJOZ3hUVGl0YW5Db2xvclBpY2tlckRyYWdnZXJcclxuICAgICAgICAgICAgIFtwaWNrZXJQYWRdPVwiMFwiIHN0eWxlPVwiIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAwcHgsIDBweCk7XCJcclxuICAgICAgICAgICAgIFtjb250ZXh0XT1cInRoaXNcIlxyXG4gICAgICAgID48L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuICA8bGliLW5neC10dGl0YW4tY29sb3ItcGlja2VyLXBhbGV0dGUtbGlzdFxyXG4gICAgKGNoYW5nZSk9XCJpbnB1dENvbG9yQ2hhbmdlKCRldmVudClcIlxyXG4gICAgW3BhbGxldHNdPVwicGlja2VyUGFsbGV0c1wiXHJcbiAgICBbY29udGV4dF09XCJ0aGlzXCJcclxuICA+PC9saWItbmd4LXR0aXRhbi1jb2xvci1waWNrZXItcGFsZXR0ZS1saXN0PlxyXG48L2Rpdj5cclxuXHJcbmAsXG4gIHN0eWxlczogW2A6aG9zdCAqLDpob3N0IDphZnRlciw6aG9zdCA6YmVmb3Jle2JveC1zaXppbmc6Ym9yZGVyLWJveH06aG9zdCAuZGVidWctb3V0cHV0e3dpZHRoOjEwMCU7aGVpZ2h0OjIwcHh9Omhvc3QgLnBpY2tlci1pbnB1dC13cmFwcGVye21hcmdpbi1ib3R0b206NnB4fTpob3N0IC5waWNrZXItaW5wdXQtd3JhcHBlciAucGlja2VyLWlucHV0LWxhYmVse21hcmdpbi1ib3R0b206NnB4fTpob3N0IC5waWNrZXItaW5wdXQtd3JhcHBlciAucGlja2VyLWlucHV0LWxhYmVsIGxhYmVse3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtmb250LXdlaWdodDo2MDB9Omhvc3QgLnBpY2tlci1pbnB1dC13cmFwcGVyIC5waWNrZXItaW5wdXQtaG9sZGVye2Rpc3BsYXk6ZmxleDtoZWlnaHQ6MzNweDtib3JkZXI6MXB4IHNvbGlkICNiYmI7b3ZlcmZsb3c6aGlkZGVuO2JvcmRlci1yYWRpdXM6M3B4O2JhY2tncm91bmQtY29sb3I6I2VlZX06aG9zdCAucGlja2VyLWlucHV0LXdyYXBwZXIgLnBpY2tlci1pbnB1dC1ob2xkZXIgLnBpY2tlci1jb2xvcntmbGV4OjAgMCAzMXB4O2JhY2tncm91bmQtY29sb3I6I2ZmMDMwMH06aG9zdCAucGlja2VyLWlucHV0LXdyYXBwZXIgLnBpY2tlci1pbnB1dC1ob2xkZXIgLnBpY2tlci1pbnB1dHtmbGV4OmF1dG87YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudH06aG9zdCAucGlja2VyLWlucHV0LXdyYXBwZXIgLnBpY2tlci1pbnB1dC1ob2xkZXIgLnBpY2tlci1pbnB1dCBpbnB1dHtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O2NvbG9yOiMyNzI3Mjc7Zm9udC1mYW1pbHk6bW9ub3NwYWNlO2ZvbnQtc2l6ZToxNHB4O2JvcmRlcjpub25lO291dGxpbmU6MDtwYWRkaW5nOjhweCAycHggOHB4IDhweDt3aWR0aDoxMDAlfTpob3N0IC5waWNrZXItaW5wdXQtd3JhcHBlciAucGlja2VyLWlucHV0LWhvbGRlciAucGlja2VyLXNhdmUtc2lnbntmbGV4OjAgMCAzMXB4O2xpbmUtaGVpZ2h0OjMzcHg7dGV4dC1hbGlnbjpjZW50ZXJ9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2Vye21heC1oZWlnaHQ6MDtvdmVyZmxvdzpoaWRkZW47LXdlYmtpdC11c2VyLXNlbGVjdDpub25lOy1tb3otdXNlci1zZWxlY3Q6bm9uZTstbXMtdXNlci1zZWxlY3Q6bm9uZTt1c2VyLXNlbGVjdDpub25lO2Rpc3BsYXk6ZmxleDt0cmFuc2l0aW9uOm1heC1oZWlnaHQgLjNzfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci5vcGVue21hcmdpbi1ib3R0b206NXB4O21heC1oZWlnaHQ6MTY1cHh9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19Db2xvckxheWVye3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MTA7dG9wOjA7bGVmdDowO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7Ym94LXNoYWRvdzppbnNldCAwIDAgMnB4IDAgcmdiYSgwLDAsMCwuNSk7cG9pbnRlci1ldmVudHM6bm9uZX06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX1NsaWRhYmxle2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7Y3Vyc29yOnBvaW50ZXJ9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19EcmFnZ2Vye3Bvc2l0aW9uOnJlbGF0aXZlO3otaW5kZXg6MzA7Ym90dG9tOi45cmVtOy13ZWJraXQtdHJhbnNmb3JtOm5vbmU7dHJhbnNmb3JtOm5vbmU7aGVpZ2h0OjE4cHg7d2lkdGg6MThweDttYXJnaW46MCBhdXRvOy13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW47YmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW47d2lsbC1jaGFuZ2U6dHJhbnNmb3JtO2JhY2tncm91bmQ6MCAwO2JvcmRlcjozcHggc29saWQgI2ZmZjtib3gtc2hhZG93OjAgMCAwIDFweCByZ2JhKDYsNDQsODIsLjEpLDAgMnB4IDE2cHggcmdiYSgzMyw0Myw1NCwuMDgpLGluc2V0IDAgMCAwIDFweCByZ2JhKDYsNDQsODIsLjEpLDAgMnB4IDE2cHggcmdiYSgzMyw0Myw1NCwuMDgpO2JvcmRlci1yYWRpdXM6NTAlO3BvaW50ZXItZXZlbnRzOm5vbmU7dG91Y2gtYWN0aW9uOm5vbmV9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19NYWluQ29sb3J7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQoNDVkZWcsI2RmZTNlOCAyNSUsdHJhbnNwYXJlbnQgMCksbGluZWFyLWdyYWRpZW50KC00NWRlZywjZGZlM2U4IDI1JSx0cmFuc3BhcmVudCAwKSxsaW5lYXItZ3JhZGllbnQoNDVkZWcsdHJhbnNwYXJlbnQgNzUlLCNkZmUzZTggMCksbGluZWFyLWdyYWRpZW50KC00NWRlZyx0cmFuc3BhcmVudCA3NSUsI2RmZTNlOCAwKTtiYWNrZ3JvdW5kLXNpemU6MS42cmVtIDEuNnJlbTtiYWNrZ3JvdW5kLXBvc2l0aW9uOjAgMCwwIC44cmVtLC44cmVtIC0uOHJlbSwtLjhyZW0gMDtwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW47ZmxleDphdXRvO2JvcmRlci1yYWRpdXM6NHB4O2N1cnNvcjpwb2ludGVyfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fTWFpbkNvbG9yIC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fQ29sb3JMYXllcntib3gtc2hhZG93Omluc2V0IDAgMCAwIDFweCByZ2JhKDYsNDQsODIsLjEpLDAgMnB4IDE2cHggcmdiYSgzMyw0Myw1NCwuMDgpO2JvcmRlci1yYWRpdXM6NHB4fTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fTWFpbkNvbG9yIC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fRHJhZ2dlcntyaWdodDouOXJlbTttYXJnaW46MH06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX01haW5Db2xvcjphZnRlciw6aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX01haW5Db2xvcjpiZWZvcmV7Y29udGVudDpcIlwiO3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MjA7dG9wOjA7bGVmdDowO2Rpc3BsYXk6YmxvY2s7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTtwb2ludGVyLWV2ZW50czpub25lO2JvcmRlci1yYWRpdXM6M3B4fTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fTWFpbkNvbG9yOmJlZm9yZXtiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCg5MGRlZywjZmZmLHRyYW5zcGFyZW50KX06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX01haW5Db2xvcjphZnRlcntiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudCgwZGVnLCMwMDAsdHJhbnNwYXJlbnQpO2JveC1zaGFkb3c6aW5zZXQgMCAwIDAgMXB4IHJnYmEoNiw0NCw4MiwuMSksMCAycHggMTZweCByZ2JhKDMzLDQzLDU0LC4wOCl9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19BbHBoYVBpY2tlciw6aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0h1ZVBpY2tlcntwb3NpdGlvbjpyZWxhdGl2ZTtvdmVyZmxvdzpoaWRkZW47aGVpZ2h0OjE2NXB4O3dpZHRoOjI0cHg7ZmxleDowIDAgMjRweDttYXJnaW4tbGVmdDouOHJlbTtib3JkZXItd2lkdGg6M3B4O2JvcmRlci1yYWRpdXM6OHJlbTtwYWRkaW5nOjEzcHggMH06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0h1ZVBpY2tlcntiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCh0byBib3R0b20scmVkIDAsI2ZmMCAyMSUsIzBmMCAzMyUsIzBmZiA1MCUsIzAwZiA2NyUsI2YwZiA4MyUscmVkIDEwMCUpO2JveC1zaGFkb3c6aW5zZXQgMCAwIDJweCAwIHJnYmEoMCwwLDAsLjUpfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fQWxwaGFQaWNrZXJ7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQoNDVkZWcsI2RmZTNlOCAyNSUsdHJhbnNwYXJlbnQgMCksbGluZWFyLWdyYWRpZW50KC00NWRlZywjZGZlM2U4IDI1JSx0cmFuc3BhcmVudCAwKSxsaW5lYXItZ3JhZGllbnQoNDVkZWcsdHJhbnNwYXJlbnQgNzUlLCNkZmUzZTggMCksbGluZWFyLWdyYWRpZW50KC00NWRlZyx0cmFuc3BhcmVudCA3NSUsI2RmZTNlOCAwKTtiYWNrZ3JvdW5kLXNpemU6MS42cmVtIDEuNnJlbTtiYWNrZ3JvdW5kLXBvc2l0aW9uOjAgMCwwIC44cmVtLC44cmVtIC0uOHJlbSwtLjhyZW0gMH06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0FscGhhUGlja2VyIC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fQ29sb3JMYXllcntib3JkZXItcmFkaXVzOjhyZW19Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyLm5vLWFscGhhIC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fTWFpbkNvbG9ye3dpZHRoOjIwMHB4fWBdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcblxuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pIGNvbXBvbmVudENsaWNrKCRldmVudCkge1xuICAgIGlmKCF0aGlzLnBpY2tlck9wZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYodGhpcy5fcGlja2VyQ29uZmlnLm5vSGlkZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZih0eXBlb2YgJGV2ZW50LnBhdGggIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIGxldCBwaWNrZXJGb3VuZCA9IGZhbHNlO1xuICAgICAgJGV2ZW50LnBhdGguZXZlcnkoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICBpZihcbiAgICAgICAgICB0eXBlb2YgaXRlbS5jbGFzc0xpc3QgIT09IFwidW5kZWZpbmVkXCJcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYoXG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5jb250YWlucygncGlja2VyLWlucHV0LWhvbGRlcicpIHx8XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5jb250YWlucygnbmd4LXR0aXRhbi1jb2xvci1waWNrZXInKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcGlja2VyRm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSk7XG5cbiAgICAgIGlmKCFwaWNrZXJGb3VuZCkge1xuXG4gICAgICAgIHRoaXMuY2xvc2VQaWNrZXIoKTtcbiAgICAgIH1cblxuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgnb3B0aW9ucycpIHB1YmxpYyBvcHRpb25zOiBQaWNrZXJPcHRpb25zID0ge307XG4gIEBJbnB1dCgnY29sb3InKSBwdWJsaWMgY29sb3I6IHN0cmluZyA9ICcjZmZmZmZmJztcbiAgQElucHV0KCd0aXRsZScpIHB1YmxpYyB0aXRsZTogc3RyaW5nID0gJyc7XG4gIEBPdXRwdXQoJ2NvbG9yQ2hhbmdlJykgcHVibGljIGNvbG9yQ2hhbmdlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG5cbiAgQFZpZXdDaGlsZCgncGlja2VySW5wdXQnKSBwdWJsaWMgcGlja2VySW5wdXQ6IE5neFRUaXRhbkNvbG9yUGlja2VySW5wdXREaXJlY3RpdmU7XG4gIEBWaWV3Q2hpbGQoTmd4VFRpdGFuQ29sb3JQaWNrZXJQYWxldHRlTGlzdENvbXBvbmVudCkgcHVibGljIHBhbGV0dGVMaXN0OiBOZ3hUVGl0YW5Db2xvclBpY2tlclBhbGV0dGVMaXN0Q29tcG9uZW50O1xuICBAVmlld0NoaWxkKCdtYWluQ29sb3InKSBwdWJsaWMgbWFpbkNvbG9yOiBOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yRGlyZWN0aXZlO1xuICBAVmlld0NoaWxkKCdodWVQaWNrZXInKSBwdWJsaWMgaHVlUGlja2VyOiBOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yRGlyZWN0aXZlO1xuICBAVmlld0NoaWxkKCdhbHBoYVBpY2tlcicpIHB1YmxpYyBhbHBoYVBpY2tlcjogTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvckRpcmVjdGl2ZTtcblxuXG4gIHB1YmxpYyBfcGlja2VyQ29uZmlnOiBQaWNrZXJDb25maWcgPSB7XG4gICAgYWxwaGE6IGZhbHNlLFxuICAgIHBpY2tlclNob3c6IGZhbHNlLFxuICAgIG5vSGlkZTogZmFsc2UsXG4gICAgZGVidWc6IGZhbHNlLFxuICAgIG91dEZvcm1hdDogJ2hleDYnLFxuICAgIGlucHV0Rm9ybWF0OiAnaGV4NicsXG4gICAgYXZhaWxQYWxsZXRzOiBbJ3BvbGFyaXMnLCAnbWF0ZXJpYWwnXSxcbiAgICBjdXN0b21QYWxsZXRzOiAgW10sXG4gIH07XG4gIHB1YmxpYyBjb2xvckluaXQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIHBpY2tlck9wZW46IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIHBpY2tlclBhbGxldHM6IEFycmF5PFBhbGV0dGU+ID0gW107XG4gIHB1YmxpYyBoc3ZhOiBIU1ZBID0ge1xuICAgIGh1ZTogMCxcbiAgICBzYXR1cmF0aW9uOiAxMDAsXG4gICAgdmFsdWU6IDEwMCxcbiAgICBhbHBoYTogMVxuICB9O1xuICBwdWJsaWMgY3VycmVudENvbG9yOiBzdHJpbmcgPSAncmdiKDI1NSwwLDApJztcbiAgcHVibGljIGN1cnJlbnRDb2xvck1heDogc3RyaW5nID0gJ3JnYmEoMjU1LDAsMCwxKSc7XG4gIHB1YmxpYyBjdXJyZW50Q29sb3JBbHBoYTogc3RyaW5nID0gJ3JnYmEoMjU1LDAsMCwxKSc7XG4gIHB1YmxpYyBjdXJyZW50Q29sb3JBbHBoYVplcm86IHN0cmluZyA9ICdyZ2JhKDI1NSwwLDAsMCknO1xuICBwdWJsaWMgdXVpZDogc3RyaW5nID0gJ3BpY2tlci0nO1xuICBwdWJsaWMgYWxsb3dlZEZvcm1hdHM6IEFycmF5PHN0cmluZz4gPSBbJ2hleDYnLCAnaGV4OCcsICdyZ2InLCAncmdiYSddO1xuICBwdWJsaWMgYWxwaGFGb3JtYXRzOiBBcnJheTxzdHJpbmc+ID0gWydoZXg4JywgJ3JnYmEnXTtcbiAgcHVibGljIG9sZENvbG9yOiBzdHJpbmcgPSAnJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgY29sb3JQaWNrZXJTZXJ2aWNlOiBOZ3hUVGl0YW5Db2xvclBpY2tlclNlcnZpY2UsXG4gICAgcHVibGljIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7XG4gICAgdGhpcy51dWlkID0gdGhpcy5jb2xvclBpY2tlclNlcnZpY2UuZ2V0UGlja2VyVXVpZCgpO1xuXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnZhbGlkYXRlSW5wdXRQYXJhbXMoKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZignb3B0aW9ucycgaW4gY2hhbmdlcykge1xuICAgICAgdGhpcy52YWxpZGF0ZUlucHV0UGFyYW1zKCk7XG4gICAgfVxuICAgIGlmKCdjb2xvcicgaW4gY2hhbmdlcykge1xuICAgICAgaWYoY2hhbmdlcy5jb2xvci5jdXJyZW50VmFsdWUgIT09IGNoYW5nZXMuY29sb3IucHJldmlvdXNWYWx1ZSkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLmNvbG9yUGlja2VyU2VydmljZS5jb2xvclRvRGF0YSh0aGlzLmNvbG9yLCB0aGlzKTtcbiAgICAgICAgICB0aGlzLnNldERyYWdnZXJzVG9DdXJyZW50Q29sb3IoKTtcbiAgICAgICAgfSwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb3BlblBpY2tlcigpIHtcbiAgICB0aGlzLnBpY2tlck9wZW4gPSB0cnVlO1xuICAgIGlmKHR5cGVvZiB0aGlzLnBhbGV0dGVMaXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5wYWxldHRlTGlzdC5jbG9zZVBhbGV0dGUoKTtcbiAgICB9XG4gIH1cblxuXG4gIGNsb3NlUGlja2VyKCkge1xuICAgIHRoaXMucGlja2VyT3BlbiA9IGZhbHNlO1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHZhbGlkYXRlSW5wdXRQYXJhbXMoKSB7XG5cbiAgICBpZignaW5wdXRGb3JtYXQnIGluIHRoaXMub3B0aW9ucykge1xuICAgICAgaWYodGhpcy5hbGxvd2VkRm9ybWF0cy5pbmRleE9mKHRoaXMub3B0aW9ucy5vdXRGb3JtYXQpID09PSAtMSkge1xuICAgICAgICB0aGlzLl9waWNrZXJDb25maWcub3V0Rm9ybWF0ID0gJ2hleDYnO1xuICAgICAgICBjb25zb2xlLmdyb3VwKFwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJcIik7XG4gICAgICAgIGNvbnNvbGUud2FybignW291dEZvcm1hdF0gbXVzdCBiZSBvbmUgb2YgdGhpcyAoJyArIHRoaXMuYWxsb3dlZEZvcm1hdHMuam9pbignLCcpICsgJyknKTtcbiAgICAgICAgY29uc29sZS5ncm91cEVuZCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fcGlja2VyQ29uZmlnLm91dEZvcm1hdCA9IHRoaXMub3B0aW9ucy5vdXRGb3JtYXQgKyAnJztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoJ2lucHV0Rm9ybWF0JyBpbiB0aGlzLm9wdGlvbnMpIHtcbiAgICAgIGlmKHRoaXMuYWxsb3dlZEZvcm1hdHMuaW5kZXhPZih0aGlzLm9wdGlvbnMuaW5wdXRGb3JtYXQpID09PSAtMSkge1xuICAgICAgICB0aGlzLl9waWNrZXJDb25maWcuaW5wdXRGb3JtYXQgPSB0aGlzLl9waWNrZXJDb25maWcub3V0Rm9ybWF0ICsgJyc7XG4gICAgICAgIGNvbnNvbGUuZ3JvdXAoXCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlclwiKTtcbiAgICAgICAgY29uc29sZS53YXJuKCdbaW5wdXRGb3JtYXRdIG11c3QgYmUgb25lIG9mIHRoaXMgKCcgKyB0aGlzLmFsbG93ZWRGb3JtYXRzLmpvaW4oJywnKSArICcpJyk7XG4gICAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3BpY2tlckNvbmZpZy5pbnB1dEZvcm1hdCA9IHRoaXMub3B0aW9ucy5pbnB1dEZvcm1hdCArICcnO1xuICAgICAgfVxuICAgIH1cbiAgICBpZigncGlja2VyU2hvdycgaW4gdGhpcy5vcHRpb25zKSB7XG4gICAgICBpZih0aGlzLl9waWNrZXJDb25maWcucGlja2VyU2hvdyAhPT0gdGhpcy5vcHRpb25zLnBpY2tlclNob3cpIHtcbiAgICAgICAgdGhpcy5fcGlja2VyQ29uZmlnLnBpY2tlclNob3cgPSAhdGhpcy5fcGlja2VyQ29uZmlnLnBpY2tlclNob3c7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKCdub0hpZGUnIGluIHRoaXMub3B0aW9ucykge1xuICAgICAgaWYodGhpcy5fcGlja2VyQ29uZmlnLm5vSGlkZSAhPT0gdGhpcy5vcHRpb25zLm5vSGlkZSkge1xuICAgICAgICB0aGlzLl9waWNrZXJDb25maWcubm9IaWRlID0gIXRoaXMuX3BpY2tlckNvbmZpZy5ub0hpZGU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKCdkZWJ1ZycgaW4gdGhpcy5vcHRpb25zKSB7XG4gICAgICBpZih0aGlzLl9waWNrZXJDb25maWcuZGVidWcgIT09IHRoaXMub3B0aW9ucy5kZWJ1Zykge1xuICAgICAgICB0aGlzLl9waWNrZXJDb25maWcuZGVidWcgPSAhdGhpcy5fcGlja2VyQ29uZmlnLmRlYnVnO1xuICAgICAgfVxuICAgIH1cbiAgICBpZignYXZhaWxQYWxsZXRzJyBpbiB0aGlzLm9wdGlvbnMpIHtcbiAgICAgIHRoaXMuX3BpY2tlckNvbmZpZy5hdmFpbFBhbGxldHMgPSB0aGlzLm9wdGlvbnMuYXZhaWxQYWxsZXRzLmZpbHRlcihmdW5jdGlvbigpe3JldHVybiB0cnVlO30pO1xuICAgIH1cbiAgICBpZignY3VzdG9tUGFsbGV0cycgaW4gdGhpcy5vcHRpb25zKSB7XG4gICAgICB0aGlzLl9waWNrZXJDb25maWcuY3VzdG9tUGFsbGV0cyA9IHRoaXMub3B0aW9ucy5jdXN0b21QYWxsZXRzLmZpbHRlcihmdW5jdGlvbigpe3JldHVybiB0cnVlO30pO1xuICAgIH1cblxuICAgIHRoaXMuY29sb3JQaWNrZXJTZXJ2aWNlLnByZXBhcmVQaWNrZXJQYWxsZXRzKHRoaXMuX3BpY2tlckNvbmZpZy5hdmFpbFBhbGxldHMsIHRoaXMuX3BpY2tlckNvbmZpZy5jdXN0b21QYWxsZXRzLCB0aGlzKTtcblxuICAgIHRoaXMuX3BpY2tlckNvbmZpZy5hbHBoYSA9IHRoaXMuYWxwaGFGb3JtYXRzLmluZGV4T2YodGhpcy5fcGlja2VyQ29uZmlnLm91dEZvcm1hdCkgIT09IC0xO1xuICAgIGlmKHRoaXMuX3BpY2tlckNvbmZpZy5waWNrZXJTaG93KSB7XG4gICAgICB0aGlzLm9wZW5QaWNrZXIoKTtcbiAgICB9XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuXG4gIH1cblxuXG4gIGlucHV0Q29sb3JDaGFuZ2UoY29sb3I6IHN0cmluZykge1xuICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICB0aGlzLmNvbG9yUGlja2VyU2VydmljZS5jb2xvclRvRGF0YSh0aGlzLmNvbG9yLCB0aGlzKTtcbiAgICB0aGlzLnNldERyYWdnZXJzVG9DdXJyZW50Q29sb3IoKTtcbiAgfVxuXG4gIHVwZGF0ZVJldHVybkNvbG9yKCkge1xuICAgIHRoaXMuY29sb3IgPSB0aGlzLmNvbG9yUGlja2VyU2VydmljZS5wcmVwYXJlUmV0dXJuQ29sb3IodGhpcy5oc3ZhLCB0aGlzLl9waWNrZXJDb25maWcub3V0Rm9ybWF0KTtcblxuICAgIGlmKHRoaXMuY29sb3JJbml0KSB7XG4gICAgICBpZih0aGlzLm9sZENvbG9yICE9PSB0aGlzLmNvbG9yKSB7XG4gICAgICAgIHRoaXMub2xkQ29sb3IgPSB0aGlzLmNvbG9yICsgJyc7XG4gICAgICAgIHRoaXMuY29sb3JDaGFuZ2UuZW1pdCh0aGlzLmNvbG9yICsgJycpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNvbG9ySW5pdCA9IHRydWU7XG4gIH1cblxuXG4gIHNldElucHV0VmFsdWUoKSB7XG4gICAgaWYodHlwZW9mIHRoaXMucGlja2VySW5wdXQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLnBpY2tlcklucHV0LnNldElucHV0VmFsdWUoXG4gICAgICAgIHRoaXMuY29sb3JQaWNrZXJTZXJ2aWNlLnByZXBhcmVSZXR1cm5Db2xvcih0aGlzLmhzdmEsIHRoaXMuX3BpY2tlckNvbmZpZy5pbnB1dEZvcm1hdClcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgc2V0RHJhZ2dlcnNUb0N1cnJlbnRDb2xvcigpIHtcblxuICAgIGlmKHR5cGVvZiB0aGlzLm1haW5Db2xvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMubWFpbkNvbG9yLnNldERyYWdnZXIoXG4gICAgICAgIHtcbiAgICAgICAgICB4OiB0aGlzLmhzdmEuc2F0dXJhdGlvbixcbiAgICAgICAgICB5OiAxMDAgLSB0aGlzLmhzdmEudmFsdWVcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZih0eXBlb2YgdGhpcy5odWVQaWNrZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLmh1ZVBpY2tlci5zZXREcmFnZ2VyKHt4OiAwLCB5OiBNYXRoLnJvdW5kKHRoaXMuaHN2YS5odWUgKiAxMDAgLyAzNjApfSk7XG4gICAgfVxuXG4gICAgaWYodHlwZW9mIHRoaXMuYWxwaGFQaWNrZXIgIT09ICd1bmRlZmluZWQnICYmIHRoaXMuX3BpY2tlckNvbmZpZy5hbHBoYSkge1xuICAgICAgdGhpcy5hbHBoYVBpY2tlci5zZXREcmFnZ2VyKHt4OiAwLCB5OiAxMDAgLSAodGhpcy5oc3ZhLmFscGhhICogMTAwKX0pO1xuICAgIH1cbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxufVxuXG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQgfSBmcm9tICcuL25neC10dGl0YW4tY29sb3ItcGlja2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yRGlyZWN0aXZlIH0gZnJvbSAnLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1zZWxlY3Rvci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgTmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyRGlyZWN0aXZlIH0gZnJvbSAnLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1kcmFnZ2VyLmRpcmVjdGl2ZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vblwiO1xuaW1wb3J0IHsgTmd4VFRpdGFuQ29sb3JQaWNrZXJJbnB1dERpcmVjdGl2ZSB9IGZyb20gJy4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXItaW5wdXQuZGlyZWN0aXZlJztcbmltcG9ydCB7IE5neFRUaXRhbkNvbG9yUGlja2VyUGFsZXR0ZUxpc3RDb21wb25lbnQgfSBmcm9tICcuL25neC10dGl0YW4tY29sb3ItcGlja2VyLXBhbGV0dGUtbGlzdC9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1wYWxldHRlLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7Tmd4VFRpdGFuQ29sb3JQaWNrZXJTZXJ2aWNlfSBmcm9tIFwiLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci5zZXJ2aWNlXCI7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQsXG4gICAgTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvckRpcmVjdGl2ZSxcbiAgICBOZ3hUVGl0YW5Db2xvclBpY2tlckRyYWdnZXJEaXJlY3RpdmUsXG4gICAgTmd4VFRpdGFuQ29sb3JQaWNrZXJJbnB1dERpcmVjdGl2ZSxcbiAgICBOZ3hUVGl0YW5Db2xvclBpY2tlclBhbGV0dGVMaXN0Q29tcG9uZW50LFxuICBdLFxuICBleHBvcnRzOiBbTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnRdLFxuICBwcm92aWRlcnM6IFtcbiAgICBOZ3hUVGl0YW5Db2xvclBpY2tlclNlcnZpY2VcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hUVGl0YW5Db2xvclBpY2tlck1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0lBa0JFOzBCQVJtQyxFQUFFO3VCQUNKLEVBQUU7cURBRTBDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDO21EQUNsQyxTQUFTLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQztRQUt2RyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7Ozs7Ozs7O0tBU3hCOzs7Ozs7SUFFRCxnQkFBZ0IsQ0FBQyxPQUFzQixFQUFFLGVBQThDO1FBQ3JGLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDNUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQ25DOzs7Ozs7SUFFRCxTQUFTLENBQUMsT0FBc0IsRUFBRSxlQUE4QztRQUM5RSxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdB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RSxFQUFFLENBQUM7Z0JBQ2pDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ2pDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ2pDLENBQUM7YUFDRixDQUFDO1NBQ0g7YUFBTSxJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQzFCLElBQUksR0FBRztnQkFDTCxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUN2RCxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUN2RCxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUN2RCxDQUFDO2FBQ0YsQ0FBQTtTQUNGO2FBQU0sSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUMxQixJQUFJLEdBQUc7Z0JBQ0wsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDakMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDakMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDakMsVUFBVSxD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RSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO2dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUztnQkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO2dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUztnQkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO2dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUztnQkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTO2dCQUN4SixTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUztnQkFDeEosU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQ3hKLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVM7Z0JBQzVHLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNB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