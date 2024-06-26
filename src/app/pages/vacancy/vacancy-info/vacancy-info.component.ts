import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IMassageResponse } from 'src/app/shared/interfaces/massage/massage.interface';
import { IVacancyResponse } from 'src/app/shared/interfaces/vacancy/vacancy.interface';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { MassageService } from 'src/app/shared/services/massage/massage.service';

@Component({
  selector: 'app-vacancy-info',
  templateUrl: './vacancy-info.component.html',
  styleUrls: ['./vacancy-info.component.scss']
})
export class VacancyInfoComponent implements OnInit {

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

  public vacancy!: IVacancyResponse;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private massageService: MassageService,
    private imageService: ImageService,
    private toastr: ToastrService,
    
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(response => {
      this.vacancy = response['vacancyInfo'];
    })
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
    console.log(this.isUploaded, this.file);
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
