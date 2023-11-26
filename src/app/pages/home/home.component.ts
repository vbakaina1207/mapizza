import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
// import { CarouselComponent } from '../carousel/carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
  
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  // public images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  // images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);

  // public paused:boolean = false;
	// public unpauseOnArrow:boolean = false;
	// public pauseOnIndicator:boolean = false;
	// public pauseOnHover:boolean = true;
	// public pauseOnFocus:boolean = true;

  // @ViewChild('carousel', { static: true })
  // public carousel!: NgbCarousel;

  constructor() { }

  ngOnInit() {
    
  }

// togglePaused() {
// 		if (this.paused) {
// 			this.carousel.cycle();
// 		} else {
// 			this.carousel.pause();
// 		}
// 		this.paused = !this.paused;
// 	}

// 	onSlide(slideEvent: NgbSlideEvent) {
// 		if (
// 			this.unpauseOnArrow &&
// 			slideEvent.paused &&
// 			(slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
// 		) {
// 			this.togglePaused();
// 		}
// 		if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
// 			this.togglePaused();
// 		}
  
	//}
}
