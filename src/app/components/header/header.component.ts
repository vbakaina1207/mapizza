import { Component, HostListener, OnInit } from '@angular/core';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { ROLE } from 'src/app/shared/constants/role.constant';
import { Router } from '@angular/router';
import { BasketComponent } from 'src/app/pages/basket/basket.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public userCategories: Array<ICategoryResponse> = [];
  public isLogin:boolean = false;
  public isCheckout:boolean = false;
  public loginUrl:string = '';
  public loginPage:string = '';
  public total = 0;
  public count = 0;
  public basket: Array<IProductResponse> = [];
  public favorite: Array<IProductResponse> = []; 
  public countFavorite: number = 0;

  public currentUser!: any;
  public isOpenmenu: boolean = false;
  public isOpenMobileMenu: boolean = false;
  public userName!: string;


  constructor(
    private categoryService: CategoryService,
    private orderService: OrderService,
    public accountService: AccountService,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit() {
    this.getCategories();
    this.loadBasket();
    this.updateBasket();
    this.checkUserLogin();
    this.checkUpdatesUserLogin();
    this.loadFavorite();
    this.updateFavorite();
  }


  
  getCategories(): void {
    this.categoryService.getAllFirebase().subscribe(data => {
      this.userCategories = data as ICategoryResponse[];
    })
  }

  loadBasket(): void {
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }

  loadUser(): void {
    if(localStorage.length > 0 && localStorage.getItem('currentUser')){
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
      this.userName = this.currentUser['firstName']+' ' +  this.currentUser['lastName'];
    }
    
  }

  loadFavorite(): void {
    if (localStorage?.length > 0 && localStorage.getItem('favorite')) {
      this.favorite = JSON.parse(localStorage.getItem('favorite') as string);
    };  
    this.countFavorite = this.favorite.length;
  }

  updateFavorite(): void {
    this.accountService.changeFavorite.subscribe(() => {
      this.loadFavorite();
    })
  }

  getTotalPrice(): void {
    this.total = this.basket
      ?.reduce((total: number, prod: IProductResponse) => total + prod.count * prod.price, 0);
      this.count = this.basket
      ?.reduce((totalCount: number, prod: IProductResponse) => totalCount + prod.count, 0);
  }



  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  }

    checkUserLogin(): void {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
      if(this.currentUser && this.currentUser.role === ROLE.ADMIN){
        this.isLogin = true;
        this.loginUrl = 'admin';
        this.loginPage = 'Admin';
      } else if(this.currentUser && this.currentUser.role === ROLE.USER) {
        this.isLogin = true;       
        this.loginPage = 'Cabinet';

      } else {
        this.isLogin = false;
        this.loginUrl = '';
        this.loginPage = '';
      }
      this.loadUser();
    }

    checkUpdatesUserLogin(): void {
      this.accountService.isUserLogin$.subscribe(() => {
        this.checkUserLogin();
      })
    }

  openLoginDialog(): void {
      this.dialog.open(AuthDialogComponent, {
        backdropClass: 'dialog-back',
        panelClass: 'auth-dialog',
        autoFocus: false
      }).afterClosed().subscribe(result => {
        console.log(result);
      })
    
  }
  
  cabinetMenuOpen(): void {
    this.isOpenmenu = !this.isOpenmenu;
  }

  mobileMenuOpen(): void {
    this.isOpenMobileMenu = !this.isOpenMobileMenu;
  }

  logout(): void {
    this.router.navigate(['/']);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('basket');
    localStorage.removeItem('favorite');
    this.accountService.isUserLogin$.next(true);
  }

  openBasketDialog(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.position = {
          top:  '15px',
          right: '15px'
        };
        this.dialog.open(BasketComponent, {
          backdropClass: 'dialog-back',
          panelClass: 'auth-dialog-basket',
          autoFocus: false,
          maxWidth: '100vw',
          position: dialogConfig.position
        }).afterClosed().subscribe(result => {
          console.log(result);
          this.isCheckout = false;
        })
        this.isCheckout = true;
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent): void {
      const target = event.target as HTMLElement;
      const isInsideMenu = target.closest('.user-menu') !== null;
      const isMenuButton = target.closest('.user-c-btn') !== null;

      if (!isInsideMenu && !isMenuButton) {
        this.isOpenmenu = false;
      }
  }

}
