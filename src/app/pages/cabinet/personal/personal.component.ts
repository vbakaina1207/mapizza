import { Component, OnInit } from '@angular/core';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthAddressComponent } from 'src/app/components/auth-address/auth-address.component';

import { AccountService } from 'src/app/shared/services/account/account.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';


@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

  public authFormData!: FormGroup;
  public currentUser: any;
  public dataUser!: any;
  public index!: number;
  public isEdit!: boolean;
  public user = {};
  public isOpenAddressForm: boolean = false;
  

  constructor(
    private fb: FormBuilder,
    private afs: Firestore,
    public toastr: ToastService,
    private toast: ToastrService,
    public dialog: MatDialog,
    public accountService: AccountService
  ) { }

  ngOnInit() {
    this.loadUser().then(() => {
    this.initAuthFormData();
    this.getUser();
    this.updateAddress();
    this.updateCurrentUser();
  });
  }


  loadUser(): Promise<void> {
  return new Promise((resolve) => {
    if (localStorage.length > 0 && localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
      this.accountService.userAddress = this.currentUser['address'];
      this.dataUser = this.accountService.userAddress;
      if (this.isOpenAddressForm) {
        this.updateAddress();
      }
      resolve();
    } else {
      resolve();
    }
  });
}
  

  initAuthFormData(): void {
    if (this.currentUser) {
      this.authFormData = this.fb.group({
        email: [this.currentUser['email'] || null, [Validators.required, Validators.email]],
        password: [null, [Validators.required]],
        firstName: [this.currentUser['firstName'] || null, [Validators.required]],
        lastName: [this.currentUser['lastName'] || null, [Validators.required]],
        phoneNumber: [this.currentUser['phoneNumber'] || null, [Validators.required]],
        birthday: [this.currentUser['birthday'] || null]
      });
    }
  }

  editUser(): void {
    this.authFormData.patchValue({
      email: this.currentUser['email'],
      firstName: this.currentUser['firstName'],
      lastName: this.currentUser['lastName'],
      phoneNumber: this.currentUser['phoneNumber'],
      birthday: this.currentUser['birthday'],
      role: 'USER'
    });
  }

  openAddressDialog(): void {
    this.dialog.open(AuthAddressComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'auth-address-dialog',
      autoFocus: false
    }).afterClosed().subscribe(result => {
      console.log(result);
      this.dataUser = this.accountService.userAddress;      
    })
    this.isOpenAddressForm = true;
    this.dataUser = this.accountService.userAddress;    
  }

  getUser(): void{
    if (this.currentUser)
    getDoc(doc(this.afs, "users", this.currentUser.uid)).then((user_doc) => {        
        this.authFormData = this.fb.group({
          email: [this.currentUser['email'], [Validators.required, Validators.email]],          
          password: [null, [Validators.required]],
          firstName: [this.currentUser['firstName'], [Validators.required]],
          lastName: [this.currentUser['lastName'], [Validators.required]],
          phoneNumber: [this.currentUser['phoneNumber'], [Validators.required]],
          birthday: [this.currentUser['birthday']]
        });    
        this.dataUser = user_doc.get('address');        
      })
}

  updateUser():void{        
    this.updateDoc().then(() => {      
      this.toastr.showSuccess('', 'Дані змінено');      
    }).catch(e => {
      this.toast.error(e.message);
      this.toastr.showError('', 'Дані не змінено'); 
    });
    
  }

  selectDataUser(): void {
    const { email, firstName, lastName, phoneNumber, birthday } = this.authFormData.value;
    this.user = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      birthday: birthday,
      address: this.dataUser,
      role: 'USER'
    };    
  }

  async updateDoc(): Promise<any> {
    this.selectDataUser();
    const user = this.user;
    setDoc(doc(this.afs, 'users', this.currentUser.uid), user, { merge: true });
    localStorage.setItem('currentUser', JSON.stringify( user));
  }

  updateCurrentUser(): void {
    this.accountService.changeCurrentUser.subscribe(() => {
      this.loadUser();
    })
  }

  


  

  updateAddress(): void {
    this.accountService.changeAddress.subscribe(() => {
      this.dataUser = this.accountService.userAddress;
    })
  }


  editAddress( i: number): void {
    getDoc(doc(this.afs, "users", this.currentUser.uid)).then((user_doc) => {
      this.dataUser = user_doc.get('address');
    });
    this.accountService.index = i;
    this.isEdit = true;
    this.accountService.isEdit = this.isEdit;
    this.openAddressDialog();
    }
 
  deleteAddress(i: number): void {
    this.dataUser.splice(i, 1);
    this.accountService.userAddress = this.dataUser;
  }
}
