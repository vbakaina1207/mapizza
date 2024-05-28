/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PageComponent } from './page.component';
import { of } from 'rxjs';
import { PageService } from 'src/app/shared/services/page/page.service';
import { CollectionReference, Firestore } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


const firestoreMock = {
  collection: jasmine.createSpy('collection').and.callFake(() => {
    return {} as CollectionReference;
  }),
};


describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  const serviceStub = {
    getPageById: (id: string) =>
      of({ id: id, page: 1}),
  };

  

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
      declarations: [PageComponent],
      imports: [
          RouterTestingModule,
          HttpClientTestingModule,          
        ],
        providers: [
          { provide: PageService, useValue: serviceStub },      
          { provide: Firestore, useValue: firestoreMock }
        ]
        
    })
    .compileComponents();
  })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
