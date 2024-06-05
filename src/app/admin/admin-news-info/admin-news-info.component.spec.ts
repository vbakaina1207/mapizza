/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminNewsInfoComponent } from './admin-news-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { Storage } from '@angular/fire/storage';
import { NewsInfoService } from 'src/app/shared/services/news-info/news-info.service';
import { of } from 'rxjs/internal/observable/of';
import { NewsService } from 'src/app/shared/services/news/news.service';
import { Firestore } from '@angular/fire/firestore';
import { INewsDetailResponse } from 'src/app/shared/interfaces/news/news-info.interface';
import { NewsDetailService } from 'src/app/shared/services/news-detail/news-detail.service';
import { AccountService } from 'src/app/shared/services/account/account.service';

describe('AdminNewsInfoComponent', () => {
  let component: AdminNewsInfoComponent;
  let fixture: ComponentFixture<AdminNewsInfoComponent>;

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

  const newsServiceStub = {
    getOneFirebase: (id: string) => of({
      id: id,     
      page: {id: 1, page: '1'},
      name: 'test news',
      path: '',
      description: 'test description',
      imagePath: '',
      detail:[]
    }),
    getAllFirebase: () => of([{
      id: 1,     
      page: {id: 1, page: '1'},
      name: 'test news',
      path: '',
      description: 'test description',
      imagePath: '',
      detail:[]
    }]),
  }

  
    const firestoreStub = jasmine.createSpyObj('Firestore', ['collection']);
      firestoreStub.collection.and.returnValue({
      doc: () => ({
        get: () => of({ id: '1', data: () => ({ 
          id: '1',
          page: {id: 1, page: '1'},
          name: 'test news',
          path: '',
          description: 'test description',
          imagePath: '',
          detail:[] 
        }) })
      }),
      where: () => ({
        get: () => of([{ 
          id: '1',
          page: {id: 1, page: '1'},
          name: 'test news',
          path: '',
          description: 'test description',
          imagePath: '',
          detail:[] 
        }])
      })
   
  });

  const newsDetailServiceStub = {
    getOneFirebase: (id: string) => of({
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
    }),
    getAllFirebase: () => of([{     
        id: 1,     
        title: 'test',      
        description: 'test',
        imagePath: '',
        detail:[{
          id: 1,     
        title: 'test',      
        description: 'test',
        imagePath: '',
        detail:[{
          id: 1,     
        title: 'test',      
        description: 'test',
        imagePath: '',
        detail:[] 
        }] 
        }]     
    }]),
    createFirebase: (newsDetail: INewsDetailResponse) => of({ ...newsDetail }),
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
      declarations: [AdminNewsInfoComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: ToastrService, useValue: {} },
        { provide: NewsInfoService, usValue: newsInfoServiceStub },
        { provide: NewsService, usValue: newsServiceStub },
        { provide: NewsDetailService, usevalue: newsDetailServiceStub },
        //{ provide: AccountService, useValue: {} },
       // { provide: Firestore, useValue: firestoreStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
