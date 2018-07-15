import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, ElementRef,
  EventEmitter,
  HostListener, Input, OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {NgxTTitanColorPickerSelectorDirective} from "./ngx-ttitan-color-picker-selector.directive";
import {HSVA, NgxTTitanColorPickerService, Palette} from "./ngx-ttitan-color-picker.service";
import {NgxTTitanColorPickerInputDirective} from "./ngx-ttitan-color-picker-input.directive";
import {NgxTTitanColorPickerPaletteListComponent} from "./ngx-ttitan-color-picker-palette-list/ngx-ttitan-color-picker-palette-list.component";
//[ngStyle]="{background: 'linear-gradient(to top, ' + ngxTTitanColorPickerService.currentColor + ' 18px, rgb(255, 77, 255) calc(100% - 18px)'}"
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'lib-ngx-ttitan-color-picker',
  templateUrl: './ngx-ttitan-color-picker.component.html',
  styleUrls: ['./ngx-ttitan-color-picker.component.scss'],
})
export class NgxTTitanColorPickerComponent implements OnInit, AfterViewInit {

  @HostListener('click', ['$event']) componentClick($event) {
    if(!this.pickerOpen) {
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

  @Input('alpha') public alpha: boolean = false;
  @Input('debug') public debug: boolean = false;
  @Input('color') public color: string = 'rgba(255,255,255,0)';
  @Input('title') public title: string = 'title';
  @Input('outFormat') public outFormat: string = 'hex6';
  @Input('inputFormat') public inputFormat: string = 'hex6';
  @Input('availPallets') public availPallets: Array<string> = ['polaris', 'material'];
  @Input('customPallets') public customPallets:  Array<Palette> = [];
  @Output('colorChanged') public colorChanged: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('pickerInput') public pickerInput: NgxTTitanColorPickerInputDirective;

  @ViewChild(NgxTTitanColorPickerPaletteListComponent) public paletteList: NgxTTitanColorPickerPaletteListComponent;

  @ViewChild('mainColor') public mainColor: NgxTTitanColorPickerSelectorDirective;
  @ViewChild('huePicker') public huePicker: NgxTTitanColorPickerSelectorDirective;
  @ViewChild('alphaPicker') public alphaPicker: NgxTTitanColorPickerSelectorDirective;


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

  constructor(
    public colorPickerService: NgxTTitanColorPickerService,
    public cdr: ChangeDetectorRef
  ) {
    this.uuid = this.colorPickerService.getPickerUuid();

  }

  ngOnInit() {
    this.colorPickerService.debug = this.debug;
    this.validateInputParams();
    this.colorPickerService.preparePickerPallets(this.availPallets, this.customPallets, this);
    this.colorPickerService.colorToData(this.color, this);
    this.cdr.detectChanges();
  }


  ngAfterViewInit() {
    this.setDraggesToCurrentColor();
  }

  openPicker() {
    this.pickerOpen = true;
    if(typeof this.paletteList !== 'undefined') {
      this.paletteList.closePalette();
    }
    if(typeof this.mainColor !== 'undefined') {
      this.mainColor.eventsSubscibe();
    }
    if(typeof this.huePicker !== 'undefined') {
      this.huePicker.eventsSubscibe();
    }
    if(typeof this.alphaPicker !== 'undefined') {
      this.alphaPicker.eventsSubscibe();
    }
  }

  closePicker() {
    if(typeof this.mainColor !== 'undefined') {
      this.mainColor.eventsUnSubscibe();
    }
    if(typeof this.huePicker !== 'undefined') {
      this.huePicker.eventsUnSubscibe();
    }
    if(typeof this.alphaPicker !== 'undefined') {
      this.alphaPicker.eventsUnSubscibe();
    }
    this.pickerOpen = false;
  }

  validateInputParams() {
    if(this.allowedFormats.indexOf(this.outFormat) === -1) {
      this.outFormat = 'hex6';
      console.group("ngx-ttitan-color-picker");
      console.warn('[outFormat] must be one of this (' + this.allowedFormats.join(',') + ')');
      console.groupEnd();
    }
    if(this.allowedFormats.indexOf(this.inputFormat) === -1) {
      this.inputFormat = this.outFormat + '';
      console.group("ngx-ttitan-color-picker");
      console.warn('[inputFormat] must be one of this (' + this.allowedFormats.join(',') + ')');
      console.groupEnd();
    }
  }


  inputColorChange(color: string) {
    this.color = color;
    this.colorPickerService.colorToData(this.color, this);
    this.setDraggesToCurrentColor();
  }

  updateReturnColor() {
    this.color = this.colorPickerService.prepareReturnColor(this.hsva, this.outFormat);

    if(this.colorInit) {
      this.colorChanged.emit(this.color + '');
    }
    this.colorInit = true;
  }


  setInputValue() {
    if(typeof this.pickerInput !== 'undefined') {
      this.pickerInput.setInputValue(
        this.colorPickerService.prepareReturnColor(this.hsva, this.inputFormat)
      );
    }
  }

  setDraggesToCurrentColor() {

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

    if(typeof this.alphaPicker !== 'undefined' && this.alpha) {
      this.alphaPicker.setDragger({x: 0, y: 100 - (this.hsva.alpha * 100)});
    }

  }

}
