import { getStorage, ref, getMetadata } from "firebase/storage";
import { FirebaseApp } from "../pages/Account";

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
// Example usage
