// "use client";

// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";
// import {
//   auth,
//   onAuthStateChanged,
//   signOut,
//   type User,
// } from "@/lib/firebase";
// import { useToast } from "@/components/Toast";

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   logout: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   loading: true,
//   logout: async () => {},
// });

// export const useAuth = () => useContext(AuthContext);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const { showToast } = useToast();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
//       setUser(firebaseUser);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   const logout = async () => {
//     try {
//       await signOut(auth);
//       showToast("Signed out successfully", "success");
//     } catch {
//       showToast("Failed to sign out", "error");
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }



"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  auth,
  onAuthStateChanged,
  signOut,
  type User,
} from "@/lib/firebase";
import { useToast } from "@/components/Toast";
import { getFirestore, getDoc, doc } from "firebase/firestore";

// Extended user type that includes our custom 'role' field
export type AppUser = User & {
  role?: "user" | "provider" | "admin";
};

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const db = getFirestore();
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          
          if (userDoc.exists()) {
            // User has a profile document, attach their role
            const userData = userDoc.data();
            setUser({ 
              ...firebaseUser, 
              role: userData.role || "user" 
            });
          } else {
            // Brand new user with no document yet, default to standard user
            setUser({ 
              ...firebaseUser, 
              role: "user" 
            });
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          // If Firestore fails, still let them log in with default role
          setUser({ 
            ...firebaseUser, 
            role: "user" 
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false); // Stop loading ONLY after auth AND database check are done
    });
    
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      showToast("Signed out successfully", "success");
    } catch {
      showToast("Failed to sign out", "error");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}