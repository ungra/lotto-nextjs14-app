"use client";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateAccout() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "name") {
      setName(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === null || password === null) return;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      router.push("/login");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
    }
  };

  return (
    <div>
      <h1>Create Account Page</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="name"
          name="name"
          value={name}
          placeholder="write your name"
          required
        ></input>
        <input
          onChange={onChange}
          value={email}
          name="email"
          type="email"
          placeholder="write your email"
          required
        ></input>
        <input
          onChange={onChange}
          value={password}
          name="password"
          placeholder="write your password"
          type="password"
          required
        ></input>
        <input type="submit" value="Create Account"></input>
      </form>
      {error ? <h3>{error}</h3> : null}
      <div>
        <h4>Already have an account?</h4>
        <Link href="/login">Log in &rarr;</Link>
      </div>
    </div>
  );
}
