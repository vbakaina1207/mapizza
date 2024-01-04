import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AboutComponent implements OnInit {

  public images = ['assets/benefits/benefits-1.svg', 'assets/benefits/benefits-2.svg', 'assets/benefits/benefits-3.svg', 'assets/benefits/benefits-4.svg']


  constructor(
  ) { }

  ngOnInit() {
  }

  
}
