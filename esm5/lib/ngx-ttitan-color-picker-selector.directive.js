/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ContentChild, Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NgxTTitanColorPickerDraggerDirective } from "./ngx-ttitan-color-picker-dragger.directive";
import { fromEvent } from 'rxjs';
import { NgxTTitanColorPickerService } from "./ngx-ttitan-color-picker.service";
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
export { NgxTTitanColorPickerSelectorDirective };
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
    /** @type {?} */
    NgxTTitanColorPickerSelectorDirective.prototype.colorPickerService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXR0aXRhbi1jb2xvci1waWNrZXItc2VsZWN0b3IuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIvIiwic291cmNlcyI6WyJsaWIvbmd4LXR0aXRhbi1jb2xvci1waWNrZXItc2VsZWN0b3IuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsWUFBWSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFDbEcsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLG9DQUFvQyxFQUFDLE1BQU0sNkNBQTZDLENBQUM7QUFFakcsT0FBTyxFQUFDLFNBQVMsRUFBZSxNQUFNLE1BQU0sQ0FBQztBQUM3QyxPQUFPLEVBQUMsMkJBQTJCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF5QzVFLCtDQUNTLE9BQ0E7UUFEQSxVQUFLLEdBQUwsS0FBSztRQUNMLHVCQUFrQixHQUFsQixrQkFBa0I7eUJBdEJvQixNQUFNO3VCQUVzRCxJQUFJO3NCQUVoRCxJQUFJLFlBQVksRUFBaUI7a0JBRXZFLElBQUk7eUJBQ0QsS0FBSzsrQkFDTSxJQUFJOzZCQUNOLElBQUk7UUFldkMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0tBSWhIOzs7OztJQWhCNkMsMkRBQVc7Ozs7SUFBekQsVUFBMEQsTUFBTTtRQUM5RCxJ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U0FBUztZQUNwQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUs7U0FDakIsQ0FBQzs7O2dCQTdJTCxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG1DQUFtQztvQkFDN0MsUUFBUSxFQUFFLGlDQUFpQztpQkFDNUM7Ozs7Z0JBdkIwQixVQUFVO2dCQUs3QiwyQkFBMkI7Ozs0QkFxQmhDLEtBQUssU0FBQyxXQUFXOzBCQUVqQixZQUFZLFNBQUMsb0NBQW9DO3lCQUVqRCxNQUFNLFNBQUMsUUFBUTs4QkFTZixZQUFZLFNBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDOztnREF4Q3ZDOztTQXlCYSxxQ0FBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb250ZW50Q2hpbGQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ3hUVGl0YW5Db2xvclBpY2tlckRyYWdnZXJEaXJlY3RpdmV9IGZyb20gXCIuL25neC10dGl0YW4tY29sb3ItcGlja2VyLWRyYWdnZXIuZGlyZWN0aXZlXCI7XG4vLyBpbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgb2Z9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQge2Zyb21FdmVudCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7Tmd4VFRpdGFuQ29sb3JQaWNrZXJTZXJ2aWNlfSBmcm9tIFwiLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci5zZXJ2aWNlXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3VzdG9tUmVjdCB7XG4gIGhlaWdodDogbnVtYmVyLFxuICBsZWZ0OiBudW1iZXIsXG4gIHRvcDogbnVtYmVyLFxuICB3aWR0aDogbnVtYmVyXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3VzdG9tUGVyY2VudCB7XG4gIHg6IG51bWJlcixcbiAgeTogbnVtYmVyLFxufVxuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tsaWJOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yXScsXG4gIGV4cG9ydEFzOiAnbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3Rvcidcbn0pXG5leHBvcnQgY2xhc3MgTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0e1xuXG4gIEBJbnB1dCgnZGlyZWN0aW9uJykgcHVibGljIGRpcmVjdGlvbjogc3RyaW5nID0gJ2JvdGgnO1xuXG4gIEBDb250ZW50Q2hpbGQoTmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyRGlyZWN0aXZlKSBwdWJsaWMgZHJhZ2dlcjogTmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyRGlyZWN0aXZlID0gbnVsbDtcblxuICBAT3V0cHV0KCdjaGFuZ2UnKSBwdWJsaWMgY2hhbmdlOiBFdmVudEVtaXR0ZXI8Q3VzdG9tUGVyY2VudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEN1c3RvbVBlcmNlbnQ+KCk7XG5cbiAgcHVibGljIGVsOiBIVE1MRWxlbWVudCA9IG51bGw7XG4gIHB1YmxpYyBkcmFnU3RhcnQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIGdsb2JhbE1vdXNlTW92ZTogU3Vic2NyaXB0aW9uID0gbnVsbDtcbiAgcHVibGljIGdsb2JhbE1vdXNlVXA6IFN1YnNjcmlwdGlvbiA9IG51bGw7XG5cblxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicsIFsnJGV2ZW50J10pIHB1YmxpYyBvbk1vdXNlRG93bigkZXZlbnQpIHtcbiAgICB0aGlzLmRyYWdTdGFydCA9IHRydWU7XG4gICAgdGhpcy5nZXRQb3NpdGlvbigkZXZlbnQpO1xuICB9XG5cblxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBlbFJlZjogRWxlbWVudFJlZixcbiAgICBwdWJsaWMgY29sb3JQaWNrZXJTZXJ2aWNlOiBOZ3hUVGl0YW5Db2xvclBpY2tlclNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5lbCA9IHRoaXMuZWxSZWYubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLmRpcmVjdGlvbiA9IChbJ2JvdGgnLCAndmVydGljYWwnLCAnaG9yaXpvbnRhbCddLmluZGV4T2YodGhpcy5kaXJlY3Rpb24pID09PSAtMSkgPyAnYm90aCcgOiB0aGlzLmRpcmVjdGlvbjtcblxuXG5cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuXG5cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgdGhpcy5ldmVudHNVblN1YnNjaWJlKCk7XG4gIH1cblxuXG4gIGV2ZW50c1N1YnNjaWJlKCkge1xuICAgIHRoaXMuZ2xvYmFsTW91c2VNb3ZlID0gZnJvbUV2ZW50KHdpbmRvdywgJ21vdXNlbW92ZScpLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgIGlmKHRoaXMuZHJhZ1N0YXJ0KSB7XG4gICAgICAgIHRoaXMuZ2V0UG9zaXRpb24oPE1vdXNlRXZlbnQ+ZXZlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuZ2xvYmFsTW91c2VVcCA9IGZyb21FdmVudCh3aW5kb3csICdtb3VzZXVwJykuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgaWYodGhpcy5kcmFnU3RhcnQpIHtcbiAgICAgICAgdGhpcy5kcmFnU3RhcnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5nZXRQb3NpdGlvbig8TW91c2VFdmVudD5ldmVudCk7XG4gICAgICB9XG4gICAgfSk7XG5cblxuICAgIC8vIHRoaXMuZ2xvYmFsTW91c2VNb3ZlID0gdGhpcy5jb2xvclBpY2tlclNlcnZpY2UubW91c2VNb3ZlT2JzZXJ2YWJsZS5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgLy8gICBpZih0aGlzLmRyYWdTdGFydCkge1xuICAgIC8vICAgICB0aGlzLmdldFBvc2l0aW9uKDxNb3VzZUV2ZW50PmV2ZW50KTtcbiAgICAvLyAgIH1cbiAgICAvLyB9KTtcbiAgICAvLyB0aGlzLmdsb2JhbE1vdXNlVXAgPSB0aGlzLmNvbG9yUGlja2VyU2VydmljZS5tb3VzZVVwT2JzZXJ2YWJsZS5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgLy8gICBpZih0aGlzLmRyYWdTdGFydCkge1xuICAgIC8vICAgICB0aGlzLmRyYWdTdGFydCA9IGZhbHNlO1xuICAgIC8vICAgICB0aGlzLmdldFBvc2l0aW9uKDxNb3VzZUV2ZW50PmV2ZW50KTtcbiAgICAvLyAgIH1cbiAgICAvLyB9KTtcbiAgfVxuICBldmVudHNVblN1YnNjaWJlKCkge1xuICAgIGlmKHRoaXMuZ2xvYmFsTW91c2VNb3ZlICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmdsb2JhbE1vdXNlTW92ZS51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZih0aGlzLmdsb2JhbE1vdXNlVXAgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuZ2xvYmFsTW91c2VVcC51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXREcmFnZ2VyKHBlcnNlbnQ6IEN1c3RvbVBlcmNlbnQpIHtcbiAgICBpZih0aGlzLmRyYWdnZXIgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHBvc2l0aW9uOiBDdXN0b21SZWN0ID0gdGhpcy5nZXRSZWN0KHRoaXMuZWwpO1xuICAgIGxldCB4ID0gTWF0aC5yb3VuZCgoKHBvc2l0aW9uLndpZHRoIC0gdGhpcy5kcmFnZ2VyLnBpY2tlclBhZCAqIDIpICogcGVyc2VudC54IC8gMTAwKSk7XG4gICAgbGV0IHkgPSBNYXRoLnJvdW5kKCgocG9zaXRpb24uaGVpZ2h0IC0gdGhpcy5kcmFnZ2VyLnBpY2tlclBhZCAqIDIpICogcGVyc2VudC55IC8gMTAwKSk7XG4gICAgdGhpcy5kcmFnZ2VyLnNldFBvc2l0aW9uKFxuICAgICAgKHggPiB0aGlzLmRyYWdnZXIucGlja2VyUGFkKSA/IHggOiB0aGlzLmRyYWdnZXIucGlja2VyUGFkLFxuICAgICAgKHkgPiB0aGlzLmRyYWdnZXIucGlja2VyUGFkKSA/IHkgOiB0aGlzLmRyYWdnZXIucGlja2VyUGFkLFxuICAgICAgdGhpcy5kaXJlY3Rpb25cbiAgICApO1xuXG4gIH1cblxuICBwdWJsaWMgZ2V0UG9zaXRpb24oJGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgbGV0IGN1cnNvclkgPSAkZXZlbnQucGFnZVk7XG4gICAgbGV0IGN1cnNvclggPSAkZXZlbnQucGFnZVg7XG4gICAgbGV0IHBvc2l0aW9uOiBDdXN0b21SZWN0ID0gdGhpcy5nZXRSZWN0KHRoaXMuZWwpO1xuICAgIGxldCBwZXJjZW50OiBDdXN0b21QZXJjZW50ID0ge3g6IDAsIHk6IDB9O1xuICAgIGlmKHRoaXMuZGlyZWN0aW9uID09ICd2ZXJ0aWNhbCcgfHwgdGhpcy5kaXJlY3Rpb24gPT0gJ2JvdGgnKSB7XG4gICAgICBwZXJjZW50LnkgPSBNYXRoLnJvdW5kKChjdXJzb3JZIC0gKHBvc2l0aW9uLnRvcCkpICogMTAwIC8gKHBvc2l0aW9uLmhlaWdodCAtIHRoaXMuZHJhZ2dlci5waWNrZXJQYWQgKiAyKSk7XG4gICAgICBpZihwZXJjZW50LnkgPCAwKSB7XG4gICAgICAgIHBlcmNlbnQueSA9IDBcbiAgICAgIH0gZWxzZSBpZihwZXJjZW50LnkgPiAxMDApIHtcbiAgICAgICAgcGVyY2VudC55ID0gMTAwO1xuICAgICAgfVxuICAgIH1cbiAgICBpZih0aGlzLmRpcmVjdGlvbiA9PSAnaG9yaXpvbnRhbCcgfHwgdGhpcy5kaXJlY3Rpb24gPT0gJ2JvdGgnKSB7XG4gICAgICBwZXJjZW50LnggPSBNYXRoLnJvdW5kKChjdXJzb3JYIC0gKHBvc2l0aW9uLmxlZnQpKSAqIDEwMCAvIChwb3NpdGlvbi53aWR0aCAtIHRoaXMuZHJhZ2dlci5waWNrZXJQYWQgKiAyKSk7XG4gICAgICBpZihwZXJjZW50LnggPCAwKSB7XG4gICAgICAgIHBlcmNlbnQueCA9IDBcbiAgICAgIH0gZWxzZSBpZihwZXJjZW50LnggPiAxMDApIHtcbiAgICAgICAgcGVyY2VudC54ID0gMTAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2V0RHJhZ2dlcihwZXJjZW50KTtcbiAgICB0aGlzLmNoYW5nZS5lbWl0KHBlcmNlbnQpO1xuXG4gIH1cblxuXG5cbiAgcHVibGljIGdldFJlY3QoZWxlbTogSFRNTEVsZW1lbnQpOiBDdXN0b21SZWN0IHtcblxuICAgIGxldCBib3ggPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGxldCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICBsZXQgZG9jRWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgbGV0IHNjcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2NFbC5zY3JvbGxUb3AgfHwgYm9keS5zY3JvbGxUb3A7XG4gICAgbGV0IHNjcm9sbExlZnQgPSB3aW5kb3cucGFnZVhPZmZzZXQgfHwgZG9jRWwuc2Nyb2xsTGVmdCB8fCBib2R5LnNjcm9sbExlZnQ7XG4gICAgbGV0IGNsaWVudFRvcCA9IGRvY0VsLmNsaWVudFRvcCB8fCBib2R5LmNsaWVudFRvcCB8fCAwO1xuICAgIGxldCBjbGllbnRMZWZ0ID0gZG9jRWwuY2xpZW50TGVmdCB8fCBib2R5LmNsaWVudExlZnQgfHwgMDtcblxuICAgIHJldHVybiB7XG4gICAgICBoZWlnaHQ6IGJveC5oZWlnaHQsXG4gICAgICBsZWZ0OiBib3gubGVmdCArIHNjcm9sbExlZnQgLSBjbGllbnRMZWZ0LFxuICAgICAgdG9wOiBib3gudG9wICsgc2Nyb2xsVG9wIC0gY2xpZW50VG9wLFxuICAgICAgd2lkdGg6IGJveC53aWR0aCxcbiAgICB9O1xuICB9XG5cblxuXG59XG4iXX0=