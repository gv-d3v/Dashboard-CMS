/*import {
  collection,
  onSnapshot,
  query,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  orderBy,
  Timestamp,
  runTransaction,
  where,
  addDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

export async function updateRestaurantImageReference(restaurantId, publicImageUrl) {
  const restaurantRef = doc(collection(db, "restaurants"), restaurantId);
  if (restaurantRef) {
    await updateDoc(restaurantRef, { photo: publicImageUrl });
  }
}
*/