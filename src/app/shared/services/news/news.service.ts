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
import { INewsRequest } from '../../interfaces/news/news.interface';
import { collection, DocumentData } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

    private newsCollection!: CollectionReference<DocumentData>;

    constructor(private afs: Firestore) { 
    
      this.newsCollection = collection(this.afs, 'news');
    }
    
  getAllFirebase() {
      let newsAll  = query(this.newsCollection, orderBy("page"));
    return collectionData(newsAll, { idField: 'id' });
  }

  getOneFirebase(id: string) {
    const discountDocumentReference = doc(this.afs, `news/${id}`);
    return docData(discountDocumentReference, { idField: 'id' });
  }

  createFirebase(news: INewsRequest) {
    return addDoc(this.newsCollection, news);
  }

  updateFirebase(news: INewsRequest, id: string) {
    const newsDocumentReference = doc(this.afs, `news/${id}`);
    return updateDoc(newsDocumentReference, {...news});
  }

  deleteFirebase(id: string) {
    const newsDocumentReference = doc(this.afs, `news/${id}`);
    return deleteDoc(newsDocumentReference);
  }

  getAllByPageFirebase(page: number) {    
    let newsByPage  = query(this.newsCollection, where('page.page','==', page));
    return collectionData(newsByPage, { idField: 'id' });
  }

}
