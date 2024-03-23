import { NgModule } from "@angular/core";
import { PrivacyPolicyComponent } from "./privacy-policy.component";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '', component: PrivacyPolicyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivacyPolicyRoutingModule { }