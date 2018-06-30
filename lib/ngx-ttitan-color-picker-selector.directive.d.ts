import { ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { NgxTTitanColorPickerDraggerDirective } from "./ngx-ttitan-color-picker-dragger.directive";
import { Subscription } from 'rxjs';
export interface CustomRect {
    height: number;
    left: number;
    top: number;
    width: number;
}
export interface CustomPercent {
    x: number;
    y: number;
}
export declare class NgxTTitanColorPickerSelectorDirective implements OnDestroy {
    elRef: ElementRef;
    direction: string;
    dragger: NgxTTitanColorPickerDraggerDirective;
    change: EventEmitter<CustomPercent>;
    el: HTMLElement;
    dragStart: boolean;
    globalMouseMove: Subscription;
    globalMouseUp: Subscription;
    onMouseDown($event: any): void;
    constructor(elRef: ElementRef);
    ngOnDestroy(): void;
    setDragger(persent: CustomPercent): void;
    getPosition($event: MouseEvent): void;
    getRect(elem: HTMLElement): CustomRect;
}
