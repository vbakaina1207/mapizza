import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { SharedModule } from '../../shared/sahared.module';
import { AboutRoutingModule } from './about-routing.module';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ContactModule } from '../contact/contact.module';
import { SlideAboutModule } from 'src/app/components/slide-about/slide-about.module';




@NgModule({
  declarations: [
    AboutComponent,
  ],
  exports: [
    AboutComponent,
    ContactModule,
    SlideAboutModule,
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    SharedModule,
    NgbCarouselModule,
    ContactModule,
    SlideAboutModule
  ]
})
export class AboutModule { }
