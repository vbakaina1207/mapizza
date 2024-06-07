/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { NewsService } from './news.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import {  Firestore} from '@angular/fire/firestore';


  describe('Service: News', () => {
  beforeEach(async() => {
    await TestBed.configureTestingModule({      
      providers: [
        
        { provide: NewsService, useValue: {} },    
      ], 
      imports: [
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
      ]
    }).compileComponents();
  });
  
  it('should ...', inject([NewsService], (service: NewsService) => {
    expect(service).toBeTruthy();
  }));
});
