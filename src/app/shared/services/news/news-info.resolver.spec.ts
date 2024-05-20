import { TestBed } from '@angular/core/testing';
// import { NewsInfoResolver } from './news-info.resolver';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import * as NewsInfoResolver from './news-info.resolver';


const mockRoute = { params: { id: 1 } } as unknown as ActivatedRouteSnapshot;
// const mockNews: INewsResponse = {
//   id: 1,
//   page: {
//     id: 1,
//     page: 1
//   },
//     name: '',
//     path: '',
//     description: '',
//     imagePath: '',
//     detail: {
//       id: 1, title: '', description: '', imagePath: '',
//       detail: [{ id: '1', title: '', description: '', imagePath: '', detail: [{null}] }]
//     }
// };
// const mockNewsService = {
//   getNews: () => of(mockNews),
// } as unknown as NewsService;


// describe('NewsInfoResolver', () => {
//   let resolverFn:Observable<INewsResponse>;

//   beforeEach(() => {
//     // resolverFn = ResolverUnderTest.NewsInfoResolver(mockRoute, mockNewsService);
//   });

//   });

describe('NewsInfoResolver', () => {
  let resolver: NewsInfoResolver;
  type NewsInfoResolver = any;


  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NewsInfoResolver]
    }).compileComponents();
    resolver = new TestBed(NewsInfoResolver);
  })

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
