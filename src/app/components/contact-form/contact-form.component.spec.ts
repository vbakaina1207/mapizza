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

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ContactFormComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatDialogModule,
        AngularFireModule,
        AngularFireStorageModule
      ],
      providers: [
        ImageService,
        MassageService,
        { provide: Storage, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} },
        { provide: ToastrService, useValue: {} },
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
