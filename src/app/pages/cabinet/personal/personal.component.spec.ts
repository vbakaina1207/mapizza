/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PersonalComponent } from './personal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Storage } from '@angular/fire/storage';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { AuthAddressComponent } from 'src/app/components/auth-address/auth-address.component';
import { Subject, of } from 'rxjs';
import { AccountService } from 'src/app/shared/services/account/account.service';

describe('PersonalComponent', () => {
  let component: PersonalComponent;
  let fixture: ComponentFixture<PersonalComponent>;
  let accountService: AccountService;

  const toastrServiceStub = {
    success: jasmine.createSpy(),
    error: jasmine.createSpy()
  };

  const accountServiceStub = {
    isUserLogin$: new Subject<boolean>(),
    changeAddress: new Subject<boolean>(),
    changeCurrentUser: new Subject<boolean>(),
    changeFavorite: new Subject<boolean>(),
    searchAddress: new Subject<string>(),
    address$: new Subject<string>().asObservable(),
    updateAddress: jasmine.createSpy('updateAddress').and.callFake((address: string) => {
      accountServiceStub.searchAddress.next(address);
    }),    
  };

  
  const  mockAccountService = jasmine.createSpyObj('AccountService', ['userAddress', 'changeAddress', 'changeCurrentUser']);
  const  mockToastr = jasmine.createSpyObj('ToastService', ['showSuccess', 'showError']);
  const mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
  const  mockFirestore = jasmine.createSpyObj('Firestore', ['doc', 'getDoc', 'setDoc']);

  beforeEach(async() => {

    await TestBed.configureTestingModule({
      declarations: [PersonalComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatDialogModule,
        AngularFireStorageModule
      ],
      providers: [       
        { provide: Storage, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: Auth, useValue: {} },
        { provide: Firestore, useValue: {} },
        { provide: ToastrService, useValue: toastrServiceStub },
        { provide: ToastService, useValue: mockToastr },
        { provide: MatDialog, useValue: mockDialog },
        { provide: AccountService, useValue: accountServiceStub },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('load user', () => {
    let user = component.currentUser;
    localStorage.getItem('currentUser');
    component.loadUser();
    expect(component).toBeTruthy();
  });

  it('should load user from local storage', fakeAsync(() => {
    const mockUser = { uid: '123', email: 'test@example.com', address: 'test address' };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUser));

    component.loadUser().then(() => {
      expect(component.currentUser).toEqual(mockUser);
      expect(component.dataUser).toEqual(mockUser.address);
    });

    tick();
  }));
  

  it('should initialize form with user data', fakeAsync(() => {
    component.currentUser = { email: 'test@example.com', firstName: 'John', lastName: 'Doe', phoneNumber: '1234567890', birthday: '2000-01-01' };

    component.initAuthFormData();
    fixture.detectChanges();
    tick();

    expect(component.authFormData.value.email).toBe('test@example.com');
    expect(component.authFormData.value.firstName).toBe('John');
    expect(component.authFormData.value.lastName).toBe('Doe');
    expect(component.authFormData.value.phoneNumber).toBe('1234567890');
    expect(component.authFormData.value.birthday).toBe('2000-01-01');
  }));

  it('should open address dialog and update address', fakeAsync(() => {
    mockDialog.open.and.returnValue({
      afterClosed: () => of(true)
    } as any); 

    component.openAddressDialog();
    fixture.detectChanges();
    tick(); 

    expect(mockDialog.open).toHaveBeenCalledWith(AuthAddressComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'auth-address-dialog',
      autoFocus: false
    });
    expect(component.isOpenAddressForm).toBeTrue();
    expect(component.dataUser).toEqual(component.accountService.userAddress);
  }));


  // it('should call updateDoc and update user', fakeAsync(() => {
  //   const mockUser = { uid: '123' };
  //   component.currentUser = mockUser;
  //   component.user = { email: 'test@example.com', address: 'test address' };
  //   spyOn(localStorage, 'setItem');
  //   mockFirestore.setDoc.and.returnValue(Promise.resolve());
  
  //   component.updateUser();
  //   tick();
  
  //   expect(component.toastr.showSuccess).toHaveBeenCalledWith('', 'Дані змінено');
  //   expect(localStorage.setItem).toHaveBeenCalledWith('currentUser', JSON.stringify(component.user));
  // }));


  it('should handle error when updating user', fakeAsync(() => {
    const mockError = new Error('Update failed');   
    mockFirestore.setDoc.and.returnValue((mockError));

    component.updateUser();
    tick();

    expect(mockToastr.showError).toHaveBeenCalledWith('', 'Дані не змінено');
  }));

  it('should delete address', () => {
    component.dataUser = ['address1', 'address2'];
    component.deleteAddress(1);
    fixture.detectChanges();

    expect(component.dataUser.length).toBe(1);
    expect(component.dataUser).not.toContain('address2');
  });

  it('should handle changeCurrentUser subscription', fakeAsync(() => {
    const changeCurrentUserSubject = new Subject<void>();
    mockAccountService.changeCurrentUser.and.returnValue(changeCurrentUserSubject.asObservable());

    component.updateCurrentUser();
    changeCurrentUserSubject.next();
    fixture.detectChanges();
    tick();

    expect(mockAccountService.changeCurrentUser).toBeTruthy();
  }));

  it('should handle changeAddress subscription1', fakeAsync(() => {
    const changeAddressSubject = new Subject<void>();
    mockAccountService.changeAddress.and.returnValue(changeAddressSubject.asObservable());

    component.updateAddress();
    changeAddressSubject.next();
    fixture.detectChanges();
    tick();

    expect(mockAccountService.changeAddress).toBeDefined();
  }));




});
