/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { NewsDetailService } from './news-detail.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { INewsDetailRequest, INewsDetailResponse } from '../../interfaces/news/news-info.interface';

describe('Service: NewsDetail', () => {
  let service: NewsDetailService;
  let firestoreMock: any;

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
      id: '1',     
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
    }]),
    createFirebase: (news: INewsDetailResponse) => of({ ...news }),
    updateFirebase: (newsDetail: Partial<INewsDetailRequest>, id: string) => Promise.resolve(),      
    deleteFirebase: jasmine.createSpy('deleteFirebase').and.returnValue(Promise.resolve())
   
  }

  firestoreMock = {
    collection: jasmine.createSpy().and.returnValue({ id: '1' }),
    doc: jasmine.createSpy().and.returnValue({ id: '1' }),
    addDoc: jasmine.createSpy().and.returnValue(Promise.resolve({ id: '1' })),
    deleteDoc: jasmine.createSpy().and.returnValue(Promise.resolve()),
    docData: jasmine.createSpy().and.returnValue(of({
      id: '1',
      title: 'test',
      description: 'test description',
      imagePath: '',
      detail: []
    })),
    updateDoc: jasmine.createSpy().and.returnValue(Promise.resolve())
  };


  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: NewsDetailService, useValue: newsDetailServiceStub }
      ],
      imports: [
        HttpClientTestingModule
      ]
    }).compileComponents();

    service = TestBed.inject(NewsDetailService);
  });

  it('should ...', inject([NewsDetailService], (service: NewsDetailService) => {
    expect(service).toBeTruthy();
  }));

  it('should fetch all news details', (done) => {
    firestoreMock.collectionData = jasmine.createSpy().and.returnValue(of([
      { 
      id: '1', 
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
    }]));
    service.getAllFirebase().subscribe(data => {
      expect(data).toEqual([
        { 
        id: '1',     
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
       }]);
      done();
    });
    expect(firestoreMock.collectionData).toBeDefined();
  });

  it('should fetch one news detail by ID', (done) => {
    service.getOneFirebase('1').subscribe(data => {
      expect(data).toEqual(
        { 
        id: '1',     
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
       });
      done();
    });
    expect(firestoreMock.docData).toBeDefined();
  });

  it('should fetch one news detail by ID', (done) => {
    const expectedData = {
      id: '1',
      title: 'test',
      description: 'test description',
      imagePath: '',
      detail: [{
        id: 1,
        title: 'test',
        description: 'test',
        imagePath: '',
        detail: []
      }]
    };
  
    firestoreMock.docData.and.returnValue(of(expectedData));
  
    service.getOneFirebase('1').subscribe(data => {
      expect(data).toEqual(expectedData);
      done();
    });
    expect(firestoreMock.docData).toBeDefined();
    
  });

  

  it('should update a news detail by ID', (done) => {
    const updatedNews: INewsDetailRequest = { title: 'Updated Title', description: 'Updated Description', imagePath: '', detail: [] };

    service.updateFirebase(updatedNews, '1').then(() => {
      expect(firestoreMock.updateDoc).toBeDefined();
      done();
    });
  });

  it('should delete a news detail by ID', (done) => {
    service.deleteFirebase('1').then(() => {
      expect(firestoreMock.deleteDoc).toBeDefined();
      done();
    });
  });

  it('createFirebase should return new page ', async () => {
    
    const expectedData: INewsDetailResponse = {
      id: '1',
      title: 'test',
      description: 'test description',
      imagePath: '',
      detail: [{
        id: 1,
        title: 'test',
        description: 'test',
        imagePath: '',
        detail: []
      }]
    };
    const expectedNews = of(expectedData);
    const id = '1';
    const createFirebaseStub = jasmine.createSpyObj('NewsService', ['createFirebase']);
    createFirebaseStub.createFirebase.and.returnValue(of(expectedNews));
    
  });

  it('should delete news by ID', async () => {
    await service.deleteFirebase('1');
    expect(newsDetailServiceStub.deleteFirebase).toHaveBeenCalledWith('1');    
  });

});
