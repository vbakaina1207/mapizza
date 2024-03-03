import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { INewsAddResponse } from 'src/app/shared/interfaces/news/news-info.interface';
import { INewsResponse } from 'src/app/shared/interfaces/news/news.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { NewsInfoService } from 'src/app/shared/services/news-info/news-info.service';
import { NewsService } from 'src/app/shared/services/news/news.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-news-info',
  templateUrl: './news-info.component.html',
  styleUrls: ['./news-info.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NewsInfoComponent implements OnInit {

  public news!: INewsAddResponse;
  private eventSubscription!: Subscription;
  public currentNews = <INewsResponse>{} ||
    null || undefined;
  // public description: Array<string> = [];
  // public descrip!: SafeHtml;

  constructor(
    private newsService: NewsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    // private sanitizer: DomSanitizer
  ) { 
    this.eventSubscription = this.router.events.subscribe(event => {
    if(event instanceof NavigationEnd ) {
      this.loadNews();
      this.activatedRoute.data.subscribe(response => {
        this.currentNews = response['newsInfo'];
      })
    }
  })
  }

  ngOnInit() { 
  }

  loadNews(): void {
    const NEWS_ID = (this.activatedRoute.snapshot.paramMap.get('id') as string);
    this.accountService.NEWS_ID = NEWS_ID;
    this.newsService.getOneFirebase(NEWS_ID).subscribe(data => {
      this.currentNews = data as INewsResponse;
      // console.log(this.currentNews.detail.detail[0].description)
      // this.descrip = this.sanitizer.bypassSecurityTrustHtml(this.currentNews.detail.detail[0].description);
      // console.log(this.descrip);
    });
  }

  //Array<string>
// getDescription(str:string):string {
  //return  str.split(/(✅ )/);
  
  // return str.replace(/(<a>)/gi, `<a  ng-reflect-router-link="/" href="/">`);
 

// }
  
 
}
