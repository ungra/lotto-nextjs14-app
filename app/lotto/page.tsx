"use client";

import { onAuthStateChanged, signOut, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";

interface Lotto {
  drwtNo6: number;
  drwtNo4: number;
  drwtNo5: number;
  bnusNo: number;
  drwNo: number;
  drwtNo2: number;
  drwtNo3: number;
  drwtNo1: number;
}

export default function Lotto() {
  const [user, setUser] = useState<User | null>(null);
  const [number, setNumber] = useState("");
  const [data, setData] = useState<Lotto | null>(null);
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
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNumber(value);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/lotto?drwNo=" + number);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Lotto Page...</h1>
      <h3>You Logged In</h3>
      <button onClick={onClick}>Log Out</button>
      <hr />
      <form onSubmit={onSubmit}>
        <input
          type="number"
          value={number}
          required
          onChange={onChange}
          placeholder="write a round number you want to know"
        ></input>
        <input type="submit" value="Click"></input>
      </form>
      <hr />
      {data ? (
        <div>
          <p>{`회차정보 : ${data?.drwNo}`}</p>
          <p>{`당첨번호: ${data?.drwtNo1}, ${data?.drwtNo2}, ${data?.drwtNo3}, ${data?.drwtNo4}, ${data?.drwtNo5}, ${data?.drwtNo6}`}</p>
          <p>{`보너스: ${data?.bnusNo}`}</p>
        </div>
      ) : null}
    </div>
  );
}
