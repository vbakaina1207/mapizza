import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminProductTypeComponent } from './admin-product-type/admin-product-type.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminDiscountComponent } from './admin-discount/admin-discount.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminAdditionTypeComponent } from './admin-addition-type/admin-addition-type.component';
import { AdminVacancyComponent } from './admin-vacancy/admin-vacancy.component';
import { AdminNewsComponent } from './admin-news/admin-news.component';
import { AdminNewsDetailComponent } from './admin-news-detail/admin-news-detail.component';
import { AdminNewsInfoComponent } from './admin-news-info/admin-news-info.component';
import { AdminPageComponent } from './admin-page/admin-page.component';



const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: 'category', component: AdminCategoryComponent },
      { path: 'product-type', component: AdminProductTypeComponent },
      { path: 'addition-type', component: AdminAdditionTypeComponent},
      { path: 'product', component: AdminProductComponent },
      { path: 'discount', component: AdminDiscountComponent },
      { path: 'order', component: AdminOrdersComponent },
      { path: 'vacancy', component: AdminVacancyComponent },
      { path: 'news', component: AdminNewsComponent },
      { path: 'newsDetail', component: AdminNewsDetailComponent },
      { path: 'newsInfo', component: AdminNewsInfoComponent },
      { path: 'page', component: AdminPageComponent },
      { path: '', pathMatch: 'full', redirectTo: 'discount' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
