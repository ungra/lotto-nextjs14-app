"use client";

import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";

export default function Lotto() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        const router = useRouter();
        router.push("/login");
      }
    });
  }, []);
  return (
    <div>
      <h1>Lotto Page...</h1>
      <h3>You Logged In</h3>
    </div>
  );
}
