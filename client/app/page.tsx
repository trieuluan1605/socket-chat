"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import ChatForm from "@/components/chat-form";
import { title } from "@/components/primitives";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<{
    id: number;
    name: string;
    username: string;
  }>({
    id: 0,
    name: "",
    username: "",
  });

  useEffect(() => {
    const userStored = localStorage.getItem("user");
    const user: {
      id: number;
      name: string;
      username: string;
    } = userStored ? JSON.parse(userStored) : null;

    if (!user) {
      router.push("/auth/login");
    } else {
      setUser(user);
    }
  }, [router]);

  return (
    user && (
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title({ color: "violet" })}>Socket </h1>
          <h1 className={title()}>Chat</h1>
        </div>

        <ChatForm user={user} />
      </section>
    )
  );
}
