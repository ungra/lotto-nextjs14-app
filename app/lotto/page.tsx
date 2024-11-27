"use client";

import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";

export default function Lotto() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/login");
      }
    });
  }, []);
  const onClick = async () => {
    try {
      const ok = confirm("Are you sure you want to log out?");
      if (ok) {
        await signOut(auth);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Lotto Page...</h1>
      <h3>You Logged In</h3>
      <button onClick={onClick}>Log Out</button>
    </div>
  );
}
