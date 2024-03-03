import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/sahared.module';
import { NewsComponent } from './news.component';
import { NewsRoutingModule } from './news-routing.module';
import { PageComponent } from './page/page/page.component';
import { NewsInfoComponent } from './news-info/news-info.component';





@NgModule({
  declarations: [
    NewsComponent,
    PageComponent,
    NewsInfoComponent,
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    SharedModule
  ]
})
export class NewsModule { }
