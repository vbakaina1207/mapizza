import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IMassageResponse } from 'src/app/shared/interfaces/massage/massage.interface';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { MassageService } from 'src/app/shared/services/massage/massage.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AboutComponent implements OnInit {

  public images = ['assets/benefits/benefits-1.svg', 'assets/benefits/benefits-2.svg', 'assets/benefits/benefits-3.svg', 'assets/benefits/benefits-4.svg']
  public massages: Array<IMassageResponse> = [];
  public massageForm!: FormGroup;
  public uploadPercent!: number;
  public isUploaded = false;
  public file!: any;
  public inputEmpty = false;
  public isValid = false;

  constructor(
    private fb: FormBuilder,
    private massageService: MassageService,
    private imageService: ImageService,
    private toastr: ToastrService
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
    console.log(this.isValid, 'valid');
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
      console.log(this.isUploaded, this.file,'1')
      this.uploadPercent = 0;
      this.massageForm.patchValue({
        imagePath: null
      })
    })
    this.file = null;
    console.log(this.isUploaded, this.file, '2');
  }

  valueByControl(control: string): string {
    return this.massageForm.get(control)?.value;
  }

  addMassage(): void {
    // if (this.massageForm.invalid) {
    //   this.isValid = true;
    // }
    this.isValid = true;
    if (this.massageForm.valid) {
      this.massageService.createFirebase(this.massageForm.value).then(() => {
        this.toastr.success('Massage successfully created');
      })
      this.massageForm.reset();
      this.isUploaded = false;
      this.uploadPercent = 0;
    }
    console.log(this.isValid, 'valid2');
  }
}
