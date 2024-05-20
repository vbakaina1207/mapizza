/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ImageService } from './image.service';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { Storage } from '@angular/fire/storage';

describe('Service: Image', () => {
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireStorageModule
      ],
      providers: [
        ImageService  ,
        { provide: Storage, useValue: {} }
      ]
    }).compileComponents();
  });

  it('should ...', inject([ImageService], (service: ImageService) => {
    expect(service).toBeTruthy();
  }));
});
