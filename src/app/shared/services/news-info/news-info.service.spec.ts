/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { NewsInfoService } from './news-info.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';


 describe('Service: NewsInfo', () => {

  const newsInfoServiceStub = {
    getOneFirebase: (id: string) => of({
      id: id,     
      title: 'test',
      description: 'test description',
      imagePath: '',
      detail:[{
        id: 1,     
      title: 'test',
      description: 'test description',
      imagePath: '',
      detail:[null]
      }]
    }),
    geAllFirebase: () => of([{
      id: 1,     
      title: 'test',
      description: 'test description',
      imagePath: '',
      detail:[{
        id: 1,     
      title: 'test',
      description: 'test description',
      imagePath: '',
      detail:[null]
      }]
    }]),
  }
  
   beforeEach(async() => {
     await TestBed.configureTestingModule({
       providers: [         
         { provide: NewsInfoService, useValue: newsInfoServiceStub },
       ],
       imports: [
         HttpClientTestingModule
       ]
     }).compileComponents();
   });

   it('should ...', inject([NewsInfoService], (service: NewsInfoService) => {
     expect(service).toBeTruthy();
   }));
 });

