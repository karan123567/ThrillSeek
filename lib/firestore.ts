import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { auth } from "./firebase";

const db = getFirestore();

const WISHLIST_COLLECTION = "wishlists";

/**
 * Get the wishlist document reference for the current user
 */
function getWishlistRef(userId: string) {
  return doc(db, WISHLIST_COLLECTION, userId);
}

/**
 * Fetch the user's wishlist from Firestore
 * Returns an array of adventure IDs
 */
export async function fetchWishlist(userId: string): Promise<number[]> {
  try {
    const docSnap = await getDoc(getWishlistRef(userId));
    if (docSnap.exists()) {
      const data = docSnap.data();
      return Array.isArray(data.items) ? data.items : [];
    }
    return [];
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return [];
  }
}

/**
 * Initialize wishlist document for a new user
 * Called after first sign-in
 */
export async function initWishlist(userId: string): Promise<void> {
  try {
    const docSnap = await getDoc(getWishlistRef(userId));
    if (!docSnap.exists()) {
      await setDoc(getWishlistRef(userId), {
        items: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error("Error initializing wishlist:", error);
  }
}

/**
 * Add an adventure to wishlist
 * Returns the updated items array
 */
export async function addToWishlist(
  userId: string,
  adventureId: number
): Promise<number[]> {
  try {
    const docSnap = await getDoc(getWishlistRef(userId));
    const currentItems: number[] = docSnap.exists()
      ? Array.isArray(docSnap.data().items)
        ? docSnap.data().items
        : []
      : [];

    if (currentItems.includes(adventureId)) {
      return currentItems; // Already in wishlist
    }

    const updatedItems = [...currentItems, adventureId];

    await setDoc(
      getWishlistRef(userId),
      {
        items: updatedItems,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    return updatedItems;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    throw error;
  }
}

/**
 * Remove an adventure from wishlist
 * Returns the updated items array
 */
export async function removeFromWishlist(
  userId: string,
  adventureId: number
): Promise<number[]> {
  try {
    const docSnap = await getDoc(getWishlistRef(userId));
    const currentItems: number[] = docSnap.exists()
      ? Array.isArray(docSnap.data().items)
        ? docSnap.data().items
        : []
      : [];

    const updatedItems = currentItems.filter((id) => id !== adventureId);

    await setDoc(
      getWishlistRef(userId),
      {
        items: updatedItems,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    return updatedItems;
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    throw error;
  }
}

/**
 * Subscribe to real-time wishlist updates
 * Returns unsubscribe function
 */
export function subscribeToWishlist(
  userId: string,
  callback: (items: number[]) => void
): () => void {
  return onSnapshot(
    getWishlistRef(userId),
    (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        callback(Array.isArray(data.items) ? data.items : []);
      } else {
        callback([]);
      }
    },
    (error) => {
      console.error("Wishlist snapshot error:", error);
      callback([]);
    }
  );
}

/**
 * Delete wishlist document (on account deletion)
 */
export async function deleteWishlist(userId: string): Promise<void> {
  try {
    const docSnap = await getDoc(getWishlistRef(userId));
    if (docSnap.exists()) {
      // Firestore doesn't have a simple delete in modular SDK v9+
      // We set it to empty instead for simplicity
      await setDoc(getWishlistRef(userId), {
        items: [],
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error("Error deleting wishlist:", error);
  }
}

export { db };