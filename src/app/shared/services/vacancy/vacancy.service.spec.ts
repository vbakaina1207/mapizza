
import { TestBed, inject } from '@angular/core/testing';
import { VacancyService } from './vacancy.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { IVacancyResponse } from '../../interfaces/vacancy/vacancy.interface';
import { Firestore } from '@angular/fire/firestore';


describe('Service: Vacancy', () => {
  let httpTestingController: HttpTestingController;
  let vacancyService: VacancyService;

  
  const mockVacancy: IVacancyResponse = {
    id: '1',
    name: 'Sample Vacancy',
    path: '',
    description: 'A test vacancy description',
    imagePath: ''
  };

 

  const vacancyServiceMock = {
    getOneFirebase: (id: string) => of({
      id: id,
      name: 'Sample Vacancy',
      path: '',
      description: 'A test vacancy description',
      imagePath: ''
    }),
    getAllFirebase: () => of([{
      id: 1,
      name: 'Sample Vacancy',
      path: '',
      description: 'A test vacancy description',
      imagePath: ''
    }]),
  updateFirebase: ( vacancy: Partial<IVacancyResponse>, id: string) => of({
    id: id,
    ...vacancy
  }),
  createFirebase: (vacancy: IVacancyResponse) => of({ ...vacancy }),

    deleteFirebase: (id: string) => of({
      id: id, 
      name: 'new vacancy',
      path: '',
      description: '',
      imagePath: '' }),
};
  const firestoreMock = {
    collection: jasmine.createSpy('collection').and.callFake((path: string) => {
      return {
        withConverter: () => ({
          get: () => of({ docs: [{ id: '1', data: () => mockVacancy }] })
        })
      };
    }),
    doc: jasmine.createSpy('doc').and.callFake((path: string) => {
      return {
        withConverter: () => ({
          get: () => of({ exists: true, id: '1', data: () => mockVacancy })
        })
      };
    })
  };
 

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,       
      ],
      providers: [          
        { provide: VacancyService, useValue: vacancyServiceMock },
       
        { provide: Firestore, useValue: firestoreMock } 
      ],      
      
    }).compileComponents();
    
    vacancyService = TestBed.inject(VacancyService);
    
  });

  it('should ...', inject([VacancyService], (service: VacancyService) => {
    expect(service).toBeTruthy();
  }));


  it('getOneFirebase should return a type product by id', (done: DoneFn) => {
    const id = '1';
    const service = TestBed.inject(VacancyService);

    service.getOneFirebase(id)
      .subscribe(vacancy => {
        expect(vacancy).toEqual(mockVacancy);
        done();
      });
  });

  it('should get all vacancies', inject([VacancyService], (service: VacancyService) => {
        service.getAllFirebase().subscribe((vacancies) => {
          expect(vacancies.length).toBeGreaterThan(0);
        });
      }));
  
     
});
