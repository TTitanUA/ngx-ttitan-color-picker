/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, Input } from '@angular/core';
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
export { NgxTTitanColorPickerDraggerDirective };
function NgxTTitanColorPickerDraggerDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    NgxTTitanColorPickerDraggerDirective.prototype.pickerPad;
    /** @type {?} */
    NgxTTitanColorPickerDraggerDirective.prototype.elRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXR0aXRhbi1jb2xvci1waWNrZXItZHJhZ2dlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1kcmFnZ2VyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQWUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDOztJQVN0RSw4Q0FBbUIsS0FBaUI7UUFBakIsVUFBSyxHQUFMLEtBQUssQ0FBWTt5QkFGVyxDQUFDO0tBRVA7Ozs7Ozs7SUFHbEMsMERBQVc7Ozs7OztjQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsU0FBaUI7UUFFeEQscUJBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFFNUQsRUFBRSxDQUFBLENBQUMsU0FBUyxJQUFJLFVBQVUsSUFBSSxTQUFTLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQ25GO1FBQ0QsRUFBRSxDQUFBLENBQUMsU0FBUyxJQUFJLFlBQVksSUFBSSxTQUFTLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQ25GOzs7Z0JBbkJKLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsa0NBQWtDO2lCQUM3Qzs7OztnQkFKa0IsVUFBVTs7OzRCQU8xQixLQUFLLFNBQUMsV0FBVzs7K0NBUHBCOztTQUthLG9DQUFvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyXSdcbn0pXG5leHBvcnQgY2xhc3MgTmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyRGlyZWN0aXZlIHtcblxuICBASW5wdXQoJ3BpY2tlclBhZCcpIHB1YmxpYyBwaWNrZXJQYWQ6IG51bWJlciA9IDA7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGVsUmVmOiBFbGVtZW50UmVmKSB7IH1cblxuXG4gIHB1YmxpYyBzZXRQb3NpdGlvbih4OiBudW1iZXIsIHk6IG51bWJlciwgZGlyZWN0aW9uOiBzdHJpbmcpOiB2b2lkIHtcblxuICAgIGxldCByZWN0ID0gdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgaWYoZGlyZWN0aW9uID09ICd2ZXJ0aWNhbCcgfHwgZGlyZWN0aW9uID09ICdib3RoJykge1xuICAgICAgdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50LnN0eWxlLnRvcCA9IE1hdGgucm91bmQoKHkgLSAoKHJlY3QuaGVpZ2h0KSAvIDIpKSkgKyAncHgnO1xuICAgIH1cbiAgICBpZihkaXJlY3Rpb24gPT0gJ2hvcml6b250YWwnIHx8IGRpcmVjdGlvbiA9PSAnYm90aCcpIHtcbiAgICAgIHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gTWF0aC5yb3VuZCgoeCAtICgocmVjdC53aWR0aCkgLyAyKSkpICsgJ3B4JztcbiAgICB9XG5cbiAgfVxuXG59XG4iXX0=