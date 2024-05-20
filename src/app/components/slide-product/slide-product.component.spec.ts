/* tslint:disable:no-unused-variable */
import {ComponentFixture, TestBed } from '@angular/core/testing';


import { SlideProductComponent } from './slide-product.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SlideProductComponent', () => {
  let component: SlideProductComponent;
  let fixture: ComponentFixture<SlideProductComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [SlideProductComponent],
      imports:[
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
