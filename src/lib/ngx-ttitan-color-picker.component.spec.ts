import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTTitanColorPickerComponent } from './ngx-ttitan-color-picker.component';

describe('NgxTTitanColorPickerComponent', () => {
  let component: NgxTTitanColorPickerComponent;
  let fixture: ComponentFixture<NgxTTitanColorPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxTTitanColorPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxTTitanColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
