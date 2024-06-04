/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminVacancyComponent } from './admin-vacancy.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { Storage } from '@angular/fire/storage';
import { VacancyService } from 'src/app/shared/services/vacancy/vacancy.service';
import { of } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';

describe('AdminVacancyComponent', () => {
  let component: AdminVacancyComponent;
  let fixture: ComponentFixture<AdminVacancyComponent>;

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

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [AdminVacancyComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatDialogModule
      ],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: ToastrService, useValue: {} },
        { provide: VacancyService, useValue: vacancyServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVacancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
