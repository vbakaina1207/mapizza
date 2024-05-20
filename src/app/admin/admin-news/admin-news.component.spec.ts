/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminNewsComponent } from './admin-news.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { Storage } from '@angular/fire/storage';
import { Firestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

describe('AdminNewsComponent', () => {
  let component: AdminNewsComponent;
  let fixture: ComponentFixture<AdminNewsComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [AdminNewsComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        AngularFireStorageModule,
        AngularFireModule
      ],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: ToastrService, useValue: {} },
        { provide: Firestore, useValue: {} },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
