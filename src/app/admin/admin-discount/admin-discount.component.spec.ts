/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminDiscountComponent } from './admin-discount.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { Storage } from '@angular/fire/storage';

describe('AdminDiscountComponent', () => {
  let component: AdminDiscountComponent;
  let fixture: ComponentFixture<AdminDiscountComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [AdminDiscountComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: ToastrService, useValue: {} },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
