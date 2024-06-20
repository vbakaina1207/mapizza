import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Auth, EmailAuthProvider, getAuth, reauthenticateWithCredential, updatePassword, User } from "@angular/fire/auth";
import { ToastrService } from "ngx-toastr";
import { ToastService } from '../../../shared/services/toast/toast.service';
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  public authForm!: FormGroup;
  public currentUser: any;
  public checkPassword: boolean = false;
  public invalidPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: Auth,
    private toast: ToastrService,
    public toastr: ToastService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadUser();
    this.initAuthForm();
  }

  initAuthForm(): void {
    this.authForm = this.fb.group({
      password: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    });
  }

  loadUser(): void {
    if(localStorage.length > 0 && localStorage.getItem('currentUser')){
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    }
  }

  getPassword(): void {
    const getauth = getAuth();
    const { password } = this.authForm.value;
    let credential = EmailAuthProvider.credential(getauth.currentUser?.email as string, password);
    reauthenticateWithCredential(getauth.currentUser as User, credential)
        .then(() => {            
            this.invalidPassword = false;
            this.toastr.showSuccess('', 'Password valid');
        }).catch(e => {      
            this.invalidPassword = true;
            this.toast.error(e.message);
        });
  }
  
  updatePassword(): void {
    const { newPassword } = this.authForm.value;
    const user = this.auth.currentUser; 
    if (user) { 
        updatePassword(user, newPassword).then(() => {
            this.toastr.showSuccess('', 'Password successfully changed');
            this.router.navigate(['/cabinet']);
        }).catch(e => {
          this.toast.error(e.message);
          this.toastr.showError('', 'Password change error');
        });
    }
}
  
  checkConfirmPassword(): void {
    this.checkPassword = this.newPassword.value === this.confirmed.value;
    if (!this.checkPassword && this.newPassword.value !== this.confirmed.value && this.password.value !== this.newPassword.value) {
      this.authForm.controls['confirmPassword'].setErrors({
        matchError: 'Password confirmation doesnt match'
      });
    } else if (this.password.value === this.newPassword.value) {
      this.authForm.controls['confirmPassword'].setErrors({
        sameAsOldError: 'The new password must not be the same as the old one'
      });
    }
  }

  get password(): AbstractControl {
    return this.authForm.controls['password'];
  }

  get newPassword(): AbstractControl {
    return this.authForm.controls['newPassword'];
  }

  get confirmed(): AbstractControl {
    return this.authForm.controls['confirmPassword'];
  }

  checkVisibilityError(control: string, name: string): boolean | null {
    return this.authForm.controls[control].errors?.[name];
  }
}
