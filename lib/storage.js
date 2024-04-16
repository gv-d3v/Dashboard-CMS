import { ref, uploadBytesResumable, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import initializeFirebase from "./firebase";

export async function prepareImages(websiteId, name, images, accommId, userId) {
  try {
    if (!websiteId && !name && !userId && !name) throw new Error("No ID and Name has been provided.");
    if (!images || images.length === 0) throw new Error("No images provided.");

    const imageURLs = [];

    for (const image of images) {
      const publicImageUrl = await uploadToStorage(websiteId, name, image, accommId, userId);
      imageURLs.push(publicImageUrl);
    }

    return imageURLs;
  } catch (error) {
    console.error("Error processing request:", error);
  }
}

async function uploadToStorage(websiteId, name, image, accommId, userId) {
  const filePath = determineFilePath(websiteId, name, image, accommId, userId);
  const newImageRef = ref((await initializeFirebase()).storage, filePath);
  await uploadBytesResumable(newImageRef, image);

  const firebaseURL = newImageRef._location.path_;
  const downloadURL = await getDownloadURL(newImageRef);
  
  return { firebaseURL, downloadURL };
}

const determineFilePath = (websiteId, name, image, accommId, userId) => {
  if (websiteId) {
    return `images/websites/${websiteId}/${name}-${accommId}/${image.name}`;
  } else if (userId) {
    return `images/users/${name}-${userId}/${image.name}`;
  }
};

//LIST FILES
export async function listFiles(currentFilePath, item) {
  const filePath = !currentFilePath ? "images/" : currentFilePath;
  const listRef = ref((await initializeFirebase()).storage, filePath);

  try {
    const res = await listAll(listRef);

    // Process prefixes (subfolders)
    const prefixes = res.prefixes.map(folderRef => folderRef._location.path);

    // Process items
    const items = res.items.map(itemRef => itemRef.fullPath);

    // Get item url
    const url = item ? await getDownloadURL(listRef) : "";

    return { prefixes, items, url };
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to propagate it to the caller
  }
}

export async function deleteFiles(item) {
  const deleteRef = ref((await initializeFirebase()).storage, item);

  try {
    deleteObject(deleteRef)
      //.then(() => {})
      .catch(error => {
        console.log(error);
        throw error;
      });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
