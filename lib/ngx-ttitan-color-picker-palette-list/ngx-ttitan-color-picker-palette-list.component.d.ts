import { EventEmitter, OnInit } from '@angular/core';
import { ColorPickerComponent, Palette } from "../ngx-ttitan-color-picker.interface";
export declare class NgxTTitanColorPickerPaletteListComponent implements OnInit {
    pallets: Array<Palette>;
    _context: ColorPickerComponent;
    change: EventEmitter<string>;
    activePalette: Palette;
    constructor();
    ngOnInit(): void;
    closePalette(): void;
    selectPalette(palette: Palette): void;
    colorSelected(color: any): void;
}
