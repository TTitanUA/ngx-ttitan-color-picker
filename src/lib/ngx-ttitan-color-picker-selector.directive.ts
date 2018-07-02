import {
  ContentChild, Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output
} from '@angular/core';
import {NgxTTitanColorPickerDraggerDirective} from "./ngx-ttitan-color-picker-dragger.directive";
// import {Observable, Subscription, of} from "rxjs";
import {fromEvent, Subscription} from 'rxjs';
import {NgxTTitanColorPickerService} from "./ngx-ttitan-color-picker.service";

export interface CustomRect {
  height: number,
  left: number,
  top: number,
  width: number
}

export interface CustomPercent {
  x: number,
  y: number,
}


@Directive({
  selector: '[libNgxTTitanColorPickerSelector]',
  exportAs: 'libNgxTTitanColorPickerSelector'
})
export class NgxTTitanColorPickerSelectorDirective implements OnDestroy{

  @Input('direction') public direction: string = 'both';

  @ContentChild(NgxTTitanColorPickerDraggerDirective) public dragger: NgxTTitanColorPickerDraggerDirective = null;

  @Output('change') public change: EventEmitter<CustomPercent> = new EventEmitter<CustomPercent>();

  public el: HTMLElement = null;
  public dragStart: boolean = false;
  public globalMouseMove: Subscription = null;
  public globalMouseUp: Subscription = null;


  @HostListener('mousedown', ['$event']) public onMouseDown($event) {
    this.dragStart = true;
    this.getPosition($event);
  }



  constructor(
    public elRef: ElementRef,
    public colorPickerService: NgxTTitanColorPickerService
  ) {
    this.el = this.elRef.nativeElement;
    this.direction = (['both', 'vertical', 'horizontal'].indexOf(this.direction) === -1) ? 'both' : this.direction;
    // this.globalMouseMove = fromEvent(window, 'mousemove').subscribe((event) => {
    //   if(this.dragStart) {
    //     this.getPosition(<MouseEvent>event);
    //   }
    // });
    // this.globalMouseUp = fromEvent(window, 'mouseup').subscribe((event) => {
    //   if(this.dragStart) {
    //     this.dragStart = false;
    //     this.getPosition(<MouseEvent>event);
    //   }
    // });

    this.globalMouseMove = this.colorPickerService.mouseMoveObservable.subscribe((event) => {
      if(this.dragStart) {
        this.getPosition(<MouseEvent>event);
      }
    });
    this.globalMouseUp = this.colorPickerService.mouseUpObservable.subscribe((event) => {
      if(this.dragStart) {
        this.dragStart = false;
        this.getPosition(<MouseEvent>event);
      }
    });

  }

  ngOnDestroy() {
    if(this.globalMouseMove !== null) {
      this.globalMouseMove.unsubscribe();
    }
    if(this.globalMouseUp !== null) {
      this.globalMouseUp.unsubscribe();
    }
  }

  public setDragger(persent: CustomPercent) {
    if(this.dragger === null) {
      return;
    }
    let position: CustomRect = this.getRect(this.el);
    let x = Math.round(((position.width - this.dragger.pickerPad * 2) * persent.x / 100));
    let y = Math.round(((position.height - this.dragger.pickerPad * 2) * persent.y / 100));
    this.dragger.setPosition(
      (x > this.dragger.pickerPad) ? x : this.dragger.pickerPad,
      (y > this.dragger.pickerPad) ? y : this.dragger.pickerPad,
      this.direction
    );

  }

  public getPosition($event: MouseEvent) {
    let cursorY = $event.pageY;
    let cursorX = $event.pageX;
    let position: CustomRect = this.getRect(this.el);
    let percent: CustomPercent = {x: 0, y: 0};
    if(this.direction == 'vertical' || this.direction == 'both') {
      percent.y = Math.round((cursorY - (position.top)) * 100 / (position.height - this.dragger.pickerPad * 2));
      if(percent.y < 0) {
        percent.y = 0
      } else if(percent.y > 100) {
        percent.y = 100;
      }
    }
    if(this.direction == 'horizontal' || this.direction == 'both') {
      percent.x = Math.round((cursorX - (position.left)) * 100 / (position.width - this.dragger.pickerPad * 2));
      if(percent.x < 0) {
        percent.x = 0
      } else if(percent.x > 100) {
        percent.x = 100;
      }
    }

    this.setDragger(percent);
    this.change.emit(percent);

  }



  public getRect(elem: HTMLElement): CustomRect {

    let box = elem.getBoundingClientRect();
    let body = document.body;
    let docEl = document.documentElement;
    let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    let scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
    let clientTop = docEl.clientTop || body.clientTop || 0;
    let clientLeft = docEl.clientLeft || body.clientLeft || 0;

    return {
      height: box.height,
      left: box.left + scrollLeft - clientLeft,
      top: box.top + scrollTop - clientTop,
      width: box.width,
    };
  }



}
