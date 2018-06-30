/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NgxTTitanColorPickerService } from "./ngx-ttitan-color-picker.service";
export class NgxTTitanColorPickerInputDirective {
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
function NgxTTitanColorPickerInputDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    NgxTTitanColorPickerInputDirective.prototype.format;
    /** @type {?} */
    NgxTTitanColorPickerInputDirective.prototype.inputChange;
    /** @type {?} */
    NgxTTitanColorPickerInputDirective.prototype.el;
    /** @type {?} */
    NgxTTitanColorPickerInputDirective.prototype.colorPickerService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXR0aXRhbi1jb2xvci1waWNrZXItaW5wdXQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIvIiwic291cmNlcyI6WyJsaWIvbmd4LXR0aXRhbi1jb2xvci1waWNrZXItaW5wdXQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQWUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBRXpGLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBTTlFLE1BQU07Ozs7O0lBY0osWUFDUyxJQUNBO1FBREEsT0FBRSxHQUFGLEVBQUU7UUFDRix1QkFBa0IsR0FBbEIsa0JBQWtCO3NCQWRPLE1BQU07MkJBQzBCLElBQUksWUFBWSxFQUFVO0tBY3ZGOzs7O0lBWGtCLEtBQUs7UUFDMUIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0tBQ3RCOzs7O0lBQ3VCLE1BQU07UUFDNUIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0tBQ3RCOzs7OztJQVNELGFBQWEsQ0FBQyxLQUFhO1FBQ3pCLG1CQUFtQixJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBQyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7S0FDekQ7Ozs7SUFHRCxhQUFhO1FBQ1gscUJBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxtQkFBbUIsQ0FDbkQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUMzQixJQUFJLENBQUMsTUFBTSxDQUNaLENBQUM7UUFFRixFQUFFLENBQUEsQ0FBQyxHQUFHLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUN0QixtQkFBbUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1lBQ3RELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzVCO0tBRUY7OztZQXhDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdDQUFnQztnQkFDMUMsUUFBUSxFQUFFLDhCQUE4QjthQUN6Qzs7OztZQVJZLFVBQVU7WUFHZiwyQkFBMkI7OztxQkFRaEMsS0FBSyxTQUFDLFFBQVE7MEJBQ2QsTUFBTSxTQUFDLGFBQWE7b0JBR3BCLFlBQVksU0FBQyxPQUFPO3FCQUdwQixZQUFZLFNBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXQsXG4gIFNpbXBsZUNoYW5nZXNcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05neFRUaXRhbkNvbG9yUGlja2VyU2VydmljZX0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuc2VydmljZVwiO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJJbnB1dF0nLFxuICBleHBvcnRBczogJ2xpYk5neFRUaXRhbkNvbG9yUGlja2VySW5wdXQnXG59KVxuZXhwb3J0IGNsYXNzIE5neFRUaXRhbkNvbG9yUGlja2VySW5wdXREaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgnZm9ybWF0JykgZm9ybWF0OiBzdHJpbmcgPSAnaGV4Nic7XG4gIEBPdXRwdXQoJ2lucHV0Q2hhbmdlJykgcHVibGljIGlucHV0Q2hhbmdlOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5dXAnKSBrZXlVcCgpIHtcbiAgICB0aGlzLmlucHV0VmFsaWRhdGUoKTtcbiAgfVxuICBASG9zdExpc3RlbmVyKCdjaGFuZ2UnKSBjaGFuZ2UoKSB7XG4gICAgdGhpcy5pbnB1dFZhbGlkYXRlKCk7XG4gIH1cblxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBlbDogRWxlbWVudFJlZixcbiAgICBwdWJsaWMgY29sb3JQaWNrZXJTZXJ2aWNlOiBOZ3hUVGl0YW5Db2xvclBpY2tlclNlcnZpY2VcbiAgKSB7IH1cblxuXG4gIHNldElucHV0VmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgICg8SFRNTElucHV0RWxlbWVudD50aGlzLmVsLm5hdGl2ZUVsZW1lbnQpLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuXG4gIGlucHV0VmFsaWRhdGUoKSB7XG4gICAgbGV0IHJlcyA9IHRoaXMuY29sb3JQaWNrZXJTZXJ2aWNlLnZhbGlkYXRlQ29sb3JGb3JtYXQoXG4gICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudmFsdWUsXG4gICAgICB0aGlzLmZvcm1hdFxuICAgICk7XG5cbiAgICBpZihyZXMgIT09ICdub3RWYWxpZCcpIHtcbiAgICAgICg8SFRNTElucHV0RWxlbWVudD50aGlzLmVsLm5hdGl2ZUVsZW1lbnQpLnZhbHVlID0gcmVzO1xuICAgICAgdGhpcy5pbnB1dENoYW5nZS5lbWl0KHJlcyk7XG4gICAgfVxuXG4gIH1cblxufVxuIl19