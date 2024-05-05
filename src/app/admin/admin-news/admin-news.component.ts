import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/components/alert-dialog/alert-dialog.component';
import { INewsAddResponse } from 'src/app/shared/interfaces/news/news-info.interface';
import { INewsResponse } from 'src/app/shared/interfaces/news/news.interface';
import { IPageResponse } from 'src/app/shared/interfaces/page/page.interface';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { NewsInfoService } from 'src/app/shared/services/news-info/news-info.service';
import { NewsService } from 'src/app/shared/services/news/news.service';
import { PageService } from 'src/app/shared/services/page/page.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.scss']
})
export class AdminNewsComponent implements OnInit {

  public adminNews: Array<INewsResponse> = [];
  public adminInfoNews: Array<INewsAddResponse> = [];
  public adminPage: Array<IPageResponse> = [];
  public newsForm!: FormGroup;
  public isAdd = false;
  public editStatus = false;
  public uploadPercent!: number;
  public isUploaded = false;
  private currentNewsId!: number | string;

  constructor(
    private fb: FormBuilder,
    private newsService: NewsService,
    private newsInfoService: NewsInfoService,
    private pageService: PageService,
    private imageService: ImageService,
    private toastr: ToastService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.initNewsForm();
    this.loadNews();
    this.loadInfoNews();
    this.loadPages();
  }

  initNewsForm(): void {
    this.newsForm = this.fb.group({
      page: [null, Validators.required],
      name: [null, Validators.required],
      path: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [null, Validators.required],
      detail: [[null]]
    });
  }


  loadNews(): void {
    this.newsService.getAllFirebase().subscribe(data => {
      this.adminNews = data as INewsResponse[];     
    })
  }

  loadInfoNews(): void {
    this.newsInfoService.getAllFirebase().subscribe(data =>{
      this.adminInfoNews = data as INewsAddResponse[];
      this.newsForm.patchValue({
        detail: this.adminInfoNews[0]?.id
      })
    })
  }

  loadPages(): void{
    this.pageService.getAllFirebase().subscribe(data => {
      this.adminPage = data as IPageResponse[];
      this.newsForm.patchValue({
        page: this.adminPage[0]?.id
      })     
    })

  }

  addNews(): void {
    if(this.editStatus){
      this.newsService.updateFirebase(this.newsForm.value, this.currentNewsId as string).then(() => {
        this.loadNews();
        this.toastr.showSuccess('', 'Новину змінено');
      })
    } else {
      this.newsService.createFirebase(this.newsForm.value).then(() => {        
        this.toastr.showSuccess('', 'Новину додано');
      })
    }
    this.editStatus = false;
    this.newsForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
    this.isAdd = false;
  }

  editNews(news: INewsResponse): void {
    this.openForm();
    this.newsForm.patchValue({
      page: news.page,
      name: news.name,
      path: news.path,
      description: news.description,
      imagePath: news.imagePath,
      detail: news.detail,
    });
    this.editStatus = true;
    this.currentNewsId = news.id;
    this.isUploaded = true;
  }

  deleteNews(news: INewsResponse): void {
    this.dialog.open(AlertDialogComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'alert-dialog',
      autoFocus: false,
      data: {
        message: 'Ви впевнені, що хочете видалити деталі новини?',
        icon: '',
        isError: true
      }
    }).afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.newsService.deleteFirebase(news.id as string).then(() => {
        this.loadNews();      
        this.toastr.showSuccess('', 'Новину видалено');        
      })
      }
    })    
    
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.newsForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }


  deleteImage(): void {
    this.imageService.deleteUploadFile(this.valueByControl('imagePath')).then(() => {      
      this.isUploaded = false;
      this.uploadPercent = 0;
      this.newsForm.patchValue({
        imagePath: null
      })
    })
      .catch(err => {
        console.log(err);
      })
  }

  valueByControl(control: string): string {
    return this.newsForm.get(control)?.value;
  }

  openForm():void {
    this.isAdd = true;
  }


}
