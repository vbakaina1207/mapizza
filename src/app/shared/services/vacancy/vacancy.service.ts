import { Injectable } from '@angular/core';
import {
  CollectionReference,  doc, Firestore, addDoc,  collectionData,
  deleteDoc, docData, updateDoc
} from '@angular/fire/firestore';
import { IVacancyRequest } from '../../interfaces/vacancy/vacancy.interface';
import { collection, DocumentData } from '@firebase/firestore';

@Injectable({
    providedIn: 'root'
})

export class VacancyService {

    private vacancyCollection!: CollectionReference<DocumentData>;

  constructor(private afs: Firestore) {
    this.vacancyCollection = collection(this.afs, 'vacancies');
  }
  
  getAllFirebase() {    
    return collectionData(this.vacancyCollection, { idField: 'id' });
  }

  getOneFirebase(id: string) {    
    const vacancyDocumentReference = doc(this.afs, `vacancies/${id}`);
    return docData(vacancyDocumentReference, { idField: 'id' });
  }

  createFirebase(vacancy: IVacancyRequest) {
    return addDoc(this.vacancyCollection, vacancy);
  }

  updateFirebase(vacancy: IVacancyRequest, id: string) {
    const vacancyDocumentReference = doc(this.afs, `vacancies/${id}`);
    return updateDoc(vacancyDocumentReference, {...vacancy});
  }

  deleteFirebase(id: string) {
    const vacancyDocumentReference = doc(this.afs, `vacancies/${id}`);
    return deleteDoc(vacancyDocumentReference);
  }


}
