import { getAuth } from "firebase/auth";
import {
  DocumentData,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { FirebaseApp } from "../pages/Account";
import { TokenizingProps } from "./tokenize";

// Database Management Code Blocks
export function getStorageDataCollectionRef() {
  const auth = getAuth(FirebaseApp);
  const user = auth.currentUser;
  if (user) {
    const db = getFirestore(FirebaseApp);
    const userCollectionRef = collection(db, "users");
    const userDocumentRef = doc(userCollectionRef, user.uid);
    const storageDataCollectionRef = collection(userDocumentRef, "storageData");
    return storageDataCollectionRef;
  } else {
    console.error("no user found");
  }
}

// READ DATABASE > USERSTORAGE
export interface DocumentDataProps {
  fileName: string;
  fileSrc: string;
  fileType: string;
  fileSize: number;
  fileUploadTime: string;
  tokens: TokenizingProps;
  detoken: string;
}
export const readUserStorageDocument = async () => {
  const storageDataCollectionRef = getStorageDataCollectionRef();
  if (storageDataCollectionRef) {
    try {
      const querySnapshot = await getDocs(storageDataCollectionRef);
      const data = querySnapshot.docs;
      return data;
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  } else {
    throw new Error("No storageDataCollectionReferences Found");
  }
};

// CREATE DATABASE > USERSTORAGE
export async function createUserStorageDocument(
  documentName: string,
  data: DocumentData
) {
  const storageDataCollectionRef = getStorageDataCollectionRef();
  if (storageDataCollectionRef) {
    const storageDataDocumentsRef = doc(storageDataCollectionRef, documentName);

    await setDoc(storageDataDocumentsRef, data);
  }
}

// CREATE DATABASE > USERSTORAGE
export async function deleteUserStorageDocument(documentId: string) {
  const storageDataCollectionRef = getStorageDataCollectionRef();
  if (storageDataCollectionRef) {
    const storageDataDocumentsRef = doc(storageDataCollectionRef, documentId);

    await deleteDoc(storageDataDocumentsRef);
  }
}
// CREATE DATABASE > USERSTORAGE
export async function updateDocumentField(
  documentID: string,
  fieldToUpdate: string,
  newValue: DocumentData | string | number | boolean
) {
  const storageDataCollectionRef = getStorageDataCollectionRef();
  if (storageDataCollectionRef) {
    const storageDataDocumentsRef = doc(storageDataCollectionRef, documentID);

    await updateDoc(storageDataDocumentsRef, {
      [fieldToUpdate]: newValue,
    });
  }
}
