/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { NewsDetailService } from './news-detail.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { INewsDetailResponse } from '../../interfaces/news/news-info.interface';

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
    createFirebase: (news: INewsDetailResponse) => of({ ...news }),
    updateFirebase: (newsDetail: Partial<INewsDetailResponse>, id: string) => of({ id: id, ...newsDetail }),
    deleteFirebase: (id: string) => of({ 
      id: id, 
      title: 'test', 
      description: 'test description',
      imagePath: '',
      detail:[{
        id: 1,     
        title: 'test',      
        description: 'test',
        imagePath: '',
        detail:[] 
      }]
    }
    ),
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
