import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { SharedModule } from '../../shared/sahared.module';
import { AboutRoutingModule } from './about-routing.module';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    SharedModule,
    NgbCarouselModule
  ]
})
export class AboutModule { }
