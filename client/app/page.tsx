"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import ChatForm from "@/components/chat-form";
import RoomForm from "@/components/room-form";
import { title } from "@/components/primitives";

interface User {
  id: string;
  name: string;
  username: string;
}

interface Room {
  id: string;
  name: string;
}

interface Message {
  userId: string;
  name: string;
  username: string;
  content: string;
  createTime: number;
}

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User>({ id: "", name: "", username: "" });
  const [room, setRoom] = useState<Room>({ id: "", name: "" });
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const userStored = localStorage.getItem("user");

    if (userStored) {
      const user = JSON.parse(userStored);

      setUser(user);
    } else {
      router.push("/auth/login");
    }
  }, [router]);

  const handleRoomChange = (room: Room, messages: Message[]) => {
    setRoom(room);
    console.log("messages", messages);

    setMessages(messages);
  };

  return (
    user && (
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title({ color: "violet" })}>Socket</h1>
          <h1 className={title()}>Chat</h1>
        </div>

        <RoomForm onRoomChange={handleRoomChange} />
        {room && <ChatForm oldMessages={messages} room={room} user={user} />}
      </section>
    )
  );
}
