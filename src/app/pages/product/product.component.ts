import { Component, OnInit, OnDestroy, AfterViewInit, OnChanges, DoCheck, AfterContentInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductResponse} from 'src/app/shared/interfaces/product/product.interface';
import { ITypeProductResponse } from 'src/app/shared/interfaces/type-product/type-product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { TypeProductService } from 'src/app/shared/services/type-product/type-product.service';
import { ProductService } from './../../shared/services/product/product.service';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  updateProduct(product: { id: string; name: string; }) {
    throw new Error('Method not implemented.');
  }
  getProductById(arg0: string) {
    throw new Error('Method not implemented.');
  }

  public userProducts: Array<IProductResponse> = [];
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
  public isFavorite!: boolean ; 
  public currentUser: any;
  public favorite: Array<IProductResponse> = [];
  public isRead: boolean = false;
  public isInfoBlock: boolean = false;
  public btnName: string = 'замовити';
  public isOrder: boolean = false;

  constructor(
    private productService: ProductService,
    private productTypeService: TypeProductService,   
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private accountService: AccountService,
    private toastr: ToastService
  ) {
   
    this.eventSubscription = this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd ) {                  
        this.loadUser();   
        this.loadProducts();
        this.getTypeProducts();  
        this.loadFaviriteProducts();
      }
    })
  }

  ngOnInit(): void {
    this.loadUser();  
    this.loadProducts();
    this.getTypeProducts();  
    this.loadFaviriteProducts();         
  }

  ngAfterContentInit(): void {
  
  }

  getTypeProducts(): void {
    this.productTypeService.getAllFirebase().subscribe(data => {   
      this.userTypeProducts = data as ITypeProductResponse[];
    })
  }

  
  public loadProducts(): void {
    this.categoryName === 'pizza';
    this.categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string  || 'pizza';
    this.productTypeName = this.activatedRoute.snapshot.paramMap.get('type_product') as string;
    let currentExtras = this.router.getCurrentNavigation()?.extras.skipLocationChange;
      this.productService.getAllByCategoryFirebase(this.categoryName).subscribe((data) => {
        this.userProducts = data as IProductResponse[];
        this.currentCategoryName = this.userProducts[0]?.category.name;
      });
    if (this.productTypeName){
      this.productService.getAllByProductTypeFirebase(this.productTypeName,  this.categoryName).subscribe(data => {
        this.userProducts = data as IProductResponse[];       
        this.currentProductTypeName = this.userProducts[0]?.type_product.name;      
        this.isCategoryPizza = true;
        this.isProductType = true;           
      });
    }
  if (this.categoryName === 'pizza'  ||  this.categoryName === 'salads' || this.router.url == '/' ) {
      this.isCategoryPizza = true;
      if( this.router.url == '/') {
        this.categoryName = 'pizza';
        this.currentCategoryName = '';
        this.productService.getAllByCategoryFirebase(this.categoryName).subscribe((data) => {
          this.userProducts = data as IProductResponse[];
          this.currentCategoryName = this.userProducts[0]?.category.name;
        });
      }
    } else this.isCategoryPizza = false;
    if (this.router.url !== '/product/pizza/' && this.categoryName === 'pizza') {
      if(currentExtras ) {
        this.isCategoryPizza = true;
        this.isProductType = false;
      } else {
        this.isCategoryPizza = false;
        this.isProductType = true;
      }
    }
    if (this.router.url == '/') {
      this.isCategoryPizza = true;    
    }
    if (this.isCategoryPizza) this.currentCategoryName = 'Піцца';
    if (this.categoryName === 'pizza' || this.router.url === '/')
      this.isInfoBlock = true;
    else this.isInfoBlock = false;
  }

  loadFaviriteProducts(): void{
    if (localStorage?.length > 0 && localStorage.getItem('favorite')) {
      if (this.favorite.length == 0) this.favorite = JSON.parse(localStorage.getItem('favorite') as string);
    }
      for (let i = 0; i < this.userProducts.length; i++) {
      this.isFavorite = this.isProductFavorite(this.userProducts[i]);      
    }    
  }

  loadUser(): void {
    if (localStorage.length > 0 && localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
      this.favorite = this.currentUser.favorite || [];;
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
        
        this.basket[index].count += product.count;      
      } else {
        this.basket?.push(product);        
      }
    } else {
      this.basket.push(product);
    
    }
    
    this.toastr.showSuccess('',  product.name + ' успішно додано до кошику');
    if (e && e.target) {
    e.target.innerText = '';
    this.isOrder = true;
    if (this.isOrder) {
      e.target.nextSibling?.classList.add('hide');
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
  }
    localStorage.setItem('basket', JSON.stringify(this.basket));    
    product.count = 1;
    this.orderService.changeBasket.next(true);
  }

  isProductFavorite(product: IProductResponse): boolean {
    return this.favorite?.some((favProduct: IProductResponse) => favProduct.id === product.id);
  }

  buttonFavoriteClick(product: IProductResponse): void {  
    this.isFavorite = this.isProductFavorite(product);
    this.isFavorite = !this.isFavorite;
    if (this.isFavorite)
      this.favorite.push(product);
    else {
      let index = this.favorite.findIndex(prod => prod.id === product.id);
      this.favorite.splice(index, 1);
    }
    localStorage.setItem('favorite', JSON.stringify(this.favorite));
    this.accountService.changeFavorite.next(true);
    this.currentUser.favorite = this.favorite;
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  }

  updateFavorite(): void {
    this.accountService.changeFavorite.subscribe(() => {
      this.loadFaviriteProducts;      
    })
    this.accountService.changeCurrentUser.subscribe(() => {      
      this.loadUser();
    })
  }

  toogleRead(): void {
    this.isRead = !this.isRead;
  }
}
