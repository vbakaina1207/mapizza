/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInfoComponent } from './product-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductInfoComponent', () => {
  let component: ProductInfoComponent;
  let fixture: ComponentFixture<ProductInfoComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ProductInfoComponent],
      imports: [
        HttpClientTestingModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
