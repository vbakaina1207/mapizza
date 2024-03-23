import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PrivacyPolicyComponent } from "./privacy-policy.component";
import { SharedModule } from "primeng/api";
import { PrivacyPolicyRoutingModule } from "./privacy-policy-routing.module";


@NgModule({
    declarations: [
        PrivacyPolicyComponent,
    ],
    imports: [
        CommonModule,
        SharedModule, 
        PrivacyPolicyRoutingModule,
    ]
})
export class PrivacyPolicyModule { }
