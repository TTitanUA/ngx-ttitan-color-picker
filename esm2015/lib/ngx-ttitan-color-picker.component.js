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
        this.options = {};
        this.color = '#ffffff';
        this.title = '';
        this.colorChange = new EventEmitter();
        this._pickerConfig = {
            alpha: false,
            pickerShow: false,
            noHide: false,
            debug: false,
            outFormat: 'hex6',
            inputFormat: 'hex6',
            availPallets: ['polaris', 'material'],
            customPallets: [],
        };
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
        this.alphaFormats = ['hex8', 'rgba'];
        this.oldColor = '';
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
        if (this._pickerConfig.noHide) {
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
        this.validateInputParams();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if ('options' in changes) {
            this.validateInputParams();
        }
        if ('color' in changes) {
            if (changes["color"].currentValue !== changes["color"].previousValue) {
                setTimeout(() => {
                    this.colorPickerService.colorToData(this.color, this);
                    this.setDraggersToCurrentColor();
                }, 1);
            }
        }
    }
    /**
     * @return {?}
     */
    openPicker() {
        this.pickerOpen = true;
        if (typeof this.paletteList !== 'undefined') {
            this.paletteList.closePalette();
        }
    }
    /**
     * @return {?}
     */
    closePicker() {
        this.pickerOpen = false;
        this.cdr.detectChanges();
    }
    /**
     * @return {?}
     */
    validateInputParams() {
        if ('inputFormat' in this.options) {
            if (this.allowedFormats.indexOf(this.options.outFormat) === -1) {
                this._pickerConfig.outFormat = 'hex6';
                console.group("ngx-ttitan-color-picker");
                console.warn('[outFormat] must be one of this (' + this.allowedFormats.join(',') + ')');
                console.groupEnd();
            }
            else {
                this._pickerConfig.outFormat = this.options.outFormat + '';
            }
        }
        if ('inputFormat' in this.options) {
            if (this.allowedFormats.indexOf(this.options.inputFormat) === -1) {
                this._pickerConfig.inputFormat = this._pickerConfig.outFormat + '';
                console.group("ngx-ttitan-color-picker");
                console.warn('[inputFormat] must be one of this (' + this.allowedFormats.join(',') + ')');
                console.groupEnd();
            }
            else {
                this._pickerConfig.inputFormat = this.options.inputFormat + '';
            }
        }
        if ('pickerShow' in this.options) {
            if (this._pickerConfig.pickerShow !== this.options.pickerShow) {
                this._pickerConfig.pickerShow = !this._pickerConfig.pickerShow;
            }
        }
        if ('noHide' in this.options) {
            if (this._pickerConfig.noHide !== this.options.noHide) {
                this._pickerConfig.noHide = !this._pickerConfig.noHide;
            }
        }
        if ('debug' in this.options) {
            if (this._pickerConfig.debug !== this.options.debug) {
                this._pickerConfig.debug = !this._pickerConfig.debug;
            }
        }
        if ('availPallets' in this.options) {
            this._pickerConfig.availPallets = this.options.availPallets.filter(function () { return true; });
        }
        if ('customPallets' in this.options) {
            this._pickerConfig.customPallets = this.options.customPallets.filter(function () { return true; });
        }
        this.colorPickerService.preparePickerPallets(this._pickerConfig.availPallets, this._pickerConfig.customPallets, this);
        this._pickerConfig.alpha = this.alphaFormats.indexOf(this._pickerConfig.outFormat) !== -1;
        if (this._pickerConfig.pickerShow) {
            this.openPicker();
        }
        this.cdr.detectChanges();
    }
    /**
     * @param {?} color
     * @return {?}
     */
    inputColorChange(color) {
        this.color = color;
        this.colorPickerService.colorToData(this.color, this);
        this.setDraggersToCurrentColor();
    }
    /**
     * @return {?}
     */
    updateReturnColor() {
        this.color = this.colorPickerService.prepareReturnColor(this.hsva, this._pickerConfig.outFormat);
        if (this.colorInit) {
            if (this.oldColor !== this.color) {
                this.oldColor = this.color + '';
                this.colorChange.emit(this.color + '');
            }
        }
        this.colorInit = true;
    }
    /**
     * @return {?}
     */
    setInputValue() {
        if (typeof this.pickerInput !== 'undefined') {
            this.pickerInput.setInputValue(this.colorPickerService.prepareReturnColor(this.hsva, this._pickerConfig.inputFormat));
        }
    }
    /**
     * @return {?}
     */
    setDraggersToCurrentColor() {
        if (typeof this.mainColor !== 'undefined') {
            this.mainColor.setDragger({
                x: this.hsva.saturation,
                y: 100 - this.hsva.value
            });
        }
        if (typeof this.huePicker !== 'undefined') {
            this.huePicker.setDragger({ x: 0, y: Math.round(this.hsva.hue * 100 / 360) });
        }
        if (typeof this.alphaPicker !== 'undefined' && this._pickerConfig.alpha) {
            this.alphaPicker.setDragger({ x: 0, y: 100 - (this.hsva.alpha * 100) });
        }
        this.cdr.detectChanges();
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
      *ngIf="_pickerConfig.debug"
    >
      {{color}}
    </div>
    <div class="picker-input-label" *ngIf="title !== ''">
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
          [format]="_pickerConfig.inputFormat"
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
  <div class="ngx-ttitan-color-picker" [ngClass]="{'no-alpha': !_pickerConfig.alpha, 'open': pickerOpen}">
    <div class="ngx-ttitan-color-picker__MainColor">
      <div class="ngx-ttitan-color-picker__ColorLayer" [ngStyle]="{backgroundColor: currentColorMax}" ></div>
      <div class="ngx-ttitan-color-picker__Slidable"
           libNgxTTitanColorPickerSelector
           #mainColor="libNgxTTitanColorPickerSelector"
           [context]="this"
           (change)="colorPickerService.saturationChange($event, this)"
      >
        <div class="ngx-ttitan-color-picker__Dragger"
             libNgxTTitanColorPickerDragger
             [context]="this"
             style="transform: translate3d(0px, 0px, 0px);"
        ></div>
      </div>
    </div>
    <div class="ngx-ttitan-color-picker__HuePicker">
      <div class="ngx-ttitan-color-picker__Slidable"
           libNgxTTitanColorPickerSelector
           #huePicker="libNgxTTitanColorPickerSelector"
           (change)="colorPickerService.hueChange($event, this)"
           [direction]="'vertical'"
           [context]="this"
      >
        <div class="ngx-ttitan-color-picker__Dragger"
             libNgxTTitanColorPickerDragger
             [pickerPad]="0"
             style=" transform: translate3d(0px, 0px, 0px);"
             [context]="this"
        ></div>
      </div>
    </div>
    <div class="ngx-ttitan-color-picker__AlphaPicker" *ngIf="_pickerConfig.alpha === true">
      <div class="ngx-ttitan-color-picker__ColorLayer"
           [ngStyle]="{background: 'linear-gradient(to top, ' + currentColorAlphaZero + '  18px, ' + currentColor + ' calc(100% - 18px)'}"
      ></div>
      <div class="ngx-ttitan-color-picker__Slidable"
           libNgxTTitanColorPickerSelector
           #alphaPicker="libNgxTTitanColorPickerSelector"
           (change)="colorPickerService.alphaChange($event, this)"
           [direction]="'vertical'"
           [context]="this"
      >
        <div class="ngx-ttitan-color-picker__Dragger"
             libNgxTTitanColorPickerDragger
             [pickerPad]="0" style=" transform: translate3d(0px, 0px, 0px);"
             [context]="this"
        ></div>
      </div>
    </div>
  </div>
  <lib-ngx-ttitan-color-picker-palette-list
    (change)="inputColorChange($event)"
    [pallets]="pickerPallets"
    [context]="this"
  ></lib-ngx-ttitan-color-picker-palette-list>
</div>

`,
                styles: [`:host *,:host :after,:host :before{box-sizing:border-box}:host .debug-output{width:100%;height:20px}:host .picker-input-wrapper{margin-bottom:6px}:host .picker-input-wrapper .picker-input-label{margin-bottom:6px}:host .picker-input-wrapper .picker-input-label label{text-transform:uppercase;font-weight:600}:host .picker-input-wrapper .picker-input-holder{display:flex;height:33px;border:1px solid #bbb;overflow:hidden;border-radius:3px;background-color:#eee}:host .picker-input-wrapper .picker-input-holder .picker-color{flex:0 0 31px;background-color:#ff0300}:host .picker-input-wrapper .picker-input-holder .picker-input{flex:auto;background-color:transparent}:host .picker-input-wrapper .picker-input-holder .picker-input input{background-color:transparent;color:#272727;font-family:monospace;font-size:14px;border:none;outline:0;padding:8px 2px 8px 8px;width:100%}:host .picker-input-wrapper .picker-input-holder .picker-save-sign{flex:0 0 31px;line-height:33px;text-align:center}:host .ngx-ttitan-color-picker{max-height:0;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:flex;transition:max-height .3s}:host .ngx-ttitan-color-picker.open{margin-bottom:5px;max-height:165px}:host .ngx-ttitan-color-picker__ColorLayer{position:absolute;z-index:10;top:0;left:0;height:100%;width:100%;box-shadow:inset 0 0 2px 0 rgba(0,0,0,.5);pointer-events:none}:host .ngx-ttitan-color-picker__Slidable{height:100%;width:100%;cursor:pointer}:host .ngx-ttitan-color-picker__Dragger{position:relative;z-index:30;bottom:.9rem;-webkit-transform:none;transform:none;height:18px;width:18px;margin:0 auto;-webkit-backface-visibility:hidden;backface-visibility:hidden;will-change:transform;background:0 0;border:3px solid #fff;box-shadow:0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08),inset 0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08);border-radius:50%;pointer-events:none;touch-action:none}:host .ngx-ttitan-color-picker__MainColor{background-image:linear-gradient(45deg,#dfe3e8 25%,transparent 0),linear-gradient(-45deg,#dfe3e8 25%,transparent 0),linear-gradient(45deg,transparent 75%,#dfe3e8 0),linear-gradient(-45deg,transparent 75%,#dfe3e8 0);background-size:1.6rem 1.6rem;background-position:0 0,0 .8rem,.8rem -.8rem,-.8rem 0;position:relative;overflow:hidden;flex:auto;border-radius:4px;cursor:pointer}:host .ngx-ttitan-color-picker__MainColor .ngx-ttitan-color-picker__ColorLayer{box-shadow:inset 0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08);border-radius:4px}:host .ngx-ttitan-color-picker__MainColor .ngx-ttitan-color-picker__Dragger{right:.9rem;margin:0}:host .ngx-ttitan-color-picker__MainColor:after,:host .ngx-ttitan-color-picker__MainColor:before{content:"";position:absolute;z-index:20;top:0;left:0;display:block;height:100%;width:100%;pointer-events:none;border-radius:3px}:host .ngx-ttitan-color-picker__MainColor:before{background:linear-gradient(90deg,#fff,transparent)}:host .ngx-ttitan-color-picker__MainColor:after{background-image:linear-gradient(0deg,#000,transparent);box-shadow:inset 0 0 0 1px rgba(6,44,82,.1),0 2px 16px rgba(33,43,54,.08)}:host .ngx-ttitan-color-picker__AlphaPicker,:host .ngx-ttitan-color-picker__HuePicker{position:relative;overflow:hidden;height:165px;width:24px;flex:0 0 24px;margin-left:.8rem;border-width:3px;border-radius:8rem;padding:13px 0}:host .ngx-ttitan-color-picker__HuePicker{background:linear-gradient(to bottom,red 0,#ff0 21%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%);box-shadow:inset 0 0 2px 0 rgba(0,0,0,.5)}:host .ngx-ttitan-color-picker__AlphaPicker{background-image:linear-gradient(45deg,#dfe3e8 25%,transparent 0),linear-gradient(-45deg,#dfe3e8 25%,transparent 0),linear-gradient(45deg,transparent 75%,#dfe3e8 0),linear-gradient(-45deg,transparent 75%,#dfe3e8 0);background-size:1.6rem 1.6rem;background-position:0 0,0 .8rem,.8rem -.8rem,-.8rem 0}:host .ngx-ttitan-color-picker__AlphaPicker .ngx-ttitan-color-picker__ColorLayer{border-radius:8rem}:host .ngx-ttitan-color-picker.no-alpha .ngx-ttitan-color-picker__MainColor{width:200px}`],
            },] },
];
/** @nocollapse */
NgxTTitanColorPickerComponent.ctorParameters = () => [
    { type: NgxTTitanColorPickerService },
    { type: ChangeDetectorRef }
];
NgxTTitanColorPickerComponent.propDecorators = {
    componentClick: [{ type: HostListener, args: ['click', ['$event'],] }],
    options: [{ type: Input, args: ['options',] }],
    color: [{ type: Input, args: ['color',] }],
    title: [{ type: Input, args: ['title',] }],
    colorChange: [{ type: Output, args: ['colorChange',] }],
    pickerInput: [{ type: ViewChild, args: ['pickerInput',] }],
    paletteList: [{ type: ViewChild, args: [NgxTTitanColorPickerPaletteListComponent,] }],
    mainColor: [{ type: ViewChild, args: ['mainColor',] }],
    huePicker: [{ type: ViewChild, args: ['huePicker',] }],
    alphaPicker: [{ type: ViewChild, args: ['alphaPicker',] }]
};
function NgxTTitanColorPickerComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NgxTTitanColorPickerComponent.prototype.options;
    /** @type {?} */
    NgxTTitanColorPickerComponent.prototype.color;
    /** @type {?} */
    NgxTTitanColorPickerComponent.prototype.title;
    /** @type {?} */
    NgxTTitanColorPickerComponent.prototype.colorChange;
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
    NgxTTitanColorPickerComponent.prototype._pickerConfig;
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
    NgxTTitanColorPickerComponent.prototype.alphaFormats;
    /** @type {?} */
    NgxTTitanColorPickerComponent.prototype.oldColor;
    /** @type {?} */
    NgxTTitanColorPickerComponent.prototype.colorPickerService;
    /** @type {?} */
    NgxTTitanColorPickerComponent.prototype.cdr;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXR0aXRhbi1jb2xvci1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXR0aXRhbi1jb2xvci1waWNrZXIvIiwic291cmNlcyI6WyJsaWIvbmd4LXR0aXRhbi1jb2xvci1waWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUNyRCxZQUFZLEVBQ1osWUFBWSxFQUFFLEtBQUssRUFDbkIsTUFBTSxFQUNOLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMscUNBQXFDLEVBQUMsTUFBTSw4Q0FBOEMsQ0FBQztBQUNuRyxPQUFPLEVBQUMsMkJBQTJCLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUM5RSxPQUFPLEVBQUMsa0NBQWtDLEVBQUMsTUFBTSwyQ0FBMkMsQ0FBQztBQUM3RixPQUFPLEVBQUMsd0NBQXdDLEVBQUMsTUFBTSx1RkFBdUYsQ0FBQztBQXNHL0ksTUFBTTs7Ozs7SUE0RUosWUFDUyxvQkFDQTtRQURBLHVCQUFrQixHQUFsQixrQkFBa0I7UUFDbEIsUUFBRyxHQUFILEdBQUc7dUJBM0NzQyxFQUFFO3FCQUNiLFNBQVM7cUJBQ1QsRUFBRTsyQkFDeUIsSUFBSSxZQUFZLEVBQVU7NkJBVXZEO1lBQ25DLEtBQUssRUFBRSxLQUFLO1lBQ1osVUFBVSxFQUFFLEtBQUs7WUFDakIsTUFBTSxFQUFFLEtBQUs7WUFDYixLQUFLLEVBQUUsS0FBSztZQUNaLFNBQVMsRUFBRSxNQUFNO1lBQ2pCLFdBQVcsRUFBRSxNQUFNO1lBQ25CLFlBQVksRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUM7WUFDckMsYUFBYSxFQUFHLEVBQUU7U0FDbkI7eUJBQzJCLEtBQUs7MEJBQ0osS0FBSzs2QkFDSyxFQUFFO29CQUNyQjtZQUNsQixHQUFHLEVBQUUsQ0FBQztZQUNOLFVBQVUsRUFBRSxHQUFHO1lB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c0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkluaXQsXG4gIE91dHB1dCwgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yRGlyZWN0aXZlfSBmcm9tIFwiLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1zZWxlY3Rvci5kaXJlY3RpdmVcIjtcbmltcG9ydCB7Tmd4VFRpdGFuQ29sb3JQaWNrZXJTZXJ2aWNlfSBmcm9tIFwiLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci5zZXJ2aWNlXCI7XG5pbXBvcnQge05neFRUaXRhbkNvbG9yUGlja2VySW5wdXREaXJlY3RpdmV9IGZyb20gXCIuL25neC10dGl0YW4tY29sb3ItcGlja2VyLWlucHV0LmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHtOZ3hUVGl0YW5Db2xvclBpY2tlclBhbGV0dGVMaXN0Q29tcG9uZW50fSBmcm9tIFwiLi9uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1wYWxldHRlLWxpc3Qvbmd4LXR0aXRhbi1jb2xvci1waWNrZXItcGFsZXR0ZS1saXN0LmNvbXBvbmVudFwiO1xuaW1wb3J0IHtIU1ZBLCBQYWxldHRlLCBQaWNrZXJDb25maWcsIFBpY2tlck9wdGlvbnN9IGZyb20gXCIuL25neC10dGl0YW4tY29sb3ItcGlja2VyLmludGVyZmFjZVwiO1xuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzZWxlY3RvcjogJ2xpYi1uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcicsXG4gIHRlbXBsYXRlOiBgPGRpdlxyXG4gIGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXItd3JhcHBlclwiXHJcbj5cclxuXHJcbiAgPGRpdiBjbGFzcz1cInBpY2tlci1pbnB1dC13cmFwcGVyXCI+XHJcbiAgICA8ZGl2XHJcbiAgICAgIFtuZ1N0eWxlXT1cIntiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yfVwiXHJcbiAgICAgIGNsYXNzPVwiZGVidWctb3V0cHV0XCJcclxuICAgICAgKm5nSWY9XCJfcGlja2VyQ29uZmlnLmRlYnVnXCJcclxuICAgID5cclxuICAgICAge3tjb2xvcn19XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItaW5wdXQtbGFiZWxcIiAqbmdJZj1cInRpdGxlICE9PSAnJ1wiPlxyXG4gICAgICA8bGFiZWwgW2Zvcl09XCJ1dWlkXCIgPnt7dGl0bGV9fTwvbGFiZWw+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItaW5wdXQtaG9sZGVyXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJwaWNrZXItY29sb3JcIiBbbmdTdHlsZV09XCJ7YmFja2dyb3VuZDogY3VycmVudENvbG9yQWxwaGF9XCI+XHJcblxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cInBpY2tlci1pbnB1dFwiPlxyXG4gICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJJbnB1dFxyXG4gICAgICAgICAgI3BpY2tlcklucHV0PVwibGliTmd4VFRpdGFuQ29sb3JQaWNrZXJJbnB1dFwiXHJcbiAgICAgICAgICAoaW5wdXRDaGFuZ2UpPVwiaW5wdXRDb2xvckNoYW5nZSgkZXZlbnQpXCJcclxuICAgICAgICAgIFtmb3JtYXRdPVwiX3BpY2tlckNvbmZpZy5pbnB1dEZvcm1hdFwiXHJcbiAgICAgICAgICBbaWRdPVwidXVpZFwiXHJcbiAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAoZm9jdXMpPVwib3BlblBpY2tlcigpXCJcclxuICAgICAgICAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPCEtLTxkaXYgY2xhc3M9XCJwaWNrZXItc2F2ZS1zaWduXCI+LS0+XHJcbiAgICAgIDwhLS1TLS0+XHJcbiAgICAgIDwhLS08L2Rpdj4tLT5cclxuICAgIDwvZGl2PlxyXG5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJcIiBbbmdDbGFzc109XCJ7J25vLWFscGhhJzogIV9waWNrZXJDb25maWcuYWxwaGEsICdvcGVuJzogcGlja2VyT3Blbn1cIj5cclxuICAgIDxkaXYgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fTWFpbkNvbG9yXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fQ29sb3JMYXllclwiIFtuZ1N0eWxlXT1cIntiYWNrZ3JvdW5kQ29sb3I6IGN1cnJlbnRDb2xvck1heH1cIiA+PC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fU2xpZGFibGVcIlxyXG4gICAgICAgICAgIGxpYk5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JcclxuICAgICAgICAgICAjbWFpbkNvbG9yPVwibGliTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvclwiXHJcbiAgICAgICAgICAgW2NvbnRleHRdPVwidGhpc1wiXHJcbiAgICAgICAgICAgKGNoYW5nZSk9XCJjb2xvclBpY2tlclNlcnZpY2Uuc2F0dXJhdGlvbkNoYW5nZSgkZXZlbnQsIHRoaXMpXCJcclxuICAgICAgPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fRHJhZ2dlclwiXHJcbiAgICAgICAgICAgICBsaWJOZ3hUVGl0YW5Db2xvclBpY2tlckRyYWdnZXJcclxuICAgICAgICAgICAgIFtjb250ZXh0XT1cInRoaXNcIlxyXG4gICAgICAgICAgICAgc3R5bGU9XCJ0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDBweCwgMHB4LCAwcHgpO1wiXHJcbiAgICAgICAgPjwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19IdWVQaWNrZXJcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19TbGlkYWJsZVwiXHJcbiAgICAgICAgICAgbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvclxyXG4gICAgICAgICAgICNodWVQaWNrZXI9XCJsaWJOZ3hUVGl0YW5Db2xvclBpY2tlclNlbGVjdG9yXCJcclxuICAgICAgICAgICAoY2hhbmdlKT1cImNvbG9yUGlja2VyU2VydmljZS5odWVDaGFuZ2UoJGV2ZW50LCB0aGlzKVwiXHJcbiAgICAgICAgICAgW2RpcmVjdGlvbl09XCIndmVydGljYWwnXCJcclxuICAgICAgICAgICBbY29udGV4dF09XCJ0aGlzXCJcclxuICAgICAgPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fRHJhZ2dlclwiXHJcbiAgICAgICAgICAgICBsaWJOZ3hUVGl0YW5Db2xvclBpY2tlckRyYWdnZXJcclxuICAgICAgICAgICAgIFtwaWNrZXJQYWRdPVwiMFwiXHJcbiAgICAgICAgICAgICBzdHlsZT1cIiB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDBweCwgMHB4LCAwcHgpO1wiXHJcbiAgICAgICAgICAgICBbY29udGV4dF09XCJ0aGlzXCJcclxuICAgICAgICA+PC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0FscGhhUGlja2VyXCIgKm5nSWY9XCJfcGlja2VyQ29uZmlnLmFscGhhID09PSB0cnVlXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJuZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fQ29sb3JMYXllclwiXHJcbiAgICAgICAgICAgW25nU3R5bGVdPVwie2JhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQodG8gdG9wLCAnICsgY3VycmVudENvbG9yQWxwaGFaZXJvICsgJyAgMThweCwgJyArIGN1cnJlbnRDb2xvciArICcgY2FsYygxMDAlIC0gMThweCknfVwiXHJcbiAgICAgID48L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm5neC10dGl0YW4tY29sb3ItcGlja2VyX19TbGlkYWJsZVwiXHJcbiAgICAgICAgICAgbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvclxyXG4gICAgICAgICAgICNhbHBoYVBpY2tlcj1cImxpYk5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JcIlxyXG4gICAgICAgICAgIChjaGFuZ2UpPVwiY29sb3JQaWNrZXJTZXJ2aWNlLmFscGhhQ2hhbmdlKCRldmVudCwgdGhpcylcIlxyXG4gICAgICAgICAgIFtkaXJlY3Rpb25dPVwiJ3ZlcnRpY2FsJ1wiXHJcbiAgICAgICAgICAgW2NvbnRleHRdPVwidGhpc1wiXHJcbiAgICAgID5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0RyYWdnZXJcIlxyXG4gICAgICAgICAgICAgbGliTmd4VFRpdGFuQ29sb3JQaWNrZXJEcmFnZ2VyXHJcbiAgICAgICAgICAgICBbcGlja2VyUGFkXT1cIjBcIiBzdHlsZT1cIiB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDBweCwgMHB4LCAwcHgpO1wiXHJcbiAgICAgICAgICAgICBbY29udGV4dF09XCJ0aGlzXCJcclxuICAgICAgICA+PC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbiAgPGxpYi1uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci1wYWxldHRlLWxpc3RcclxuICAgIChjaGFuZ2UpPVwiaW5wdXRDb2xvckNoYW5nZSgkZXZlbnQpXCJcclxuICAgIFtwYWxsZXRzXT1cInBpY2tlclBhbGxldHNcIlxyXG4gICAgW2NvbnRleHRdPVwidGhpc1wiXHJcbiAgPjwvbGliLW5neC10dGl0YW4tY29sb3ItcGlja2VyLXBhbGV0dGUtbGlzdD5cclxuPC9kaXY+XHJcblxyXG5gLFxuICBzdHlsZXM6IFtgOmhvc3QgKiw6aG9zdCA6YWZ0ZXIsOmhvc3QgOmJlZm9yZXtib3gtc2l6aW5nOmJvcmRlci1ib3h9Omhvc3QgLmRlYnVnLW91dHB1dHt3aWR0aDoxMDAlO2hlaWdodDoyMHB4fTpob3N0IC5waWNrZXItaW5wdXQtd3JhcHBlcnttYXJnaW4tYm90dG9tOjZweH06aG9zdCAucGlja2VyLWlucHV0LXdyYXBwZXIgLnBpY2tlci1pbnB1dC1sYWJlbHttYXJnaW4tYm90dG9tOjZweH06aG9zdCAucGlja2VyLWlucHV0LXdyYXBwZXIgLnBpY2tlci1pbnB1dC1sYWJlbCBsYWJlbHt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7Zm9udC13ZWlnaHQ6NjAwfTpob3N0IC5waWNrZXItaW5wdXQtd3JhcHBlciAucGlja2VyLWlucHV0LWhvbGRlcntkaXNwbGF5OmZsZXg7aGVpZ2h0OjMzcHg7Ym9yZGVyOjFweCBzb2xpZCAjYmJiO292ZXJmbG93OmhpZGRlbjtib3JkZXItcmFkaXVzOjNweDtiYWNrZ3JvdW5kLWNvbG9yOiNlZWV9Omhvc3QgLnBpY2tlci1pbnB1dC13cmFwcGVyIC5waWNrZXItaW5wdXQtaG9sZGVyIC5waWNrZXItY29sb3J7ZmxleDowIDAgMzFweDtiYWNrZ3JvdW5kLWNvbG9yOiNmZjAzMDB9Omhvc3QgLnBpY2tlci1pbnB1dC13cmFwcGVyIC5waWNrZXItaW5wdXQtaG9sZGVyIC5waWNrZXItaW5wdXR7ZmxleDphdXRvO2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnR9Omhvc3QgLnBpY2tlci1pbnB1dC13cmFwcGVyIC5waWNrZXItaW5wdXQtaG9sZGVyIC5waWNrZXItaW5wdXQgaW5wdXR7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtjb2xvcjojMjcyNzI3O2ZvbnQtZmFtaWx5Om1vbm9zcGFjZTtmb250LXNpemU6MTRweDtib3JkZXI6bm9uZTtvdXRsaW5lOjA7cGFkZGluZzo4cHggMnB4IDhweCA4cHg7d2lkdGg6MTAwJX06aG9zdCAucGlja2VyLWlucHV0LXdyYXBwZXIgLnBpY2tlci1pbnB1dC1ob2xkZXIgLnBpY2tlci1zYXZlLXNpZ257ZmxleDowIDAgMzFweDtsaW5lLWhlaWdodDozM3B4O3RleHQtYWxpZ246Y2VudGVyfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcnttYXgtaGVpZ2h0OjA7b3ZlcmZsb3c6aGlkZGVuOy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZTtkaXNwbGF5OmZsZXg7dHJhbnNpdGlvbjptYXgtaGVpZ2h0IC4zc306aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXIub3BlbnttYXJnaW4tYm90dG9tOjVweDttYXgtaGVpZ2h0OjE2NXB4fTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fQ29sb3JMYXllcntwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjEwO3RvcDowO2xlZnQ6MDtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO2JveC1zaGFkb3c6aW5zZXQgMCAwIDJweCAwIHJnYmEoMCwwLDAsLjUpO3BvaW50ZXItZXZlbnRzOm5vbmV9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19TbGlkYWJsZXtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO2N1cnNvcjpwb2ludGVyfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fRHJhZ2dlcntwb3NpdGlvbjpyZWxhdGl2ZTt6LWluZGV4OjMwO2JvdHRvbTouOXJlbTstd2Via2l0LXRyYW5zZm9ybTpub25lO3RyYW5zZm9ybTpub25lO2hlaWdodDoxOHB4O3dpZHRoOjE4cHg7bWFyZ2luOjAgYXV0bzstd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuO2JhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuO3dpbGwtY2hhbmdlOnRyYW5zZm9ybTtiYWNrZ3JvdW5kOjAgMDtib3JkZXI6M3B4IHNvbGlkICNmZmY7Ym94LXNoYWRvdzowIDAgMCAxcHggcmdiYSg2LDQ0LDgyLC4xKSwwIDJweCAxNnB4IHJnYmEoMzMsNDMsNTQsLjA4KSxpbnNldCAwIDAgMCAxcHggcmdiYSg2LDQ0LDgyLC4xKSwwIDJweCAxNnB4IHJnYmEoMzMsNDMsNTQsLjA4KTtib3JkZXItcmFkaXVzOjUwJTtwb2ludGVyLWV2ZW50czpub25lO3RvdWNoLWFjdGlvbjpub25lfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fTWFpbkNvbG9ye2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KDQ1ZGVnLCNkZmUzZTggMjUlLHRyYW5zcGFyZW50IDApLGxpbmVhci1ncmFkaWVudCgtNDVkZWcsI2RmZTNlOCAyNSUsdHJhbnNwYXJlbnQgMCksbGluZWFyLWdyYWRpZW50KDQ1ZGVnLHRyYW5zcGFyZW50IDc1JSwjZGZlM2U4IDApLGxpbmVhci1ncmFkaWVudCgtNDVkZWcsdHJhbnNwYXJlbnQgNzUlLCNkZmUzZTggMCk7YmFja2dyb3VuZC1zaXplOjEuNnJlbSAxLjZyZW07YmFja2dyb3VuZC1wb3NpdGlvbjowIDAsMCAuOHJlbSwuOHJlbSAtLjhyZW0sLS44cmVtIDA7cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6aGlkZGVuO2ZsZXg6YXV0bztib3JkZXItcmFkaXVzOjRweDtjdXJzb3I6cG9pbnRlcn06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX01haW5Db2xvciAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0NvbG9yTGF5ZXJ7Ym94LXNoYWRvdzppbnNldCAwIDAgMCAxcHggcmdiYSg2LDQ0LDgyLC4xKSwwIDJweCAxNnB4IHJnYmEoMzMsNDMsNTQsLjA4KTtib3JkZXItcmFkaXVzOjRweH06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX01haW5Db2xvciAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0RyYWdnZXJ7cmlnaHQ6LjlyZW07bWFyZ2luOjB9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19NYWluQ29sb3I6YWZ0ZXIsOmhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19NYWluQ29sb3I6YmVmb3Jle2NvbnRlbnQ6XCJcIjtwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjIwO3RvcDowO2xlZnQ6MDtkaXNwbGF5OmJsb2NrO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7cG9pbnRlci1ldmVudHM6bm9uZTtib3JkZXItcmFkaXVzOjNweH06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX01haW5Db2xvcjpiZWZvcmV7YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoOTBkZWcsI2ZmZix0cmFuc3BhcmVudCl9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19NYWluQ29sb3I6YWZ0ZXJ7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQoMGRlZywjMDAwLHRyYW5zcGFyZW50KTtib3gtc2hhZG93Omluc2V0IDAgMCAwIDFweCByZ2JhKDYsNDQsODIsLjEpLDAgMnB4IDE2cHggcmdiYSgzMyw0Myw1NCwuMDgpfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlcl9fQWxwaGFQaWNrZXIsOmhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19IdWVQaWNrZXJ7cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6aGlkZGVuO2hlaWdodDoxNjVweDt3aWR0aDoyNHB4O2ZsZXg6MCAwIDI0cHg7bWFyZ2luLWxlZnQ6LjhyZW07Ym9yZGVyLXdpZHRoOjNweDtib3JkZXItcmFkaXVzOjhyZW07cGFkZGluZzoxM3B4IDB9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19IdWVQaWNrZXJ7YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLHJlZCAwLCNmZjAgMjElLCMwZjAgMzMlLCMwZmYgNTAlLCMwMGYgNjclLCNmMGYgODMlLHJlZCAxMDAlKTtib3gtc2hhZG93Omluc2V0IDAgMCAycHggMCByZ2JhKDAsMCwwLC41KX06aG9zdCAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0FscGhhUGlja2Vye2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KDQ1ZGVnLCNkZmUzZTggMjUlLHRyYW5zcGFyZW50IDApLGxpbmVhci1ncmFkaWVudCgtNDVkZWcsI2RmZTNlOCAyNSUsdHJhbnNwYXJlbnQgMCksbGluZWFyLWdyYWRpZW50KDQ1ZGVnLHRyYW5zcGFyZW50IDc1JSwjZGZlM2U4IDApLGxpbmVhci1ncmFkaWVudCgtNDVkZWcsdHJhbnNwYXJlbnQgNzUlLCNkZmUzZTggMCk7YmFja2dyb3VuZC1zaXplOjEuNnJlbSAxLjZyZW07YmFja2dyb3VuZC1wb3NpdGlvbjowIDAsMCAuOHJlbSwuOHJlbSAtLjhyZW0sLS44cmVtIDB9Omhvc3QgLm5neC10dGl0YW4tY29sb3ItcGlja2VyX19BbHBoYVBpY2tlciAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX0NvbG9yTGF5ZXJ7Ym9yZGVyLXJhZGl1czo4cmVtfTpob3N0IC5uZ3gtdHRpdGFuLWNvbG9yLXBpY2tlci5uby1hbHBoYSAubmd4LXR0aXRhbi1jb2xvci1waWNrZXJfX01haW5Db2xvcnt3aWR0aDoyMDBweH1gXSxcbn0pXG5leHBvcnQgY2xhc3MgTmd4VFRpdGFuQ29sb3JQaWNrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKSBjb21wb25lbnRDbGljaygkZXZlbnQpIHtcbiAgICBpZighdGhpcy5waWNrZXJPcGVuKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmKHRoaXMuX3BpY2tlckNvbmZpZy5ub0hpZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYodHlwZW9mICRldmVudC5wYXRoICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBsZXQgcGlja2VyRm91bmQgPSBmYWxzZTtcbiAgICAgICRldmVudC5wYXRoLmV2ZXJ5KGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgaWYoXG4gICAgICAgICAgdHlwZW9mIGl0ZW0uY2xhc3NMaXN0ICE9PSBcInVuZGVmaW5lZFwiXG4gICAgICAgICkge1xuICAgICAgICAgIGlmKFxuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ3BpY2tlci1pbnB1dC1ob2xkZXInKSB8fFxuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ25neC10dGl0YW4tY29sb3ItcGlja2VyJylcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHBpY2tlckZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0pO1xuXG4gICAgICBpZighcGlja2VyRm91bmQpIHtcblxuICAgICAgICB0aGlzLmNsb3NlUGlja2VyKCk7XG4gICAgICB9XG5cbiAgICB9XG4gIH1cblxuICBASW5wdXQoJ29wdGlvbnMnKSBwdWJsaWMgb3B0aW9uczogUGlja2VyT3B0aW9ucyA9IHt9O1xuICBASW5wdXQoJ2NvbG9yJykgcHVibGljIGNvbG9yOiBzdHJpbmcgPSAnI2ZmZmZmZic7XG4gIEBJbnB1dCgndGl0bGUnKSBwdWJsaWMgdGl0bGU6IHN0cmluZyA9ICcnO1xuICBAT3V0cHV0KCdjb2xvckNoYW5nZScpIHB1YmxpYyBjb2xvckNoYW5nZTogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuXG4gIEBWaWV3Q2hpbGQoJ3BpY2tlcklucHV0JykgcHVibGljIHBpY2tlcklucHV0OiBOZ3hUVGl0YW5Db2xvclBpY2tlcklucHV0RGlyZWN0aXZlO1xuICBAVmlld0NoaWxkKE5neFRUaXRhbkNvbG9yUGlja2VyUGFsZXR0ZUxpc3RDb21wb25lbnQpIHB1YmxpYyBwYWxldHRlTGlzdDogTmd4VFRpdGFuQ29sb3JQaWNrZXJQYWxldHRlTGlzdENvbXBvbmVudDtcbiAgQFZpZXdDaGlsZCgnbWFpbkNvbG9yJykgcHVibGljIG1haW5Db2xvcjogTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvckRpcmVjdGl2ZTtcbiAgQFZpZXdDaGlsZCgnaHVlUGlja2VyJykgcHVibGljIGh1ZVBpY2tlcjogTmd4VFRpdGFuQ29sb3JQaWNrZXJTZWxlY3RvckRpcmVjdGl2ZTtcbiAgQFZpZXdDaGlsZCgnYWxwaGFQaWNrZXInKSBwdWJsaWMgYWxwaGFQaWNrZXI6IE5neFRUaXRhbkNvbG9yUGlja2VyU2VsZWN0b3JEaXJlY3RpdmU7XG5cblxuICBwdWJsaWMgX3BpY2tlckNvbmZpZzogUGlja2VyQ29uZmlnID0ge1xuICAgIGFscGhhOiBmYWxzZSxcbiAgICBwaWNrZXJTaG93OiBmYWxzZSxcbiAgICBub0hpZGU6IGZhbHNlLFxuICAgIGRlYnVnOiBmYWxzZSxcbiAgICBvdXRGb3JtYXQ6ICdoZXg2JyxcbiAgICBpbnB1dEZvcm1hdDogJ2hleDYnLFxuICAgIGF2YWlsUGFsbGV0czogWydwb2xhcmlzJywgJ21hdGVyaWFsJ10sXG4gICAgY3VzdG9tUGFsbGV0czogIFtdLFxuICB9O1xuICBwdWJsaWMgY29sb3JJbml0OiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBwaWNrZXJPcGVuOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBwaWNrZXJQYWxsZXRzOiBBcnJheTxQYWxldHRlPiA9IFtdO1xuICBwdWJsaWMgaHN2YTogSFNWQSA9IHtcbiAgICBodWU6IDAsXG4gICAgc2F0dXJhdGlvbjogMTAwLFxuICAgIHZhbHVlOiAxMDAsXG4gICAgYWxwaGE6IDFcbiAgfTtcbiAgcHVibGljIGN1cnJlbnRDb2xvcjogc3RyaW5nID0gJ3JnYigyNTUsMCwwKSc7XG4gIHB1YmxpYyBjdXJyZW50Q29sb3JNYXg6IHN0cmluZyA9ICdyZ2JhKDI1NSwwLDAsMSknO1xuICBwdWJsaWMgY3VycmVudENvbG9yQWxwaGE6IHN0cmluZyA9ICdyZ2JhKDI1NSwwLDAsMSknO1xuICBwdWJsaWMgY3VycmVudENvbG9yQWxwaGFaZXJvOiBzdHJpbmcgPSAncmdiYSgyNTUsMCwwLDApJztcbiAgcHVibGljIHV1aWQ6IHN0cmluZyA9ICdwaWNrZXItJztcbiAgcHVibGljIGFsbG93ZWRGb3JtYXRzOiBBcnJheTxzdHJpbmc+ID0gWydoZXg2JywgJ2hleDgnLCAncmdiJywgJ3JnYmEnXTtcbiAgcHVibGljIGFscGhhRm9ybWF0czogQXJyYXk8c3RyaW5nPiA9IFsnaGV4OCcsICdyZ2JhJ107XG4gIHB1YmxpYyBvbGRDb2xvcjogc3RyaW5nID0gJyc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGNvbG9yUGlja2VyU2VydmljZTogTmd4VFRpdGFuQ29sb3JQaWNrZXJTZXJ2aWNlLFxuICAgIHB1YmxpYyBjZHI6IENoYW5nZURldGVjdG9yUmVmXG4gICkge1xuICAgIHRoaXMudXVpZCA9IHRoaXMuY29sb3JQaWNrZXJTZXJ2aWNlLmdldFBpY2tlclV1aWQoKTtcblxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy52YWxpZGF0ZUlucHV0UGFyYW1zKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYoJ29wdGlvbnMnIGluIGNoYW5nZXMpIHtcbiAgICAgIHRoaXMudmFsaWRhdGVJbnB1dFBhcmFtcygpO1xuICAgIH1cbiAgICBpZignY29sb3InIGluIGNoYW5nZXMpIHtcbiAgICAgIGlmKGNoYW5nZXMuY29sb3IuY3VycmVudFZhbHVlICE9PSBjaGFuZ2VzLmNvbG9yLnByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5jb2xvclBpY2tlclNlcnZpY2UuY29sb3JUb0RhdGEodGhpcy5jb2xvciwgdGhpcyk7XG4gICAgICAgICAgdGhpcy5zZXREcmFnZ2Vyc1RvQ3VycmVudENvbG9yKCk7XG4gICAgICAgIH0sIDEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9wZW5QaWNrZXIoKSB7XG4gICAgdGhpcy5waWNrZXJPcGVuID0gdHJ1ZTtcbiAgICBpZih0eXBlb2YgdGhpcy5wYWxldHRlTGlzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMucGFsZXR0ZUxpc3QuY2xvc2VQYWxldHRlKCk7XG4gICAgfVxuICB9XG5cblxuICBjbG9zZVBpY2tlcigpIHtcbiAgICB0aGlzLnBpY2tlck9wZW4gPSBmYWxzZTtcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICB2YWxpZGF0ZUlucHV0UGFyYW1zKCkge1xuXG4gICAgaWYoJ2lucHV0Rm9ybWF0JyBpbiB0aGlzLm9wdGlvbnMpIHtcbiAgICAgIGlmKHRoaXMuYWxsb3dlZEZvcm1hdHMuaW5kZXhPZih0aGlzLm9wdGlvbnMub3V0Rm9ybWF0KSA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy5fcGlja2VyQ29uZmlnLm91dEZvcm1hdCA9ICdoZXg2JztcbiAgICAgICAgY29uc29sZS5ncm91cChcIm5neC10dGl0YW4tY29sb3ItcGlja2VyXCIpO1xuICAgICAgICBjb25zb2xlLndhcm4oJ1tvdXRGb3JtYXRdIG11c3QgYmUgb25lIG9mIHRoaXMgKCcgKyB0aGlzLmFsbG93ZWRGb3JtYXRzLmpvaW4oJywnKSArICcpJyk7XG4gICAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3BpY2tlckNvbmZpZy5vdXRGb3JtYXQgPSB0aGlzLm9wdGlvbnMub3V0Rm9ybWF0ICsgJyc7XG4gICAgICB9XG4gICAgfVxuICAgIGlmKCdpbnB1dEZvcm1hdCcgaW4gdGhpcy5vcHRpb25zKSB7XG4gICAgICBpZih0aGlzLmFsbG93ZWRGb3JtYXRzLmluZGV4T2YodGhpcy5vcHRpb25zLmlucHV0Rm9ybWF0KSA9PT0gLTEpIHtcbiAgICAgICAgdGhpcy5fcGlja2VyQ29uZmlnLmlucHV0Rm9ybWF0ID0gdGhpcy5fcGlja2VyQ29uZmlnLm91dEZvcm1hdCArICcnO1xuICAgICAgICBjb25zb2xlLmdyb3VwKFwibmd4LXR0aXRhbi1jb2xvci1waWNrZXJcIik7XG4gICAgICAgIGNvbnNvbGUud2FybignW2lucHV0Rm9ybWF0XSBtdXN0IGJlIG9uZSBvZiB0aGlzICgnICsgdGhpcy5hbGxvd2VkRm9ybWF0cy5qb2luKCcsJykgKyAnKScpO1xuICAgICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9waWNrZXJDb25maWcuaW5wdXRGb3JtYXQgPSB0aGlzLm9wdGlvbnMuaW5wdXRGb3JtYXQgKyAnJztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoJ3BpY2tlclNob3cnIGluIHRoaXMub3B0aW9ucykge1xuICAgICAgaWYodGhpcy5fcGlja2VyQ29uZmlnLnBpY2tlclNob3cgIT09IHRoaXMub3B0aW9ucy5waWNrZXJTaG93KSB7XG4gICAgICAgIHRoaXMuX3BpY2tlckNvbmZpZy5waWNrZXJTaG93ID0gIXRoaXMuX3BpY2tlckNvbmZpZy5waWNrZXJTaG93O1xuICAgICAgfVxuICAgIH1cbiAgICBpZignbm9IaWRlJyBpbiB0aGlzLm9wdGlvbnMpIHtcbiAgICAgIGlmKHRoaXMuX3BpY2tlckNvbmZpZy5ub0hpZGUgIT09IHRoaXMub3B0aW9ucy5ub0hpZGUpIHtcbiAgICAgICAgdGhpcy5fcGlja2VyQ29uZmlnLm5vSGlkZSA9ICF0aGlzLl9waWNrZXJDb25maWcubm9IaWRlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZignZGVidWcnIGluIHRoaXMub3B0aW9ucykge1xuICAgICAgaWYodGhpcy5fcGlja2VyQ29uZmlnLmRlYnVnICE9PSB0aGlzLm9wdGlvbnMuZGVidWcpIHtcbiAgICAgICAgdGhpcy5fcGlja2VyQ29uZmlnLmRlYnVnID0gIXRoaXMuX3BpY2tlckNvbmZpZy5kZWJ1ZztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoJ2F2YWlsUGFsbGV0cycgaW4gdGhpcy5vcHRpb25zKSB7XG4gICAgICB0aGlzLl9waWNrZXJDb25maWcuYXZhaWxQYWxsZXRzID0gdGhpcy5vcHRpb25zLmF2YWlsUGFsbGV0cy5maWx0ZXIoZnVuY3Rpb24oKXtyZXR1cm4gdHJ1ZTt9KTtcbiAgICB9XG4gICAgaWYoJ2N1c3RvbVBhbGxldHMnIGluIHRoaXMub3B0aW9ucykge1xuICAgICAgdGhpcy5fcGlja2VyQ29uZmlnLmN1c3RvbVBhbGxldHMgPSB0aGlzLm9wdGlvbnMuY3VzdG9tUGFsbGV0cy5maWx0ZXIoZnVuY3Rpb24oKXtyZXR1cm4gdHJ1ZTt9KTtcbiAgICB9XG5cbiAgICB0aGlzLmNvbG9yUGlja2VyU2VydmljZS5wcmVwYXJlUGlja2VyUGFsbGV0cyh0aGlzLl9waWNrZXJDb25maWcuYXZhaWxQYWxsZXRzLCB0aGlzLl9waWNrZXJDb25maWcuY3VzdG9tUGFsbGV0cywgdGhpcyk7XG5cbiAgICB0aGlzLl9waWNrZXJDb25maWcuYWxwaGEgPSB0aGlzLmFscGhhRm9ybWF0cy5pbmRleE9mKHRoaXMuX3BpY2tlckNvbmZpZy5vdXRGb3JtYXQpICE9PSAtMTtcbiAgICBpZih0aGlzLl9waWNrZXJDb25maWcucGlja2VyU2hvdykge1xuICAgICAgdGhpcy5vcGVuUGlja2VyKCk7XG4gICAgfVxuICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcblxuICB9XG5cblxuICBpbnB1dENvbG9yQ2hhbmdlKGNvbG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgdGhpcy5jb2xvclBpY2tlclNlcnZpY2UuY29sb3JUb0RhdGEodGhpcy5jb2xvciwgdGhpcyk7XG4gICAgdGhpcy5zZXREcmFnZ2Vyc1RvQ3VycmVudENvbG9yKCk7XG4gIH1cblxuICB1cGRhdGVSZXR1cm5Db2xvcigpIHtcbiAgICB0aGlzLmNvbG9yID0gdGhpcy5jb2xvclBpY2tlclNlcnZpY2UucHJlcGFyZVJldHVybkNvbG9yKHRoaXMuaHN2YSwgdGhpcy5fcGlja2VyQ29uZmlnLm91dEZvcm1hdCk7XG5cbiAgICBpZih0aGlzLmNvbG9ySW5pdCkge1xuICAgICAgaWYodGhpcy5vbGRDb2xvciAhPT0gdGhpcy5jb2xvcikge1xuICAgICAgICB0aGlzLm9sZENvbG9yID0gdGhpcy5jb2xvciArICcnO1xuICAgICAgICB0aGlzLmNvbG9yQ2hhbmdlLmVtaXQodGhpcy5jb2xvciArICcnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jb2xvckluaXQgPSB0cnVlO1xuICB9XG5cblxuICBzZXRJbnB1dFZhbHVlKCkge1xuICAgIGlmKHR5cGVvZiB0aGlzLnBpY2tlcklucHV0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5waWNrZXJJbnB1dC5zZXRJbnB1dFZhbHVlKFxuICAgICAgICB0aGlzLmNvbG9yUGlja2VyU2VydmljZS5wcmVwYXJlUmV0dXJuQ29sb3IodGhpcy5oc3ZhLCB0aGlzLl9waWNrZXJDb25maWcuaW5wdXRGb3JtYXQpXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHNldERyYWdnZXJzVG9DdXJyZW50Q29sb3IoKSB7XG5cbiAgICBpZih0eXBlb2YgdGhpcy5tYWluQ29sb3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLm1haW5Db2xvci5zZXREcmFnZ2VyKFxuICAgICAgICB7XG4gICAgICAgICAgeDogdGhpcy5oc3ZhLnNhdHVyYXRpb24sXG4gICAgICAgICAgeTogMTAwIC0gdGhpcy5oc3ZhLnZhbHVlXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYodHlwZW9mIHRoaXMuaHVlUGlja2VyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5odWVQaWNrZXIuc2V0RHJhZ2dlcih7eDogMCwgeTogTWF0aC5yb3VuZCh0aGlzLmhzdmEuaHVlICogMTAwIC8gMzYwKX0pO1xuICAgIH1cblxuICAgIGlmKHR5cGVvZiB0aGlzLmFscGhhUGlja2VyICE9PSAndW5kZWZpbmVkJyAmJiB0aGlzLl9waWNrZXJDb25maWcuYWxwaGEpIHtcbiAgICAgIHRoaXMuYWxwaGFQaWNrZXIuc2V0RHJhZ2dlcih7eDogMCwgeTogMTAwIC0gKHRoaXMuaHN2YS5hbHBoYSAqIDEwMCl9KTtcbiAgICB9XG4gICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbn1cblxuIl19