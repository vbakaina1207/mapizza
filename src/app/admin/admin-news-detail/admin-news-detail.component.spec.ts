/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminNewsDetailComponent } from './admin-news-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { Storage } from '@angular/fire/storage';
import { of } from 'rxjs';
import { NewsDetailService } from 'src/app/shared/services/news-detail/news-detail.service';
import { INewsDetailRequest, INewsDetailResponse } from 'src/app/shared/interfaces/news/news-info.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DocumentData, DocumentReference, Firestore } from '@angular/fire/firestore';

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
    createFirebase: (news: INewsDetailRequest) => {
      return Promise.resolve({ id: '5' } as DocumentReference<DocumentData>);
    },
    updateFirebase: (news: INewsDetailRequest, id: string) => {
      return Promise.resolve({ id: id } as DocumentReference<DocumentData>);
    },         
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
  
  const toastrServiceStub = {
    success: jasmine.createSpy(),
    error: jasmine.createSpy()
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
        { provide: ToastrService, useValue: toastrServiceStub },    
        { provide: NewsDetailService, useValue: newsDetailServiceStub },            
        { provide: Firestore, useValue: firestoreStub }
      ]
    })
    .compileComponents();
    newsDetailService = TestBed.inject(NewsDetailService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should return empty list of detail news'`, () => {
    const fixture = TestBed.createComponent(AdminNewsDetailComponent);
    const app = fixture.componentInstance;
    let service = fixture.debugElement.injector.get(NewsDetailService);
    spyOn(service,"getAllFirebase").and.callFake(() => {
      return of([]);
    });
    app.loadNews();
    expect(app.adminNews).toEqual([]);
  });

  it('sending form values detail news', () => {
    spyOn(component, 'editNews').and.callThrough();
    component.editNews({
      title: 'test', 
      description: 'test description',
      imagePath: '',
      detail:[{
        id: 1,     
        title: 'test',      
        description: 'test',
        imagePath: '',
        detail:[]
      }],
      id: '1'
    });
    expect(component.editNews).toHaveBeenCalled();
    expect(component).toBeTruthy();
  });

  it(`should return list of detail news'`, () => {
    const fixture = TestBed.createComponent(AdminNewsDetailComponent);
    const app = fixture.componentInstance;
    let service = fixture.debugElement.injector.get(NewsDetailService);
    spyOn(service,"getAllFirebase").and.callFake (() => {
      return of([
        { 
          id: 1,     
          title: 'test', 
      description: 'test description',
      imagePath: '',
      detail:[{
        id: 1,     
        title: 'test',      
        description: 'test',
        imagePath: '',
        detail:[]
      }],
    }])
  });
    app.loadNews();
    expect(app.adminNews.length).toEqual(1);
  });
  

  it('should send add new news', async () => {
    const newsRequest: INewsDetailRequest = {       
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
    };

    const expectedNews: INewsDetailResponse = {
      id: '5',
      title: 'test', 
      description: 'test description',
      imagePath: '',
      detail:[{
        id: 1,     
        title: 'test',      
        description: 'test',
        imagePath: '',
        detail:[]
      }],
    };    
    component.editStatus = true;
    component.currentNewsId = '5';
    spyOn(newsDetailService, 'createFirebase');
    component.addNews();
    if (component.editStatus) {
      await newsDetailService.createFirebase(newsRequest).then((result: any) => {      
        expect(result.data()).toEqual(expectedNews);
      })
    }
    component.editStatus = false;    
    spyOn(newsDetailService, 'updateFirebase');    
    if (!component.editStatus) {
      await newsDetailService.updateFirebase(newsRequest, '5');        
    }
    expect(component).toBeTruthy();
  });

  it('should edit an existing product', async () => {
    component.editStatus = true;
    component.currentNewsId = '1';
    component.newsForm.setValue({
      title: 'test', 
      description: 'test description',
      imagePath: '',
      detail: {
        id: 1,     
        title: 'test',      
        description: 'test',
        imagePath: '',
        detail:[]
      }
    });
    component.addNews();    
    if (component.editStatus) {
      await newsDetailService.updateFirebase(component.newsForm.value, '1').then(() => {  
        expect(toastrServiceStub.success).toHaveBeenCalledWith('', 'Новину змінено');
      })
    }
    expect(component.editStatus).toBeFalse();
  });

 

  it('delete values detail news', () => {
    spyOn(component, 'deleteNews').and.callThrough();
    component.deleteNews({
      id: '5',
      title: 'test', 
      description: 'test description',
      imagePath: '',
      detail: [{
        id: 1,     
        title: 'test',      
        description: 'test',
        imagePath: '',
        detail:[]
      }]
    });
    spyOn(newsDetailService, 'deleteFirebase');
    expect(component).toBeTruthy();
  });


});
