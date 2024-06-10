/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminNewsDetailComponent } from './admin-news-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { Storage } from '@angular/fire/storage';
import { of } from 'rxjs';
import { NewsDetailService } from 'src/app/shared/services/news-detail/news-detail.service';
import { INewsDetailResponse } from 'src/app/shared/interfaces/news/news-info.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';

describe('AdminNewsDetailComponent', () => {
  let component: AdminNewsDetailComponent;
  let fixture: ComponentFixture<AdminNewsDetailComponent>;
  let newsDetailService: NewsDetailService;

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
        detail:[{
          id: 1,     
        title: 'test',      
        description: 'test',
        imagePath: '',
        detail:[] 
        }] 
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
        detail:[{
          id: 1,     
        title: 'test',      
        description: 'test',
        imagePath: '',
        detail:[] 
        }] 
      }]
    }
    ),
  }

  const firestoreStub = {
    collection: (path: string) => ({
      doc: (id: string) => ({
        get: () => of({ id, data: () => ({ 
          id,
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
        HttpClientTestingModule,
        MatDialogModule,           
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: Storage, useValue: {} },
        { provide: ToastrService, useValue: {} },    
        { provide: NewsDetailService, useValue: newsDetailServiceStub },            
        { provide: Firestore, useValue: firestoreStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    newsDetailService = TestBed.inject(NewsDetailService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
