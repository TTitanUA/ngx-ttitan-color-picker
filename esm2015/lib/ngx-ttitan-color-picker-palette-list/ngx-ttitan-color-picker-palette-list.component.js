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
    change: [{ type: Output, args: ['change',] }]
};
function NgxTTitanColorPickerPaletteListComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NgxTTitanColorPickerPaletteListComponent.prototype.pallets;
    /** @type {?} */
    NgxTTitanColorPickerPaletteListComponent.prototype.change;
    /** @type {?} */
    NgxTTitanColorPickerPaletteListComponent.prototype.activePalette;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXR0aXRhbi1jb2xvci1waWNrZXItcGFsZXR0ZS1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC10dGl0YW4tY29sb3ItcGlja2VyLyIsInNvdXJjZXMiOlsibGliL25neC10dGl0YW4tY29sb3ItcGlja2VyLXBhbGV0dGUtbGlzdC9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1wYWxldHRlLWxpc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBZ0M3RSxNQUFNO0lBT0o7dUJBTG1ELEVBQUU7c0JBQ0csSUFBSSxZQUFZLEVBQVU7NkJBRWxELElBQUk7S0FFbkI7Ozs7SUFFakIsUUFBUTtLQUNQOzs7O0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0tBQzNCOzs7OztJQUVELGFBQWEsQ0FBQyxPQUFnQjtRQUM1QixFQUFFLENBQUEsQ0FDQSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQ3hCLENBQUMsQ0FBQyxDQUFDO1lBQ0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUM7U0FDOUI7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUM7U0FDOUI7S0FFRjs7Ozs7SUFFRCxhQUFhLENBQUMsS0FBSztRQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN6Qjs7O1lBMURGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMENBQTBDO2dCQUNwRCxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXdCWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyw0eEJBQTR4QixDQUFDO2FBQ3Z5Qjs7Ozs7c0JBR0UsS0FBSyxTQUFDLFNBQVM7cUJBQ2YsTUFBTSxTQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtQYWxldHRlfSBmcm9tIFwiLi4vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdsaWItbmd4LXR0aXRhbi1jb2xvci1waWNrZXItcGFsZXR0ZS1saXN0JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwicGlja2VyLXBhbGV0dGUtd3JhcHBlclwiICpuZ0lmPVwicGFsbGV0cy5sZW5ndGggPiAwXCI+XG4gIDxkaXYgY2xhc3M9XCJwYWxldHRlLWxpbmtzXCI+XG4gICAgPGRpdlxuICAgICAgY2xhc3M9XCJwYWxldHRlLWxpbmtcIlxuICAgICAgKm5nRm9yPVwibGV0IHBhbGV0dGUgb2YgcGFsbGV0c1wiXG4gICAgICBbbmdDbGFzc109XCJ7J3NlbGVjdGVkJzogKGFjdGl2ZVBhbGV0dGUgIT09IG51bGwgJiYgYWN0aXZlUGFsZXR0ZS5pZCA9PSBwYWxldHRlLmlkKX1cIlxuICAgICAgKGNsaWNrKT1cInNlbGVjdFBhbGV0dGUocGFsZXR0ZSlcIlxuICAgID5cbiAgICAgIHt7cGFsZXR0ZS5uYW1lfX1cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJwYWxldHRlLXBpY2tlci1ob2xkZXJcIiAqbmdJZj1cImFjdGl2ZVBhbGV0dGUgIT09IG51bGwgJiYgYWN0aXZlUGFsZXR0ZS5jb2xvcnMubGVuZ3RoID4gMFwiPlxuICAgIDxkaXZcbiAgICAgIGNsYXNzPVwicGFsZXR0ZS1jb2xvclwiXG4gICAgICAqbmdGb3I9XCJsZXQgY29sb3Igb2YgYWN0aXZlUGFsZXR0ZS5jb2xvcnNcIlxuICAgICAgW25nU3R5bGVdPVwie1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yXG4gICAgICB9XCJcbiAgICAgIChjbGljayk9XCJjb2xvclNlbGVjdGVkKGNvbG9yKVwiXG4gICAgPlxuXG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgOmhvc3QgLnBpY2tlci1wYWxldHRlLXdyYXBwZXIgLnBhbGV0dGUtbGlua3N7ZGlzcGxheTpmbGV4O2ZsZXgtd3JhcDp3cmFwO21hcmdpbi1ib3R0b206NXB4fTpob3N0IC5waWNrZXItcGFsZXR0ZS13cmFwcGVyIC5wYWxldHRlLWxpbmtzIC5wYWxldHRlLWxpbmt7bWFyZ2luLXJpZ2h0OjVweDtib3JkZXItcmFkaXVzOjNweDtwYWRkaW5nOjJweCA0cHg7Ym9yZGVyOjFweCBzb2xpZCAjZGRkO3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtmb250LXNpemU6MTBweDtmb250LWZhbWlseTotYXBwbGUtc3lzdGVtLEJsaW5rTWFjU3lzdGVtRm9udCxTYW4gRnJhbmNpc2NvLFJvYm90byxTZWdvZSBVSSxIZWx2ZXRpY2EgTmV1ZSxzYW5zLXNlcmlmO2ZvbnQtd2VpZ2h0OjYwMDtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7Y3Vyc29yOnBvaW50ZXJ9Omhvc3QgLnBpY2tlci1wYWxldHRlLXdyYXBwZXIgLnBhbGV0dGUtbGlua3MgLnBhbGV0dGUtbGluay5zZWxlY3RlZHtiYWNrZ3JvdW5kLWNvbG9yOiM1ZTZiYzU7Y29sb3I6I2ZmZn06aG9zdCAucGlja2VyLXBhbGV0dGUtd3JhcHBlciAucGFsZXR0ZS1waWNrZXItaG9sZGVye2hlaWdodDoxNjVweDtkaXNwbGF5OmZsZXg7ZmxleC13cmFwOndyYXA7YWxpZ24taXRlbXM6ZmxleC1zdGFydDtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1zdGFydDthbGlnbi1jb250ZW50OmJhc2VsaW5lfTpob3N0IC5waWNrZXItcGFsZXR0ZS13cmFwcGVyIC5wYWxldHRlLXBpY2tlci1ob2xkZXIgLnBhbGV0dGUtY29sb3J7Y3Vyc29yOnBvaW50ZXI7d2lkdGg6MTBweDtoZWlnaHQ6MTBweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hUVGl0YW5Db2xvclBpY2tlclBhbGV0dGVMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoJ3BhbGxldHMnKSBwdWJsaWMgcGFsbGV0czogQXJyYXk8UGFsZXR0ZT4gPSBbXTtcbiAgQE91dHB1dCgnY2hhbmdlJykgcHVibGljIGNoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBwdWJsaWMgYWN0aXZlUGFsZXR0ZTogUGFsZXR0ZSA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIGNsb3NlUGFsZXR0ZSgpIHtcbiAgICB0aGlzLmFjdGl2ZVBhbGV0dGUgPSBudWxsO1xuICB9XG5cbiAgc2VsZWN0UGFsZXR0ZShwYWxldHRlOiBQYWxldHRlKSB7XG4gICAgaWYoXG4gICAgICB0aGlzLmFjdGl2ZVBhbGV0dGUgPT0gbnVsbFxuICAgICkge1xuICAgICAgdGhpcy5hY3RpdmVQYWxldHRlID0gcGFsZXR0ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYWN0aXZlUGFsZXR0ZS5pZCAhPT0gcGFsZXR0ZS5pZCkge1xuICAgICAgdGhpcy5hY3RpdmVQYWxldHRlID0gcGFsZXR0ZTtcbiAgICB9XG5cbiAgfVxuXG4gIGNvbG9yU2VsZWN0ZWQoY29sb3IpIHtcbiAgICB0aGlzLmNoYW5nZS5lbWl0KGNvbG9yKTtcbiAgfVxuXG59XG4iXX0=