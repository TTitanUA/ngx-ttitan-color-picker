import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ColorPickerComponent, Palette} from "../ngx-ttitan-color-picker.interface";

@Component({
  selector: 'lib-ngx-ttitan-color-picker-palette-list',
  templateUrl: './ngx-ttitan-color-picker-palette-list.component.html',
  styleUrls: ['./ngx-ttitan-color-picker-palette-list.component.scss']
})
export class NgxTTitanColorPickerPaletteListComponent implements OnInit {

  @Input('pallets') public pallets: Array<Palette> = [];
  @Input('context') public _context: ColorPickerComponent;
  @Output('change') public change: EventEmitter<string> = new EventEmitter<string>();

  public activePalette: Palette = null;

  constructor() { }

  ngOnInit() {
  }

  closePalette() {
    this.activePalette = null;
  }

  selectPalette(palette: Palette) {
    this._context.closePicker();
    if(
      this.activePalette == null
    ) {
      this.activePalette = palette;
    } else if (this.activePalette.id !== palette.id) {
      this.activePalette = palette;
    }

  }

  colorSelected(color) {
    this.change.emit(color);
  }

}
