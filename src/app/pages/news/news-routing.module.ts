import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './news.component';
import { PageComponent } from './page/page/page.component';
import { NewsInfoComponent } from './news-info/news-info.component';
import { NewsInfoResolver } from 'src/app/shared/services/news/news-info.resolver';


const routes: Routes = [
  {
    path: '', component: NewsComponent, children: [
      {path: 'page/:page', component: PageComponent, data: {storiesType: 'news'}},
      { path: '', pathMatch: 'full', redirectTo: 'page/1' }
    ]
  },
  {
    path: ':id',
    component: NewsInfoComponent,
    resolve: {
      newsInfo: NewsInfoResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
