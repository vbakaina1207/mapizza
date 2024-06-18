import { inject } from '@angular/core';
import {  
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ResolveFn
} from '@angular/router';
import { IDiscountResponse } from '../../interfaces/discount/discount.interface';
import { DiscountService } from './discount.service';
import { Observable, of } from 'rxjs';




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
