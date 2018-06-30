/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
export { NgxTTitanColorPickerPaletteListComponent };
function NgxTTitanColorPickerPaletteListComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NgxTTitanColorPickerPaletteListComponent.prototype.pallets;
    /** @type {?} */
    NgxTTitanColorPickerPaletteListComponent.prototype.change;
    /** @type {?} */
    NgxTTitanColorPickerPaletteListComponent.prototype.activePalette;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXR0aXRhbi1jb2xvci1waWNrZXItcGFsZXR0ZS1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC10dGl0YW4tY29sb3ItcGlja2VyLyIsInNvdXJjZXMiOlsibGliL25neC10dGl0YW4tY29sb3ItcGlja2VyLXBhbGV0dGUtbGlzdC9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1wYWxldHRlLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDOztJQXVDM0U7dUJBTG1ELEVBQUU7c0JBQ0csSUFBSSxZQUFZLEVBQVU7NkJBRWxELElBQUk7S0FFbkI7Ozs7SUFFakIsMkRBQVE7OztJQUFSO0tBQ0M7Ozs7SUFFRCwrREFBWTs7O0lBQVo7UUFDRSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztLQUMzQjs7Ozs7SUFFRCxnRUFBYTs7OztJQUFiLFVBQWMsT0FBZ0I7UUFDNUIsRUFBRSxDQUFBLENBQ0EsSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUN4QixDQUFDLENBQUMsQ0FBQztZQUNELElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO1NBQzlCO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxLQUFLLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO1NBQzlCO0tBRUY7Ozs7O0lBRUQsZ0VBQWE7Ozs7SUFBYixVQUFjLEtBQUs7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDekI7O2dCQTFERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDBDQUEwQztvQkFDcEQsUUFBUSxFQUFFLCtzQkF3Qlg7b0JBQ0MsTUFBTSxFQUFFLENBQUMsNHhCQUE0eEIsQ0FBQztpQkFDdnlCOzs7OzswQkFHRSxLQUFLLFNBQUMsU0FBUzt5QkFDZixNQUFNLFNBQUMsUUFBUTs7bURBbkNsQjs7U0FnQ2Esd0NBQXdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UGFsZXR0ZX0gZnJvbSBcIi4uL25neC10dGl0YW4tY29sb3ItcGlja2VyLnNlcnZpY2VcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbGliLW5neC10dGl0YW4tY29sb3ItcGlja2VyLXBhbGV0dGUtbGlzdCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInBpY2tlci1wYWxldHRlLXdyYXBwZXJcIiAqbmdJZj1cInBhbGxldHMubGVuZ3RoID4gMFwiPlxuICA8ZGl2IGNsYXNzPVwicGFsZXR0ZS1saW5rc1wiPlxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwicGFsZXR0ZS1saW5rXCJcbiAgICAgICpuZ0Zvcj1cImxldCBwYWxldHRlIG9mIHBhbGxldHNcIlxuICAgICAgW25nQ2xhc3NdPVwieydzZWxlY3RlZCc6IChhY3RpdmVQYWxldHRlICE9PSBudWxsICYmIGFjdGl2ZVBhbGV0dGUuaWQgPT0gcGFsZXR0ZS5pZCl9XCJcbiAgICAgIChjbGljayk9XCJzZWxlY3RQYWxldHRlKHBhbGV0dGUpXCJcbiAgICA+XG4gICAgICB7e3BhbGV0dGUubmFtZX19XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwicGFsZXR0ZS1waWNrZXItaG9sZGVyXCIgKm5nSWY9XCJhY3RpdmVQYWxldHRlICE9PSBudWxsICYmIGFjdGl2ZVBhbGV0dGUuY29sb3JzLmxlbmd0aCA+IDBcIj5cbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cInBhbGV0dGUtY29sb3JcIlxuICAgICAgKm5nRm9yPVwibGV0IGNvbG9yIG9mIGFjdGl2ZVBhbGV0dGUuY29sb3JzXCJcbiAgICAgIFtuZ1N0eWxlXT1cIntcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBjb2xvclxuICAgICAgfVwiXG4gICAgICAoY2xpY2spPVwiY29sb3JTZWxlY3RlZChjb2xvcilcIlxuICAgID5cblxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYDpob3N0IC5waWNrZXItcGFsZXR0ZS13cmFwcGVyIC5wYWxldHRlLWxpbmtze2Rpc3BsYXk6ZmxleDtmbGV4LXdyYXA6d3JhcDttYXJnaW4tYm90dG9tOjVweH06aG9zdCAucGlja2VyLXBhbGV0dGUtd3JhcHBlciAucGFsZXR0ZS1saW5rcyAucGFsZXR0ZS1saW5re21hcmdpbi1yaWdodDo1cHg7Ym9yZGVyLXJhZGl1czozcHg7cGFkZGluZzoycHggNHB4O2JvcmRlcjoxcHggc29saWQgI2RkZDt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7Zm9udC1zaXplOjEwcHg7Zm9udC1mYW1pbHk6LWFwcGxlLXN5c3RlbSxCbGlua01hY1N5c3RlbUZvbnQsU2FuIEZyYW5jaXNjbyxSb2JvdG8sU2Vnb2UgVUksSGVsdmV0aWNhIE5ldWUsc2Fucy1zZXJpZjtmb250LXdlaWdodDo2MDA7YmFja2dyb3VuZC1jb2xvcjojZmZmO2N1cnNvcjpwb2ludGVyfTpob3N0IC5waWNrZXItcGFsZXR0ZS13cmFwcGVyIC5wYWxldHRlLWxpbmtzIC5wYWxldHRlLWxpbmsuc2VsZWN0ZWR7YmFja2dyb3VuZC1jb2xvcjojNWU2YmM1O2NvbG9yOiNmZmZ9Omhvc3QgLnBpY2tlci1wYWxldHRlLXdyYXBwZXIgLnBhbGV0dGUtcGlja2VyLWhvbGRlcntoZWlnaHQ6MTY1cHg7ZGlzcGxheTpmbGV4O2ZsZXgtd3JhcDp3cmFwO2FsaWduLWl0ZW1zOmZsZXgtc3RhcnQ7anVzdGlmeS1jb250ZW50OmZsZXgtc3RhcnQ7YWxpZ24tY29udGVudDpiYXNlbGluZX06aG9zdCAucGlja2VyLXBhbGV0dGUtd3JhcHBlciAucGFsZXR0ZS1waWNrZXItaG9sZGVyIC5wYWxldHRlLWNvbG9ye2N1cnNvcjpwb2ludGVyO3dpZHRoOjEwcHg7aGVpZ2h0OjEwcHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4VFRpdGFuQ29sb3JQaWNrZXJQYWxldHRlTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCdwYWxsZXRzJykgcHVibGljIHBhbGxldHM6IEFycmF5PFBhbGV0dGU+ID0gW107XG4gIEBPdXRwdXQoJ2NoYW5nZScpIHB1YmxpYyBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgcHVibGljIGFjdGl2ZVBhbGV0dGU6IFBhbGV0dGUgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBjbG9zZVBhbGV0dGUoKSB7XG4gICAgdGhpcy5hY3RpdmVQYWxldHRlID0gbnVsbDtcbiAgfVxuXG4gIHNlbGVjdFBhbGV0dGUocGFsZXR0ZTogUGFsZXR0ZSkge1xuICAgIGlmKFxuICAgICAgdGhpcy5hY3RpdmVQYWxldHRlID09IG51bGxcbiAgICApIHtcbiAgICAgIHRoaXMuYWN0aXZlUGFsZXR0ZSA9IHBhbGV0dGU7XG4gICAgfSBlbHNlIGlmICh0aGlzLmFjdGl2ZVBhbGV0dGUuaWQgIT09IHBhbGV0dGUuaWQpIHtcbiAgICAgIHRoaXMuYWN0aXZlUGFsZXR0ZSA9IHBhbGV0dGU7XG4gICAgfVxuXG4gIH1cblxuICBjb2xvclNlbGVjdGVkKGNvbG9yKSB7XG4gICAgdGhpcy5jaGFuZ2UuZW1pdChjb2xvcik7XG4gIH1cblxufVxuIl19