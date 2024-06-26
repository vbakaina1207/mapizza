import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProductRequest } from '../../interfaces/product/product.interface';
import {
  addDoc,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  docData,
  Firestore, query,
  updateDoc, where
} from '@angular/fire/firestore';
import { collection, DocumentData } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private productCollection!: CollectionReference<DocumentData>;

  constructor(
    private http: HttpClient,
    private afs: Firestore
    ) {
    this.productCollection = collection(this.afs, 'products');
  }

  getAllFirebase() {
    return collectionData(this.productCollection, { idField: 'id' });
  }

  getOneFirebase(id: string) {
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return docData(productDocumentReference, { idField: 'id' });
  }

  getAllByProductTypeFirebase(nameTypeProduct?: string, nameCategory?: string) {
    let productByTypeProduct  = query(this.productCollection, where('type_product.path','==', `${nameTypeProduct}`), where ('category.path','==', `${nameCategory}`));
    return collectionData(productByTypeProduct,  { idField: 'id' });
  }

  getAllByCategoryFirebase(name: string) {
    let productByCategory  = query(this.productCollection, where('category.path','==', `${name}`));
      return collectionData(productByCategory,  { idField: 'id' });
  }
  
  createFirebase(product: IProductRequest) {
    return addDoc(this.productCollection, product);
  }

  updateFirebase(product: IProductRequest, id: string) {
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return updateDoc(productDocumentReference, {...product});
  }

  deleteFirebase(id: string) {
    const productDocumentReference = doc(this.afs, `products/${id}`);
    return deleteDoc(productDocumentReference);
  }


}
