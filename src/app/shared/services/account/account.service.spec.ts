/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AccountService } from './account.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Account', () => {
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [AccountService],
      imports: [
        HttpClientTestingModule
      ]
    }).compileComponents();
  });

  it('should ...', inject([AccountService], (service: AccountService) => {
    expect(service).toBeTruthy();
  }));
});
