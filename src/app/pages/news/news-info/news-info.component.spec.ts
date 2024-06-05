/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsInfoComponent } from './news-info.component';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NewsService } from 'src/app/shared/services/news/news.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountService } from 'src/app/shared/services/account/account.service';

describe('NewsInfoComponent', () => {
  let component: NewsInfoComponent;
  let fixture: ComponentFixture<NewsInfoComponent>;

  const newsServiceStub = {
    getOneFirebase: (id: string) => of({
      id: id,     
      page: {id: 1, page: '1'},
      name: 'test news',
      path: '',
      description: 'test description',
      imagePath: '',
      detail:[]
    }),
  }

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ NewsInfoComponent ],
      providers: [
       // { provide: Storage, useValue: {} },
        { provide: ToastrService, useValue: {} },       
        { provide: NewsService, useValue: newsServiceStub },
        { provide: AccountService, useValue: {} }
      ], 
      imports: [
        RouterTestingModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
