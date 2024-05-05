import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AlertDialogComponent } from 'src/app/components/alert-dialog/alert-dialog.component';
import { INewsAddResponse, INewsDetailResponse } from 'src/app/shared/interfaces/news/news-info.interface';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { NewsDetailService } from 'src/app/shared/services/news-detail/news-detail.service';
import { NewsInfoService } from 'src/app/shared/services/news-info/news-info.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-admin-news-info',
  templateUrl: './admin-news-info.component.html',
  styleUrls: ['./admin-news-info.component.scss']
})
export class AdminNewsInfoComponent implements OnInit {

  public adminNews: Array<INewsAddResponse> = [];
  public adminDetailNews: Array<INewsDetailResponse> = [];
  public newsForm!: FormGroup;
  public isAdd = false;
  public editStatus = false;
  public uploadPercent!: number;
  public isUploaded = false;
  private currentNewsId!: number | string;

  constructor(
    private fb: FormBuilder,
    private newsService: NewsInfoService,
    private newsDetailService: NewsDetailService,
    private imageService: ImageService,
    private toastr: ToastService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.initNewsForm();
    this.loadNews();
    this.loadDetailNews();
  }

  initNewsForm(): void {
    this.newsForm = this.fb.group({
      title: [null],
      description: [null],
      imagePath: [null],
      detail: [[null]]
    });
  }

  loadNews(): void {
    this.newsService.getAllFirebase().subscribe(data => {
      this.adminNews = data as INewsAddResponse[];
    })
  }

  loadDetailNews(): void {
    this.newsDetailService.getAllFirebase().subscribe(data =>{
      this.adminDetailNews = data as INewsDetailResponse[];
      this.newsForm.patchValue({
        detail: this.adminDetailNews[0]?.id
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

  editNews(news: INewsAddResponse): void {
    this.openForm();
    this.newsForm.patchValue({
      title: news.title,
      description: news.description,
      imagePath: news.imagePath,
      detail: news.detail
    });
    this.editStatus = true;
    this.currentNewsId = news.id;
    this.isUploaded = true;
  }

  deleteNews(news: INewsAddResponse): void {
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
