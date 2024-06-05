/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminNewsDetailComponent } from './admin-news-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { Storage } from '@angular/fire/storage';
import { of } from 'rxjs';
import { NewsDetailService } from 'src/app/shared/services/news-detail/news-detail.service';
import { Firestore } from '@angular/fire/firestore';
import { INewsDetailResponse } from 'src/app/shared/interfaces/news/news-info.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { ActivatedRoute } from '@angular/router';

describe('AdminNewsDetailComponent', () => {
  let component: AdminNewsDetailComponent;
  let fixture: ComponentFixture<AdminNewsDetailComponent>;

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

  const firestoreStub = {
    collection: () => ({
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
      })
    })
  };
  
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNewsDetailComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: ToastrService, useValue: {} },
         { provide: NewsDetailService, usevalue: newsDetailServiceStub },
        { provide: AccountService, useValue: {} },
       /*  {
          provide: ActivatedRoute,
          useValue: {
            data: of({ newsDetail: newsDetailServiceStub })
          }
        }, */
        // { provide: Firestore, useValue: newsDetailServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
