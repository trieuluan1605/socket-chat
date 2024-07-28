"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import NoSsr from "@/app/no-ssr";
import LoginForm from "@/components/login-form";

function LoginPage() {
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

export default NoSsr(LoginPage);
