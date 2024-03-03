import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared/sahared.module';
import { AdminProductTypeComponent } from './admin-product-type/admin-product-type.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminDiscountComponent } from './admin-discount/admin-discount.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminAdditionTypeComponent } from './admin-addition-type/admin-addition-type.component';
import { AdminVacancyComponent } from './admin-vacancy/admin-vacancy.component';
import { AdminNewsComponent } from './admin-news/admin-news.component';
import { AdminNewsDetailComponent } from './admin-news-detail/admin-news-detail.component';
import { AdminNewsInfoComponent } from './admin-news-info/admin-news-info.component';
import { AdminPageComponent } from './admin-page/admin-page.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    AdminDiscountComponent,
    AdminOrdersComponent,
    AdminProductTypeComponent,
    AdminAdditionTypeComponent,
    AdminVacancyComponent,
    AdminNewsComponent,
    AdminNewsDetailComponent,
    AdminNewsInfoComponent,
    AdminPageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
