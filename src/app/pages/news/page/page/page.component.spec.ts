/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PageComponent } from './page.component';
import { of } from 'rxjs';
import { PageService } from 'src/app/shared/services/page/page.service';
import { CollectionReference, Firestore } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IPageResponse } from 'src/app/shared/interfaces/page/page.interface';
import { NewsService } from 'src/app/shared/services/news/news.service';
import { INewsRequest, INewsResponse } from 'src/app/shared/interfaces/news/news.interface';


const mockFirestore = jasmine.createSpyObj('Firestore', ['collection']);
const collectionStub = jasmine.createSpyObj('collection', ['doc']);
const docStub = jasmine.createSpyObj('doc', ['get']);

mockFirestore.collection.and.returnValue(collectionStub);
collectionStub.doc.and.returnValue(docStub);
docStub.get.and.returnValue(of({
  id: '1',
  data: () => ({
    id: '1',
    page: 1
  })
}));

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;
  let pageService: PageService;

  const pageServiceStub = {
    getOneFirebase: (id: string) => of({ id: id, page: 1 }),
    getAllFirebase: () => of([{ id: '1', page: 1 }]),
    createFirebase: (page: IPageResponse) => of({ ...page }),
    updateFirebase: (page: Partial<IPageResponse>, id: string) => of({ id: id, ...page }),
    deleteFirebase: (id: string) => of({ id: id, page: 1 }),
  };

  const firestoreStub = {
    collection: () => ({
      doc: () => ({
        get: () => of({ id: '1', data: () => ({ id: '1', page: 1 }) })
      })
    })
  };

  const newsServiceStub = {
    getOneFirebase: (id: string) => of(
      {
      id: id,
      page: { id: 1, page: 1 },
        name: 'news',
        path: '',
        description: '',
        imagePath: '',
        detail: [
          {
            id: 1,
            title: '',
            description: '',
            detail: []
          }
        ]
      }),
    getAllFirebase: () => of([
      {
        id: '1',
        page: { id: 1, page: 1 },
        name: 'news',
        path: '',
        description: '',
        imagePath: '',
        detail: [
          {
            id: 1,
            title: '',
            description: '',
            detail: []
          }
        ]
      } ]),
    createFirebase: (news: INewsResponse) => of({ ...news }),
    updateFirebase: (news: Partial<INewsResponse>, id: string) => of({ id: id, ...news }),
    deleteFirebase: (id: string) => of({ id: id, page: 1 }),
    getAllByPageFirebase: (page: number) => of([
      { id: 1,
        page: { id: 1, page: page},
        name: 'news',
        path: '',
        description: '',
        imagePath: '',
        detail: [
          {
            id: 1,
            title: '',
            description: '',
            detail: []
          }
        ]
      }
    ])
  };


  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
      declarations: [PageComponent],
      imports: [
          RouterTestingModule,
          HttpClientTestingModule,          
        ],
        providers: [
          { provide: PageService, useValue: pageServiceStub },   
          { provide: NewsService , useValue: newsServiceStub },
          { provide: Firestore, useValue: firestoreStub },          
        ]
        
    })
    .compileComponents();
  })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loading page', () => {
    const PAGE_ID = '1';
    const data = [
      {id: 1, page: '1'}        
    ]    
    if (PAGE_ID){
      pageService?.getOneFirebase(PAGE_ID).subscribe(result => {
        expect(result).toEqual(data);
      });
    }
    expect(component).toBeTruthy();
  });


});
