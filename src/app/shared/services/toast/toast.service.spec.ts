/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ToastService } from './toast.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Toast', () => {
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: ToastService, useValue: {} }
      ],
      imports: [
        HttpClientTestingModule
      ]
    }).compileComponents();
  });

  it('should ...', inject([ToastService], (service: ToastService) => {
    expect(service).toBeTruthy();
  }));
});
