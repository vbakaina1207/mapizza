/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiscountInfoComponent } from './discount-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';
import { of } from 'rxjs';

describe('DiscountInfoComponent', () => {
  let component: DiscountInfoComponent;
  let fixture: ComponentFixture<DiscountInfoComponent>;

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
      declarations: [DiscountInfoComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: DiscountService, useValue: discountServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
