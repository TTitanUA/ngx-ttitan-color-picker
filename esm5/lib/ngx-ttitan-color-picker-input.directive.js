/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NgxTTitanColorPickerService } from "./ngx-ttitan-color-picker.service";
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
export { NgxTTitanColorPickerInputDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXR0aXRhbi1jb2xvci1waWNrZXItaW5wdXQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIvIiwic291cmNlcyI6WyJsaWIvbmd4LXR0aXRhbi1jb2xvci1waWNrZXItaW5wdXQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQWUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBRXpGLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLG1DQUFtQyxDQUFDOztJQW9CNUUsNENBQ1MsSUFDQTtRQURBLE9BQUUsR0FBRixFQUFFO1FBQ0YsdUJBQWtCLEdBQWxCLGtCQUFrQjtzQkFkTyxNQUFNOzJCQUMwQixJQUFJLFlBQVksRUFBVTtLQWN2Rjs7OztJQVhrQixrREFBSzs7O0lBQTVCO1FBQ0UsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0tBQ3RCOzs7O0lBQ3VCLG1EQUFNOzs7SUFBOUI7UUFDRSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7S0FDdEI7Ozs7O0lBU0QsMERBQWE7Ozs7SUFBYixVQUFjLEtBQWE7UUFDekIsbUJBQW1CLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztLQUN6RDs7OztJQUdELDBEQUFhOzs7SUFBYjtRQUNFLHFCQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsbUJBQW1CLENBQ25ELElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLEtBQUssRUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FDWixDQUFDO1FBRUYsRUFBRSxDQUFBLENBQUMsR0FBRyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDdEIsbUJBQW1CLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztZQUN0RCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM1QjtLQUVGOztnQkF4Q0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxnQ0FBZ0M7b0JBQzFDLFFBQVEsRUFBRSw4QkFBOEI7aUJBQ3pDOzs7O2dCQVJZLFVBQVU7Z0JBR2YsMkJBQTJCOzs7eUJBUWhDLEtBQUssU0FBQyxRQUFROzhCQUNkLE1BQU0sU0FBQyxhQUFhO3dCQUdwQixZQUFZLFNBQUMsT0FBTzt5QkFHcEIsWUFBWSxTQUFDLFFBQVE7OzZDQW5CeEI7O1NBVWEsa0NBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dCxcbiAgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Tmd4VFRpdGFuQ29sb3JQaWNrZXJTZXJ2aWNlfSBmcm9tIFwiLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci5zZXJ2aWNlXCI7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tsaWJOZ3hUVGl0YW5Db2xvclBpY2tlcklucHV0XScsXG4gIGV4cG9ydEFzOiAnbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJJbnB1dCdcbn0pXG5leHBvcnQgY2xhc3MgTmd4VFRpdGFuQ29sb3JQaWNrZXJJbnB1dERpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCdmb3JtYXQnKSBmb3JtYXQ6IHN0cmluZyA9ICdoZXg2JztcbiAgQE91dHB1dCgnaW5wdXRDaGFuZ2UnKSBwdWJsaWMgaW5wdXRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cblxuICBASG9zdExpc3RlbmVyKCdrZXl1cCcpIGtleVVwKCkge1xuICAgIHRoaXMuaW5wdXRWYWxpZGF0ZSgpO1xuICB9XG4gIEBIb3N0TGlzdGVuZXIoJ2NoYW5nZScpIGNoYW5nZSgpIHtcbiAgICB0aGlzLmlucHV0VmFsaWRhdGUoKTtcbiAgfVxuXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGVsOiBFbGVtZW50UmVmLFxuICAgIHB1YmxpYyBjb2xvclBpY2tlclNlcnZpY2U6IE5neFRUaXRhbkNvbG9yUGlja2VyU2VydmljZVxuICApIHsgfVxuXG5cbiAgc2V0SW5wdXRWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgKDxIVE1MSW5wdXRFbGVtZW50PnRoaXMuZWwubmF0aXZlRWxlbWVudCkudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG5cbiAgaW5wdXRWYWxpZGF0ZSgpIHtcbiAgICBsZXQgcmVzID0gdGhpcy5jb2xvclBpY2tlclNlcnZpY2UudmFsaWRhdGVDb2xvckZvcm1hdChcbiAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC52YWx1ZSxcbiAgICAgIHRoaXMuZm9ybWF0XG4gICAgKTtcblxuICAgIGlmKHJlcyAhPT0gJ25vdFZhbGlkJykge1xuICAgICAgKDxIVE1MSW5wdXRFbGVtZW50PnRoaXMuZWwubmF0aXZlRWxlbWVudCkudmFsdWUgPSByZXM7XG4gICAgICB0aGlzLmlucHV0Q2hhbmdlLmVtaXQocmVzKTtcbiAgICB9XG5cbiAgfVxuXG59XG4iXX0=