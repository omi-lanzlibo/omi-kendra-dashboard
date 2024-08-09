"use client";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebaseConfig"; // Adjust path as necessary
import { onAuthStateChanged, User } from "firebase/auth";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};

export default useAuth;
