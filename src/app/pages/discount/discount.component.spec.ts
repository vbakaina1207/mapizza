/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiscountComponent } from './discount.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

describe('DiscountComponent', () => {
  let component: DiscountComponent;
  let fixture: ComponentFixture<DiscountComponent>;

  const discountServiceStub = {
    getOneFirebase: (id: string) => of({
      id: id,     
      date: null,
      name: 'test discount',
      title: '',
      description: '',
      imagePath: ''
    }),
  }

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [DiscountComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: DiscountService, useValue: discountServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});