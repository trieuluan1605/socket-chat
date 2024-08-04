/* eslint-disable padding-line-between-statements */
/* eslint-disable no-console */
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
  }, [router, userStored]);

  const handleLogin = async (form: { username: string; password: string }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_POINT}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const { user } = await response.json();
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/");
    } catch (error) {
      console.error("Failed to login:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return !userStored && <LoginForm onLogin={handleLogin} />;
}

export default NoSsr(LoginPage);
