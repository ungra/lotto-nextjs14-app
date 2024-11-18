"use client";

import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

export default function AppMain() {
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>AppMain Page</h1>
      <button onClick={onClick}>Continue with Github</button>
    </div>
  );
}
