// import {
//   getFirestore,
//   doc,
//   getDoc,
//   setDoc,
//   updateDoc,
//   onSnapshot,
//   serverTimestamp,
// } from "firebase/firestore";
// import { auth } from "./firebase";

// const db = getFirestore();

// const WISHLIST_COLLECTION = "wishlists";

// /**
//  * Get the wishlist document reference for the current user
//  */
// function getWishlistRef(userId: string) {
//   return doc(db, WISHLIST_COLLECTION, userId);
// }

// /**
//  * Fetch the user's wishlist from Firestore
//  * Returns an array of adventure IDs
//  */
// export async function fetchWishlist(userId: string): Promise<number[]> {
//   try {
//     const docSnap = await getDoc(getWishlistRef(userId));
//     if (docSnap.exists()) {
//       const data = docSnap.data();
//       return Array.isArray(data.items) ? data.items : [];
//     }
//     return [];
//   } catch (error) {
//     console.error("Error fetching wishlist:", error);
//     return [];
//   }
// }

// /**
//  * Initialize wishlist document for a new user
//  * Called after first sign-in
//  */
// export async function initWishlist(userId: string): Promise<void> {
//   try {
//     const docSnap = await getDoc(getWishlistRef(userId));
//     if (!docSnap.exists()) {
//       await setDoc(getWishlistRef(userId), {
//         items: [],
//         createdAt: serverTimestamp(),
//         updatedAt: serverTimestamp(),
//       });
//     }
//   } catch (error) {
//     console.error("Error initializing wishlist:", error);
//   }
// }

// /**
//  * Add an adventure to wishlist
//  * Returns the updated items array
//  */
// export async function addToWishlist(
//   userId: string,
//   adventureId: number
// ): Promise<number[]> {
//   try {
//     const docSnap = await getDoc(getWishlistRef(userId));
//     const currentItems: number[] = docSnap.exists()
//       ? Array.isArray(docSnap.data().items)
//         ? docSnap.data().items
//         : []
//       : [];

//     if (currentItems.includes(adventureId)) {
//       return currentItems; // Already in wishlist
//     }

//     const updatedItems = [...currentItems, adventureId];

//     await setDoc(
//       getWishlistRef(userId),
//       {
//         items: updatedItems,
//         updatedAt: serverTimestamp(),
//       },
//       { merge: true }
//     );

//     return updatedItems;
//   } catch (error) {
//     console.error("Error adding to wishlist:", error);
//     throw error;
//   }
// }

// /**
//  * Remove an adventure from wishlist
//  * Returns the updated items array
//  */
// export async function removeFromWishlist(
//   userId: string,
//   adventureId: number
// ): Promise<number[]> {
//   try {
//     const docSnap = await getDoc(getWishlistRef(userId));
//     const currentItems: number[] = docSnap.exists()
//       ? Array.isArray(docSnap.data().items)
//         ? docSnap.data().items
//         : []
//       : [];

//     const updatedItems = currentItems.filter((id) => id !== adventureId);

//     await setDoc(
//       getWishlistRef(userId),
//       {
//         items: updatedItems,
//         updatedAt: serverTimestamp(),
//       },
//       { merge: true }
//     );

//     return updatedItems;
//   } catch (error) {
//     console.error("Error removing from wishlist:", error);
//     throw error;
//   }
// }

// /**
//  * Subscribe to real-time wishlist updates
//  * Returns unsubscribe function
//  */
// export function subscribeToWishlist(
//   userId: string,
//   callback: (items: number[]) => void
// ): () => void {
//   return onSnapshot(
//     getWishlistRef(userId),
//     (docSnap) => {
//       if (docSnap.exists()) {
//         const data = docSnap.data();
//         callback(Array.isArray(data.items) ? data.items : []);
//       } else {
//         callback([]);
//       }
//     },
//     (error) => {
//       console.error("Wishlist snapshot error:", error);
//       callback([]);
//     }
//   );
// }

// /**
//  * Delete wishlist document (on account deletion)
//  */
// export async function deleteWishlist(userId: string): Promise<void> {
//   try {
//     const docSnap = await getDoc(getWishlistRef(userId));
//     if (docSnap.exists()) {
//       // Firestore doesn't have a simple delete in modular SDK v9+
//       // We set it to empty instead for simplicity
//       await setDoc(getWishlistRef(userId), {
//         items: [],
//         updatedAt: serverTimestamp(),
//       });
//     }
//   } catch (error) {
//     console.error("Error deleting wishlist:", error);
//   }
// }

// export { db };


import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  setDoc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
  type DocumentSnapshot,
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

// ==========================================
// REVIEW FIRESTORE FUNCTIONS
// ==========================================

const REVIEWS_COLLECTION = "reviews";

/**
 * Get the review document reference
 * Matches the structure used in ReviewComposer: reviews/{adventureId}/reviews/{reviewId}
 */
function getReviewRef(adventureId: string | number, reviewId: string) {
  return doc(db, REVIEWS_COLLECTION, String(adventureId), "reviews", reviewId);
}

/**
 * Fetch published reviews for a specific adventure
 */
export async function fetchReviewsByAdventure(
  adventureId: string | number,
  limitCount: number = 10
) {
  try {
    const q = query(
      collection(db, REVIEWS_COLLECTION, String(adventureId), "reviews"),
      where("status", "==", "published"),
      orderBy("createdAt", "desc"),
      limit(limitCount)
    );

    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error("Error fetching adventure reviews:", error);
    return [];
  }
}

/**
 * Fetch all published reviews across the app (for the homepage carousel)
 */
export async function fetchAllPublishedReviews(limitCount: number = 6) {
  try {
    const q = query(
      collection(db, REVIEWS_COLLECTION),
      where("status", "==", "published"),
      orderBy("createdAt", "desc"),
      limit(limitCount)
    );

    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error("Error fetching all reviews:", error);
    return [];
  }
}

/**
 * Report a review (increments report count and flags it)
 */
export async function reportReview(
  adventureId: string | number,
  reviewId: string,
  currentReportCount: number
) {
  try {
    await updateDoc(getReviewRef(adventureId, reviewId), {
      reportCount: currentReportCount + 1,
      status: "flagged",
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error reporting review:", error);
    throw error;
  }
}

/**
 * Mark a review as helpful (increments helpful count)
 */
export async function markReviewHelpful(
  adventureId: string | number,
  reviewId: string,
  currentHelpfulCount: number
) {
  try {
    await updateDoc(getReviewRef(adventureId, reviewId), {
      helpfulCount: currentHelpfulCount + 1,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error marking review helpful:", error);
    throw error;
  }
}

export { db };