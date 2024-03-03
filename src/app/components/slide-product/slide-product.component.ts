import { AfterContentInit, Component, DoCheck, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { user } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { ITypeProductResponse } from 'src/app/shared/interfaces/type-product/type-product.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { TypeProductService } from 'src/app/shared/services/type-product/type-product.service';
import { CarouselModule } from 'primeng/carousel';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

@Component({
  selector: 'app-slide-product',
  templateUrl: './slide-product.component.html',
  styleUrls: ['./slide-product.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SlideProductComponent implements OnInit, OnDestroy, AfterContentInit, DoCheck {

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
  public isFavorite!: boolean;
  public favoriteProducts: Array<IProductResponse> = [];
  public currentUser: any;
  public favorite!: any;
  public btnName: string = 'замовити';
  public isOrder: boolean = false;
  public countProduct: number = 0;
  public countSlide: number = 0;
  public responsiveOptions: any[] = [
    {
                breakpoint: '1730px',
                numVisible: 3,
                numScroll: 0
            },
            {
                breakpoint: '1200px',
                numVisible: 3,
                numScroll: 3
            },
            {
                breakpoint: '901px',
                numVisible: 2,
                numScroll: 2
            },
            {
                breakpoint: '560px',
                numVisible: 1,
                numScroll: 1
            }
];
  
  constructor(
    private productService: ProductService,
    private productTypeService: TypeProductService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private accountService: AccountService,
    private afs: Firestore,
    private toastr: ToastService
  ) { 
    this.eventSubscription = this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd ) {
        this.loadProducts();
        this.loadFaviriteProducts();
        this.loadUser();  
      }
    })
    
  }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.loadFaviriteProducts();     
  }

  ngDoCheck(): void {
    this.loadFaviriteProducts();  
  } 

  loadProducts(): void {
    this.favoriteProducts = this.accountService.favoriteProducts;
    this.categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    // this.productTypeName = this.activatedRoute.snapshot.paramMap.get('type_product') as string;
    // let currentExtras = this.router.getCurrentNavigation()?.extras.skipLocationChange;
      this.productService.getAllByCategoryFirebase(this.categoryName).subscribe((data) => {
        this.userProducts = data as IProductResponse[];
        this.currentCategoryName = this.userProducts[0]?.category.name;

        this.responsiveOptions = [
            {
                breakpoint: '1730px',
                numVisible: this.userProducts?.length < 4 ?  this.userProducts?.length : 4,
                numScroll: 4,
                showIndicator: true
            },
            {
                breakpoint: '1200px',
                numVisible: this.userProducts?.length < 3 ? this.userProducts?.length : 3,
                numScroll: 3,
                showIndicator:false
            },
            {
                breakpoint: '991px',
                numVisible: 2,
                numScroll: 2,
                showIndicator:false              
            },
            {
                breakpoint: '769px',
                numVisible: 1,
              numScroll: this.userProducts?.length,
              showIndicator:false  
            }
          ];
      });
    
    
  //   if (this.productTypeName){
  //     this.productService.getAllByProductTypeFirebase(this.productTypeName,  this.categoryName).subscribe(data => {
  //       this.userProducts = data as IProductResponse[];       
  //       this.currentProductTypeName = this.userProducts[0]?.type_product.name;      
  //       this.isCategoryPizza = true;
  //       this.isProductType = true;           
  //     });
    }
  // if (this.categoryName === 'pizza'  ||  this.categoryName === 'salads' || this.router.url == '/' || this.router.url == '/#pizza' ) {
  //     this.isCategoryPizza = true;
  //     if(this.router.url == '/#pizza' || this.router.url == '/') {
  //       this.categoryName = 'pizza';
  //       this.currentCategoryName = '';
  //       this.productService.getAllByCategoryFirebase(this.categoryName).subscribe((data) => {
  //         this.userProducts = data as IProductResponse[];
  //         this.currentCategoryName = this.userProducts[0]?.category.name;
  //       });
  //     }
  //   } else this.isCategoryPizza = false;
  //   if (this.router.url !== '/product/pizza/' && this.categoryName === 'pizza') {
  //     if(currentExtras )
  //     {
  //       this.isCategoryPizza = true;
  //       this.isProductType = false;
  //     } else {
  //       this.isCategoryPizza = false;
  //       this.isProductType = true;
  //     }
  //   }
  //   if (this.router.url == '/' || this.router.url == '/#pizza' ) {
  //     this.isCategoryPizza = true;
  //   }
  //   if (this.isCategoryPizza) this.currentCategoryName = 'Піцца';
  //   if (this.categoryName === 'pizza' || this.router.url === '/' || this.router.url === '/#pizza')
  //     this.isInfoBlock = true;
  //   else this.isInfoBlock = false;
  // }
  
  loadUser(): void {
    if(localStorage.length > 0 && localStorage.getItem('currentUser')){
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string); 
      this.favorite = this.currentUser.favorite;
      if (this.favoriteProducts.length==0) this.favoriteProducts = this.favorite;     
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
    
    this.toastr.showSuccess('',  product.name + ' успішно додано до кишику');
    e.target.innerText = '';
    
    this.isOrder = true;
    if (this.isOrder) {
      e.target.nextSibling.classList.add('hide');
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
    let elem = document.querySelectorAll('.fav-btn');    
    for (let i = 0; i < elem.length; i++) {
      if (this.userProducts[i]?.id == product.id) {        
        elem[i].classList.toggle('active');
        if (elem[i].classList.contains('active')) {
        this.favoriteProducts.push(product);
        } else {
          let index = this.favoriteProducts.indexOf(product);
          this.favoriteProducts.splice(index, 1);
        }
      }      
    
    } 
    this.accountService.favoriteProducts = this.favoriteProducts;    
    let favorite = { favorite: this.favoriteProducts };
    // setDoc(doc(this.afs, 'users', this.currentUser.uid), favorite, { merge: true });
    localStorage.setItem('currentUser', JSON.stringify(favorite));
    // console.log(this.favoriteProducts, 'favirite', this.currentUser);
  }

  loadFaviriteProducts(): void{
    // console.log(this.accountService.favoriteProducts, this.favoriteProducts, "accountService.favoriteProducts");
    let elem = document.querySelectorAll('.fav-btn');
    // console.log(elem, 'elem');
    for (let i = 0; i < this.favoriteProducts?.length; i++) {
      let index = this.userProducts.findIndex(prod => prod.id === this.favoriteProducts[i]?.id)
      if (index > -1) {
        elem[index]?.classList.add('active');           
      }
    };
  }

  
}
