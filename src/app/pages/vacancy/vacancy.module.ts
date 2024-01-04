import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/sahared.module';
import { VacancyComponent } from './vacancy.component';
import { VacancyRoutingModule } from './vacancy-routing.module';
import { ContactModule } from '../contact/contact.module';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { VacancyInfoComponent } from './vacancy-info/vacancy-info.component';



@NgModule({
  declarations: [
    VacancyComponent,
    VacancyInfoComponent,
  ],
  exports: [
    VacancyComponent,
    ContactModule,
  ],
  imports: [
    CommonModule,
    VacancyRoutingModule,
    SharedModule,
    ContactModule,
    NgbCarouselModule
  ]
})
export class VacancyModule { }
