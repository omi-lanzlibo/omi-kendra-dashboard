import { useState, useEffect } from "react";
import { onAuthStateChanged, getAuth, User } from "firebase/auth"; // Import User type
import { auth } from "@/lib/firebaseConfig";

const useFirebaseAuth = () => {
  const [user, setUser] = useState<User | null>(null); // Define user state as User or null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Correctly set user or null
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};

export default useFirebaseAuth;
