/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {  NO_ERRORS_SCHEMA } from '@angular/core';

import { FooterComponent } from './footer.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('FooterComponent', () => {
//   let component: FooterComponent;
//   let fixture: ComponentFixture<FooterComponent>;

//   beforeEach(async() => {
//     await TestBed.configureTestingModule({
//       declarations: [FooterComponent],
//       schemas: [
//         NO_ERRORS_SCHEMA
//         ]
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(FooterComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  // const serviceStub = {
  //   getBlogById: (id: string) =>
  //     of({ id: id, title: '', description: '', imagePath: '' }),
  // };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FooterComponent],
        imports: [RouterTestingModule],
        // providers: [{ provide: BlogService, useValue: serviceStub }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});