import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { INewsResponse } from '../../interfaces/news/news.interface';
import { NewsService } from './news.service';

@Injectable({
  providedIn: 'root'
})
export class NewsInfoResolver implements Resolve<INewsResponse> {

  constructor(private newsService: NewsService) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INewsResponse> {
    return this.newsService.getOneFirebase((route.paramMap.get('id') as string)) as Observable<INewsResponse>;;
  }
}
