/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminCategoryComponent } from './admin-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Storage } from '@angular/fire/storage';
import { of } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { MatDialogModule } from '@angular/material/dialog';

describe('AdminCategoryComponent', () => {
  let component: AdminCategoryComponent;
  let fixture: ComponentFixture<AdminCategoryComponent>;

  const categoryServiceStub = {
    getOneFirebase: (id: string) =>
      of({
        id: id,
        name: 'test category',
        path: '',
        imagePath: '',
      }),
<<<<<<< HEAD
      getAllFirebase: () =>
        of([{
          id: 1,
          name: 'test category',
          path: '',
          imagePath: '',
        }])
=======
>>>>>>> 449cca214dbcf9a6ea0a0be40342f1661a01bd35
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCategoryComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, MatDialogModule],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: ToastrService, useValue: {} },
        { provide: CategoryService, useValue: categoryServiceStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});