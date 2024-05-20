/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OffertaComponent } from './offerta.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('OffertaComponent', () => {
  let component: OffertaComponent;
  let fixture: ComponentFixture<OffertaComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [OffertaComponent],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
