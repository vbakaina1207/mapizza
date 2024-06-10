/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewsComponent } from './news.component';
import { of } from 'rxjs/internal/observable/of';
import { ToastrService } from 'ngx-toastr';
import { NewsService } from 'src/app/shared/services/news/news.service';
import { IPageResponse } from 'src/app/shared/interfaces/page/page.interface';
import { PageService } from 'src/app/shared/services/page/page.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Firestore } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NewsInfoService } from 'src/app/shared/services/news-info/news-info.service';
import { INewsResponse } from 'src/app/shared/interfaces/news/news.interface';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;

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
    createFirebase: (news: INewsResponse) => of({ ...news }),
    updateFirebase: (news: Partial<INewsResponse>, id: string) => of({ id: id, ...news }),
    deleteFirebase: (id: string) => of({ id: id, page: 1 }),
  }

  const pageServiceStub = {
    getOneFirebase: (id: string) => of({ id: id, page: 1 }),
    getAllFirebase: () => of([{ id: '1', page: 1 }]),
    createFirebase: (page: IPageResponse) => of({ ...page }),
    updateFirebase: (page: Partial<IPageResponse>, id: string) => of({ id: id, ...page }),
    deleteFirebase: (id: string) => of({ id: id, page: 1 }),
  };

  const mockFirestore = jasmine.createSpyObj('Firestore', ['collection']);
  const collectionStub = jasmine.createSpyObj('collection', ['doc']);
  const docStub = jasmine.createSpyObj('doc', ['get']);

  mockFirestore.collection.and.returnValue(collectionStub);
  collectionStub.doc.and.returnValue(docStub);
  docStub.get.and.returnValue(of({
    id: '1',
    data: () => ({
      id: '1',
      page: {id: 1, page: '1'},
      name: 'test news',
      path: '',
      description: 'test description',
      imagePath: '',
      detail:[]
  })
}));


  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ NewsComponent ],
      providers: [        
         { provide: ToastrService, useValue: {} },       
         { provide: NewsService, useValue: newsServiceStub },
         { provide: PageService, useValue: pageServiceStub },        
         { provide: Firestore, useValue: mockFirestore },         
       ], 
       imports: [
        RouterTestingModule,
       ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all news', () => {
    const fixture = TestBed.createComponent(NewsComponent);
    const app = fixture.componentInstance;
    let service = fixture.debugElement.injector.get(NewsService);
    spyOn(service,"getAllFirebase").and.callFake(() => {
      return of([]);
    });
    app.loadNews();
    expect(app.news).toEqual([]);
  });

});
