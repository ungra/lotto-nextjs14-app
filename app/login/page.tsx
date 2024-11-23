"use client";

import { useState } from "react";
import GithubLogin from "../../components/GithubLogin";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === null || password === null) {
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/lotto");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form name="form" onSubmit={onSubmit}>
        <input
          name="email"
          onChange={onChange}
          value={email}
          placeholder="write your email"
          type="email"
          autoComplete="email"
          required
        ></input>
        <input
          name="password"
          onChange={onChange}
          value={password}
          placeholder="write your password"
          type="password"
          autoComplete="current-password"
          required
        ></input>
        <input type="submit" value="Log In"></input>
      </form>
      {error ? <h3>{error}</h3> : null}
      <GithubLogin />
      <div>
        <h4>Don't have an account?</h4>
        <Link href="/create-account">Creat one &rarr;</Link>
      </div>
    </div>
  );
}
