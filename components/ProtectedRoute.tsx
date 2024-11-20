"use client";

import { auth } from "../firebase";
import React from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser;
  const router = useRouter();
  if (user === null) {
    return router.push("/login");
  }
  return children;
}
