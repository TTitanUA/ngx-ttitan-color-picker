/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */
export function CustomRect() { }
function CustomRect_tsickle_Closure_declarations() {
    /** @type {?} */
    CustomRect.prototype.height;
    /** @type {?} */
    CustomRect.prototype.left;
    /** @type {?} */
    CustomRect.prototype.top;
    /** @type {?} */
    CustomRect.prototype.width;
}
/**
 * @record
 */
export function CustomPercent() { }
function CustomPercent_tsickle_Closure_declarations() {
    /** @type {?} */
    CustomPercent.prototype.x;
    /** @type {?} */
    CustomPercent.prototype.y;
}
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
/**
 * @record
 */
export function PickerConfig() { }
function PickerConfig_tsickle_Closure_declarations() {
    /** @type {?} */
    PickerConfig.prototype.alpha;
    /** @type {?} */
    PickerConfig.prototype.pickerShow;
    /** @type {?} */
    PickerConfig.prototype.noHide;
    /** @type {?} */
    PickerConfig.prototype.debug;
    /** @type {?} */
    PickerConfig.prototype.outFormat;
    /** @type {?} */
    PickerConfig.prototype.inputFormat;
    /** @type {?} */
    PickerConfig.prototype.availPallets;
    /** @type {?} */
    PickerConfig.prototype.customPallets;
}
/**
 * @record
 */
export function PickerOptions() { }
function PickerOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    PickerOptions.prototype.pickerShow;
    /** @type {?|undefined} */
    PickerOptions.prototype.noHide;
    /** @type {?|undefined} */
    PickerOptions.prototype.debug;
    /** @type {?|undefined} */
    PickerOptions.prototype.outFormat;
    /** @type {?|undefined} */
    PickerOptions.prototype.inputFormat;
    /** @type {?|undefined} */
    PickerOptions.prototype.availPallets;
    /** @type {?|undefined} */
    PickerOptions.prototype.customPallets;
}
/**
 * @record
 */
export function ColorPickerService() { }
function ColorPickerService_tsickle_Closure_declarations() {
    /** @type {?} */
    ColorPickerService.prototype.pickerList;
    /** @type {?} */
    ColorPickerService.prototype.pallets;
    /** @type {?} */
    ColorPickerService.prototype.mouseMoveObservable;
    /** @type {?} */
    ColorPickerService.prototype.mouseUpObservable;
    /** @type {?} */
    ColorPickerService.prototype.saturationChange;
    /** @type {?} */
    ColorPickerService.prototype.hueChange;
    /** @type {?} */
    ColorPickerService.prototype.alphaChange;
    /** @type {?} */
    ColorPickerService.prototype.dataToColor;
    /** @type {?} */
    ColorPickerService.prototype.colorToData;
    /** @type {?} */
    ColorPickerService.prototype.detectColorType;
    /** @type {?} */
    ColorPickerService.prototype.fillValuesFromHsvaArr;
    /** @type {?} */
    ColorPickerService.prototype.parseRgbaColor;
    /** @type {?} */
    ColorPickerService.prototype.parseRgbColor;
    /** @type {?} */
    ColorPickerService.prototype.parseHslaColor;
    /** @type {?} */
    ColorPickerService.prototype.parseHslColor;
    /** @type {?} */
    ColorPickerService.prototype.parseHexColor;
    /** @type {?} */
    ColorPickerService.prototype.hsvaToRgba;
    /** @type {?} */
    ColorPickerService.prototype.hsvaToRgbaString;
    /** @type {?} */
    ColorPickerService.prototype.rgbaToHsva;
    /** @type {?} */
    ColorPickerService.prototype.hsvaToHsla;
    /** @type {?} */
    ColorPickerService.prototype.hslaToHsva;
    /** @type {?} */
    ColorPickerService.prototype.hexToHsva;
    /** @type {?} */
    ColorPickerService.prototype.hsvaToHex;
    /** @type {?} */
    ColorPickerService.prototype.validateColorFormat;
    /** @type {?} */
    ColorPickerService.prototype.validateHexFormat;
    /** @type {?} */
    ColorPickerService.prototype.validateRgbaFormat;
    /** @type {?} */
    ColorPickerService.prototype.prepareReturnColor;
    /** @type {?} */
    ColorPickerService.prototype.preparePickerPallets;
    /** @type {?} */
    ColorPickerService.prototype.fillBasePallets;
}
/**
 * @record
 */
export function ColorPickerComponent() { }
function ColorPickerComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    ColorPickerComponent.prototype._pickerConfig;
    /** @type {?} */
    ColorPickerComponent.prototype.colorInit;
    /** @type {?} */
    ColorPickerComponent.prototype.pickerOpen;
    /** @type {?} */
    ColorPickerComponent.prototype.pickerPallets;
    /** @type {?} */
    ColorPickerComponent.prototype.hsva;
    /** @type {?} */
    ColorPickerComponent.prototype.currentColor;
    /** @type {?} */
    ColorPickerComponent.prototype.currentColorMax;
    /** @type {?} */
    ColorPickerComponent.prototype.currentColorAlpha;
    /** @type {?} */
    ColorPickerComponent.prototype.currentColorAlphaZero;
    /** @type {?} */
    ColorPickerComponent.prototype.uuid;
    /** @type {?} */
    ColorPickerComponent.prototype.allowedFormats;
    /** @type {?} */
    ColorPickerComponent.prototype.colorPickerService;
    /** @type {?} */
    ColorPickerComponent.prototype.openPicker;
    /** @type {?} */
    ColorPickerComponent.prototype.closePicker;
    /** @type {?} */
    ColorPickerComponent.prototype.validateInputParams;
    /** @type {?} */
    ColorPickerComponent.prototype.inputColorChange;
    /** @type {?} */
    ColorPickerComponent.prototype.updateReturnColor;
    /** @type {?} */
    ColorPickerComponent.prototype.setInputValue;
    /** @type {?} */
    ColorPickerComponent.prototype.setDraggersToCurrentColor;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXR0aXRhbi1jb2xvci1waWNrZXIuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIvIiwic291cmNlcyI6WyJsaWIvbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzL2luZGV4XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3VzdG9tUmVjdCB7XG4gIGhlaWdodDogbnVtYmVyLFxuICBsZWZ0OiBudW1iZXIsXG4gIHRvcDogbnVtYmVyLFxuICB3aWR0aDogbnVtYmVyXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3VzdG9tUGVyY2VudCB7XG4gIHg6IG51bWJlcixcbiAgeTogbnVtYmVyLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEhTVkEge1xuICBodWU6IG51bWJlcixcbiAgc2F0dXJhdGlvbjogbnVtYmVyLFxuICB2YWx1ZTogbnVtYmVyLFxuICBhbHBoYTogbnVtYmVyLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBhbGV0dGUge1xuICBuYW1lOiBzdHJpbmcsXG4gIGlkOiBzdHJpbmcsXG4gIGNvbG9yczogQXJyYXk8c3RyaW5nPlxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBpY2tlckNvbmZpZyB7XG4gIGFscGhhOiBib29sZWFuLFxuICBwaWNrZXJTaG93OiBib29sZWFuLFxuICBub0hpZGU6IGJvb2xlYW4sXG4gIGRlYnVnOiBib29sZWFuLFxuICBvdXRGb3JtYXQ6IHN0cmluZyxcbiAgaW5wdXRGb3JtYXQ6IHN0cmluZyxcbiAgYXZhaWxQYWxsZXRzOiBBcnJheTxzdHJpbmc+LFxuICBjdXN0b21QYWxsZXRzOiAgQXJyYXk8UGFsZXR0ZT4sXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGlja2VyT3B0aW9ucyB7XG4gIHBpY2tlclNob3c/OiBib29sZWFuLFxuICBub0hpZGU/OiBib29sZWFuLFxuICBkZWJ1Zz86IGJvb2xlYW4sXG4gIG91dEZvcm1hdD86IHN0cmluZyxcbiAgaW5wdXRGb3JtYXQ/OiBzdHJpbmcsXG4gIGF2YWlsUGFsbGV0cz86IEFycmF5PHN0cmluZz4sXG4gIGN1c3RvbVBhbGxldHM/OiAgQXJyYXk8UGFsZXR0ZT4sXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29sb3JQaWNrZXJTZXJ2aWNlIHtcbiAgcGlja2VyTGlzdDogQXJyYXk8c3RyaW5nPixcbiAgcGFsbGV0czogQXJyYXk8UGFsZXR0ZT4sXG4gIG1vdXNlTW92ZU9ic2VydmFibGU6IE9ic2VydmFibGU8TW91c2VFdmVudD4sXG4gIG1vdXNlVXBPYnNlcnZhYmxlOiBPYnNlcnZhYmxlPE1vdXNlRXZlbnQ+LFxuICBzYXR1cmF0aW9uQ2hhbmdlKHBlcmNlbnQ6IEN1c3RvbVBlcmNlbnQsIHBpY2tlckNvbXBvbmVudDogQ29sb3JQaWNrZXJDb21wb25lbnQgKSxcbiAgaHVlQ2hhbmdlKHBlcmNlbnQ6IEN1c3RvbVBlcmNlbnQsIHBpY2tlckNvbXBvbmVudDogQ29sb3JQaWNrZXJDb21wb25lbnQpLFxuICBhbHBoYUNoYW5nZShwZXJjZW50OiBDdXN0b21QZXJjZW50LCBwaWNrZXJDb21wb25lbnQ6IENvbG9yUGlja2VyQ29tcG9uZW50KSxcbiAgZGF0YVRvQ29sb3IocGlja2VyQ29tcG9uZW50OiBDb2xvclBpY2tlckNvbXBvbmVudCksXG4gIGNvbG9yVG9EYXRhKGNvbG9yOiBzdHJpbmcsIHBpY2tlckNvbXBvbmVudDogQ29sb3JQaWNrZXJDb21wb25lbnQpLFxuICBkZXRlY3RDb2xvclR5cGUoY29sb3I6IHN0cmluZyksXG4gIGZpbGxWYWx1ZXNGcm9tSHN2YUFycihoc3ZhQXJyOiBBcnJheTxudW1iZXI+LCBwaWNrZXJDb21wb25lbnQ6IENvbG9yUGlja2VyQ29tcG9uZW50KSxcbiAgcGFyc2VSZ2JhQ29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudDogQ29sb3JQaWNrZXJDb21wb25lbnQpLFxuICBwYXJzZVJnYkNvbG9yKGNvbG9yLCBwaWNrZXJDb21wb25lbnQ6IENvbG9yUGlja2VyQ29tcG9uZW50KSxcbiAgcGFyc2VIc2xhQ29sb3IoY29sb3IsIHBpY2tlckNvbXBvbmVudDogQ29sb3JQaWNrZXJDb21wb25lbnQpLFxuICBwYXJzZUhzbENvbG9yKGNvbG9yLCBwaWNrZXJDb21wb25lbnQ6IENvbG9yUGlja2VyQ29tcG9uZW50KSxcbiAgcGFyc2VIZXhDb2xvcihjb2xvciwgcGlja2VyQ29tcG9uZW50OiBDb2xvclBpY2tlckNvbXBvbmVudCksXG4gIGhzdmFUb1JnYmEoSCwgUywgViwgQSk6IEFycmF5PG51bWJlcj4sXG4gIGhzdmFUb1JnYmFTdHJpbmcoSCwgUywgViwgQSwgc2hvd0FscGhhOiBib29sZWFuKTogc3RyaW5nLFxuICByZ2JhVG9Ic3ZhKHIsIGcsIGIsIGEpOiBBcnJheTxudW1iZXI+LFxuICBoc3ZhVG9Ic2xhKGgsIHMsIHYsIGEpOiBBcnJheTxudW1iZXI+LFxuICBoc2xhVG9Ic3ZhIChoLCBzLCBsLCBhKTogQXJyYXk8bnVtYmVyPixcbiAgaGV4VG9Ic3ZhKGhleDogc3RyaW5nKTogQXJyYXk8bnVtYmVyPixcbiAgaHN2YVRvSGV4KEgsIFMsIFYsIEEsIHNob3dBbHBoYTogYm9vbGVhbik6IHN0cmluZyxcbiAgdmFsaWRhdGVDb2xvckZvcm1hdCh2YWx1ZTogc3RyaW5nLCBmb3JtYXQ6IHN0cmluZyk6IHN0cmluZyxcbiAgdmFsaWRhdGVIZXhGb3JtYXQodmFsdWU6IHN0cmluZywgYWxwaGE6IGJvb2xlYW4pOiBzdHJpbmcsXG4gIHZhbGlkYXRlUmdiYUZvcm1hdCh2YWx1ZTogc3RyaW5nLCBhbHBoYTogYm9vbGVhbik6IHN0cmluZyxcbiAgcHJlcGFyZVJldHVybkNvbG9yKGhzdmE6IEhTVkEsIGZvcm1hdDogc3RyaW5nKTogc3RyaW5nLFxuICBwcmVwYXJlUGlja2VyUGFsbGV0cyhhdmFpbFBhbGxldHM6IEFycmF5PHN0cmluZz4sIGN1c3RvbVBhbGxldHM6IEFycmF5PFBhbGV0dGU+LCBwaWNrZXJDb21wb25lbnQ6IENvbG9yUGlja2VyQ29tcG9uZW50KSxcbiAgZmlsbEJhc2VQYWxsZXRzKClcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb2xvclBpY2tlckNvbXBvbmVudCB7XG4gIF9waWNrZXJDb25maWc6IFBpY2tlckNvbmZpZyxcbiAgY29sb3JJbml0OiBib29sZWFuLFxuICBwaWNrZXJPcGVuOiBib29sZWFuLFxuICBwaWNrZXJQYWxsZXRzOiBBcnJheTxQYWxldHRlPixcbiAgaHN2YTogSFNWQSxcbiAgY3VycmVudENvbG9yOiBzdHJpbmcsXG4gIGN1cnJlbnRDb2xvck1heDogc3RyaW5nLFxuICBjdXJyZW50Q29sb3JBbHBoYTogc3RyaW5nLFxuICBjdXJyZW50Q29sb3JBbHBoYVplcm86IHN0cmluZyxcbiAgdXVpZDogc3RyaW5nLFxuICBhbGxvd2VkRm9ybWF0czogQXJyYXk8c3RyaW5nPixcbiAgY29sb3JQaWNrZXJTZXJ2aWNlOiBDb2xvclBpY2tlclNlcnZpY2UsXG4gIG9wZW5QaWNrZXIoKTogdm9pZCxcbiAgY2xvc2VQaWNrZXIoKTogdm9pZCxcbiAgdmFsaWRhdGVJbnB1dFBhcmFtcygpOiB2b2lkLFxuICBpbnB1dENvbG9yQ2hhbmdlKGNvbG9yOiBzdHJpbmcpOiB2b2lkLFxuICB1cGRhdGVSZXR1cm5Db2xvcigpOiB2b2lkLFxuICBzZXRJbnB1dFZhbHVlKCk6IHZvaWQsXG4gIHNldERyYWdnZXJzVG9DdXJyZW50Q29sb3IoKTogdm9pZCxcblxufSJdfQ==