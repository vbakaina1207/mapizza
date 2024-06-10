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
import { TermsDialogComponent } from 'src/app/components/terms-dialog/terms-dialog.component';
import { AuthDialogComponent } from 'src/app/components/auth-dialog/auth-dialog.component';

describe('FaqComponent', () => {
  let component: FaqComponent;
  let fixture: ComponentFixture<FaqComponent>;
  let faqService: FaqService;
  let imageService: ImageService;

  const serviceStub = {
    getBlogById: (id: string) =>
      of({ id: id, name: '', email: '', phone:' ', stars: 4, comment: '', imagePath: '' , date_message: ''}),
  };


  const faqServiceSpy = jasmine.createSpyObj('FaqService', ['createFirebase']);

faqServiceSpy.createFirebase.and.returnValue(Promise.resolve({
  id: 'mockDocumentId' 
}));


const toastrServiceStub = {
  success: jasmine.createSpy(),
  error: jasmine.createSpy()
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
          { provide: FaqService, useValue: faqServiceSpy },
          ImageService,
          { provide: Storage, useValue: {} },
          { provide: MatDialogRef, useValue: {} },
          { provide: Firestore, useValue: {} },
          { provide: ToastrService, useValue: toastrServiceStub },
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

  it('load user', () => {
    let user = component.currentUser;
    localStorage.getItem('currentUser');
    component.loadUser();
    expect(component).toBeTruthy();
  });
  

  it('should update selectedStars and feedback form stars field', () => {
    const star = { star: 4, text: 'Good' };
    component.rate(star);
    expect(component.selectedStars).toBe(4);
    expect(component.feedbackForm.get('stars')?.value).toBe(4);
  });

  
  it('should return value by control name', () => {
    component.feedbackForm.patchValue({ name: 'John Doe' });
    const value = component.valueByControl('name');
    expect(value).toBe('John Doe');
  });

  it('should open terms dialog', () => {
    spyOn(component.dialog, 'open').and.callThrough();
    component.termsClick();
    expect(component.dialog.open).toHaveBeenCalledWith(TermsDialogComponent, jasmine.any(Object));
  });

  it('should open login dialog', () => {
    spyOn(component.dialog, 'open').and.callThrough();
    component.openLoginDialog();
    expect(component.dialog.open).toHaveBeenCalledWith(AuthDialogComponent, jasmine.any(Object));
  });
  
  
  it('should delete image and update feedback form imagePath', async () => {
    spyOn(component.imageService, 'deleteUploadFile').and.returnValue(Promise.resolve());
    component.feedbackForm.patchValue({ imagePath: 'mockImagePath' });
    await component.deleteImage();
    expect(component.isUploaded).toBeFalse();
    expect(component.feedbackForm.get('imagePath')?.value).toEqual(null); 
  });
  

  it('should upload image and update feedback form imagePath', async () => {
    const mockFile = new File([''], 'test.jpg', { type: 'image/jpeg' });
    const mockEvent = { target: { files: [mockFile] } };    
    spyOn(component.imageService, 'uploadFile').and.returnValue(Promise.resolve('mockImagePath'));
    await component.upload(mockEvent);
    expect(component.isUploaded).toBeTrue();
    expect(component.feedbackForm.get('imagePath')?.value).toEqual('mockImagePath');
  });
  
  
  

  it('should load user from localStorage', () => {
    const mockUser = { firstName: 'John', email: 'john@example.com', phoneNumber: '1234567890' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));
    component.loadUser();
    expect(component.currentUser).toEqual(mockUser);
    expect(component.isLogin).toBeTrue();
  });
  
  it('should open login dialog if no user is found', () => {
    spyOn(component, 'openLoginDialog');
    spyOn(localStorage, 'getItem').and.returnValue(null);
    component.loadUser();
    expect(component.openLoginDialog).toHaveBeenCalled();
  });
  

  it('should initialize feedback form', () => {
    component.ngOnInit();
    expect(component.feedbackForm).toBeDefined();
    expect(component.feedbackForm.get('name')?.value).toBe(null);
    expect(component.feedbackForm.get('email')?.value).toBe(null);
    expect(component.feedbackForm.get('phone')?.value).toBe(null);
    expect(component.feedbackForm.get('stars')?.value).toBe(0);
    expect(component.feedbackForm.get('comment')?.value).toBe('');
    expect(component.feedbackForm.get('imagePath')?.value).toBe(null);
  });


});
