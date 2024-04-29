/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { SlideAboutComponent } from './slide-about.component';

describe('SlideAboutComponent', () => {
  let component: SlideAboutComponent;
  let fixture: ComponentFixture<SlideAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SlideAboutComponent],
      schemas: [
        NO_ERRORS_SCHEMA
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
