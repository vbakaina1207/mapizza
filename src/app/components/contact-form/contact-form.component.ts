import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IMassageResponse } from 'src/app/shared/interfaces/massage/massage.interface';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { MassageService } from 'src/app/shared/services/massage/massage.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  public massages: Array<IMassageResponse> = [];
  public massageForm!: FormGroup;
  public uploadPercent!: number;
  public isUploaded = false;
  public file!: any;
  public inputEmpty = false;
  public isValid = false;
  public caption = '';
  public phone = '';
  public email = '';
  public workTime = '';
  public mailto = '';
  public placeholderDescription = '';
  public isAbout = false;
  public isSocial = false;

  constructor(
    private fb: FormBuilder,
    private massageService: MassageService,
    private imageService: ImageService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.initMassageForm();
    this.loadMassages();
  }

  initMassageForm(): void {
    this.massageForm = this.fb.group({
      name: [null, Validators.required],
      phone: [null, Validators.required],
      email: [null, Validators.required],      
      description: [null],
      imagePath: [null],
      date_message: new Date()
    });
    this.isValid = false;
    
    if ( this.route.component?.name === 'ContactComponent') {
      this.caption = 'Форма зворотнього зв`язку';
    } else this.caption = 'Не знайшли свою вакансію?';
    if (this.route.component?.name == 'VacancyComponent') {
      this.email = 'mapizza.hr@gmail.com';
      this.phone = '+38 097 35 823 73';
      this.workTime = 'щодня, 09:30 − 21:00';
      this.placeholderDescription = 'Розкажіть трошки про себе...';
      this.isSocial = true;

    } else {
      this.email = 'mamaitalianopizza@gmail.com';
      this.phone = '+380971830618';
      this.workTime = 'пн-нд 10:00 - 22:30';      
      this.placeholderDescription = 'Повідомлення...';
    }
    if ( this.route.component?.name === 'AboutComponent' ) {      
      this.isAbout = true;
    }
    this.mailto = 'mailto:' + this.email;
  }

  loadMassages(): void {
    this.massageService.getAllFirebase().subscribe(data => {
      this.massages = data as IMassageResponse[];
    })
  }

  
  upload(event: any): void {
    this.file = event.target.files[0];
    this.imageService.uploadFile('images', this.file.name, this.file)
      .then(data => {
        this.massageForm.patchValue({
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
      this.uploadPercent = 0;
      this.massageForm.patchValue({
        imagePath: null
      })
    })
    this.file = null;
  }

  valueByControl(control: string): string {
    return this.massageForm.get(control)?.value;
  }

  addMassage(): void {
    this.isValid = true;
    Object.keys(this.massageForm.controls).forEach(field => {
      const control = this.massageForm.get(field);
      if (control && control.invalid) {
        control.markAsTouched({ onlySelf: true });
      }
    });
    if (this.massageForm.valid) {
      this.massageService.createFirebase(this.massageForm.value).then(() => {
        this.toastr.success('Massage successfully created');
      })
      this.massageForm.reset();
      this.isUploaded = false;
      this.uploadPercent = 0;
    }
  }
}
