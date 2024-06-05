/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { NewsDetailService } from './news-detail.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('Service: NewsDetail', () => {

  const newsDetailServiceStub = {
    getOneFirebase: (id: string) => of({
      id: id,     
      title: 'test', 
      description: 'test description',
      imagePath: '',
      detail:[]
    }),
    getAllFirebase: () => of([{
      id: 1,     
      title: 'test', 
      description: 'test description',
      imagePath: '',
      detail:[]
    }]),
  }

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: NewsDetailService, useValue: newsDetailServiceStub }
      ],
      imports: [
        HttpClientTestingModule
      ]
    }).compileComponents();
  });

  it('should ...', inject([NewsDetailService], (service: NewsDetailService) => {
    expect(service).toBeTruthy();
  }));
});
