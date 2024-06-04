/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ContactFormComponent } from './contact-form.component';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { Storage } from '@angular/fire/storage';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { MassageService } from 'src/app/shared/services/massage/massage.service';
import { AngularFireModule } from '@angular/fire/compat';
import { of } from 'rxjs';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;

  const serviceMassageStub = {
    getOneFirebase: (id: string) =>
      of({ id: id, name: 'Ivan', email: 'ivan@gmail.com', description:' ', imagePath: '' , date_message: ''}),
    getAllFirebase: () =>
      of([{ id: 1, name: 'Ivan', email: 'ivan@gmail.com', description:' ', imagePath: '' , date_message: ''}]),
  };

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ContactFormComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatDialogModule,       
      ],
      providers: [
        ImageService,
        MassageService,
        { provide: Storage, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: Auth, useValue: {} },       
        { provide: ToastrService, useValue: {} },
        { provide: MassageService, useValue: serviceMassageStub }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
