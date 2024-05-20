import { Injectable } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  addDoc,
  collectionData,
  deleteDoc,
  doc,
  docData,
  updateDoc
} from '@angular/fire/firestore';
import { collection, DocumentData } from '@firebase/firestore';
import { INewsAddRequest } from '../../interfaces/news/news-info.interface';


@Injectable({
  providedIn: 'root'
})
export class NewsInfoService {

  private newsInfoCollection!: CollectionReference<DocumentData>;

    constructor(private afs: Firestore) { 
    
      this.newsInfoCollection = collection(this.afs, 'newsInfo');
    }
    
  getAllFirebase() {
    return collectionData(this.newsInfoCollection, { idField: 'id' });
  }

  getOneFirebase(id: string) {
    const newsDocumentReference = doc(this.afs, `newsInfo/${id}`);
    return docData(newsDocumentReference, { idField: 'id' });
  }

  createFirebase(news: INewsAddRequest) {
    return addDoc(this.newsInfoCollection, news);
  }

  updateFirebase(newsInfo: INewsAddRequest, id: string) {
    const newsDocumentReference = doc(this.afs, `newsInfo/${id}`);
    return updateDoc(newsDocumentReference, {...newsInfo});
  }

  deleteFirebase(id: string) {
    const newsDocumentReference = doc(this.afs, `newsInfo/${id}`);
    return deleteDoc(newsDocumentReference);
  }

}
