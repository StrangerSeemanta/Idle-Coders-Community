export default function fetchBlobUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";

    xhr.onload = () => {
      if (xhr.status === 200) {
        const blob = xhr.response;
        const blobUrl = URL.createObjectURL(blob);
        resolve(blobUrl);
      } else {
        reject(
          new Error(
            `Failed to fetch blob data: ${xhr.status} ${xhr.statusText}`
          )
        );
      }
    };

    xhr.onerror = () => {
      reject(new Error("Failed to fetch blob data."));
    };

    xhr.onprogress = (event) => {
      // Handle progress event to implement chunked loading
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        console.log(`Downloaded ${percentComplete}%`);
      }
    };

    xhr.open("GET", url);
    xhr.send();
  });
}
