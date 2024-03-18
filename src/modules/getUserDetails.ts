import {
  getStorage,
  ref,
  getMetadata,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import { FirebaseApp } from "../pages/Account";
import { getAuth } from "firebase/auth";

// Function to get the file type (MIME type) from Firebase Storage
export const getFileType = async (filePath: string): Promise<string> => {
  const storage = getStorage(FirebaseApp);
  const fileRef = ref(storage, filePath);
  try {
    const metadata = await getMetadata(fileRef);
    return metadata.contentType || "";
  } catch (error) {
    console.error("Error getting file metadata:", error);
    return "";
  }
};

export const downloadFile = (url: string) => {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = url;
  anchor.click();
};

export const getProfilePicture = async () => {
  // Get Auth
  const auth = getAuth(FirebaseApp);
  const user = auth.currentUser;
  if (user) {
    try {
      const storage = getStorage(FirebaseApp);
      const storageRef = ref(storage, `profileImages/${user.uid}`);
      const res = await listAll(storageRef);
      const urlsPromises = res.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        const meta = await getMetadata(itemRef);
        return { photoSrc: url, photoName: meta.name };
      });
      const photoData = await Promise.all(urlsPromises);
      return photoData;
    } catch (error) {
      throw new Error("Failed To Fetch Profile Picture");
    }
  } else {
    console.error("no user found");
  }
};
