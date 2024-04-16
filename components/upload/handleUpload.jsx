import { prepareImages } from "@/lib/storage";

export default async function handleUpload({ websiteId, accommId, userId, name, file }) {
  const images = file; // Get an array of selected files

  if (!images || images.length === 0) {
    return;
  }

  // Check the total number of selected files
  if (images.length > 6) {
    alert("You can only upload up to 6 files.");
    return;
  }

  // Check the size of each file
  for (const image of images) {
    if (image.size > 2 * 1024 * 1024) {
      // 2MB in bytes
      alert(`One or more images exceeds the maximum allowed size of 2MB.`);
      return;
    }
  }

  const imageURLs = await prepareImages(websiteId, name, images, accommId, userId);

  return { ...images, photos: imageURLs };
}
