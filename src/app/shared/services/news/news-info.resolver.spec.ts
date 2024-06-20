import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { NewsInfoResolver } from './news-info.resolver';
import { Observable, of } from 'rxjs';
import { INewsResponse } from '../../interfaces/news/news.interface';
import { NewsService } from './news.service';

describe('NewsInfoResolver', () => {
  let newsServiceMock: any;
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;

  beforeEach(async () => {
    newsServiceMock = {
      getOneFirebase: jasmine.createSpy('getOneFirebase').and.returnValue(of({} as INewsResponse))
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: NewsService, useValue: newsServiceMock }
      ]
    }).compileComponents();

    route = new ActivatedRouteSnapshot();
    state = {} as RouterStateSnapshot;
  });

  it('should be created', () => {
    expect(NewsInfoResolver).toBeTruthy();
  });

});
