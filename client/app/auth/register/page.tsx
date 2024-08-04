/* eslint-disable padding-line-between-statements */
/* eslint-disable no-console */
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import NoSsr from "@/app/no-ssr";
import RegisterForm from "@/components/register-form";

function RegisterPage() {
  const router = useRouter();
  const userStored = localStorage.getItem("user");

  useEffect(() => {
    if (userStored) {
      router.push("/");
    }
  }, [router, userStored]);

  const handleRegister = async (form: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API_POINT}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      router.push("/");
    } catch (error) {
      console.error("Failed to register:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return !userStored && <RegisterForm onRegister={handleRegister} />;
}

export default NoSsr(RegisterPage);
