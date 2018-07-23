import { ElementRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { NgxTTitanColorPickerDraggerDirective } from "./ngx-ttitan-color-picker-dragger.directive";
import { Subscription } from 'rxjs';
import { NgxTTitanColorPickerService } from "./ngx-ttitan-color-picker.service";
import { ColorPickerComponent, CustomPercent, CustomRect } from "./ngx-ttitan-color-picker.interface";
export declare class NgxTTitanColorPickerSelectorDirective implements OnDestroy, OnInit {
    elRef: ElementRef;
    colorPickerService: NgxTTitanColorPickerService;
    onMouseDown($event: any): void;
    direction: string;
    _context: ColorPickerComponent;
    change: EventEmitter<CustomPercent>;
    el: HTMLElement;
    dragStart: boolean;
    globalMouseMove: Subscription;
    globalMouseUp: Subscription;
    dragger: NgxTTitanColorPickerDraggerDirective;
    constructor(elRef: ElementRef, colorPickerService: NgxTTitanColorPickerService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    eventsSubscibe(): void;
    eventsUnSubscibe(): void;
    setDragger(persent: CustomPercent): void;
    getPosition($event: MouseEvent): void;
    getRect(elem: HTMLElement): CustomRect;
}
