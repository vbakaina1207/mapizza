/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { MassageService } from './massage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Message', () => {
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [MassageService],
      imports: [
        HttpClientTestingModule
      ]
    }).compileComponents();
  });

  it('should ...', inject([MassageService], (service: MassageService) => {
    expect(service).toBeTruthy();
  }));
});
