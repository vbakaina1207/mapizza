/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDiscountComponent } from './admin-discount.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { Storage } from '@angular/fire/storage';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';
import { of } from 'rxjs';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/sahared.module';

describe('AdminDiscountComponent', () => {
  let component: AdminDiscountComponent;
  let fixture: ComponentFixture<AdminDiscountComponent>;

  const discountServiceStub = {
    getOneFirebase: (id: string) => of({
      id: id,     
      date: null,
      name: 'test discount',
      title: '',
      description: '',
      imagePath: ''
    }),
    getAllFirebase: () => of([{
      id: 1,     
      date: null,
      name: 'test discount',
      title: '',
      description: '',
      imagePath: ''
    }]),
  }

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [AdminDiscountComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatDialogModule,
        SharedModule   
      ],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: ToastrService, useValue: {} },
        { provide: DiscountService, useValue: discountServiceStub }
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