/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminNewsComponent } from './admin-news.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { Storage } from '@angular/fire/storage';
import { Firestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { NewsService } from 'src/app/shared/services/news/news.service';
import { of } from 'rxjs';
import { NewsInfoService } from 'src/app/shared/services/news-info/news-info.service';
import { PageService } from 'src/app/shared/services/page/page.service';
import { IPageResponse } from 'src/app/shared/interfaces/page/page.interface';
import { MatDialogModule } from '@angular/material/dialog';

describe('AdminNewsComponent', () => {
  let component: AdminNewsComponent;
  let fixture: ComponentFixture<AdminNewsComponent>;

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
    getAllFirebase: () => of([{
      id: 1,     
      page: {id: 1, page: '1'},
      name: 'test news',
      path: '',
      description: 'test description',
      imagePath: '',
      detail:[]
    }]),
  }
  const newsInfoServiceStub = {
    getOneFirebase: (id: string) => of({
      id: id,     
      title: 'test',      
      description: 'test',
      imagePath: '',
      detail:[]
    }),
    getAllFirebase: () => of([{
      id: 1,     
      title: 'test',      
      description: 'test',
      imagePath: '',
      detail:[]
    }]),
  }

  const pageServiceStub = {
    getOneFirebase: (id: string) => of({ id: id, page: 1 }),
    getAllFirebase: () => of([{ id: '1', page: 1 }]),
    createFirebase: (page: IPageResponse) => of({ ...page }),
    updateFirebase: (page: Partial<IPageResponse>, id: string) => of({ id: id, ...page }),
    deleteFirebase: (id: string) => of({ id: id, page: 1 }),
  };
  
  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [AdminNewsComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        AngularFireStorageModule,
        MatDialogModule
      ],
      providers: [
        { provide: Storage, useValue: {} },
        { provide: ToastrService, useValue: {} },       
        { provide: NewsService, useValue: newsServiceStub },
        { provide: NewsInfoService, useValue: newsInfoServiceStub },
        { provide: PageService, useValue: pageServiceStub }
        //{ provide: Firestore, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
