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
import { DocumentData, DocumentReference, Firestore } from '@angular/fire/firestore';
import { INewsAddRequest, INewsAddResponse, INewsDetailResponse } from 'src/app/shared/interfaces/news/news-info.interface';
import { NewsDetailService } from 'src/app/shared/services/news-detail/news-detail.service';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('AdminNewsInfoComponent', () => {
  let component: AdminNewsInfoComponent;
  let fixture: ComponentFixture<AdminNewsInfoComponent>;
  let newsInfoService: NewsInfoService;
  let toastrService: ToastrService;

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
    getAllFirebase: () => of([{
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
    createFirebase: (news: INewsAddRequest) => {
      return Promise.resolve({ id: '5' } as DocumentReference<DocumentData>);
    },
    updateFirebase: (news: INewsAddRequest, id: string) => {
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
      description: 'test description',
      imagePath: '',
      detail:[null]
      }]
    }
    ),
  }


  const toastrServiceStub = {
    success: jasmine.createSpy(),
    error: jasmine.createSpy()
  };

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
      detail:[]
    }),
    getAllFirebase: () => of([{     
        id: 1,     
        title: 'test',      
        description: 'test',
        imagePath: '',
        detail:[]     
    }]),
    createFirebase: (newsDetail: INewsDetailResponse) => of({ ...newsDetail }),
    updateFirebase: (newsDetail: Partial<INewsDetailResponse>, id: string) => of({ id: id, ...newsDetail }),
    deleteFirebase: (id: string) => of({ 
      id: id, 
      title: 'test', 
      description: 'test description',
      imagePath: '',
      detail:[]
    }
    ),
  }

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [AdminNewsInfoComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatDialogModule
      ],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: ToastrService, useValue: toastrServiceStub },
        { provide: MatDialogRef, useValue: {} },
        { provide: NewsInfoService, useValue: newsInfoServiceStub },       
        { provide: NewsDetailService, useValue: newsDetailServiceStub },
        { provide: AccountService, useValue: {} },
        { provide: Firestore, useValue: firestoreStub }
      ]
    })
    .compileComponents();    
    newsInfoService = TestBed.inject(NewsInfoService);
    toastrService = TestBed.inject(ToastrService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewsInfoComponent);
    component = fixture.componentInstance;
    
    spyOn(console, 'log');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if news data is loaded', () => {
    spyOn(newsInfoService, 'getAllFirebase').and.returnValue(of([{ id: 1, title: 'Test News', description: 'Test Description' }]));
    component.loadNews();
    fixture.detectChanges(); 
    expect(newsInfoService.getAllFirebase).toHaveBeenCalled(); 
   
  });
  
  it('sending form values info news', () => {
    spyOn(component, 'editNews').and.callThrough();
    component.editNews({
      title: 'test',      
        description: 'test',
        imagePath: '',
        detail:[]  ,
      id: '1'
    });
    expect(component.editNews).toHaveBeenCalled();
    expect(component).toBeTruthy();
  });

  it(`should return list of info news'`, () => {
    const fixture = TestBed.createComponent(AdminNewsInfoComponent);
    const app = fixture.componentInstance;
    let service = fixture.debugElement.injector.get(NewsDetailService);
    spyOn(service,"getAllFirebase").and.callFake (() => {
      return of([
        { 
          id: 1,     
          title: 'test',      
        description: 'test',
        imagePath: '',
        detail:[]  ,
    }])
  });
    app.loadNews();
    expect(app.adminNews.length).toEqual(1);
  });


  it('should send add new info news', async () => {
    const newsRequest: INewsAddRequest = {       
      title: 'test', 
      description: 'test description',
      imagePath: '',
      detail:[]
    };

    const expectedNews: INewsAddResponse = {
      id: '5',
      title: 'test', 
      description: 'test description',
      imagePath: '',
      detail:[]
    };    
    component.editStatus = true;
    component.currentNewsId = '5';
    spyOn(newsInfoService, 'createFirebase');
    component.addNews();
    if (component.editStatus) {
      await newsInfoService.createFirebase(newsRequest).then((result: any) => {      
        expect(result.data()).toEqual(expectedNews);
      })
    }
    component.editStatus = false;    
    spyOn(newsInfoService, 'updateFirebase');    
    if (!component.editStatus) {
      await newsInfoService.updateFirebase(newsRequest, '5');        
    }
    expect(component).toBeTruthy();
  });

  it('should edit an existing info news', async () => {
    component.editStatus = true;
    component.currentNewsId = '1';
    component.newsForm.setValue({
      title: 'test', 
      description: 'test description',
      imagePath: '',
      detail: []
    });
    component.addNews();    
    if (component.editStatus) {
      await newsInfoService.updateFirebase(component.newsForm.value, '1').then(() => {  
        expect(toastrServiceStub.success).toHaveBeenCalledWith('', 'Новину змінено');
      })
    }
    expect(component.editStatus).toBeFalse();
  });

  it('delete values info news', () => {
    spyOn(component, 'deleteNews').and.callThrough();
    component.deleteNews({
      id: '5',
      title: 'test', 
      description: 'test description',
      imagePath: '',
      detail:[]
    });
    spyOn(newsInfoService, 'deleteFirebase');
    expect(component).toBeTruthy();
  });

});
