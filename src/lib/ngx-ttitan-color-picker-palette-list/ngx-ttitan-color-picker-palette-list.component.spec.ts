import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTTitanColorPickerPaletteListComponent } from './ngx-ttitan-color-picker-palette-list.component';

describe('NgxTTitanColorPickerPaletteListComponent', () => {
  let component: NgxTTitanColorPickerPaletteListComponent;
  let fixture: ComponentFixture<NgxTTitanColorPickerPaletteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxTTitanColorPickerPaletteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxTTitanColorPickerPaletteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
