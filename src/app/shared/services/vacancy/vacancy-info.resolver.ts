import { Injectable, inject } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ResolveFn
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { IVacancyResponse } from '../../interfaces/vacancy/vacancy.interface';
import { VacancyService } from './vacancy.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class VacancyInfoResolver implements Resolve<IVacancyResponse> {

//   constructor(private vacancyService: VacancyService){}

//   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IVacancyResponse> {
//     return this.vacancyService.getOneFirebase((route.paramMap.get('id') as string)) as Observable<IVacancyResponse>;
//   }
// }


export const VacancyInfoResolver : ResolveFn<Observable<IVacancyResponse>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
  ) => {
    const id = route.paramMap.get('id');
    if (id) {
      return inject(VacancyService).getOneFirebase(id) as Observable<IVacancyResponse>;
    }
    return of({} as IVacancyResponse);
  }