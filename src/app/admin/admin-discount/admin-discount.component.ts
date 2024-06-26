import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/components/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss']
})
export class AdminDiscountComponent implements OnInit {

  public adminDiscounts: Array<IDiscountResponse> = [];
  public discountForm!: FormGroup;
  public isAdd = false;
  public editStatus = false;
  public uploadPercent!: number;
  public isUploaded = false;
  public currentDiscountId!: number | string;


  constructor(
    private fb: FormBuilder,
    private discountService: DiscountService,
    private imageService: ImageService,
    public toastr: ToastService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.initDiscountForm();
    this.loadDiscounts();
  }

  initDiscountForm(): void {    
    this.discountForm = this.fb.group({
      date: [new Date(), Validators.required],
      name: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      imagePath: [null, Validators.required]
    });
  }

  loadDiscounts(): void {
    this.discountService.getAllFirebase().subscribe(data => {
      this.adminDiscounts = data as IDiscountResponse[];
    })
  }

  addDiscount(): void {
    if(this.editStatus){
      this.discountService.updateFirebase(this.discountForm.value, this.currentDiscountId as string).then(() => {
        this.loadDiscounts();        
        this.toastr.showSuccess('', 'Акцію змінено');
      })
    } else {
      this.discountService.createFirebase(this.discountForm.value).then(() => {        
        this.toastr.showSuccess('', 'Акцію додано');
      })
    }
    this.editStatus = false;
    this.discountForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
    this.isAdd = false;
  }

  editDiscount(discount: IDiscountResponse): void {
    this.openForm();
    this.discountForm.patchValue({
      date: discount.date,
      name:discount.name,
      title: discount.title,
      description: discount.description,
      imagePath: discount.imagePath
    });
    this.editStatus = true;
    this.currentDiscountId = discount.id;
    this.isUploaded = true;
  }

  deleteDiscount(discount: IDiscountResponse): void {
    this.dialog.open(AlertDialogComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'alert-dialog',
      autoFocus: false,
      data: {
        message: 'Ви впевнені, що хочете видалити акцію?',
        icon: '',
        isError: true
      }
    }).afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.discountService.deleteFirebase(discount.id as string).then(() => {
        this.loadDiscounts();     
        this.toastr.showSuccess('', 'Акцію видалено');
      })
    }
  })  
}

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.discountForm.patchValue({
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
      this.discountForm.patchValue({
        imagePath: null
      })
    })
      .catch(err => {
        console.log(err);
      })
  }

  valueByControl(control: string): string {
    return this.discountForm.get(control)?.value;
  }


  openForm():void {
    this.isAdd = true;
  }
}
