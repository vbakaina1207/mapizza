import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin } from '../../account/account.interface';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
    
export class AccountService {
    
    public isUserLogin$ = new Subject<boolean>();
    public changeAddress = new Subject<boolean>();
    public changeCurrentUser = new Subject<boolean>();
    // public changeIndexAddress = new Subject<boolean>();
    // public currentUser: any;
    // public dataUser!: any;
    public index!: number;
    public isEdit!: boolean;
    public userAddress = [];
    public datauser = {};
    private url = environment.BACKEND_URL;
    private api = { auth: `${this.url}/auth` };

    constructor(
        private http: HttpClient,
        private afs: Firestore
    ) { }

    login(credential: ILogin): Observable<any> {
        return this.http.get(`${this.api.auth}?email=${credential.email}&password=${credential.password}`)
    }


}
