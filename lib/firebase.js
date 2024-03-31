import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

async function fetchFirebaseConfig() {
  try {
    const response = await fetch("/api/fb/fireConfig");
    const data = await response.json();
    return data.firebaseConfig;
  } catch (error) {
    console.error("Error fetching Firebase config:", error);
    return null;
  }
}

async function initializeFirebase() {
  const firebaseConfig = await fetchFirebaseConfig();
  if (!firebaseConfig) {
    console.error("Failed to initialize Firebase: Firebase config is not available.");
    return null;
  }

  // Check if Firebase app is already initialized, if not, initialize it
  const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

  // Initialize Firebase services using the initialized Firebase app
  const storage = getStorage(firebaseApp);
  const auth = getAuth(firebaseApp);

  return { firebaseApp, storage, auth };
}

export default initializeFirebase;
