/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { NgxTTitanColorPickerSelectorDirective } from "./ngx-ttitan-color-picker-selector.directive";
import { NgxTTitanColorPickerService } from "./ngx-ttitan-color-picker.service";
import { NgxTTitanColorPickerInputDirective } from "./ngx-ttitan-color-picker-input.directive";
import { NgxTTitanColorPickerPaletteListComponent } from "./ngx-ttitan-color-picker-palette-list/ngx-ttitan-color-picker-palette-list.component";
export class NgxTTitanColorPickerComponent {
    /**
     * @param {?} colorPickerService
     * @param {?} cdr
     */
    constructor(colorPickerService, cdr) {
        this.colorPickerService = colorPickerService;
        this.cdr = cdr;
        this.alpha = false;
        this.debug = false;
        this.color = 'rgba(255,255,255,0)';
        this.title = 'title';
        this.outFormat = 'hex6';
        this.inputFormat = 'hex6';
        this.availPallets = ['polaris', 'material'];
        this.customPallets = [];
        this.colorChanged = new EventEmitter();
        this.colorInit = false;
        this.pickerOpen = false;
        this.pickerPallets = [];
        this.hsva = {
            hue: 0,
            saturation: 100,
            value: 100,
            alpha: 1
        };
        this.currentColor = 'rgb(255,0,0)';
        this.currentColorMax = 'rgba(255,0,0,1)';
        this.currentColorAlpha = 'rgba(255,0,0,1)';
        this.currentColorAlphaZero = 'rgba(255,0,0,0)';
        this.uuid = 'picker-';
        this.allowedFormats = ['hex6', 'hex8', 'rgb', 'rgba'];
        this.uuid = this.colorPickerService.getPickerUuid();
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    componentClick($event) {
        if (!this.pickerOpen) {
            return;
        }
        if (typeof $event.path !== "undefined") {
            let /** @type {?} */ pickerFound = false;
            $event.path.every(function (item) {
                if (typeof item.classList !== "undefined") {
                    if (item.classList.contains('picker-input-holder') ||
                        item.classList.contains('ngx-ttitan-color-picker')) {
                        pickerFound = true;
                        return false;
                    }
                }
                return true;
            });
            if (!pickerFound) {
                this.closePicker();
            }
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.colorPickerService.debug = this.debug;
        this.validateInputParams();
        this.colorPickerService.preparePickerPallets(this.availPallets, this.customPallets, this);
        this.colorPickerService.colorToData(this.color, this);
        this.cdr.detectChanges();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.setDraggesToCurrentColor();
    }
    /**
     * @return {?}
     */
    openPicker() {
        this.pickerOpen = true;
        if (typeof this.paletteList !== 'undefined') {
            this.paletteList.closePalette();
        }
        if (typeof this.mainColor !== 'undefined') {
            this.mainColor.eventsSubscibe();
        }
        if (typeof this.huePicker !== 'undefined') {
            this.huePicker.eventsSubscibe();
        }
        if (typeof this.alphaPicker !== 'undefined') {
            this.alphaPicker.eventsSubscibe();
        }
    }
    /**
     * @return {?}
     */
    closePicker() {
        if (typeof this.mainColor !== 'undefined') {
            this.mainColor.eventsUnSubscibe();
        }
        if (typeof this.huePicker !== 'undefined') {
            this.huePicker.eventsUnSubscibe();
        }
        if (typeof this.alphaPicker !== 'undefined') {
            this.alphaPicker.eventsUnSubscibe();
        }
        this.pickerOpen = false;
    }
    /**
     * @return {?}
     */
    validateInputParams() {
        if (this.allowedFormats.indexOf(this.outFormat) === -1) {
            this.outFormat = 'hex6';
            console.group("ngx-ttitan-color-picker");
            console.warn('[outFormat] must be one of this (' + this.allowedFormats.join(',') + ')');
            console.groupEnd();
        }
        if (this.allowedFormats.indexOf(this.inputFormat) === -1) {
            this.inputFormat = this.outFormat + '';
            console.group("ngx-ttitan-color-picker");
            console.warn('[inputFormat] must be one of this (' + this.allowedFormats.join(',') + ')');
            console.groupEnd();
        }
    }
    /**
     * @param {?} color
     * @return {?}
     */
    inputColorChange(color) {
        this.color = color;
        this.colorPickerService.colorToData(this.color, this);
        this.setDraggesToCurrentColor();
    }
    /**
     * @return {?}
     */
    updateReturnColor() {
        this.color = this.colorPickerService.prepareReturnColor(this.hsva, this.outFormat);
        if (this.colorInit) {
            this.colorChanged.emit(this.color + '');
        }
        this.colorInit = true;
    }
    /**
     * @return {?}
     */
    setInputValue() {
        if (typeof this.pickerInput !== 'undefined') {
            this.pickerInput.setInputValue(this.colorPickerService.prepareReturnColor(this.hsva, this.inputFormat));
        }
    }
    /**
     * @return {?}
     */
    setDraggesToCurrentColor() {
        if (typeof this.mainColor !== 'undefined') {
            this.mainColor.setDragger({
                x: this.hsva.saturation,
                y: 100 - this.hsva.value
            });
        }
        if (typeof this.huePicker !== 'undefined') {
            this.huePicker.setDragger({ x: 0, y: Math.round(this.hsva.hue * 100 / 360) });
        }
        if (typeof this.alphaPicker !== 'undefined' && this.alpha) {
            this.alphaPicker.setDragger({ x: 0, y: 100 - (this.hsva.alpha * 100) });
        }
    }
}
NgxTTitanColorPickerComponent.decorators = [
    { type: Component, args: [{
                changeDetection: ChangeDetectionStrategy.OnPush,
                selector: 'lib-ngx-ttitan-color-picker',
                template: `<div
  class="ngx-ttitan-color-picker-wrapper"
>

  <div class="picker-input-wrapper">
    <div
      [ngStyle]="{backgroundColor: color}"
      class="debug-output"
      *ngIf="colorPickerService.debug"
    >
      {{color}}
    </div>
    <div class="picker-input-label">
      <label [for]="uuid" >{{title}}</label>
    </div>
    <div class="picker-input-holder">
      <div class="picker-color" [ngStyle]="{background: currentColorAlpha}">

      </div>
      <div class="picker-input">
        <input
          libNgxTTitanColorPickerInput
          #pickerInput="libNgxTTitanColorPickerInput"
          (inputChange)="inputColorChange($event)"
          [format]="inputFormat"
          [id]="uuid"
          type="text"
          (focus)="openPicker()"
        />
      </div>
      <!--<div class="picker-save-sign">-->
      <!--S-->
      <!--</div>-->
    </div>

  </div>
  <div class="ngx-ttitan-color-picker" [ngClass]="{'no-alpha': !alpha, 'open': pickerOpen}">
    <div class="ngx-ttitan-color-picker__MainColor">
      <div class="ngx-ttitan-color-picker__ColorLayer" [ngStyle]="{backgroundColor: currentColorMax}" ></div>
      <div class="ngx-ttitan-color-picker__Slidable" libNgxTTitanColorPickerSelector #mainColor="libNgxTTitanColorPickerSelector" (change)="colorPickerService.saturationChange($event, this)">
        <div class="ngx-ttitan-color-picker__Dragger" libNgxTTitanColorPickerDragger style="transform: translate3d(0px, 0px, 0px);"></div>
      </div>
    </div>
    <div class="ngx-ttitan-color-picker__HuePicker">
      <div class="ngx-ttitan-color-picker__Slidable"  libNgxTTitanColorPickerSelector #huePicker="libNgxTTitanColorPickerSelector" (change)="colorPickerService.hueChange($event, this)" [direction]="'vertical'">
        <div class="ngx-ttitan-color-picker__Dragger" libNgxTTitanColorPickerDragger [pickerPad]="0" style=" transform: translate3d(0px, 0px, 0px);"></div>
      </div>
    </div>
    <div class="ngx-ttitan-color-picker__AlphaPicker" *ngIf="alpha === true">
      <div class="ngx-ttitan-color-picker__ColorLayer"

           [ngStyle]="{background: 'linear-gradient(to top, ' + currentColorAlphaZero + '  18px, ' + currentColor + ' calc(100% - 18px)'}"
      ></div>
      <div class="ngx-ttitan-color-picker__Slidable"  libNgxTTitanColorPickerSelector #alphaPicker="libNgxTTitanColorPickerSelector" (change)="colorPickerService.alphaChange($event, this)" [direction]="'vertical'">
        <div class="ngx-ttitan-color-picker__Dragger" libNgxTTitanColorPickerDragger [pickerPad]="0" style=" transform: translate3d(0px, 0px, 0px);"></div>
      </div>
    </div>
    <!--<div style="height: 40px; width: 40px" [ngStyle]="{background: currentColor}">-->

    <!--</div>-->
    <!--<div style="height: 40px; width: 40px" [ngStyle]="{background: currentColorAlpha}">-->

    <!--</div>-->
  </div>
  <lib-ngx-ttitan-color-picker-palette-list
    (change)="inputColorChange($event)"
    [pallets]="pickerPallets"
  >

  </lib-ngx-ttitan-color-picker-palette-list>
</div>

`,
                styles: [`:host *,:host :after,:host :before{box-sizing:border-box}:host .debug-output{width:100%;height:20px}:host .picker-input-wrapper{margin-bottom:6px}:host .picker-input-wrapper .picker-input-label{margin-bottom:6px}:host .picker-input-wrapper .picker-input-label label{text-transform:uppercase;font-weight:600}:host .picker-input-wrapper .picker-input-holder{display:flex;height:33px;border:1px solid #bbb;overflow:hidden;border-radius:3px;background-color:#eee}:host .picker-input-wrapper .picker-input-holder .picker-color{flex:0 0 31px;background-color:#ff0300}:host .picker-input-wrapper .picker-input-holder .picker-input{flex:auto;background-color:transparent}:host .picker-input-wrapper .picker-input-holder .picker-input input{background-color:transparent;color:#272727;font-family:monospace;font-size:14px;border:none;outline:0;padding:8px 2px 8px 8px;width:100%}:host .picker-input-wrapper .picker-input-holder .picker-save-sign{flex:0 0 31px;line-height:33px;text-align:center}:host .ngx-ttitan-color-picker{max-height:0;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:flex;transition:max-height .3s}:host .ngx-ttitan-color-picker.open{margin-bottom:5px;max-height:165px}:host .ngx-ttitan-color-picker__ColorLayer{position:absolute;z-index:10;top:0;left:0;height:100%;width:100%;box-shadow:inset 0 0 2px 0 rgba(0,0,0,.5);pointer-events:none}:host .ngx-ttitan-color-picker__Slidable{height:100%;width:100%;cursor:pointer}:host .ngx-ttitan-color-picker__Dragger{position:relative;z-index:30;bottom:.9rem;-webkit-transform:none;transform:none;height:18px;width:18px;margin:0 auto;-webkit-backface-visibility:hidden;backface-visibility:hidden;will-change:transform;background:0 0;border:3px solid #fff;box-shadow:0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08),inset 0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08);border-radius:50%;pointer-events:none;touch-action:none}:host .ngx-ttitan-color-picker__MainColor{background-image:linear-gradient(45deg,#dfe3e8 25%,transparent 0),linear-gradient(-45deg,#dfe3e8 25%,transparent 0),linear-gradient(45deg,transparent 75%,#dfe3e8 0),linear-gradient(-45deg,transparent 75%,#dfe3e8 0);background-size:1.6rem 1.6rem;background-position:0 0,0 .8rem,.8rem -.8rem,-.8rem 0;position:relative;overflow:hidden;width:165px;height:165px;border-radius:4px;cursor:pointer}:host .ngx-ttitan-color-picker__MainColor .ngx-ttitan-color-picker__ColorLayer{box-shadow:inset 0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08);border-radius:4px}:host .ngx-ttitan-color-picker__MainColor .ngx-ttitan-color-picker__Dragger{right:.9rem;margin:0}:host .ngx-ttitan-color-picker__MainColor:after,:host .ngx-ttitan-color-picker__MainColor:before{content:"";position:absolute;z-index:20;top:0;left:0;display:block;height:100%;width:100%;pointer-events:none;border-radius:3px}:host .ngx-ttitan-color-picker__MainColor:before{background:linear-gradient(90deg,#fff,transparent)}:host .ngx-ttitan-color-picker__MainColor:after{background-image:linear-gradient(0deg,#000,transparent);box-shadow:inset 0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08)}:host .ngx-ttitan-color-picker__AlphaPicker,:host .ngx-ttitan-color-picker__HuePicker{position:relative;overflow:hidden;height:165px;width:24px;margin-left:.8rem;border-width:3px;border-radius:8rem;padding:13px 0}:host .ngx-ttitan-color-picker__HuePicker{background:linear-gradient(to bottom,red 0,#ff0 21%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%);box-shadow:inset 0 0 2px 0 rgba(0,0,0,.5)}:host .ngx-ttitan-color-picker__AlphaPicker{background-image:linear-gradient(45deg,#dfe3e8 25%,transparent 0),linear-gradient(-45deg,#dfe3e8 25%,transparent 0),linear-gradient(45deg,transparent 75%,#dfe3e8 0),linear-gradient(-45deg,transparent 75%,#dfe3e8 0);background-size:1.6rem 1.6rem;background-position:0 0,0 .8rem,.8rem -.8rem,-.8rem 0}:host .ngx-ttitan-color-picker__AlphaPicker .ngx-ttitan-color-picker__ColorLayer{border-radius:8rem}:host .ngx-ttitan-color-picker.no-alpha .ngx-ttitan-color-picker__MainColor{width:200px}`],
            },] },
];
/** @nocollapse */
NgxTTitanColorPickerComponent.ctorParameters = () => [
    { type: NgxTTitanColorPickerService },
    { type: ChangeDetectorRef }
];
NgxTTitanColorPickerComponent.propDecorators = {
    componentClick: [{ type: HostListener, args: ['click', ['$event'],] }],
    alpha: [{ type: Input, args: ['alpha',] }],
    debug: [{ type: Input, args: ['debug',] }],
    color: [{ type: Input, args: ['color',] }],
    title: [{ type: Input, args: ['title',] }],
    outFormat: [{ type: Input, args: ['outFormat',] }],
    inputFormat: [{ type: Input, args: ['inputFormat',] }],
    availPallets: [{ type: Input, args: ['availPallets',] }],
    customPallets: [{ type: Input, args: ['customPallets',] }],
    colorChanged: [{ type: Output, args: ['colorChanged',] }],
    pickerInput: [{ type: ViewChild, args: ['pickerInput',] }],
    paletteList: [{ type: ViewChild, args: [NgxTTitanColorPickerPaletteListComponent,] }],
    mainColor: [{ type: ViewChild, args: ['mainColor',] }],
    huePicker: [{ type: ViewChild, args: ['huePicker',] }],
    alphaPicker: [{ type: ViewChild, args: ['alphaPicker',] }]
};
function NgxTTitanColorPickerComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NgxTTitanColorPickerComponent.prototype.alpha;
    /** @type {?} */
    NgxTTitanColorPickerComponent.prototype.debug;
    /** @type {?} */
    NgxTTitanColorPickerComponent.prototype.color;
    /** @type {?} */
    NgxTTitanColorPickerComponent.prototype.title;
    /** @type {?} */
    NgxTTitanColorPickerComponent.prototype.outFormat;
    /** @type {?} */
    NgxTTitanColorPickerComponent.prototype.inputFormat;
    /** @type {?} */
    NgxTTitanColorPickerComponent.prototype.availPallets;
    /** @type {?} */
    NgxTTitanColorPickerComponent.prototype.customPallets;
    /** @type {?} */
    NgxTTitanColorPickerComponent.prototype.colorChanged;
    /** @type {?} */
    NgxTTitanColorPickerComponent.prototype.pickerInput;
    /** @type {?} */
    NgxTTitanColorPickerComponent.prototype.paletteList;
    /** @type {?} */
    NgxTTitanColorPickerComponent.prototype.mainColor;
    /** @type {?} */
    NgxTTitanColorPickerComponent.prototype.huePicker;
    /** @type {?} */
    NgxTTitanColorPickerComponent.prototype.alphaPicker;
    /** @type {?} */
    NgxTTitanColorPickerComponent.prototype.colorInit;
    /** @type {?} */
    NgxTTitanColorPickerComponent.prototype.pickerOpen;
    /** @type {?} */
    NgxTTitanColorPickerComponent.prototype.pickerPallets;
    /** @type {?} */
    NgxTTitanColorPickerComponent.prototype.hsva;
    /** @type {?} */
    NgxTTitanColorPickerComponent.prototype.currentColor;
    /** @type {?} */
    NgxTTitanColorPickerComponent.prototype.currentColorMax;
    /** @type {?} */
    NgxTTitanColorPickerComponent.prototype.currentColorAlpha;
    /** @type {?} */
    NgxTTitanColorPickerComponent.prototype.currentColorAlphaZero;
    /** @type {?} */
    NgxTTitanColorPickerComponent.prototype.uuid;
    /** @type {?} */
    NgxTTitanColorPickerComponent.prototype.allowedFormats;
    /** @type {?} */
    NgxTTitanColorPickerComponent.prototype.colorPickerService;
    /** @type {?} */
    NgxTTitanColorPickerComponent.prototype.cdr;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXR0aXRhbi1jb2xvci1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIvIiwic291cmNlcyI6WyJsaWIvbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ1UsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUNwRSxZQUFZLEVBQ1osWUFBWSxFQUFFLEtBQUssRUFDbkIsTUFBTSxFQUNOLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMscUNBQXFDLEVBQUMsTUFBTSw4Q0FBOEMsQ0FBQztBQUNuRyxPQUFPLEVBQU8sMkJBQTJCLEVBQVUsTUFBTSxtQ0FBbUMsQ0FBQztBQUM3RixPQUFPLEVBQUMsa0NBQWtDLEVBQUMsTUFBTSwyQ0FBMkMsQ0FBQztBQUM3RixPQUFPLEVBQUMsd0NBQXdDLEVBQUMsTUFBTSx1RkFBdUYsQ0FBQztBQWdGL0ksTUFBTTs7Ozs7SUF1RUosWUFDUyxvQkFDQTtRQURBLHVCQUFrQixHQUFsQixrQkFBa0I7UUFDbEIsUUFBRyxHQUFILEdBQUc7cUJBMUM0QixLQUFLO3FCQUNMLEtBQUs7cUJBQ04scUJBQXFCO3FCQUNyQixPQUFPO3lCQUNDLE1BQU07MkJBQ0YsTUFBTTs0QkFDRyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUM7NkJBQ25CLEVBQUU7NEJBQ0UsSUFBSSxZQUFZLEVBQVU7eUJBV2xFLEtBQUs7MEJBQ0osS0FBSzs2QkFFSyxFQUFFO29CQUVyQjtZQUNsQixHQUFHLEVBQUUsQ0FBQztZQUNOLFVBQVUsRUFBRSxHQUFHO1lBQ2YsS0FBSyxFQUFFLEdBQUc7WUFDVixLQUFLLEVBQUUsQ0FBQztTQUNUOzRCQUU2QixjQUFjOytCQUNYLGlCQUFpQjtpQ0FDZixpQkFBaUI7cUNBQ2IsaUJBQWlCO29CQUVsQyxTQUFTOzhCQUVRLENBQUMsTUFB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QUFDLGVBQWU7MkJBQ3JCLE1BQU0sU0FBQyxjQUFjOzBCQUVyQixTQUFTLFNBQUMsYUFBYTswQkFFdkIsU0FBUyxTQUFDLHdDQUF3Qzt3QkFFbEQsU0FBUyxTQUFDLFdBQVc7d0JBQ3JCLFNBQVMsU0FBQyxXQUFXOzBCQUNyQixTQUFTLFNBQUMsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGQsIENvbnRlbnRDaGlsZHJlbiwgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkluaXQsXG4gIE91dHB1dCxcbiAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yRGlyZWN0aXZlfSBmcm9tIFwiLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1zZWxlY3Rvci5kaXJlY3RpdmVcIjtcbmltcG9ydCB7SFNWQSwgTmd4VFRpdGFuQ29sb3JQaWNrZXJTZXJ2aWNlLCBQYWxldHRlfSBmcm9tIFwiLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci5zZXJ2aWNlXCI7XG5pbXBvcnQge05neFRUaXRhbkNvbG9yUGlja2VySW5wdXREaXJlY3RpdmV9IGZyb20gXCIuL25neC10dGl0YW4tY29sb3ItcGlja2VyLWlucHV0LmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHtOZ3hUVGl0YW5Db2xvclBpY2tlclBhbGV0dGVMaXN0Q29tcG9uZW50fSBmcm9tIFwiLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1wYWxldHRlLWxpc3Qvbmd4LXR0aXRhbi1jb2xvci1waWNrZXItcGFsZXR0ZS1saXN0LmNvbXBvbmVudFwiO1xuLy9bbmdTdHlsZV09XCJ7YmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCh0byB0b3AsICcgKyBuZ3hUVGl0YW5Db2xvclBpY2tlclNlcnZpY2UuY3VycmVudENvbG9yICsgJyAxOHB4LCByZ2IoMjU1LCA3NywgMjU1KSBjYWxjKDEwMCUgLSAxOHB4KSd9XCJcbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc2VsZWN0b3I6ICdsaWItbmd4LXR0aXRhbi1jb2xvci1waWNrZXInLFxuICB0ZW1wbGF0ZTogYDxkaXZcclxuICBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyLXdyYXBwZXJcIlxyXG4+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJwaWNrZXItaW5wdXQtd3JhcHBlclwiPlxyXG4gICAgPGRpdlxyXG4gICAgICBbbmdTdHlsZV09XCJ7YmFja2dyb3VuZENvbG9yOiBjb2xvcn1cIlxyXG4gICAgICBjbGFzcz1cImRlYnVnLW91dHB1dFwiXHJcbiAgICAgICpuZ0lmPVwiY29sb3JQaWNrZXJTZXJ2aWNlLmRlYnVnXCJcclxuICAgID5cclxuICAgICAge3tjb2xvcn19XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItaW5wdXQtbGFiZWxcIj5cclxuICAgICAgPGxhYmVsIFtmb3JdPVwidXVpZFwiID57e3RpdGxlfX08L2xhYmVsPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWlucHV0LWhvbGRlclwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicGlja2VyLWNvbG9yXCIgW25nU3R5bGVdPVwie2JhY2tncm91bmQ6IGN1cnJlbnRDb2xvckFscGhhfVwiPlxyXG5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItaW5wdXRcIj5cclxuICAgICAgICA8aW5wdXRcclxuICAgICAgICAgIGxpYk5neFRUaXRhbkNvbG9yUGlja2VySW5wdXRcclxuICAgICAgICAgICNwaWNrZXJJbnB1dD1cImxpYk5neFRUaXRhbkNvbG9yUGlja2VySW5wdXRcIlxyXG4gICAgICAgICAgKGlucHV0Q2hhbmdlKT1cImlucHV0Q29sb3JDaGFuZ2UoJGV2ZW50KVwiXHJcbiAgICAgICAgICBbZm9ybWF0XT1cImlucHV0Rm9ybWF0XCJcclxuICAgICAgICAgIFtpZF09XCJ1dWlkXCJcclxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgIChmb2N1cyk9XCJvcGVuUGlja2VyKClcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8IS0tPGRpdiBjbGFzcz1cInBpY2tlci1zYXZlLXNpZ25cIj4tLT5cclxuICAgICAgPCEtLVMtLT5cclxuICAgICAgPCEtLTwvZGl2Pi0tPlxyXG4gICAgPC9kaXY+XHJcblxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlclwiIFtuZ0NsYXNzXT1cInsnbm8tYWxwaGEnOiAhYWxwaGEsICdvcGVuJzogcGlja2VyT3Blbn1cIj5cclxuICAgIDxkaXYgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fTWFpbkNvbG9yXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fQ29sb3JMYXllclwiIFtuZ1N0eWxlXT1cIntiYWNrZ3JvdW5kQ29sb3I6IGN1cnJlbnRDb2xvck1heH1cIiA+PC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fU2xpZGFibGVcIiBsaWJOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yICNtYWluQ29sb3I9XCJsaWJOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yXCIgKGNoYW5nZSk9XCJjb2xvclBpY2tlclNlcnZpY2Uuc2F0dXJhdGlvbkNoYW5nZSgkZXZlbnQsIHRoaXMpXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19EcmFnZ2VyXCIgbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyIHN0eWxlPVwidHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwcHgsIDBweCwgMHB4KTtcIj48L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fSHVlUGlja2VyXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fU2xpZGFibGVcIiAgbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvciAjaHVlUGlja2VyPVwibGliTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvclwiIChjaGFuZ2UpPVwiY29sb3JQaWNrZXJTZXJ2aWNlLmh1ZUNoYW5nZSgkZXZlbnQsIHRoaXMpXCIgW2RpcmVjdGlvbl09XCIndmVydGljYWwnXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19EcmFnZ2VyXCIgbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyIFtwaWNrZXJQYWRdPVwiMFwiIHN0eWxlPVwiIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMHB4LCAwcHgsIDBweCk7XCI+PC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0FscGhhUGlja2VyXCIgKm5nSWY9XCJhbHBoYSA9PT0gdHJ1ZVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0NvbG9yTGF5ZXJcIlxyXG5cclxuICAgICAgICAgICBbbmdTdHlsZV09XCJ7YmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCh0byB0b3AsICcgKyBjdXJyZW50Q29sb3JBbHBoYVplcm8gKyAnICAxOHB4LCAnICsgY3VycmVudENvbG9yICsgJyBjYWxjKDEwMCUgLSAxOHB4KSd9XCJcclxuICAgICAgPjwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX1NsaWRhYmxlXCIgIGxpYk5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3IgI2FscGhhUGlja2VyPVwibGliTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvclwiIChjaGFuZ2UpPVwiY29sb3JQaWNrZXJTZXJ2aWNlLmFscGhhQ2hhbmdlKCRldmVudCwgdGhpcylcIiBbZGlyZWN0aW9uXT1cIid2ZXJ0aWNhbCdcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0RyYWdnZXJcIiBsaWJOZ3hUVGl0YW5Db2xvclBpY2tlckRyYWdnZXIgW3BpY2tlclBhZF09XCIwXCIgc3R5bGU9XCIgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwcHgsIDBweCwgMHB4KTtcIj48L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDwhLS08ZGl2IHN0eWxlPVwiaGVpZ2h0OiA0MHB4OyB3aWR0aDogNDBweFwiIFtuZ1N0eWxlXT1cIntiYWNrZ3JvdW5kOiBjdXJyZW50Q29sb3J9XCI+LS0+XHJcblxyXG4gICAgPCEtLTwvZGl2Pi0tPlxyXG4gICAgPCEtLTxkaXYgc3R5bGU9XCJoZWlnaHQ6IDQwcHg7IHdpZHRoOiA0MHB4XCIgW25nU3R5bGVdPVwie2JhY2tncm91bmQ6IGN1cnJlbnRDb2xvckFscGhhfVwiPi0tPlxyXG5cclxuICAgIDwhLS08L2Rpdj4tLT5cclxuICA8L2Rpdj5cclxuICA8bGliLW5neC10dGl0YW4tY29sb3ItcGlja2VyLXBhbGV0dGUtbGlzdFxyXG4gICAgKGNoYW5nZSk9XCJpbnB1dENvbG9yQ2hhbmdlKCRldmVudClcIlxyXG4gICAgW3BhbGxldHNdPVwicGlja2VyUGFsbGV0c1wiXHJcbiAgPlxyXG5cclxuICA8L2xpYi1uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1wYWxldHRlLWxpc3Q+XHJcbjwvZGl2PlxyXG5cclxuYCxcbiAgc3R5bGVzOiBbYDpob3N0ICosOmhvc3QgOmFmdGVyLDpob3N0IDpiZWZvcmV7Ym94LXNpemluZzpib3JkZXItYm94fTpob3N0IC5kZWJ1Zy1vdXRwdXR7d2lkdGg6MTAwJTtoZWlnaHQ6MjBweH06aG9zdCAucGlja2VyLWlucHV0LXdyYXBwZXJ7bWFyZ2luLWJvdHRvbTo2cHh9Omhvc3QgLnBpY2tlci1pbnB1dC13cmFwcGVyIC5waWNrZXItaW5wdXQtbGFiZWx7bWFyZ2luLWJvdHRvbTo2cHh9Omhvc3QgLnBpY2tlci1pbnB1dC13cmFwcGVyIC5waWNrZXItaW5wdXQtbGFiZWwgbGFiZWx7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2ZvbnQtd2VpZ2h0OjYwMH06aG9zdCAucGlja2VyLWlucHV0LXdyYXBwZXIgLnBpY2tlci1pbnB1dC1ob2xkZXJ7ZGlzcGxheTpmbGV4O2hlaWdodDozM3B4O2JvcmRlcjoxcHggc29saWQgI2JiYjtvdmVyZmxvdzpoaWRkZW47Ym9yZGVyLXJhZGl1czozcHg7YmFja2dyb3VuZC1jb2xvcjojZWVlfTpob3N0IC5waWNrZXItaW5wdXQtd3JhcHBlciAucGlja2VyLWlucHV0LWhvbGRlciAucGlja2VyLWNvbG9ye2ZsZXg6MCAwIDMxcHg7YmFja2dyb3VuZC1jb2xvcjojZmYwMzAwfTpob3N0IC5waWNrZXItaW5wdXQtd3JhcHBlciAucGlja2VyLWlucHV0LWhvbGRlciAucGlja2VyLWlucHV0e2ZsZXg6YXV0bztiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50fTpob3N0IC5waWNrZXItaW5wdXQtd3JhcHBlciAucGlja2VyLWlucHV0LWhvbGRlciAucGlja2VyLWlucHV0IGlucHV0e2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7Y29sb3I6IzI3MjcyNztmb250LWZhbWlseTptb25vc3BhY2U7Zm9udC1zaXplOjE0cHg7Ym9yZGVyOm5vbmU7b3V0bGluZTowO3BhZGRpbmc6OHB4IDJweCA4cHggOHB4O3dpZHRoOjEwMCV9Omhvc3QgLnBpY2tlci1pbnB1dC13cmFwcGVyIC5waWNrZXItaW5wdXQtaG9sZGVyIC5waWNrZXItc2F2ZS1zaWdue2ZsZXg6MCAwIDMxcHg7bGluZS1oZWlnaHQ6MzNweDt0ZXh0LWFsaWduOmNlbnRlcn06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJ7bWF4LWhlaWdodDowO292ZXJmbG93OmhpZGRlbjstd2Via2l0LXVzZXItc2VsZWN0Om5vbmU7LW1vei11c2VyLXNlbGVjdDpub25lOy1tcy11c2VyLXNlbGVjdDpub25lO3VzZXItc2VsZWN0Om5vbmU7ZGlzcGxheTpmbGV4O3RyYW5zaXRpb246bWF4LWhlaWdodCAuM3N9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyLm9wZW57bWFyZ2luLWJvdHRvbTo1cHg7bWF4LWhlaWdodDoxNjVweH06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0NvbG9yTGF5ZXJ7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoxMDt0b3A6MDtsZWZ0OjA7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTtib3gtc2hhZG93Omluc2V0IDAgMCAycHggMCByZ2JhKDAsMCwwLC41KTtwb2ludGVyLWV2ZW50czpub25lfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fU2xpZGFibGV7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTtjdXJzb3I6cG9pbnRlcn06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0RyYWdnZXJ7cG9zaXRpb246cmVsYXRpdmU7ei1pbmRleDozMDtib3R0b206LjlyZW07LXdlYmtpdC10cmFuc2Zvcm06bm9uZTt0cmFuc2Zvcm06bm9uZTtoZWlnaHQ6MThweDt3aWR0aDoxOHB4O21hcmdpbjowIGF1dG87LXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjtiYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjt3aWxsLWNoYW5nZTp0cmFuc2Zvcm07YmFja2dyb3VuZDowIDA7Ym9yZGVyOjNweCBzb2xpZCAjZmZmO2JveC1zaGFkb3c6MCAwIDAgMXB4IHJnYmEoNiw0NCw4MiwuMSksMCAycHggMTZweCByZ2JhKDMzLDQzLDU0LC4wOCksaW5zZXQgMCAwIDAgMXB4IHJnYmEoNiw0NCw4MiwuMSksMCAycHggMTZweCByZ2JhKDMzLDQzLDU0LC4wOCk7Ym9yZGVyLXJhZGl1czo1MCU7cG9pbnRlci1ldmVudHM6bm9uZTt0b3VjaC1hY3Rpb246bm9uZX06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX01haW5Db2xvcntiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudCg0NWRlZywjZGZlM2U4IDI1JSx0cmFuc3BhcmVudCAwKSxsaW5lYXItZ3JhZGllbnQoLTQ1ZGVnLCNkZmUzZTggMjUlLHRyYW5zcGFyZW50IDApLGxpbmVhci1ncmFkaWVudCg0NWRlZyx0cmFuc3BhcmVudCA3NSUsI2RmZTNlOCAwKSxsaW5lYXItZ3JhZGllbnQoLTQ1ZGVnLHRyYW5zcGFyZW50IDc1JSwjZGZlM2U4IDApO2JhY2tncm91bmQtc2l6ZToxLjZyZW0gMS42cmVtO2JhY2tncm91bmQtcG9zaXRpb246MCAwLDAgLjhyZW0sLjhyZW0gLS44cmVtLC0uOHJlbSAwO3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbjt3aWR0aDoxNjVweDtoZWlnaHQ6MTY1cHg7Ym9yZGVyLXJhZGl1czo0cHg7Y3Vyc29yOnBvaW50ZXJ9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19NYWluQ29sb3IgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19Db2xvckxheWVye2JveC1zaGFkb3c6aW5zZXQgMCAwIDAgMXB4IHJnYmEoNiw0NCw4MiwuMSksMCAycHggMTZweCByZ2JhKDMzLDQzLDU0LC4wOCk7Ym9yZGVyLXJhZGl1czo0cHh9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19NYWluQ29sb3IgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19EcmFnZ2Vye3JpZ2h0Oi45cmVtO21hcmdpbjowfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fTWFpbkNvbG9yOmFmdGVyLDpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fTWFpbkNvbG9yOmJlZm9yZXtjb250ZW50OlwiXCI7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoyMDt0b3A6MDtsZWZ0OjA7ZGlzcGxheTpibG9jaztoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO3BvaW50ZXItZXZlbnRzOm5vbmU7Ym9yZGVyLXJhZGl1czozcHh9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19NYWluQ29sb3I6YmVmb3Jle2JhY2tncm91bmQ6bGluZWFyLWdyYWRpZW50KDkwZGVnLCNmZmYsdHJhbnNwYXJlbnQpfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fTWFpbkNvbG9yOmFmdGVye2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KDBkZWcsIzAwMCx0cmFuc3BhcmVudCk7Ym94LXNoYWRvdzppbnNldCAwIDAgMCAxcHggcmdiYSg2LDQ0LDgyLC4xKSwwIDJweCAxNnB4IHJnYmEoMzMsNDMsNTQsLjA4KX06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0FscGhhUGlja2VyLDpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fSHVlUGlja2Vye3Bvc2l0aW9uOnJlbGF0aXZlO292ZXJmbG93OmhpZGRlbjtoZWlnaHQ6MTY1cHg7d2lkdGg6MjRweDttYXJnaW4tbGVmdDouOHJlbTtib3JkZXItd2lkdGg6M3B4O2JvcmRlci1yYWRpdXM6OHJlbTtwYWRkaW5nOjEzcHggMH06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0h1ZVBpY2tlcntiYWNrZ3JvdW5kOmxpbmVhci1ncmFkaWVudCh0byBib3R0b20scmVkIDAsI2ZmMCAyMSUsIzBmMCAzMyUsIzBmZiA1MCUsIzAwZiA2NyUsI2YwZiA4MyUscmVkIDEwMCUpO2JveC1zaGFkb3c6aW5zZXQgMCAwIDJweCAwIHJnYmEoMCwwLDAsLjUpfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fQWxwaGFQaWNrZXJ7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQoNDVkZWcsI2RmZTNlOCAyNSUsdHJhbnNwYXJlbnQgMCksbGluZWFyLWdyYWRpZW50KC00NWRlZywjZGZlM2U4IDI1JSx0cmFuc3BhcmVudCAwKSxsaW5lYXItZ3JhZGllbnQoNDVkZWcsdHJhbnNwYXJlbnQgNzUlLCNkZmUzZTggMCksbGluZWFyLWdyYWRpZW50KC00NWRlZyx0cmFuc3BhcmVudCA3NSUsI2RmZTNlOCAwKTtiYWNrZ3JvdW5kLXNpemU6MS42cmVtIDEuNnJlbTtiYWNrZ3JvdW5kLXBvc2l0aW9uOjAgMCwwIC44cmVtLC44cmVtIC0uOHJlbSwtLjhyZW0gMH06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0FscGhhUGlja2VyIC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fQ29sb3JMYXllcntib3JkZXItcmFkaXVzOjhyZW19Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyLm5vLWFscGhhIC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fTWFpbkNvbG9ye3dpZHRoOjIwMHB4fWBdLFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hUVGl0YW5Db2xvclBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKSBjb21wb25lbnRDbGljaygkZXZlbnQpIHtcbiAgICBpZighdGhpcy5waWNrZXJPcGVuKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmKHR5cGVvZiAkZXZlbnQucGF0aCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgbGV0IHBpY2tlckZvdW5kID0gZmFsc2U7XG4gICAgICAkZXZlbnQucGF0aC5ldmVyeShmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIGlmKFxuICAgICAgICAgIHR5cGVvZiBpdGVtLmNsYXNzTGlzdCAhPT0gXCJ1bmRlZmluZWRcIlxuICAgICAgICApIHtcbiAgICAgICAgICBpZihcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdwaWNrZXItaW5wdXQtaG9sZGVyJykgfHxcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCduZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcicpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBwaWNrZXJGb3VuZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9KTtcblxuICAgICAgaWYoIXBpY2tlckZvdW5kKSB7XG4gICAgICAgIHRoaXMuY2xvc2VQaWNrZXIoKTtcbiAgICAgIH1cblxuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgnYWxwaGEnKSBwdWJsaWMgYWxwaGE6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCdkZWJ1ZycpIHB1YmxpYyBkZWJ1ZzogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoJ2NvbG9yJykgcHVibGljIGNvbG9yOiBzdHJpbmcgPSAncmdiYSgyNTUsMjU1LDI1NSwwKSc7XG4gIEBJbnB1dCgndGl0bGUnKSBwdWJsaWMgdGl0bGU6IHN0cmluZyA9ICd0aXRsZSc7XG4gIEBJbnB1dCgnb3V0Rm9ybWF0JykgcHVibGljIG91dEZvcm1hdDogc3RyaW5nID0gJ2hleDYnO1xuICBASW5wdXQoJ2lucHV0Rm9ybWF0JykgcHVibGljIGlucHV0Rm9ybWF0OiBzdHJpbmcgPSAnaGV4Nic7XG4gIEBJbnB1dCgnYXZhaWxQYWxsZXRzJykgcHVibGljIGF2YWlsUGFsbGV0czogQXJyYXk8c3RyaW5nPiA9IFsncG9sYXJpcycsICdtYXRlcmlhbCddO1xuICBASW5wdXQoJ2N1c3RvbVBhbGxldHMnKSBwdWJsaWMgY3VzdG9tUGFsbGV0czogIEFycmF5PFBhbGV0dGU+ID0gW107XG4gIEBPdXRwdXQoJ2NvbG9yQ2hhbmdlZCcpIHB1YmxpYyBjb2xvckNoYW5nZWQ6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgQFZpZXdDaGlsZCgncGlja2VySW5wdXQnKSBwdWJsaWMgcGlja2VySW5wdXQ6IE5neFRUaXRhbkNvbG9yUGlja2VySW5wdXREaXJlY3RpdmU7XG5cbiAgQFZpZXdDaGlsZChOZ3hUVGl0YW5Db2xvclBpY2tlclBhbGV0dGVMaXN0Q29tcG9uZW50KSBwdWJsaWMgcGFsZXR0ZUxpc3Q6IE5neFRUaXRhbkNvbG9yUGlja2VyUGFsZXR0ZUxpc3RDb21wb25lbnQ7XG5cbiAgQFZpZXdDaGlsZCgnbWFpbkNvbG9yJykgcHVibGljIG1haW5Db2xvcjogTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvckRpcmVjdGl2ZTtcbiAgQFZpZXdDaGlsZCgnaHVlUGlja2VyJykgcHVibGljIGh1ZVBpY2tlcjogTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvckRpcmVjdGl2ZTtcbiAgQFZpZXdDaGlsZCgnYWxwaGFQaWNrZXInKSBwdWJsaWMgYWxwaGFQaWNrZXI6IE5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JEaXJlY3RpdmU7XG5cblxuICBwdWJsaWMgY29sb3JJbml0OiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBwaWNrZXJPcGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHVibGljIHBpY2tlclBhbGxldHM6IEFycmF5PFBhbGV0dGU+ID0gW107XG5cbiAgcHVibGljIGhzdmE6IEhTVkEgPSB7XG4gICAgaHVlOiAwLFxuICAgIHNhdHVyYXRpb246IDEwMCxcbiAgICB2YWx1ZTogMTAwLFxuICAgIGFscGhhOiAxXG4gIH07XG5cbiAgcHVibGljIGN1cnJlbnRDb2xvcjogc3RyaW5nID0gJ3JnYigyNTUsMCwwKSc7XG4gIHB1YmxpYyBjdXJyZW50Q29sb3JNYXg6IHN0cmluZyA9ICdyZ2JhKDI1NSwwLDAsMSknO1xuICBwdWJsaWMgY3VycmVudENvbG9yQWxwaGE6IHN0cmluZyA9ICdyZ2JhKDI1NSwwLDAsMSknO1xuICBwdWJsaWMgY3VycmVudENvbG9yQWxwaGFaZXJvOiBzdHJpbmcgPSAncmdiYSgyNTUsMCwwLDApJztcblxuICBwdWJsaWMgdXVpZDogc3RyaW5nID0gJ3BpY2tlci0nO1xuXG4gIHB1YmxpYyBhbGxvd2VkRm9ybWF0czogQXJyYXk8c3RyaW5nPiA9IFsnaGV4NicsICdoZXg4JywgJ3JnYicsICdyZ2JhJ107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGNvbG9yUGlja2VyU2VydmljZTogTmd4VFRpdGFuQ29sb3JQaWNrZXJTZXJ2aWNlLFxuICAgIHB1YmxpYyBjZHI6IENoYW5nZURldGVjdG9yUmVmXG4gICkge1xuICAgIHRoaXMudXVpZCA9IHRoaXMuY29sb3JQaWNrZXJTZXJ2aWNlLmdldFBpY2tlclV1aWQoKTtcblxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jb2xvclBpY2tlclNlcnZpY2UuZGVidWcgPSB0aGlzLmRlYnVnO1xuICAgIHRoaXMudmFsaWRhdGVJbnB1dFBhcmFtcygpO1xuICAgIHRoaXMuY29sb3JQaWNrZXJTZXJ2aWNlLnByZXBhcmVQaWNrZXJQYWxsZXRzKHRoaXMuYXZhaWxQYWxsZXRzLCB0aGlzLmN1c3RvbVBhbGxldHMsIHRoaXMpO1xuICAgIHRoaXMuY29sb3JQaWNrZXJTZXJ2aWNlLmNvbG9yVG9EYXRhKHRoaXMuY29sb3IsIHRoaXMpO1xuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuc2V0RHJhZ2dlc1RvQ3VycmVudENvbG9yKCk7XG4gIH1cblxuICBvcGVuUGlja2VyKCkge1xuICAgIHRoaXMucGlja2VyT3BlbiA9IHRydWU7XG4gICAgaWYodHlwZW9mIHRoaXMucGFsZXR0ZUxpc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLnBhbGV0dGVMaXN0LmNsb3NlUGFsZXR0ZSgpO1xuICAgIH1cbiAgICBpZih0eXBlb2YgdGhpcy5tYWluQ29sb3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLm1haW5Db2xvci5ldmVudHNTdWJzY2liZSgpO1xuICAgIH1cbiAgICBpZih0eXBlb2YgdGhpcy5odWVQaWNrZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLmh1ZVBpY2tlci5ldmVudHNTdWJzY2liZSgpO1xuICAgIH1cbiAgICBpZih0eXBlb2YgdGhpcy5hbHBoYVBpY2tlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMuYWxwaGFQaWNrZXIuZXZlbnRzU3Vic2NpYmUoKTtcbiAgICB9XG4gIH1cblxuICBjbG9zZVBpY2tlcigpIHtcbiAgICBpZih0eXBlb2YgdGhpcy5tYWluQ29sb3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLm1haW5Db2xvci5ldmVudHNVblN1YnNjaWJlKCk7XG4gICAgfVxuICAgIGlmKHR5cGVvZiB0aGlzLmh1ZVBpY2tlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMuaHVlUGlja2VyLmV2ZW50c1VuU3Vic2NpYmUoKTtcbiAgICB9XG4gICAgaWYodHlwZW9mIHRoaXMuYWxwaGFQaWNrZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLmFscGhhUGlja2VyLmV2ZW50c1VuU3Vic2NpYmUoKTtcbiAgICB9XG4gICAgdGhpcy5waWNrZXJPcGVuID0gZmFsc2U7XG4gIH1cblxuICB2YWxpZGF0ZUlucHV0UGFyYW1zKCkge1xuICAgIGlmKHRoaXMuYWxsb3dlZEZvcm1hdHMuaW5kZXhPZih0aGlzLm91dEZvcm1hdCkgPT09IC0xKSB7XG4gICAgICB0aGlzLm91dEZvcm1hdCA9ICdoZXg2JztcbiAgICAgIGNvbnNvbGUuZ3JvdXAoXCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlclwiKTtcbiAgICAgIGNvbnNvbGUud2FybignW291dEZvcm1hdF0gbXVzdCBiZSBvbmUgb2YgdGhpcyAoJyArIHRoaXMuYWxsb3dlZEZvcm1hdHMuam9pbignLCcpICsgJyknKTtcbiAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgICB9XG4gICAgaWYodGhpcy5hbGxvd2VkRm9ybWF0cy5pbmRleE9mKHRoaXMuaW5wdXRGb3JtYXQpID09PSAtMSkge1xuICAgICAgdGhpcy5pbnB1dEZvcm1hdCA9IHRoaXMub3V0Rm9ybWF0ICsgJyc7XG4gICAgICBjb25zb2xlLmdyb3VwKFwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJcIik7XG4gICAgICBjb25zb2xlLndhcm4oJ1tpbnB1dEZvcm1hdF0gbXVzdCBiZSBvbmUgb2YgdGhpcyAoJyArIHRoaXMuYWxsb3dlZEZvcm1hdHMuam9pbignLCcpICsgJyknKTtcbiAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgICB9XG4gIH1cblxuXG4gIGlucHV0Q29sb3JDaGFuZ2UoY29sb3I6IHN0cmluZykge1xuICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbiAgICB0aGlzLmNvbG9yUGlja2VyU2VydmljZS5jb2xvclRvRGF0YSh0aGlzLmNvbG9yLCB0aGlzKTtcbiAgICB0aGlzLnNldERyYWdnZXNUb0N1cnJlbnRDb2xvcigpO1xuICB9XG5cbiAgdXBkYXRlUmV0dXJuQ29sb3IoKSB7XG4gICAgdGhpcy5jb2xvciA9IHRoaXMuY29sb3JQaWNrZXJTZXJ2aWNlLnByZXBhcmVSZXR1cm5Db2xvcih0aGlzLmhzdmEsIHRoaXMub3V0Rm9ybWF0KTtcblxuICAgIGlmKHRoaXMuY29sb3JJbml0KSB7XG4gICAgICB0aGlzLmNvbG9yQ2hhbmdlZC5lbWl0KHRoaXMuY29sb3IgKyAnJyk7XG4gICAgfVxuICAgIHRoaXMuY29sb3JJbml0ID0gdHJ1ZTtcbiAgfVxuXG5cbiAgc2V0SW5wdXRWYWx1ZSgpIHtcbiAgICBpZih0eXBlb2YgdGhpcy5waWNrZXJJbnB1dCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMucGlja2VySW5wdXQuc2V0SW5wdXRWYWx1ZShcbiAgICAgICAgdGhpcy5jb2xvclBpY2tlclNlcnZpY2UucHJlcGFyZVJldHVybkNvbG9yKHRoaXMuaHN2YSwgdGhpcy5pbnB1dEZvcm1hdClcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgc2V0RHJhZ2dlc1RvQ3VycmVudENvbG9yKCkge1xuXG4gICAgaWYodHlwZW9mIHRoaXMubWFpbkNvbG9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5tYWluQ29sb3Iuc2V0RHJhZ2dlcihcbiAgICAgICAge1xuICAgICAgICAgIHg6IHRoaXMuaHN2YS5zYXR1cmF0aW9uLFxuICAgICAgICAgIHk6IDEwMCAtIHRoaXMuaHN2YS52YWx1ZVxuICAgICAgICB9XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmKHR5cGVvZiB0aGlzLmh1ZVBpY2tlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMuaHVlUGlja2VyLnNldERyYWdnZXIoe3g6IDAsIHk6IE1hdGgucm91bmQodGhpcy5oc3ZhLmh1ZSAqIDEwMCAvIDM2MCl9KTtcbiAgICB9XG5cbiAgICBpZih0eXBlb2YgdGhpcy5hbHBoYVBpY2tlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdGhpcy5hbHBoYSkge1xuICAgICAgdGhpcy5hbHBoYVBpY2tlci5zZXREcmFnZ2VyKHt4OiAwLCB5OiAxMDAgLSAodGhpcy5oc3ZhLmFscGhhICogMTAwKX0pO1xuICAgIH1cblxuICB9XG5cbn1cbiJdfQ==