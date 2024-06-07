/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';


import { VacancyInfoComponent } from './vacancy-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { Storage } from '@angular/fire/storage';
import { of } from 'rxjs';
import { MassageService } from 'src/app/shared/services/massage/massage.service';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { ActivatedRoute } from '@angular/router';

describe('VacancyInfoComponent', () => {
  let component: VacancyInfoComponent;
  let fixture: ComponentFixture<VacancyInfoComponent>;

  const vacancyServiceStub = {
    getAllFirebase: () => of([
      {
        id: 1,
        name: 'new vacancy',
        path: '',
        description: '',
        imagePath: ''
      }
    ])
  };

  
  const massageServiceStub = {
    getOneFirebase: (id: string) =>
      of({ id: id, name: 'Ivan', email: 'ivan@gmail.com', description:' ', imagePath: '' , date_message: ''}),
    getAllFirebase: () =>
      of([{ id: 1, name: 'Ivan', email: 'ivan@gmail.com', description:' ', imagePath: '' , date_message: ''}]),
  };

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [VacancyInfoComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,             
      ],
      providers: [
        ImageService  ,
        { provide: Storage, useValue: {} },               
        // { provide: Firestore, useValue: {} },
        { provide: ToastrService, useValue: {} },
        { provide: MassageService, useValue: massageServiceStub },
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ vacancyInfo: vacancyServiceStub })
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacancyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
