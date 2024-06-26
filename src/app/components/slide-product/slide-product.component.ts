import { AfterContentInit, Component, DoCheck, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { ITypeProductResponse } from 'src/app/shared/interfaces/type-product/type-product.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-slide-product',
  templateUrl: './slide-product.component.html',
  styleUrls: ['./slide-product.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SlideProductComponent implements OnInit, OnDestroy, AfterContentInit {

  public userProducts: Array<IProductResponse> = [];
  public drinksProducts: Array<IProductResponse> = [];
  public userTypeProducts: Array<ITypeProductResponse> = [];
  private eventSubscription!: Subscription;
  public isCategoryPizza: boolean = false;
  public isProductType: boolean = false;  
  public isProduct: boolean = false; 
  public categoryName!: string;
  public currentCategoryName!:string ;
  public currentProductTypeName!: string;
  public productTypeName!: string;
  public basket: Array<IProductResponse> = [];
  public isFavorite!: boolean;  
  public currentUser: any;
  public favorite!: any;
  public btnName: string = 'замовити';
  public isOrder: boolean = false;
  public countProduct: number = 0;
  public countSlide: number = 0;
  public responsiveOptions: any[] = [];

  
  constructor(
    public productService: ProductService,    
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private accountService: AccountService,
    private afs: Firestore,
    public toastr: ToastService
  ) { 
    this.eventSubscription = this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd ) {
        this.loadProducts();        
        this.loadUser();          
        this.updateFavorite();
      }
    })
    
  }

  ngOnInit() {
    this.loadProducts();        
    this.loadUser();         
    this.updateFavorite();
  }

  ngAfterContentInit(): void {
    this.loadFavoriteProducts();        
  }
  

  loadProducts(): void {
    this.categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    this.productService.getAllByCategoryFirebase(this.categoryName).subscribe((data) => {
      this.userProducts = data as IProductResponse[];
      this.currentCategoryName = this.userProducts[0]?.category.name;
      
      if (this.categoryName === 'pizza') {
        this.productService.getAllByCategoryFirebase('drinks').subscribe((data) => {
          this.drinksProducts = data as IProductResponse[];
          this.currentCategoryName = this.drinksProducts[0]?.category.name;
        });
      }

      this.responsiveOptions = [
        {
          breakpoint: '1730px',
          numVisible: this.userProducts?.length < 4 ? this.userProducts?.length : 4,
          numScroll: 4,
          showIndicator: true
        },
        {
          breakpoint: '1200px',
          numVisible: this.userProducts?.length < 3 ? this.userProducts?.length : 3,
          numScroll: 3,
          showIndicator: false
        },
        {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 2,
          showIndicator: false
        },
        {
          breakpoint: '769px',
          numVisible: 1,
          numScroll: 1,
          showIndicator: false
        }
      ];            
      this.loadFavoriteProducts();
    });
    
  }
  
  loadUser(): void {
    if(localStorage.length > 0 && localStorage.getItem('currentUser')){
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string); 
      // this.favorite = this.currentUser.favorite;
    }
  }

  
  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }

  productCount(product: IProductResponse, value: boolean): void {
    if(value){
      ++product.count;
    } else if(!value && product.count > 1){
      --product.count;
    }
  }



  addToBasket(product: IProductResponse, e: any): void {
    product.selected_addition = product.selected_addition || [];
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      this.basket = JSON.parse(localStorage.getItem('basket') as string);      
      if(this.basket?.some(prod => prod.id === product.id)){
        const index = this.basket.findIndex(prod => prod.id === product.id);
        if(index > -1)
          this.basket[index].count += 1;        
      } else {
        this.basket?.push(product);        
      }
    } else {
      this.basket.push(product);
    
    }
    
    this.toastr.showSuccess('',  product.name + ' успішно додано до кишику');
    if (e.target && e.target.innerText) e.target.innerText = '';
    
    this.isOrder = true;
    if (this.isOrder) {
      if (e.target.nextSibling) {
        e.target.nextSibling.classList.add('hide');
      }
      e.target.classList.add('primary');
    }
    if (this.isOrder) {      
      setTimeout(() => {
          e.target.innerText = 'замовити',
          this.isOrder = false,
          e.target.nextSibling?.classList.remove('hide'),
          e.target.classList.remove('primary')
      }, 2000);
    }
    localStorage.setItem('basket', JSON.stringify(this.basket));    
    product.count = 1;
    this.orderService.changeBasket.next(true);
  }
  
  
  buttonFavoriteClick(product: IProductResponse): void {    
    this.isFavorite = this.isProductFavorite(product);
    this.isFavorite = !this.isFavorite;
    if (this.isFavorite)
      this.favorite.push(product);
    else {
      let index = this.favorite.findIndex((prod: { id: string; }) => prod.id === product.id);
      this.favorite.splice(index, 1);
    }
      
    localStorage.setItem('favorite', JSON.stringify(this.favorite));
    this.accountService.changeFavorite.next(true);
    this.currentUser.favorite = this.favorite;
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  }

  isProductFavorite(product: IProductResponse): boolean {
    return this.favorite?.some((favProduct: IProductResponse) => favProduct.id === product.id);
  }

  loadFavoriteProducts(): void{
      if (localStorage?.length > 0 && localStorage.getItem('favorite')) {
        this.favorite = JSON.parse(localStorage.getItem('favorite') as string);
      }
    for (let i = 0; i < this.userProducts.length; i++) {
      this.isFavorite = this.isProductFavorite(this.userProducts[i]);      
    }    
  }

  updateFavorite(): void {
    this.accountService.changeFavorite.subscribe(() => {
      this.loadFavoriteProducts;      
    })
    this.accountService.changeCurrentUser.subscribe(() => {      
      this.loadUser();
    })
  }
  
}
