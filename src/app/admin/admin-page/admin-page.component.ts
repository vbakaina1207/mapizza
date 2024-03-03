import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IPageResponse } from 'src/app/shared/interfaces/page/page.interface';
import { PageService } from 'src/app/shared/services/page/page.service';
import { ToastService } from 'src/app/shared/services/toast/toast.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  public adminPages: Array<IPageResponse> = [];
  public pageForm!: FormGroup;
  public isAdd = false;
  public editStatus = false;
  public currentPageId!: number | string;

  constructor(
    private fb: FormBuilder,
    private pageService: PageService,
    private toastr: ToastService
  ) { }

  ngOnInit() {
    this.loadPages();
    this.initPageForm();
  }

  initPageForm(): void {
    this.pageForm = this.fb.group({
      page: [null, Validators.required]
    });
  }

  loadPages(): void {
    this.pageService.getAllFirebase().subscribe(data => {
      this.adminPages = data as IPageResponse[];
    })
  }

  openForm():void {
    this.isAdd = true;
  }

  addPage(): void {
    if(this.editStatus){
      this.pageService.updateFirebase(this.pageForm.value, this.currentPageId as string).then(() => {
        this.loadPages();
        // this.toastr.success('Page successfully updated');
        this.toastr.showSuccess('', 'Сторінку змінено');
      })
    } else {
      this.pageService.createFirebase(this.pageForm.value).then(() => {
        // this.toastr.success('Page successfully created');
        this.toastr.showSuccess('', 'Сторінку додано');
      })
    }
    this.editStatus = false;
    this.pageForm.reset();
    this.isAdd = false;
  }

  editPage(page: IPageResponse): void {
    this.openForm();
    this.pageForm.patchValue({
      page: page.page,
    });
    this.editStatus = true;
    this.currentPageId = page.id;
  }

  deletePage(page: IPageResponse): void {
    this.pageService.deleteFirebase(page.id as string).then(() => {
      this.loadPages();
      // this.toastr.success('Page successfully deleted');
      this.toastr.showSuccess('', 'Сторінку видалено');
    })
  }

  valueByControl(control: string): string {
    return this.pageForm.get(control)?.value;
  }
}
