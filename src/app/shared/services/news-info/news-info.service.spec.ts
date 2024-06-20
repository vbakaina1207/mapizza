/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { NewsInfoService } from './news-info.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { INewsAddRequest, INewsAddResponse } from '../../interfaces/news/news-info.interface';


 describe('Service: NewsInfo', () => {
  let newsInfoService: NewsInfoService;

  const data = [
    {
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
    }
  ];

  const newsInfoServiceStub = {    
    getAllFirebase: jasmine.createSpy('getAllFirebase').and.returnValue(of(data)),
    getOneFirebase: jasmine.createSpy('getOneFirebase').and.returnValue(of(data[0])),
    createFirebase: (data: INewsAddRequest) => Promise.resolve({
      id: '1',
      ...data
    } as INewsAddResponse),
    updateFirebase: jasmine.createSpy('updateFirebase').and.returnValue(Promise.resolve()),
    deleteFirebase: jasmine.createSpy('deleteFirebase').and.returnValue(Promise.resolve())
  }
  

  
   beforeEach(async() => {
     await TestBed.configureTestingModule({
       providers: [         
         { provide: NewsInfoService, useValue: newsInfoServiceStub },
       ],
       imports: [
         HttpClientTestingModule
       ]
     }).compileComponents();

     newsInfoService = TestBed.inject(NewsInfoService);
   });

   it('should ...', inject([NewsInfoService], (service: NewsInfoService) => {
     expect(service).toBeTruthy();
   }));

   it('can test getAllFirebase', () => {
    const expectedData = [
      {
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
      }
    ];
    
    newsInfoService.getAllFirebase().subscribe((response: any) => expect(response).toEqual(expectedData));
  });

  it('should send create request and return new news', () => {
    const productRequest: INewsAddRequest = {      
      title: 'test',
      description: 'test description',
      imagePath: '',
      detail:[{
        id: '1',     
      title: 'test',
      description: 'test description',
      imagePath: '',
      detail:[]
      }]
    };

    const expectedProduct: INewsAddResponse = {
      id: '1',
      title: 'test',
      description: 'test description',
      imagePath: '',
      detail:[{
        id: '1',     
      title: 'test',
      description: 'test description',
      imagePath: '',
      detail:[]
      }]
    };

    newsInfoService.createFirebase(productRequest).then((result: any) => {
      expect(result).toEqual(expectedProduct);
    });
   
  });


  it('should fetch all news details', (done) => {
    const expectedData = data;

    newsInfoService.getAllFirebase().subscribe((response) => {
      expect(response).toEqual(expectedData);
      done();
    });

    expect(newsInfoServiceStub.getAllFirebase).toHaveBeenCalled();
  });

  it('should fetch one news detail by ID', (done) => {
    const expectedData = data[0];

    newsInfoService.getOneFirebase('1').subscribe((response) => {
      expect(response).toEqual(expectedData);
      done();
    });

    expect(newsInfoServiceStub.getOneFirebase).toHaveBeenCalledWith('1');
  });

  

  it('should update existing news by ID', async () => {
    const newsUpdate: INewsAddRequest = {
      title: 'updated test',
      description: 'updated description',
      imagePath: '',
      detail: [{
        id: '1',
        title: 'updated test',
        description: 'updated description',
        imagePath: '',
        detail: []
      }]
    };

    await newsInfoService.updateFirebase(newsUpdate, '1');
    expect(newsInfoServiceStub.updateFirebase).toHaveBeenCalledWith(newsUpdate, '1');
  });

  
  it('should delete news by ID', async () => {
    await newsInfoService.deleteFirebase('1');
    expect(newsInfoServiceStub.deleteFirebase).toHaveBeenCalledWith('1');
  });

 });

