"use client";

import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useRouter } from "next/navigation";
import GetLotto from "../../components/GetLotto";

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

export default function Lotto({ json }: { json: any }) {
  const [user, setUser] = useState<User | null>(null);
  const [lotto, setLotto] = useState<Lotto | null>(null);
  const [number, setNumber] = useState("");
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
    const lotto = await GetLotto(number);
    setLotto(lotto);
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
      <h3>{lotto ? `${lotto}` : null}</h3>
    </div>
  );
}
