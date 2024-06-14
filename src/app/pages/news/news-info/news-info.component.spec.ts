/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsInfoComponent } from './news-info.component';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NewsService } from 'src/app/shared/services/news/news.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { NewsInfoService } from 'src/app/shared/services/news-info/news-info.service';

describe('NewsInfoComponent', () => {
  let component: NewsInfoComponent;
  let fixture: ComponentFixture<NewsInfoComponent>;
  let newsInfoService: NewsInfoService;

  const newsServiceStub = {
    getOneFirebase: (id: string) => of({    
      id: id,     
      title: 'test',
      description: 'test description',
      imagePath: '',
      detail:[{
        id: 1,     
      title: 'test',
      description: 'test description',
      imagePath: '',
      detail:[null]
      }]
    }),
  }

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ NewsInfoComponent ],
      providers: [
       // { provide: Storage, useValue: {} },
        { provide: ToastrService, useValue: {} },       
        { provide: NewsInfoService, useValue: newsServiceStub },
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

  it('loading one new', () => {
    const NEWS_ID = '1';
    const data = [
      {
        id: 1, 
        title: 'test',
      description: 'test description',
      imagePath: '',
      detail:[{
        id: 1,     
      title: 'test',
      description: 'test description',
      imagePath: '',
      detail:[null]
      }]
      }
    ]    
    if (NEWS_ID){
      newsInfoService?.getOneFirebase(NEWS_ID).subscribe(result => {
        expect(result).toEqual(data);
      });
    }
    expect(component).toBeTruthy();
  });

});
