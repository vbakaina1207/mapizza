import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/sahared.module';
import { ContactComponent } from './contact.component';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactFormComponent } from 'src/app/components/contact-form/contact-form.component';



@NgModule({
  declarations: [
    ContactComponent,
    ContactFormComponent,
  ],
  exports:[
    ContactComponent,
    ContactFormComponent,
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    SharedModule
  ]
})
export class ContactModule { }
