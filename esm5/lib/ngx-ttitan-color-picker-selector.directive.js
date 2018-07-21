/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ContentChild, Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NgxTTitanColorPickerDraggerDirective } from "./ngx-ttitan-color-picker-dragger.directive";
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXR0aXRhbi1jb2xvci1waWNrZXItc2VsZWN0b3IuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIvIiwic291cmNlcyI6WyJsaWIvbmd4LXR0aXRhbi1jb2xvci1waWNrZXItc2VsZWN0b3IuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsWUFBWSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQXFCLE1BQU0sRUFDbEcsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLG9DQUFvQyxFQUFDLE1BQU0sNkNBQTZDLENBQUM7QUFHakcsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBeUM1RSwrQ0FDUyxPQUNBO1FBREEsVUFBSyxHQUFMLEtBQUs7UUFDTCx1QkFBa0IsR0FBbEIsa0JBQWtCO3lCQXRCb0IsTUFBTTt1QkFFc0QsSUFBSTtzQkFFaEQsSUFBSSxZQUFZLEVBQWlCO2tCQUV2RSxJQUFJO3lCQUNELEtBQUs7K0JBQ00sSUFBSTs2QkFDTixJQUFJO1FBZXZDLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztLQUloSDs7Ozs7SUFoQjZDLDJEQUFXOzs7O0lBQXpELFVBQTBELE1BQU07UUFDOUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxD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QUM7OztnQkE3SUwsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxtQ0FBbUM7b0JBQzdDLFFBQVEsRUFBRSxpQ0FBaUM7aUJBQzVDOzs7O2dCQXZCMEIsVUFBVTtnQkFLN0IsMkJBQTJCOzs7NEJBcUJoQyxLQUFLLFNBQUMsV0FBVzswQkFFakIsWUFBWSxTQUFDLG9DQUFvQzt5QkFFakQsTUFBTSxTQUFDLFFBQVE7OEJBU2YsWUFBWSxTQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7Z0RBeEN2Qzs7U0F5QmEscUNBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29udGVudENoaWxkLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Tmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyRGlyZWN0aXZlfSBmcm9tIFwiLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1kcmFnZ2VyLmRpcmVjdGl2ZVwiO1xuLy8gaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24sIG9mfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHtmcm9tRXZlbnQsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge05neFRUaXRhbkNvbG9yUGlja2VyU2VydmljZX0gZnJvbSBcIi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuc2VydmljZVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEN1c3RvbVJlY3Qge1xuICBoZWlnaHQ6IG51bWJlcixcbiAgbGVmdDogbnVtYmVyLFxuICB0b3A6IG51bWJlcixcbiAgd2lkdGg6IG51bWJlclxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEN1c3RvbVBlcmNlbnQge1xuICB4OiBudW1iZXIsXG4gIHk6IG51bWJlcixcbn1cblxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3Rvcl0nLFxuICBleHBvcnRBczogJ2xpYk5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3InXG59KVxuZXhwb3J0IGNsYXNzIE5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdHtcblxuICBASW5wdXQoJ2RpcmVjdGlvbicpIHB1YmxpYyBkaXJlY3Rpb246IHN0cmluZyA9ICdib3RoJztcblxuICBAQ29udGVudENoaWxkKE5neFRUaXRhbkNvbG9yUGlja2VyRHJhZ2dlckRpcmVjdGl2ZSkgcHVibGljIGRyYWdnZXI6IE5neFRUaXRhbkNvbG9yUGlja2VyRHJhZ2dlckRpcmVjdGl2ZSA9IG51bGw7XG5cbiAgQE91dHB1dCgnY2hhbmdlJykgcHVibGljIGNoYW5nZTogRXZlbnRFbWl0dGVyPEN1c3RvbVBlcmNlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxDdXN0b21QZXJjZW50PigpO1xuXG4gIHB1YmxpYyBlbDogSFRNTEVsZW1lbnQgPSBudWxsO1xuICBwdWJsaWMgZHJhZ1N0YXJ0OiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBnbG9iYWxNb3VzZU1vdmU6IFN1YnNjcmlwdGlvbiA9IG51bGw7XG4gIHB1YmxpYyBnbG9iYWxNb3VzZVVwOiBTdWJzY3JpcHRpb24gPSBudWxsO1xuXG5cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWRvd24nLCBbJyRldmVudCddKSBwdWJsaWMgb25Nb3VzZURvd24oJGV2ZW50KSB7XG4gICAgdGhpcy5kcmFnU3RhcnQgPSB0cnVlO1xuICAgIHRoaXMuZ2V0UG9zaXRpb24oJGV2ZW50KTtcbiAgfVxuXG5cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZWxSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHVibGljIGNvbG9yUGlja2VyU2VydmljZTogTmd4VFRpdGFuQ29sb3JQaWNrZXJTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuZWwgPSB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSAoWydib3RoJywgJ3ZlcnRpY2FsJywgJ2hvcml6b250YWwnXS5pbmRleE9mKHRoaXMuZGlyZWN0aW9uKSA9PT0gLTEpID8gJ2JvdGgnIDogdGhpcy5kaXJlY3Rpb247XG5cblxuXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcblxuXG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgIHRoaXMuZXZlbnRzVW5TdWJzY2liZSgpO1xuICB9XG5cblxuICBldmVudHNTdWJzY2liZSgpIHtcbiAgICAvLyB0aGlzLmdsb2JhbE1vdXNlTW92ZSA9IGZyb21FdmVudCh3aW5kb3csICdtb3VzZW1vdmUnKS5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgLy8gICBpZih0aGlzLmRyYWdTdGFydCkge1xuICAgIC8vICAgICB0aGlzLmdldFBvc2l0aW9uKDxNb3VzZUV2ZW50PmV2ZW50KTtcbiAgICAvLyAgIH1cbiAgICAvLyB9KTtcbiAgICAvLyB0aGlzLmdsb2JhbE1vdXNlVXAgPSBmcm9tRXZlbnQod2luZG93LCAnbW91c2V1cCcpLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAvLyAgIGlmKHRoaXMuZHJhZ1N0YXJ0KSB7XG4gICAgLy8gICAgIHRoaXMuZHJhZ1N0YXJ0ID0gZmFsc2U7XG4gICAgLy8gICAgIHRoaXMuZ2V0UG9zaXRpb24oPE1vdXNlRXZlbnQ+ZXZlbnQpO1xuICAgIC8vICAgfVxuICAgIC8vIH0pO1xuXG5cbiAgICB0aGlzLmdsb2JhbE1vdXNlTW92ZSA9IHRoaXMuY29sb3JQaWNrZXJTZXJ2aWNlLm1vdXNlTW92ZU9ic2VydmFibGUuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgaWYodGhpcy5kcmFnU3RhcnQpIHtcbiAgICAgICAgdGhpcy5nZXRQb3NpdGlvbig8TW91c2VFdmVudD5ldmVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5nbG9iYWxNb3VzZVVwID0gdGhpcy5jb2xvclBpY2tlclNlcnZpY2UubW91c2VVcE9ic2VydmFibGUuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgaWYodGhpcy5kcmFnU3RhcnQpIHtcbiAgICAgICAgdGhpcy5kcmFnU3RhcnQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5nZXRQb3NpdGlvbig8TW91c2VFdmVudD5ldmVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgZXZlbnRzVW5TdWJzY2liZSgpIHtcbiAgICBpZih0aGlzLmdsb2JhbE1vdXNlTW92ZSAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5nbG9iYWxNb3VzZU1vdmUudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYodGhpcy5nbG9iYWxNb3VzZVVwICE9PSBudWxsKSB7XG4gICAgICB0aGlzLmdsb2JhbE1vdXNlVXAudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0RHJhZ2dlcihwZXJzZW50OiBDdXN0b21QZXJjZW50KSB7XG4gICAgaWYodGhpcy5kcmFnZ2VyID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBwb3NpdGlvbjogQ3VzdG9tUmVjdCA9IHRoaXMuZ2V0UmVjdCh0aGlzLmVsKTtcbiAgICBsZXQgeCA9IE1hdGgucm91bmQoKChwb3NpdGlvbi53aWR0aCAtIHRoaXMuZHJhZ2dlci5waWNrZXJQYWQgKiAyKSAqIHBlcnNlbnQueCAvIDEwMCkpO1xuICAgIGxldCB5ID0gTWF0aC5yb3VuZCgoKHBvc2l0aW9uLmhlaWdodCAtIHRoaXMuZHJhZ2dlci5waWNrZXJQYWQgKiAyKSAqIHBlcnNlbnQueSAvIDEwMCkpO1xuICAgIHRoaXMuZHJhZ2dlci5zZXRQb3NpdGlvbihcbiAgICAgICh4ID4gdGhpcy5kcmFnZ2VyLnBpY2tlclBhZCkgPyB4IDogdGhpcy5kcmFnZ2VyLnBpY2tlclBhZCxcbiAgICAgICh5ID4gdGhpcy5kcmFnZ2VyLnBpY2tlclBhZCkgPyB5IDogdGhpcy5kcmFnZ2VyLnBpY2tlclBhZCxcbiAgICAgIHRoaXMuZGlyZWN0aW9uXG4gICAgKTtcblxuICB9XG5cbiAgcHVibGljIGdldFBvc2l0aW9uKCRldmVudDogTW91c2VFdmVudCkge1xuICAgIGxldCBjdXJzb3JZID0gJGV2ZW50LnBhZ2VZO1xuICAgIGxldCBjdXJzb3JYID0gJGV2ZW50LnBhZ2VYO1xuICAgIGxldCBwb3NpdGlvbjogQ3VzdG9tUmVjdCA9IHRoaXMuZ2V0UmVjdCh0aGlzLmVsKTtcbiAgICBsZXQgcGVyY2VudDogQ3VzdG9tUGVyY2VudCA9IHt4OiAwLCB5OiAwfTtcbiAgICBpZih0aGlzLmRpcmVjdGlvbiA9PSAndmVydGljYWwnIHx8IHRoaXMuZGlyZWN0aW9uID09ICdib3RoJykge1xuICAgICAgcGVyY2VudC55ID0gTWF0aC5yb3VuZCgoY3Vyc29yWSAtIChwb3NpdGlvbi50b3ApKSAqIDEwMCAvIChwb3NpdGlvbi5oZWlnaHQgLSB0aGlzLmRyYWdnZXIucGlja2VyUGFkICogMikpO1xuICAgICAgaWYocGVyY2VudC55IDwgMCkge1xuICAgICAgICBwZXJjZW50LnkgPSAwXG4gICAgICB9IGVsc2UgaWYocGVyY2VudC55ID4gMTAwKSB7XG4gICAgICAgIHBlcmNlbnQueSA9IDEwMDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYodGhpcy5kaXJlY3Rpb24gPT0gJ2hvcml6b250YWwnIHx8IHRoaXMuZGlyZWN0aW9uID09ICdib3RoJykge1xuICAgICAgcGVyY2VudC54ID0gTWF0aC5yb3VuZCgoY3Vyc29yWCAtIChwb3NpdGlvbi5sZWZ0KSkgKiAxMDAgLyAocG9zaXRpb24ud2lkdGggLSB0aGlzLmRyYWdnZXIucGlja2VyUGFkICogMikpO1xuICAgICAgaWYocGVyY2VudC54IDwgMCkge1xuICAgICAgICBwZXJjZW50LnggPSAwXG4gICAgICB9IGVsc2UgaWYocGVyY2VudC54ID4gMTAwKSB7XG4gICAgICAgIHBlcmNlbnQueCA9IDEwMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNldERyYWdnZXIocGVyY2VudCk7XG4gICAgdGhpcy5jaGFuZ2UuZW1pdChwZXJjZW50KTtcblxuICB9XG5cblxuXG4gIHB1YmxpYyBnZXRSZWN0KGVsZW06IEhUTUxFbGVtZW50KTogQ3VzdG9tUmVjdCB7XG5cbiAgICBsZXQgYm94ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBsZXQgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgbGV0IGRvY0VsID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgIGxldCBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jRWwuc2Nyb2xsVG9wIHx8IGJvZHkuc2Nyb2xsVG9wO1xuICAgIGxldCBzY3JvbGxMZWZ0ID0gd2luZG93LnBhZ2VYT2Zmc2V0IHx8IGRvY0VsLnNjcm9sbExlZnQgfHwgYm9keS5zY3JvbGxMZWZ0O1xuICAgIGxldCBjbGllbnRUb3AgPSBkb2NFbC5jbGllbnRUb3AgfHwgYm9keS5jbGllbnRUb3AgfHwgMDtcbiAgICBsZXQgY2xpZW50TGVmdCA9IGRvY0VsLmNsaWVudExlZnQgfHwgYm9keS5jbGllbnRMZWZ0IHx8IDA7XG5cbiAgICByZXR1cm4ge1xuICAgICAgaGVpZ2h0OiBib3guaGVpZ2h0LFxuICAgICAgbGVmdDogYm94LmxlZnQgKyBzY3JvbGxMZWZ0IC0gY2xpZW50TGVmdCxcbiAgICAgIHRvcDogYm94LnRvcCArIHNjcm9sbFRvcCAtIGNsaWVudFRvcCxcbiAgICAgIHdpZHRoOiBib3gud2lkdGgsXG4gICAgfTtcbiAgfVxuXG5cblxufVxuIl19