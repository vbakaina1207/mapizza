import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import {FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/shared/services/account/account.service';



@Component({
  selector: 'app-auth-address',
  templateUrl: './auth-address.component.html',
  styleUrls: ['./auth-address.component.scss']
})
export class AuthAddressComponent implements OnInit {

  public authFormAddress!: FormGroup;
  public currentUser!: any;
  public i!: number;
  public dataUser!: any;
  public isEdit!: boolean;
  


constructor(
    private auth: Auth,
    private afs: Firestore,
    private router: Router,
    private accountService: AccountService,
    private toastr: ToastrService,
    private fb: FormBuilder
) {}

  ngOnInit() {
    this.loadUser();
    this.getAddress();
    this.initAuthFormAddress();
  }

  initAuthFormAddress(): any {
    this.i = this.accountService.index;
    this.isEdit = this.accountService.isEdit;
    this.dataUser = this.accountService.userAddress ;
    if ( this.isEdit && this.i) {      
      this.authFormAddress = this.fb.group({        
        typeAddress: [this.dataUser[this.i].typeAddress, [Validators.required, Validators.required]],
        city: [this.dataUser[this.i].city, [Validators.required]],
        street: [this.dataUser[this.i].street, [Validators.required]],
        house: [this.dataUser[this.i].house, [Validators.required]],
        entrance: [this.dataUser[this.i].entrance],
        floor: [this.dataUser[this.i].floor],
        flat: [this.dataUser[this.i].flat],
      });           
    } else {
      this.authFormAddress = this.fb.group({
        typeAddress: [null, [Validators.required, Validators.required]],
        city: [null, [Validators.required]],
        street: [null, [Validators.required]],
        house: [null, [Validators.required]],
        entrance: [null],
        floor: [null],
        flat: [null],
      });
    }
  }



  loadUser(): void {
    if(localStorage.length > 0 && localStorage.getItem('currentUser')){
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    }
  }

  getAddress(): void {
    this.getDataUser().then(() => {
      this.toastr.success('Data user successfully');
    }).catch(e => {
      this.toastr.error(e.message);
    })
  }

  async getDataUser(): Promise<any> {
    getDoc(doc(this.afs, "users", this.currentUser.uid )).then((user_doc) => {
      this.dataUser = user_doc.get('address');  
    });
    
    
  }


  addAddress():void{
    this.updateAddress().then(() => {
      this.toastr.success('Address successfully changed');
    }).catch(e => {
      this.toastr.error(e.message);
    });
    this.isEdit = false;
    this.accountService.isEdit = this.isEdit;
  }

  async updateAddress(): Promise<any> {    
    const { typeAddress, city, street, house, entrance, floor, flat } = this.authFormAddress.value;
    let user = {
        typeAddress: typeAddress,
        city: city,
        street: street,
        house: house,
        entrance: entrance,
        floor: floor,
        flat: flat
    };
    if (!this.isEdit) {
      this.dataUser.push(user);
      
    } else {
      this.dataUser.splice(this.i, 1, user);
    }    
    this.accountService.userAddress = this.dataUser;
    
  }


  
}
