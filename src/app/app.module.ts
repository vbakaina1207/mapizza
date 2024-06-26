import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleMapsModule } from '@angular/google-maps';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { AuthAddressComponent } from './components/auth-address/auth-address.component';
import { AuthAdditionComponent } from './components/aus-addition/auth-addition.component';
import { BasketComponent } from './pages/basket/basket.component';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { SharedModule } from './shared/sahared.module';



import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { getStorage } from '@angular/fire/storage';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';



import { provideStorage } from '@angular/fire/storage';

import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { left } from '@popperjs/core';



@NgModule({
  declarations: [			
    AppComponent,
      HeaderComponent,
      FooterComponent,
      AuthDialogComponent,
      AuthAddressComponent,
      AuthAdditionComponent,
      BasketComponent,
      AlertDialogComponent,
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    ToastrModule.forRoot({
      positionClass: 'toast-center-center',
      preventDuplicates: true,
      timeOut: 5000,
    }),
    SharedModule,
    HttpClientModule,
    NgbModule,
    NgbCarouselModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
