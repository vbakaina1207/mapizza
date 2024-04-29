import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { INewsResponse } from 'src/app/shared/interfaces/news/news.interface';
import { NewsService } from 'src/app/shared/services/news/news.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  public newsPage: Array<INewsResponse> = [];
  public page!: number;
  public currentPage!: number;
  eventSubscription: any;
  

  constructor(
    private newsService: NewsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private afs: Firestore
  ) { 
    this.eventSubscription = this.router.events.subscribe(event => {
    if(event instanceof NavigationEnd ) {
      this.loadPageNews();      
    }
  })
  }

  ngOnInit() {
    this.loadPageNews();   
  }

  loadPageNews(): void {
    this.page = parseInt(this.activatedRoute.snapshot.paramMap.get('page') as string);
    console.log(this.page, 'page');
    this.newsService.getAllByPageFirebase(this.page).subscribe((data) => {
    // this.newsService.getAllFirebase().subscribe(data => {
      this.newsPage = data as INewsResponse[];   
      this.currentPage = this.newsPage[0]?.page.page;
       console.log(this.newsPage, 'news', this.currentPage);
      });
  }
}
