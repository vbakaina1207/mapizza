/* tslint:disable:no-unused-variable */

import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { MassageService } from './massage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';

describe('Service: Message', () => {
  let firestoreMock: any;
  let component: MassageService;
  let fixture: ComponentFixture<MassageService>;

  const serviceStub = {
    getOneFirebase: (id: string) =>
      of({ id: id, name: 'Ivan', email: 'ivan@gmail.com', description:' ', imagePath: '' , date_message: ''}),
  };
  
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [       
        { provide:  MassageService, useValue: serviceStub },
      ],
      imports: [
        HttpClientTestingModule
      ]
    }).compileComponents();
  });

  it('should ...', inject([MassageService], (service: MassageService) => {
    expect(service).toBeTruthy();
  }));
});
