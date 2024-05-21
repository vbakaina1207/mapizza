/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FaqComponent } from './faq.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { Storage } from '@angular/fire/storage';
import { FaqService } from 'src/app/shared/services/faq/faq.service';
import { of } from 'rxjs';

describe('FaqComponent', () => {
  let component: FaqComponent;
  let fixture: ComponentFixture<FaqComponent>;
  const serviceStub = {
    getBlogById: (id: string) =>
      of({ id: id, name: '', email: '', phone:' ', stars: 4, comment: '', imagePath: '' , date_message: ''}),
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FaqComponent],
        imports: [RouterTestingModule,
          HttpClientTestingModule,
          RouterTestingModule,
          ReactiveFormsModule,
          MatDialogModule,
        ],
        providers: [
          { provide: FaqService, useValue: serviceStub },
          ImageService,
          { provide: Storage, useValue: {} },
          { provide: MatDialogRef, useValue: {} },
          { provide: Firestore, useValue: {} },
          { provide: ToastrService, useValue: {} },
          { provide: Auth, useValue: {} },],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
