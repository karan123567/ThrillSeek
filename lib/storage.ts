// import {
//   getStorage,
//   ref,
//   uploadBytes,
// } from "firebase/storage";
// import { auth } from "./firebase";

// export async function uploadReviewPhoto(
//   file: File,
//   adventureId: number
// ): Promise<{ url: string; path: string }> {
//   if (!auth.currentUser) throw new Error("Must be logged in");

//   const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-");
//   const timestamp = Date.now();
//   const path = `reviews/${adventureId}/${auth.currentUser.uid}/${timestamp}-${safeName}`;

//   const storageRef = ref(getStorage(), path);
//   await uploadBytes(storageRef, file);
//   const url = await storageRef.getDownloadURL();
//   return { url, path };
// }


import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL, // Added the missing import
} from "firebase/storage";
import { auth } from "./firebase";

export async function uploadReviewPhoto(
  file: File,
  adventureId: number
): Promise<{ url: string; path: string }> {
  if (!auth.currentUser) throw new Error("Must be logged in");

  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-");
  const timestamp = Date.now();
  const path = `reviews/${adventureId}/${auth.currentUser.uid}/${timestamp}-${safeName}`;

  const storageRef = ref(getStorage(), path);
  await uploadBytes(storageRef, file);
  
  // Fixed: Use the imported function instead of calling it as a method
  const url = await getDownloadURL(storageRef);
  
  return { url, path };
}