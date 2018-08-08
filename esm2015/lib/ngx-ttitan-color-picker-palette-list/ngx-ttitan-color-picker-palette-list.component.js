/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
export class NgxTTitanColorPickerPaletteListComponent {
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
                styles: [`:host .picker-palette-wrapper .palette-links{display:flex;flex-wrap:wrap;margin-bottom:5px}:host .picker-palette-wrapper .palette-links .palette-link{margin-right:5px;border-radius:3px;padding:2px 4px;border:1px solid #ddd;text-transform:uppercase;font-size:10px;font-family:-apple-system,BlinkMacSystemFont,San Francisco,Roboto,Segoe UI,Helvetica Neue,sans-serif;font-weight:600;background-color:#fff;cursor:pointer}:host .picker-palette-wrapper .palette-links .palette-link.selected{background-color:#5e6bc5;color:#fff}:host .picker-palette-wrapper .palette-picker-holder{height:165px;display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:flex-start;align-content:baseline;overflow-x:hidden;overflow-y:auto}:host .picker-palette-wrapper .palette-picker-holder .palette-color{cursor:pointer;width:20px;height:20px;border:1px solid #ececec;margin-top:1px;margin-right:1px;border-radius:3px}`]
            },] },
];
/** @nocollapse */
NgxTTitanColorPickerPaletteListComponent.ctorParameters = () => [];
NgxTTitanColorPickerPaletteListComponent.propDecorators = {
    pallets: [{ type: Input, args: ['pallets',] }],
    _context: [{ type: Input, args: ['context',] }],
    change: [{ type: Output, args: ['change',] }]
};
function NgxTTitanColorPickerPaletteListComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NgxTTitanColorPickerPaletteListComponent.prototype.pallets;
    /** @type {?} */
    NgxTTitanColorPickerPaletteListComponent.prototype._context;
    /** @type {?} */
    NgxTTitanColorPickerPaletteListComponent.prototype.change;
    /** @type {?} */
    NgxTTitanColorPickerPaletteListComponent.prototype.activePalette;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXR0aXRhbi1jb2xvci1waWNrZXItcGFsZXR0ZS1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC10dGl0YW4tY29sb3ItcGlja2VyLyIsInNvdXJjZXMiOlsibGliL25neC10dGl0YW4tY29sb3ItcGlja2VyLXBhbGV0dGUtbGlzdC9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1wYWxldHRlLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBZ0M3RSxNQUFNO0lBUUo7dUJBTm1ELEVBQUU7c0JBRUcsSUFBSSxZQUFZLEVBQVU7NkJBRWxELElBQUk7S0FFbkI7Ozs7SUFFakIsUUFBUTtLQUNQOzs7O0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0tBQzNCOzs7OztJQUVELGFBQWEsQ0FBQyxPQUFnQjtRQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzVCLEVBQUUsQ0FBQSxDQUNBLElBQUksQ0FBQyxhQUFhLElBQUksSUFDeEIsQ0FBQyxDQUFDLENBQUM7WUFDRCxJQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQztTQUM5QjtRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsS0FBSyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQztTQUM5QjtLQUVGOzs7OztJQUVELGFBQWEsQ0FBQyxLQUFLO1FBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3pCOzs7WUE1REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwwQ0FBMEM7Z0JBQ3BELFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBd0JYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLHk0QkFBeTRCLENBQUM7YUFDcDVCOzs7OztzQkFHRSxLQUFLLFNBQUMsU0FBUzt1QkFDZixLQUFLLFNBQUMsU0FBUztxQkFDZixNQUFNLFNBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbG9yUGlja2VyQ29tcG9uZW50LCBQYWxldHRlfSBmcm9tIFwiLi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuaW50ZXJmYWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2xpYi1uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1wYWxldHRlLWxpc3QnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJwaWNrZXItcGFsZXR0ZS13cmFwcGVyXCIgKm5nSWY9XCJwYWxsZXRzLmxlbmd0aCA+IDBcIj5cbiAgPGRpdiBjbGFzcz1cInBhbGV0dGUtbGlua3NcIj5cbiAgICA8ZGl2XG4gICAgICBjbGFzcz1cInBhbGV0dGUtbGlua1wiXG4gICAgICAqbmdGb3I9XCJsZXQgcGFsZXR0ZSBvZiBwYWxsZXRzXCJcbiAgICAgIFtuZ0NsYXNzXT1cInsnc2VsZWN0ZWQnOiAoYWN0aXZlUGFsZXR0ZSAhPT0gbnVsbCAmJiBhY3RpdmVQYWxldHRlLmlkID09IHBhbGV0dGUuaWQpfVwiXG4gICAgICAoY2xpY2spPVwic2VsZWN0UGFsZXR0ZShwYWxldHRlKVwiXG4gICAgPlxuICAgICAge3twYWxldHRlLm5hbWV9fVxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInBhbGV0dGUtcGlja2VyLWhvbGRlclwiICpuZ0lmPVwiYWN0aXZlUGFsZXR0ZSAhPT0gbnVsbCAmJiBhY3RpdmVQYWxldHRlLmNvbG9ycy5sZW5ndGggPiAwXCI+XG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJwYWxldHRlLWNvbG9yXCJcbiAgICAgICpuZ0Zvcj1cImxldCBjb2xvciBvZiBhY3RpdmVQYWxldHRlLmNvbG9yc1wiXG4gICAgICBbbmdTdHlsZV09XCJ7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogY29sb3JcbiAgICAgIH1cIlxuICAgICAgKGNsaWNrKT1cImNvbG9yU2VsZWN0ZWQoY29sb3IpXCJcbiAgICA+XG5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2A6aG9zdCAucGlja2VyLXBhbGV0dGUtd3JhcHBlciAucGFsZXR0ZS1saW5rc3tkaXNwbGF5OmZsZXg7ZmxleC13cmFwOndyYXA7bWFyZ2luLWJvdHRvbTo1cHh9Omhvc3QgLnBpY2tlci1wYWxldHRlLXdyYXBwZXIgLnBhbGV0dGUtbGlua3MgLnBhbGV0dGUtbGlua3ttYXJnaW4tcmlnaHQ6NXB4O2JvcmRlci1yYWRpdXM6M3B4O3BhZGRpbmc6MnB4IDRweDtib3JkZXI6MXB4IHNvbGlkICNkZGQ7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2ZvbnQtc2l6ZToxMHB4O2ZvbnQtZmFtaWx5Oi1hcHBsZS1zeXN0ZW0sQmxpbmtNYWNTeXN0ZW1Gb250LFNhbiBGcmFuY2lzY28sUm9ib3RvLFNlZ29lIFVJLEhlbHZldGljYSBOZXVlLHNhbnMtc2VyaWY7Zm9udC13ZWlnaHQ6NjAwO2JhY2tncm91bmQtY29sb3I6I2ZmZjtjdXJzb3I6cG9pbnRlcn06aG9zdCAucGlja2VyLXBhbGV0dGUtd3JhcHBlciAucGFsZXR0ZS1saW5rcyAucGFsZXR0ZS1saW5rLnNlbGVjdGVke2JhY2tncm91bmQtY29sb3I6IzVlNmJjNTtjb2xvcjojZmZmfTpob3N0IC5waWNrZXItcGFsZXR0ZS13cmFwcGVyIC5wYWxldHRlLXBpY2tlci1ob2xkZXJ7aGVpZ2h0OjE2NXB4O2Rpc3BsYXk6ZmxleDtmbGV4LXdyYXA6d3JhcDthbGlnbi1pdGVtczpmbGV4LXN0YXJ0O2p1c3RpZnktY29udGVudDpmbGV4LXN0YXJ0O2FsaWduLWNvbnRlbnQ6YmFzZWxpbmU7b3ZlcmZsb3cteDpoaWRkZW47b3ZlcmZsb3cteTphdXRvfTpob3N0IC5waWNrZXItcGFsZXR0ZS13cmFwcGVyIC5wYWxldHRlLXBpY2tlci1ob2xkZXIgLnBhbGV0dGUtY29sb3J7Y3Vyc29yOnBvaW50ZXI7d2lkdGg6MjBweDtoZWlnaHQ6MjBweDtib3JkZXI6MXB4IHNvbGlkICNlY2VjZWM7bWFyZ2luLXRvcDoxcHg7bWFyZ2luLXJpZ2h0OjFweDtib3JkZXItcmFkaXVzOjNweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hUVGl0YW5Db2xvclBpY2tlclBhbGV0dGVMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoJ3BhbGxldHMnKSBwdWJsaWMgcGFsbGV0czogQXJyYXk8UGFsZXR0ZT4gPSBbXTtcbiAgQElucHV0KCdjb250ZXh0JykgcHVibGljIF9jb250ZXh0OiBDb2xvclBpY2tlckNvbXBvbmVudDtcbiAgQE91dHB1dCgnY2hhbmdlJykgcHVibGljIGNoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBwdWJsaWMgYWN0aXZlUGFsZXR0ZTogUGFsZXR0ZSA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIGNsb3NlUGFsZXR0ZSgpIHtcbiAgICB0aGlzLmFjdGl2ZVBhbGV0dGUgPSBudWxsO1xuICB9XG5cbiAgc2VsZWN0UGFsZXR0ZShwYWxldHRlOiBQYWxldHRlKSB7XG4gICAgdGhpcy5fY29udGV4dC5jbG9zZVBpY2tlcigpO1xuICAgIGlmKFxuICAgICAgdGhpcy5hY3RpdmVQYWxldHRlID09IG51bGxcbiAgICApIHtcbiAgICAgIHRoaXMuYWN0aXZlUGFsZXR0ZSA9IHBhbGV0dGU7XG4gICAgfSBlbHNlIGlmICh0aGlzLmFjdGl2ZVBhbGV0dGUuaWQgIT09IHBhbGV0dGUuaWQpIHtcbiAgICAgIHRoaXMuYWN0aXZlUGFsZXR0ZSA9IHBhbGV0dGU7XG4gICAgfVxuXG4gIH1cblxuICBjb2xvclNlbGVjdGVkKGNvbG9yKSB7XG4gICAgdGhpcy5jaGFuZ2UuZW1pdChjb2xvcik7XG4gIH1cblxufVxuIl19