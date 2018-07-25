import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component,
  EventEmitter,
  HostListener, Input, OnChanges, OnInit,
  Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import {NgxTTitanColorPickerSelectorDirective} from "./ngx-ttitan-color-picker-selector.directive";
import {NgxTTitanColorPickerService} from "./ngx-ttitan-color-picker.service";
import {NgxTTitanColorPickerInputDirective} from "./ngx-ttitan-color-picker-input.directive";
import {NgxTTitanColorPickerPaletteListComponent} from "./ngx-ttitan-color-picker-palette-list/ngx-ttitan-color-picker-palette-list.component";
import {HSVA, Palette, PickerConfig, PickerOptions} from "./ngx-ttitan-color-picker.interface";
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-ngx-ttitan-color-picker',
  templateUrl: './ngx-ttitan-color-picker.component.html',
  styleUrls: ['./ngx-ttitan-color-picker.component.scss'],
})
export class NgxTTitanColorPickerComponent implements OnInit, OnChanges {

  @HostListener('click', ['$event']) componentClick($event) {
    if(!this.pickerOpen) {
      return;
    }
    if(this._pickerConfig.noHide) {
      return;
    }
    if(typeof $event.path !== "undefined") {
      let pickerFound = false;
      $event.path.every(function(item) {
        if(
          typeof item.classList !== "undefined"
        ) {
          if(
            item.classList.contains('picker-input-holder') ||
            item.classList.contains('ngx-ttitan-color-picker')
          ) {
            pickerFound = true;
            return false;
          }
        }

        return true;
      });

      if(!pickerFound) {

        this.closePicker();
      }

    }
  }

  @Input('options') public options: PickerOptions = {};
  @Input('color') public color: string = '#ffffff';
  @Input('title') public title: string = '';
  @Output('colorChange') public colorChange: EventEmitter<string> = new EventEmitter<string>();


  @ViewChild('pickerInput') public pickerInput: NgxTTitanColorPickerInputDirective;
  @ViewChild(NgxTTitanColorPickerPaletteListComponent) public paletteList: NgxTTitanColorPickerPaletteListComponent;
  @ViewChild('mainColor') public mainColor: NgxTTitanColorPickerSelectorDirective;
  @ViewChild('huePicker') public huePicker: NgxTTitanColorPickerSelectorDirective;
  @ViewChild('alphaPicker') public alphaPicker: NgxTTitanColorPickerSelectorDirective;


  public _pickerConfig: PickerConfig = {
    alpha: false,
    pickerShow: false,
    noHide: false,
    debug: false,
    outFormat: 'hex6',
    inputFormat: 'hex6',
    availPallets: ['polaris', 'material'],
    customPallets:  [],
  };
  public colorInit: boolean = false;
  public pickerOpen: boolean = false;
  public pickerPallets: Array<Palette> = [];
  public hsva: HSVA = {
    hue: 0,
    saturation: 100,
    value: 100,
    alpha: 1
  };
  public currentColor: string = 'rgb(255,0,0)';
  public currentColorMax: string = 'rgba(255,0,0,1)';
  public currentColorAlpha: string = 'rgba(255,0,0,1)';
  public currentColorAlphaZero: string = 'rgba(255,0,0,0)';
  public uuid: string = 'picker-';
  public allowedFormats: Array<string> = ['hex6', 'hex8', 'rgb', 'rgba'];
  public alphaFormats: Array<string> = ['hex8', 'rgba'];
  public oldColor: string = '';

  constructor(
    public colorPickerService: NgxTTitanColorPickerService,
    public cdr: ChangeDetectorRef
  ) {
    this.uuid = this.colorPickerService.getPickerUuid();

  }

  ngOnInit() {
    this.validateInputParams();
  }

  ngOnChanges(changes: SimpleChanges) {
    if('options' in changes) {
      this.validateInputParams();
    }
    if('color' in changes) {
      if(changes.color.currentValue !== changes.color.previousValue) {
        setTimeout(() => {
          this.colorPickerService.colorToData(this.color, this);
          this.setDraggersToCurrentColor();
        }, 1);
      }
    }
  }

  openPicker() {
    this.pickerOpen = true;
    if(typeof this.paletteList !== 'undefined') {
      this.paletteList.closePalette();
    }
  }


  closePicker() {
    this.pickerOpen = false;
    this.cdr.detectChanges();
  }

  validateInputParams() {

    if('inputFormat' in this.options) {
      if(this.allowedFormats.indexOf(this.options.outFormat) === -1) {
        this._pickerConfig.outFormat = 'hex6';
        console.group("ngx-ttitan-color-picker");
        console.warn('[outFormat] must be one of this (' + this.allowedFormats.join(',') + ')');
        console.groupEnd();
      } else {
        this._pickerConfig.outFormat = this.options.outFormat + '';
      }
    }
    if('inputFormat' in this.options) {
      if(this.allowedFormats.indexOf(this.options.inputFormat) === -1) {
        this._pickerConfig.inputFormat = this._pickerConfig.outFormat + '';
        console.group("ngx-ttitan-color-picker");
        console.warn('[inputFormat] must be one of this (' + this.allowedFormats.join(',') + ')');
        console.groupEnd();
      } else {
        this._pickerConfig.inputFormat = this.options.inputFormat + '';
      }
    }
    if('pickerShow' in this.options) {
      if(this._pickerConfig.pickerShow !== this.options.pickerShow) {
        this._pickerConfig.pickerShow = !this._pickerConfig.pickerShow;
      }
    }
    if('noHide' in this.options) {
      if(this._pickerConfig.noHide !== this.options.noHide) {
        this._pickerConfig.noHide = !this._pickerConfig.noHide;
      }
    }
    if('debug' in this.options) {
      if(this._pickerConfig.debug !== this.options.debug) {
        this._pickerConfig.debug = !this._pickerConfig.debug;
      }
    }
    if('availPallets' in this.options) {
      this._pickerConfig.availPallets = this.options.availPallets.filter(function(){return true;});
    }
    if('customPallets' in this.options) {
      this._pickerConfig.customPallets = this.options.customPallets.filter(function(){return true;});
    }

    this.colorPickerService.preparePickerPallets(this._pickerConfig.availPallets, this._pickerConfig.customPallets, this);

    this._pickerConfig.alpha = this.alphaFormats.indexOf(this._pickerConfig.outFormat) !== -1;
    if(this._pickerConfig.pickerShow) {
      this.openPicker();
    }
    this.cdr.detectChanges();

  }


  inputColorChange(color: string) {
    this.color = color;
    this.colorPickerService.colorToData(this.color, this);
    this.setDraggersToCurrentColor();
  }

  updateReturnColor() {
    this.color = this.colorPickerService.prepareReturnColor(this.hsva, this._pickerConfig.outFormat);

    if(this.colorInit) {
      if(this.oldColor !== this.color) {
        this.oldColor = this.color + '';
        this.colorChange.emit(this.color + '');
      }
    }
    this.colorInit = true;
  }


  setInputValue() {
    if(typeof this.pickerInput !== 'undefined') {
      this.pickerInput.setInputValue(
        this.colorPickerService.prepareReturnColor(this.hsva, this._pickerConfig.inputFormat)
      );
    }
  }

  setDraggersToCurrentColor() {

    if(typeof this.mainColor !== 'undefined') {
      this.mainColor.setDragger(
        {
          x: this.hsva.saturation,
          y: 100 - this.hsva.value
        }
      );
    }

    if(typeof this.huePicker !== 'undefined') {
      this.huePicker.setDragger({x: 0, y: Math.round(this.hsva.hue * 100 / 360)});
    }

    if(typeof this.alphaPicker !== 'undefined' && this._pickerConfig.alpha) {
      this.alphaPicker.setDragger({x: 0, y: 100 - (this.hsva.alpha * 100)});
    }
    this.cdr.detectChanges();
  }

}

