import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { INewsResponse } from 'src/app/shared/interfaces/news/news.interface';
import { IPageResponse } from 'src/app/shared/interfaces/page/page.interface';
import { NewsService } from 'src/app/shared/services/news/news.service';
import { PageService } from 'src/app/shared/services/page/page.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  eventSubscription: any;
  public news: Array<INewsResponse> = [];
  public newsPage: Array<INewsResponse> = [];
  public pages: Array<IPageResponse> = [];
  public page!: number;
  public currentPage!: number;

  constructor(
    private newsService: NewsService,
    private pageService: PageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,    
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd ) {
        this.loadNews();
        this.loadPageNews();    
        this.loadPage();
      }
    })}

  ngOnInit() {

  }

  loadPageNews(): void {
    this.page = parseInt(this.activatedRoute.snapshot.paramMap.get('page') as string);
    this.newsService.getAllByPageFirebase(this.page).subscribe((data) => {
      this.newsPage = data as INewsResponse[];   
      });
  }

  loadNews(): void {
    this.newsService.getAllFirebase().subscribe(data => {
      this.news = data as INewsResponse[];     
    })
  }

  loadPage(): void {
    this.pageService.getAllFirebase().subscribe(data => {
      this.pages = data as IPageResponse[]; 
      this.currentPage = this.pages[0]?.page;
    })
  }
}
