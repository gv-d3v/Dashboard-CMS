import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
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
  return await getDownloadURL(newImageRef);
}

const determineFilePath = (websiteId, name, image, accommId, userId) => {
  if (websiteId) {
    return `images/websites/${websiteId}/${name}-${accommId}/${image.name}`;
  } else if (userId) {
    return `images/users/${name}-${userId}/${image.name}`;
  }
};
