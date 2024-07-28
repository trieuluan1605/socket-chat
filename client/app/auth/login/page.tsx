"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import LoginForm from "@/components/login-form";

export default function LoginPage() {
  const router = useRouter();
  const userStored = localStorage.getItem("user");

  useEffect(() => {
    if (userStored) {
      router.push("/");
    }
  }, [router]);

  const handleLogin = (form: { username: string; password: string }) => {
    localStorage.setItem(
      "user",
      JSON.stringify({ ...form, id: 1, name: "Triệu Luân" }),
    );
    router.push("/");
  };

  return !userStored && <LoginForm onLogin={handleLogin} />;
}
