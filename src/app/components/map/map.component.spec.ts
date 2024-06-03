/* tslint:disable:no-unused-variable */
import {  ComponentFixture, TestBed, waitForAsync, inject} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, InjectionToken } from '@angular/core';

import { MapComponent } from './map.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GoogleMapsModule } from '@angular/google-maps';

export const GOOGLE = new InjectionToken('google');
export const googleFactory = () => google;

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(waitForAsync(() => {
  const mockGoogle = jasmine.createSpyObj('google', ['maps']);
    TestBed.configureTestingModule({
      declarations: [MapComponent],
      imports: [
        MatDialogModule,
        RouterTestingModule,
        HttpClientTestingModule,
        GoogleMapsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: ToastrService, useValue: {} },
        { provide: GOOGLE, useFactory: googleFactory}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
