import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { INewsAddResponse } from 'src/app/shared/interfaces/news/news-info.interface';
import { INewsResponse } from 'src/app/shared/interfaces/news/news.interface';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { NewsInfoService } from 'src/app/shared/services/news-info/news-info.service';
import { NewsService } from 'src/app/shared/services/news/news.service';


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

  constructor(
    private newsService: NewsInfoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
  ) { 
    this.eventSubscription = this.router.events.subscribe(event => {
    if(event instanceof NavigationEnd ) {     
      this.activatedRoute.data.subscribe(response => {
        this.currentNews = response['newsInfo'];
      })
    }
  })
  }

  ngOnInit() { 
  }


}
