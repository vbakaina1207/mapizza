/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { FaqService } from './faq.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Firestore} from '@angular/fire/firestore';;
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';


describe('Service: Faq', () => {
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [
        FaqService,
        { provide: Firestore, useValue: {} },    
        { provide: AngularFirestore, useValue: {} },        
      ],
      imports: [
        HttpClientTestingModule,        
        AngularFireModule.initializeApp(environment.firebase),  
        AngularFirestoreModule     
      ]
    }).compileComponents();
  });

  it('should ...', inject([FaqService], (service: FaqService) => {
    expect(service).toBeTruthy();
  }));
});
