import { inject } from '@angular/core';
import {
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ResolveFn
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { INewsResponse } from '../../interfaces/news/news.interface';
import { NewsService } from './news.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class NewsInfoResolver implements Resolve<INewsResponse> {

//   constructor(private newsService: NewsService) { }
  
//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INewsResponse> {
//     return this.newsService.getOneFirebase((route.paramMap.get('id') as string)) as Observable<INewsResponse>;;
//   }
// }

export const NewsInfoResolver: ResolveFn<Observable<INewsResponse>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
  ) => {
    const id = route.paramMap.get('id');
    if (id) {
      return inject(NewsService).getOneFirebase(id) as Observable<INewsResponse>;
    }
    return of({} as INewsResponse);
}
