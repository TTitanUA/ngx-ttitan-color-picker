import { TestBed, inject } from '@angular/core/testing';

import { NgxTTitanColorPickerService } from './ngx-ttitan-color-picker.service';

describe('NgxTTitanColorPickerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxTTitanColorPickerService]
    });
  });

  it('should be created', inject([NgxTTitanColorPickerService], (service: NgxTTitanColorPickerService) => {
    expect(service).toBeTruthy();
  }));
});
