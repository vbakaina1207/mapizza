import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, updateDoc } from '@angular/fire/firestore';
import { IPageRequest } from '../../interfaces/page/page.interface';

@Injectable({
    providedIn: 'root'
})
    
export class PageService {

    private pageCollection!: CollectionReference<DocumentData>;

    constructor(
        private afs: Firestore
    ) {
        this.pageCollection = collection(this.afs, 'pages');
    }
    
    getAllFirebase() {
        return collectionData(this.pageCollection, { idField: 'id' });
    }

    getOneFirebase(id: string) {
        const pageDocumentReference = doc(this.afs, `pages/${id}`);
        return docData(pageDocumentReference, { idField: 'id' });
    }

    createFirebase(page: IPageRequest) {
        return addDoc(this.pageCollection, page);
    }

    updateFirebase(page: IPageRequest, id: string) {
        const pageDocumentReference = doc(this.afs, `pages/${id}`);
        return updateDoc(pageDocumentReference, {...page});
    }

    deleteFirebase(id: string) {
        const pageDocumentReference = doc(this.afs, `pages/${id}`);
        return deleteDoc(pageDocumentReference);
    }

}
