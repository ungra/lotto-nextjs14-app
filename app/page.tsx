"use client";

import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import Link from "next/link";

export default function AppMain() {
  console.log("AppMain Start");
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser !== null) {
        router.push("/lotto");
      }
    });
  }, []);
  return (
    <div>
      <h1>AppMain Page</h1>
      <h2>Lotto Service</h2>
      <div>
        <h4>Already have an account?</h4>
        <Link href="/login">Log in &rarr;</Link>
      </div>
      <div>
        <h4>Don't have an account?</h4>
        <Link href="/create-account">Create one &rarr;</Link>
      </div>
    </div>
  );
}
