import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AlertDialogComponent } from 'src/app/components/alert-dialog/alert-dialog.component';
import { AuthDialogComponent } from 'src/app/components/auth-dialog/auth-dialog.component';
import { TermsDialogComponent } from 'src/app/components/terms-dialog/terms-dialog.component';
import { FaqService } from 'src/app/shared/services/faq/faq.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  public feedbackForm!: FormGroup;
  public selectedStars: number = 0;
  public currentUser!: any;
  public isUploaded: boolean = false;
  public file!: any;
  public isLogin: boolean = false;
  public isValid: boolean = false;
  public stars: any[] = [
    {star: 2, text: "Жахливо"}, 
    {star: 3, text: "Погано"}, 
    {star: 4, text: "Добре"}, 
    {star: 5, text: "Відмінно"}
  ];

  constructor(
    private fb: FormBuilder,
    public toastr: ToastrService,
    public dialog: MatDialog,
    public faqService: FaqService,
    public imageService: ImageService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.initFaqForm();
    this.loadUser();
  }

  initFaqForm(): void {
    this.feedbackForm = this.fb.group({
      name: [this.currentUser ? this.currentUser['firstName'] : null],
      email: [this.currentUser ? this.currentUser['email'] : null],
      phone: [this.currentUser ? this.currentUser['phoneNumber'] : null],
      stars: [0, Validators.required],
      comment: ['', Validators.required],
      imagePath: [null],
      date_message: new Date()
    });
  }

  rate(star: any) {
    this.selectedStars = star.star;
    this.feedbackForm?.patchValue({ 'stars': this.selectedStars });
  }

  loadUser(): void {
    if(localStorage.length > 0 && localStorage.getItem('currentUser')){
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
      this.isLogin = true;
    } 
    if (!this.currentUser) 
      this.openLoginDialog();
  }

  upload(event: any): void {
    this.file = event.target.files[0];
    this.imageService.uploadFile('images', this.file.name, this.file)
      .then(data => {
        this.feedbackForm.patchValue({
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
      console.log('File deleted');
      this.isUploaded = false;
      this.feedbackForm.patchValue({
        imagePath: null
      })
    })
      .catch(err => {
        console.log(err);
      })
  }

valueByControl(control: string): string {
    return this.feedbackForm.get(control)?.value;
}
  
  submitFeedback(): void {
    this.isValid = true;
    Object.keys(this.feedbackForm.controls).forEach(field => {
      const control = this.feedbackForm.get(field);
      if (control && control.invalid) {
        control.markAsTouched({ onlySelf: true });
      }
    });
      if (this.feedbackForm.valid && this.isLogin) {        
        this.faqService.createFirebase(this.feedbackForm.value).then(() => {
          this.dialog.open(AlertDialogComponent, {
              backdropClass: 'dialog-back',
              panelClass: 'alert-dialog',
              autoFocus: false,
              data: {
                message: 'Feedback successfully created ',
                icon: '',
                isError: false
              }
            });
          this.toastr.success('Feedback successfully created');          
          this.feedbackForm.reset();
          this.selectedStars = 0;
          this.isUploaded = false;
          this.isValid = false;         
        })            
      } 
  }

  openLoginDialog(): void {
    this.dialog.open(AuthDialogComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'auth-dialog',
      autoFocus: false
    }).afterClosed().subscribe(result => {
      console.log(result);
    })
  }

  termsClick(): void {
    this.dialog.open(TermsDialogComponent, {
      backdropClass: 'dialog-back',
          panelClass: 'terms-dialog',
          autoFocus: false,
          maxWidth: '100vw',         
        }).afterClosed().subscribe(result => {
          console.log(result);          
        })
  }
  
}
