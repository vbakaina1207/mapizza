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

  it('should get all discount', () => {
    const fixture = TestBed.createComponent(DiscountComponent);
    const app = fixture.componentInstance;
    let service = fixture.debugElement.injector.get(DiscountService);
    spyOn(service,"getAllFirebase").and.callFake(() => {
      return of([]);
    });
    app.getDiscounts();
    expect(app.userDiscounts).toEqual([]);
  });
});