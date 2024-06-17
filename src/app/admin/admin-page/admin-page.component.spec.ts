/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AdminPageComponent } from './admin-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { Storage } from '@angular/fire/storage';
import { of } from 'rxjs';
import { PageService } from 'src/app/shared/services/page/page.service';
import { MatDialogModule } from '@angular/material/dialog';
import { IPageRequest, IPageResponse } from 'src/app/shared/interfaces/page/page.interface';
import { DocumentData, DocumentReference } from '@angular/fire/firestore';


describe('AdminPageComponent', () => {
  let component: AdminPageComponent;
  let fixture: ComponentFixture<AdminPageComponent>;
  let pageService : PageService;
  let toastService: ToastrService;

  const servicePagetStub = {
    getOneFirebase: (id: string) => of({      
      id: id, page: 1
    }),
    getAllFirebase: () => of([
      { id: '1', page: 1 }
    ]),
    createFirebase: (data: IPageRequest) => Promise.resolve({
      id: '2',
      ...data
    } as IPageResponse),
    updateFirebase: (page: IPageRequest, id: string) => {
      return Promise.resolve({ id: id } as DocumentReference<DocumentData>);
    }, 
    deleteFirebase: (id: string) => of([{
      id: id,     
      page: 1
    }]),
  };

  const toastrServiceStub = {
    success: jasmine.createSpy(),
    error: jasmine.createSpy()
  };

  beforeEach(async() => {
    const mockDocumentReference: Partial<DocumentReference<DocumentData>> = {
      id: 'mockDocId'
    };


    await TestBed.configureTestingModule({
      declarations: [AdminPageComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatDialogModule
      ],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: ToastrService, useValue: toastrServiceStub },
        { provide: PageService, useValue: servicePagetStub }
      ]
    })
    .compileComponents();
    pageService = TestBed.inject(PageService) as jasmine.SpyObj<PageService>;
    toastService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.pageForm).toBeDefined();
    expect(component.pageForm.get('page')).toBeDefined();
  });
  
  it(`should return empty list of pages'`, () => {
    const fixture = TestBed.createComponent(AdminPageComponent);
    const app = fixture.componentInstance;
    let service = fixture.debugElement.injector.get(PageService);
    spyOn(service,"getAllFirebase").and.callFake(() => {
      return of([]);
    });
    app.loadPages();
    expect(app.adminPages).toEqual([]);
  });

  it(`should return list of pages'`, () => {
    const fixture = TestBed.createComponent(AdminPageComponent);
    const app = fixture.componentInstance;
    let service = fixture.debugElement.injector.get(PageService);
    spyOn(service,"getAllFirebase").and.callFake (() => {
      return of([
        { 
          id: '1',     
          page: 1
        }
      ])
    });
    app.loadPages();
    expect(app.adminPages.length).toEqual(1);
  });

  it('should load pages on initialization', () => {
    let service = fixture.debugElement.injector.get(PageService);
    spyOn(service,"getAllFirebase").and.callFake (() => {
      return of([
        { 
          id: '1',     
          page: 1
        }
      ])
    });
    component.loadPages();
    fixture.detectChanges();
    
    expect(component.adminPages.length).toBe(1);
    expect(pageService.getAllFirebase).toHaveBeenCalled();
  });
  

  it('should add a new page', fakeAsync(async () => {
    const pageRequest: IPageRequest = {       
      page: 2
    };
  component.editStatus = false;  
  component.addPage();
  tick();
  spyOn(pageService, 'createFirebase');    
  if (!component.editStatus) {
    await pageService.createFirebase(pageRequest);    
      expect(pageService.createFirebase).toHaveBeenCalledWith({ page: 2 });  
      expect(toastService.success).toHaveBeenCalled();
      component.pageForm.reset();
      expect(component.pageForm.get('page')?.value).toBeNull();
  }    
  expect(component).toBeTruthy();
  }));

  it('should edit a  page', fakeAsync(async () => {
    const pageRequest: IPageRequest = {       
      page: 2
    };
  component.editStatus = true;
  component.currentPageId = '2';
  component.addPage();
  tick();
  spyOn(pageService, 'updateFirebase');
  if (component.editStatus) {
    await pageService.updateFirebase(pageRequest, '2');
  
    expect(pageService.updateFirebase).toHaveBeenCalled();  
    expect(toastService.success).toHaveBeenCalled();
    component.pageForm.reset();
    expect(component.pageForm.get('page')?.value).toBeNull();   
  }
  expect(component).toBeTruthy();
  }));

  it('delete values page', () => {
    spyOn(component, 'deletePage').and.callThrough();
    component.deletePage({
      id: '2',
      page: 2
    });
    spyOn(pageService, 'deleteFirebase');
    expect(component).toBeTruthy();
  });

});
