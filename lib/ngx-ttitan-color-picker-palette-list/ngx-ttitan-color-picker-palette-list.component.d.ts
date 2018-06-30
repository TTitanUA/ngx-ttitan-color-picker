import { EventEmitter, OnInit } from '@angular/core';
import { Palette } from "../ngx-ttitan-color-picker.service";
export declare class NgxTTitanColorPickerPaletteListComponent implements OnInit {
    pallets: Array<Palette>;
    change: EventEmitter<string>;
    activePalette: Palette;
    constructor();
    ngOnInit(): void;
    closePalette(): void;
    selectPalette(palette: Palette): void;
    colorSelected(color: any): void;
}
