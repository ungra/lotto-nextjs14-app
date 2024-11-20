"use client";

import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";

export default function AppMain() {
  console.log("AppMain Start");
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser !== null) setUser(currentUser);
      console.log(currentUser);
      if (!currentUser) {
        router.push("/login"); // 사용자 없으면 로그인 페이지로 리다이렉트
      }
    });
  }, []);

  const router = useRouter();
  console.log("user:", user);
  return (
    <div>
      {user ? (
        <>
          <h1>AppMain Page</h1>
          <h2>Lotto Service</h2>
        </>
      ) : null}
    </div>
  );
}
