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
  const auth = getAuth(FirebaseApp);
  const user = auth.currentUser;

  if (user) {
    try {
      const storage = getStorage(FirebaseApp);
      const storageRef = ref(storage, `profileImages/${user.uid}`);
      const res = await listAll(storageRef);

      // Fetch metadata for each image and store them with the URL
      const metadataPromises = res.items.map(async (itemRef) => {
        const metadata = await getMetadata(itemRef);
        const url = await getDownloadURL(itemRef);
        return { metadata, url };
      });

      // Wait for all metadata promises to resolve
      const metadataData = await Promise.all(metadataPromises);

      // Sort images by creation time in descending order
      const sortedImages = metadataData.sort((a, b) => {
        // Convert 'timeCreated' to number
        const timeA = Number(a.metadata.timeCreated);
        const timeB = Number(b.metadata.timeCreated);

        // Ensure 'timeCreated' is valid before subtraction
        if (!isNaN(timeA) && !isNaN(timeB)) {
          return timeB - timeA;
        }

        // If conversion fails or one of the times is not valid, return 0
        return 0;
      });

      // Get the URL of the latest image
      const latestImage = sortedImages[0];
      return latestImage;
      // Set the latest image URL as the profile picture
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  }
};
