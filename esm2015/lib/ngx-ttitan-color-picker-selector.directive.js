/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ContentChild, Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NgxTTitanColorPickerDraggerDirective } from "./ngx-ttitan-color-picker-dragger.directive";
import { fromEvent } from 'rxjs';
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
export class NgxTTitanColorPickerSelectorDirective {
    /**
     * @param {?} elRef
     */
    constructor(elRef) {
        this.elRef = elRef;
        this.direction = 'both';
        this.dragger = null;
        this.change = new EventEmitter();
        this.el = null;
        this.dragStart = false;
        this.globalMouseMove = null;
        this.globalMouseUp = null;
        this.el = this.elRef.nativeElement;
        this.direction = (['both', 'vertical', 'horizontal'].indexOf(this.direction) === -1) ? 'both' : this.direction;
        this.globalMouseMove = fromEvent(window, 'mousemove').subscribe((event) => {
            if (this.dragStart) {
                this.getPosition(/** @type {?} */ (event));
            }
        });
        this.globalMouseUp = fromEvent(window, 'mouseup').subscribe((event) => {
            if (this.dragStart) {
                this.dragStart = false;
                this.getPosition(/** @type {?} */ (event));
            }
        });
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
    ngOnDestroy() {
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
    { type: ElementRef }
];
NgxTTitanColorPickerSelectorDirective.propDecorators = {
    direction: [{ type: Input, args: ['direction',] }],
    dragger: [{ type: ContentChild, args: [NgxTTitanColorPickerDraggerDirective,] }],
    change: [{ type: Output, args: ['change',] }],
    onMouseDown: [{ type: HostListener, args: ['mousedown', ['$event'],] }]
};
function NgxTTitanColorPickerSelectorDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    NgxTTitanColorPickerSelectorDirective.prototype.direction;
    /** @type {?} */
    NgxTTitanColorPickerSelectorDirective.prototype.dragger;
    /** @type {?} */
    NgxTTitanColorPickerSelectorDirective.prototype.change;
    /** @type {?} */
    NgxTTitanColorPickerSelectorDirective.prototype.el;
    /** @type {?} */
    NgxTTitanColorPickerSelectorDirective.prototype.dragStart;
    /** @type {?} */
    NgxTTitanColorPickerSelectorDirective.prototype.globalMouseMove;
    /** @type {?} */
    NgxTTitanColorPickerSelectorDirective.prototype.globalMouseUp;
    /** @type {?} */
    NgxTTitanColorPickerSelectorDirective.prototype.elRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXR0aXRhbi1jb2xvci1waWNrZXItc2VsZWN0b3IuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIvIiwic291cmNlcyI6WyJsaWIvbmd4LXR0aXRhbi1jb2xvci1waWNrZXItc2VsZWN0b3IuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsWUFBWSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUMxRixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsb0NBQW9DLEVBQUMsTUFBTSw2Q0FBNkMsQ0FBQztBQUVqRyxPQUFPLEVBQUMsU0FBUyxFQUFlLE1BQU0sTUFBTSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbUI3QyxNQUFNOzs7O0lBcUJKLFlBQW1CLEtBQWlCO1FBQWpCLFVBQUssR0FBTCxLQUFLLENBQVk7eUJBbkJXLE1BQU07dUJBRXNELElBQUk7c0JBRWhELElBQUksWUFBWSxFQUFpQjtrQkFFdkUsSUFBSTt5QkFDRCxLQUFLOytCQUNNLElBQUk7NkJBQ04sSUFBSTtRQVd2QyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDL0csSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3hFLEVBQUUs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LFFBQVE7MEJBUWYsWUFBWSxTQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbnRlbnRDaGlsZCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ3hUVGl0YW5Db2xvclBpY2tlckRyYWdnZXJEaXJlY3RpdmV9IGZyb20gXCIuL25neC10dGl0YW4tY29sb3ItcGlja2VyLWRyYWdnZXIuZGlyZWN0aXZlXCI7XG4vLyBpbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgb2Z9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge2Zyb21FdmVudCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGludGVyZmFjZSBDdXN0b21SZWN0IHtcbiAgaGVpZ2h0OiBudW1iZXIsXG4gIGxlZnQ6IG51bWJlcixcbiAgdG9wOiBudW1iZXIsXG4gIHdpZHRoOiBudW1iZXJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDdXN0b21QZXJjZW50IHtcbiAgeDogbnVtYmVyLFxuICB5OiBudW1iZXIsXG59XG5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2xpYk5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JdJyxcbiAgZXhwb3J0QXM6ICdsaWJOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yJ1xufSlcbmV4cG9ydCBjbGFzcyBOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95e1xuXG4gIEBJbnB1dCgnZGlyZWN0aW9uJykgcHVibGljIGRpcmVjdGlvbjogc3RyaW5nID0gJ2JvdGgnO1xuXG4gIEBDb250ZW50Q2hpbGQoTmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyRGlyZWN0aXZlKSBwdWJsaWMgZHJhZ2dlcjogTmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyRGlyZWN0aXZlID0gbnVsbDtcblxuICBAT3V0cHV0KCdjaGFuZ2UnKSBwdWJsaWMgY2hhbmdlOiBFdmVudEVtaXR0ZXI8Q3VzdG9tUGVyY2VudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEN1c3RvbVBlcmNlbnQ+KCk7XG5cbiAgcHVibGljIGVsOiBIVE1MRWxlbWVudCA9IG51bGw7XG4gIHB1YmxpYyBkcmFnU3RhcnQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGdsb2JhbE1vdXNlTW92ZTogU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgcHVibGljIGdsb2JhbE1vdXNlVXA6IFN1YnNjcmlwdGlvbiA9IG51bGw7XG5cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWRvd24nLCBbJyRldmVudCddKSBwdWJsaWMgb25Nb3VzZURvd24oJGV2ZW50KSB7XG4gICAgdGhpcy5kcmFnU3RhcnQgPSB0cnVlO1xuICAgIHRoaXMuZ2V0UG9zaXRpb24oJGV2ZW50KTtcbiAgfVxuXG5cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWxSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICB0aGlzLmVsID0gdGhpcy5lbFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIHRoaXMuZGlyZWN0aW9uID0gKFsnYm90aCcsICd2ZXJ0aWNhbCcsICdob3Jpem9udGFsJ10uaW5kZXhPZih0aGlzLmRpcmVjdGlvbikgPT09IC0xKSA/ICdib3RoJyA6IHRoaXMuZGlyZWN0aW9uO1xuICAgIHRoaXMuZ2xvYmFsTW91c2VNb3ZlID0gZnJvbUV2ZW50KHdpbmRvdywgJ21vdXNlbW92ZScpLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgIGlmKHRoaXMuZHJhZ1N0YXJ0KSB7XG4gICAgICAgIHRoaXMuZ2V0UG9zaXRpb24oPE1vdXNlRXZlbnQ+ZXZlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuZ2xvYmFsTW91c2VVcCA9IGZyb21FdmVudCh3aW5kb3csICdtb3VzZXVwJykuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgaWYodGhpcy5kcmFnU3RhcnQpIHtcbiAgICAgICAgdGhpcy5kcmFnU3RhcnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5nZXRQb3NpdGlvbig8TW91c2VFdmVudD5ldmVudCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmKHRoaXMuZ2xvYmFsTW91c2VNb3ZlICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmdsb2JhbE1vdXNlTW92ZS51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZih0aGlzLmdsb2JhbE1vdXNlVXAgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuZ2xvYmFsTW91c2VVcC51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXREcmFnZ2VyKHBlcnNlbnQ6IEN1c3RvbVBlcmNlbnQpIHtcbiAgICBpZih0aGlzLmRyYWdnZXIgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHBvc2l0aW9uOiBDdXN0b21SZWN0ID0gdGhpcy5nZXRSZWN0KHRoaXMuZWwpO1xuICAgIGxldCB4ID0gTWF0aC5yb3VuZCgoKHBvc2l0aW9uLndpZHRoIC0gdGhpcy5kcmFnZ2VyLnBpY2tlclBhZCAqIDIpICogcGVyc2VudC54IC8gMTAwKSk7XG4gICAgbGV0IHkgPSBNYXRoLnJvdW5kKCgocG9zaXRpb24uaGVpZ2h0IC0gdGhpcy5kcmFnZ2VyLnBpY2tlclBhZCAqIDIpICogcGVyc2VudC55IC8gMTAwKSk7XG4gICAgdGhpcy5kcmFnZ2VyLnNldFBvc2l0aW9uKFxuICAgICAgKHggPiB0aGlzLmRyYWdnZXIucGlja2VyUGFkKSA/IHggOiB0aGlzLmRyYWdnZXIucGlja2VyUGFkLFxuICAgICAgKHkgPiB0aGlzLmRyYWdnZXIucGlja2VyUGFkKSA/IHkgOiB0aGlzLmRyYWdnZXIucGlja2VyUGFkLFxuICAgICAgdGhpcy5kaXJlY3Rpb25cbiAgICApO1xuXG4gIH1cblxuICBwdWJsaWMgZ2V0UG9zaXRpb24oJGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgbGV0IGN1cnNvclkgPSAkZXZlbnQucGFnZVk7XG4gICAgbGV0IGN1cnNvclggPSAkZXZlbnQucGFnZVg7XG4gICAgbGV0IHBvc2l0aW9uOiBDdXN0b21SZWN0ID0gdGhpcy5nZXRSZWN0KHRoaXMuZWwpO1xuICAgIGxldCBwZXJjZW50OiBDdXN0b21QZXJjZW50ID0ge3g6IDAsIHk6IDB9O1xuICAgIGlmKHRoaXMuZGlyZWN0aW9uID09ICd2ZXJ0aWNhbCcgfHwgdGhpcy5kaXJlY3Rpb24gPT0gJ2JvdGgnKSB7XG4gICAgICBwZXJjZW50LnkgPSBNYXRoLnJvdW5kKChjdXJzb3JZIC0gKHBvc2l0aW9uLnRvcCkpICogMTAwIC8gKHBvc2l0aW9uLmhlaWdodCAtIHRoaXMuZHJhZ2dlci5waWNrZXJQYWQgKiAyKSk7XG4gICAgICBpZihwZXJjZW50LnkgPCAwKSB7XG4gICAgICAgIHBlcmNlbnQueSA9IDBcbiAgICAgIH0gZWxzZSBpZihwZXJjZW50LnkgPiAxMDApIHtcbiAgICAgICAgcGVyY2VudC55ID0gMTAwO1xuICAgICAgfVxuICAgIH1cbiAgICBpZih0aGlzLmRpcmVjdGlvbiA9PSAnaG9yaXpvbnRhbCcgfHwgdGhpcy5kaXJlY3Rpb24gPT0gJ2JvdGgnKSB7XG4gICAgICBwZXJjZW50LnggPSBNYXRoLnJvdW5kKChjdXJzb3JYIC0gKHBvc2l0aW9uLmxlZnQpKSAqIDEwMCAvIChwb3NpdGlvbi53aWR0aCAtIHRoaXMuZHJhZ2dlci5waWNrZXJQYWQgKiAyKSk7XG4gICAgICBpZihwZXJjZW50LnggPCAwKSB7XG4gICAgICAgIHBlcmNlbnQueCA9IDBcbiAgICAgIH0gZWxzZSBpZihwZXJjZW50LnggPiAxMDApIHtcbiAgICAgICAgcGVyY2VudC54ID0gMTAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2V0RHJhZ2dlcihwZXJjZW50KTtcbiAgICB0aGlzLmNoYW5nZS5lbWl0KHBlcmNlbnQpO1xuXG4gIH1cblxuXG5cbiAgcHVibGljIGdldFJlY3QoZWxlbTogSFRNTEVsZW1lbnQpOiBDdXN0b21SZWN0IHtcblxuICAgIGxldCBib3ggPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICBsZXQgZG9jRWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgbGV0IHNjcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2NFbC5zY3JvbGxUb3AgfHwgYm9keS5zY3JvbGxUb3A7XG4gICAgbGV0IHNjcm9sbExlZnQgPSB3aW5kb3cucGFnZVhPZmZzZXQgfHwgZG9jRWwuc2Nyb2xsTGVmdCB8fCBib2R5LnNjcm9sbExlZnQ7XG4gICAgbGV0IGNsaWVudFRvcCA9IGRvY0VsLmNsaWVudFRvcCB8fCBib2R5LmNsaWVudFRvcCB8fCAwO1xuICAgIGxldCBjbGllbnRMZWZ0ID0gZG9jRWwuY2xpZW50TGVmdCB8fCBib2R5LmNsaWVudExlZnQgfHwgMDtcblxuICAgIHJldHVybiB7XG4gICAgICBoZWlnaHQ6IGJveC5oZWlnaHQsXG4gICAgICBsZWZ0OiBib3gubGVmdCArIHNjcm9sbExlZnQgLSBjbGllbnRMZWZ0LFxuICAgICAgdG9wOiBib3gudG9wICsgc2Nyb2xsVG9wIC0gY2xpZW50VG9wLFxuICAgICAgd2lkdGg6IGJveC53aWR0aCxcbiAgICB9O1xuICB9XG5cblxuXG59XG4iXX0=