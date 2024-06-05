/* tslint:disable:no-unused-variable */
<<<<<<< HEAD
import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
=======
import { ComponentFixture, TestBed } from '@angular/core/testing';
>>>>>>> 449cca214dbcf9a6ea0a0be40342f1661a01bd35
import { DiscountInfoComponent } from './discount-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';
import { of } from 'rxjs';
<<<<<<< HEAD
import { Timestamp } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';



=======
>>>>>>> 449cca214dbcf9a6ea0a0be40342f1661a01bd35

describe('DiscountInfoComponent', () => {
  let component: DiscountInfoComponent;
  let fixture: ComponentFixture<DiscountInfoComponent>;

<<<<<<< HEAD
  const mockTimestamp = Timestamp.fromDate(new Date('2024-12-12T10:45:00Z'));
  const mockTimestampString = mockTimestamp.toDate().toString(); 

  const discountServiceStub = {
    getOneFirebase: (id: string) => of({
      id: id,     
      date:  mockTimestamp, 
=======
  const discountServiceStub = {
    getOneFirebase: (id: string) => of({
      id: id,     
      date: null,
>>>>>>> 449cca214dbcf9a6ea0a0be40342f1661a01bd35
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
<<<<<<< HEAD
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({ discountInfo: discountServiceStub })
          }
        }
=======
        { provide: DiscountService, useValue: discountServiceStub }
>>>>>>> 449cca214dbcf9a6ea0a0be40342f1661a01bd35
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