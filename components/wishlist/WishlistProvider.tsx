"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  fetchWishlist,
  initWishlist,
  addToWishlist as dbAdd,
  removeFromWishlist as dbRemove,
  subscribeToWishlist,
} from "@/lib/firestore";
import { useToast } from "@/components/Toast";
import { adventures } from "@/lib/data";
import { Adventure } from "@/lib/types";

interface WishlistContextType {
  items: number[];
  adventures: Adventure[];
  loading: boolean;
  isWished: (id: number) => boolean;
  toggle: (id: number) => Promise<void>;
  count: number;
}

const WishlistContext = createContext<WishlistContextType>({
  items: [],
  adventures: [],
  loading: true,
  isWished: () => false,
  toggle: async () => {},
  count: 0,
});

export const useWishlist = () => useContext(WishlistContext);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [items, setItems] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  // Resolve adventure objects from IDs
  const  wishlistAdventures = items
    .map((id) => adventures.find((a) => a.id === id))
    .filter((a): a is Adventure => a !== undefined);

  const isWished = useCallback(
    (id: number) => items.includes(id),
    [items]
  );

  const count = items.length;

  // Initialize wishlist for new users
  useEffect(() => {
    if (user) {
      initWishlist(user.uid).catch(() => {});
    }
  }, [user]);

  // Subscribe to real-time updates
  useEffect(() => {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    // Initial fetch
    fetchWishlist(user.uid)
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => {
        setItems([]);
        setLoading(false);
      });

    // Real-time subscription
    const unsubscribe = subscribeToWishlist(user.uid, (data) => {
      setItems(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Toggle with optimistic update
  const toggle = useCallback(
    async (adventureId: number) => {
      if (!user) {
        showToast("Sign in to save adventures to your wishlist", "info");
        return;
      }

      const wasWished = items.includes(adventureId);
      const advName =
        adventures.find((a) => a.id === adventureId)?.name || "Adventure";

      // Optimistic update — update UI immediately
      if (wasWished) {
        setItems((prev) => prev.filter((id) => id !== adventureId));
      } else {
        setItems((prev) => [...prev, adventureId]);
      }

      try {
        // Then sync to Firestore
        if (wasWished) {
          await dbRemove(user.uid, adventureId);
          showToast(`${advName} removed from wishlist`, "info");
        } else {
          await dbAdd(user.uid, adventureId);
          showToast(`${advName} saved to wishlist!`, "success");
        }
      } catch {
        // Revert on error
        if (wasWished) {
          setItems((prev) => [...prev, adventureId]);
        } else {
          setItems((prev) => prev.filter((id) => id !== adventureId));
        }
        showToast("Failed to update wishlist. Try again.", "error");
      }
    },
    [user, items, adventures, showToast]
  );

  return (
    <WishlistContext.Provider
      value={{ items, adventures: wishlistAdventures, loading, isWished, toggle, count }}
    >
      {children}
    </WishlistContext.Provider>
  );
}