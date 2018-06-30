import { NgModule } from '@angular/core';
import { NgxTTitanColorPickerComponent } from './ngx-ttitan-color-picker.component';
import { NgxTTitanColorPickerSelectorDirective } from './ngx-ttitan-color-picker-selector.directive';
import { NgxTTitanColorPickerDraggerDirective } from './ngx-ttitan-color-picker-dragger.directive';
import {CommonModule} from "@angular/common";
import { NgxTTitanColorPickerInputDirective } from './ngx-ttitan-color-picker-input.directive';
import { NgxTTitanColorPickerPaletteListComponent } from './ngx-ttitan-color-picker-palette-list/ngx-ttitan-color-picker-palette-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgxTTitanColorPickerComponent,
    NgxTTitanColorPickerSelectorDirective,
    NgxTTitanColorPickerDraggerDirective,
    NgxTTitanColorPickerInputDirective,
    NgxTTitanColorPickerPaletteListComponent,
  ],
  exports: [NgxTTitanColorPickerComponent]
})
export class NgxTTitanColorPickerModule { }
