import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../shared/services/account/account.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthDialogComponent } from 'src/app/components/auth-dialog/auth-dialog.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  // public currentUser!: any;
  // public isAdmin: boolean = false;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    // this.openLoginDialog();
  }

  logout(): void {
    this.router.navigate(['/']);
    localStorage.removeItem('currentUser');
    this.accountService.isUserLogin$.next(true);
  }

  

}
