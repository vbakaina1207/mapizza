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

describe('VacancyInfoComponent', () => {
  let component: VacancyInfoComponent;
  let fixture: ComponentFixture<VacancyInfoComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [VacancyInfoComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,     
        AngularFireStorageModule
      ],
      providers: [
        ImageService  ,
        { provide: Storage, useValue: {} },       
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} },
        { provide: ToastrService, useValue: {} },
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
