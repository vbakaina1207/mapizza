import { NgModule } from "@angular/core";
import { SlideAboutComponent } from "./slide-about.component";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/sahared.module";
import { NgbCarouselModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    SlideAboutComponent
  ],
  exports:[
    SlideAboutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgbCarouselModule
  ]
})
export class SlideAboutModule { }