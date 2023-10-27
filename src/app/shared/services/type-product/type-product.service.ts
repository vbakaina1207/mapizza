import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITypeProductRequest } from '../../interfaces/type-product/type-product.interface';
import {
  addDoc,
  collectionData,
  CollectionReference, deleteDoc,
  doc,
  docData,
  Firestore,
  updateDoc
} from '@angular/fire/firestore';

import { collection, DocumentData } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class TypeProductService {

  private url = environment.BACKEND_URL;
  private api = { typesProduct: `${this.url}/typesProduct` };
  private typeProductCollection!: CollectionReference<DocumentData>;
  constructor(
    private http: HttpClient,
    private afs: Firestore
  ) {
    this.typeProductCollection = collection(this.afs, 'typesProduct');
  }

  getAllFirebase() {
    return collectionData(this.typeProductCollection, { idField: 'id' });
  }

  getOneFirebase(id: string) {
    const typeProductDocumentReference = doc(this.afs, `typesProduct/${id}`);
    return docData(typeProductDocumentReference, { idField: 'id' });
  }

  createFirebase(typeProduct: ITypeProductRequest) {
    return addDoc(this.typeProductCollection, typeProduct);
  }

  updateFirebase(typeProduct: ITypeProductRequest, id: string) {
    const typeProductDocumentReference = doc(this.afs, `typesProduct/${id}`);
    return updateDoc(typeProductDocumentReference, {...typeProduct});
  }

  deleteFirebase(id: string) {
    const typeProductDocumentReference = doc(this.afs, `typesProduct/${id}`);
    return deleteDoc(typeProductDocumentReference);
  }


}

