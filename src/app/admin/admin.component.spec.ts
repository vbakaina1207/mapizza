/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { AdminComponent } from './admin.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports:[
        HttpClientTestingModule,
        MatDialogModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
