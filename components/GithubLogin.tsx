"use client";

import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";

export default function GithubLogin() {
  const router = useRouter();
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return <button onClick={onClick}>Continue with github</button>;
}
