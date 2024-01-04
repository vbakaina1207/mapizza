import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IVacancyResponse } from 'src/app/shared/interfaces/vacancy/vacancy.interface';
import { VacancyService } from 'src/app/shared/services/vacancy/vacancy.service';

@Component({
  selector: 'app-vacancy',
  templateUrl: './vacancy.component.html',
  styleUrls: ['./vacancy.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VacancyComponent implements OnInit {

  public userVacancy: Array<IVacancyResponse> = [];
  private eventSubscription!: Subscription;

  constructor( private vacancyService: VacancyService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.eventSubscription = this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd ) {
        this.getVacancy();
      }
    })
  }

  ngOnInit() {
  }

  getVacancy(): void {
    this.vacancyService.getAllFirebase().subscribe(data => {
      this.userVacancy = data as IVacancyResponse[];
    })
  }


  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }
}
