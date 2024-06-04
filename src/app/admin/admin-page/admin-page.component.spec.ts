/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminPageComponent } from './admin-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { Storage } from '@angular/fire/storage';
import { of } from 'rxjs';
import { PageService } from 'src/app/shared/services/page/page.service';
import { MatDialogModule } from '@angular/material/dialog';

describe('AdminPageComponent', () => {
  let component: AdminPageComponent;
  let fixture: ComponentFixture<AdminPageComponent>;

  const servicePagetStub = {
    getOneFirebase: (id: string) => of({      
      id: 1, page: '1'
    }),
    getAllFirebase: () => of([
      { id: 1, name: '1' }
    ])
  };

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [AdminPageComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatDialogModule
      ],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: ToastrService, useValue: {} },
        { provide: PageService, useValue: servicePagetStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
