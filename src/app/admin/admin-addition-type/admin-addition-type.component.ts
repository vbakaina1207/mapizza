import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ITypeAdditionResponse } from 'src/app/shared/interfaces/type-addition/type-addition.interfaces';
import { AdditionProductService } from 'src/app/shared/services/addition-product/addition-product.service';
import { ImageService } from 'src/app/shared/services/image/image.service';



@Component({
  selector: 'app-admin-addition-type',
  templateUrl: './admin-addition-type.component.html',
  styleUrls: ['./admin-addition-type.component.scss']
})
export class AdminAdditionTypeComponent implements OnInit {

  public adminAdditionProducts: Array<ITypeAdditionResponse> = [];
  public typeAdditionForm!: FormGroup;
  public isAdd = false;
  public editStatus = false;
  private currentTypeAdditionId!: string;
  public uploadPercent!: number;
  public isUploaded = false;

  constructor(
    private fb: FormBuilder,
    private additionProductService: AdditionProductService,
    private imageService: ImageService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.initTypeAdditionForm();
    this.loadTypeAddition();
  }

  initTypeAdditionForm(): void {
    this.typeAdditionForm = this.fb.group({
      name: [null, Validators.required],
      description: [null],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: [null, Validators.required]
    });
  }

  loadTypeAddition(): void {
    this.additionProductService.getAllFirebase().subscribe(data => {
      this.adminAdditionProducts = data as ITypeAdditionResponse[];
    })
  }

  openForm():void {
    this.isAdd = true;
  }

  addAdditionProduct(): void {
    if(this.editStatus){
      this.additionProductService.updateFirebase(this.typeAdditionForm.value, this.currentTypeAdditionId).then(() => {
        this.loadTypeAddition();
        this.toastr.success('Type of product successfully updated');
      })
    } else {
      this.additionProductService.createFirebase(this.typeAdditionForm.value).then(() => {
        this.toastr.success('Type of product  successfully created');
      })
    }
    this.editStatus = false;
    this.typeAdditionForm.reset();
    this.isAdd = false;
  }

  editAdditionProduct(additionProduct: ITypeAdditionResponse): void {
    this.openForm();
    this.typeAdditionForm.patchValue({
      name: additionProduct.name,
      description: additionProduct.description,
      weight: additionProduct.weight,
      price: additionProduct.price,
      path: additionProduct.path,
      imagePath: additionProduct.imagePath
    });
    this.editStatus = true;
    this.currentTypeAdditionId = additionProduct.id;
  }

  deleteAdditionProduct(additiionProduct: ITypeAdditionResponse): void {
    this.additionProductService.deleteFirebase(additiionProduct.id).then(() => {
      this.loadTypeAddition();
      this.toastr.success('Type of product  successfully deleted');
    })
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.typeAdditionForm.patchValue({
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
      this.typeAdditionForm.patchValue({
      imagePath: null
      })
    })
  }

  valueByControl(control: string): string {
    return this.typeAdditionForm.get(control)?.value;
  }


}
