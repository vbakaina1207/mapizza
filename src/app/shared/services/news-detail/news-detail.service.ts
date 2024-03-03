import { Injectable } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  addDoc,
  collectionData,
  deleteDoc,
  doc,
  docData,
  orderBy,
  query,
  updateDoc,
  where
} from '@angular/fire/firestore';
import { collection, DocumentData } from '@firebase/firestore';
import { INewsDetailRequest } from '../../interfaces/news/news-info.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsDetailService {

    private newsDetailCollection!: CollectionReference<DocumentData>;

    constructor(private afs: Firestore) { 
    
      this.newsDetailCollection = collection(this.afs, 'newsDetail');
    }
    
  getAllFirebase() {
    return collectionData(this.newsDetailCollection, { idField: 'id' });
  }

  getOneFirebase(id: string) {
    const discountDocumentReference = doc(this.afs, `newsDetail/${id}`);
    return docData(discountDocumentReference, { idField: 'id' });
  }

  createFirebase(news: INewsDetailRequest) {
    return addDoc(this.newsDetailCollection, news);
  }

  updateFirebase(newsDetail: INewsDetailRequest, id: string) {
    const newsDocumentReference = doc(this.afs, `newsDetail/${id}`);
    return updateDoc(newsDocumentReference, {...newsDetail});
  }

  deleteFirebase(id: string) {
    const newsDocumentReference = doc(this.afs, `newsDetail/${id}`);
    return deleteDoc(newsDocumentReference);
  }

}
