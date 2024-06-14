/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminNewsComponent } from './admin-news.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { Storage } from '@angular/fire/storage';
import { DocumentData, DocumentReference } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { NewsService } from 'src/app/shared/services/news/news.service';
import { of } from 'rxjs';
import { NewsInfoService } from 'src/app/shared/services/news-info/news-info.service';
import { PageService } from 'src/app/shared/services/page/page.service';
import { IPageResponse } from 'src/app/shared/interfaces/page/page.interface';
import { MatDialogModule } from '@angular/material/dialog';
import { INewsRequest, INewsResponse } from 'src/app/shared/interfaces/news/news.interface';

describe('AdminNewsComponent', () => {
  let component: AdminNewsComponent;
  let fixture: ComponentFixture<AdminNewsComponent>;
  let newsService: NewsService;

  const newsServiceStub = {
    getOneFirebase: (id: string) => of({
      id: id,     
      page: {id: 1, page: 1},
      name: 'test news',
      path: '',
      description: 'test description',
      imagePath: '',
      detail:{}
    }),
    getAllFirebase: () => of([{
      id: 1,     
      page: {id: 1, page: 1},
      name: 'test news',
      path: '',
      description: 'test description',
      imagePath: '',
      detail:{}
    }]),
    createFirebase: (news: INewsRequest) => {
      return Promise.resolve({ id: '5' } as DocumentReference<DocumentData>);
    },
    updateFirebase: (news: INewsRequest, id: string) => {
      return Promise.resolve({ id: id } as DocumentReference<DocumentData>);
    }, 
    deleteFirebase: (id: string) => of([{
      id: id,     
      page: {id: 1, page: 1},
      name: 'test news',
      path: '',
      description: 'test description',
      imagePath: '',
      detail:{}
    }]),
  }
  const newsInfoServiceStub = {
    getOneFirebase: (id: string) => of({
      id: id,     
      title: 'test',      
      description: 'test',
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
  }

  const pageServiceStub = {
    getOneFirebase: (id: string) => of({ id: id, page: 1 }),
    getAllFirebase: () => of([{ id: '1', page: 1 }]),
    createFirebase: (page: IPageResponse) => of({ ...page }),
    updateFirebase: (page: Partial<IPageResponse>, id: string) => of({ id: id, ...page }),
    deleteFirebase: (id: string) => of({ id: id, page: 1 }),
  };

  const toastrServiceStub = {
    success: jasmine.createSpy(),
    error: jasmine.createSpy()
  };
  
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [AdminNewsComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        AngularFireStorageModule,
        MatDialogModule
      ],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: ToastrService, useValue: toastrServiceStub },       
        { provide: NewsService, useValue: newsServiceStub },
        { provide: NewsInfoService, useValue: newsInfoServiceStub },
        { provide: PageService, useValue: pageServiceStub }       
      ]
    })
    .compileComponents();

    newsService = TestBed.inject(NewsService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should return empty list of news'`, () => {
    const fixture = TestBed.createComponent(AdminNewsComponent);
    const app = fixture.componentInstance;
    let service = fixture.debugElement.injector.get(NewsService);
    spyOn(service,"getAllFirebase").and.callFake(() => {
      return of([]);
    });
    app.loadNews();
    expect(app.adminNews).toEqual([]);
  });

  it('sending form values news', () => {
    spyOn(component, 'editNews').and.callThrough();
    component.editNews({
      page: { id: 1, page: 1 },
      name: 'test news',
      path: '',
      description: 'test description',
      imagePath: '',
      detail: {
        id: '1',
        title: '',
        description: 'test description',
        imagePath: '',
        detail: []
      },
      id: ''
    });
    expect(component.editNews).toHaveBeenCalled();
    expect(component).toBeTruthy();
  });


  

  it(`should return list of news'`, () => {
    const fixture = TestBed.createComponent(AdminNewsComponent);
    const app = fixture.componentInstance;
    let service = fixture.debugElement.injector.get(NewsService);
    spyOn(service,"getAllFirebase").and.callFake (() => {
      return of([
        { 
          id: 1,     
          page: { id: 1, page: 1 },
      name: 'test news',
      path: '',
      description: 'test description',
      imagePath: '',
      detail: {
        id: '1',
        title: '',
        description: 'test description',
        imagePath: '',
        detail: []
      }   
    }])
  });
    app.loadNews();
    expect(app.adminNews.length).toEqual(1);
  });
  

  it('should send add new news', async () => {
    const newsRequest: INewsRequest = {       
      page: { id: 1, page: 1 },
      name: 'test news',
      path: '',
      description: 'test description',
      imagePath: '',
      detail: {
        id: '1',
        title: '',
        description: 'test description',
        imagePath: '',
        detail: []
      }   
    };

    const expectedNews: INewsResponse = {
      id: '5',
      page: { id: 1, page: 1 },
      name: 'test news',
      path: '',
      description: 'test description',
      imagePath: '',
      detail: {
        id: '1',
        title: '',
        description: 'test description',
        imagePath: '',
        detail: []
      }    
    };    
    component.editStatus = true;
    component.currentNewsId = '5';
    spyOn(newsService, 'createFirebase');
    component.addNews();
    if (component.editStatus) {
      await newsService.createFirebase(newsRequest).then((result: any) => {      
        expect(result.data()).toEqual(expectedNews);
      })
    }
    component.editStatus = false;    
    spyOn(newsService, 'updateFirebase');
    
    if (!component.editStatus) {
      await newsService.updateFirebase(newsRequest, '5');        
    }

    expect(component).toBeTruthy();
  });
});
