import { inject } from '@angular/core';
import {  
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ResolveFn
} from '@angular/router';
import { IDiscountResponse } from '../../interfaces/discount/discount.interface';
import { DiscountService } from './discount.service';
import { Observable, of } from 'rxjs';


// @Injectable({
//   providedIn: 'root'
// })



// export class DiscountInfoResolver implements Resolve<IDiscountResponse> {

//   constructor(private discountService: DiscountService){}

//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDiscountResponse> {
//     return this.discountService.getOneFirebase((route.paramMap.get('id') as string)) as Observable<IDiscountResponse>;
//   }
// }

// export const discountInfoResolver: ResolveFn<Observable<IDiscountResponse>> = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot,
// ) => {
//   if (route.paramMap.get('id')) {
//     return inject(DiscountService).getOneFirebase(route.paramMap.get('id')!);
//   }
//   return of({} as IDiscountResponse);
// };

export const DiscountInfoResolver : ResolveFn<Observable<IDiscountResponse>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
  ) => {
    const id = route.paramMap.get('id');
    if (id) {
      return inject(DiscountService).getOneFirebase(id) as Observable<IDiscountResponse>;
    }
    return of({} as IDiscountResponse);
  }
